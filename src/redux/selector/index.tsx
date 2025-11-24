import { createSelector } from "reselect";
export const loginReducer = (state: any) => state.loginReducer;
export const onBoardingReducer = (state: any) => state.onBoardingReducer;
export const addDeviceReducer = (state: any) => state.addDeviceReducer;
export const seekerDetailsReducer = (state: any) => state.seekerDetailsReducer;
export const communityReducer = (state: any) => state.communityReducer;
export const dashboardReducer = (state: any) => state.dashbaordReducer;
export const SubscriptionReducer = (state: any) => state.SubscriptionReducer;
export const recommendationReducer = (state: any) =>
  state.recommendationReducer;

export const getloader = () =>
  createSelector(loginReducer, (ele) => ele.isLoading);
export const getUserDetails = () =>
  createSelector(loginReducer, (ele) => ele.loginDetail);
export const getSeekerName = () =>
  createSelector(loginReducer, (ele) => ele.SeekerName);
export const getShortTermGoal = () =>
  createSelector(onBoardingReducer, (ele) => ele.shortTermGoalData);
export const getLongTermGoal = () =>
  createSelector(onBoardingReducer, (ele) => ele.longTermGoalData);
export const getMedicalCondition = () =>
  createSelector(onBoardingReducer, (ele) => ele.medicalCondition);
export const getFitnessActivity = () =>
  createSelector(onBoardingReducer, (ele) => ele.fitnessActivity);
export const getStressors = () =>
  createSelector(onBoardingReducer, (ele) => ele.stressors);
export const getVitalActivityStatus = () =>
  createSelector(addDeviceReducer, (ele) => ele.vitalActivityStatus);
export const getSeekerDetailsData = () =>
  createSelector(seekerDetailsReducer, (ele) => ele.seekerDetails);
//get data for onboarding questoion from onboarding reducer
export const getOnboardingSteps = () =>
  createSelector(onBoardingReducer, (ele) => ele.onboardingStepsQuestions);
export const getSelectedGroupMembers = () =>
  createSelector(communityReducer, (ele) => ele.selectedGroupMembers);

export const profileDetailsCommunity = () =>
  createSelector(communityReducer, (ele) => ele.profileDetailsCommunity);
export const getDashboardReducer = () =>
  createSelector(dashboardReducer, (data) => data.data.data.quotes);
export const getUsersAvailableSlots = () =>
  createSelector(dashboardReducer, (data) => data?.availableSlotes?.data);
export const getTemporarySlots = () =>
  createSelector(dashboardReducer, (data) =>
    data.TemporarySlots?.length > 0 ? data.TemporarySlots : []
  );

export const getUserBookedSlots = () =>
  createSelector(dashboardReducer, (data) => {
    return data?.bookedSlots?.data;
  }); //bookedSlots
export const getCurrentSuggestionsScheduleTime = () =>
  createSelector(dashboardReducer, (data) => {
    return data?.currentSuggestionsScheduleTime?.length > 0
      ? data?.currentSuggestionsScheduleTime
      : [];
  }); //bookedSlots

export const getPostStatus = () =>
  createSelector(communityReducer, (ele) => {
    return ele?.postStatus;
  });
export const get_isGoBack = () =>
  createSelector(communityReducer, (ele) => {
    return ele?.isGoBack;
  });

export const getTrandingFeedData = () =>
  createSelector(communityReducer, (ele) => {
    return ele?.list?.data?.list;
  });

export const getSubscriptionPlanData = () =>
  createSelector(SubscriptionReducer, (ele) => {
    return ele?.list?.data;
  });

export const callCommunityProfileAPI = () =>
  createSelector(communityReducer, (ele: any) => {
    return ele?.callGetUserCommunityProfile;
  });
export const getGroupListing = () =>
  createSelector(communityReducer, (ele) => {
    return ele?.list?.data?.list;
  });

export const getBuySubscriptionDetail = () =>
  createSelector(seekerDetailsReducer, (ele) => {
    return ele?.seekerDetails?.data?.subscriptionPlanInfo;
  });

export const getSeekerInfoRedux = () =>
  createSelector(seekerDetailsReducer, (ele) => {
    return ele?.seekerDetails?.data;
  });
export const getRecommendationQuestion = () =>
  createSelector(onBoardingReducer, (ele) => {
    return ele.recommendationQuestion;
  });
export const checkFCMTokenAvailable = () =>
  createSelector(dashboardReducer, (data) => {
    return data.isFCMTokenAvailable;
  });

export const LoadSavedRecommendationData = () => {
  return createSelector(recommendationReducer, (data) => {
    return {
      books: data?.books,
      videos: data?.videos,
      videosPageNumber: data?.videosPageNumber,
      booksPageNumber: data?.booksPageNumber,
    };
  });
};
