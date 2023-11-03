const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const User = require('../Models/userModel')
const jwt = require('jsonwebtoken')
const errorHandler = require('../Middlewares/errorHandler')

//Add a new user
//PUBLIC
//@POST
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        res.status(400)
        throw new Error('All fields are mandatory!')
    }

    const checkUser = await User.findOne({ email })
    if (checkUser) {
        res.status(400)
        throw new Error('User already exists')
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log('Hashed password: ' + hashedPassword)

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })
    res.json({ _id: user._id, email: user.email })
    console.log('User created: ' + user)
})


//Login an user
//PUBLIC 
//@POST
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error("Email & Password mandatory")
    }
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" })
        res.json({ accessToken })
        console.log('' + user.username + ' Loggedin')
    } else {
        res.status(401)
        throw new Error('Unauthorized: Email/Password not valid')
    }
})




module.exports = { registerUser, loginUser }