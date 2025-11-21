const mongoose = require('mongoose')

const foodpartnerSchema = new mongoose.Schema({
  email : String, 
  password : String,
  username : String , 
  mobile_number : Number,
  address : String ,  
  image : String , 
});
const FoodPartnerModel = mongoose.model('FoodPartner', foodpartnerSchema);      



module.exports = FoodPartnerModel  