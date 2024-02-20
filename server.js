const express = require('express');
const app = express();
const port = 3000;
const { connectToDB, disconnectFromDB, isConnected } = require('./database');



app.get("/",(req, res) => {
    connectToDB();
    res.send(isConnected ? "Connected" : "Disconnected")
})

app.get("/ping",(req, res) => {
    res.send("pong")
})

app.listen(port, () => {
    connectToDB();
    console.log(`Server listening on port ${port}`)
})
