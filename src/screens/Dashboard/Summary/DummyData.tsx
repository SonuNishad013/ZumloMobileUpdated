import { Text, View } from "react-native";
import {
  BreakFastActivity,
  GymActivity,
  MeditateActivity,
} from "../../../assets";
import colors from "../../../constant/colors";
import { moderateScale } from "../../../constant/responsiveStyle";
import { LineChart } from "react-native-gifted-charts";

export const statsMyGoals = [
  {
    id: 1,
    title: "CALORIES",
    count: "500",
    unit: "cal",
    update: "last update 3m",
  },
  {
    id: 2,
    title: "WEIGHT",
    count: "58",
    unit: "kg",
    update: "last update 3d",
  },
  {
    id: 3,
    title: "WATER",
    count: "750",
    unit: "ml",
    update: "last update 3d",
  },
  {
    id: 4,
    title: "STEPS",
    count: "9,890",
    unit: "steps",
    update: "last update 3m",
  },
];

export const HealthData = [
  {
    title: "Average Blood Pressure",
    count: "141",
    unit: "mmhg",
    update: "last update 3m",
  },
  {
    title: "Blood Sugar",
    count: "80",
    unit: "mg/dl",
    update: "last update 3m",
  },
  {
    title: "Glucose",
    count: "80",
    unit: "mg/dl",
    update: "last update 3m",
  },
  {
    title: "Oxygen Level",
    count: "80",
    unit: "%",
    update: "last update 3hr",
  },
  {
    title: "Sleep",
    count: "08",
    unit: "hrs",
    update: "Slept well",
  },
];

const GymActivityImage = (
  <GymActivity height={moderateScale(45.18)} width={moderateScale(45.18)} />
);
const MeditateActivityImage = (
  <MeditateActivity
    height={moderateScale(45.18)}
    width={moderateScale(45.18)}
  />
);
const BreakFastActivityImage = (
  <BreakFastActivity
    height={moderateScale(45.18)}
    width={moderateScale(45.18)}
  />
);

export const MorningActivitiesData = [
  {
    id: 1,
    icon: GymActivityImage,
    PartOfDay: "Morning",
    title: "30 minutes exercise",
    time: "6:20 am",
    streak: "7-day streak",
    progress: 0.3,
    progress_Colour: colors.OceanGreen,
    progress_percentage: "70%",
    status: "IN PROGRESS",
  },
  {
    id: 2,
    icon: MeditateActivityImage,
    PartOfDay: "Morning",
    title: "Meditate to relax",
    time: "7:00 am",
    streak: "4-day streak",
    progress: 0.9,
    progress_Colour: colors.royalOrange,
    progress_percentage: "90%",
    status: "COMPLETED",
  },
  {
    id: 3,
    icon: BreakFastActivityImage,
    PartOfDay: "Morning",
    title: "Break Fast",
    time: "8:30 am",
    streak: "Daily",
    progress: 0.2,
    progress_Colour: colors.SaltBox,
    progress_percentage: "40%",
    status: "SKIPPED",
  },
];

export const AfternoonActivitiesData = [
  {
    id: 1,
    icon: GymActivityImage,
    PartOfDay: "Afternoon",
    title: "Take a power nap",
    time: "8:30 am",
    streak: "Daily",
    progress: 0.8,
    progress_Colour: colors.royalOrange,
    progress_percentage: "90%",
    status: "COMPLETED",
  },
  {
    id: 2,
    icon: BreakFastActivityImage,
    PartOfDay: "Afternoon",
    title: "Read a book",
    time: "3:30 am",
    streak: "7-day streak",
    progress: 0.4,
    progress_Colour: colors.OceanGreen,
    progress_percentage: "40%",
    status: "SKIPPED",
  },
];

export const apiData = {
  data: {
    healthVitalSummary: {
      bloodPressureVitalData: {
        dateAndTimeForBP: "2024-11-14T03:40:05",
        systolic: 120,
        diastolic: 85,
        heartRate: 82,
        description: "bp",
        vitalUnit: "mmHg",
        createdDate: "2024-11-14T10:10:10.1152345",
        status: "good",
        weeklyAverageSystolic: 120,
        overallAverageSystolic: 120,
        monthlyAverageSystolic: 120,
        title: "Blood Pressure",
      },
      stepVitalData: {
        stepCount: 6421,
        distance: 8,
        timeDuration: "120",
        caloriesBurned: 1200,
        vitalUnit: "steps",
        createdDate: "2024-11-14T10:10:41.1174322",
        userId: 0,
        status: "neutral",
        weeklyAverageStepCount: 6421,
        overallAverageStepCount: 6421,
        monthlyAverageStepCount: 6421,
        title: "Blood Pressure",
      },
      sleepVitalData: {
        sleepDuration: "6",
        sleepType: "",
        sleepIcon: "",
        awakeTime: "0001-01-01T00:00:00",
        vitalUnit: "hrs",
        createdDate: "2024-11-14T10:10:48.4842407",
        status: "neutral",
        weeklyAverageSleepDuration: 6,
        overallAverageSleepDuration: 6,
        monthlyAverageSleepDuration: 6,
        title: "Blood Pressure",
      },
      heartRateVitalData: {
        heartRateCount: 91,
        heartActivity: "",
        vitalUnit: "bpm",
        createdDate: "2024-11-14T10:12:05.5268087",
        status: "good",
        weeklyAverageHeartRate: 87,
        overallAverageHeartRate: 87,
        monthlyAverageHeartRate: 87,
        title: "Blood Pressure",
      },
      vitalTypesMaxScore: {
        sleep: 9,
        heartRate: 190,
        systolic: 180,
        diastolic: 120,
        bloodPressure: 200,
      },
    },
  },
  statusCode: 200,
  message: "Records returned successfully.",
  success: true,
};

export const lineData = [
  { value: 70, label: "Mon" },
  { value: 76, label: "Tue" },
  { value: 81, label: "Wed" },
  { value: 58, label: "Thur" },
  { value: 56, label: "Fri" },
  { value: 80, label: "Sat" },
  { value: 70, label: "Sun" },
];
export const weeksVitalData = [
  {
    dateAndTimeForBP: "2024-11-18T11:43:33",
    systolic: 115,
    diastolic: 83,
    heartRate: 80,
    description: "bp",
    vitalUnit: "mmHg",
    createdDate: "2024-11-18T06:13:48.1273152",
    status: "",
    title: "Blood Pressure",
  },
  {
    dateAndTimeForBP: "2024-11-18T04:11:15",
    systolic: 110,
    diastolic: 85,
    heartRate: 79,
    description: "bp",
    vitalUnit: "mmHg",
    createdDate: "2024-11-18T10:41:25.719536",
    status: "",
    title: "Blood Pressure",
  },
  {
    dateAndTimeForBP: "2024-11-22T11:42:24",
    systolic: 120,
    diastolic: 85,
    heartRate: 90,
    description: "bp",
    vitalUnit: "mmHg",
    createdDate: "2024-11-22T06:12:34.3737169",
    status: "",
    title: "Blood Pressure",
  },
  {
    dateAndTimeForBP: "2024-11-22T11:42:37",
    systolic: 120,
    diastolic: 85,
    heartRate: 86,
    description: "bp",
    vitalUnit: "mmHg",
    createdDate: "2024-11-22T06:12:44.9548061",
    status: "",
    title: "Blood Pressure",
  },
  {
    dateAndTimeForBP: "2024-11-21T11:43:33",
    systolic: 115,
    diastolic: 83,
    heartRate: 80,
    description: "bp",
    vitalUnit: "mmHg",
    createdDate: "2024-11-21T06:13:48.1273152",
    status: "",
    title: "Blood Pressure",
  },
  {
    dateAndTimeForBP: "2024-11-20T11:43:33",
    systolic: 115,
    diastolic: 83,
    heartRate: 80,
    description: "bp",
    vitalUnit: "mmHg",
    createdDate: "2024-11-20T06:13:48.1273152",
    status: "",
    title: "Blood Pressure",
  },
  {
    dateAndTimeForBP: "2024-11-19T11:43:33",
    systolic: 115,
    diastolic: 83,
    heartRate: 80,
    description: "bp",
    vitalUnit: "mmHg",
    createdDate: "2024-11-19T06:13:48.1273152",
    status: "",
    title: "Blood Pressure",
  },
];
