const express = require('express');
const app = express();
const port = 3000;
const { connectToDB, disconnectFromDB, isConnected } = require('./database');
const { getRoute, postRoute, putRoute, deleteRoute } = require("./Routes/route");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookie = require("cookie-parser")
const jwt = require("jsonwebtoken")

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookie())

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

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "admin123") {
        const token = jwt.sign({ username }, process.env.SECRET_TOKEN);
        res.json({ token });
    } else {
        res.status(401).json({ error: "Invalid credentials" });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
