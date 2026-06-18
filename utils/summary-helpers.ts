export const parseSection = (
  section: string,
): { title: string; points: string[] } => {
  const [title, ...content] = section.split("\n");
  const cleanTitle = title.startsWith("#")
    ? title.substring(1).trim()
    : title.trim();

  // Remove any leading/trailing whitespace from content
  const points: string[] = [];
  let currentPoint = "";

  content.forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith(".")) {
      if (currentPoint) {
        points.push(currentPoint.trim());
      }
      currentPoint = trimmedLine;
    } else if (trimmedLine) {
      if (currentPoint) {
        points.push(currentPoint.trim());
        currentPoint = "";
      } else {
        currentPoint += " " + trimmedLine;
      }
    }
  });
  if (currentPoint) {
    points.push(currentPoint.trim());
  }

  return {
    title: cleanTitle,
    points: points.filter(
      (point) =>
        point && !point.startsWith("#") && !point.startsWith("[choose"),
    ),
  };
};

export function parsePoint(point: string) {
  const isNumbered = /^\d+\./.test(point);
  const isMainPoint = /^-/.test(point);
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

// import React from "react";

// export const parseSection = (
//   section: string
// ): { title: string; points: string[] } => {
//   const [title, ...content] = section.split("\n");
//   const cleanTitle = title.startsWith("#")
//     ? title.substring(1).trim()
//     : title.trim();

//   // Remove any leading/trailing whitespace from content
//   const points: string[] = [];
//   let currentPoint = "";

//   content.forEach((line) => {
//     const trimmedLine = line.trim();
//     if (trimmedLine.startsWith("-")) {
//       if (currentPoint) {
//         points.push(currentPoint.trim());
//       }
//       currentPoint = trimmedLine;
//     } else if (trimmedLine) {
//       if (currentPoint) {
//         currentPoint += " " + trimmedLine;
//       } else {
//         points.push(trimmedLine);
//       }
//     }
//   });

//   if (currentPoint) {
//     points.push(currentPoint.trim());
//   }

//   return {
//     title: cleanTitle,
//     points: points.filter(
//       (point) => point && !point.startsWith("#") && !point.startsWith("[choose")
//     ),
//   };
// };

// export function parsePoint(point: string) {
//   const isNumbered = /^\d+\./.test(point);
//   const isMainPoint = /^-/.test(point);
//   const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/u;
//   const hasEmoji = emojiRegex.test(point);
//   const isEmpty = !point.trim();
//   return { isNumbered, isMainPoint, hasEmoji, isEmpty };
// }

// export function parseEmojiPoint(content: string) {
//   const cleanContent = content.replace(/^[.\s-]+/, "").trim();
//   const matches = cleanContent.match(/^(\p{Emoji}+)(.+)$/u);
//   if (!matches) return null;

//   const [, emoji, text] = matches;
//   return { emoji: emoji.trim(), text: text.trim() };
// }

// // Enhanced function to parse and render bold text with better error handling
// export function renderTextWithBold(text: string): React.ReactNode {
//   if (!text) return "";

//   const parts = text.split(/(\*\*[^*]+\*\*)/g);

//   return parts.map((part, index) => {
//     if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
//       // Remove the ** markers and make bold
//       const boldText = part.slice(2, -2);
//       return React.createElement(
//         "strong",
//         { key: index, className: "font-semibold" },
//         boldText
//       );
//     }
//     return part || "";
//   });
// }

// // Additional utility function for handling multiple formatting types
// export function renderFormattedText(text: string): React.ReactNode {
//   if (!text) return "";

//   // Handle both bold (**text**) and potentially italic (*text*) in the future
//   const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);

//   return parts.map((part, index) => {
//     if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
//       const boldText = part.slice(2, -2);
//       return React.createElement(
//         "strong",
//         { key: index, className: "font-semibold" },
//         boldText
//       );
//     } else if (
//       part.startsWith("*") &&
//       part.endsWith("*") &&
//       part.length > 2 &&
//       !part.startsWith("**")
//     ) {
//       const italicText = part.slice(1, -1);
//       return React.createElement(
//         "em",
//         { key: index, className: "italic" },
//         italicText
//       );
//     }
//     return part || "";
//   });
// }
