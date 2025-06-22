import OpenAI from "openai";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Fixed: Common env var name
});

// Local fallback summary generator
export function generateLocalSummary(pdfText: string): string {
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
    "\n*This is a basic summary generated locally. For a more detailed AI-powered summary, please try again later when the OpenAI service is available.*";

  return summary;
}

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
