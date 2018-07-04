import https from 'https';
import http from 'http';
import express from "express";
import bodyParser from "body-parser";
import fs from "fs"
import databox from 'node-databox';

let personalDatastore = {}
const PORT = process.env.port || '8080';
const credentials = databox.getHttpsCredentials();

databox.HypercatToSourceDataMetadata(process.env[`DATASOURCE_personalFlow`]).then((data) => {
    personalDatastore = data
    console.log("creating monitor store from", personalDatastore.DataSourceURL);
    return databox.NewTimeSeriesBlobClient(personalDatastore.DataSourceURL, false)
}).then((store) => {
    console.log("have store starting to observe!", personalDatastore.DataSourceMetadata.DataSourceID);
    return store.Observe(personalDatastore.DataSourceMetadata.DataSourceID)
}).then((emitter) => {

    console.log("successfully created emitter");

    emitter.on('data', (data) => {
        console.log("seen some data!", data);
        console.log(JSON.parse(JSON.parse(data.data).data))
    });

    emitter.on('error', (err) => {
        console.warn(err);
    });
}).catch((err) => {
    console.warn("Error Observing ", personalDatastore.DataSourceMetadata.DataSourceID, " ", err);
});

console.log("[Creating https server]", PORT);
const app = express();

app.set('views', './views');
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static('./www'));

app.get('/ui', (req, res) => {
    console.log("in ui endpoint!!");
    res.render('index');
});

app.get("/status", function (req, res) {
    res.send("active");
});

https.createServer(credentials, app).listen(PORT);


/*
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/ui', express.static('./www'));
app.use('/static', express.static('./www/static'));
const server = http.createServer(app);
server.listen(8080);*/