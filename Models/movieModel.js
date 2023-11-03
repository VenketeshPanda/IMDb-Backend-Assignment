const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    yearOfRelease: {
        type: Number,
    },
    plot: String,
    poster: String,
    actors: [String],
    producer: String,
}, { timestamps: true })

module.exports = mongoose.model("Movie", movieSchema)