import React from "react";
import navigationString from "./navigationString";
import {
  ProfileCompletion,
  UserInfo,
  UserType,
  Policy,
  GoalDetailsSection,
  WellBeingSection,
  WellnessGoal,
  OnBoardedBy,
  RegDoneProfileDetails,
  ChatWithDr,
  ExplorerDashboard,
  PlannerDashboard,
  InviteduserContactDetails,
  InviteduserBasicDetails,
  InviteduserMedicalDetails,
  OnBoardingPlannerSteps,
  WellnessPlan,
  GiveFeedback,
  SelectReGenerationCategory,
  Recommendations,
  GeneratedGoalAI,
  ReGenerateGoalAI,
  SelectActivity,
  HealthSymptoms,
  PhysicalHealthWellness,
  StressorsAndTriggers,
  FitnessActivityLevels,
  ShortTermGoals,
  LongTermGoals,
  Counsellings,
  CurrentMedications,
  PlanCreated,
  PlannerFlowCompleted,
  Comments,
  AlcoholConsumption,
  WellnessPlanIndex,
  GeneratedActivitiesAI,
  GeneratedRecommendationsAI,
  ReGenerateRecommendationsAI,
  ReGenerateActivitesAI,
  RecommendationList,
  WelcomeExplorer,
  TrackEmo,
  MoodTrackInput,
  TrackHistory,
  GoalsAndAspiration,
  Quiz,
  ActivityFeedback,
  ActivitesDetails,
  AllRecommendations,
  RecomendationListing,
  ProductGuideMain,
  MyProfile,
  ExplorerActivityPreferences,
  InternalPolicy,
  DynamicPrompts,
  QuestionsIndex,
  AddManualReading,
  AddDevice,
  PairDevice,
  DeviceConnect,
  AddSteps,
  AddHeartRate,
  AddSleep,
  AddBloodPressureVitals,
  ApplePaired,
  ActivityStats,
  FitbitPaired,
  VitalSummary,
  RepplaceWellnessActivity,
  ETLQuestionsIndex,
  SubscriptionDetail,
  SubscriptionStatus,
  ForFreshUserSubscription,
  SubscriptionDetailForNew,
  PlanListOnboarding,
  QuestionForBooksAndVideo,
  QuestionForBooksAndVideoSecondQuestion,
} from "../screens";
import ConvoTemplate from "../screens/ChatScreeen/ConvoTemplate";
import ChatScreen from "../screens/ChatScreeen";
import UpdateScheduleTimeScreen from "../screens/AddActivities/DailyRoutine/UpdateScheduleTimeScreen";
import SubscriptionPlan from "../screens/SubscriptionPlan";
const screens = [
  { name: navigationString.UserType, component: UserType },
  // { name: navigationString.Policy, component: Policy },
  { name: navigationString.WellnessGoal, component: WellnessGoal },
  { name: navigationString.WellBeingSection, component: WellBeingSection },
  { name: navigationString.UserInfo, component: UserInfo },
  { name: navigationString.ProfileCompletion, component: ProfileCompletion },
  { name: navigationString.ChatWithDr, component: ChatWithDr },
  { name: navigationString.ExplorerDashboard, component: ExplorerDashboard },
  { name: navigationString.PlannerDashboard, component: PlannerDashboard },
  { name: navigationString.GoalDetailsSection, component: GoalDetailsSection },
  {
    name: navigationString.RegDoneProfileDetails,
    component: RegDoneProfileDetails,
  },
  { name: navigationString.OnBoardedBy, component: OnBoardedBy },
  {
    name: navigationString.InviteduserContactDetails,
    component: InviteduserContactDetails,
  },
  {
    name: navigationString.InviteduserBasicDetails,
    component: InviteduserBasicDetails,
  },
  {
    name: navigationString.InviteduserMedicalDetails,
    component: InviteduserMedicalDetails,
  },
  { name: navigationString.WellnessPlan, component: WellnessPlan },
  { name: navigationString.GiveFeedback, component: GiveFeedback },
  {
    name: navigationString.SelectReGenerationCategory,
    component: SelectReGenerationCategory,
  },
  { name: navigationString.Recommendations, component: Recommendations },
  { name: navigationString.GeneratedGoalAI, component: GeneratedGoalAI },
  { name: navigationString.ReGenerateGoalAI, component: ReGenerateGoalAI },
  { name: navigationString.SelectActivity, component: SelectActivity },
  { name: navigationString.HealthSymptoms, component: HealthSymptoms },
  {
    name: navigationString?.PhysicalHealthWellness,
    component: PhysicalHealthWellness,
  },
  {
    name: navigationString?.StressorsAndTriggers,
    component: StressorsAndTriggers,
  },
  {
    name: navigationString?.FitnessActivityLevels,
    component: FitnessActivityLevels,
  },
  {
    name: navigationString?.ShortTermGoals,
    component: ShortTermGoals,
  },
  {
    name: navigationString?.LongTermGoals,
    component: LongTermGoals,
  },
  {
    name: navigationString?.Counsellings,
    component: Counsellings,
  },
  {
    name: navigationString.OnBoardingPlannerSteps,
    component: OnBoardingPlannerSteps,
  },
  { name: navigationString.CurrentMedications, component: CurrentMedications },
  { name: navigationString.PlanCreated, component: PlanCreated },
  {
    name: navigationString.PlannerFlowCompleted,
    component: PlannerFlowCompleted,
  },
  { name: navigationString.Comments, component: Comments },
  { name: navigationString.AlcoholConsumption, component: AlcoholConsumption },
  { name: navigationString.WellnessPlanIndex, component: WellnessPlanIndex },
  {
    name: navigationString.GeneratedActivitiesAI,
    component: GeneratedActivitiesAI,
  },
  {
    name: navigationString.ReGenerateActivitesAI,
    component: ReGenerateActivitesAI,
  },
  {
    name: navigationString.GeneratedRecommendationsAI,
    component: GeneratedRecommendationsAI,
  },
  {
    name: navigationString.ReGenerateRecommendationsAI,
    component: ReGenerateRecommendationsAI,
  },

  {
    name: navigationString.ConvoTemplate,
    component: ConvoTemplate,
  },
  {
    name: navigationString.ChatScreen,
    component: ChatScreen,
  },

  {
    name: navigationString.RecommendationList,
    component: RecommendationList,
  },
  {
    name: navigationString.WelcomeExplorer,
    component: WelcomeExplorer,
  },
  //mood tracking on Swiper Click
  { name: navigationString?.TrackEmo, component: TrackEmo },
  { name: navigationString?.MoodTrackInput, component: MoodTrackInput },
  { name: navigationString?.TrackHistory, component: TrackHistory },
  // for goals and aspiration
  { name: navigationString.GoalsAndAspiration, component: GoalsAndAspiration },
  { name: navigationString.Quiz, component: Quiz },
  //new code
  { name: navigationString?.ActivityFeedback, component: ActivityFeedback },
  { name: navigationString?.ActivitesDetails, component: ActivitesDetails },
  {
    name: navigationString?.RecomendationListing,
    component: RecomendationListing,
  },
  {
    name: navigationString.ProductGuideMain,
    component: ProductGuideMain,
  },
  { name: navigationString.MyProfile, component: MyProfile },
  {
    name: navigationString.ExplorerActivityPreferences,
    component: ExplorerActivityPreferences,
  },
  { name: navigationString?.InternalPolicy, component: InternalPolicy },
  { name: navigationString.DynamicPrompts, component: DynamicPrompts },
  { name: navigationString.QuestionsIndex, component: QuestionsIndex },
  { name: navigationString.ETLQuestionsIndex, component: ETLQuestionsIndex },
  { name: navigationString.AllRecommendations, component: AllRecommendations },

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
  {
    name: navigationString.RepplaceWellnessActivity,
    component: RepplaceWellnessActivity,
  },
  {
    name: navigationString.UpdateScheduleTimeScreen,
    component: UpdateScheduleTimeScreen,
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
    name: navigationString.ForFreshUserSubscription,
    component: ForFreshUserSubscription,
  },
  {
    name: navigationString.SubscriptionDetailForNew,
    component: SubscriptionDetailForNew,
  },
  {
    name: navigationString.PlanListOnboarding,
    component: PlanListOnboarding,
  },
  {
    name: navigationString.QuestionForBooksAndVideo,
    component: QuestionForBooksAndVideo,
  },
  {
    name: navigationString.QuestionForBooksAndVideoSecondQuestion,
    component: QuestionForBooksAndVideoSecondQuestion,
  },
];

export default function (Stack: any, name: any) {
  return (
    <>
      {screens.map(({ name, component }) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={{ headerShown: false, gestureEnabled: false }}
        />
      ))}
    </>
  );
}
