import https from 'https';
import http from 'http';
import express from "express";
import bodyParser from "body-parser";
import fs from "fs"
import databox from 'node-databox';
import socket from 'socket.io';

let personalDatastore = {}
const PORT = process.env.port || '8080';
const credentials = databox.getHttpsCredentials();

const app = express();
app.set('views', './views');
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static('./www'));

app.get('/', (req, res) => {
    console.log("seen index req!!");
});

app.get('/ui', (req, res) => {
    console.log("in ui endpoint!!");
    res.render('index');
});

app.get("/status", function (req, res) {
    res.send("active");
});

console.log("[->Creating https server<-]", PORT);
const server = https.createServer(credentials, app).listen(PORT);

const io = socket({ path: "/ui/socket.io" }).listen(server);
const nsp = io.of('/databox-data-tracker');
console.log("set up websocket");

nsp.on('connection', function (socket) {

    socket.on('join', function (app) {
        console.log("seen a join request, joining client to room ", app);
        socket.join(app);
        //return app; 
    });

    socket.on('leave', function (app) {
        console.log("leaving room: " + app);
        socket.leave(app);
    });

    socket.on('disconnect', function () {
        console.log("webserver seen socket disconnect!");
    });

});


databox.HypercatToSourceDataMetadata(process.env[`DATASOURCE_personalFlow`]).then((data) => {
    personalDatastore = data
    return databox.NewTimeSeriesBlobClient(personalDatastore.DataSourceURL, false)
}).then((store) => {
    return store.Observe(personalDatastore.DataSourceMetadata.DataSourceID)
}).then((emitter) => {

    emitter.on('data', (data) => {
        //console.log("seen data, sending", JSON.parse(JSON.parse(data.data).data))
        nsp.to("webapp").emit("data", JSON.parse(JSON.parse(data.data).data));
    });

    emitter.on('error', (err) => {
        console.warn(err);
    });
}).catch((err) => {
    console.warn("Error Observing ", personalDatastore.DataSourceMetadata.DataSourceID, " ", err);
});

/*
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/ui', express.static('./www'));
app.use('/static', express.static('./www/static'));
const server = http.createServer(app);
server.listen(8080);*/