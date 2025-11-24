import moment from "moment";

export const filterKeys = [
  "activityFeedbackResponse",
  "goalProgress",
  "startDate",
];
export const convertDaysToMonths = (days: string) => {
  const daysCount = parseInt(days);
  const months = Math.abs(Math.floor(daysCount / 30));

  if (months <= 0) {
    if (daysCount === 0) {
      return `${1} Day`;
    }
    return `${daysCount} Days`;
  } else {
    return `${months} Months`;
  }
};
export const funtransformDataToKeyValueArray = (data: any, filterKeys: any) => {
  const result: any[] = [];

  Object.keys(data).forEach((key) => {
    if (!filterKeys.includes(key)) {
      let value = data[key];
      if (key === "durationOfPlan") {
        value = convertDaysToMonths(value);
      }
      result.push({ title: value, desc: key });
    }
  });

  return result;
};
export const separateFeatureActivities = (data: any) => {
  const result: any = { data: {} };
  Object.keys(data).forEach((date) => {
    result.data[date] = {
      isFeature: [],
      isNonFeature: [],
    };
    data[date].forEach((item: any) => {
      if (!item.hasOwnProperty("completedTime")) {
        result.data[date].isFeature.push(item);
      } else {
        result.data[date].isNonFeature.push(item);
      }
    });
  });

  return result;
};
export const calculateCombinedPercentages = (data: any) => {
  const result: any[] = [];
  Object.keys(data).forEach((date) => {
    let percentages = [];
    const isFeatureArray = data[date].isFeature;
    if (isFeatureArray && isFeatureArray.length > 0) {
      percentages.push(100);
    }
    const isNonFeatureArray = data[date].isNonFeature;
    if (isNonFeatureArray && isNonFeatureArray.length > 0) {
      isNonFeatureArray.forEach((item: any) => {
        if (item.totalTime > 0) {
          const percentage = (item.completedTime / item.totalTime) * 100;
          percentages.push(percentage);
        }
      });
    }

    const averagePercentage =
      percentages.reduce((sum, value) => sum + value, 0) / percentages.length;

    result.push({ [date]: averagePercentage });
  });

  return result;
};

export const transformData = (data: any) => {
  const result: any = {
    dates: [],
    value: [],
  };
  data.forEach((item: any) => {
    const date = Object.keys(item)[0];
    const percentage = item[date];
    result.dates.push(moment(date).format("ddd"));
    result.value.push(percentage);
  });

  return result;
};

export const completeWeekData = (data: any) => {
  // Check if data is null or undefined
  if (!data || !Array.isArray(data)) {
    // Initialize data with the current date and the next 6 consecutive days
    const newData = [];
    let currentDate = moment();

    for (let i = 0; i < 7; i++) {
      newData.push({
        [currentDate.format("YYYY-MM-DD")]: 0,
      });
      currentDate = currentDate.add(1, "days");
    }
    return newData; // Return the new data array
  }

  let existingCount: number = data.length;

  if (existingCount < 7) {
    let lastDate = moment(Object.keys(data[existingCount - 1])[0]);

    for (let i = existingCount; i < 7; i++) {
      lastDate = lastDate.add(1, "days");
      data.push({
        [lastDate.format("YYYY-MM-DD")]: 0,
      });
    }
  }
  return data;
};

function formatDate(date: any) {
  return date.toISOString().split("T")[0];
}

export const calculatePercentageScores = (data: any) => {
  const totalSubmission = data.totalSubmission;
  const submitted = data.submitted;

  const latestDate = Object.keys(submitted).length
    ? new Date(
        Object.keys(submitted).reduce((latest, date) => {
          return new Date(date) > new Date(latest) ? date : latest;
        })
      )
    : new Date();

  const scores: any = {};
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(latestDate);
    currentDate.setDate(latestDate.getDate() - i);
    const formattedDate = formatDate(currentDate);

    if (submitted[formattedDate]) {
      const submissionsOnDate = submitted[formattedDate].length;
      scores[formattedDate] = (submissionsOnDate / totalSubmission) * 100;
    } else {
      scores[formattedDate] = 0;
    }
  }

  return scores;
};

export const calculateActivitySubmissions = (activities: any) => {
  let totalSubmission = 0;
  let submitted: any = {};

  activities.forEach((activity: any) => {
    const frequencyNumber = parseInt(activity.frequencyCount.match(/\d+/)[0]);
    totalSubmission += frequencyNumber;

    activity.activityHistory.forEach((history: any) => {
      const date = history.modifiedDate.split("T")[0];
      if (!submitted[date]) {
        submitted[date] = [];
      }
      submitted[date].push(history);
    });
  });

  return { totalSubmission, submitted };
};
