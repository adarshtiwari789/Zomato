import React, { useState } from 'react'
import '../../styles/variables.css'
import '../../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FoodRegister = () => {
  const navigate = useNavigate()
 async function  handelsubmit(e) {
   e.preventDefault();

  const formData = new FormData();
  formData.append("email", e.target.email.value);
  formData.append("password", e.target.password.value);
  formData.append("username", e.target.username.value);
  formData.append("mobile_number", e.target.mobile_number.value);
  formData.append("address", e.target.address.value);
  formData.append("image", e.target.image.files[0]); // ✔ FILE GOES HERE

  const response = await axios.post(
    "http://localhost:3000/api/auth/food-partener/register",
    formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  ).then((res)=>{
    console.log(res)
    navigate('/food-partner/home')
  }).catch((err)=>{
    console.log(err)
  })
    
}
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Food Partner Signup</h2>
        <p className="auth-sub">Create an account to manage your menu</p>

        <form className="auth-form" onSubmit={(e) => handelsubmit(e)}>
          <label className="auth-label">
            Partner name
            <input className="auth-input" name="username" placeholder="Restaurant or Vendor" />
          </label>

          <label className="auth-label">
            Email
            <input className="auth-input" name="email" type="email" placeholder="you@example.com" />
          </label>
         <label className="auth-label">
            Moblie number : 
            <input className="auth-input" name="mobile_number"  placeholder="Enter number" />
          </label>
           <label className="auth-label">
            Address : 
            <input className="auth-input" name="address"  placeholder="Enter address" />
          </label>
           <label className="auth-label">
            Password : 
            <input className="auth-input" name="password"  placeholder="Enter password" />
          </label>
           <label className="auth-label">
            image : 
            <input className="auth-input" type='file' name="image"  placeholder="Enter password" />
          </label>
          <button className="auth-button" type="submit">Create account</button>
        </form>


        <div className="auth-footer">Already registered? <a href="/food-partner/foodlogin">Log in</a></div>
      </div>
    </div>
  )
}

export default FoodRegister
