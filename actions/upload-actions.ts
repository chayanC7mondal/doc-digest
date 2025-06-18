"use server";

import { generateSummaryFromGemini } from "@/lib/geminiai";
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

    // Generate summary with fallback strategy
    console.log("🤖 Attempting AI summary generation...");

    let summary: string;
    let summarySource: string;

    try {
      // Try OpenAI first
      summary = await generateSummaryFromOpenAI(pdfText);
      summarySource = summary.includes(
        "This is a basic summary generated locally"
      )
        ? "Local"
        : "OpenAI";
    } catch (openAIError: any) {
      console.log("⚠️ OpenAI failed, trying Gemini...", openAIError.message);

      try {
        // Try Gemini as fallback
        summary = await generateSummaryFromGemini(pdfText);
        summarySource = summary.includes(
          "This is a basic summary generated locally"
        )
          ? "Local"
          : "Gemini";
      } catch (geminiError: any) {
        console.log(
          "⚠️ Gemini also failed, using local summary...",
          geminiError.message
        );

        // Final fallback to local summary
        summary = generateLocalSummary(pdfText);
        summarySource = "Local";
      }
    }

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
    return {
      available: true,
      message: "OpenAI API is working",
      source: testResult.includes("This is a basic summary generated locally")
        ? "Local"
        : "OpenAI",
    };
  } catch (error: any) {
    return {
      available: false,
      message: error.message.includes("quota")
        ? "API quota exceeded"
        : "API unavailable",
      error: error.message,
    };
  }
}

// Additional utility function to check Gemini status
export async function checkGeminiStatus() {
  try {
    const testResult = await generateSummaryFromGemini(
      "Test document for API health check."
    );
    return {
      available: true,
      message: "Gemini API is working",
      source: testResult.includes("This is a basic summary generated locally")
        ? "Local"
        : "Gemini",
    };
  } catch (error: any) {
    return {
      available: false,
      message:
        error.message.includes("quota") || error.message.includes("rate limit")
          ? "API quota/rate limit exceeded"
          : "API unavailable",
      error: error.message,
    };
  }
}

// Comprehensive API status check
export async function checkAllAPIStatus() {
  const [openAIStatus, geminiStatus] = await Promise.allSettled([
    checkOpenAIStatus(),
    checkGeminiStatus(),
  ]);

  return {
    openAI:
      openAIStatus.status === "fulfilled"
        ? openAIStatus.value
        : { available: false, message: "Check failed" },
    gemini:
      geminiStatus.status === "fulfilled"
        ? geminiStatus.value
        : { available: false, message: "Check failed" },
    hasAvailableAPI:
      (openAIStatus.status === "fulfilled" && openAIStatus.value.available) ||
      (geminiStatus.status === "fulfilled" && geminiStatus.value.available),
  };
}
