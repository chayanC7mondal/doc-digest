import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateLocalSummary } from "@/lib/local-summary";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";

export { generateLocalSummary };

export const generateSummaryFromGemini = async (
  pdfText: string,
): Promise<string> => {
  try {
    // Lazy initialization: only check/create when needed
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "GEMINI_API_KEY environment variable is not set. Please provide your Gemini API key.",
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Use the correct model name and configuration
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      },
      systemInstruction: SUMMARY_SYSTEM_PROMPT, // Proper system instruction placement
    });

    // Create the user prompt
    const userPrompt = `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`;

    // Generate content directly
    const result = await model.generateContent(userPrompt);
    const response = result.response;
    const text = response.text();

    return text || "No summary generated";
  } catch (error: any) {
    console.error("Gemini API Error:", error);

    // Handle rate limiting (429 status)
    if (error?.status === 429) {
      console.log("⚠️ Gemini rate limit exceeded, using local fallback");
      return generateLocalSummary(pdfText);
    }

    // Handle quota exceeded
    if (
      error.message &&
      (error.message.includes("quota") ||
        error.message.includes("rate limit") ||
        error.message.includes("insufficient_quota"))
    ) {
      console.log("⚠️ Gemini quota exceeded, using local fallback");
      return generateLocalSummary(pdfText);
    }

    // Handle authentication errors
    if (
      error?.status === 401 ||
      (error.message &&
        (error.message.includes("API key") || error.message.includes("401")))
    ) {
      throw new Error("Invalid API key. Please check your Gemini API key.");
    }

    // Handle other API errors with fallback
    if (error?.status >= 400 && error?.status < 500) {
      console.log("⚠️ Gemini API client error, using local fallback");
      return generateLocalSummary(pdfText);
    }

    // For server errors, also provide fallback
    if (error?.status >= 500) {
      console.log("⚠️ Gemini API server error, using local fallback");
      return generateLocalSummary(pdfText);
    }

    // Generic error handling with fallback
    console.log("⚠️ Gemini API error, using local fallback");
    return generateLocalSummary(pdfText);
  }
};
