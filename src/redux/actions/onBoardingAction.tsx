import types from "../types/loginTypes";
import onTypes from "../types/onBoardingTypes";
import * as AsyncStorageUtils from "../../utils/Storage/AsyncStorage";
import {
  ajaxGet,
  ajaxPost,
  ajaxPostWithToken,
  ajaxPut,
} from "../../config/apiService";
import apiConstant from "../../constant/apiConstant";
import { event } from "../../navigation/emitter";
import { showToast } from "./toastActions";
import logger from "../../constant/logger";
// import apiUrl from "../../constant/apiUrl";

const dispatchData = (type: any, payload: any, dispatch: any) => {
  dispatch({
    type: type,
    payload: payload,
  });
};
const onBoarding = (dispatch: any, requestbody: any, functionName: any) => {
  dispatchData(types.POST_SIGN_OUT_REQUEST, {}, dispatch);
  const url = apiConstant().SignOut;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      AsyncStorageUtils.removeItem(AsyncStorageUtils.ACCESS_TOKEN);
      event.emit("login");

      dispatchData(types.POST_SIGN_OUT_SUCCESS, resp, dispatch);
      dispatch(showToast("Success", "Signed out successfully"));
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_SIGN_OUT_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
const GetConsentForm = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  params: any
) => {
  dispatchData(onTypes.GET_CONSENT_FORM_REQUEST, {}, dispatch);
  // https://b1ed-38-183-45-201.ngrok-free.app/api/OnboardingFlow/GetConsentForm?targetRoleId=10
  const url = apiConstant().GetConsentForm + "?" + `${params}`;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(onTypes.GET_CONSENT_FORM_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(onTypes.GET_CONSENT_FORM_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
const OnboardingSteps = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(onTypes.GET_ON_BOARDING_STEPS_REQUEST, {}, dispatch);
  const url = apiConstant().OnboardingSteps;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(onTypes.GET_ON_BOARDING_STEPS_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(onTypes.GET_ON_BOARDING_STEPS_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
const AspirationsList = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(onTypes.GET_ASPIRATIONS_REQUEST, {}, dispatch);
  const url = apiConstant().Aspirations;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(onTypes.GET_ASPIRATIONS_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(onTypes.GET_ASPIRATIONS_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
const AreaOfInterests = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(onTypes.GET_AREA_OF_INTERSETS_REQUEST, {}, dispatch);
  const url = apiConstant().AreaOfInterests;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(onTypes.GET_AREA_OF_INTERSETS_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(onTypes.GET_AREA_OF_INTERSETS_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
const GetWellnessPlan = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(onTypes.GET_WELLNESS_PLAN_REQUEST, {}, dispatch);
  const url = apiConstant().WellnessPlan;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(onTypes.GET_WELLNESS_PLAN_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(onTypes.GET_WELLNESS_PLAN_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const GetOnboardingSteps = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  categoryId?: any
) => {
  dispatchData(onTypes.GET_ON_BOARDING_STEPS_REQUEST, {}, dispatch);
  const url = apiConstant().GetOnboardingSteps + "?categoryId=" + categoryId;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(onTypes.GET_ON_BOARDING_STEPS_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(onTypes.GET_ON_BOARDING_STEPS_FAILURE, err, dispatch);
      return Promise.reject(err.response);
    });
};

const GetRegenereateWellnessPlanSteps = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  id: any
) => {
  dispatchData(
    onTypes.GET_GETREGENEREATEWELLNESSPLANSTEPS_REQUEST,
    {},
    dispatch
  );
  const url = apiConstant().GetRegenereateWellnessPlanSteps + id;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        onTypes.GET_GETREGENEREATEWELLNESSPLANSTEPS_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        onTypes.GET_GETREGENEREATEWELLNESSPLANSTEPS_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
};
const ReGenerateSeekerWellnessPlan = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(
    onTypes.GET_GETREGENEREATEWELLNESSPLANSTEPS_REQUEST,
    {},
    dispatch
  );
  const url = apiConstant().RegenerateOnboardingDetails;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        onTypes.GET_GETREGENEREATEWELLNESSPLANSTEPS_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        onTypes.GET_GETREGENEREATEWELLNESSPLANSTEPS_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
};

const CreateWellnessPlanDetails = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(onTypes.POST_CREATEWELLNESSPLANDETAILS_REQUEST, {}, dispatch);
  const url = apiConstant().CreateWellnessPlanDetails;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        onTypes.POST_CREATEWELLNESSPLANDETAILS_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        onTypes.POST_CREATEWELLNESSPLANDETAILS_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
};
const GetConsentFormByType = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  params: any
) => {
  dispatchData(onTypes.POST_GETCONSENTFORMBYTYPE_REQUEST, {}, dispatch);
  const url = apiConstant().GetConsentFormByType + params;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(onTypes.POST_GETCONSENTFORMBYTYPE_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(onTypes.POST_GETCONSENTFORMBYTYPE_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
const GenerateOnboardingDetails = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(onTypes.POST_GENERATEONBOARDINGDETAILS_REQUEST, {}, dispatch);
  const url = apiConstant().GenerateOnboardingDetails;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        onTypes.POST_GENERATEONBOARDINGDETAILS_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        onTypes.POST_GENERATEONBOARDINGDETAILS_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
};

const GetRegenerateOnboardingDetails = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  categoryId?: any
) => {
  dispatchData(onTypes.GET_REGENERATE_ONBOARDINGDETAILS_REQUEST, {}, dispatch);
  const url = apiConstant().GetRegenerateOnboardingDetails + `/${categoryId}`;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        onTypes.GET_REGENERATE_ONBOARDINGDETAILS_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        onTypes.GET_REGENERATE_ONBOARDINGDETAILS_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err.response);
    });
};

const RegenerateOnboardingDetails = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(onTypes.GET_REGENERATE_ONBOARDINGDETAILS_REQUEST, {}, dispatch);
  const url = apiConstant().RegenerateOnboardingDetails;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        onTypes.GET_REGENERATE_ONBOARDINGDETAILS_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        onTypes.GET_REGENERATE_ONBOARDINGDETAILS_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err.response);
    });
};

const CreateGoalsFromAI = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(onTypes.POST_CREATE_GOALS_REQUEST, {}, dispatch);
  const url = apiConstant().CreateGoalsFromAI;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(onTypes.POST_CREATE_GOALS_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(onTypes.POST_CREATE_GOALS_FAILURE, err, dispatch);
      return Promise.reject(err.response);
    });
};

const CreateActivitiesFromAI = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(onTypes.POST_CREATE_ACTIVITIES_REQUEST, {}, dispatch);
  const url = apiConstant().CreateActivitiesFromAI;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(onTypes.POST_CREATE_ACTIVITIES_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(onTypes.POST_CREATE_ACTIVITIES_FAILURE, err, dispatch);
      return Promise.reject(err.response);
    });
};

const CreateRecommendationsFromAI = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(onTypes.POST_CREATE_RECOMMENDATIONS_REQUEST, {}, dispatch);
  const url = apiConstant().CreateRecommendationsFromAI;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(onTypes.POST_CREATE_RECOMMENDATIONS_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(onTypes.POST_CREATE_RECOMMENDATIONS_FAILURE, err, dispatch);
      return Promise.reject(err.response);
    });
};

const SaveSeekerPlannerExplorerId = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  const url = apiConstant().SaveSeekerPlannerExplorerId;
  return ajaxPostWithToken(url, requestbody, functionName)
    .then((resp) => {
      return Promise.resolve(resp);
    })
    .catch((err) => {
      return Promise.reject(err.response);
    });
};
const SaveQuizFromAI = (dispatch: any, requestbody: any, functionName: any) => {
  dispatchData(onTypes.POST_SAVEQUIZFROMAI_REQUEST, {}, dispatch);
  const url = apiConstant().SaveQuizFromAI;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(onTypes.POST_SAVEQUIZFROMAI_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(onTypes.POST_SAVEQUIZFROMAI_FAILURE, err, dispatch);
      return Promise.reject(err.response);
    });
};
const GetResourceLibraryTemplate = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.GET_RESOURCELIBRARY_TEMPLATE_REQUEST, {}, dispatch);
  const url =
    apiConstant().GetResourceLibraryTemplate + `?orgId=${requestbody}`;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_RESOURCELIBRARY_TEMPLATE_REQUEST, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_RESOURCELIBRARY_TEMPLATE_REQUEST, err, dispatch);
      return Promise.reject(err);
    });
};

const GetActivitiesTemplates = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.GET_ACTIVITIES_TEMPLATES_REQUEST, {}, dispatch);
  const url = apiConstant().GetActivitiesTemplates + `?orgId=${requestbody}`;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_ACTIVITIES_TEMPLATES_REQUEST, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_ACTIVITIES_TEMPLATES_REQUEST, err, dispatch);
      return Promise.reject(err);
    });
};

///api/v1/Templates/SaveUserActivitiesFromTemplate
const SaveUserActivitiesFromTemplate = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(
    onTypes.SAVE_USER_ACTIVITIES_FROM_TEMPLATE_REQUEST,
    {},
    dispatch
  );
  const url = apiConstant().SaveUserActivitiesFromTemplate;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        onTypes.SAVE_USER_ACTIVITIES_FROM_TEMPLATE_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        onTypes.SAVE_USER_ACTIVITIES_FROM_TEMPLATE_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err.response);
    });
};
//new code
const GetActivitiesFeedbackSteps = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(onTypes.GET_ACTIVITIES_FEEDBACKSTEPS_REQUEST, {}, dispatch);
  const url = apiConstant().GetActivitiesFeedbackSteps;
  return (
    ajaxGet(url, requestbody, functionName, dispatch)
      //  return ajaxGet(url, requestbody, functionName, dispatch)
      .then((resp) => {
        dispatchData(
          onTypes.GET_ACTIVITIES_FEEDBACKSTEPS_SUCCESS,
          resp,
          dispatch
        );
        return Promise.resolve(resp);
      })
      .catch((err) => {
        console.log("GetActivitiesFeedbackSteps==->errorrrrrrr");
        dispatchData(
          onTypes.GET_ACTIVITIES_FEEDBACKSTEPS_FAILURE,
          err,
          dispatch
        );
        return Promise.reject(err);
      })
  );
};

const SaveActivitiesFeedbackStepAnswer = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(
    onTypes.POST_SAVEACTIVITESFEEDBACKSTEPS_ANSWER_REQUEST,
    {},
    dispatch
  );
  const url = apiConstant().SaveActivitiesFeedbackStepAnswer;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        onTypes.POST_SAVEACTIVITESFEEDBACKSTEPS_ANSWER_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        onTypes.POST_SAVEACTIVITESFEEDBACKSTEPS_ANSWER_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err.response);
    });
};
const GetActivityDetailsById = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  activityID: any
) => {
  dispatchData(onTypes.GET_GETACTIVITYDETAILSBYID_REQUEST, {}, dispatch);
  const url =
    apiConstant().GetActivityDetailsById + "?activityId=" + `${activityID}`;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(onTypes.GET_GETACTIVITYDETAILSBYID_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(onTypes.GET_GETACTIVITYDETAILSBYID_FAILURE, err, dispatch);
      return Promise.reject(err.response);
    });
};
const GetActivityDetailsByIdAndDate = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  activityID: any
) => {
  dispatchData(onTypes.GET_GETACTIVITYDETAILSBYIDANDDATE_REQUEST, {}, dispatch);
  const url = apiConstant().GetActivityDetailsByIdAndDate + "?" + activityID;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        onTypes.GET_GETACTIVITYDETAILSBYIDANDDATE_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        onTypes.GET_GETACTIVITYDETAILSBYIDANDDATE_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err.response);
    });
};

const GetActivityRecommedationDetailsById = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  activityID: any
) => {
  dispatchData(
    onTypes.GET_GETACTIVITYRECOMMEDATIONDETAILSBYID_REQUEST,
    {},
    dispatch
  );
  const url =
    apiConstant().GetActivityRecommedationDetailsById + `${activityID}`;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        onTypes.GET_GETACTIVITYRECOMMEDATIONDETAILSBYID_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        onTypes.GET_GETACTIVITYRECOMMEDATIONDETAILSBYID_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err.response);
    });
};
const SaveSelectedRecommendation = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(onTypes.GET_SAVESELECTEDRECOMMENDATION_REQUEST, {}, dispatch);
  const url = apiConstant().SaveSelectedRecommendation;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        onTypes.GET_SAVESELECTEDRECOMMENDATION_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        onTypes.GET_SAVESELECTEDRECOMMENDATION_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err.response);
    });
};
const GetActivityRecentHistoryByDateAndId = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  params: any
) => {
  dispatchData(
    onTypes.GET_GETACTIVITYRECENTHISTORYBYDATEANDID_REQUEST,
    {},
    dispatch
  );
  const url = apiConstant().GetActivityRecentHistoryByDateAndId + params;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        onTypes.GET_GETACTIVITYRECENTHISTORYBYDATEANDID_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        onTypes.GET_GETACTIVITYRECENTHISTORYBYDATEANDID_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err.response);
    });
};
const SaveActivityHistoryDetail = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(onTypes.GET_SAVEACTIVITYHISTORYDETAILD_REQUEST, {}, dispatch);
  const url = apiConstant().SaveActivityHistoryDetail;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        onTypes.GET_SAVEACTIVITYHISTORYDETAILD_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        onTypes.GET_SAVEACTIVITYHISTORYDETAILD_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err.response);
    });
};
const GetUserPlannerOnboardingResponse = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(
    onTypes.GET_GETUSERPLANNERONBOARDINGRESPONSE_REQUEST,
    {},
    dispatch
  );
  const url = apiConstant().GetUserPlannerOnboardingResponse;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        onTypes.GET_GETUSERPLANNERONBOARDINGRESPONSE_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        onTypes.GET_GETUSERPLANNERONBOARDINGRESPONSE_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err.response);
    });
};
const SaveOnboardingExplorerSteps = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(onTypes.GET_SAVEONBOARDINGEXPLORERSTEPS_REQUEST, {}, dispatch);
  const url = apiConstant().SaveOnboardingExplorerSteps;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        onTypes.GET_SAVEONBOARDINGEXPLORERSTEPS_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        onTypes.GET_SAVEONBOARDINGEXPLORERSTEPS_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err.response);
    });
};
const DeleteSelectedActivitiesFromAIResponse = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(
    onTypes.POST_DELETESELECTEDACTIVITIESFROMAIRESPONSE_REQUEST,
    {},
    dispatch
  );
  const url = apiConstant().DeleteSelectedActivitiesFromAIResponse;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        onTypes.POST_DELETESELECTEDACTIVITIESFROMAIRESPONSE_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        onTypes.POST_DELETESELECTEDACTIVITIESFROMAIRESPONSE_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err.response);
    });
};
const DeleteSelectedGoalsFromAIResponse = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(onTypes.DELETESELECTEDGOALSFROMAIRESPONSE_REQUEST, {}, dispatch);
  const url = apiConstant().DeleteSelectedGoalsFromAIResponse;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        onTypes.DELETESELECTEDGOALSFROMAIRESPONSE_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        onTypes.DELETESELECTEDGOALSFROMAIRESPONSE_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err.response);
    });
};
const RegenerateSelectedActivitiesDetails = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(
    onTypes.POST_REGENERATESELECTEDACTIVITIESDETAILS_REQUEST,
    {},
    dispatch
  );
  const url = apiConstant().RegenerateSelectedActivitiesDetails;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        onTypes.POST_REGENERATESELECTEDACTIVITIESDETAILS_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        onTypes.POST_REGENERATESELECTEDACTIVITIESDETAILS_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err.response);
    });
};
const RegenerateSelectedGoalDetails = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(onTypes.REGENERATESELECTEDGOALDETAILS_REQUEST, {}, dispatch);
  const url = apiConstant().RegenerateSelectedGoalDetails;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        onTypes.REGENERATESELECTEDGOALDETAILS_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        onTypes.REGENERATESELECTEDGOALDETAILS_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err.response);
    });
};

const LikeOrDislikeRecommendationAPI = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(onTypes.LIKEORDISLIKERECOMMENDATION_REQUEST, {}, dispatch);
  const url = apiConstant().LikeOrDislikeRecommendation;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(onTypes.LIKEORDISLIKERECOMMENDATION_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(onTypes.LIKEORDISLIKERECOMMENDATION_FAILURE, err, dispatch);
      return Promise.reject(err.response);
    });
};

const GetAllGlobalCodesWithCategory1_API = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(onTypes.GETALLGLOBALCODESWITHCATEGORY1_REQUEST, {}, dispatch);
  const url = apiConstant().GetAllGlobalCodesWithCategory1;
  return ajaxGet(url, requestbody, functionName, dispatch) //apiConstant().GetAllGlobalCodesWithCategory1
    .then((resp) => {
      dispatchData(
        onTypes.GETALLGLOBALCODESWITHCATEGORY1_SUCCESS,
        resp,
        dispatch
      );
      logger("GetAllGlobalCodesWithCategory1_API", resp);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        onTypes.GETALLGLOBALCODESWITHCATEGORY1_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
};

const PredefinedActivitiesToUser = (requestbody: any, functionName: any) => {
  const url = apiConstant().PredefinedActivitiesToUser;
  return ajaxPostWithToken(url, requestbody, functionName)
    .then((resp) => {
      return Promise.resolve(resp);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export default {
  onBoarding,
  GetConsentForm,
  OnboardingSteps,
  AspirationsList,
  AreaOfInterests,
  GetWellnessPlan,
  GetOnboardingSteps,
  GetRegenereateWellnessPlanSteps,
  ReGenerateSeekerWellnessPlan,
  CreateWellnessPlanDetails,
  GetConsentFormByType,
  GenerateOnboardingDetails,
  GetRegenerateOnboardingDetails,
  RegenerateOnboardingDetails,
  CreateGoalsFromAI,
  CreateActivitiesFromAI,
  CreateRecommendationsFromAI,
  SaveSeekerPlannerExplorerId,
  SaveQuizFromAI,
  GetResourceLibraryTemplate,
  GetActivitiesTemplates,
  SaveUserActivitiesFromTemplate,
  GetActivitiesFeedbackSteps,
  SaveActivitiesFeedbackStepAnswer,
  GetActivityDetailsById,
  GetActivityRecommedationDetailsById,
  SaveSelectedRecommendation,
  GetActivityRecentHistoryByDateAndId,
  SaveActivityHistoryDetail,
  GetUserPlannerOnboardingResponse,
  GetActivityDetailsByIdAndDate,
  SaveOnboardingExplorerSteps,
  DeleteSelectedActivitiesFromAIResponse,
  RegenerateSelectedActivitiesDetails,
  LikeOrDislikeRecommendationAPI,
  RegenerateSelectedGoalDetails,
  DeleteSelectedGoalsFromAIResponse,
  GetAllGlobalCodesWithCategory1_API,
  PredefinedActivitiesToUser,
};
