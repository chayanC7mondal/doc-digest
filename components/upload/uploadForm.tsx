"use client";
import React, { useState } from "react";
import UploadFormInput from "./uploadFormInput";
import { toast } from "sonner";
import { generatePdfSummary } from "@/actions/upload-actions";

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

  const handleUploadComplete = async (file: UploadedFile) => {
    setIsProcessing(true);
    toast.info("✨ Parsing the document with AI...");

    try {
      // Pass the file object directly
      const result = await generatePdfSummary(file);

      if (result.success) {
        toast.success("✅ Summary ready!");
        setSummary(result.data || "");
        console.log("Summary:", result.data);
        // Store to DB or Redirect
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

// "use client";

// import React, { use, useState } from "react";

// import UploadFormInput from "./uploadFormInput";
// import { z } from "zod";
// import { file } from "zod/v4";

// import { toast } from "sonner";

// const schema = z.object({
//   file: z
//     .instanceof(File, { message: "Invalid file" })
//     .refine(
//       (file) => file.size <= 17 * 1024 * 1024,
//       "File size must be less than 17MB"
//     )
//     .refine((file) => file.type === "application/pdf", "File must be a PDF"),
// });

// export default function UploadForm() {
//   const handleUploadComplete = async (url: string) => {
//     setFileUrl(url);
//     toast.success("✅ Upload complete! Parsing file...");

//     //schema with zod
//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
//       console.log("submitted");
//       const formData = new FormData(e.currentTarget);
//       const file = formData.get("file") as File | null;
//       //validating the fields
//       const validatedFields = schema.safeParse({ file });
//       console.log(validatedFields);
//       if (!validatedFields.success) {
//         console.log(
//           validatedFields.error.flatten().fieldErrors.file?.[0] ??
//             "Invalid file"
//         );
//         toast(
//           validatedFields.error.flatten().fieldErrors.file?.[0] ??
//             "Something went wrong: Invalid file"
//         );
//         return;
//       }

//       //upload the file to uploadthing
//       //in uploadFormInput.tsx

//       //parse the pdf using langchain
//       try {
//         // ✅ Call LangChain or your parsing logic
//         const summary = await generatePdfSummary(url);

//         // 🧠 Store to DB or redirect
//         toast.success("✨ Summary ready!");
//         console.log("Summary:", summary);
//       } catch (err) {
//         toast.error("❌ Error while parsing document");
//         console.error(err);
//       }
//     };

//     //summarize the pdf using AI
//     //save the summary to database
//     //redirect to the [id].summary.page
//   };
//   return (
//     <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
//       <UploadFormInput onUploadComplete={handleUploadComplete} />
//     </div>
//   );
// }
