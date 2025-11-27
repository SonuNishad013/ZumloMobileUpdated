import React, { useEffect, useState } from "react";
import {
  ActivityFeedback,
  ActivityStats,
  AddActivity,
  AddBloodPressureVitals,
  AddDevice,
  AddHeartRate,
  AddManualReading,
  AddSleep,
  AddSteps,
  AllRecommendations,
  ApplePaired,
  AssessmentList,
  AssessmentResult,
  AssessmentScreen,
  BasicInfo,
  ChatScreen,
  CreateGoal,
  DailyRoutine,
  DeviceConnect,
  ExplorerDashboard,
  FitbitPaired,
  GoalDuration,
  GoalsCreated,
  MoodTrackInput,
  MyActivity,
  MyGoals,
  MyProfile,
  NewActivityDone,
  NutritionDetails,
  NutritionRecipies,
  NutritionSavedRecipies,
  OnboardComplete,
  PairDevice,
  PlannerDashboard,
  Profile,
  QuizQuestions,
  QuizResult,
  RecommendationDetails,
  RecommendationList,
  SetIntensityInput,
  SetIntensitySpeed,
  StartQuiz,
  TrackEmo,
  TrackHistory,
  VitalSummary,
  WelcomeExplorer,
  WellnessGoal,
  WellnessOverview,
  YourGoals,
  ContactUs,
  ActivitesDetails,
  StartActivity,
  ActivityCalendarView,
  ChatWithDr,
  Preferences,
  GoalsAndAspiration,
  WellnessPlanIndex,
  WellnessPlan,
  GeneratedGoalAI,
  GeneratedRecommendationsAI,
  GeneratedActivitiesAI,
  ReGenerateActivitesAI,
  ReGenerateGoalAI,
  ReGenerateRecommendationsAI,
  SelectReGenerationCategory,
  GiveFeedback,
  ExplorerPromptsDetails,
  UserPreferencesList,
  PreferencesRender,
  DynamicPrompts,
  QuestionsIndex,
  ETLQuestionsIndex,
  RepplaceWellnessActivity,
  GoalOverView,
  IndependentFeed,
  SubscriptionStatus,
  SubscriptionDetail,
  JournalStepOne,
  JournalStepTwo,
  JournalStepThree,
  JournalStepFour,
  QuestionForBooksAndVideo,
  QuestionForBooksAndVideoSecondQuestion,
  HabitDetails,
  FilterRecommendation,
  AddHabitForm,
  IndependentJournals,
  JournalView,
} from "../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useHideTabBar from "../components/Hooks/useHideTabBar";
import navigationString from "./navigationString";
import MoodJournaling from "../screens/MoodTracking/MoodJournaling/MoodJournaling";
import AllResourceLibrary from "../screens/Dashboard/Planner/AllResourceLibrary";
import ResourceLibraryTemplate from "../screens/ResourceLibrary/ResourceLibraryTemplate";
import ResourceLibraryTempDetails from "../screens/ResourceLibrary/ResourceLibraryTempDetails";
import NotificationScreen from "../screens/Dashboard/Notifications";
import AllGoalsProgress from "../screens/Dashboard/Planner/AllGoalsProgress";
import IndependentGoalsScreen from "../screens/Dashboard/Planner/IndependentGoals/IndependentGoals";
import UpdateScheduleTimeScreen from "../screens/AddActivities/DailyRoutine/UpdateScheduleTimeScreen";
import EditReplaceActivies from "../screens/AddActivities/EditReplaceActivities";
import { event } from "./emitter";
import Affirmations from "../screens/Dashboard/Planner/Affirmations";
import SubscriptionPlan from "../screens/SubscriptionPlan";

const DashboardStack = () => {
  const [aiLoader, setAiLoader] = useState(false);
  const Stack = createNativeStackNavigator();
  const [routesWithoutTabs, setRoutesWithoutTabs] = useState([
    navigationString?.YourGoals,
    navigationString.OnboardComplete,
    navigationString.AddManualReading,
    navigationString.AddDevice,
    navigationString.PairDevice,
    navigationString.DeviceConnect,
    navigationString.AddSteps,
    navigationString.AddHeartRate,
    navigationString.ApplePaired,
    navigationString.ActivityStats,
    navigationString.FitbitPaired,
    navigationString.AddSleep,
    navigationString.AddBloodPressureVitals,
    navigationString.VitalSummary,
    navigationString.MyProfile,
    navigationString.DailyRoutine,
    navigationString?.DeleteAccount,
    navigationString?.RecommendationList,
    navigationString?.TrackEmo,
    navigationString?.MoodTrackInput,
    navigationString?.TrackHistory,
    navigationString?.ChatScreen,
    navigationString?.WelcomeExplorer,
    navigationString?.AllRecommendations,
    navigationString?.StartQuiz,
    navigationString?.QuizQuestions,
    navigationString?.MoodJournaling,
    navigationString.ContactUs,
    navigationString.AllResourceLibrary,
    navigationString.ResourceLibraryTemplate,
    navigationString.ResourceLibraryTempDetails,
    navigationString.ActivitesDetails,
    navigationString?.ActivityFeedback,
    navigationString?.NewActivityDone,
    navigationString?.ChatWithDr,
    navigationString?.Preferences,
    navigationString.GoalsAndAspiration,
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
    navigationString?.Affirmations,
    navigationString?.SubscriptionPlan,
    navigationString?.SubscriptionDetail,
    navigationString?.SubscriptionStatus,
    navigationString?.JournalStepOne,
    navigationString?.JournalStepTwo,
    navigationString?.JournalStepThree,
    navigationString?.JournalStepFour,
    navigationString?.QuestionForBooksAndVideo,
    navigationString?.QuestionForBooksAndVideoSecondQuestion,
    navigationString.HabitDetails,
    navigationString.FilterRecommendation,
    navigationString.AllRecommendations,
    navigationString.AddHabitForm,
    navigationString.IndependentJournals,
    navigationString.JournalView,
  ]);

  const screens = [
    { name: navigationString.CreateGoal, component: CreateGoal },
    { name: navigationString.GoalDuration, component: GoalDuration },
    { name: navigationString.MyActivity, component: MyActivity },
    { name: navigationString.MyGoals, component: MyGoals },
    { name: navigationString.SetIntensityInput, component: SetIntensityInput },
    { name: navigationString.YourGoals, component: YourGoals },
    { name: navigationString.SetIntensitySpeed, component: SetIntensitySpeed },
    { name: navigationString.GoalsCreated, component: GoalsCreated },
    { name: navigationString.WellnessGoal, component: WellnessGoal },
    { name: navigationString.PlannerDashboard, component: PlannerDashboard },
    { name: navigationString.ExplorerDashboard, component: ExplorerDashboard },
    {
      name: navigationString.RecommendationDetails,
      component: RecommendationDetails,
    },
    // profile screen
    { name: navigationString.Profile, component: Profile },
    { name: navigationString.BasicInfo, component: BasicInfo },

    // Assessment Screen
    { name: navigationString.AssessmentScreen, component: AssessmentScreen },
    { name: navigationString.AssessmentList, component: AssessmentList },
    { name: navigationString.AssessmentResult, component: AssessmentResult },
    { name: navigationString?.WellnessOverview, component: WellnessOverview },

    { name: navigationString?.DailyRoutine, component: DailyRoutine },
    { name: navigationString?.AddActivity, component: AddActivity },
    { name: navigationString?.NewActivityDone, component: NewActivityDone },
    // { name: navigationString?.ActivityFeedback, component: ActivityFeedback },
    { name: navigationString?.ActivitesDetails, component: ActivitesDetails },

    { name: navigationString?.ActivityFeedback, component: ActivityFeedback },
    // Mood Tracking
    { name: navigationString?.TrackEmo, component: TrackEmo },
    { name: navigationString?.MoodTrackInput, component: MoodTrackInput },
    { name: navigationString?.TrackHistory, component: TrackHistory },

    // Nutrition Screen
    { name: navigationString?.NutritionDetails, component: NutritionDetails },
    { name: navigationString?.NutritionRecipies, component: NutritionRecipies },
    {
      name: navigationString?.NutritionSavedRecipies,
      component: NutritionSavedRecipies,
    },
    //add vitals

    { name: navigationString.OnboardComplete, component: OnboardComplete },
    { name: navigationString.AddManualReading, component: AddManualReading },
    { name: navigationString.AddDevice, component: AddDevice },
    { name: navigationString.PairDevice, component: PairDevice },
    { name: navigationString.DeviceConnect, component: DeviceConnect },
    { name: navigationString.AddSteps, component: AddSteps },
    { name: navigationString.AddHeartRate, component: AddHeartRate },
    { name: navigationString.ApplePaired, component: ApplePaired },
    { name: navigationString.ActivityStats, component: ActivityStats },
    { name: navigationString.FitbitPaired, component: FitbitPaired },
    { name: navigationString.AddSleep, component: AddSleep },
    {
      name: navigationString.AddBloodPressureVitals,
      component: AddBloodPressureVitals,
    },
    { name: navigationString.VitalSummary, component: VitalSummary },
    { name: navigationString.MyProfile, component: MyProfile },
    {
      name: navigationString.RecommendationList,
      component: RecommendationList,
    },
    {
      name: navigationString.AllRecommendations,
      component: AllRecommendations,
    },
    {
      name: navigationString.AllResourceLibrary,
      component: AllResourceLibrary,
    },

    { name: navigationString.ChatScreen, component: ChatScreen },
    { name: navigationString.WelcomeExplorer, component: WelcomeExplorer },
    {
      name: navigationString.StartQuiz,
      component: StartQuiz,
    },
    {
      name: navigationString.QuizQuestions,
      component: QuizQuestions,
    },
    {
      name: navigationString.QuizResult,
      component: QuizResult,
    },
    {
      name: navigationString.MoodJournaling,
      component: MoodJournaling,
    },
    { name: navigationString.ContactUs, component: ContactUs },
    {
      name: navigationString.ResourceLibraryTemplate,
      component: ResourceLibraryTemplate,
    },
    {
      name: navigationString.ResourceLibraryTempDetails,
      component: ResourceLibraryTempDetails,
    },
    { name: navigationString.StartActivity, component: StartActivity },
    {
      name: navigationString.ActivityCalendarView,
      component: ActivityCalendarView,
    },
    { name: navigationString.ChatWithDr, component: ChatWithDr },
    { name: navigationString.Preferences, component: Preferences },
    {
      name: navigationString.GoalsAndAspiration,
      component: GoalsAndAspiration,
    },
    { name: navigationString.WellnessPlanIndex, component: WellnessPlanIndex },
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
    { name: navigationString.GiveFeedback, component: GiveFeedback },
    {
      name: navigationString.ExplorerPromptsDetails,
      component: ExplorerPromptsDetails,
    },
    {
      name: navigationString.UserPreferencesList,
      component: UserPreferencesList,
    },
    // { name: navigationString.Preferences, component: Preferences },
    { name: navigationString.PreferencesRender, component: PreferencesRender },
    {
      name: navigationString.NotificationScreen,
      component: NotificationScreen,
    },
    { name: navigationString.AllGoalsProgress, component: AllGoalsProgress },
    { name: navigationString.DynamicPrompts, component: DynamicPrompts },
    { name: navigationString.QuestionsIndex, component: QuestionsIndex },
    {
      name: navigationString.IndependentGoalsScreen,
      component: IndependentGoalsScreen,
    },
    { name: navigationString.ETLQuestionsIndex, component: ETLQuestionsIndex },
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
    { name: navigationString.Goaloverview, component: GoalOverView },
    { name: navigationString?.IndependentFeed, component: IndependentFeed },
    { name: navigationString?.Affirmations, component: Affirmations },
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
      name: navigationString.QuestionForBooksAndVideo,
      component: QuestionForBooksAndVideo,
    },
    {
      name: navigationString.QuestionForBooksAndVideoSecondQuestion,
      component: QuestionForBooksAndVideoSecondQuestion,
    },
    {
      name: navigationString.HabitDetails,
      component: HabitDetails,
    },
    {
      name: navigationString.FilterRecommendation,
      component: FilterRecommendation,
    },
    {
      name: navigationString.AddHabitForm,
      component: AddHabitForm,
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
  useEffect(() => {
    const handleAiLoader = (data: { isAiloader: boolean }) => {
      console.log("AI Loader State:", data.isAiloader);
      setAiLoader(data.isAiloader);

      setRoutesWithoutTabs((prevRoutes) => {
        if (data.isAiloader) {
          if (!prevRoutes.includes(navigationString.PlannerDashboard)) {
            return [...prevRoutes, navigationString.PlannerDashboard]; // Add route if not already present
          }
        } else {
          return prevRoutes.filter(
            (route) => route !== navigationString.PlannerDashboard
          );
        }
        return prevRoutes;
      });
    };

    event.on("isAIloader", handleAiLoader);

    return () => {
      event.off("isAIloader", handleAiLoader); // Cleanup listener
    };
  }, []);


  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={navigationString.PlannerDashboard}
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
export default DashboardStack;
