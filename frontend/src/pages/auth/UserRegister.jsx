import React from 'react'
import '../../styles/variables.css'
import '../../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const UserRegister = () => {
  const navigat = useNavigate();

 async function  handelsubmit(e){
    e.preventDefault()
    const username = e.target.name.value
    const email = e.target.email.value
    const password = e.target.password.value

  const response = await axios.post('https://zomato-aqgm.onrender.com/api/auth/user/register',{
      username ,
      email, 
      password ,
    },{withCredentials : true})

    navigat('/user/home')

  }
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Create your account</h2>
        <p className="auth-sub">Sign up to explore delicious food</p>

        <form className="auth-form" onSubmit={(e) => handelsubmit(e)}>
          <label className="auth-label">
            Full name
            <input className="auth-input" name="name" placeholder="Jane Doe" />
          </label>

          <label className="auth-label">
            Email
            <input className="auth-input" name="email" type="email" placeholder="you@example.com" />
          </label>

          <label className="auth-label">
            Password
            <input className="auth-input" name="password" type="password" placeholder="••••••••" />
          </label>

      

          <button className="auth-button" type="submit">Create account</button>
        </form>

        <div className="auth-footer">Already have an account? <a href="/user/login">Log in</a></div>
      </div>
    </div>
  )
}

export default UserRegister
