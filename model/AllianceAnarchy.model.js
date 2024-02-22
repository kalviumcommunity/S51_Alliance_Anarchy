const mongoose = require("mongoose")

const dataSchema = new mongoose.Schema({
    id:{
        type: Number,
        unique: true
    },
    title: {
        type: String,
        unique: true
    },
    genre: {
        type: String,
    },
    description: {
        type: String
    },
    difficulty: {
        type: String
    },
    competitiveness: {
        type: String
    },
    friendship_ruin: {
        type: String
    }
})

module.exports = mongoose.model("dataas", dataSchema)