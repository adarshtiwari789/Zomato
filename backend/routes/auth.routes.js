const express = require ("express");
const router = express.Router();
const authcontroller  = require("../controllers/auth.controller")

// api/auth/user
router.post("/user/register" , authcontroller.userRegister)
router.post("/user/login" , authcontroller.userLogin)
router.get('/user/logout' , authcontroller.userLogout)

// api/auth/foodpartner
router.post('/food-partener/register' , authcontroller.foodpartnerRegister)
router.post('/food-partener/login' , authcontroller.foodpartnerLogin)
router.get('/food-partener/logout' , authcontroller.foodpartnerLogout)

module.exports = router