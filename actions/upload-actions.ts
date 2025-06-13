"use server";

import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";

// Updated parameter type to match what's actually being passed
export async function generatePdfSummary(file: {
  url: string;
  name: string;
  size: number;
  key: string;
}) {
  if (!file || !file.url) {
    return {
      success: false,
      message: "File Upload Failed - No file or URL provided",
      data: null,
    };
  }

  const { url: pdfUrl, name: fileName } = file;

  try {
    // Extract text from PDF
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log({ pdfText });

    // Here you can add additional processing/summarization logic
    // For now, returning the extracted text as the "summary"
    // You could integrate with OpenAI or other LLM APIs here to create an actual summary
    let summary;
    try {
      summary = await generateSummaryFromOpenAI(pdfText);
      console.log("Generated Summary:", summary);
    } catch (error) {
      console.log("Error generating summary:", error);
      // call gemini code
    }
    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary from PDF text",
        data: null,
      };
    }
    return {
      success: true,
      message: "PDF processed successfully",
      data: pdfText, // or process this text further to create a summary
    };
  } catch (error) {
    console.error("Error processing PDF:", error);
    return {
      success: false,
      message:
        "Error processing PDF: " +
        (error instanceof Error ? error.message : "Unknown error"),
      data: null,
    };
  }
}
