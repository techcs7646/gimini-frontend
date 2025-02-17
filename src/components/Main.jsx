import React, { useContext } from "react";
import axios from "axios"; 
import "./Main.css";
import { Context } from "../context/Context";

const Main = () => {
    const { sentMsg, input, setInput, showResult, recentPrompt, resultData, loading } = useContext(Context);
    const { mode } = useContext(Context);

    
    const token = localStorage.getItem("token");

    // Function to store data in MongoDB 
    const handleStoreMessage = async (message, response) => {
        if (!token) {
            console.error("No authentication token found.");
            return;
        }

        try {
            const res = await axios.post(
                "https://gimini-backend-1.onrender.com/store",
                { userMessage: message, aiResponse: response },
                {
                    headers: { Authorization: `Bearer ${token}` }, // Include JWT token
                    withCredentials: true,
                }
            );

            console.log("Message stored:", res.data);
        } catch (error) {
            console.error("Error storing message:", error.response?.data || error.message);
        }
    };

    // Handles sending a message
    const handleSend = () => {
        if (input.trim() !== "") {
            sentMsg(input, handleStoreMessage);
            setInput("");
        }
    };
    

    return (
        <div className={`container ${mode}`}>
           
            <nav className="navbar">
                <div className="navbar-left">
                    <p className="navbar-title">
                        Gemini <span className="dropdown-icon">▼</span>
                    </p>
                    <span className="navbar-subtitle">2.0 Flash</span>
                </div>
                <div className="navbar-right">
                    <button className="advanced-btn">
                        <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-gemini-icon.png" alt="Gemini Advanced" width="20px" />
                        <span> Try Gemini Advanced</span>
                    </button>
                    <img className="menu-icon" src="https://icons.veryicon.com/png/o/miscellaneous/offerino-icons/app-menu.png" alt="Menu" />
                    <img className="user-icon" src="https://openclipart.org/image/2000px/247319" alt="User Icon" />
                </div>
            </nav>

            {!showResult ? (
                <div className="welcome-text">
                    <h1>Hello, <span className="gradient-text">Chandrakanta</span></h1>
                </div>
            ) : (
                <div className="result">
                    <div className="result-title">
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="result-data">
                        <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-gemini-icon.png" alt="Response Icon" width="20px" />
                        {loading ? <div className="loader"><hr /><hr /><hr /></div> : <p dangerouslySetInnerHTML={{ __html: resultData }} />}
                    </div>
                </div>
            )}

            
            <div className="chat-box">
                <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder="Ask Gemini" onKeyDown={(e) => e.key === "Enter" && handleSend()} />
                <img onClick={handleSend} className="icon-right" src="https://static-00.iconduck.com/assets.00/send-icon-1024x1011-38wtwa0n.png" alt="Send" />
            </div>
        </div>
    );
};

export default Main;
