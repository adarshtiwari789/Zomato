import React from 'react'
import '../styles/variables.css'
import '../styles/auth.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const FoodLogin = () => {
    const navigate = useNavigate()
 async function  handelsubmit (e) {
  e.preventDefault()
  const email = e.target.email.value 
  const password = e.target.password.value


  const response = await axios.post('http://localhost:3000/api/auth/food-partener/login', {
    email , 
    password, 
  }  , {
    withCredentials : true 
  })
  console.log(response.data)
  navigate("/food-partner/home")
  
}
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Food Partner Login</h2>
        <p className="auth-sub">Access your partner dashboard</p>

        <form className="auth-form" onSubmit={(e) => handelsubmit(e)}>
          <label className="auth-label">
            Email
            <input className="auth-input" name="email" type="email" placeholder="partner@example.com" />
          </label>

          <label className="auth-label">
            Password
            <input className="auth-input" name="password" type="password" placeholder="••••••••" />
          </label>

          <button className="auth-button" type="submit">Log in</button>
        </form>

        <div className="auth-footer">Don't have an account? <a href="/food-partner/register">Sign up</a></div>
      </div>
    </div>
  )
}

export default FoodLogin
