"use client";

import React from "react";

import UploadFormInput from "./uploadFormInput";
import { z } from "zod";
import { file } from "zod/v4";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less than 20MB"
    )
    .refine((file) => file.type === "application/pdf", "File must be a PDF"),
});

export default function UploadForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File | null;
    //validating the fields
    const validatedFields = schema.safeParse({ file });
    if (!validatedFields.success) {
      console.log(
        validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file"
      );
      return;
    }
    //schema with zod
    //upload the file to uploadthing
    //parse the pdf using langchain
    //summarize the pdf using AI
    //save the summary to database
    //redirect to the [id].summary.page
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
