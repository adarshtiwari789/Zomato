import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRegister from '../pages/auth/UserRegister';
import UserLogin from '../pages/auth/UserLogin';
import FoodRegister from '../pages/auth/FoodRegister';
import FoodLogin from '../pages/auth/FoodLogin';
import Landing from '../pages/Landing';
import Home from "../pages/generalPages/Home";
import FoodpartnerHome from "../pages/createfood/FoodpartnerHome";
import FoodpartnerInfo from "../pages/generalPages/FoodpartnerInfo"

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element= {<Landing/> } />
                <Route path="/user/register" element={<UserRegister/>} />
                <Route path="/user/login" element={<UserLogin/>}/>
                <Route path="/food-partner/register" element={<FoodRegister/>} />
                <Route path="/food-partner/foodlogin" element={<FoodLogin/>} />
                <Route path="/user/home" element={<Home/>} />
                <Route path="/food-partner/home" element = {<FoodpartnerHome/>} />
                <Route path = "/food-partner/:id" element= {<FoodpartnerInfo/>} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;