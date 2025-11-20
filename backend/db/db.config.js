require('dotenv').config();

const mongoose = require( 'mongoose') ;

const mongoUrl = process.env.MONGODB_URL;
mongoose.connect(mongoUrl).then(() => {
    console.log("Mongodb connected successfully");
}).catch((e) => {
    console.log("Mongodb connection failed");
    console.log(e);
}) ; 

module.exports = mongoose ;
