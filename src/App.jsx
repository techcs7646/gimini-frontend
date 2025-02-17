import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'

import SigninLanding from './pages/SigninLandingPage'
import Signin from './pages/Signin'
import SignupPage from './pages/SignupPage'
import Protected from './pages/Protected'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SigninLanding />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/homepage" element={<Protected><HomePage /></Protected>} />
      </Routes>
    </Router>
  );
}

export default App;