const express = require('express')
const router = express.Router()
const {addProducer,getProducers,updateProducer} = require('../Controllers/producerController')
const validateToken = require('../Middlewares/validateToken')


router.get('/',getProducers).post('/',validateToken,addProducer)
router.put('/:id',validateToken,updateProducer)

module.exports = router