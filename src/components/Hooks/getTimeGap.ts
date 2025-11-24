import moment from "moment";

export const getTimeGap = (targetDateStr: string) => {
  const targetDate = moment.utc(targetDateStr, "DD-MM-YYYY HH:mm:ss").local();

  if (!targetDate.isValid()) {
    console.warn("Invalid target date format!", targetDateStr);
    return {
      min: "Invalid Date",
      isPastOrNow: false,
      isWithinFourHours: false,
    };
  }

  const now = moment(); // Local current time
  const diffMs = targetDate.diff(now);
  const isPastOrNow = diffMs <= 0;

  const diff = Math.abs(diffMs);
  const totalMinutes = Math.floor(diff / (1000 * 60));
  const isWithinFourHours = totalMinutes <= 1;

  const min = `${totalMinutes}`;

  return { min, isPastOrNow, isWithinFourHours };
};
