const asyncHandler = require('express-async-handler')
const Producer = require('../Models/producerModel')
const Movie = require('../Models/movieModel')
const actorModel = require('../Models/actorModel')

const getProducers= asyncHandler (async (req,res)=>{
    const producers=await Producer.find()
    res.status(200).send(producers)
})

const addProducer= asyncHandler(async(req,res)=>{
    const {name,gender,dateOfBirth,bio,movies} = req.body
    if(!name || !gender || !dateOfBirth){
        res.status(400)
        throw new Error('Name, gender and DOB is mandatory!')
    } 
    const moviesProduced=[]
    if(movies){
        for(const movieName of movies){
            let movie = await Movie.findOne({name: movieName})

            if(!movie){
                movie = await Movie.create({name: movieName})
            }
            moviesProduced.push(movie.name)
        }
    }

    const producer = await Producer.create({name,gender,dateOfBirth,bio,movies: moviesProduced})
    
    for(const movieName of movies){
        await Movie.updateOne({name: movieName}, { $addToSet: { producers: producer.name } })
    }

    res.send(producer)
    console.log("New Producer added!")
})

const updateProducer = asyncHandler(async(req,res)=>{
    const producer = await Producer.findById(req.params.id)
    const {name,gender,dateOfBirth,bio,movies}=req.body
    if(!producer){
        res.status(404)
        throw new Error("Producer not found")
    }
    producer.name=name,
    producer.gender = gender,
    producer.dateOfBirth = dateOfBirth,
    producer.bio = bio

    const moviesProduced = producer.movies || []

    if(movies){
        for(const movieName of movies){
            let movie = await Movie.findOne({name:movieName})
            if(!movie){
                movie = await Movie.create({name : movieName})
            }
            moviesProduced.push(movie.name)
            await Movie.updateOne({name:movieName},{$addToSet: {producers: name} })
        }
    }
    const updatedProducer = await producer.save()
    res.status(200).json({updatedProducer})
    console.log('Producer Updated')
})


module.exports = {getProducers,addProducer,updateProducer}