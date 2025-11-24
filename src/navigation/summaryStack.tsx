import React from "react";
import {
  ActivitesDetails,
  ActivityGoalOverview,
  ActivityStats,
  AddBloodPressureVitals,
  AddDevice,
  AddHabitForm,
  AddHeartRate,
  AddManualReading,
  AddSleep,
  AddSteps,
  AllHabitList,
  ApplePaired,
  DeviceConnect,
  DynamicPrompts,
  ExplorerPromptsDetails,
  FitbitPaired,
  GeneratedActivitiesAI,
  GeneratedGoalAI,
  GeneratedRecommendationsAI,
  GiveFeedback,
  GoalOverView,
  HabitProgressDetail,
  IndependentJournals,
  JournalsOverview,
  JournalStepFour,
  JournalStepOne,
  JournalStepThree,
  JournalStepTwo,
  JournalView,
  PairDevice,
  PreferencesRender,
  QuestionsIndex,
  RecommendationList,
  ReGenerateActivitesAI,
  ReGenerateGoalAI,
  ReGenerateRecommendationsAI,
  RepplaceWellnessActivity,
  SelectReGenerationCategory,
  Summary,
  TrackHistory,
  UserPreferencesList,
  VitalSummary,
  WellnessOverviewDetails,
  WellnessPlan,
  WellnessPlanIndex,
} from "../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import navigationString from "./navigationString";
import useHideTabBar from "../components/Hooks/useHideTabBar";
import NotificationScreen from "../screens/Dashboard/Notifications";
import AllGoalsProgress from "../screens/Dashboard/Planner/AllGoalsProgress";
import IndependentGoalsScreen from "../screens/Dashboard/Planner/IndependentGoals/IndependentGoals";
import UpdateScheduleTimeScreen from "../screens/AddActivities/DailyRoutine/UpdateScheduleTimeScreen";
import EditReplaceActivies from "../screens/AddActivities/EditReplaceActivities";
const Stack = createNativeStackNavigator();
const routesWithoutTabs: any = [
  //new
  navigationString.AddManualReading,
  navigationString.AddDevice,
  navigationString.PairDevice,
  navigationString.DeviceConnect,
  navigationString.AddSteps,
  navigationString.AddHeartRate,
  navigationString.AddSleep,
  navigationString.AddBloodPressureVitals,
  navigationString.ApplePaired,
  navigationString.FitbitPaired,
  navigationString.ActivityStats,
  navigationString.VitalSummary,
  navigationString.DynamicPrompts,
  navigationString.QuestionsIndex,
  navigationString.WellnessOverviewDetails,
  navigationString.Goaloverview,
  navigationString.ActivityGoalOverview,
  navigationString.WellnessPlanIndex,
  navigationString.JournalsOverview,
  navigationString.WellnessPlanIndex,
  navigationString.WellnessPlan,
  navigationString?.YourGoals,
  navigationString?.GeneratedGoalAI,
  navigationString?.GeneratedRecommendationsAI,
  navigationString?.GeneratedActivitiesAI,
  navigationString?.ReGenerateActivitesAI,
  navigationString?.ActivitesDetails,
  navigationString.ReGenerateGoalAI,
  navigationString.ReGenerateRecommendationsAI,
  navigationString.SelectReGenerationCategory,
  navigationString.GiveFeedback,
  navigationString.ExplorerPromptsDetails,
  navigationString.UserPreferencesList,
  navigationString.PreferencesRender,
  navigationString?.ActivityCalendarView,
  navigationString?.NotificationScreen,
  navigationString.AllGoalsProgress,
  navigationString?.DynamicPrompts,
  navigationString?.QuestionsIndex,
  navigationString?.IndependentGoalsScreen,
  navigationString.ETLQuestionsIndex,
  navigationString.UpdateScheduleTimeScreen,
  navigationString.EditReplaceActivies,
  navigationString.RepplaceWellnessActivity,
  navigationString?.IndependentFeed,
  navigationString.IndependentJournals,
  navigationString.JournalView,
  navigationString?.JournalStepOne,
  navigationString?.JournalStepTwo,
  navigationString?.JournalStepThree,
  navigationString?.JournalStepFour,
  navigationString?.TrackHistory,
  navigationString.RecommendationList,
  navigationString.AllHabitList,
  navigationString.HabitProgressDetail,
  navigationString.AddHabitForm,
  //new
];

const screens = [
  { name: navigationString.Summary, component: Summary },
  { name: navigationString.AddManualReading, component: AddManualReading },
  { name: navigationString.AddDevice, component: AddDevice },
  { name: navigationString.PairDevice, component: PairDevice },
  { name: navigationString.DeviceConnect, component: DeviceConnect },
  { name: navigationString.AddSteps, component: AddSteps },
  { name: navigationString.AddHeartRate, component: AddHeartRate },
  { name: navigationString.AddSleep, component: AddSleep },
  {
    name: navigationString.AddBloodPressureVitals,
    component: AddBloodPressureVitals,
  },
  { name: navigationString.ApplePaired, component: ApplePaired },
  { name: navigationString.ActivityStats, component: ActivityStats },
  { name: navigationString.FitbitPaired, component: FitbitPaired },
  { name: navigationString.VitalSummary, component: VitalSummary },
  { name: navigationString.DynamicPrompts, component: DynamicPrompts },
  { name: navigationString.QuestionsIndex, component: QuestionsIndex },
  {
    name: navigationString.WellnessOverviewDetails,
    component: WellnessOverviewDetails,
  },
  { name: navigationString.Goaloverview, component: GoalOverView },
  {
    name: navigationString.ActivityGoalOverview,
    component: ActivityGoalOverview,
  },
  { name: navigationString.WellnessPlanIndex, component: WellnessPlanIndex },
  { name: navigationString.JournalsOverview, component: JournalsOverview },

  { name: navigationString.WellnessPlan, component: WellnessPlan },

  { name: navigationString.GeneratedGoalAI, component: GeneratedGoalAI },
  {
    name: navigationString.GeneratedRecommendationsAI,
    component: GeneratedRecommendationsAI,
  },
  {
    name: navigationString.GeneratedActivitiesAI,
    component: GeneratedActivitiesAI,
  },
  {
    name: navigationString.ReGenerateActivitesAI,
    component: ReGenerateActivitesAI,
  },
  { name: navigationString.ReGenerateGoalAI, component: ReGenerateGoalAI },
  {
    name: navigationString.ReGenerateRecommendationsAI,
    component: ReGenerateRecommendationsAI,
  },
  {
    name: navigationString.SelectReGenerationCategory,
    component: SelectReGenerationCategory,
  },

  { name: navigationString.AllGoalsProgress, component: AllGoalsProgress },

  { name: navigationString.GiveFeedback, component: GiveFeedback },

  {
    name: navigationString.IndependentGoalsScreen,
    component: IndependentGoalsScreen,
  },

  {
    name: navigationString.UpdateScheduleTimeScreen,
    component: UpdateScheduleTimeScreen,
  },
  {
    name: navigationString.EditReplaceActivies,
    component: EditReplaceActivies,
  },
  {
    name: navigationString.RepplaceWellnessActivity,
    component: RepplaceWellnessActivity,
  },
  {
    name: navigationString.IndependentJournals,
    component: IndependentJournals,
  },
  {
    name: navigationString.JournalView,
    component: JournalView,
  },

  {
    name: navigationString.JournalStepOne,
    component: JournalStepOne,
  },
  {
    name: navigationString.JournalStepTwo,
    component: JournalStepTwo,
  },
  {
    name: navigationString.JournalStepThree,
    component: JournalStepThree,
  },
  {
    name: navigationString.JournalStepFour,
    component: JournalStepFour,
  },
  { name: navigationString?.TrackHistory, component: TrackHistory },
  { name: navigationString.ActivitesDetails, component: ActivitesDetails },
  { name: navigationString.RecommendationList, component: RecommendationList },
  { name: navigationString.AllHabitList, component: AllHabitList },
  {
    name: navigationString.HabitProgressDetail,
    component: HabitProgressDetail,
  },
  {
    name: navigationString.AddHabitForm,
    component: AddHabitForm,
  },
];
const SummaryStack = () => {
  useHideTabBar(routesWithoutTabs, "Summary");

  return (
    <>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={navigationString?.Summary}
      >
        {screens.map((item) => {
          return (
            <Stack.Screen
              key={item?.name}
              name={item?.name}
              component={item?.component}
              options={{ headerShown: false, gestureEnabled: false }}
            />
          );
        })}
      </Stack.Navigator>
    </>
  );
};
export default SummaryStack;
