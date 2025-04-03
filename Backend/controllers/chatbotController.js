import axios from "axios";
import dotenv from "dotenv";
import Chat from "../models/ChatModel.js";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

export const chatWithBot = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        console.log("User message received:", message);

        const requestData = {
            contents: [{
                parts: [{ text: message }]
            }]
        };

        const response = await axios.post(GEMINI_API_URL, requestData, {
            headers: { "Content-Type": "application/json" },
        });

        console.log("API Response:", response.data);

        if (!response.data?.candidates || response.data.candidates.length === 0) {
            return res.status(500).json({ error: "No response from AI" });
        }

        const botResponse = response.data.candidates[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";

        // Save chat history (optional)
        const chat = new Chat({ userMessage: message, botResponse });
        await chat.save();

        res.json({ reply: botResponse });
    } catch (error) {
        console.error("Chatbot Error:", error.response?.data || error.message);

        if (error.response?.status === 404) {
            return res.status(404).json({ error: "Invalid API Endpoint or Key" });
        }

        res.status(500).json({ error: "Failed to process the request", details: error.message });
    }
};
