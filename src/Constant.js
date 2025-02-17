  import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = "AIzaSyBGVVCp_9lshchmdDb1F7IR7CNEyyEflm0"; 
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

async function run(prompt) {
    try {
        const result = await model.generateContent({
            generationConfig,
            contents: [{ role: "user", parts: [{ text: prompt }] }],
        });

        if (!result.response) {
            throw new Error("No response received from the API.");
        }

        return result.response.text();
    } catch (error) {
        console.error("Error generating response:", error.message);
        return "Error processing your request. Please try again later.";
    }
}


export default run;
