import React from 'react'
import { Link } from 'react-router-dom'
import Styles from '../styles/LandingPage.module.css'

function LandingPage() {
  return (
      <div className={Styles.landing}>
    <Link to="/home">
    <button className={Styles.buttonEnter}>Enter</button>
    </Link>
      </div>
  )
}

export default LandingPage