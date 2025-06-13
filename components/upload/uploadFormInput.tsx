"use client";

import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { UploadButton } from "@/utils/uploadthing";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function UploadFormInput({ onSubmit }: UploadFormInputProps) {
  return (
    <div>
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex justify-end items-center gap-1.5">
          <Input
            type="file"
            id="file"
            name="file"
            accept="application/pdf"
            className=""
          />
          <UploadButton
            endpoint="pdfUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res);
              console.log("Uploaded successfully!");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              console.log(`ERROR! ${error.message}`);
            }}
          />

          <Button className="bg-rose-500">Upload your PDF</Button>
        </div>
      </form>
    </div>
  );
}
