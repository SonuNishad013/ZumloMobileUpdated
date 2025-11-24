import moment from "moment";
import GraphCalculation from "./GraphCalculation";
import { YYYY_MM_DD } from "../../constant/dateFormatConstants";

export const durations = [
  {
    label: "Day",
    key: "day",
    startDate: moment().format(YYYY_MM_DD),
    endDate: moment().format(YYYY_MM_DD),
  },
  {
    label: "Week",
    key: "week",
    startDate: moment().subtract(7, "days").format(YYYY_MM_DD),
    endDate: moment().format(YYYY_MM_DD),
  },
  {
    label: "Month",
    key: "month",
    startDate: moment().startOf("month").format(YYYY_MM_DD),
    endDate: moment().endOf("month").format(YYYY_MM_DD),
  },
];

interface VitalSummaryStatStringsProps {
  [key: string]: string;
}
export const vitalSummaryStatStrings = {
  day_: "day",
  week_: "week",
  month_: "month",
  Type_StepCount: "StepCount",
  Type_BloodPressure: "BloodPressure",
  Type_HeartRate: "HeartRate",
  Type_Sleep: "Sleep",
  stepCountTitle: "Step Count",
  bloodPressureTitle: "Blood Pressure",
  heartRateTitle: "Heart Rate",
  sleeptitle: "Sleep",
  Summary_: "Summary",
  Previous: "Previous",
  Next: "Next",
  add_Manually: "Add Manually",
  view_Vital: "View Vital",
};

export const getSummaryName = (type: string) => {
  switch (type) {
    case vitalSummaryStatStrings?.Type_StepCount:
      return vitalSummaryStatStrings?.stepCountTitle;
    case vitalSummaryStatStrings?.Type_BloodPressure:
      return vitalSummaryStatStrings?.bloodPressureTitle;
    case vitalSummaryStatStrings?.Type_HeartRate:
      return vitalSummaryStatStrings?.heartRateTitle;
    case vitalSummaryStatStrings?.Type_Sleep:
      return vitalSummaryStatStrings?.sleeptitle;
    default:
  }
};

export const getGraphData = (
  type: string,
  data: any[],
  selectedType: string,
  maxScore?: number
) => {
  switch (selectedType) {
    case vitalSummaryStatStrings?.day_:
      return type === vitalSummaryStatStrings?.Type_StepCount
        ? GraphCalculation.getStepCountGraphData(data).filter(
            (item: any) => item.value > 0
          )
        : GraphCalculation.getTodayData(data, type);
    case vitalSummaryStatStrings?.week_:
      return type === vitalSummaryStatStrings?.Type_StepCount
        ? GraphCalculation.getWeeklyStepCountGraphData(data)
        : GraphCalculation.getConvertedData(data, maxScore, selectedType, type);
    case vitalSummaryStatStrings?.month_:
      return type === vitalSummaryStatStrings?.Type_StepCount
        ? GraphCalculation.getMonthlyStepCountGraphData(data)
        : GraphCalculation.getMonthConvertedData(
            data,
            maxScore,
            selectedType,
            type
          );
    default:
      return [];
  }
};

export const fitbit_Client_Id = "23QMVY"; //"238C68";
export const fitbit_ = "Fitbit";
