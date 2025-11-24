// export const hasDuplicateTimes = (
//   options?: { optionValue: string }[]
// ): boolean => {
//   if (!Array.isArray(options)) return false; // Treat undefined/null/invalid as no duplicates

//   const seen = new Set();

//   for (const item of options) {
//     if (seen.has(item.optionValue)) {
//       return true;
//     }
//     seen.add(item.optionValue);
//   }

//   return false;
// };
// import { data } from './dataSource'; // Adjust the path to the correct file where 'data' is defined

const extractNumber = (str?: string | null): number | null => {
  if (!str || typeof str !== "string") return null;
  const match = str.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
};

export const hasDuplicateTimes = (data: any, index: number) => {
  const question = data[index];
  if (!question) return false;

  const selectedOption = question.stepOptions?.find(
    (opt: any) => opt?.isSelected
  );

  const extracted = extractNumber(selectedOption?.optionValue); // Notice the "?" safe check

  if (extracted === null) {
    console.warn("Invalid value for extraction", selectedOption);
    return false;
  }

  return true;
};
