const express = require('express')
const router = express.Router()
const validateToken = require('../Middlewares/validateToken')
const { getActors, addActor,updateActor } = require('../Controllers/actorController')

router.get('/', getActors)

router.post('/',validateToken,addActor)

router.put('/:id',validateToken,updateActor)

module.exports = router