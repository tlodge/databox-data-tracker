import https from 'https';
import http from 'http';
import express from "express";
import bodyParser from "body-parser";
import fs from "fs"
import databox from 'node-databox';
//import socket from 'socket.io';
import * as WebSocket from 'ws';

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

const wss = new WebSocket.Server({ server, path:"/ui/ws" });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });
    //send immediatly a feedback to the incoming connection    
    ws.send('Hi there, I am a WebSocket server');
});

console.log("set up websocket");


databox.HypercatToSourceDataMetadata(process.env[`DATASOURCE_personalFlow`]).then((data) => {
    personalDatastore = data
    return databox.NewTimeSeriesBlobClient(personalDatastore.DataSourceURL, false)
}).then((store) => {
    return store.Observe(personalDatastore.DataSourceMetadata.DataSourceID)
}).then((emitter) => {

    emitter.on('data', (data) => {
        console.log("seen data, sending", JSON.parse(JSON.parse(data.data).data))
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