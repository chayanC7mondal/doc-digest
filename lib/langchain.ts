import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
export async function fetchAndExtractPdfText(fileUrl: string) {
  const response = await fetch(fileUrl);

  if (!response.ok) {
    throw new Error(
      `Unable to fetch the uploaded file (${response.status} ${response.statusText}). Please upload a valid PDF.`
    );
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("pdf")) {
    throw new Error(
      "The uploaded file does not look like a valid PDF. Please upload a PDF document."
    );
  }

  const blob = await response.blob();

  const arrayBuffer = await blob.arrayBuffer();

  const loader = new PDFLoader(new Blob([arrayBuffer]));
  const docs = await loader.load();

  //combine all pages
  return docs.map((doc) => doc.pageContent).join("\n");
}
