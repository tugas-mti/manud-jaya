"use client";
import { useState } from "react";

interface ShowMoreTextProps {
  text: string;
  limit?: number;
}

export default function ShowMoreText({ text, limit = 200 }: ShowMoreTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = text.length > limit;
  const displayText = isExpanded ? text : text.slice(0, limit);

  return (
    <div className="text-gray-700">
      <p>
        {displayText}
        {!isExpanded && shouldTruncate && "..."}
      </p>
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:text-blue-800 mt-2"
        >
          {isExpanded ? "Show Less" : "Read More"}
        </button>
      )}
    </div>
  );
}
