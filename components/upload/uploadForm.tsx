"use client";

import React, { useState } from "react";
import UploadFormInput from "./uploadFormInput";
import { toast } from "sonner";

// Example function — replace with actual LangChain API call
async function generatePdfSummary(url: string) {
  const res = await fetch("/api/parse-pdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  if (!res.ok) throw new Error("Parsing failed");
  const data = await res.json();
  return data.summary;
}

export default function UploadForm() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  //upload the file to uploadthing
  const handleUploadComplete = async (url: string) => {
    setFileUrl(url);
    toast.info("✨ Parsing the document with AI...");
    //parse the pdf using langchain
    try {
      const summary = await generatePdfSummary(url);
      toast.success("✅ Summary ready!");
      console.log("Summary:", summary);

      // Optional: Redirect or store in DB here
    } catch (err) {
      toast.error("❌ Error while parsing document");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onUploadComplete={handleUploadComplete} />
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
