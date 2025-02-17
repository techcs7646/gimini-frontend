import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signin.css";

const Signin = () => {
  const navigate = useNavigate(); 

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  async function signin(e) {
    e.preventDefault(); 

    try {
      const response = await axios.post("https://gimini-backend-1.onrender.com/login", {
        email: userDetails.email,
        password: userDetails.password,
      });

      if (response.status === 200) {
        alert("Login successful!");
        const token = response.data.token;
        localStorage.setItem("token", token); 
        navigate("/homepage"); 
      }
    } catch (error) {
      console.error("Signin failed:", error.response?.data || error.message);
      alert("Signin failed. Please try again.");
    }
  }

  return (
    <div className="signin-page">
      <div className="signin-box">
        <h1>Sign In</h1>
        <p>Enter your email and password to continue</p>
        <form onSubmit={signin}> 
          <input
            type="email"
            placeholder="Email"
            required
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={userDetails.password}
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
          />
          <button type="submit">Sign In</button> 
        </form>
        <p className="signup-link">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Signin;
