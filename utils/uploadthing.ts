import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

// Update the import path below to the correct relative path if needed
import type { OurFileRouter } from "../app/api/uploadthing/core";

export const UploadButton = generateUploadButton<OurFileRouter>();

export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
