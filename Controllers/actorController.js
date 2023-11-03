const asyncHandler = require('express-async-handler')
const Actor = require('../Models/actorModel')
const Movie = require('../Models/movieModel')

//Get all the actors
//PUBLIC
//@GET
const getActors = asyncHandler(async (req, res) => {
    const actors = await Actor.find()
    res.json(actors)
})


//Add a new actor
//PRIVATE   
//@POST
const addActor = asyncHandler(async (req, res) => {
    const {name,gender,dateOfBirth,bio,movies} = req.body
    if(!name || !gender || !dateOfBirth){
        res.status(400)
        throw new Error('Name, gender and DOB is mandatory!')
    } 
    const moviesActedIn=[]
    if(movies){
        for(const movieName of movies){
            let movie = await Movie.findOne({name: movieName})
            if(!movie){
                movie = await Movie.create({name: movieName})
            }
            moviesActedIn.push(movie.name)
        }
    }
    const actor = await Actor.create({name,gender,dateOfBirth,bio, movies:moviesActedIn})
    for(const movieName of movies){
        await Movie.updateOne({name:movieName},{$addToSet:{actors: actor.name}})
    }
    res.send(actor)
    console.log("New Actor added!")
})


//Update an existing actor
//PRIVATE   
//@PUT
const updateActor = asyncHandler(async(req,res)=>{
    const actor = await Actor.findById(req.params.id)
    const { name, gender, dateOfBirth, bio,movies } = req.body
    if(!actor){
        res.status(404)
        throw new Error("Actor not found")
    }
    actor.name = name,
    actor.gender = gender,
    actor.dateOfBirth = dateOfBirth,
    actor.bio = bio

    const moviesActedIn = actor.movies || []

    if (movies) {
        for (const movieName of movies) {
            let movie = await Movie.findOne({ name: movieName })
            if (!movie) {
                movie = await Movie.create({ name: movieName })
            }
            moviesActedIn.push(movie.name)
            await Movie.updateOne({ name: movieName }, { $addToSet: { actors: name } })
        }
    }

    const updatedActor = await actor.save()
    res.status(200).json({updatedActor})
    console.log('Actor Updated!')
})

module.exports = { getActors, addActor , updateActor}
