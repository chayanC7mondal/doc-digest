import { splitIntoSentences } from "@/utils/text-utils";

function cleanParagraphs(pdfText: string): string[] {
  const joined = pdfText
    .split("\n")
    .reduce((acc, line) => {
      const trimmed = line.trim();
      if (!trimmed) {
        acc.push("");
        return acc;
      }

      const last = acc[acc.length - 1];
      if (
        last &&
        last !== "" &&
        !/[.!?:]$/.test(last) &&
        !/^[A-D]\.\s/.test(trimmed)
      ) {
        acc[acc.length - 1] = `${last} ${trimmed}`;
      } else {
        acc.push(trimmed);
      }
      return acc;
    }, [] as string[])
    .join("\n");

  return joined
    .split(/\n\s*\n/)
    .map((p) => p.trim().replace(/\s+/g, " "))
    .filter(
      (p) =>
        p.length > 50 &&
        !/^[A-D]\.\s/.test(p) &&
        !/^[\d•\-\*]+\s*$/.test(p),
    );
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

function bullet(emoji: string, text: string): string {
  return `- ${emoji} ${text}`;
}

function pickSentences(sentences: string[], start: number, count: number): string[] {
  const picked: string[] = [];
  for (let i = start; i < sentences.length && picked.length < count; i++) {
    picked.push(sentences[i]);
  }
  while (picked.length < count && sentences.length > 0) {
    picked.push(sentences[picked.length % sentences.length]);
  }
  return picked.slice(0, count);
}

/** Build prompt-aligned markdown from raw prose (used by fallback + legacy repair). */
export function buildStructuredSummaryFromText(rawText: string): string {
  const cleaned = rawText
    .replace(/^📝\s*\*\*Document Summary\*\*\s*/i, "")
    .replace(/^\*\*Preview:\*\*\s*/im, "")
    .replace(/\*This is a basic summary[\s\S]*$/i, "")
    .trim();

  const sentences = splitIntoSentences(cleaned);
  if (sentences.length === 0) {
    return `# 📝 Document Overview
- 🎯 Unable to extract readable content from this document.

# 🔍 Summary Line
- 💡 Please try uploading a text-based PDF.

# ✅ Bottom Line
- 🎯 Re-upload the document or try again later.`;
  }

  const titleHint = truncate(
    (sentences[0].split(/[,:]/)[0] || "Document Overview").trim(),
    60,
  );

  let idx = 0;
  const next = (count: number) => {
    const items = pickSentences(sentences, idx, count);
    idx += items.length;
    return items;
  };

  const titlePoints = next(1);
  const summaryPoints = next(2);
  const detailPoints = next(2);
  const highlightPoints = next(3);
  const whyPoints = next(1);
  const mainPoints = next(3);
  const tipPoints = next(3);
  const termPoints = next(2);
  const bottomPoints = next(1);

  return `# 📝 ${titleHint}
${bullet("🎯", titlePoints[0])}

# 🔍 Summary Line
${bullet("💡", summaryPoints[0])}
${bullet("➕", summaryPoints[1] || summaryPoints[0])}

# 📄 Document Details
${bullet("📘", `Type: ${titleHint}`)}
${bullet("🎯", `For: Readers seeking a quick overview of ${titleHint.toLowerCase()}`)}

# ✨ Key Highlights
${bullet("🚀", highlightPoints[0])}
${bullet("🌟", highlightPoints[1] || highlightPoints[0])}
${bullet("🔍", highlightPoints[2] || highlightPoints[1] || highlightPoints[0])}

# 🌍 Why It Matters
${bullet("💬", whyPoints[0])}

# 📌 Main Points
${bullet("✅", mainPoints[0])}
${bullet("💪", mainPoints[1] || mainPoints[0])}
${bullet("🎯", mainPoints[2] || mainPoints[1] || mainPoints[0])}

# 🛠️ Pro Tips
${bullet("💡", tipPoints[0])}
${bullet("📘", tipPoints[1] || tipPoints[0])}
${bullet("🔧", tipPoints[2] || tipPoints[1] || tipPoints[0])}

# 📚 Key Terms to Know
${bullet("🧠", termPoints[0])}
${bullet("📘", termPoints[1] || termPoints[0])}

# ✅ Bottom Line
${bullet("🎯", bottomPoints[0])}`;
}

/** Fallback summary formatted to match the UI slide parser and prompt structure. */
export function generateLocalSummary(pdfText: string): string {
  const paragraphs = cleanParagraphs(pdfText);
  const fallbackText = pdfText.replace(/\s+/g, " ").trim();
  const sourceText = paragraphs.join(" ") || fallbackText;
  return buildStructuredSummaryFromText(sourceText);
}
