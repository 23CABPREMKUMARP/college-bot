import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// Ensure you have VITE_GEMINI_API_KEY in your frontend/.env
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "YOUR_GEMINI_API_KEY";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function askGeminiChat(question) {
    if (API_KEY === "YOUR_GEMINI_API_KEY") {
        return "Please configure your VITE_GEMINI_API_KEY in the frontend/.env file to enable Gemini AI!";
    }

    try {
        console.log("API KEY prefix:", API_KEY.substring(0, 7));
        console.log("Using model: gemini-2.5-flash");
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const prompt = `
You are a highly helpful and friendly AI college admission assistant.
Provide accurate details about:
- college admissions
- fee structure
- courses
- eligibility
- top colleges
- specific details requested by the user.

Keep your answer engaging and formatted with line breaks, using friendly tone.

User question: ${question}
        `;

        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Gemini Chat Error:", error);
        return "I'm having trouble connecting to my brain right now. Please try again later!";
    }
}

export async function searchCollegesWithGemini(query) {
    if (API_KEY === "YOUR_GEMINI_API_KEY") {
        console.warn("API key missing for Gemini.");
        return [];
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
Generate a list of exactly 6 colleges matching this search or request: "${query}".
If it's a general request like "top colleges", provide 6 highly ranked diverse colleges in India.

Return ONLY a valid JSON array of objects.
Each object must match this structure exactly:
{
  "_id": "College Name",
  "name": "College Name",
  "location": "City, State",
  "fees": "e.g., ₹1.5L - ₹3L per year",
  "description": "Short 1-2 sentence description",
  "featured": true or false
}
        `;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        return JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
    } catch (error) {
        console.error("Gemini Search Error:", error);
        return [];
    }
}

export async function getCollegeDetailsWithGemini(collegeName) {
    if (API_KEY === "YOUR_GEMINI_API_KEY") return null;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
Generate detailed information for the college named "${collegeName}".
If this college is a prominent real college, use real facts.

Return ONLY a valid JSON object.
The object must match this structure exactly:
{
  "_id": "${collegeName}",
  "name": "${collegeName}",
  "location": "City, State",
  "ranking": 12,
  "website": "www.website.edu",
  "contact": "+91 0000 000000",
  "fees": "Average Fee Range",
  "description": "A comprehensive paragraph describing the college, its campus, and its reputation.",
  "featured": true,
  "courses": [
    {
      "_id": "1",
      "course_name": "B.Tech Computer Science and Engineering",
      "duration": "4 Years",
      "fees": 200000,
      "eligibility": "10+2 with PCM"
    },
    {
      "_id": "2",
      "course_name": "Course 2",
      "duration": "Duration",
      "fees": 150000,
      "eligibility": "Eligibility criteria"
    }
  ]
}
Ensure there are at least 3 courses in the "courses" array.
        `;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        let jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        return JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
    } catch (error) {
        console.error("Gemini Details Error:", error);
        return null; // Handle standard fallback via frontend check if needed
    }
}
