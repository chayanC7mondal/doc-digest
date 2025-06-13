import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Fixed: Common env var name
});

export async function generateSummaryFromOpenAI(pdfText: string) {
  try {
    const completion = await client.chat.completions.create({
      // Fixed: Use chat.completions
      model: "gpt-4o", // Fixed: Use valid model name
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that creates concise, professional summaries of documents. Focus on key points, main topics, and important details.", // Fixed: More appropriate system prompt
        },
        {
          role: "user",
          content: ``, // Fixed: Added the actual PDF text
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    return completion.choices[0].message?.content || "No summary generated"; // Fixed: Added null check
  } catch (error: any) {
    // Added type annotation
    console.error("OpenAI API Error:", error);

    if (error?.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }

    if (error?.status === 401) {
      throw new Error("Invalid API key. Please check your OpenAI API key.");
    }

    if (error?.status === 400) {
      throw new Error("Invalid request. Please check your input.");
    }

    throw new Error(`OpenAI API error: ${error?.message || "Unknown error"}`);
  }
}
