import { keys } from "underscore";
import logger from "../../../../../constant/logger";

const colorPalette = ["#FFB64D", "#4DB38E", "#553D67", "#6794A7", "#8C4E86"]; // Add more if needed

export function transformGoalsFromAPI(apiData: any) {
  if (
    !apiData?.data?.wellnessProgress?.goalProgressOverview ||
    !Array.isArray(apiData.data.wellnessProgress.goalProgressOverview)
  ) {
    return []; // Defensive return if no goals
  }

  return apiData.data.wellnessProgress.goalProgressOverview.map(
    (goal: any, index: number) => {
      const title = goal?.title || `Goal ${index + 1}`;
      const activities = Array.isArray(goal?.activityProgressDetails)
        ? goal.activityProgressDetails.length
        : 0;

      const progress =
        Number(goal?.progressSummary?.overallGoalProgressInPercentage) || 0;

      const color = colorPalette[index % colorPalette.length];

      return {
        id: goal?.id || index,
        title,
        activities,
        progress,
        color,
        item: goal,
      };
    }
  );
}

// const colorPalette = ["#FFB64D", "#4DB38E", "#553D67", "#6794A7", "#8C4E86"]; // Expand as needed

export function transformIndependentGoalsFromAPI(apiData: any) {
  if (
    !apiData?.data?.goalProgressOverview ||
    !Array.isArray(apiData.data.goalProgressOverview)
  ) {
    return []; // Defensive return
  }

  return apiData.data.goalProgressOverview.map((goal: any, index: number) => {
    const title = goal?.title || `Goal ${index + 1}`;
    const activities = Array.isArray(goal?.activityProgressDetails)
      ? goal.activityProgressDetails.length
      : 0;

    const progress =
      Number(goal?.progressSummary?.overallGoalProgressInPercentage) || 0;

    const color = colorPalette[index % colorPalette.length];

    return {
      id: goal?.id || index,
      title,
      activities,
      progress,
      color,
      item: goal, // Full goal details
    };
  });
}

export function transformSingleGoalResponse(apiData: any) {
  const goal = apiData?.data?.goalProgressOverview?.[0];

  if (!goal || typeof goal !== "object") {
    return {
      goals: null,
    };
  }

  return {
    goals: {
      id: goal.id ?? 0,
      progressSummary: goal.progressSummary,
      title: goal.title ?? "Untitled Goal",
      description: goal.description ?? "No description",
      startDate: goal.startDate ?? "N/A",
      endDate: goal.endDate ?? "N/A",
      overallGoalProgressInPercentage:
        Number(goal?.progressSummary?.overallGoalProgressInPercentage) || 0,
      graphType: goal?.progressSummary?.graphType || "circular",
      activityDetails: Array.isArray(goal.activityProgressDetails)
        ? goal.activityProgressDetails
        : [],
    },
  };
}

export const extractValueByObjKey = (obj: any, findKey: string) => {
  logger("extractValueByObjKey___", { obj, findKey });
  //activityHistory
  if (Array.isArray(obj)) {
    for (const item of obj) {
      const result: any = extractValueByObjKey(item, findKey);
      if (result.length > 0) return result;
    }
  } else if (obj && typeof obj === "object") {
    for (const key in obj) {
      if (key === findKey) {
        const value = obj[key];
        if (
          Array.isArray(value) &&
          value.length > 0 &&
          value.every((item) => typeof item === "object" && item !== null)
        ) {
          return value;
        }
      } else {
        const result: any = extractValueByObjKey(obj[key], findKey);
        if (result.length > 0) return result;
      }
    }
  }

  return [];
};

export function findValueByKey(obj: any, keyToFind: string): any {
  if (typeof obj !== "object" || obj === null) return null;

  if (obj.hasOwnProperty(keyToFind)) {
    return obj[keyToFind];
  }

  for (const key in obj) {
    if (typeof obj[key] === "object") {
      const result = findValueByKey(obj[key], keyToFind);
      if (result !== null) {
        return result;
      }
    }
  }

  return null;
}
