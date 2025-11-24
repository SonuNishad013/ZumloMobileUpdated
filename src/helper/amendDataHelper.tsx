import moment from "moment";
import { useSelector } from "react-redux";
import { getTemporarySlots, getUsersAvailableSlots } from "../redux/selector";
import { useEffect } from "react";

export function addKeyToActivities(data: any, key: any, defaultValue: any) {
  return data?.map((goal: any) => {
    if (goal?.activities && Array.isArray(goal?.activities)) {
      goal.activities = goal?.activities.map((activity: any) => ({
        ...activity,
        [key]: defaultValue,
      }));
    }
    return goal;
  });
}

export function updateActivityByGuid(obj: any, targetGuid: any, updates: any) {
  if (typeof obj !== "object" || obj === null) return;

  for (const key in obj) {
    if (key === "activities" && Array.isArray(obj[key])) {
      // Loop through the activities array
      obj[key] = obj[key].map((activity) => {
        if (activity.guid === targetGuid) {
          return { ...activity, ...updates }; // Apply all updates at once
        }
        return activity;
      });
    }

    // Recursively search inside nested objects
    if (typeof obj[key] === "object") {
      updateActivityByGuid(obj[key], targetGuid, updates);
    }
  }
}
export const checkAllActivitiesSelected = (
  goals: any,
  selectedActivityGuids: any
) => {
  for (const goal of goals) {
    const goalActivityGuids = goal.activities.map(
      (activity: any) => activity.guid
    );

    // Check if all activities in this goal are selected
    const selectedCount = goalActivityGuids.filter((guid: string) =>
      selectedActivityGuids.includes(guid)
    ).length;

    if (selectedCount === goalActivityGuids.length) {
      return {
        allActivitiesFromGoalIsSelected: true,
        message:
          "Goals all activities have been selected. Leave at least one activity inside of goals.",
      };
    }
  }

  return { allActivitiesFromGoalIsSelected: false };
};

export function getConflictingActivities(obj: any) {
  let conflictingActivities: any[] = [];

  if (typeof obj !== "object" || obj === null) return [];

  // If the current object has isConflicts === true, store it
  if (obj.hasOwnProperty("isConflicts") && obj.isConflicts === true) {
    return [obj]; // Return as an array to be concatenated later
  }

  // Recursively search inside objects or arrays
  if (Array.isArray(obj)) {
    for (const item of obj) {
      conflictingActivities = conflictingActivities.concat(
        getConflictingActivities(item)
      );
    }
  } else {
    for (const key in obj) {
      conflictingActivities = conflictingActivities.concat(
        getConflictingActivities(obj[key])
      );
    }
  }

  return conflictingActivities;
}

interface CategorizedData {
  night: string[][];
  morning: string[][];
  afternoon: string[][];
  evening: string[][];
}
interface SectionData {
  slots: string[][];
  isSelected: boolean;
}

// Define the type for a section.
interface Section {
  title: "Morning" | "Afternoon" | "Evening" | "Night";
  data: SectionData[];
}
export const nightSortedDataFromPMtoAM = (unsortedData: string[][]) => {
  return unsortedData.slice().sort((a: string[], b: string[]) => {
    // Extract the first value from each slot
    const timeA = a[0];
    const timeB = b[0];

    // Create Moment objects using the provided time format.
    const mA = moment(timeA, "hh:mm A");
    const mB = moment(timeB, "hh:mm A");

    // If the time is in AM, add one day to shift it forward
    if (timeA.includes("AM")) {
      mA.add(1, "day");
    }
    if (timeB.includes("AM")) {
      mB.add(1, "day");
    }

    // Return the difference for sorting
    return mA.diff(mB);
  });
};
export const userAvailableSortedSlots = () => {
  const oldData = useSelector(getUsersAvailableSlots());
  const getTemporarySlots_ = useSelector(getTemporarySlots());
  console.log(
    "AIGENERATEDDATA____before___update_getTemporarySlots_-=-=-=-=-=-=-",
    {
      getTemporarySlots_,
      oldData,
    }
  );

  const curretAvailableSlots = oldData.filter((item: any) => {
    if (getTemporarySlots_.length === 0) {
      return true;
    } else {
      return !getTemporarySlots_.some(
        (itm: any) => JSON.stringify(itm) === JSON.stringify(item)
      );
    }
  });
  console.log("curretAvailableSlots____", {
    curretAvailableSlots,
    oldData,
    getTemporarySlots_,
  });
  const categorizedData: CategorizedData = {
    morning: [],
    afternoon: [],
    evening: [],
    night: [],
  };

  let updatedData: Section[] = [
    { title: "Morning", data: [{ slots: [], isSelected: false }] },
    { title: "Afternoon", data: [{ slots: [], isSelected: false }] },
    { title: "Evening", data: [{ slots: [], isSelected: false }] },
    { title: "Night", data: [{ slots: [], isSelected: false }] },
  ];
  curretAvailableSlots.forEach((timeStr: string[]) => {
    // console.log("timeStr", timeStr[0]);
    const mTime = moment(timeStr[0], "hh:mm A");

    if (mTime.isBefore(moment("06:00 AM", "hh:mm A"))) {
      // Before 6:00 AM: Night (early morning hours)
      categorizedData.night.push(timeStr);
    } else if (mTime.isBefore(moment("12:00 PM", "hh:mm A"))) {
      // 6:00 AM up to 12:00 PM: Morning
      categorizedData.morning.push(timeStr);
    } else if (mTime.isBefore(moment("05:00 PM", "hh:mm A"))) {
      // 12:00 PM up to 05:00 PM: Afternoon
      categorizedData.afternoon.push(timeStr);
    } else if (mTime.isBefore(moment("09:00 PM", "hh:mm A"))) {
      // 05:00 PM up to 09:00 PM: Evening
      categorizedData.evening.push(timeStr);
    } else {
      // From 09:00 PM onward: Night
      categorizedData.night.push(timeStr);
    }
  });

  return updatedData.map((item) => {
    switch (item.title) {
      case "Morning":
        if (item.data[0]) {
          item.data[0].slots = categorizedData.morning;
        }
        break;
      case "Afternoon":
        if (item.data[0]) {
          item.data[0].slots = categorizedData.afternoon;
        }
        break;
      case "Evening":
        if (item.data[0]) {
          item.data[0].slots = categorizedData.evening;
        }
        break;
      case "Night":
        if (item.data[0]) {
          item.data[0].slots = nightSortedDataFromPMtoAM(categorizedData.night);
        }
        break;
    }
    return item;
  });
};
