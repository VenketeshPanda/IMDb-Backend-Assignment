const mongoose = require('mongoose')

const producerSchema = mongoose.Schema({
    name: {
        type: String,
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

module.exports = mongoose.model("Producer", producerSchema)