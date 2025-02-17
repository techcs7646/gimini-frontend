import React from 'react'
import { useNavigate } from 'react-router-dom'
import './SigninLandingPage.css'

const SigninLanding = () => {

    const navigate = useNavigate()

  return (
    <div className="signin-container">
    <header className="signin-header">
      <span className="signin-logo">Gemini</span>
      <button className="signin-nav-button">Sign in</button>
    </header>

    <div className="signin-content">
      <div className="signin-text">
        <h1 className="gradient-text">Gemini</h1>
        <h2 className="signin-subtitle">Supercharge your creativity and productivity</h2>
        <p className="signin-description">
          Chat to start writing, planning, learning, and more with Google AI.
        </p>
        <button className="signin-main-button" onClick={() => navigate("/signin")}>
            Sign in
          </button>
      </div>
      <div className="signin-image">
        <img src="https://img.freepik.com/premium-photo/close-up-futuristic-car-driving-city-street-generative-ai_974533-27130.jpg" alt="Gemini AI Preview" />
      </div>
    </div>
  </div>
  )
}

export default SigninLanding;