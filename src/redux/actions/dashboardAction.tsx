import types from "../types/dashboardTypes";
import {
  ajaxDelete,
  ajaxGet,
  ajaxPost,
  ajaxPostWithToken,
} from "../../config/apiService";
import apiConstant from "../../constant/apiConstant";
import moment from "moment";
// import apiUrl from "../../constant/apiUrl";

const dispatchData = (type: any, payload: any, dispatch: any) => {
  dispatch({
    type: type,
    payload: payload,
  });
};

const GetMoodTrackingQuestion = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.GET_MOODTRACKING_QUESTION_REQUEST, {}, dispatch);
  const url = apiConstant().GetMoodTrackingQuestion;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_MOODTRACKING_QUESTION_REQUEST, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_MOODTRACKING_QUESTION_REQUEST, err, dispatch);
      return Promise.reject(err);
    });
};
const SaveMoodTrackingQuestion = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.SAVE_MOODTRACKING_QUESTION_REQUEST, {}, dispatch);
  const url = apiConstant().SaveMoodTrackingQuestion;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.SAVE_MOODTRACKING_QUESTION_REQUEST, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.SAVE_MOODTRACKING_QUESTION_REQUEST, err, dispatch);
      return Promise.reject(err);
    });
};
const GetUserMobileDashboardDetailsByDate = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  params: any
) => {
  dispatchData(types.GET_QOUTES_REQUEST, {}, dispatch);
  const url =
    apiConstant().GetUserMobileDashboardDetailsByDate + "?dateTime=" + params;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_QOUTES_REQUEST, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_QOUTES_REQUEST, err, dispatch);
      return Promise.reject(err);
    });
};
const GetMoodTrackingDetails = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  params: any
) => {
  dispatchData(types.GET_MOODTRACKING_DETAILS_REQUEST, {}, dispatch);
  const url = apiConstant().GetMoodTrackingDetails + "?targetDate=" + params;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_MOODTRACKING_DETAILS_REQUEST, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_MOODTRACKING_DETAILS_REQUEST, err, dispatch);
      return Promise.reject(err);
    });
};
const GenerateOnboardingDetails = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  params: any
) => {
  dispatchData(types.GET_GENERATEONBOARDINGDETAILS_REQUEST, {}, dispatch);
  const url =
    apiConstant().GetAllActiviesDetailsByDate + "?targetDate=" + params;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_GENERATEONBOARDINGDETAILS_REQUEST, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_GENERATEONBOARDINGDETAILS_REQUEST, err, dispatch);
      return Promise.reject(err);
    });
};

const GetMoodJournalingQuestion = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.GET_MOODJOURNALING_QUESTION_REQUEST, {}, dispatch);
  const url = apiConstant().GetMoodJournalingQuestion;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_MOODJOURNALING_QUESTION_REQUEST, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_MOODJOURNALING_QUESTION_REQUEST, err, dispatch);
      return Promise.reject(err);
    });
};
const SaveMoodJournalingQuestion = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.POST_SAVEMOODJOURNALING_QUESTION_REQUEST, {}, dispatch);
  const url = apiConstant().SaveMoodJournalingQuestion;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        types.POST_SAVEMOODJOURNALING_QUESTION_REQUEST,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        types.POST_SAVEMOODJOURNALING_QUESTION_REQUEST,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
};
const GetMoodJournalingDetails = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  params: any
) => {
  dispatchData(types.GET_MOODJOUTNALING_DETAILS_REQUEST, {}, dispatch);
  const url = apiConstant().GetMoodJournalingDetails + "?targetDate=" + params;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_MOODJOUTNALING_DETAILS_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_MOODJOUTNALING_DETAILS_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const GetWellnessOverview = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  params: any
) => {
  dispatchData(types.GET_WELLNESS_OVERVIEW_REQUEST, {}, dispatch);

  const url = apiConstant().GetWellnessOverview + params;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_WELLNESS_OVERVIEW_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_WELLNESS_OVERVIEW_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const GetMobileDashboardPrompts = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.GET_GETMOBILEDASHBOARDPROMPTS_REQUEST, {}, dispatch);
  const url = apiConstant().GetMobileDashboardPrompts;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_GETMOBILEDASHBOARDPROMPTS_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_GETMOBILEDASHBOARDPROMPTS_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const GetGoalsGraphDataByDate = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  params: any
) => {
  dispatchData(types.GET_GETGOALSGRAPHDATABYDATE_REQUEST, {}, dispatch);
  const url = apiConstant().GetGoalsGraphDataByDate + params;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_GETGOALSGRAPHDATABYDATE_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_GETGOALSGRAPHDATABYDATE_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
const GetActivitiesGraphDataByDate = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  params: any
) => {
  dispatchData(types.GET_GETACTIVITIESGRAPHDATEBYDATE_REQUEST, {}, dispatch);
  const url = apiConstant().GetActivitiesGraphDataByDate + params;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        types.GET_GETACTIVITIESGRAPHDATEBYDATE_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        types.GET_GETACTIVITIESGRAPHDATEBYDATE_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
};
const GetUserMissingProfileDataPointQuestions = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  params: any
) => {
  dispatchData(
    types.GET_GETUSERMISSINGPROFILEDATAPOINTQUESTIONS_REQUEST,
    {},
    dispatch
  );
  const url = apiConstant().GetUserMissingProfileDataPointQuestions + params;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        types.GET_GETUSERMISSINGPROFILEDATAPOINTQUESTIONS_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        types.GET_GETUSERMISSINGPROFILEDATAPOINTQUESTIONS_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
};

const SaveUserMissingProfileDataPointAnswers = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(
    types.POST_SAVEUSERMISSINGPROFILEDATAPOINTANSWERSS_REQUEST,
    {},
    dispatch
  );
  const url = apiConstant().SaveUserMissingProfileDataPointAnswers;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        types.POST_SAVEUSERMISSINGPROFILEDATAPOINTANSWERSS_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        types.POST_SAVEUSERMISSINGPROFILEDATAPOINTANSWERSS_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
};

const GetUserIndividualGoalsList = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.GET_USER_INDIVIDUAL_GOALS_LIST_REQUEST, {}, dispatch);

  const url = apiConstant().GetUserIndividualGoalsList;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        types.GET_USER_INDIVIDUAL_GOALS_LIST_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_USER_INDIVIDUAL_GOALS_LIST_FAILURE, err, dispatch);
      return Promise.reject(new Error(err));
    });
};
const GetUserMobileDashboardQuotesByDate = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  params: any
) => {
  dispatchData(
    types.GET_GETUSERMOBILEDASHBOARDQUOTESBYDATE_REQUEST,
    {},
    dispatch
  );
  const url =
    apiConstant().GetUserMobileDashboardQuotesByDate + "?dateTime=" + params;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        types.GET_GETUSERMOBILEDASHBOARDQUOTESBYDATE_REQUEST,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        types.GET_GETUSERMOBILEDASHBOARDQUOTESBYDATE_REQUEST,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
};
const GetActivitiesQuestionsByCategoryIdApi = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  params: any
) => {
  console.log("activityIdactivityIdparams====>>>", params);
  dispatchData(
    types.GET_ACTIVITIES_QUESTIONS_BY_CATEGORYID_REQUEST,
    {},
    dispatch
  );
  const url =
    apiConstant().GetActivitiesQuestionsByCategoryId +
    "?categoryId=" +
    params?.categoryId +
    "&activityId=" +
    params?.activityId +
    "&aiProvider=" +
    params?.aiProvider;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        types.GET_ACTIVITIES_QUESTIONS_BY_CATEGORYID_REQUEST,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        types.GET_ACTIVITIES_QUESTIONS_BY_CATEGORYID_REQUEST,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
};
//https://dev-api.zumlo.co/wellness-service/api/v1/WellnessPlan/DeleteActivityById
const DeleteActivityByIdApi = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  console.log("activityIdactivityIdparams====>>>", requestbody);
  dispatchData(types.DELETE_ACTIVITY_BY_ID_REQUEST, {}, dispatch);
  const url = apiConstant().DeleteActivityById;
  return ajaxDelete(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.DELETE_ACTIVITY_BY_ID_REQUEST, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.DELETE_ACTIVITY_BY_ID_REQUEST, err, dispatch);
      return Promise.reject(err);
    });
};
const DeleteGoalByIdAPI = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  console.log("DeleteGoalByIdPARAMS====>>>", requestbody);
  dispatchData(types.DELETEGOALBYID_REQUEST, {}, dispatch);
  const url = apiConstant().DeleteGoalById;
  return ajaxDelete(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.DELETEGOALBYID_REQUEST, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.DELETEGOALBYID_REQUEST, err, dispatch);
      return Promise.reject(err);
    });
};
const GetUserActivityAvailabilityAPI = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.GETUSERACTIVITYAVAILABILITY_REQUEST, {}, dispatch);
  const url = apiConstant().GetUserActivityAvailability;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GETUSERACTIVITYAVAILABILITY_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GETUSERACTIVITYAVAILABILITY_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
const GetUserScheduledActivitiesList = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.GETUSERSCHEDULEDACTIVITIESLIST_REQUEST, {}, dispatch);
  const url = apiConstant().GetUserScheduledActivitiesList;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        types.GETUSERSCHEDULEDACTIVITIESLIST_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GETUSERSCHEDULEDACTIVITIESLIST_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const UpdateActivityScheduleTime = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.UPDATE_ACTIVITY_SCHEDULE_TIME_REQUEST, {}, dispatch);
  const url = apiConstant().UpdateActivityScheduleTime;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.UPDATE_ACTIVITY_SCHEDULE_TIME_REQUEST, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.UPDATE_ACTIVITY_SCHEDULE_TIME_REQUEST, err, dispatch);
      return Promise.reject(err);
    });
}; //RegenerateWellnessDetailsById
const EditActivityDetailsByIdApi = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.EDITACTIVITYDETAILSBYID_REQUEST, {}, dispatch);
  const url = apiConstant().EditActivityDetailsById;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.EDITACTIVITYDETAILSBYID_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.EDITACTIVITYDETAILSBYID_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
const EditGoalDetailsByIdAPI = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.EDITGOALDETAILSBYID_REQUEST, {}, dispatch);
  const url = apiConstant().EditGoalDetailsById;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.EDITGOALDETAILSBYID_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.EDITGOALDETAILSBYID_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
const ReplaceActivityDetailsByIdAPI = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.REPLACEACTIVITYDETAILSBYID_REQUEST, {}, dispatch);
  const url = apiConstant().ReplaceActivityDetailsById;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.REPLACEACTIVITYDETAILSBYID_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.REPLACEACTIVITYDETAILSBYID_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
const ReplaceGoalDetailsByIdAPI = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.REPLACEACTIVITYDETAILSBYID_REQUEST, {}, dispatch);
  const url = apiConstant().ReplaceGoalDetailsById;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.REPLACEACTIVITYDETAILSBYID_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.REPLACEACTIVITYDETAILSBYID_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
//https://dev-api.zumlo.co/wellness-service/api/v1/Activities/GetEditableActivityQuestionsById?id=43&category=2
//EditActivityDetailsById;

const GetEditableActivityQuestionsByIdAPI = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  params: any
) => {
  dispatchData(types.GETEDITABLEACTIVITYQUESTIONSBYID_REQUEST, {}, dispatch);
  const url =
    apiConstant().GetEditableActivityQuestionsById +
    `?id=${params.id}&category=${params.category}`;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        types.GETEDITABLEACTIVITYQUESTIONSBYID_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        types.GETEDITABLEACTIVITYQUESTIONSBYID_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
};
//GetReplaceCategoryQuestionsByName
const GetReplaceCategoryQuestionsByNameAPi = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  params: any
) => {
  dispatchData(types.GETREPLACECATEGORYQUESTIONSBYNAME_REQUEST, {}, dispatch);
  const url =
    apiConstant().GetReplaceCategoryQuestionsByName +
    "?category=" +
    params?.ActivityQuestionsType;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        types.GETREPLACECATEGORYQUESTIONSBYNAME_REQUEST,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        types.GETREPLACECATEGORYQUESTIONSBYNAME_REQUEST,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
};
const GetEditableGoalQuestionsByIdAPI = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  params: any
) => {
  dispatchData(types.GETEDITABLEGOALQUESTIONSBYID_REQUEST, {}, dispatch);
  const url =
    apiConstant().GetEditableGoalQuestionsById +
    `?id=${params.id}&category=${params.category}`;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GETEDITABLEGOALQUESTIONSBYID_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GETEDITABLEGOALQUESTIONSBYID_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
const AIDynamicPromptingToMoodJournalAndTracking = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(
    types.POST_AIDYNAMICPROMPTINGTOMOODJOURNALANDTRACKING_REQUEST,
    {},
    dispatch
  );
  const url = apiConstant().AIDynamicPromptingToMoodJournalAndTracking;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        types.POST_AIDYNAMICPROMPTINGTOMOODJOURNALANDTRACKING_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        types.POST_AIDYNAMICPROMPTINGTOMOODJOURNALANDTRACKING_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
};

const saveTemporarySlotData = (dispatch: any, val: any) => {
  console.log("saveTemporarySlotData____val", val);
  dispatchData(types.SAVETEMPORARYSLOTDATA, val, dispatch);
};
const saveCurrentSuggestionsScheduleTime = (dispatch: any, val: any) => {
  console.log("saveCurrentSuggestionsScheduleTime____val", val);
  dispatchData(types.SAVECURRENTSUGGESTIONSSCHEDULETIMEDATA, val, dispatch);
};
const RegenerateWellnessDetailsByIdAPI = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.REGENERATE_WELLNESSDETAILSBYID_REQUEST, {}, dispatch);
  const url = apiConstant().RegenerateWellnessDetailsById;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        types.REGENERATE_WELLNESSDETAILSBYID_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.REGENERATE_WELLNESSDETAILSBYID_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
}; //RegenerateWellnessDetailsById

const GetDailyAffirmations = (requestbody: any, functionName: any) => {
  const url = apiConstant().GetDailyAffirmations;
  return ajaxPostWithToken(url, requestbody, functionName)
    .then((resp) => {
      return Promise.resolve(resp);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const getMoodJournaling = (requestbody: any, functionName: any) => {
  const url = apiConstant().MoodJournalAiQuestion;
  return ajaxPostWithToken(url, requestbody, functionName)
    .then((resp) => {
      return Promise.resolve(resp);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export default {
  GetMoodTrackingQuestion,
  GetUserMobileDashboardDetailsByDate,
  SaveMoodTrackingQuestion,
  GetMoodTrackingDetails,
  GenerateOnboardingDetails,
  GetMoodJournalingQuestion,
  SaveMoodJournalingQuestion,
  GetMoodJournalingDetails,
  GetWellnessOverview,
  GetMobileDashboardPrompts,
  GetGoalsGraphDataByDate,
  GetActivitiesGraphDataByDate,
  GetUserMissingProfileDataPointQuestions,
  SaveUserMissingProfileDataPointAnswers,
  GetUserIndividualGoalsList,
  GetUserMobileDashboardQuotesByDate,
  GetActivitiesQuestionsByCategoryIdApi,
  DeleteActivityByIdApi,
  GetUserActivityAvailabilityAPI,
  UpdateActivityScheduleTime,
  GetEditableActivityQuestionsByIdAPI,
  EditActivityDetailsByIdApi,
  GetReplaceCategoryQuestionsByNameAPi,
  ReplaceActivityDetailsByIdAPI,
  GetEditableGoalQuestionsByIdAPI,
  EditGoalDetailsByIdAPI,
  ReplaceGoalDetailsByIdAPI,
  DeleteGoalByIdAPI,
  AIDynamicPromptingToMoodJournalAndTracking,
  saveTemporarySlotData,
  RegenerateWellnessDetailsByIdAPI,
  GetUserScheduledActivitiesList,
  GetDailyAffirmations,
  getMoodJournaling,
  saveCurrentSuggestionsScheduleTime,
};
