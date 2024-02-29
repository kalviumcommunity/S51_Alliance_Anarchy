const express = require('express');
const app = express();
const port = 3000;
const { connectToDB, disconnectFromDB, isConnected } = require('./database');
const { getRoute, postRoute, putRoute, deleteRoute } = require("./Routes/route");
const bodyParser = require("body-parser");
const cors = require("cors");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/", getRoute);
app.use("/", postRoute);
app.use("/", putRoute);
app.use("/", deleteRoute);

// Database connection
connectToDB().then(() => {
    console.log("Connected to database");
}).catch(err => {
    console.error("Failed to connect to database:", err);
});

// Routes
app.get("/", (req, res) => {
    res.send(isConnected ? "Connected" : "Disconnected");
});

app.get("/ping", (req, res) => {
    res.send("pong");
});

// Start server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
