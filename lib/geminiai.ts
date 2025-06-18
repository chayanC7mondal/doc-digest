import { GoogleGenerativeAI } from "@google/generative-ai";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";

// Ensure GEMINI_API_KEY is set in your environment variables
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error(
    "GEMINI_API_KEY environment variable is not set. Please provide your Gemini API key."
  );
}

const genAI = new GoogleGenerativeAI(apiKey);

// Local fallback summary generator (uncommented and available as backup)
export const generateLocalSummary = (pdfText: string): string => {
  // Split into paragraphs and clean up
  const paragraphs = pdfText
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  // Get first few paragraphs
  const preview = paragraphs.slice(0, 3).join("\n\n");

  // Extract key points (looking for bullet points or numbered lists)
  const keyPoints = pdfText
    .split("\n")
    .filter((line) => line.trim().match(/^[•\-\*]\s|^\d+\.\s/))
    .slice(0, 5)
    .map((point) => point.trim());

  // Format the summary
  let summary = "📝 **Document Summary**\n\n";
  summary += "**Preview:**\n" + preview + "\n\n";

  if (keyPoints.length > 0) {
    summary += "**Key Points:**\n";
    keyPoints.forEach((point) => {
      summary += `• ${point.replace(/^[•\-\*]\s|^\d+\.\s/, "")}\n`;
    });
  }

  summary +=
    "\n*This is a basic summary generated locally. For a more detailed AI-powered summary, please try again later when the Gemini service is available.*";

  return summary;
};

export const generateSummaryFromGemini = async (
  pdfText: string
): Promise<string> => {
  try {
    // Use the correct model name and configuration
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // Fixed model name
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
