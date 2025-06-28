import { parsePoint, parseEmojiPoint } from "@/utils/summary-helpers";
import React from "react";

// Function to render text with bold formatting
const renderTextWithBold = (text: string): React.ReactNode => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      // Remove the ** markers and make bold
      const boldText = part.slice(2, -2);
      return (
        <strong key={index} className="font-semibold">
          {boldText}
        </strong>
      );
    }
    return part;
  });
};

const EmojiPoint = ({ point }: { point: string }) => {
  const { emoji, text } = parseEmojiPoint(point) ?? {};
  return (
    <div className="group relative bg-gradient-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
      <div className="relative flex items-start gap-3">
        <span className="text-lg lg:text-xl shrink-0 pt-1">{emoji}</span>
        <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">
          {renderTextWithBold(text || "")}
        </p>
      </div>
    </div>
  );
};

const RegularPoint = ({ point }: { point: string }) => {
  return (
    <div className="group relative bg-gradient-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
      <p className="relative text-lg lg:text-xl text-muted-foreground/90 leading-relaxed text-left">
        {renderTextWithBold(point)}
      </p>
    </div>
  );
};

export default function ContentSection({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <div className="space-y-4">
      {points.map((point, index) => {
        const { isNumbered, isMainPoint, hasEmoji, isEmpty } =
          parsePoint(point);

        if (isEmpty) {
          return null; // Skip empty points
        }

        if (hasEmoji || isMainPoint) {
          return <EmojiPoint key={`point-${index}`} point={point} />;
        }

        return <RegularPoint key={`point-${index}`} point={point} />;
      })}
    </div>
  );
}
