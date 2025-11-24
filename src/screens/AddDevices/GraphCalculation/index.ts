import moment from "moment";

function getHighestValues(data: any) {
  const result: { [key: string]: number } = {};

  for (const [day, values] of Object.entries(data)) {
    result[day] = Math.max(...(values as number[]));
  }

  return result;
}
const getValueByVitalType = (item: any, selectedVitalType: any) => {
  console.log("selectedVitalType===>>>>", selectedVitalType);
  const vitalTypeMap: any = {
    Sleep: item.sleepDuration,
    HeartRate: item.heartRateCount,
    BloodPressure: item.diastolic,
  };

  return vitalTypeMap[selectedVitalType] || 0; // 0 or another default value if `selectedVitalType` does not match
};
const getTodayData = (data: any, selectedVitalType: any) => {
  console.log(":data==-=-=>", selectedVitalType, "datadata==>>", data);
  let finaleData = data.map((item: any) => {
    // use actual data and return as it is and render each entry in day selection
    let obj: any = {};
    obj.value = getValueByVitalType(item, selectedVitalType);
    obj.date = moment(item.createdDate).format("DD MMM YYYY");
    obj.label = moment(moment(item.createdDate + "Z").toLocaleString()).format(
      "hh:mm A"
    );
    return obj;
  });
  console.log("finaleData===>>>", finaleData);
  return finaleData;
};
const getConvertedData = (
  vitalData: any,
  maxScore: any,
  selectedVitalType: any,
  type: any
) => {
  console.log("getConvertedData===>>", {
    vitalData,
    maxScore,
    selectedVitalType,
    type,
  });

  const updatedData = vitalData.map((item: any) => ({
    value: Number(getValueByVitalType(item, type)) || 0,
    date: moment(item.createdDate).format("DD MMM YYYY"),
    label: moment(item.createdDate).format("ddd"),
  }));

  console.log("updatedData (Week)", updatedData);

  const groupedByDate = updatedData.reduce((acc: any, item: any) => {
    acc[item.date] = acc[item.date] || [];
    acc[item.date].push(item.value);
    return acc;
  }, {});

  const averageData = Object.keys(groupedByDate).map((date) => {
    const values = groupedByDate[date];
    const total = values.reduce((sum: any, val: any) => sum + val, 0);
    const average = total / values.length;
    const label = moment(date, "DD MMM YYYY").format("ddd");

    const extractedValue = type === "Sleep" ? total : average;

    return {
      date,
      average,
      value:
        type === "HeartRate" || type === "BloodPressure"
          ? Math.round(extractedValue)
          : average,
      label,
    };
  });

  const daysOfWeek = moment.weekdaysShort(); // ["Sun", "Mon", "Tue", ..., "Sat"]
  const todayIndex = moment().day(); // Get today's index (0 = Sunday, 1 = Monday, ...)

  const reorderedDays = [
    ...daysOfWeek.slice(todayIndex + 1),
    ...daysOfWeek.slice(0, todayIndex + 1),
  ];

  reorderedDays.forEach((day) => {
    if (!averageData.some((item) => item.label === day)) {
      averageData.push({ date: "", average: 0, value: 0, label: day });
    }
  });

  averageData.sort(
    (a, b) => reorderedDays.indexOf(a.label) - reorderedDays.indexOf(b.label)
  );

  console.log("averageData (Week)", averageData);
  const hasPositiveValue = averageData.some(
    (item) => item.average > 0 || item.value > 0
  );
  console.log("hasPositiveValue", hasPositiveValue);
  return hasPositiveValue ? averageData : [];
};

const getMonthConvertedData = (
  vitalData: any,
  maxScore: any,
  selectedType: any,
  selectedVitalType: any
) => {
  console.log("getMonthConvertedData Input", {
    vitalData,
    maxScore,
    selectedType,
    selectedVitalType,
  });

  const updatedData = vitalData.map((item: any) => ({
    value: Number(getValueByVitalType(item, selectedVitalType)) || 0,
    date: moment(item.createdDate).format("DD MMM YYYY"),
    label: moment(item.createdDate).format("ddd"),
    dayOfMonth: moment(item.createdDate).date(),
  }));

  console.log("updatedData (Month)", updatedData);

  const groupedByDate = updatedData.reduce((acc: any, item: any) => {
    acc[item.date] = acc[item.date] || [];
    acc[item.date].push(item.value);
    return acc;
  }, {});

  const averageData = Object.keys(groupedByDate).map((date) => {
    const values = groupedByDate[date];
    const total = values.reduce((sum: any, val: any) => sum + val, 0);
    const average = total / values.length;

    return {
      date,
      average,
      value: selectedVitalType === "Sleep" ? average : Math.round(average),
      label: moment(date, "DD MMM YYYY").format("DD MMM"),
      dayOfMonth: moment(date).date(),
    };
  });

  console.log("averageData (Month)", averageData);

  return averageData.reverse();
};

const getStepCountGraphData = (stepData: any) => {
  const graphData: any[] = stepData.map((item: any) => {
    return {
      value: item.stepCount,
      label: moment(moment(item.createdDate + "Z").toLocaleString()).format(
        "hh:mm A"
      ),
    };
  });
  console.log("graphData=-=-=-=>", graphData);

  return graphData.reverse();
};
const getWeeklyStepCountGraphData = (stepData: any) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekData = daysOfWeek.map((day) => ({
    label: day,
    value: 0,
  }));
  const todayIndex = moment().day(); // Get today's index (0 = Sunday, 1 = Monday, ...)
  let groupedData: any = {};
  const groupedByDate = stepData.reduce((acc: any, item: any) => {
    acc[moment(item.createdDate).format("ddd")] =
      acc[moment(item.createdDate).format("ddd")] || [];

    acc[moment(item.createdDate).format("ddd")].push(item.stepCount);
    return acc;
  }, {});

  groupedData = getHighestValues(groupedByDate);
  console.log("groupedData===>>", groupedData);
  const graphData: any[] = [];
  weekData.forEach((dayData) => {
    graphData.push({
      label: dayData.label,
      value: groupedData[dayData.label] || 0,
    });
  });

  const reorderedDays: any[] = [
    ...graphData.slice(todayIndex + 1),
    ...graphData.slice(0, todayIndex + 1),
  ];

  const hasPositiveValue = reorderedDays.some(
    (item) => item.average > 0 || item.value > 0
  );
  console.log("hasPositiveValue", hasPositiveValue);
  return hasPositiveValue ? reorderedDays : [];
};
const getMonthlyStepCountGraphData = (stepData: any) => {
  if (!stepData.length) return [];

  const stepDataByDate = stepData.reduce((acc: any, item: any) => {
    acc[moment(item.createdDate).format("YYYY-MM-DD")] =
      acc[moment(item.createdDate).format("YYYY-MM-DD")] || [];

    acc[moment(item.createdDate).format("YYYY-MM-DD")].push(item.stepCount);
    return acc;
  }, {}); //gether same dates data in an array with date as key and value as array like {2025-01-13:[1000,2000,3000]}
  let updatedStepDataByDate: { [key: string]: number } =
    getHighestValues(stepDataByDate); //extracting each dates highest value in {date:h_v, date:h_v}
  let renderStepGraph;
  if (updatedStepDataByDate) {
    renderStepGraph = Object.keys(updatedStepDataByDate).map((date) => {
      return {
        date: date,
        label: moment(date).format("DD MMM"),
        value: updatedStepDataByDate[date],
      };
    });
  }

  // if()
  return renderStepGraph?.reverse();
};

export default {
  getTodayData,
  getConvertedData,
  getMonthConvertedData,
  getStepCountGraphData,
  getWeeklyStepCountGraphData,
  getMonthlyStepCountGraphData,
};
