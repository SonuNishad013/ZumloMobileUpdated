export enum COMPONENT_NAMES_ENUM {
  CommunityGroupDetails = "CommunityGroupDetails",
  SavedFeedListing = "SavedFeedListing",
  HomeTab = "HomeTab",
  AllCommunityFeed = "AllCommunityFeed",
  OtherSeekerProfile = "OtherSeekerProfile",
  IndependentFeed = "Independent feed",
  ProfileTab = "Profile tab",
  FeedDetails = "Feed details",
  ForSaveOrUnsaveFeeds = "ForSaveOrUnsaveFeeds",
  groupDetails = "groupDetails",
  ProductGuide = "ProductGuide",
}

export enum APPLY_STATUS {
  stretch = "stretch",
  cover = "cover",
  contain = "contain",
  ignore = "ignore",
  default = "default",
  Invited = "Invited",
  https = "https",
  padding = "padding",
  position = "position",
  button = "button",
  none = "none",
  numeric = "numeric",
  number_pad = "number-pad",
  fast = "fast",
  start = "start",
  email_address = "email-address",
}

export enum PLATEFORM {
  ios = "ios",
  android = "android",
}

export enum CHAT {
  You = "You",
  Me = "Me",
}

export enum LAYOUTS {
  default = "default",
  stack = "stack",
  tinder = "tinder",
}

export enum PICKER {
  photo = "photo",
  video = "video",
  LowQuality = "LowQuality",
  low = "low",
  MediumQuality = "MediumQuality",
}
export enum SUPPORTED_IMAGE_FORMAT {
  JPG = "JPG",
  PNG = "PNG",
  HEIC = "HEIC",
  JPEG = "JPEG",
}

export enum SUPPORTED_VIDEO_FORMAT {
  MP4 = "MP4",
  MOV = "MOV",
  AVI = "AVI",
  MKV = "MKV",
}

export enum GROUP_STATUS {
  Admin = "Admin",
  Joined = "Joined",
  JoinRequested = "Join Requested",
  InvitationSent = "Invitation Sent",
  Blocked = "Blocked",
}

export enum MEMBER_KEYS {
  joinedMembers = "joinedMembers",
  joinRequestMembers = "joinRequestMembers",
  invitedMembers = "invitedMembers",
  blockedMembers = "blockedMembers",
}
export enum ENTITY_TYPE {
  group = "Group",
  Community_user = "Community User",
}

export enum FORMS {
  ConsentFormType = "ConsentFormType",
  PrivacyPolicy = "PrivacyPolicy",
}

export enum GENDER {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

export enum GOALS {
  Developing_New_Skill = "Developing New Skill",
  Physical_Health_Goals = "Physical Health Goals",
  Mental_Health_Goals = "Mental Health Goals",
  Emotional_Well_Being_Goals = "Emotional Well-Being Goals",
  Educational_Goals = "Educational Goals",
  Financial_Goals = "Financial Goals",
  Enhancing_Existing_Skill = "Enhancing Existing Skill",
  Professional_Goals = "Professional Goals",
}
export enum TRIAL {
  WithTrial = "With trial",
  WithoutTrial = "Without_trial",
}
export enum MEMBERSHIP_DURATION {
  MONTHLY = "Monthly",
  YEARLY = "Yearly",
  BASIC = "Basic",
  CANCEL = "Cancel",
  UPGRADE = "Upgrade",
  TRIAL = "Trial",
}
export enum SUBSCRIPTION_NAVIGATION_FROM {
  ONBOARD = "OnBoard",
  PROFILE = "Profile",
  DASHBOARD = "Dashboard",
}
export enum GlobalCategoryName {
  ConsentFormType = "ConsentFormType",
  AIGenerationCategory = "AIGenerationCategory",
}
export enum GlobalCodeName {
  TermsAndConditions = "TermsAndConditions",
  PrivacyPolicy = "PrivacyPolicy",
  MedicalConsent = "MedicalConsent",
  RegenerateGoals = "RegenerateGoals",
  RegenerateActivity = "RegenerateActivity",
  Goals = "Goals",
  WellnessPlan = "WellnessPlan",
  Onboarding = "Onboarding",
  Recommendations = "Recommendations",
  Activities = "Activities",
  Quiz = "Quiz",
  RegenerateRecommendations = "RegenerateRecommendations",
  IndividualRecommendations = "IndividualRecommendations",
  Reduce_Stress_Activities = "Reduce stress Activities",
}
export enum DashboardFooterAnimateButton {
  moodTrack = "moodTrack",
  moodJournal = "moodJournal",
}

export enum DurationFilterType {
  For_Day = 1,
  For_Week = 2,
  For_Month = 3,
  For_OverAll = 4,
}

export enum SummaryProgressCategory {
  Activity = 2,
  Goals = 1,
  WellnessPlan = 3,
}

export enum SliderUnitLabel {
  Minutes = "minutes",
  Min = "min",
  Steps = "Steps",
}

export enum SubscriptionButtonENUM {
  buy = "buy",
  cancel = "cancel",
  upgrade = "upgrade",
  cancelled = "cancelled",
}

export enum PrompTypeENUM {
  Goals_And_Aspirations = "Goals And Aspirations",
  Profile = "Profile",
  Preferences = "Preferences",
  Wellness_Plan = "Wellness Plan",
  Wellness_Prompt = "Wellness Prompt",
  WellnessPlan = "WellnessPlan",
}

export enum vitalTypeENUM {
  vitalTypesMaxScore = "vitalTypesMaxScore",
}

export enum dataTypeENUM {
  object = "object",
}

export enum dashboardClickENUM {
  Profile = "Profile",
  Goals_And_Aspirations = "Goals And Aspirations",
  Goals_And_Aspiration = "Goals And Aspiration",
  Dashboard = "Dashboard",
  planner = "planner",
  Dashbaord = "Dashbaord",
  Wellness = "Wellness",
}

export enum eventENUM {
  isAIloader = "isAIloader",
  login = "login",
}

export enum calenderModeENUM {
  date = "date",
  time = "time",
}

export enum notificationENUM {
  Reminder = "Reminder",
  Progress = "Progress",
  Complete_Profile = "Complete_Profile",
  Goals = "Goals",
  Goals_Achieved = "Goals_Achieved",
}

export enum statusENUM {
  Completed = "Completed",
  In_progress = "In-progress",
  To_be_started = "To be started",
  Assigned = "Assigned",
}

export enum ActivityComplitionStatus {
  Expire = "Expired",
  Completed = "Completed",
  Not_started = "Not-Started",
  Partially_Completed = "Partially-Completed",
}
export enum AiSuggestionCategoryID {
  Wellness_Plan = 216,
}

export enum ActivityProgressTab {
  Day_ = "Day",
  Week_ = "Week",
  Month_ = "Month",
  Overall_ = "Overall",
}

export enum EditableType {
  GOALS = "GOALS",
  ACTIVITIES = "ACTIVITIES",
}
export enum AiResponseTypeEnum {
  activities = "activities",
  goals = "goals",
  wellnessPlan = "wellnessPlan",
  recommendations = "recommendations",
  wellness = "wellness",
}

export enum skipCategoryEnum {
  RECOMMENDATIONS = "recommendations",
  QUIZ = "Quiz",
  QUIZ_SMALL_CASE = "quiz",
  GOALS_LOWERCASE = "goals",
  ACTIVITIES_LOWERCASE = "activities",
}

export enum Enum_SummaryTabFromValue {
  JournalListing = "JournalListing",
  Summary = "Summary",
  WellnessOverviewDetails = "WellnessOverviewDetails",
  WellnessOverview = "WellnessOverview",
}

export enum Enum_CommunityUserValidation {
  Profile_not_found = "Profile not found.",
  User_not_found = "User not found.",
  Failed_with_error = "Request failed with error status code 500",
}

export enum Enum_StatusBarStyle {
  light_content = "light-content",
  dark_content = "dark-content",
  default = "default",
}
export enum Enum_OverviewType {
  Journals = "Journals",
  Goals = "Goals",
  Activities = "Activities",
  WellnessPlan = "WellnessPlan",
}
export enum Enum_moodType {
  Feeling_down = "Feeling down",
  Feeling_low = "Feeling low",
  Neutral = "Neutral",
  Feeling_happy = "Feeling happy",
  Feeling_extremely_joyful = "Feeling extremely joyful",
}

export enum Enum_ParentCategory {
  Goals = 1,
  Activities = 2,
  WellnessPlan = 3,
  Recommendations = 4,
}
export enum Enum_NavigateFrom {
  Dashboard = "Dashboard",
  Planner = "planner",
  SummaryTab = "SummaryTab",
  AIGenerated = "AIGenerated",
  WellnessPrompt = "Wellness Prompt",
  WellnessOverview = "WellnessOverview",
  DailyRoutine = "DailyRoutine",
}
export enum Enum_VitalStatusDurationType {
  Weekly = "Weekly",
  Monthly = "Monthly",
}
export enum Enum_VitalType {
  BloodPressure = "BloodPressure",
  StepCount = "StepCount",
  Sleep = "Sleep",
}
export enum Enum_durationMinutes {
  VeryShort = "0-5 minutes",
  Short = "5-10 minutes",
  ShortMedium = "10-15 minutes",
  Medium = "15-30 minutes",
  MediumLong = "30-45 minutes",
  Long = "45-60 minutes",
  VeryLong = "Over 60 minutes",
}
export enum Enum_durationLabel {
  VeryShort = "Very Short, Under5Minutes",
  Short = "Short, short, 5to10Minutes, Under10Minutes",
  ShortMedium = "Short-Medium, 10-15Minutes, 10to20Minutes, Under15Minutes",
  Medium = "Medium, medium, ModerateDuration, 10to30Minutes, 15to30Minutes, 20to30Minutes, Under30Minutes",
  MediumLong = "Medium-Long, 30to45Minutes, 20to45Minutes, Around30Minutes",
  Long = "Long, 40to60Minutes, 45to60Minutes, Under60Minutes, 60Minutes",
  VeryLong = "Very Long, Over60Minutes, Over30Minutes",
}
export enum Enum_RecommendationType {
  Activities = "Instructional",
  Recommendation = "Educational",
}
export enum Enum_JournalType {
  ALL = "All",
  AI = "AI",
  CUSTOM = "Custom",
}
export enum Enum_QuestionSourceType {
  AiGenerated = 1, // Question was generated by AI
  Manual = 2, // Question was written manually by the user
}

export enum SHOW_MODAL_FOR_ENUM {
  JOURNAL = "journal",
  SUBSCRIPTION = "subscription",
  HABITTAB = "habit",
}
export enum DayType_ENUM {
  Total = 1, // Total days
  Consecutive = 0, // Consecutive days
  Consecutive_days = "Consecutive days",
  Total_days = "Total days",
  Consecutive_journal_summary = 2, // Consecutive days
}
export const RatingEnum = {
  1: "VeryPoor",
  2: "Poor",
  3: "Average",
  4: "Good",
  5: "Excellent",
};

export enum socialLogin_ENUM {
  APPLE = "apple",
  GOOGLE = "google",
}

export enum RecommendationTab_ENUM {
  GENERAL = "General",
  PERSONAL = "Personal",
  BOOKS = "Books",
  VIDEOS = "Videos",
}
export const Enum_HabitFrequancy = {
  1: "Daily",
  2: "Weekly",
  3: "Specific days",
};
export enum DaysHabitTracking {
  Mon = 1,
  Tue = 2,
  Wed = 3,
  Thu = 4,
  Fri = 5,
  Sat = 6,
  Sun = 7,
}
export enum Enum_HabitFrequancy_ {
  "Daily" = 1,
  "Weekly" = 2,
  "Specific days" = 3,
}

export enum DailyRouteTab_ENUM {
  ACTIVITIES = "Activities",
  HABITS = "habits",
}
export enum HabitListOpenFrom_ENUM {
  HOME = "Home",
  ACTIVITY_LIST = "Activity List",
}

export const habitFrequrency = ["Daily", "Weekly", "Specific days"];
export const habitDays = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
export const habitStatus = [
  "Skipped",
  "Not Started",
  "Completed",
  "In progress",
  "Archived",
  "Not Completed",
];
export enum Enum_submitHabit {
  skipper = 1,
  completed = 3,
}

export enum Enum_HabitStatus {
  "Skipped" = 1,
  "Not Started" = 2,
  "Completed" = 3,
  "In progress" = 4,
  "Archived" = 5,
  "Not Completed" = 6,
}
export const Enum_HabitItemIsFrom = {
  MYHABIT: "MyHabit",
  DAILYROUTINE: "DailyRoutine",
  HOME: "Home",
  HABITPROGRESS: "HabitProgress",
};

export enum Enum_DropdownSheet {
  AUTO = "auto",
}
export enum Enum_SourceRecommendation {
  NUMBER = "number",
}
export enum Enum_ButtonTextValue {
  CANCEL = "Cancel",
  DELETE = "Delete",
}
export enum Enum_RecommendationContentType {
  BOOKS = "Books",
  VIDEO = "Video",
}
export enum Enum_RecommendationListedIn {
  AiGeneration = "AiGeneration",
  Dashboard = "Dashboard",
  RecommendationCategory = "RecommendationCategory",
}
export enum Enum_SkipCategory {
  WellnessPlan = "WellnessPlan",
}

export enum Enum_EditReplaceButton {
  ACTIVITIES = "ACTIVITIES",
  GOALS = "GOALS",
}
export enum Ennum_ListedIn {
  Goals = "Goals",
  Activities = "Activities",
  WellnessPlan = "WellnessPlan",
}
export enum Enum_ComponentUsedInForCustomImage {
  OnboardingFlow = "OnboardingFlow",
}
export enum Enum_PlayerState {
  paused = "paused",
  ended = "ended",
}

export enum Enum_ActivitiesFrequency {
  Weekly = "Weekly",
  Monthly = "Monthly",
  daily = "Daily",
}
export enum Enum_editingFor {
  GOALS = "Goals",
  ACTIVITIES = "Activities",
}
