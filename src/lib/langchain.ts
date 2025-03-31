import { ChatGoogleGenerativeAI } from "@langchain/google-genai";


export const geminiModal = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",  // Change to your desired model, e.g., "gemini-pro",gemini-2.0-flash
    maxOutputTokens: 16000,
    apiKey: process.env.GOOGLE_API_KEY,  
    temperature: 0.3,
    streaming: true,  // Set this to false if you don't want streaming
  });