import logger from "../constant/logger";
import { strings } from "../constant/strings";

export const formatNumbers = (number: any) => {
  if (number < 1000) {
    return `${number}`;
  } else if (number < 1_000_000) {
    return `${(number / 1000).toFixed(1)?.replace(/\.0$/, "")}K`;
  } else if (number < 1_000_000_000) {
    return `${(number / 1_000_000).toFixed(1)?.replace(/\.0$/, "")}M`;
  } else {
    return `${(number / 1_000_000_000).toFixed(1)?.replace(/\.0$/, "")}B`;
  }
};

import moment from "moment";

// export const timeAgo = (utcDate: any): string => {
//   if (!utcDate) return "Invalid date";
//   const date = moment.utc(utcDate).local(); // Convert UTC to local time
//   const now = moment();

//   console.log("datedate->", date);
//   console.log("datedate->", date?.fromNow());
//   const diffInSeconds = now.diff(date, "seconds");
//   const diffInMinutes = now.diff(date, "minutes");
//   const diffInHours = now.diff(date, "hours");
//   const diffInDays = now.diff(date, "days");

//   if (diffInSeconds < 60) {
//     return `${diffInSeconds} sec ago`;
//   } else if (diffInMinutes < 60) {
//     return `${diffInMinutes} mins ago`;
//   } else if (diffInHours < 24) {
//     return `${diffInHours} hours ago`;
//   } else if (diffInDays === 1) {
//     return "Yesterday";
//   } else if (diffInDays < 7) {
//     return `${diffInDays} days ago`;
//   } else {
//     return date.format("ddd, MMM DD, YYYY"); // Example: "Mon, Jan 06, 2025"
//   }
// };

export const timeAgo = (utcDate: any): string => {
  if (!utcDate) return "Invalid date";

  const date = moment.utc(utcDate).local(); // Convert UTC to local time
  const now = moment();
  const diffInSeconds = now.diff(date, "seconds");
  const diffInMinutes = now.diff(date, "minutes");
  const diffInHours = now.diff(date, "hours");
  const diffInDays = now.diff(date, "days");
  const diffInWeeks = now.diff(date, "weeks");
  const diffInMonths = now.diff(date, "months");
  const diffInYears = now.diff(date, "years");

  if (diffInSeconds < 60) {
    return `${diffInSeconds} sec ago`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} mins ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else if (diffInDays === 1) {
    return "Yesterday";
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else if (diffInWeeks < 4) {
    return `${diffInWeeks} weeks ago`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths} months ago`;
  } else if (diffInYears < 5) {
    return `${diffInYears} years ago`;
  } else {
    return date.format("ddd, MMM DD, YYYY"); // Example: "Mon, Jan 06, 2025"
  }
};

export const formatNumberTitle = (number: any, title?: string) => {
  if (number < 1000) {
    return `${number} ${title || ""}`;
  } else if (number < 1_000_000) {
    return `${(number / 1000).toFixed(1).replace(/\.0$/, "")}K ${title ?? ""}`;
  } else if (number < 1_000_000_000) {
    return `${(number / 1_000_000).toFixed(1).replace(/\.0$/, "")}M ${
      title ?? ""
    }`;
  } else {
    return `${(number / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}B ${
      title ?? ""
    }`;
  }
};

export const formatJSONToJavaScript = (jsonString: any) => {
  try {
    // Clean up the input JSON string
    const cleanedJsonString = jsonString?.trim()?.replace(/,\s*}$/, "}"); // Remove trailing commas

    // Parse the JSON string into an object
    const parsedData = JSON?.parse(cleanedJsonString);
    // console.log("parsedData-->", parsedData?.Description);
    // // Create a dynamic JavaScript object
    // const formattedObject: any = {};
    // for (const key in parsedData) {
    //   if (parsedData.hasOwnProperty(key)) {
    //     // Format the key-value pairs
    //     const dynamicKey = key.charAt(0).toLowerCase() + key.slice(1); // Convert keys to camelCase
    //     formattedObject[dynamicKey] = parsedData[key];
    //   }
    // }
    // console.log("Formatted Object:", formattedObject);
    // return formattedObject; // Return the dynamically created object
    return parsedData;
  } catch (error) {
    console.error("Invalid JSON string:", error);
    return null; // Return null for invalid JSON
  }
};

export const mergeArraysGroupSelected = (array1: any, array2: any) => {
  try {
    if (!Array.isArray(array2)) {
      throw new Error("Both inputs must be arrays.");
    }
    const mergedMap = new Map();
    array1?.forEach((item: any) => {
      if (!item?.userId) {
        console.warn("Item in first array is missing 'userId':", item);
        return;
      }
      mergedMap?.set(item.userId, {
        ...item,
        isSelected: item?.isSelected || false,
      });
    });

    // Process the second array and update or add to the map
    array2?.forEach((item) => {
      if (!item?.userId) {
        console.warn("Item in second array is missing 'userId':", item);
        return;
      }
      if (mergedMap?.has(item?.userId)) {
        const existingItem = mergedMap?.get(item?.userId);
        mergedMap?.set(item?.userId, {
          ...existingItem,
          ...item,
          isSelected: existingItem?.isSelected || false, // Keep true if already true
        });
      } else {
        mergedMap?.set(item?.userId, { ...item, isSelected: false });
      }
    });

    // Convert the map back to an array
    return Array.from(mergedMap?.values());
  } catch (error) {
    console.error("Error merging arrays:", error);
    return [];
  }
};

export const replaceSlashWithDot = (mimeType: any, idx: any) => {
  return mimeType.replace(/\//g, `${idx}_${Date.now()}.`);
};

export const getGroupActionText = (item: any) => {
  if (item?.isJoinRequestSent) {
    return strings?.joinReqestSend;
  }
  if (item?.isJoinedGroup) {
    return strings?.leaveGroup;
  }
  return strings?.joinGroup;
};

export const getGroupActionTextSmall = (item: any) => {
  if (item?.isJoinRequestSent) {
    return strings?.joinReqest;
  }
  if (item?.isJoinedGroup) {
    return strings?.leaveGroup;
  }
  return strings?.joinGroup;
};

export const encodeSpaces = (str: any) => {
  return str?.replace(/ /g, "%20");
};

export const decodeSpaces = (str: any) => {
  return str?.replace(/%20/g, " ");
};

export const getShortTimeAgo = (timestamp: string) => {
  const localTime = moment.utc(timestamp).local();
  const duration = moment().diff(localTime, "seconds"); // Use seconds for precision

  if (duration < 60) return `${duration}s ago`; // Seconds
  if (duration < 3600) return `${Math.floor(duration / 60)}m ago`; // Minutes
  if (duration < 86400) return `${Math.floor(duration / 3600)}h ago`; // Hours
  if (duration < 604800) return `${Math.floor(duration / 86400)}d ago`; // Days
  if (duration < 2419200) return `${Math.floor(duration / 604800)}w ago`; // Weeks
  if (duration < 29030400) return `${Math.floor(duration / 2419200)}mo ago`; // Months
  return `${Math.floor(duration / 29030400)}y ago`; // Years
};
