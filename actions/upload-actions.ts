"use server";

import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI, generateLocalSummary } from "@/lib/openai";

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
      summary: null,
    };
  }

  const { url: pdfUrl, name: fileName } = file;

  try {
    console.log(`🔄 Processing PDF: ${fileName}`);

    // Extract text from PDF
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log(`📄 Extracted ${pdfText.length} characters from PDF`);
    console.log("\n📑 PDF Content Preview:");
    console.log("----------------------------------------");
    console.log(pdfText.substring(0, 500) + "..."); // Show first 500 chars
    console.log("----------------------------------------\n");

    if (!pdfText || pdfText.trim().length === 0) {
      return {
        success: false,
        message: "PDF appears to be empty or text could not be extracted",
        data: null,
        summary: null,
      };
    }

    // Generate summary
    console.log("🤖 Attempting AI summary generation...");
    const summary = await generateSummaryFromOpenAI(pdfText);
    const summarySource = summary.includes(
      "This is a basic summary generated locally"
    )
      ? "Local"
      : "OpenAI";

    console.log(`✅ Summary generated successfully (${summarySource})`);
    console.log("\n📝 Generated Summary:");
    console.log("----------------------------------------");
    console.log(summary);
    console.log("----------------------------------------\n");

    return {
      success: true,
      message: `PDF processed successfully using ${summarySource} summarization`,
      data: {
        fileName,
        fileSize: file.size,
        fileKey: file.key,
        textLength: pdfText.length,
        extractedText: pdfText,
        summarySource,
      },
      summary,
    };
  } catch (error) {
    console.error("❌ Error processing PDF:", error);
    return {
      success: false,
      message: `Error processing PDF: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      data: null,
      summary: null,
    };
  }
}

// Optional: Add a function to check API status
export async function checkOpenAIStatus() {
  try {
    // Try a minimal API call to check if the service is available
    const testResult = await generateSummaryFromOpenAI(
      "Test document for API health check."
    );
    return { available: true, message: "OpenAI API is working" };
  } catch (error: any) {
    return {
      available: false,
      message: error.message.includes("quota")
        ? "API quota exceeded"
        : "API unavailable",
    };
  }
}
