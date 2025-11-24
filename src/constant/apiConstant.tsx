import appConstant from "./appConstant";
// base url
let baseURL = appConstant.UserManagement_API;
let Config_API = appConstant.Config_API;
let DocumentMangement_API = appConstant.DocumentMangement_API;
let AI_API = appConstant.AI_API;
let Device_API = appConstant.Device_API;
let Wellness_API = appConstant.Wellness_API;
let Notification_API = appConstant.Notification_API;
let Community_API = appConstant.Community;
let Billing_Service_API = appConstant.Billing;

let auth = "Auth";
let register = "Register";
let clinician = "Clinician";
let Seeker = "Seeker";
let onBoardingFlow = "OnboardingFlow";
let HealthDevice = "HealthDevice";
let GlobalCodes = "GlobalCodes";
let Images = "Images";
let GoalsAndAspirations = "GoalsAndAspirations";
let WellnessPlan = "WellnessPlan";
let ConsentForm = "ConsentForm";
let User = "User";
let Config = "Config";
let AIExchange = "AIExchange";
let MoodJournaling = "MoodJournaling";
let Logger = "Logger";
let Preferences = "Preferences";
let Dashboard = "Dashboard";
let Templates = "Templates";
let Onboarding = "Onboarding";
let Notifications = "Notifications";
let DynamicPrompting = "DynamicPrompting";
let Community = "Community";
let Group = "Group";
let Feeds = "Feeds";
let Activities = "Activities";
let Subscription = "Subscription";
let Goals = "Goals";
let Purchase = "Purchase";
let Recommendations = "Recommendations";
let Habit = "Habit";

export default () => ({
  // loginwithEmail: `${baseURL + auth}/LoginWithEmail`, //old
  loginwithEmail: `${baseURL + auth}/Login`, //new
  LoginwithPhone: `${baseURL + auth}/LoginWithPhoneNumber`,
  ForgotPassword: `${baseURL + auth}/ForgotPassword`,
  GoogleAuthenticate: `${baseURL + auth}/GoogleAuthenticate`,
  AppleAuthenticate: `${baseURL + auth}/AppleAuthenticate`,
  VerifyForgotPasswordOtp: `${baseURL + auth}/VerifyForgotPasswordOtp`,
  ResetPassword: `${baseURL + auth}/ResetPassword`,
  VerifyOtp: `${baseURL + auth}/VerifyOtp`,
  ResendOtp_LoginWithPhone: `${baseURL + auth}/ResendOtp_LoginWithPhone`,
  ResendOtp_ForgotPassword: `${baseURL + auth}/ResendOtp_ForgotPassword`,
  SignOut: `${baseURL + auth}/SignOut`,
  DeleteUser: `${baseURL + User}/DeleteUser`,
  SaveUserPrivacyPolicyInfo: `${baseURL + User}/SaveUserPrivacyPolicyInfo`,

  VerifyOtpAndDeleteUser: `${baseURL + User}/VerifyOtpAndDeleteUser`,
  ChangePassword: `${baseURL + User}/ChangePassword`,
  SignUpWithEmailOrPhone: `${baseURL + register}/SignUpWithEmailOrPhone`,
  VerifyEmailAndPhoneSignUpOtp: `${
    baseURL + register
  }/VerifyEmailAndPhoneSignUpOtp`,
  Register: `${baseURL + register}/RegisterWithEmail`,
  ResendOtp_SignUpWithEmailAndPhone: `${
    baseURL + register
  }/ResendOtp_SignUpWithEmailAndPhone`,
  //clinician
  GetClinicianDetailBySeekerEmail: `${
    baseURL + clinician
  }/GetClinicianDetailBySeekerEmail`,

  //Seeker
  GetInvitedSeekerDetails: `${baseURL + Seeker}/GetInvitedSeekerDetails`,
  SaveOrUpdateSeekerInfo: `${baseURL + Seeker}/SaveOrUpdateSeekerInfo`,
  GetSeekerWellnessPlanDetailsAsync: `${
    baseURL + Seeker
  }/GetSeekerWellnessPlanDetailsAsync`,
  SaveSeekerPlannerExplorerId: `${
    baseURL + Seeker
  }/SaveSeekerPlannerExplorerId`,

  // Medical history

  GetUserMedicalHistory: `${baseURL + Seeker}/GetUserMedicalHistory`,
  GetMedicalHistoryStepsByCodeId: `${
    baseURL + Seeker
  }/GetMedicalHistoryStepsByCodeId`,
  MedicalHistoryStepAnswer: `${baseURL + Seeker}/MedicalHistoryStepAnswer`,

  // onBoardongs
  GetConsentForm: `${baseURL + onBoardingFlow}/GetConsentForm`,
  OnboardingSteps: `${baseURL + onBoardingFlow}/OnboardingSteps`,
  Aspirations: `${baseURL + onBoardingFlow}/Aspirations`,
  AreaOfInterests: `${baseURL + onBoardingFlow}/AreaOfInterests`,
  WellnessPlan: `${baseURL + onBoardingFlow}/WellnessPlan`,

  //mono to micro.
  GetOnboardingSteps: `${
    DocumentMangement_API + onBoardingFlow
  }/GetOnboardingSteps`,

  SeekerOnboardingStepAnswer: `${
    AI_API + AIExchange
  }/SeekerOnboardingStepAnswer`, //update//GenerateRecommendationItems
  GetRegenerateOnboardingDetails: `${
    DocumentMangement_API + onBoardingFlow
  }/GetRegenerateOnboardingDetails`, //update
  RegenerateOnboardingDetails: `${
    AI_API + AIExchange
  }/RegenerateOnboardingDetails`, //update
  CreateGoalsFromAI: `${Wellness_API + WellnessPlan}/CreateGoalsFromAI`, //update
  GetWellnessPlanDetails: `${
    Wellness_API + WellnessPlan
  }/GetWellnessPlanDetails`, //update

  //
  CreateActivitiesFromAI: `${
    Wellness_API + WellnessPlan
  }/CreateActivitiesFromAI`, //update

  // /api/v1/WellnessPlan/CreateRecommendationsFromAI
  CreateRecommendationsFromAI: `${
    Wellness_API + WellnessPlan
  }/CreateRecommendationsFromAI`,

  // add vitals
  CreateDevice: `${Device_API + HealthDevice}/CreateDevice`,
  CreateHealthData: `${Device_API + HealthDevice}/CreateHealthData`,
  CreateVitalsManually: `${Device_API + HealthDevice}/CreateVitalsManually`,
  GetVitalsActivityStatus: `${
    Device_API + HealthDevice
  }/GetVitalsActivityStatus`,
  GetVitalsActivityStatusSummary: `${
    Device_API + HealthDevice
  }/GetVitalsActivityStatusSummary`,

  GetAllGlobalCodesWithCategory: `${
    Config_API + GlobalCodes
  }/GetAllGlobalCodesWithCategory`,
  GetAllGlobalCodesWithCategory1: `${
    Config_API + Config
  }/GetAllGlobalCodesWithCategory`,
  InsertGlobalCode: `${Config_API + Config}/InsertGlobalCode`,

  GlobalJsonByCategoryName: `${Config_API + Config}/GlobalJsonByCategoryName`,
  //
  //micro onboarding steps
  GetAllGlobalCodesWithImages: `${
    Config_API + Config
  }/GetAllGlobalCodesWithImages`,
  //logger api
  GetUserMobileDashboardDetailsByDate: `${
    Config_API + Dashboard
  }/GetUserMobileDashboardDetailsByDate`,
  GetUserMobileDashboardQuotesByDate: `${
    Config_API + Dashboard
  }/GetUserMobileDashboardQuotesByDate`,

  GetMoodTrackingQuestion: `${AI_API + AIExchange}/GetMoodTrackingQuestion`,
  SaveMoodTrackingQuestion: `${AI_API + AIExchange}/SaveMoodTrackingQuestion`,
  GetMoodTrackingDetails: `${AI_API + AIExchange}/GetMoodTrackingDetails`,

  //AIExchange +  MoodJournaling
  GetMoodJournalingQuestion: `${
    AI_API + MoodJournaling
  }/GetMoodJournalingQuestion`,
  GetMoodJournalingDetails: `${
    AI_API + MoodJournaling
  }/GetMoodJournalingDetails`,
  SaveMoodJournalingQuestion: `${
    AI_API + MoodJournaling
  }/SaveMoodJournalingQuestion`,

  SaveLog: `${Config_API + Logger}/SaveLog`,

  GetSeekerPersonalInfo: `${baseURL + Seeker}/GetSeekerPersonalInfo`,

  UpdateSeekerPersonalInfo: `${baseURL + Seeker}/UpdateSeekerPersonalInfo`,
  GetAllFormImages: `${baseURL + Images}/GetAllFormImages`,
  UploadSeekerProfilePicture: `${baseURL + Seeker}/UploadSeekerProfilePicture`,
  CreateGoalAndAspirations: `${
    Wellness_API + GoalsAndAspirations
  }/CreateGoalAndAspirations`,
  AddEmailOrPhoneNumber: `${baseURL + Seeker}/AddEmailOrPhoneNumber`,
  VerifySeekerEmailOrPhoneNumberOTP: `${
    baseURL + Seeker
  }/VerifySeekerEmailOrPhoneNumberOTP`,
  GetGlobalCodesByCategoryName: `${
    Config_API + Config
  }/GetGlobalCodesByCategoryName`,
  // GetRegenereateWellnessPlanSteps: `${baseURL + WellnessPlan}/GetRegenereateWellnessPlanSteps/`,
  GetRegenereateWellnessPlanSteps: `${
    baseURL + WellnessPlan
  }/GetRegenerateWellnessPlanSteps/`,
  ReGenerateSeekerWellnessPlan: `${
    baseURL + WellnessPlan
  }/ReGenerateSeekerWellnessPlan`,
  CreateWellnessPlanDetails: `${
    Wellness_API + WellnessPlan
  }/CreateWellnessPlanDetailsFromAI`,
  // GetConsentFormByType: `${baseURL + ConsentForm}/GetConsentFormById/`,

  SaveQuizFromAI: `${AI_API + AIExchange}/SaveQuizFromAI`,
  GetAllActiviesDetailsByDate: `${
    Wellness_API + WellnessPlan
  }/GetAllActivitiesDetailsByDate`,
  GetConsentFormByType: `${
    DocumentMangement_API + ConsentForm
  }/GetConsentFormByType/`,
  GenerateOnboardingDetails: `${AI_API + AIExchange}/GenerateOnboardingDetails`,
  baseURL,
  GetUserPreferences: `${
    DocumentMangement_API + Preferences
  }/GetUserPreferences`,

  // GetUserMedicalHistory
  GetPreferenceStepsByCodeId: `${
    DocumentMangement_API + Preferences
  }/GetPreferenceStepsByCodeId`,

  PreferenceStepAnswer: `${
    DocumentMangement_API + Preferences
  }/PreferenceStepAnswer`,
  SendContactForm: `${Config_API + Config}/SendContactForm`,
  //Explorer api
  ///api/v1/Seeker/SaveExplorerPreferences
  SaveExplorerPreferences: `${baseURL + Seeker}/SaveExplorerPreferences`,
  GetResourceLibraryTemplate: `${
    Wellness_API + Templates
  }/GetResourceLibraryTemplateDetailsByOrgId`,
  //GET_ACTIVITIES_TEMPLATES ///api/v1/Templates/GetActivitiesTemplates
  GetActivitiesTemplates: `${Wellness_API + Templates}/GetActivitiesTemplates`,
  //SaveUserActivitiesFromTemplate
  SaveUserActivitiesFromTemplate: `${
    Wellness_API + Templates
  }/SaveUserActivitiesFromTemplate`,

  GetActivitiesFeedbackSteps: `${
    Wellness_API + WellnessPlan
  }/GetActivitiesFeedbackSteps`,
  SaveActivitiesFeedbackStepAnswer: `${
    Wellness_API + WellnessPlan
  }/SaveActivitiesFeedbackStepAnswer`,
  GetActivityDetailsById: `${
    Wellness_API + WellnessPlan
  }/GetActivityDetailsById`,
  GetActivityDetailsByIdAndDate: `${
    Wellness_API + WellnessPlan
  }/GetActivityDetailsByIdAndDate`,
  GetWellnessOverview: `${Wellness_API + WellnessPlan}/GetWellnessOverview`,
  GetActivityRecommedationDetailsById: `${
    Wellness_API + WellnessPlan
  }/GetActivityRecommendationDetailsById`,
  SaveSelectedRecommendation: `${
    Wellness_API + WellnessPlan
  }/SaveSelectedRecommendation`,

  UpdateUserSkippedCategory: `${baseURL + Seeker}/UpdateUserSkippedCategory`,

  GetActivityRecentHistoryByDateAndId: `${
    Wellness_API + WellnessPlan
  }/GetActivityRecentHistoryByDateAndId`,

  GetLifestyleStepAndOptionsWithAnswers: `${
    Wellness_API + WellnessPlan
  }/GetLifestyleStepAndOptionsWithAnswers`,
  GetUserStepAndOptionsWithAnswers: `${
    Wellness_API + WellnessPlan
  }/GetUserStepAndOptionsWithAnswers`,

  SaveAndUpdateUserAnswers: `${
    Wellness_API + WellnessPlan
  }/SaveAndUpdateUserAnswers`,

  SaveActivityHistoryDetail: `${
    Wellness_API + WellnessPlan
  }/SaveActivityHistoryDetail`,
  GetUserSkippedCategory: `${baseURL + Seeker}/GetUserSkippedCategory`,
  GetUserPlannerOnboardingResponse: `${
    AI_API + AIExchange
  }/GetUserPlannerOnboardingResponse`,
  GetUserMissingProfileDataPointQuestions: `${
    AI_API + DynamicPrompting
  }/GetUserMissingProfileDataPointQuestions`,
  SaveUserMissingProfileDataPointAnswers: `${
    baseURL + User
  }/SaveUserMissingProfileDataPointAnswers`,

  // dcd
  SaveOnboardingExplorerSteps: `${
    AI_API + Onboarding
  }/SaveOnboardingExplorerSteps`,
  GetMobileDashboardPrompts: `${
    Config_API + Dashboard
  }/GetMobileDashboardPrompts`,

  GetVitalsSummary: `${Device_API + HealthDevice}/GetVitalsSummary`,
  GetGoalsGraphDataByDate: `${
    Wellness_API + WellnessPlan
  }/GetGoalsGraphDataByDate`,
  GetAllNotifications: `${
    Notification_API + Notifications
  }/GetAllNotifications`,

  CommunityActivities: `${
    Notification_API + Notifications
  }/CommunityActivities`,

  SaveNotification: `${Notification_API + Notifications}/SaveNotification`,

  //https://dev-api.zumlo.co/user-service/api/v1/User/CreateUserDeviceInfo
  CreateUserDeviceInfo: `${baseURL + User}/CreateUserDeviceInfo`,
  GetActivitiesGraphDataByDate: `${
    Wellness_API + WellnessPlan
  }/GetActivitiesGraphDataByDate`,
  SessionTimeOut: `${baseURL + User}/SessionTimeOut`,
  //https://dev-api.zumlo.co/user-service/api/v1/User/SessionTimeOut

  // 'https://dev-api.zumlo.co/community-service/api/v1/Community/GetCommunityProfile'

  SaveConsentForm: `${baseURL + User}/SaveConsentForm`,
  GetConsentFormStatus: `${baseURL + User}/GetConsentFormStatus`,
  GetUserIndividualGoalsList: `${
    Wellness_API + WellnessPlan
  }/GetUserIndividualGoalsList`,

  // Community

  CreateCommunityProfile: `${Community_API + Community}/CreateCommunityProfile`, // Done
  updateCommunityProfile: `${Community_API + Community}/UpdateCommunityProfile`, // Done
  GetCommunityProfile: `${Community_API + Community}/GetCommunityProfile`, // Done
  CommunityUserList: `${Community_API + Community}/CommunityUserList`, // Done
  ConnectedUserList: `${Community_API + Community}/ConnectedUserList`, // Done

  UserProfileById: `${Community_API + Community}/UserProfileById`, // Done
  //https://dev-api.zumlo.co/community-service/api/v1/Community/SearchAny?searchEntity=bucklers

  SearchAny: `${Community_API + Community}/SearchAny`, // Done

  CreateConnection: `${Community_API + Community}/CreateConnection`, // Pending
  AcceptOrRejectConnectionRequest: `${
    Community_API + Community
  }/AcceptOrRejectConnectionRequest`, // Pending
  GetChat: `${Community_API + Community}/GetChat`, // Done

  // Feeds
  CreateFeed: `${Community_API + Feeds}/CreateFeed`, // Done
  SaveOrUnSaveFeed: `${Community_API + Feeds}/SaveOrUnSaveFeed`, // Done//https://dev-api.zumlo.co/community-service/api/v1/Feeds/SaveOrUnSaveFeed

  UpdateFeed: `${Community_API + Feeds}/UpdateFeed`, // Pending
  DeleteFeedOrFeedShare: `${Community_API + Feeds}/DeleteFeedOrFeedShare`, // Pending
  GetFeedById: `${Community_API + Feeds}/GetFeedById`, // Pending
  LikeFeed: `${Community_API + Feeds}/LikeFeed`, // Done
  CommentFeed: `${Community_API + Feeds}/CommentFeed`, // Done
  CommentReply: `${Community_API + Feeds}/CommentReply`, // Pending
  FeedsByGroupId: `${Community_API + Feeds}/FeedsByGroupId`, //Done
  DeleteCommentsOrReply: `${Community_API + Feeds}/DeleteCommentsOrReply`, //https://dev-api.zumlo.co/community-service/api/v1/Feeds/DeleteCommentsOrReply?commentId=22
  //https://dev-api.zumlo.co/community-service/api/v1/Feeds/DeleteCommentsOrReply?replyId=223

  CommentAndRepliesByFeedId: `${
    Community_API + Feeds
  }/CommentAndRepliesByFeedId`, //Done
  SharedFeed: `${Community_API + Feeds}/SharedFeed`, // Pending
  GetTrendingFeeds: `${Community_API + Feeds}/GetTrendingFeeds`, // Pending
  SavedFeedsList: `${Community_API + Feeds}/SavedFeedsList`, // https://dev-api.zumlo.co/community-service/api/v1/Feeds/SavedFeedsList

  FeedReport: `${Community_API + Feeds}/FeedReport`, // Pending
  ShareFeed: `${Community_API + Feeds}/ShareFeed`, // Pending

  // Group

  CreateGroup: `${Community_API + Group}/CreateGroup`, // Done
  UpdateGroup: `${Community_API + Group}/UpdateGroup`, // Pending
  PrivateAndPublicGroupList: `${
    Community_API + Group
  }/PrivateAndPublicGroupList`, // Done
  CreatedOrJoinedGroupList: `${Community_API + Group}/CreatedOrJoinedGroupList`, // Done
  AcceptOrRejectInvite: `${Community_API + Group}/AcceptOrRejectInvite`, // Pending
  GroupDetailsById: `${Community_API + Group}/GroupDetailsById`, // Done
  AddGroupMembers: `${Community_API + Group}/AddGroupMembers`, // Pending
  RemoveGroupMembers: `${Community_API + Group}/RemoveGroupMembers`, // Pending

  JoinGroup: `${Community_API + Group}/JoinGroup`, // Done
  LeaveGroup: `${Community_API + Group}/LeaveGroup`, // Done
  RemoveJoinRequest: `${Community_API + Group}/RemoveJoinRequest`, // Done
  SuggestedGroups: `${Community_API + Group}/SuggestedGroups`, // Done
  MembersByGroupId: `${Community_API + Group}/MembersByGroupId`, // Done
  DeleteGroup: `${Community_API + Group}/DeleteGroup`, // Done

  //

  GetActivitiesQuestionsByCategoryId: `${
    Wellness_API + WellnessPlan
  }/GetActivitiesQuestionsByCategoryId`,
  DeleteActivityById: `${Wellness_API + WellnessPlan}/DeleteActivityById`,
  RegenerateWellnessDetailsById: `${
    Wellness_API + WellnessPlan
  }/RegenerateWellnessDetailsById`,
  //https://dev-api.zumlo.co/wellness-service/api/v1/WellnessPlan/RegenerateWellnessDetailsById

  UpdateNotificationStatus: `${
    Notification_API + Notifications
  }/UpdateNotificationStatus`,

  GetUserActivityAvailability: `${
    Wellness_API + WellnessPlan
  }/GetUserActivityAvailability`,
  GetUserScheduledActivitiesList: `${
    Wellness_API + WellnessPlan
  }/GetUserScheduledActivitiesList`,
  UpdateActivityScheduleTime: `${
    Wellness_API + WellnessPlan
  }/UpdateActivityScheduleTime`,

  GetEditableActivityQuestionsById: `${
    Wellness_API + Activities
  }/GetEditableActivityQuestionsById`, //update

  GetEditableGoalQuestionsById: `${
    Wellness_API + Goals
  }/GetEditableGoalQuestionsById`, //update
  AIDynamicPromptingToMoodJournalAndTracking: `${
    AI_API + AIExchange
  }/AIDynamicPromptingToMoodJournalAndTracking`,
  EditActivityDetailsById: `${
    Wellness_API + Activities
  }/EditActivityDetailsById`,

  GetReplaceCategoryQuestionsByName: `${
    Config_API + Config
  }/GetReplaceCategoryQuestionsByName`,

  ReplaceActivityDetailsById: `${
    Wellness_API + Activities
  }/ReplaceActivityDetailsById`,

  EditGoalDetailsById: `${Wellness_API + Goals}/EditGoalDetailsById`,
  ReplaceGoalDetailsById: `${Wellness_API + Goals}/ReplaceGoalDetailsById`,

  DeleteGoalById: `${Wellness_API + WellnessPlan}/DeleteGoalById`, //update

  //https://dev-api.zumlo.co/notification-service/api/v1/Notifications/DeleteNotificationById/5136
  DeleteNotificationById: `${
    Notification_API + Notifications
  }/DeleteNotificationById`,
  DeleteSelectedActivitiesFromAIResponse: `${
    AI_API + AIExchange
  }/DeleteSelectedActivitiesFromAIResponse`,
  DeleteSelectedGoalsFromAIResponse: `${
    AI_API + AIExchange
  }/DeleteSelectedGoalsFromAIResponse`,
  RegenerateSelectedActivitiesDetails: `${
    AI_API + AIExchange
  }/RegenerateSelectedActivitiesDetails`,
  RegenerateSelectedGoalDetails: `${
    AI_API + AIExchange
  }/RegenerateSelectedGoalDetails`,
  LikeOrDislikeRecommendation: `${
    Wellness_API + WellnessPlan
  }/LikeOrDislikeRecommendation`,
  //https://dev-api.zumlo.co/ai-service/api/v1/AIExchange/UpdateActivityScheduledTimeWithGuid
  UpdateActivityScheduledTimeWithGuid: `${
    AI_API + AIExchange
  }/UpdateActivityScheduledTimeWithGuid`, //update
  GetUserWellnessPlanProgress: `${
    Wellness_API + WellnessPlan
  }/GetUserWellnessPlanProgress`,
  GetUserGoalProgressById: `${Wellness_API + Goals}/GetUserGoalProgressById`,
  GetUserGoalProgress: `${Wellness_API + Goals}/GetUserGoalProgress`,
  GetUserActivityProgressById: `${
    Wellness_API + Activities
  }/GetUserActivityProgressById`,
  GetUserActivityProgress: `${
    Wellness_API + Activities
  }/GetUserActivityProgress`,
  GetSubscriptionPlansForSeeker: `${
    Config_API + Subscription
  }/GetSubscriptionPlansForSeeker`,

  BuySeekerPlan: `${Billing_Service_API + Purchase}/BuySeekerPlan`,
  LinkRecommendationItems: `${AI_API + AIExchange}/LinkRecommendationItems`,
  RecommendationItemsInExistingRecord: `${
    Wellness_API + Recommendations
  }/RecommendationItemsInExistingRecord`,

  GetAIChatCountForSubscriptionPlan: `${
    AI_API + AIExchange
  }/GetAIChatCountForSubscriptionPlan`,

  PredefinedActivitiesToUser: `${
    Wellness_API + Activities
  }/PredefinedActivitiesToUser`,
  GetDailyAffirmations: `${AI_API + AIExchange}/GetDailyAffirmations`,

  MoodJournalAiQuestion: `${AI_API + AIExchange}/MoodJournalAiQuestion`,
  GetMoodJournalingGraphDetails: `${
    AI_API + MoodJournaling
  }/GetMoodJournalingGraphDetails`,

  StartFreeTrial: `${baseURL + User}/StartFreeTrial`,
  ValidateUserEmail: `${baseURL + auth}/ValidateUserEmail`,
  GetHabitsDetails: `${Wellness_API + Habit}/GetHabitsDetails`,
  SaveHabitTracking: `${Wellness_API + Habit}/SaveHabitTracking`,
  CreateHabit: `${Wellness_API + Habit}/CreateHabit`,
  GetHabitCategories: `${Wellness_API + Habit}/GetHabitCategories`,
  GetHabitTrackingForGraph: `${Wellness_API + Habit}/GetHabitTrackingForGraph`,
  GetHabitProgress: `${Wellness_API + Habit}/GetHabitProgress`,
  DeleteHabit: `${Wellness_API + Habit}/DeleteHabit`,
  GetHabitById: `${Wellness_API + Habit}/GetHabitById`,

  RecommendationVideosAndBooks: `${
    Wellness_API + Recommendations
  }/RecommendationVideosAndBooks`,
  RecommendationCategories: `${
    Wellness_API + Recommendations
  }/RecommendationCategories`,
  UserSelectedRecommendationCategories: `${
    Wellness_API + Recommendations
  }/UserSelectedRecommendationCategories`,

  BookRecommendations: `${Wellness_API + Recommendations}/BookRecommendations`,
  GenerateRecommendationItems: `${
    AI_API + AIExchange
  }/GenerateRecommendationItems`, //update//GenerateRecommendationItems
});
