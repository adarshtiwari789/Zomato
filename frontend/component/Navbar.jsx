import React from 'react'
import '../src/styles/reel.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="nav-bar" role="navigation" aria-label="Main navigation">
     
      <Link to="#/user/home" className="nav-btn">Reels</Link>
      <Link to="#/user/save" className="nav-btn">save</Link>
    </nav>
  )
}

export default Navbar
