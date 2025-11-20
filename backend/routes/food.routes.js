const express = require('express')
const  foodcontroller  = require('../controllers/food.controller')
const router =express.Router()
const foodmiddle = require('../middleware/foodPartnerAuth')
const multer = require('multer')
const upload = multer({
    storage : multer.memoryStorage() 
})

router.post('/create' , foodmiddle.isfoodpartner, upload.single("video") ,foodcontroller.createFood )
// get food api api/food/

router.get("/getfood" , foodmiddle.isuser , foodcontroller.getfood)


module.exports = router