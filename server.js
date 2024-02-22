const express = require('express');
const app = express();
const port = 3000;
const { connectToDB, disconnectFromDB, isConnected } = require('./database');
const {getRoute, postRoute, putRoute, deleteRoute} = require("./Routes/route")
const bodyParser = require("body-parser")

app.use("/", getRoute)
app.use("/", postRoute)
app.use("/", putRoute)
app.use("/", deleteRoute)
app.use(bodyParser.json())


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


  