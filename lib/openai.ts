import OpenAI from "openai";
import { generateLocalSummary } from "@/lib/local-summary";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";

export { generateLocalSummary };

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateSummaryFromOpenAI(pdfText: string) {
  try {
    const completion = await client.chat.completions.create({
      // Fixed: Use chat.completions
      model: "gpt-3.5-turbo", // Fixed: Use valid model name
      messages: [
        {
          role: "system",
          content: SUMMARY_SYSTEM_PROMPT, // Fixed: More appropriate system prompt
        },
        {
          role: "user",
          content: `Transform this document in to an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
          // Fixed: Added template literal for PDF text
          // Fixed: Added the actual PDF text
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    return completion.choices[0].message?.content || "No summary generated"; // Fixed: Added null check
  } catch (error: any) {
    // Added type annotation
    console.error("OpenAI API Error:", error);

    // For rate limit errors, return local summary instead of throwing
    if (error?.status === 429 || error?.code === "insufficient_quota") {
      console.log("⚠️ OpenAI quota exceeded, using local fallback");
      return generateLocalSummary(pdfText);
    }

    // For other errors, throw to be handled by the caller
    if (error?.status === 401) {
      throw new Error("Invalid API key. Please check your OpenAI API key.");
    }

    if (error?.status === 400) {
      throw new Error("Invalid request. Please check your input.");
    }

    throw new Error(`OpenAI API error: ${error?.message || "Unknown error"}`);
  }
}
