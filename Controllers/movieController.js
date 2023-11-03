const asyncHandler = require('express-async-handler')
const Movie = require('../Models/movieModel')
const Actor = require('../Models/actorModel')
const Producer = require('../Models/producerModel')

//This will get all the movies
//PUBLIC
//@GET
const getAllMovies = asyncHandler(async (req, res) => {
    const movies = await Movie.find()
        .select('name actors producer')
        .populate('actors', 'name')
        .populate('producer', 'name')

    res.status(200).json(movies);
});



//Add a new movie
//PRIVATE   
//@POST
const addMovie = asyncHandler(async (req, res) => {
    const { name, yearOfRelease, plot, poster, actorNames, producerName } = req.body
    if (!name || !yearOfRelease || !actorNames || !producerName) {
        res.status(400)
        throw new Error('All the details are mandatory!!')
    }

    const actors = []
    for (const actorName of actorNames) {
        let actor = await Actor.findOne({ name: actorName })

        if (!actor) {
            actor = await Actor.create({ name: actorName })
        }
        actors.push(actor.name)
    }

    let producer = await Producer.findOne({ name: producerName })
    if (!producer) {
        producer = await Producer.create({ name: producerName })
    }

    const movie = await Movie.create({
        name,
        yearOfRelease,
        plot,
        poster,
        actors,
        producer: producer.name
    })

    for (const actorName of actors) {
        await Actor.updateOne({ name: actorName }, { $addToSet: { movies: movie.name } })
    }
    await Producer.updateOne({ name: producerName }, { $addToSet: { movies: movie.name } })

    res.status(200).send(movie)
    console.log('New movie added!')
})


//update an existing movie
//PRIVATE   
//@PUT
const updateMovie = asyncHandler(async (req, res) => {
    const { name, yearOfRelease, plot, poster, actorNames, producerName } = req.body
    const movieId = req.params.id

    const existingMovie = await Movie.findById(movieId);
    if (!existingMovie) {
        res.status(404)
        throw new Error('Movie not found!')
    }

    if (!name || !yearOfRelease || !actorNames || !producerName) {
        res.status(400)
        throw new Error('All the details are mandatory!!')
    }

    let producer = await Producer.findOne({ name: producerName })
    if (!producer) {
        producer = await Producer.create({ name: producerName })
    }

    const actors = []
    for (const actorName of actorNames) {
        let actor = await Actor.findOne({ name: actorName })

        if (!actor) {
            actor = await Actor.create({ name: actorName })
        }

        actors.push(actor.name)
    }

    const oldMovie = await Movie.findById(movieId)


    //Disconnects old movie with previous producers and actors
    await Producer.updateOne({ name: oldMovie.producer }, { $pull: { movies: oldMovie.name } })

    for (const oldActorName of oldMovie.actors) {
        await Actor.updateOne({ name: oldActorName }, { $pull: { movies: oldMovie.name } })
    }

    //Updates the movie with the updated data
    const updatedMovie = await Movie.findByIdAndUpdate(movieId, {
        name,
        yearOfRelease,
        plot,
        poster,
        actors,
        producer: producer.name,
    }, { new: true })

    for (const actorName of actorNames) {
        await Actor.updateOne({ name: actorName }, { $addToSet: { movies: updatedMovie.name } })
    }
    await Producer.updateOne({ name: producerName }, { $addToSet: { movies: updatedMovie.name } })

    res.status(200).send(updatedMovie)
    console.log('Movie Updated!')
})

module.exports = { getAllMovies, addMovie, updateMovie }