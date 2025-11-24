import React from "react";
import {
  ActivitesDetails,
  ActivityCalendarView,
  ActivityFeedback,
  ChatScreen,
  DynamicPrompts,
  GeneratedActivitiesAI,
  GeneratedGoalAI,
  GeneratedRecommendationsAI,
  GiveFeedback,
  GoalOverView,
  IndependentJournals,
  JournalStepFour,
  JournalStepOne,
  JournalStepThree,
  JournalStepTwo,
  JournalView,
  MoodTrackInput,
  PlannerDashboard,
  Preferences,
  PreferencesRender,
  QuestionsIndex,
  RecommendationList,
  ReGenerateActivitesAI,
  ReGenerateGoalAI,
  ReGenerateRecommendationsAI,
  RepplaceWellnessActivity,
  SelectReGenerationCategory,
  SubscriptionDetail,
  SubscriptionStatus,
  TrackEmo,
  TrackHistory,
  UserPreferencesList,
  WellnessOverview,
  WellnessPlan,
  WellnessPlanIndex,
} from "../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useHideTabBar from "../components/Hooks/useHideTabBar";
import navigationString from "./navigationString";
import MoodJournaling from "../screens/MoodTracking/MoodJournaling/MoodJournaling";
import EditReplaceActivies from "../screens/AddActivities/EditReplaceActivities";
import UpdateScheduleTimeScreen from "../screens/AddActivities/DailyRoutine/UpdateScheduleTimeScreen";
import ActivityGoalOverview from "../screens/Dashboard/Wellness/Overview/Activityoverview";
import SubscriptionPlan from "../screens/SubscriptionPlan";

const Stack = createNativeStackNavigator();
const routesWithoutTabs = [
  navigationString?.YourGoals,
  navigationString?.WellnessPlanIndex,
  navigationString?.WellnessPlan,
  navigationString?.GeneratedGoalAI,
  navigationString?.GeneratedRecommendationsAI,
  navigationString?.GeneratedActivitiesAI,
  navigationString?.ReGenerateActivitesAI,
  navigationString?.ActivitesDetails,
  navigationString?.RecommendationList,
  navigationString?.ActivityCalendarView,
  navigationString?.ActivityFeedback,
  navigationString?.GiveFeedback,
  navigationString.SelectReGenerationCategory,
  // new code for prefernce card click in well bieng
  navigationString.Preferences,
  navigationString.UserPreferencesList,
  navigationString.ReGenerateGoalAI,
  navigationString.ReGenerateRecommendationsAI,
  navigationString?.MoodJournaling,
  navigationString?.TrackHistory,

  navigationString?.TrackEmo,
  navigationString?.MoodTrackInput,
  navigationString.ChatScreen,
  navigationString.DynamicPrompts,
  navigationString.QuestionsIndex,
  navigationString.EditReplaceActivies,
  navigationString.UpdateScheduleTimeScreen,
  navigationString.RepplaceWellnessActivity,
  navigationString.Goaloverview,
  navigationString.ActivityGoalOverview,
  navigationString?.SubscriptionPlan,
  navigationString?.SubscriptionDetail,
  navigationString?.SubscriptionStatus,
  navigationString?.JournalStepOne,
  navigationString?.JournalStepTwo,
  navigationString?.JournalStepThree,
  navigationString?.JournalStepFour,
  navigationString.IndependentJournals,
  navigationString.JournalView,
];

const screens = [
  // wellness Screens
  { name: navigationString.WellnessOverview, component: WellnessOverview },
  { name: navigationString.PlannerDashboard, component: PlannerDashboard },
  { name: navigationString.WellnessPlanIndex, component: WellnessPlanIndex },
  { name: navigationString.WellnessPlan, component: WellnessPlan },
  { name: navigationString.GeneratedGoalAI, component: GeneratedGoalAI },
  { name: navigationString.ReGenerateGoalAI, component: ReGenerateGoalAI },
  {
    name: navigationString.GeneratedRecommendationsAI,
    component: GeneratedRecommendationsAI,
  },
  {
    name: navigationString.ReGenerateRecommendationsAI,
    component: ReGenerateRecommendationsAI,
  },
  {
    name: navigationString.GeneratedActivitiesAI,
    component: GeneratedActivitiesAI,
  },
  {
    name: navigationString.ReGenerateActivitesAI,
    component: ReGenerateActivitesAI,
  },
  { name: navigationString.ActivitesDetails, component: ActivitesDetails },
  { name: navigationString.RecommendationList, component: RecommendationList },
  {
    name: navigationString.ActivityCalendarView,
    component: ActivityCalendarView,
  },
  { name: navigationString?.ActivityFeedback, component: ActivityFeedback },
  { name: navigationString.GiveFeedback, component: GiveFeedback },
  {
    name: navigationString.SelectReGenerationCategory,
    component: SelectReGenerationCategory,
  }, //navigationString.SelectReGenerationCategory
  //new code for prefernce card click in well bieng
  { name: navigationString.Preferences, component: Preferences },
  {
    name: navigationString.UserPreferencesList,
    component: UserPreferencesList,
  },
  { name: navigationString?.MoodJournaling, component: MoodJournaling },
  { name: navigationString?.TrackHistory, component: TrackHistory },
  { name: navigationString?.TrackEmo, component: TrackEmo },
  { name: navigationString?.MoodTrackInput, component: MoodTrackInput },
  { name: navigationString?.ChatScreen, component: ChatScreen },
  { name: navigationString.DynamicPrompts, component: DynamicPrompts },
  { name: navigationString.QuestionsIndex, component: QuestionsIndex },
  {
    name: navigationString.EditReplaceActivies,
    component: EditReplaceActivies,
  },
  {
    name: navigationString.UpdateScheduleTimeScreen,
    component: UpdateScheduleTimeScreen,
  },
  {
    name: navigationString.RepplaceWellnessActivity,
    component: RepplaceWellnessActivity,
  },
  { name: navigationString.Goaloverview, component: GoalOverView },
  {
    name: navigationString.ActivityGoalOverview,
    component: ActivityGoalOverview,
  },
  {
    name: navigationString.SubscriptionPlan,
    component: SubscriptionPlan,
  },
  {
    name: navigationString.SubscriptionDetail,
    component: SubscriptionDetail,
  },
  {
    name: navigationString.SubscriptionStatus,
    component: SubscriptionStatus,
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
  {
    name: navigationString.IndependentJournals,
    component: IndependentJournals,
  },
  {
    name: navigationString.JournalView,
    component: JournalView,
  },
];

const WellnessStack = () => {
  useHideTabBar(routesWithoutTabs, "ExplorerDashboard");
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={navigationString.WellnessOverview}
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
  );
};
export default WellnessStack;
