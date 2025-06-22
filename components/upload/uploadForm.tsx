"use client";
import React, { useState } from "react";
import UploadFormInput from "./uploadFormInput";
import { toast } from "sonner";
import {
  generatePdfSummary,
  storePdfSummaryAction,
} from "@/actions/upload-actions";
import { useRouter } from "next/navigation";

// Updated type to match what UploadThing returns
type UploadedFile = {
  name: string;
  url: string;
  size: number;
  key: string;
};

export default function UploadForm() {
  const [summary, setSummary] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleUploadComplete = async (file: UploadedFile) => {
    setIsProcessing(true);
    toast.info("✨ Parsing the document with AI...");

    try {
      // Pass the file object directly
      const result = await generatePdfSummary(file);

      if (result.success) {
        toast.success("✅ Summary ready!");
        setSummary(result.summary || "");
        console.log("Summary:", result.summary);

        // Store to DB
        if (result.summary) {
          toast.info("💾 Saving PDF...", {
            description: "Hang tight! We are saving your summary! 💭",
          });

          try {
            const storeResult = await storePdfSummaryAction({
              summary: result.summary,
              fileUrl: file.url, // Fixed: using file.url instead of undefined resp
              title: file.name.replace(".pdf", ""), // Fixed: using file.name instead of undefined data.fileName
              fileName: file.name,
            });

            if (storeResult.success) {
              toast.success("✅ Summary Generated", {
                description:
                  "Your PDF summary has been successfully generated and saved!",
              });

              //redirect to the [id] summary page
              router.push(`summaries/${storeResult.data.id}`);
            } else {
              toast.error("❌ Failed to save summary", {
                description:
                  storeResult.message || "Could not save to database",
              });
            }
          } catch (storeError) {
            console.error("Store error:", storeError);
            toast.error("❌ Failed to save summary", {
              description: "An error occurred while saving to database",
            });
          }
        }
      } else {
        toast.error(`❌ ${result.message}`);
      }
    } catch (err) {
      toast.error("❌ Error while parsing document");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onUploadComplete={handleUploadComplete} />

      {/* Display the summary */}
      {summary && (
        <div className="mt-8 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Document Summary:</h3>
          <p className="whitespace-pre-wrap">{summary}</p>
        </div>
      )}

      {isProcessing && (
        <div className="text-center text-gray-600">Processing document...</div>
      )}
    </div>
  );
}
