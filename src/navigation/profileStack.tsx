import React from "react";
import {
  ActivitesDetails,
  ActivityStats,
  AddBloodPressureVitals,
  AddDevice,
  AddHeartRate,
  AddManualReading,
  AddSleep,
  AddSteps,
  AllRecommendations,
  ApplePaired,
  BasicInfo,
  CategoryListData,
  CategoryNameDataList,
  CategoryQuestionData,
  ChangePassword,
  ChatScreen,
  ContactUs,
  DeleteAccount,
  DeviceConnect,
  DynamicPrompts,
  ETLQuestionsIndex,
  FAQScreen,
  FitbitPaired,
  GiveFeedback,
  GoalsAndAspiration,
  MedicalHistory,
  MedicalHistoryDetailsList,
  MedicalHistoryRenders,
  MoodTrackInput,
  MyProfile,
  PairDevice,
  Preferences,
  PreferencesRender,
  PrivacyPolicy,
  ProductGuideMain,
  Profile,
  QuestionsIndex,
  Recommendations,
  SelectReGenerationCategory,
  SettingsCategoryNameList,
  SettingsQuestionData,
  Summary,
  TrackEmo,
  TrackHistory,
  UserPreferencesList,
  VitalSummary,
  WellnessPlan,
  WellnessPlanIndex,
  SubscriptionDetail,
  SubscriptionStatus,
  JournalStepFour,
  JournalStepThree,
  JournalStepTwo,
  JournalStepOne,
  HabitTracking,
  AddHabitForm,
  HabitDetails,
  IndependentJournals,
  JournalView,
} from "../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useHideTabBar from "../components/Hooks/useHideTabBar";
import navigationString from "./navigationString";
import MoodJournaling from "../screens/MoodTracking/MoodJournaling/MoodJournaling";
import SubscriptionPlan from "../screens/SubscriptionPlan";

const Stack = createNativeStackNavigator();
const routesWithoutTabs = [
  navigationString.MyProfile,
  navigationString.GoalsAndAspiration,
  navigationString.DeleteAccount,
  navigationString.UserPreferencesList,
  navigationString.Preferences,
  navigationString.PreferencesRender,
  navigationString.ContactUs,
  navigationString.PrivacyPolicy,
  navigationString.ChangePassword,
  navigationString.MedicalHistoryDetailsList,
  navigationString.MedicalHistoryRenders,
  navigationString.MedicalHistory,
  navigationString.CategoryNameDataList,
  navigationString.CategoryListData,
  navigationString.CategoryQuestionData,
  navigationString.SettingsCategoryNameList,
  navigationString.SettingsQuestionData,
  navigationString.ProductGuideMain,
  navigationString.TrackHistory,
  navigationString.GiveFeedback,
  navigationString.MoodJournaling,
  navigationString.TrackEmo,
  navigationString.MoodTrackInput,
  navigationString.ChatScreen,
  navigationString.DynamicPrompts,
  navigationString.QuestionsIndex,
  navigationString.AllRecommendations,
  navigationString.WellnessPlanIndex,
  navigationString.WellnessPlan,
  navigationString.Summary,
  navigationString.AddManualReading,
  navigationString.AddDevice,
  navigationString.PairDevice,
  navigationString.DeviceConnect,
  navigationString.AddSteps,
  navigationString.AddHeartRate,
  navigationString.AddSleep,
  navigationString.AddBloodPressureVitals,
  navigationString.ApplePaired,
  navigationString.ActivityStats,
  navigationString.FitbitPaired,
  navigationString.VitalSummary,
  navigationString.ActivitesDetails,
  navigationString.ETLQuestionsIndex,
  navigationString.DynamicPrompts,
  navigationString.SelectReGenerationCategory,
  navigationString.SubscriptionPlan,
  navigationString.SubscriptionDetail,
  navigationString.SubscriptionStatus,
  navigationString?.JournalStepOne,
  navigationString?.JournalStepTwo,
  navigationString?.JournalStepThree,
  navigationString?.JournalStepFour,
  navigationString.HabitTracking,
  navigationString.AddHabitForm,
  navigationString.HabitDetails,
  navigationString.IndependentJournals,
  navigationString.JournalView,
];

console.log(routesWithoutTabs.length); // Output: 40 (after removing duplicates)

const screens = [
  // profile screen
  { name: navigationString.Profile, component: Profile },
  { name: navigationString.MyProfile, component: MyProfile },
  //unusefull screen for now -->
  { name: navigationString.BasicInfo, component: BasicInfo },
  { name: navigationString.ChangePassword, component: ChangePassword },
  // { name: navigationString.Prefrences, component: Prefrences },
  { name: navigationString.ContactUs, component: ContactUs },
  { name: navigationString.FAQScreen, component: FAQScreen },
  { name: navigationString.PrivacyPolicy, component: PrivacyPolicy },
  { name: navigationString.GoalsAndAspiration, component: GoalsAndAspiration },
  { name: navigationString.WellnessPlan, component: WellnessPlan },
  { name: navigationString.GiveFeedback, component: GiveFeedback },
  {
    name: navigationString.SelectReGenerationCategory,
    component: SelectReGenerationCategory,
  },
  { name: navigationString.Recommendations, component: Recommendations },

  // New screen
  { name: navigationString.DeleteAccount, component: DeleteAccount },
  {
    name: navigationString.UserPreferencesList,
    component: UserPreferencesList,
  },
  { name: navigationString.Preferences, component: Preferences },
  { name: navigationString.PreferencesRender, component: PreferencesRender },
  {
    name: navigationString.MedicalHistory,
    component: MedicalHistory,
  },
  {
    name: navigationString.MedicalHistoryDetailsList,
    component: MedicalHistoryDetailsList,
  },
  {
    name: navigationString.MedicalHistoryRenders,
    component: MedicalHistoryRenders,
  },

  {
    name: navigationString.CategoryNameDataList,
    component: CategoryNameDataList,
  },
  {
    name: navigationString.CategoryListData,
    component: CategoryListData,
  },
  {
    name: navigationString.CategoryQuestionData,
    component: CategoryQuestionData,
  },
  {
    name: navigationString.SettingsCategoryNameList,
    component: SettingsCategoryNameList,
  },

  {
    name: navigationString.SettingsQuestionData,
    component: SettingsQuestionData,
  },
  {
    name: navigationString.ProductGuideMain,
    component: ProductGuideMain,
  },
  {
    name: navigationString.TrackHistory,
    component: TrackHistory,
  },
  { name: navigationString?.MoodJournaling, component: MoodJournaling },
  { name: navigationString?.TrackEmo, component: TrackEmo },
  { name: navigationString?.MoodTrackInput, component: MoodTrackInput },
  { name: navigationString?.ChatScreen, component: ChatScreen },

  { name: navigationString.DynamicPrompts, component: DynamicPrompts },
  { name: navigationString.ETLQuestionsIndex, component: ETLQuestionsIndex },

  { name: navigationString.QuestionsIndex, component: QuestionsIndex },
  { name: navigationString.AllRecommendations, component: AllRecommendations },
  { name: navigationString.WellnessPlanIndex, component: WellnessPlanIndex },
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
  { name: navigationString.ActivitesDetails, component: ActivitesDetails },
  { name: navigationString.SubscriptionPlan, component: SubscriptionPlan },
  { name: navigationString.SubscriptionDetail, component: SubscriptionDetail },
  { name: navigationString.SubscriptionStatus, component: SubscriptionStatus },
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
    name: navigationString.HabitTracking,
    component: HabitTracking,
  },
  {
    name: navigationString.AddHabitForm,
    component: AddHabitForm,
  },
  {
    name: navigationString.HabitDetails,
    component: HabitDetails,
  },
  {
    name: navigationString.IndependentJournals,
    component: IndependentJournals,
  },
  {
    name: navigationString.JournalView,
    component: JournalView,
  },

  ,
];
//
const ProfileStack = () => {
  useHideTabBar(routesWithoutTabs, "Profile");
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
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
export default ProfileStack;
