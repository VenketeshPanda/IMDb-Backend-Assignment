const express = require('express')
const router = express.Router()
const {registerUser,loginUser} = require('../Controllers/userController')


//Register a user
//Public
//@POST
router.post('/register',registerUser)

//Login the registered user
//Public
//POST
router.post('/login',loginUser)


module.exports=router