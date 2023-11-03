const express = require('express')
const router = express.Router()
const { getAllMovies, addMovie, updateMovie } = require('../Controllers/movieController')
const validateToken = require('../Middlewares/validateToken')


router.get('/', getAllMovies).post('/', validateToken, addMovie)
router.put('/:id', validateToken, updateMovie)

module.exports = router