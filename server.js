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

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        // Assuming you have a user model with username and password fields
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        // Compare passwords using bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        // Generate JWT token
        const token = jwt.sign({ username: user.username }, process.env.SECRET_TOKEN);
        res.cookie("token", token, { httpOnly: true });
        res.json({ token, username: user.username });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
