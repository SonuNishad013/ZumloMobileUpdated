// utils/stringUtils.js
export const capitalizeFirstLetter = (text?: any) => {
  if (!text) return "";

  // Split into words and fix each one
  return text
    .split(" ")
    .map((word: string) => {
      if (word.toLowerCase() === "zumlo") {
        return "Zumlo"; // Always keep Zumlo with capital Z
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
};
