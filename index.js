const express = require('express')
const dotenv = require('dotenv').config()
const actorRoute = require('./Routes/actorRoute')
const movieRoute = require('./Routes/movieRoute')
const userRoute = require('./Routes/userRoute')
const producerRoute = require('./Routes/producerRoute')
const errorHandler = require('./Middlewares/errorHandler')
const connectDb = require('./Config/connectionDB')
const app = express()

//Database Connection
connectDb()

//Middlewares
app.use(express.json())
app.use(errorHandler)

//Routes
app.use('/api/users',userRoute)
app.use('/api/movies', movieRoute)
app.use('/api/actors', actorRoute)
app.use('/api/producers', producerRoute)


//Running the server
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Application running on port: ' + PORT)
})

