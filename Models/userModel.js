const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique:[true,'This username is already taken! Try a new one :D']
    },
    email:{
        type:String,
        required:true,
        unique:[true,'This email has already been taken!']
    },
    password:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("User",userSchema)