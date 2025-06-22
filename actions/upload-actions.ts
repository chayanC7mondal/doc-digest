"use server";

import { getDbConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI, generateLocalSummary } from "@/lib/openai";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
interface PdfSummaryType {
  userId: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

// Fixed: Separate interface for storePdfSummaryAction parameters
interface StorePdfSummaryParams {
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

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
      console.log("🔄 Trying OpenAI...");
      summary = await generateSummaryFromOpenAI(pdfText);
      summarySource = "OpenAI";
      console.log("✅ OpenAI summary generated successfully");
    } catch (openAIError: any) {
      console.log("⚠️ OpenAI failed, trying Gemini...", openAIError.message);

      try {
        // Try Gemini as fallback
        console.log("🔄 Trying Gemini...");
        summary = await generateSummaryFromGemini(pdfText);
        summarySource = "Gemini";
        console.log("✅ Gemini summary generated successfully");
      } catch (geminiError: any) {
        console.log(
          "⚠️ Gemini also failed, using local summary...",
          geminiError.message
        );

        // Final fallback to local summary
        console.log("🔄 Using local summary as final fallback...");
        summary = generateLocalSummary(pdfText);
        summarySource = "Local";
        console.log("✅ Local summary generated");
      }
    }

    console.log(`✅ Summary generated successfully (${summarySource})`);
    console.log("\n📝 Generated Summary:");
    console.log("----------------------------------------");
    console.log(summary);
    console.log("----------------------------------------\n");

    const formattedFileName = formatFileNameAsTitle(fileName);
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

async function savePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  try {
    const sql = await getDbConnection();

    // Fixed: Return the inserted record
    const result = await sql`
      INSERT INTO pdf_summaries (
        user_id,
        original_file_url,
        summary_text,
        title,
        file_name
      ) VALUES (
        ${userId},
        ${fileUrl},
        ${summary},
        ${title},
        ${fileName}
      )
      RETURNING *
    `;

    return result[0]; // Return the first (and only) inserted record
  } catch (error) {
    console.error("Error saving PDF summary:", error);
    throw error;
  }
}

// Fixed: Use the correct interface
export async function storePdfSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: StorePdfSummaryParams) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "User not found. Please log in.",
      };
    }

    // Fixed: Actually use the returned value
    const savedSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    // Fixed: Check if we got a result back
    if (!savedSummary) {
      return {
        success: false,
        message: "Failed to save PDF summary, please try again.",
      };
    }

    return {
      success: true,
      message: "PDF summary saved successfully",
      data: savedSummary, // Include the saved data
    };
  } catch (error) {
    console.error("Error in storePdfSummaryAction:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error Saving PDF Summary",
    };
  }
}
