"use client";
import { UploadDropzone } from "@/utils/uploadthing";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { useRef } from "react";

// Updated interface to match the file object structure
interface UploadFormInputProps {
  onUploadComplete: (file: {
    url: string;
    name: string;
    size: number;
    key: string;
  }) => void;
}

export default function UploadFormInput({
  onUploadComplete,
}: UploadFormInputProps) {
  const toastIdRef = useRef<string | number | null>(null);

  return (
    <div className="flex justify-center items-center py-6">
      <div className="group w-full max-w-4xl overflow-visible">
        <UploadDropzone
          endpoint="pdfUploader"
          onUploadBegin={() => {
            toastIdRef.current = toast(
              <div className="text-left">
                <p className="font-semibold text-base">
                  📖 Reading in progress...
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1">
                  Our AI is carefully scanning your document. Hang tight! ✨
                </p>
              </div>,
              {
                id: "upload-toast",
                duration: 999999,
              },
            );
          }}
          onClientUploadComplete={(res) => {
            toast.dismiss("upload-toast");
            toast.success("✅ Upload complete!");

            const uploadedFile = res?.[0];
            if (uploadedFile) {
              // Pass the complete file object instead of just the URL
              onUploadComplete({
                url: uploadedFile.url,
                name: uploadedFile.name,
                size: uploadedFile.size,
                key: uploadedFile.key,
              });
            } else {
              toast.error("❌ Something went wrong: No file received.");
            }
          }}
          onUploadError={(error: Error) => {
            // Check if it's a token/configuration error
            const isTokenError = error.message.includes("Invalid token") || 
                                error.message.includes("apiKey") ||
                                error.message.includes("appId");
            
            if (isTokenError) {
              toast.error(
                "❌ Upload service temporarily unavailable. Please try again later.",
                {
                  id: "upload-toast",
                  description: "Our upload service is experiencing issues. Please wait a moment and try again.",
                }
              );
            } else {
              toast.error(`❌ Upload failed: ${error.message}`, {
                id: "upload-toast",
              });
            }
          }}
          config={{
            mode: "auto",
          }}
          appearance={{
            container: ({ ready, isUploading }) =>
              twMerge(
                "w-full h-64 px-10 py-8 border-2 border-dashed rounded-2xl text-center transition-all duration-300",
                "bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md shadow-md",
                "group-hover:shadow-[0_4px_30px_rgba(244,114,182,0.4)]",
                ready && "border-rose-400",
                isUploading && "opacity-50 cursor-not-allowed",
              ),
            uploadIcon: () =>
              "text-6xl text-rose-400/50 mx-auto mb-3 transition-transform group-hover:scale-110",
            label: () =>
              "text-xl font-bold text-zinc-800 dark:text-white tracking-wide",
            allowedContent: () =>
              "text-sm text-zinc-600 dark:text-zinc-300 italic mt-1",
            button: ({ isUploading }) =>
              twMerge(
                "mt-5 px-8 py-3 rounded-full font-semibold shadow-md transition-all",
                "bg-rose-500 text-white",
                "hover:brightness-110 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 active:shadow-sm",
                isUploading && "bg-pink-300 cursor-not-allowed",
              ),
          }}
        />
      </div>
    </div>
  );
}
