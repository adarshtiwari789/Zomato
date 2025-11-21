const express = require('express')
const foodmiddle = require('../middleware/foodPartnerAuth')
const foodparcontroller = require('../controllers/food-partner.controller')
const router = express.Router()

router.get('/:id' ,foodmiddle.isuser , foodparcontroller )

module.exports = router