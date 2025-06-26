"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { NavigationControls } from "./navigation-controls";

const parseSection = (section: string) => {
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
      (point) => point && !point.startsWith("#") && !point.startsWith("[choose")
    ),
  };
};

export default function SummaryViewer({ summary }: { summary: string }) {
  const [currentSection, setCurrentSection] = useState(0);

  const handleNext = () =>
    setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));

  const handlePrevious = () =>
    setCurrentSection((prev) => Math.max(prev - 1, 0));

  const sections = summary
    .split("\n#")
    .map((section) => section.trim())
    .filter(Boolean)
    .map(parseSection);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{sections[currentSection].title}</CardTitle>
      </CardHeader>
      <CardContent>
        {JSON.stringify(sections[currentSection].points)}
        <NavigationControls
          currentSection={currentSection}
          totalSections={sections.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSelectionSelect={setCurrentSection}
        />
      </CardContent>
    </Card>
  );
}
