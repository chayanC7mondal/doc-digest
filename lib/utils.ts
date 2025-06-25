import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFileName(url: string): string {
  const fileName = url.split("/").pop() || "";
  return fileName
    .replace(/\.[^/.]+$/, "") // Remove file extension
    .replace(/[-_]/g, " ") // Replace dashes and underscores with spaces
    .split(" ")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word
          .slice(1) // Capitalize each word
          .toLowerCase()
    )
    .join(" "); // Join words with a space
}
