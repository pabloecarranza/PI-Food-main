import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
        <h1>Navbar</h1>
        <nav>
            <Link to="/">Landing Page</Link>
            <Link to="/home">Home</Link>
            <Link to="/newrecipe">Create Recipe</Link>
            <Link to="/about">About</Link>
        </nav>
    </div>

  )
}

export default Navbar