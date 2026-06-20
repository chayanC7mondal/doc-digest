export function splitIntoSentences(text: string): string[] {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+(?=[A-Z0-9"([])/)
    .map((sentence) => sentence.trim())
    .filter(
      (sentence) =>
        sentence.length > 25 &&
        !/^[A-D]\.\s/.test(sentence) &&
        !/^document summary$/i.test(sentence.replace(/\*\*/g, "")),
    );
}
