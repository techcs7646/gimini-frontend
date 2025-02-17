import { createContext, useState, useEffect } from "react";
import run from "../Constant";

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [previousPrompts, setPreviousPrompts] = useState([]); 
    const [showResult, setShowResult] = useState(false);
    const [resultData, setResultData] = useState("");

    
    const [mode, setMode] = useState(localStorage.getItem("mode") || "light");

   
    useEffect(() => {
        document.body.className = mode;
    }, [mode]);

    
    const toggleMode = () => {
        const newMode = mode === "light" ? "dark" : "light";
        setMode(newMode);
        localStorage.setItem("mode", newMode);
    };

    const sentMsg = async (prompt, handleStoreMessage) => {
        if (!prompt) return;
    
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(prompt);
        setError(null);
    
        try {
            const result = await run(prompt);
            console.log("API Response:", result);
    
            setResponse(result);
            setPreviousPrompts((prev) => [...prev, { prompt, response: result }]);
    
            let formattedResponse = result
                .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
                .replace(/\n/g, "<br>");
            setResultData(formattedResponse);
    
            
            handleStoreMessage(prompt, formattedResponse);
        } catch (err) {
            console.error("Error in sentMsg:", err);
            setError(err?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <Context.Provider
            value={{
                sentMsg,
                response,
                error,
                previousPrompts,
                setPreviousPrompts,
                recentPrompt,
                setRecentPrompt,
                showResult,
                setShowResult, 
                loading,
                resultData,
                setResultData,
                input,
                setInput,
                mode,
                toggleMode, 
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;
