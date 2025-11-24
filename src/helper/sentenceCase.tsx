export const formatSentenceCase = (str: string | any) => {
  if (!str || typeof str !== "string") {
    return str;
  }

  return (
    str
      .trim()
      .toLowerCase()
      // Capitalize the first letter of the string
      .replace(/^(\w{1})/, (letter: any) => letter.toUpperCase())
      // Capitalize after sentence-ending punctuation (., !, ?, :)
      .replace(
        /([\.\!\?\,\:]\s*)(\w{1})/g,
        (_, p1, p2) => p1 + p2.toUpperCase()
      )
      // Ensure "I" is capitalized when used alone
      .replace(/\bi\b/g, "I")
      // Preserve lowercase for single letters unless they are at the beginning
      .replace(/\b(a|an|the|of|to|in|on|for|with|as|by|at|or|and)\b/g, (word) =>
        word.toLowerCase()
      )
      // Handle contractions correctly
      .replace(/'\w/g, (match: any) => match[0] + match[1].toLowerCase())
      .replace(/`\w/g, (match: any) => match[0] + match[1].toLowerCase())
      .replace(/’\w/g, (match: any) => match[0] + match[1].toLowerCase())
      // Ensure specific abbreviations remain uppercase
      .replace(/\bcbt\b/gi, "CBT")
      .replace(/\bdbt\b/gi, "DBT")
      .replace(/\bcopd\b/gi, "COPD")
      .replace(/\botp\b/gi, "OTP")
      .replace(/\bocd\b/gi, "OCD")
      .replace(/\badhd\b/gi, "ADHD")
      .replace(/\bptsd\b/gi, "PTSD")
      .replace(/\bzumlo\b/gi, "Zumlo")
  );
};

export const ButtonSentencecase = (str: string | any) => {
  if (str === undefined) {
    return;
  }
  return str
    .toLowerCase()
    .replace(/(^\w{1}|[\.\!\?\,\:]\s*\w{1}|\b\w{1}\b)/g, (letter: any) =>
      letter.toUpperCase()
    )
    .replace(/'\w/g, (match: any) => match[0] + match[1].toLowerCase())
    .replace(/`\w/g, (match: any) => match[0] + match[1].toLowerCase())
    .replace(/’\w/g, (match: any) => match[0] + match[1].toLowerCase())
    .replace(/\bcbt\b/gi, "CBT")
    .replace(/\bdbt\b/gi, "DBT")
    .replace(/\bcopd\b/gi, "COPD")
    .replace(/\botp\b/gi, "OTP");
};
