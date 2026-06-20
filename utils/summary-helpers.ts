import { buildStructuredSummaryFromText } from "@/lib/local-summary";
import { splitIntoSentences } from "@/utils/text-utils";
export type SummarySlide = { title: string; points: string[] };

const POINTS_PER_SLIDE = 2;
const MAX_POINT_LENGTH = 180;
const HIGHLIGHT_EMOJIS = ["💡", "➕", "🚀", "🌟", "🔍", "💪", "🎯", "📌", "✅", "📘", "🔧", "🧠"];

function isBulletLine(line: string): boolean {
  return line.startsWith("-") || line.startsWith(".");
}

function isTitleLine(line: string): boolean {
  const cleaned = line.replace(/\*\*/g, "").replace(/^#+\s*/, "").trim();
  return (
    /^📝\s*document summary$/i.test(cleaned) ||
    /^document summary$/i.test(cleaned) ||
    (/^📝/.test(cleaned) && cleaned.length < 30)
  );
}

function isNoisePoint(point: string): boolean {
  const trimmed = point.trim();
  const textOnly = trimmed
    .replace(/^[\-.\s💡🎯📌🚀🌟🔍💪➕✅📘🔧🧠]+/u, "")
    .replace(/\*\*/g, "")
    .trim();

  return (
    !trimmed ||
    trimmed.startsWith("#") ||
    trimmed.startsWith("[choose") ||
    /^\*\*Preview:\*\*$/i.test(trimmed) ||
    /^Preview:$/i.test(trimmed) ||
    /^[A-D]\.\s/.test(trimmed) ||
    isTitleLine(textOnly) ||
    /^document summary$/i.test(textOnly)
  );
}

function extractPointEmoji(point: string): string {
  const match = point.match(/^[\-.\s]*(\p{Emoji})/u);
  return match?.[1] ?? "💡";
}

function stripPointPrefix(point: string): string {
  return point.replace(/^[\-.\s]+/, "").replace(/^\p{Emoji}+\s*/u, "").trim();
}

function splitOversizedPoint(point: string): string[] {
  const text = stripPointPrefix(point);
  if (text.length <= MAX_POINT_LENGTH) return [point];

  const emoji = extractPointEmoji(point);
  const sentences = splitIntoSentences(text);
  if (sentences.length <= 1) return [point];

  return sentences.map((sentence, index) => {
    const nextEmoji = index === 0 ? emoji : HIGHLIGHT_EMOJIS[index] ?? "📌";
    return `- ${nextEmoji} ${sentence}`;
  });
}

function expandSectionPoints(points: string[]): string[] {
  return points
    .flatMap((point) => splitOversizedPoint(point))
    .filter((point) => !isNoisePoint(point));
}

export const parseSection = (
  section: string,
): { title: string; points: string[] } => {
  const [title, ...content] = section.split("\n");
  const cleanTitle = title.replace(/^#+\s*/, "").trim();

  const points: string[] = [];
  let currentPoint = "";

  content.forEach((line) => {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine === "---") return;

    if (isBulletLine(trimmedLine)) {
      if (currentPoint) {
        points.push(currentPoint.trim());
      }
      currentPoint = trimmedLine;
    } else if (currentPoint) {
      currentPoint += " " + trimmedLine;
    } else if (!trimmedLine.startsWith("#") && !isTitleLine(trimmedLine)) {
      currentPoint = `- 💡 ${trimmedLine}`;
    }
  });

  if (currentPoint) {
    points.push(currentPoint.trim());
  }

  return {
    title: cleanTitle,
    points: expandSectionPoints(points),
  };
};

function parseMarkdownSectionsIntoSlides(summary: string): SummarySlide[] {
  const sections = summary
    .split(/\n(?=#{1,6}\s)/)
    .map((section) => section.trim())
    .filter(Boolean)
    .map(parseSection)
    .filter((section) => section.points.length > 0);

  const slides: SummarySlide[] = [];

  for (const section of sections) {
    if (section.points.length <= POINTS_PER_SLIDE) {
      slides.push(section);
      continue;
    }

    for (let i = 0; i < section.points.length; i += POINTS_PER_SLIDE) {
      slides.push({
        title: section.title,
        points: section.points.slice(i, i + POINTS_PER_SLIDE),
      });
    }
  }

  return slides;
}

export function parseSummaryIntoSlides(summary: string): SummarySlide[] {
  const hasMarkdownSections =
    /\n#{1,6}\s/.test(summary) || /^#{1,6}\s/m.test(summary);

  if (hasMarkdownSections) {
    const slides = parseMarkdownSectionsIntoSlides(summary);
    if (slides.length > 0) return slides;
  }

  return parseMarkdownSectionsIntoSlides(
    buildStructuredSummaryFromText(summary),
  );
}

export function parsePoint(point: string) {
  const isNumbered = /^\d+\./.test(point);
  const isMainPoint = /^-/.test(point) || /^\./.test(point);
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/u;
  const hasEmoji = emojiRegex.test(point);
  const isEmpty = !point.trim();
  return { isNumbered, isMainPoint, hasEmoji, isEmpty };
}

export function parseEmojiPoint(content: string) {
  const cleanContent = content.replace(/^[.\s-]+/, "").trim();
  const matches = cleanContent.match(/^(\p{Emoji}+)(.+)$/u);
  if (!matches) return null;

  const [, emoji, text] = matches;
  return { emoji: emoji.trim(), text: text.trim() };
}
