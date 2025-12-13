import React from 'react'
import '../styles/variables.css'
import '../styles/auth.css'

const Landing = () => {
  return (
    <div className="auth-page">
      <div className="landing-card">
        <h2 className="auth-title">Get started</h2>
        <p className="auth-sub">Register as a user or a food partner to continue</p>

        <div className="landing-actions">
          <a className="landing-button" href="#/user/register">Register as user</a>
          <a className="landing-button outline" href="#/food-partner/register">Register as food partner</a>
        </div>
      </div>
    </div>
  )
}

export default Landing
