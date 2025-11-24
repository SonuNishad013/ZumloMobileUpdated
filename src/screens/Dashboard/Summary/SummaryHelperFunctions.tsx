import moment from "moment";

type DateRange = {
  startDate: string;
  endDate: string;
};

export const getDateRange = (type: string): DateRange => {
  const currentDate = moment(); // Current date
  let startDate: moment.Moment;
  let endDate: moment.Moment = currentDate; // End date is the current date by default

  switch (type) {
    case "Weekly":
      // Start of the week (Monday)
      startDate = currentDate.clone().startOf("isoWeek");
      endDate = currentDate
        .clone()
        .endOf("isoWeek")
        .subtract(1, "day")
        .endOf("day"); // End of the week (Sunday)
      break;

    case "Monthly":
      // Start of the month
      startDate = currentDate.clone().startOf("month");
      break;

    case "year":
      // Start of the year
      startDate = currentDate.clone().startOf("year");
      break;

    default:
      throw new Error(
        'Invalid type. Please provide "Weekly", "Monthly", or "Year".'
      );
  }

  return {
    startDate: startDate.format("YYYY-MM-DD"),
    endDate: endDate.format("YYYY-MM-DD"),
  };
};

//Function for getting summary tabs Graph data by week in require format like this [{value:number,label:"Mon"},{value:number,label:"Tue"},]
type InputData = {
  createdDate: string;
  heartRate: number;
  [key: string]: any;
};

type OutputData = {
  value: number;
  label: string;
};

export const transformDataForWeek = (
  data: InputData[],
  vitalType: string
): OutputData[] => {
  // Initialize week days (Mon to Sun)
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  console.log("vitalType and adata", vitalType, data);
  // Group data by formatted date
  const groupedData = data.reduce((acc: Record<string, number[]>, item) => {
    const dayLabel = moment(item.createdDate).format("ddd"); // Format date to 'ddd'
    if (!acc[dayLabel]) {
      acc[dayLabel] = [];
    }
    let type =
      vitalType === "BloodPressure"
        ? item.heartRate //diastolic
        : vitalType === "Sleep"
        ? item.sleepDuration
        : vitalType === "StepCount"
        ? item.stepCount
        : item.heartRateCount;
    acc[dayLabel].push(type); // Collect heartRate for the day
    console.log("acc====>>>>", acc, dayLabel, type);
    return acc;
  }, {});

  // Create the result array with averaged heartRate, ensuring all week days are present
  const result: OutputData[] = weekDays.map((day) => {
    const heartRates = groupedData[day] || []; // Get heart rates for the day or empty array

    const handleNan = heartRates?.map((itm) => {
      console.log("isNaN(itm)", itm);
      if (isNaN(itm)) {
        return 0;
      }
      return itm;
    });

    const averageHeartRate =
      handleNan.length > 0
        ? handleNan.reduce((sum, hr) => sum + hr, 0) / handleNan.length
        : 0;
    return {
      value: parseFloat(averageHeartRate.toFixed(2)), // Ensure fixed decimals
      label: day,
    };
  });
  console.log("resultresult", result);
  return result;
};

export const transformDataForMonth = (data: InputData[]): OutputData[] => {
  // Group data by formatted date
  const groupedData = data.reduce((acc: Record<string, number[]>, item) => {
    const dayLabel = moment(item.createdDate).format("DD-MMM"); // Format date to 'DD-MMM'
    if (!acc[dayLabel]) {
      acc[dayLabel] = [];
    }
    acc[dayLabel].push(item.heartRate); // Collect heartRate for the day
    return acc;
  }, {});

  // Create the result array with averaged heartRate
  let result: OutputData[] = Object.entries(groupedData).map(
    ([label, heartRates]) => {
      const averageHeartRate =
        heartRates.reduce((sum, hr) => sum + hr, 0) / heartRates.length;
      return {
        value: parseFloat(averageHeartRate.toFixed(2)), // Ensure fixed decimals
        label,
      };
    }
  );

  // Ensure result array has at least 7 entries
  while (result.length < 7) {
    // Find the last date in the result or start from today if empty
    const lastDate = result.length
      ? moment(result[result.length - 1].label, "DD-MMM")
      : moment();

    // Get the next date
    const nextDate = lastDate.add(1, "days").format("DD-MMM");

    // Add a placeholder entry
    result.push({
      value: 0,
      label: nextDate,
    });
  }

  return result;
};

type DataItem = {
  value: number;
  label: string; // Date in DD-MMM format
};

export const sortDataByDate = (data: DataItem[]): DataItem[] => {
  return data.sort((a, b) => {
    // Parse labels as dates using moment
    const dateA = moment(a.label, "DD-MMM");
    const dateB = moment(b.label, "DD-MMM");
    return dateA.diff(dateB); // Compare dates
  });
};

export function calculateWeeklyAverages(data: any[], vitalType: string) {
  const daysInCurrentMonth = moment(new Date(), "DD-MM-YYYY").daysInMonth();
  // const daysInCurrentMonth = moment("01-02-2024", "DD-MM-YYYY").daysInMonth();// check for feb month with leap year

  // Define the output structure dynamically based on the current month's days
  const weekRanges = [
    { start: 1, end: 7, label: "1st-7th" },
    { start: 8, end: 14, label: "8th-14th" },
    { start: 15, end: 21, label: "15th-21st" },
    { start: 22, end: Math.min(28, daysInCurrentMonth), label: "22nd-28th" },
  ];

  if (daysInCurrentMonth > 28) {
    weekRanges.push({
      start: 29,
      end: daysInCurrentMonth,
      label: `${"29th"}${
        daysInCurrentMonth === 29
          ? ""
          : daysInCurrentMonth === 30
          ? "-30th"
          : "-31st"
      }`,
    });
  }

  // Initialize output with default values
  const output = weekRanges.map((range) => ({
    value: 0,
    label: range.label,
  }));

  // Validate input data
  if (!Array.isArray(data) || data.length === 0) {
    return output; // Return default output if data is invalid or empty
  }

  // Group heartRate values into weekly buckets based on createdDate  parseInt(strValue, 10  Number(item[type]);
  const weeklyBuckets: number[][] = weekRanges.map(() => []);
  data.forEach((item) => {
    let type =
      vitalType === "BloodPressure"
        ? "heartRate"
        : vitalType === "Sleep"
        ? "sleepDuration"
        : vitalType === "StepCount"
        ? "stepCount"
        : "heartRateCount";
    const day = new Date(item.createdDate).getDate();
    const heartRate: number =
      vitalType !== "Sleep" ? item[type] : parseInt(item[type]);

    if (typeof day === "number" && typeof heartRate === "number") {
      const rangeIndex = weekRanges.findIndex(
        (range) => day >= range.start && day <= range.end
      );
      if (rangeIndex !== -1) {
        weeklyBuckets[rangeIndex].push(heartRate);
      }
    }
  });

  // Calculate average heart rate for each week and update the output
  weeklyBuckets.forEach((bucket, index) => {
    if (bucket.length > 0) {
      const average =
        bucket.reduce((sum, rate) => sum + rate, 0) / bucket.length;
      output[index].value = Math.round(average); // Round to the nearest whole number
    }
  });

  return output;
}
