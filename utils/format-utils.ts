export function formatFileNameAsTitle(fileName: string): string {

  // Remove file extension

  const withoutExtension = fileName.replace(/\.[^/.]+$/, "");



  // Replace special characters with spaces and add space before uppercase letters

  const withSpaces = withoutExtension

    .replace(/[_-]/g, " ") // Replace underscores and dashes with spaces

    .replace(/([a-z])([A-Z])/g, "$1 $2"); // Add space before capital letters in camelCase



  // Convert to Title Case

  return withSpaces

    .split(" ")

    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())

    .join(" ")

    .trim(); // <- moved .trim() here correctly

}

