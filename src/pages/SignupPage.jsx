import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";
import axios from "axios";

const SignupPage = () => {
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); 

  async function signup(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/signup", {
        name: userDetails.fullName,
        email: userDetails.email,
        password: userDetails.password,
      });

      if (response.status === 201) {
        alert("Signup successful!");
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/homepage");
        
      }
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      alert("Signup failed. Please try again.");
    }
   

  }

  return (
    <div className="signup-page">
      <div className="signup-box">
        <h1>Sign Up</h1>
        <p>Create an account to get started</p>
        <form onSubmit={signup}> 
          <input
            type="text"
            placeholder="Full Name"
            required
            value={userDetails.fullName}
            onChange={(e) =>
              setUserDetails({ ...userDetails, fullName: e.target.value })
            }
          />
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
          <button type="submit">Sign Up</button>
        </form>
        <p className="signin-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/signin")}>Sign In</span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
