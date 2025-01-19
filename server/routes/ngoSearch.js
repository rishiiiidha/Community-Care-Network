// routes/ngoSearch.js
const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

/**
 * POST /api/search-ngos
 * Request body should contain:
 * - location: string (e.g., "Amalapuram, Konaseema district...")
 * - latitude: number
 * - longitude: number
 */
router.post("/search-ngos", async (req, res) => {
    try {
        const { location, latitude, longitude } = req.body;

        // Validate input
        if (!location || !latitude || !longitude) {
            return res.status(400).json({
                success: false,
                error: "Location, latitude, and longitude are required",
            });
        }

        // Format the prompt for Gemini
        const prompt = `I need nearby NGOs that supply food. My location is ${location}. The approximate geographical coordinates are:
        Latitude: ${latitude}° N
        Longitude: ${longitude}° E
        
        Please provide the details of nearby NGOs that supply food in JSON format. Each entry in the JSON should include the following fields:
        - name: The name of the NGO
        - location: The address of the NGO
        - latitude: The latitude of the NGO location
        - longitude: The longitude of the NGO location
        - description: A brief description of their activities or services
        - website: A URL to their website (if available)
        
        Do not include any additional information or explanations; only provide the JSON response.`;

        // Start chat session with Gemini
        const chatSession = model.startChat({
            generationConfig,
        });

        // Get response from Gemini
        const result = await chatSession.sendMessage(prompt);
        const responseText = result.response.text();

        // Parse the response as JSON
        let ngoData;
        try {
            // Remove any markdown formatting if present
            const jsonStr = responseText.replace(/```json\n?|\n?```/g, "");
            ngoData = JSON.parse(jsonStr);
        } catch (parseError) {
            console.error("Error parsing Gemini response:", parseError);
            return res.status(500).json({
                success: false,
                error: "Error parsing NGO data",
            });
        }

        return res.json({
            success: true,
            data: ngoData,
        });
    } catch (error) {
        console.error("NGO search error:", error);
        return res.status(500).json({
            success: false,
            error: "Error searching for NGOs",
        });
    }
});

module.exports = router;

