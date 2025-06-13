// "use client";

// import React from "react";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { UploadButton } from "@/utils/uploadthing";

// interface UploadFormInputProps {
//   onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
// }

// export default function UploadFormInput({ onSubmit }: UploadFormInputProps) {
//   return (
//     <div>
//       <form className="flex flex-col gap-6" onSubmit={onSubmit}>
//         <div className="flex justify-end items-center gap-1.5">
//           <Input
//             type="file"
//             id="file"
//             name="file"
//             accept="application/pdf"
//             className=""
//           />
//           <UploadButton
//             endpoint="pdfUploader"
//             onClientUploadComplete={(res) => {
//               // Do something with the response
//               console.log("Files: ", res);
//               console.log("Uploaded successfully!");
//             }}
//             onUploadError={(error: Error) => {
//               // Do something with the error.
//               console.log(`ERROR! ${error.message}`);
//             }}
//           />

//           <Button className="bg-rose-500">Upload your PDF</Button>
//         </div>
//       </form>
//     </div>
//   );
// }

"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export default function UploadFormInput() {
  return (
    <div className="flex justify-center items-center p-6">
      <UploadDropzone
        endpoint="pdfUploader"
        onClientUploadComplete={() => {
          toast.success("✅ Upload complete!");
        }}
        onUploadError={(error: Error) => {
          toast.error(`❌ Upload failed: ${error.message}`);
        }}
        config={{
          mode: "auto",
          cn: twMerge,
        }}
        appearance={{
          container: ({ ready, isUploading }) =>
            twMerge(
              "w-full max-w-4xl h-62 px-8 py-6 border-2 border-dashed rounded-2xl text-center transition duration-200",
              "bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md shadow-md",
              ready && "border-pink-400",
              isUploading && "opacity-50 cursor-not-allowed"
            ),
          uploadIcon: () =>
            "text-6xl text-rose-400/50 mx-auto mb-3 transition-transform group-hover:scale-105",
          label: () =>
            "text-xl font-bold text-zinc-800 dark:text-white tracking-wide",
          allowedContent: () =>
            "text-sm text-zinc-600 dark:text-zinc-300 italic mt-1",
          button: ({ isUploading }) =>
            twMerge(
              "mt-4 px-6 py-2 rounded-full font-semibold shadow transition-all",
              "bg-rose-500",
              "hover:brightness-110",
              isUploading && "bg-pink-300 cursor-not-allowed"
            ),
        }}
      />
    </div>
  );
}
