const mongoose = require('mongoose')

const actorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
    bio: {
        type: String
    },
    movies: [String],
}, { timestamps: true })

module.exports = mongoose.model("Actor", actorSchema)