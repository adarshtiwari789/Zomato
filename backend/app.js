require('dotenv').config();
const express = require('express')
const mongoose = require('./db/db.config')
const db = require("./db/db.config")
const app = express()
const cookieParser = require('cookie-parser')
const authrouter = require('./routes/auth.routes')
const foodrouter = require('./routes/food.routes')
const foodpartnerrouter = require('./routes/foodpartner')
const cors = require('cors');
const {FoodPartnerModel, adarsh} = require('./model/food-partner.model');
const { usermodel } = require('./model/user.model');
const getFoodpartner = require('./controllers/food-partner.controller');


app.use(cors({
   origin : ["http://localhost:5173", "https://zomato-aqgm.onrender.com/"], 
   credentials : true 
}))
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.json())  


 
app.use('/api/auth' ,  authrouter )
app.use('/api/foodpartner' , foodpartnerrouter)
app.use('/api/food' ,  foodrouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})


module.exports = app