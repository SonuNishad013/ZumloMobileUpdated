import {
  ContactIcon,
  CulturalpersonalBeliefs,
  FeedbackInteractions,
  habit,
  KeyIcon,
  LifestyleHabitsIconNew,
  LockIcon,
  MedicalIcon,
  Moodtracking,
  PreferencesIcon,
  PrivacyIcon,
  SettingIcon,
  SocialCommunityEngagement,
  subscription,
  TrophyIcon,
  UserIcon,
} from "../assets";
import navigationString from "../navigation/navigationString";
import AllSelectionComponent from "../screens/Profile/MedicalHistory/RenderUI/AllSelectionComponent/AllSelectionComponent";
import ActivityPreferences from "../screens/Profile/Preferences/RenderUI/ActivityPreferences";
import HolisticHealthPractices from "../screens/Profile/Preferences/RenderUI/HolisticHealthPractices";
import LearningAndDevelopment from "../screens/Profile/Preferences/RenderUI/LearningAndDevelopment";
import MeditationPractices from "../screens/Profile/Preferences/RenderUI/MeditationPractices";
import MindfulnessActivities from "../screens/Profile/Preferences/RenderUI/MindfulnessActivities";
import PreferencesForAppUsability from "../screens/Profile/Preferences/RenderUI/PreferencesForAppUsability";
import PreferredDevices from "../screens/Profile/Preferences/RenderUI/PreferredDevices";
import RelaxationMethods from "../screens/Profile/Preferences/RenderUI/RelaxationMethods";
import SimpleMultiSeclect from "../screens/Profile/Preferences/RenderUI/SimpleMultiSeclect";
import StressManagementTechniques from "../screens/Profile/Preferences/RenderUI/StressManagementTechniques";
import TherapyMethods from "../screens/Profile/Preferences/RenderUI/TherapyMethods";
import { categoryName, codeName } from "./AllGlobalNameConstant";
import colors from "./colors";
import SingleItmsShowUI from "../screens/Profile/UserFormData/CategoryQuestionData/SingleItmsShowUI/SingleItmsShowUI";
import MultiItemsShowUI from "../screens/Profile/UserFormData/CategoryQuestionData/MultiItemsShowUI/MultiItemsShowUI";
import FamilyMembersUI from "../screens/Profile/UserFormData/CategoryQuestionData/SpecificItemShowUI/FamilyMembers";
import MultiItemsShowUISettings from "../screens/Profile/Settings/SettingsQuestionData/MultiItemsShowUI/MultiItemsShowUISettings";
import { SUBSCRIPTION_NAVIGATION_FROM } from "./ENUM";

export const accountDataList = [
  {
    id: 1,
    name: "Personal Data",
    icon: UserIcon,
    nav: navigationString.MyProfile,
    // categoryName:categoryName?.lifestyleAndHabbits
  },
  {
    id: 2,
    name: "Medical History",
    icon: MedicalIcon,
    nav: navigationString?.MedicalHistory,
  },

  {
    id: 3,
    name: "Mood Tracking",
    icon: Moodtracking,
    nav: navigationString?.TrackHistory,
  },
  {
    id: 4,
    name: "Journal Tracking",
    icon: Moodtracking,
    nav: navigationString.IndependentJournals,
  }, //This should be commented out if not get accepted.
  {
    id: 5,
    // id: 4,
    name: "Habit tracking",
    icon: habit,
    nav: navigationString?.HabitTracking,
    categoryName: categoryName?.HabitTracking,
  },
  {
    id: 6,
    // id: 5,
    name: "Preferences",
    icon: PreferencesIcon,
    nav: navigationString.Preferences,
  },
  {
    id: 7,
    // id: 6,
    name: "Goals and Aspiration",
    icon: TrophyIcon,
    nav: navigationString.GoalsAndAspiration,
  },
  {
    id: 8,
    // id: 7,
    name: "Lifestyle & Habits",
    icon: LifestyleHabitsIconNew,
    nav: navigationString.CategoryNameDataList,
    categoryName: categoryName?.lifestyleAndHabbits,
    categoryDescription:
      "Select each category and tell us about your preferences",
  },
  {
    id: 9,
    // id: 8,
    name: "Feedback and Interactions",
    icon: FeedbackInteractions,
    nav: navigationString.CategoryNameDataList,
    categoryName: categoryName?.feedbackEngagementAndInteraction,
  },
  {
    id: 10,
    // id: 9,
    name: "Cultural and Personal Beliefs",
    icon: CulturalpersonalBeliefs,
    nav: navigationString.CategoryNameDataList,
    categoryName: categoryName?.CulturalAndPersonalBeliefs_Values,
  },
  {
    id: 11,
    // id: 10,
    name: "Social and Community Engagement",
    icon: SocialCommunityEngagement,
    nav: navigationString.CategoryNameDataList,
    categoryName: categoryName?.socialAndCommunityEngagements,
  },
  {
    id: 12,
    // id: 11,
    name: "Settings",
    icon: SettingIcon,
    nav: navigationString?.SettingsCategoryNameList,
    categoryName: categoryName?.settings,
  },
  {
    id: 13,
    // id: 12,
    name: "Subscription and Plans",
    icon: subscription,
    nav: navigationString?.SubscriptionPlan,
    categoryName: categoryName?.Subscription,
  },
  //Hide for stagging build , uncomment this when need to work on habit tracking.

  // socialAndCommunityEngagements
];

export const notificationDataList = [
  {
    id: 1,
    name: "Pop-Up Notification",
    isEnable: false,
  },
];
export const otherSettingDataList = [
  {
    id: 1,
    name: "Contact Us",
    icon: ContactIcon,
    nav: navigationString.ContactUs,
  },
  {
    id: 2,
    name: "Privacy Policy",
    icon: PrivacyIcon,
    nav: navigationString.PrivacyPolicy,
  },
];

export const preferencesSubCategory = [
  {
    title: codeName?.preferred_Therapy_Methods,
  },
  {
    title: codeName?.holistics_Health_Practices,
  },
  {
    title: codeName?.activity_Preferrences,
  },
  {
    title: codeName?.meditation_Practice,
  },
  {
    title: codeName?.relaxation_Methods,
  },
  {
    title: codeName?.mindfullness_Activities,
  },
  {
    title: codeName?.learning_And_Development,
  },
  {
    title: codeName?.stress_Management_Techniques,
  },
];

export const componentMapping = {
  [codeName?.preferred_Therapy_Methods]: TherapyMethods,
  [codeName?.holistics_Health_Practices]: HolisticHealthPractices,
  [codeName?.activity_Preferrences]: ActivityPreferences,
  [codeName?.meditation_Practice]: MeditationPractices,
  [codeName?.relaxation_Methods]: RelaxationMethods,
  [codeName?.mindfullness_Activities]: MindfulnessActivities,
  [codeName?.learning_And_Development]: LearningAndDevelopment,
  [codeName?.stress_Management_Techniques]: StressManagementTechniques,
  [codeName?.preferred_Devices]: PreferredDevices,
  [codeName?.Preference_for_App_Usability_Features]: PreferencesForAppUsability,
  [codeName?.Accessibility_Needs]: SimpleMultiSeclect,
  [codeName?.preferred_Communication_Channels]: SimpleMultiSeclect,
  [codeName?.Preferred_Communication_Style]: SimpleMultiSeclect,
  [codeName?.Tech_Savviness]: SimpleMultiSeclect,
  [codeName?.content_Preferences]: SimpleMultiSeclect,
  [codeName?.Preferred_Learning_Style]: SimpleMultiSeclect,
  [codeName?.Notification_Settings]: SimpleMultiSeclect,
  [codeName?.Preferred_Instructional]: SimpleMultiSeclect,
  [codeName?.Additional_Comments_or_Preferences]: SimpleMultiSeclect,
};

export const componentMapping_MedicalHistory = {
  [codeName?.medical_Conditions]: AllSelectionComponent,
  [codeName?.allergies]: AllSelectionComponent,
  [codeName?.recent_Medical_Visits]: AllSelectionComponent,
  [codeName?.past_Hospitalizations]: AllSelectionComponent,
  [codeName?.past_Surgeries]: AllSelectionComponent,
  [codeName?.family_Medical_History]: AllSelectionComponent,
  [codeName?.menstrual_History]: AllSelectionComponent,
  [codeName?.pregnancy_History]: AllSelectionComponent,
  [codeName?.gynecological_Conditions]: AllSelectionComponent,
  [codeName?.contraceptive_Use]: AllSelectionComponent,

  [codeName?.personal_Mental_Health_History]: AllSelectionComponent,
  [codeName?.family_Mental_Health_History]: AllSelectionComponent,

  [codeName?.current_Medications]: AllSelectionComponent,
  [codeName?.past_Medications]: AllSelectionComponent,
  [codeName?.medication_Allergies_or_Side_Effects]: AllSelectionComponent,
  [codeName?.current_Counseling]: AllSelectionComponent,
  [codeName?.counseling_History]: AllSelectionComponent,

  [codeName?.Emotional_Well_Being]: AllSelectionComponent,
  [codeName?.Emotional_Regulation]: AllSelectionComponent,
  [codeName?.Stressors_and_Triggers]: AllSelectionComponent,
  [codeName?.Stress_Levels]: AllSelectionComponent,
  [codeName?.Additional_Associated_Fields_for_Context]: AllSelectionComponent,
  [codeName?.Coping_Mechanism]: AllSelectionComponent,
  [codeName?.Thought_Processes]: AllSelectionComponent,
  [codeName?.Mood_Patterns]: AllSelectionComponent,
  [codeName?.Personality_Traits]: AllSelectionComponent,
  [codeName?.Behavioral_Patterns]: AllSelectionComponent,

  [codeName?.Daily_Mood_Logs]: AllSelectionComponent,
  [codeName?.Physical_Symptoms_Tracking]: AllSelectionComponent,
  [codeName?.Emotional_Symptoms_Tracking]: AllSelectionComponent,
};

export const componentMapping_Lifestyle = {
  [codeName?.sleepPatterns]: SingleItmsShowUI,
  [codeName?.dailyRoutines]: SingleItmsShowUI,
  [codeName?.personalityType]: MultiItemsShowUI,
  [codeName?.personalityTraits]: MultiItemsShowUI,
  [codeName?.strengths]: MultiItemsShowUI,
  [codeName?.weaknesses]: MultiItemsShowUI,
  [codeName?.Additional_Associated_Fields_for_Context2]: MultiItemsShowUI,
  [codeName?.substance_Use]: SingleItmsShowUI,
  [codeName?.technology_Usage]: SingleItmsShowUI,
  [codeName?.social_Life]: SingleItmsShowUI,
  [codeName?.hobbies_And_Interests]: SingleItmsShowUI,
  [codeName?.exercise_And_Physical_Activity]: SingleItmsShowUI,
  [codeName?.source_Of_Motivation]: SingleItmsShowUI,
  [codeName?.challenges_In_Maintaining_Motivation]: SingleItmsShowUI,
  [codeName?.support_Systems]: SingleItmsShowUI,
  [codeName?.dietary_Habbits]: SingleItmsShowUI,
  [codeName?.app_Usage_Patterns]: SingleItmsShowUI,
  [codeName?.user_Feedback_and_Reviews]: SingleItmsShowUI,
  [codeName?.Participation_in_Surveys_And_Research]: SingleItmsShowUI,

  [codeName?.cultural_Practices]: SingleItmsShowUI,
  [codeName?.religious_Beliefs]: SingleItmsShowUI,
  [codeName?.traditions]: MultiItemsShowUI,
  [codeName?.practices]: MultiItemsShowUI,
  [codeName?.employment_Status]: SingleItmsShowUI,

  [codeName?.social_Activity_Levels]: SingleItmsShowUI,
  [codeName?.core_Beliefs]: SingleItmsShowUI,
  [codeName?.moral_Values]: SingleItmsShowUI,

  [codeName?.social_Activity_Levels02]: SingleItmsShowUI,
  [codeName?.mentors]: SingleItmsShowUI,
  [codeName?.family_Members]: FamilyMembersUI,
  [codeName?.impact]: SingleItmsShowUI,
  [codeName?.social_Connections]: SingleItmsShowUI,
  [codeName?.community_Involvement]: SingleItmsShowUI,
  [codeName?.Impact_of_Social_Media]: SingleItmsShowUI,

  [codeName?.notification_Settings]: MultiItemsShowUISettings,
  [codeName?.for_Health_Data]: MultiItemsShowUISettings,
  [codeName?.share_Data]: MultiItemsShowUISettings,
  [codeName?.anonimity_Preferences]: MultiItemsShowUISettings,
  [codeName?.for_health_data]: MultiItemsShowUISettings,
};

export const colorMeditionIconBg = [
  colors?.SurfCrest,
  colors?.SaltBox,
  colors?.royalOrange,
  colors?.prussianBlue,
];

export const colorMeditionIcon = [
  colors?.darkthemColor,
  colors?.SurfCrest,
  colors?.prussianBlue,
  colors?.SurfCrest,
];

export const colorBgIcon = [
  colors?.ShadowGreen,
  colors?.saltLight,
  colors?.orgDark,
  colors?.pbD,
];

export const backgrounColor = [
  colors?.prussianBlue,
  colors?.SurfCrest,
  colors?.SurfCrest,
  colors?.polishedPine,
];

export const buttonTextColor = [
  colors?.SurfCrest,
  colors?.prussianBlue,
  colors?.prussianBlue,
  colors?.SurfCrest,
];

export const colorSleepPatternsBg = [
  colors?.SurfCrest,
  colors?.royalOrange,
  colors?.SaltBox,
  colors?.prussianBlue,
  colors?.SaltBox,
  colors?.prussianBlue,
];

export const colorSleepPatternsText = [
  colors?.prussianBlue,
  colors?.prussianBlue,
  colors?.SurfCrest,
  colors?.SurfCrest,
  colors?.SurfCrest,
  colors?.SurfCrest,
];

export const profileString = {
  parentStepId: "parentStepId",
};

export const removedPreferresSubHeading = [
  // codeName?.preferred_Therapy_Methods,
  // codeName?.preferred_Devices,
  // codeName?.preferred_Communication_Channels,
  // codeName?.Preferred_Communication_Style,
  // codeName?.Preferred_Learning_Style,
  // codeName?.Accessibility_Needs,
  // "Specific Requirements",
  // codeName?.Additional_Comments_or_Preferences,
  "",
  // null,
];

export const removedMedicalHistorySubHeading = [
  // codeName?.preferred_Therapy_Methods,
  // codeName?.preferred_Devices,
  // codeName?.preferred_Communication_Channels,
  // codeName?.Preferred_Communication_Style,
  // codeName?.Preferred_Learning_Style,
  // codeName?.Accessibility_Needs,
  // "Specific Requirements",
  // codeName?.Additional_Comments_or_Preferences,
  "",
  "Date",
  "Healthcare provider",
  "Outcome",
  "Reason",
  "Type of surgery",
  "Issues",
  "Complications",
  "Gynecological Conditions",
  "Other Info",
  null,
];

export const removedLifeStyleSubHeading = [
  // codeName?.preferred_Therapy_Methods,
  // codeName?.preferred_Devices,
  // codeName?.preferred_Communication_Channels,
  // codeName?.Preferred_Communication_Style,
  // codeName?.Preferred_Learning_Style,
  // codeName?.Accessibility_Needs,
  // "Specific Requirements",
  // codeName?.Additional_Comments_or_Preferences,
  "",
  // "Date",
  // "Healthcare provider",
  // "Outcome",
  // "Reason",
  // "Type of surgery",
  // "Issues",
  // "Complications",
  // "Gynecological Conditions",
  // "Other Info",
  null,
];
export const showSettingHeader = [
  "For health data",
  "Consent agreement",
  "Data sharing",
  "Specify shared data",
  "For password",
  "Anonimity preferences",
  "Notification Preferences",
  "Frequency of notifications",
  "Types of notifications and reminders",
  "Session Timeout",
];
export const hideAddMoreOption = [
  // codeName?.medical_Conditions,
  // codeName?.allergies,
  // codeName?.recent_Medical_Visits,
  // codeName?.past_Hospitalizations,
  // codeName?.past_Surgeries,
  // codeName?.family_Medical_History,
  // codeName?.menstrual_History,
  // codeName?.pregnancy_History,
  // codeName?.gynecological_Conditions,
  codeName?.contraceptive_Use,

  codeName?.personal_Mental_Health_History,
  codeName?.family_Mental_Health_History,

  // codeName?.current_Medications,
  // codeName?.past_Medications,
  codeName?.medication_Allergies_or_Side_Effects,
  codeName?.current_Counseling,
  // codeName?.counseling_History,

  codeName?.Emotional_Well_Being,
  codeName?.Emotional_Regulation,
  codeName?.Stressors_and_Triggers,
  codeName?.Stress_Levels,
  codeName?.Additional_Associated_Fields_for_Context,
  codeName?.Coping_Mechanism,
  codeName?.Thought_Processes,
  codeName?.Mood_Patterns,
  codeName?.Personality_Traits,
  codeName?.Behavioral_Patterns,

  codeName?.Daily_Mood_Logs,
  codeName?.Physical_Symptoms_Tracking,
  codeName?.Emotional_Symptoms_Tracking,
];

export const basicInfoDetailData = [
  { title: "Age", value: "", key: "age" },
  { title: "Gender", value: "", key: "genderText" },
  {
    title: "Sexual Orientation",
    value: "",
    key: "SexualOrientation",
    isGlobalCode: true,
    globalCodeKey: "SexualOrientation",
  },
  {
    title: "Location",
    value: "",
    key: "location",
  },
  {
    title: "Ethnicity",
    value: "",
    key: "Ethnicity",
    // isGlobalCode: true,
    globalCodeKey: "Ethnicity",
  },
  {
    title: "Religion",
    value: "",
    key: "religion",
    isGlobalCode: true,
    globalCodeKey: "religion",
  },
  {
    title: "Preferred Pronouns",
    value: "",
    key: "preferredPronouns",
    isGlobalCode: true,
    globalCodeKey: "PreferredPronouns",
  },
  {
    title: "Preferred Language",
    value: "",
    key: "preferredLanguage",
    isGlobalCode: true,
    globalCodeKey: "PreferredLanguage",
  },
];

export const socialInfoDetailData = [
  {
    title: "Relationship Status",
    value: "",
    key: "relationshipStatusId",
    isGlobalCode: true,
    globalCodeKey: "RelationshipStatus",
  },
  { title: "Number of Children", value: "", key: "numberOfChildren" },
  {
    title: "Living Situation",
    value: "",
    key: "livingSituationId",
    isGlobalCode: true,
    globalCodeKey: "LivingSituation",
  },
];

export const occupationInfoDetailData = [
  {
    title: "Employment Status",
    value: "",
    key: "employmentStatusId",
    isGlobalCode: true,
    globalCodeKey: "EmploymentStatus",
  },

  { title: "Occupation", value: "", key: "occupation" },
  {
    title: "Industry",
    value: "",
    key: "industryId",
    isGlobalCode: true,
    globalCodeKey: "Industry",
  },
  {
    title: "Work Environment",
    value: "",
    key: "workEnvironmentId",
    isGlobalCode: true,
    globalCodeKey: "WorkEnvironment",
  },
];

export const educationInfoDetailData = [
  {
    title: "Highest Level of Education",
    value: "",
    key: "highestLevelOfEducationId",
    globalCodeKey: "HighestLevelofEducation",
    isGlobalCode: true,
  },
  { title: "Field of Study", value: "", key: "fieldOfStudy" },
];

export const current_Year_Last_Date = new Date(
  `${new Date().getFullYear()}-12-31`
);
