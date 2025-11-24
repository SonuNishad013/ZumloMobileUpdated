import moment from "moment";
import { moderateScale } from "../constant/responsiveStyle";

export default function calculateDuration(startDate: any, endDate: any) {
  if (startDate == "" || endDate == "") return null;
  const start = moment(startDate, "YYYY-MM-DD");
  const end = moment(endDate, "YYYY-MM-DD");

  const months = end.diff(start, "months");
  start.add(months, "months");

  const days = end.diff(start, "days");

  return {
    months: months,
    days: days,
  };
}

export const getCountryCodeNumberLength = (length: any) => {
  console.log("first--length->", length);

  switch (length) {
    case 1:
      return { icon: moderateScale(70), widthInput: moderateScale(90) };
    case 2:
      return { icon: moderateScale(80), widthInput: moderateScale(95) };
    case 3:
      return { icon: moderateScale(85), widthInput: moderateScale(100) };
    case 4:
      return { icon: moderateScale(95), widthInput: moderateScale(105) };
    case 5:
      return { icon: moderateScale(105), widthInput: moderateScale(110) };
    case 6:
      return { icon: moderateScale(115), widthInput: moderateScale(115) };
    case 7:
      return { icon: moderateScale(125), widthInput: moderateScale(130) };
    default:
      return { icon: moderateScale(40), widthInput: moderateScale(50) };
  }
};

export const getProgressText = (ActivityDetails: any, itm: any) => {
  // Parse frequencyCount and duration, with fallback values if they’re undefined
  const frequencyCount =
    parseInt(ActivityDetails?.frequencyCount?.match(/\d+/)?.[0], 10) || 0;
  const duration = parseInt(ActivityDetails?.duration, 10) || 0;
  const completedTime = itm?.completedTime || 0;
  console.log("frequencyCount-=->", frequencyCount, duration);

  // Check if it's a featured activity
  if (ActivityDetails?.isFeatured) {
    return "100%";
  }

  // Ensure we have a valid frequencyCount or duration to calculate the progress
  if (frequencyCount) {
    const progressPercentage = ((completedTime / duration) * 100).toFixed(0);
    return `${isNaN(Number(progressPercentage)) ? 0 : progressPercentage}%`;
  }

  // Fallback in case of invalid values
  return "0%";
};

export const calculateFillPercentage = (ActivityDetails: any, itm: any) => {
  console.log("ActivityDetails->", ActivityDetails);
  console.log("itm->", itm);

  if (ActivityDetails?.isFeatured) {
    return { fillPercentage: 100, displayText: "100%" };
  }

  const frequencyCount = parseInt(
    ActivityDetails?.frequencyCount?.match(/\d+/)?.[0],
    10
  );

  console.log("frequencyCount->", frequencyCount);
  const duration = parseInt(ActivityDetails?.duration, 10);
  console.log("duration->", duration);

  const isMultiFrequency = frequencyCount > 1;

  console.log("itm.completedTime->", itm.completedTime);
  console.log("duration", itm.completedTime);
  console.log("itm.completedTime->", itm.completedTime);

  console.log(
    "((itm.completedTime / duration) * 100)->",
    (itm.completedTime / duration) * 100
  );
  const fillPercentage = isMultiFrequency
    ? ((itm.completedTime / frequencyCount) * 100).toFixed(0)
    : ((itm.completedTime / duration) * 100).toFixed(0);
  console.log("fillPercentage->", fillPercentage);

  console.log(
    "--((itm.completedTime / frequencyCount) * 100).toFixed(0)--",
    ((itm.completedTime / frequencyCount) * 100).toFixed(0)
  );

  console.log(
    "--((itm.completedTime / duration) * 100).toFixed(0)--",
    ((itm.completedTime / duration) * 100).toFixed(0)
  );
  return {
    fillPercentage: parseFloat(fillPercentage),
    displayText: `${fillPercentage}%`,
  };
};

export const getUTCDateTimeNew = (date: any) => {
  const now = date;
  const isoString = now?.toISOString(); // Format to ISO string with milliseconds
  return isoString?.split(".")[0] + "Z"; // Remove milliseconds and append 'Z'
};
export const getDateTimeInToDate = (date: any, dateFormat: any) => {
  return moment(date, dateFormat)?.toDate();
};

export const sortByCreatedDateDecending = (data: any) => {
  return data?.sort((a: any, b: any) => {
    const dateA: any = moment?.utc(a?.createdDate);
    const dateB: any = moment?.utc(b?.createdDate);
    return dateB - dateA; // decending order
  });
};
type ExtItem = {
  schTime: string[]; // e.g. ["06:15 AM"]
  durations: string; // e.g. "5 minutes"
};
export const getStartEndTimeByActivities = (data: ExtItem[]): string[][] => {
  const toMinutes = (timeStr: string): number => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    return hours * 60 + minutes;
  };

  const toTimeString = (totalMinutes: number): string => {
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;
    const modifier = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12; // Convert 0 -> 12
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )} ${modifier}`;
  };

  return data.map((item) => {
    const start = item.schTime[0]; // take first since it's array
    const startMinutes = toMinutes(start);
    const durationMinutes = parseInt(item.durations); // assumes "5 minutes"
    const endMinutes = startMinutes + durationMinutes;
    return [start, toTimeString(endMinutes)];
  });
};
