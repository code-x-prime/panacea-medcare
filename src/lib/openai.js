// src/lib/openai.js
import OpenAI from "openai";
import env from "@/config/env";

let openai = null;

// Initialize OpenAI only if API key is available
if (env.OPENAI_API_KEY && env.OPENAI_API_KEY.trim() !== "") {
  try {
    openai = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
    });
  } catch (error) {
    console.error("Failed to initialize OpenAI client:", error);
  }
}

export async function createChatCompletion(messages, options = {}) {
  // Check if OpenAI is configured
  if (!openai) {
    throw new Error(
      "OpenAI API key is not configured. Please set OPENAI_API_KEY in your environment variables."
    );
  }

  const {
    model = env.OPENAI_MODEL,
    max_tokens = 500,
    temperature = 0.7,
  } = options;

  try {
    return await openai.chat.completions.create({
      model,
      messages,
      max_tokens,
      temperature,
    });
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw error;
  }
}

export default openai;
