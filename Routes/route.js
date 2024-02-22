const express = require("express");
const getRoute = express.Router();
const postRoute = express.Router();
const putRoute = express.Router();
const deleteRoute = express.Router();
const Games = require("../model/AllianceAnarchy.model");


// Middleware to parse JSON request bodies
getRoute.use(express.json());
postRoute.use(express.json());
putRoute.use(express.json());
deleteRoute.use(express.json());

// GET route to fetch all games
getRoute.get("/get", async (req, res) => {
  try {
    const games = await Games.find();
    console.log(games)
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch games", error: err.message });
  }
});

// POST route to create a new game
postRoute.post("/post", async (req, res) => {
  try {

    const {id, title, description, competitiveness, friendship_ruin, genre} = req.body
    console.log(id)
    const newGame = await Games.create({id, title, description, competitiveness, friendship_ruin, genre});
    // console.log(newGame)

    res.status(201).json(newGame);
  } catch (err) {
    res.status(400).json({ message: "Failed to create game", error: err.message });
  }
});

// PATCH route to update a game by ID
putRoute.patch("/put/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedGame = await Games.findOneAndUpdate({ id: id }, req.body, { new: true });

    if (!updatedGame) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.json(updatedGame);
  } catch (err) {
    res.status(400).json({ message: "Failed to update game", error: err.message });
  }
});

// DELETE route to delete a game by ID
deleteRoute.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGame = await Games.findOneAndDelete({id: id});
    if (!deletedGame) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.json({ message: "Game deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete game", error: err.message });
  }
});

module.exports = {getRoute,postRoute,putRoute,deleteRoute};