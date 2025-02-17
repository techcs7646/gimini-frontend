import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import "./Sidebar.css";
import { Context } from "../context/Context";

const Sidebar = () => {
    const [expanded, setExpanded] = useState(false);
    const [showSettingsPopup, setShowSettingsPopup] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);

    const { 
        previousPrompts, 
        setRecentPrompt, 
        setResultData, 
        setShowResult, 
        mode, 
        toggleMode 
    } = useContext(Context);
    

    useEffect(() => {
        const fetchChatHistory = async () => {
            const token = localStorage.getItem("token");
            if (!token) return console.error("No token found in localStorage!");
    
            try {
                const { data } = await axios.get("https://gimini-backend-1.onrender.com/history", {
                    headers: { Authorization: `Bearer ${token}` },
                });
    
                const chats = data.chats?.map(chat => ({
                    prompt: chat.userMessage,
                    response: chat.aiResponse,
                })) || [];
    
                console.log("Processed Chat History:", chats);
                setChatHistory(chats);
            } catch (error) {
                console.error("Error fetching chat history:", error.message);
                setChatHistory([]);
            }
        };
    
    fetchChatHistory();
    }, []);
    



    
    const loadPrompt = (selectedPrompt) => {
        console.log("Selected Prompt:", selectedPrompt);

        
        const foundChat = [...previousPrompts, ...chatHistory].find(chat => chat?.prompt === selectedPrompt);

        if (foundChat) {
            setRecentPrompt(foundChat.prompt);
            setResultData(
                foundChat.response
                    ? foundChat.response.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>").replace(/\n/g, "<br>")
                    : "No response available"
            );
            setShowResult(true);
        } else {
            console.warn("Chat not found in history.");
        }
    };

    return (
        <div className={`sidebar ${mode}`}>
            <div className="top">
                <img 
                    onClick={() => setExpanded(prev => !prev)} 
                    className="menu" 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/640px-Hamburger_icon.svg.png" 
                    alt="menu-icon" 
                    width="20px" 
                />
                <div className="new-chat">
                    <img 
                        src="https://static-00.iconduck.com/assets.00/plus-icon-256x256-pzhqqf80.png" 
                        alt="plus-icon" 
                        width="20px" 
                    />
                    {expanded && <p>New Chat</p>}
                </div>

                
                {expanded && (
                    <div className="recent">
                        <p className="recent-title">Recent Chats</p>
                        {previousPrompts.map((chat, index) => (
                            <div 
                                className="recent-entry" 
                                key={index} 
                                onClick={() => loadPrompt(chat.prompt)}
                            >
                                <img 
                                    src="https://cdn-icons-png.flaticon.com/512/685/685887.png" 
                                    alt="message-icon" 
                                    width="20px" 
                                />
                                <p>{chat.prompt.slice(0, 12)}...</p>
                            </div>
                        ))}
                    </div>
                )}

                
                {expanded && (
                    <div className="recent">
                        <p className="recent-title">Chat History</p>
                        {Array.isArray(chatHistory) && chatHistory.length > 0 ? (
                            chatHistory.map((chat, index) => (
                                <div 
                                    className="recent-entry" 
                                    key={index} 
                                    onClick={() => loadPrompt(chat.prompt)}
                                >
                                    <img 
                                        src="https://cdn-icons-png.flaticon.com/512/685/685887.png" 
                                        alt="message-icon" 
                                        width="20px" 
                                    />
                                    <p>{chat.prompt.slice(0, 12)}...</p>
                                </div>
                            ))
                        ) : (
                            <p>No chat history available.</p>
                        )}
                    </div>
                )}
            </div>

            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img 
                        src="https://static-00.iconduck.com/assets.00/gem-icon-1024x961-dz0aagxp.png" 
                        alt="gem-icon" 
                        width="20px" 
                    />
                    {expanded && <p>Gem manager</p>}
                </div>
                <div className="bottom-item recent-entry">
                    <img 
                        src="https://icons.veryicon.com/png/o/miscellaneous/flat-icon/help-252.png" 
                        alt="help-icon" 
                        width="20px" 
                    />
                    {expanded && <p>Help</p>}
                </div>
                <div className="bottom-item recent-entry">
                    <img 
                        onClick={() => window.open("https://myactivity.google.com/product/gemini?utm_source=gemini&pli=1", "_blank")}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLv3lHkJtF8zMb21e2hBByto1MISwp9k6hbw&s" 
                        alt="activity-icon" 
                        width="20px" 
                    />
                    {expanded && <p>Activity</p>}
                </div>
                <div 
                    className="bottom-item recent-entry" 
                    onClick={() => setShowSettingsPopup(prev => !prev)}
                >
                    <img 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPW23d0Ca8PWhIRZbNPH3PBGutAKIuERYNTA&s" 
                        alt="setting-icon" 
                        width="20px" 
                    />
                    {expanded && <p>Settings</p>}
                </div>
            </div>

            
            {showSettingsPopup && (
                <div className="settings-popup">
                    <h3>Settings</h3>
                    <div className="toggle-container" onClick={toggleMode}>
                        <img 
                            src={mode === "dark" 
                                ? "https://cdn-icons-png.flaticon.com/512/564/564619.png" 
                                : "https://cdn-icons-png.flaticon.com/512/1694/1694680.png"} 
                            alt="mode-icon" 
                            width="20px"
                        />
                        <p>{mode === "dark" ? "Light Mode" : "Dark Mode"}</p>
                    </div>
                    <button className="close-btn" onClick={() => setShowSettingsPopup(false)}>Close</button>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
