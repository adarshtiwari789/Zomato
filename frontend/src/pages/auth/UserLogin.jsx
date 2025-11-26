import React from 'react'
import '../../styles/variables.css'
import '../../styles/auth.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserLogin = () => {
  const navigate = useNavigate()
  async function  handelsubmit(e) {
  e.preventDefault()
  const email = e.target.email.value 
  const password = e.target.password.value
  const response = await axios.post('http://localhost:3000/api/auth/user/login', {
    email , 
    password 
  }  , {
    withCredentials : true 
  })
 
  navigate('/user/home')
  
}
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-sub">Log in to your account</p>

        <form className="auth-form" onSubmit={(e) => handelsubmit(e)}>
          <label className="auth-label">
            Email
            <input className="auth-input" name="email" type="email" placeholder="you@example.com" />
          </label>

          <label className="auth-label">
            Password
            <input className="auth-input" name="password" type="password" placeholder="••••••••" />
          </label>

          <button className="auth-button" type="submit">Log in</button>
        </form>

        <div className="auth-footer">Don't have an account? <a href="/user/register">Sign up</a></div>
      </div>
    </div>
  )
}

export default UserLogin
