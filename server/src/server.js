require('dotenv').config()
const express=require('express')
const http=require('http')
const bodyParser=require('body-parser')
const cors=require('cors')
const { query,body ,validationResult,matchedData} = require('express-validator');
// const database=require('./database/database')
const WebSocket=require('ws')


const app=express()
app.use(bodyParser.json());


app.use(cors())

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {

    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {

        //log the received message and send it back to the client
        console.log('received: %s', message);

        const broadcastRegex = /^broadcast\:/;

        if (message.includes('alireza') || message.includes('hooman')) {
            // message = message.replace(broadcastRegex, '');

            //send back the message to the other clients

            wss.clients
                .forEach(client => {
                    if (client != ws) {
                        client.send(`${message}`);
                    }
                });

        } else {
            ws.send(`${message}`);
        }
    });

    //send immediatly a feedback to the incoming connection
    // ws.send('Hi there hooman, I am a WebSocket server');
});

//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});
