import types from "../types/seekerDeatls";
import { ajaxGet, ajaxPostWithToken, ajaxPut } from "../../config/apiService";
import apiConstant from "../../constant/apiConstant";
// import apiUrl from "../../constant/apiUrl";SAVE_EXPLORER_PREFERENCES_REQUEST

const dispatchData = (type: any, payload: any, dispatch: any) => {
  dispatch({
    type: type,
    payload: payload,
  });
};

const GetSeekerWellnessPlanDetailsAsync = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(
    types.GET_GETSEEKERWELLNESSPLANDETAILSASYNC_REQUEST,
    {},
    dispatch
  );
  const url = apiConstant().GetSeekerWellnessPlanDetailsAsync;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        types.GET_GETSEEKERWELLNESSPLANDETAILSASYNC_REQUEST,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        types.GET_GETSEEKERWELLNESSPLANDETAILSASYNC_REQUEST,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
};

const GetSeekerPersonalInfo = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  seekerId?: any
) => {
  const url = apiConstant().GetSeekerPersonalInfo;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_SEEKER_PERSONAL_INFO_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const UpdateSeekerPersonalInfo = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.PUT_UPDATE_SEEKER_PERSONALINFO_REQUEST, {}, dispatch);
  const url = apiConstant().UpdateSeekerPersonalInfo;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        types.PUT_UPDATE_SEEKER_PERSONALINFO_REQUEST,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.PUT_UPDATE_SEEKER_PERSONALINFO_REQUEST, err, dispatch);
      return Promise.reject(err);
    });
};
const GetAllFormImages = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.GET_GETALLFROMIMAGES_REQUEST, {}, dispatch);
  const url = apiConstant().GetAllFormImages;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_GETALLFROMIMAGES_REQUEST, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_GETALLFROMIMAGES_REQUEST, err, dispatch);
      return Promise.reject(err);
    });
};

const UploadSeekerProfilePicture = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.POST_UPLOADSEKKER_PROFILE_PICTURE_REQUEST, {}, dispatch);
  const url = apiConstant().UploadSeekerProfilePicture;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        types.POST_UPLOADSEKKER_PROFILE_PICTURE_REQUEST,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        types.POST_UPLOADSEKKER_PROFILE_PICTURE_REQUEST,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
};

const CreateGoalAndAspirations = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.POST_CREATEGOALANDASPIRATIONS_REQUEST, {}, dispatch);
  const url = apiConstant().CreateGoalAndAspirations;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.POST_CREATEGOALANDASPIRATIONS_REQUEST, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_CREATEGOALANDASPIRATIONS_REQUEST, err, dispatch);
      return Promise.reject(err);
    });
};

const AddEmailOrPhoneNumber = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.POST_ADDEMAIL_PHONENUMBER_REQUEST, {}, dispatch);
  const url = apiConstant().AddEmailOrPhoneNumber;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.POST_ADDEMAIL_PHONENUMBER_REQUEST, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_ADDEMAIL_PHONENUMBER_REQUEST, err, dispatch);
      return Promise.reject(err);
    });
};
const VerifySeekerEmailOrPhoneNumberOTP = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(
    types.POST_VERIFYSEEKEREMAILORPHONENUMBER_OTP_REQUEST,
    {},
    dispatch
  );
  const url = apiConstant().VerifySeekerEmailOrPhoneNumberOTP;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        types.POST_VERIFYSEEKEREMAILORPHONENUMBER_OTP_REQUEST,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        types.POST_VERIFYSEEKEREMAILORPHONENUMBER_OTP_REQUEST,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
};

const SeekerOnboardingStepAnswer = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.POST_SEEKER_ONBOARDING_STEPSANSWER_REQUEST, {}, dispatch);
  const url = apiConstant().SeekerOnboardingStepAnswer;
  return ajaxPostWithToken(url, requestbody, functionName)
    .then((resp) => {
      dispatchData(
        types.POST_SEEKER_ONBOARDING_STEPSANSWER_REQUEST,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        types.POST_SEEKER_ONBOARDING_STEPSANSWER_REQUEST,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
}; //GenerateRecommendationItems
const GetConsentFormByType = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  consentFormType: any
) => {
  dispatchData(types.GET_GETCONSENTFORMBYTYPE_REQUEST, {}, dispatch);
  const url = apiConstant().GetConsentFormByType + `${consentFormType}`;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_GETCONSENTFORMBYTYPE_REQUEST, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_GETCONSENTFORMBYTYPE_REQUEST, err, dispatch);
      return Promise.reject(err);
    });
};

const GetUserPreferences = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  globalCodeId: any
) => {
  dispatchData(types.GET_USER_PREFERENCES_REQUEST, {}, dispatch);
  const url =
    apiConstant().GetUserPreferences + `?preferencesCategoryId=${globalCodeId}`;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_USER_PREFERENCES_REQUEST, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_USER_PREFERENCES_REQUEST, err, dispatch);
      return Promise.reject(err);
    });
};

// MEDICAL HISTORY

const GetUserMedicalHistory = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  globalCodeId: any
) => {
  dispatchData(types.GET_USERMEDICAL_HISTORY_REQUEST, {}, dispatch);
  const url =
    apiConstant().GetUserMedicalHistory +
    `?medicalHistoryCategoryId=${globalCodeId}`;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_USERMEDICAL_HISTORY_REQUEST, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_USERMEDICAL_HISTORY_REQUEST, err, dispatch);
      return Promise.reject(err);
    });
};

const GetMedicalHistoryStepsByCodeId = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  data: any
) => {
  dispatchData(types.GET_MEDICALHISTORY_STEPBYCODE_ID_REQUEST, {}, dispatch);
  const url =
    apiConstant().GetMedicalHistoryStepsByCodeId +
    `?codeId=${data?.questionId}&medicalHistoryCategoryId=${data?.globalId}`;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        types.GET_MEDICALHISTORY_STEPBYCODE_ID_REQUEST,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        types.GET_MEDICALHISTORY_STEPBYCODE_ID_REQUEST,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
};

const MedicalHistoryStepAnswer = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.POST_MEDICALHISTORY_STEPANSWER_REQUEST, {}, dispatch);
  const url = apiConstant().MedicalHistoryStepAnswer;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        types.POST_MEDICALHISTORY_STEPANSWER_REQUEST,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_MEDICALHISTORY_STEPANSWER_REQUEST, err, dispatch);
      return Promise.reject(err);
    });
};

// END

const GetPreferenceStepsByCodeId = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  data: any
) => {
  dispatchData(types.GET_PREFERENCES_STEPSBYCODE_ID_REQUEST, {}, dispatch);
  const url =
    apiConstant().GetPreferenceStepsByCodeId +
    `?codeId=${data?.questionId}&preferencesCategoryId=${data?.globalId}`;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        types.GET_PREFERENCES_STEPSBYCODE_ID_REQUEST,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_PREFERENCES_STEPSBYCODE_ID_REQUEST, err, dispatch);
      return Promise.reject(err);
    });
};

const PreferenceStepAnswer = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.POST_PREFERENCE_STEP_ANSWER_REQUEST, {}, dispatch);
  const url = apiConstant().PreferenceStepAnswer;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.POST_PREFERENCE_STEP_ANSWER_REQUEST, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_PREFERENCE_STEP_ANSWER_REQUEST, err, dispatch);
      return Promise.reject(err);
    });
};
const SendContactForm = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.GET_SENDCONTACTFORM_REQUEST, {}, dispatch);
  const url = apiConstant().SendContactForm;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_SENDCONTACTFORM_REQUEST, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_SENDCONTACTFORM_REQUEST, err, dispatch);
      return Promise.reject(err);
    });
};
const ChangePassword = (dispatch: any, requestbody: any, functionName: any) => {
  dispatchData(types.GET_CHANGEPASSWORD_REQUEST, {}, dispatch);
  const url = apiConstant().ChangePassword;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_CHANGEPASSWORD_REQUEST, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_CHANGEPASSWORD_REQUEST, err, dispatch);
      return Promise.reject(err);
    });
};

//new
const SaveExplorerPreferences = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.SAVE_EXPLORER_PREFERENCES_REQUEST, {}, dispatch);
  const url = apiConstant().SaveExplorerPreferences;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.SAVE_EXPLORER_PREFERENCES_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.SAVE_EXPLORER_PREFERENCES_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const UpdateUserSkippedCategory = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.UPDATE_USER_SKIPPED_CATEGORY_REQUEST, {}, dispatch);
  const url = apiConstant().UpdateUserSkippedCategory;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.UPDATE_USER_SKIPPED_CATEGORY_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.UPDATE_USER_SKIPPED_CATEGORY_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
}; //GetUserSkippedCategory

const GetUserSkippedCategory = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.GET_USER_SKIPPED_CATEGORY_REQUEST, {}, dispatch);
  const url = apiConstant().GetUserSkippedCategory;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_USER_SKIPPED_CATEGORY_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_USER_SKIPPED_CATEGORY_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const GetWellnessPlanDetails = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.GET_WELLNESSPLAN_DETAILS_REQUEST, {}, dispatch);
  const url = apiConstant().GetWellnessPlanDetails;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_WELLNESSPLAN_DETAILS_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_WELLNESSPLAN_DETAILS_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const GetUserStepAndOptionsWithAnswers = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(
    types.POST_GETUSERSTEPANDOPTIONSWITHANSWERS_REQUEST,
    {},
    dispatch
  );
  const url = apiConstant().GetUserStepAndOptionsWithAnswers;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        types.POST_GETUSERSTEPANDOPTIONSWITHANSWERS_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        types.POST_GETUSERSTEPANDOPTIONSWITHANSWERS_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
};

const SaveAndUpdateUserAnswers = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.POST_SAVEANDUPDATEUSER_ANSWER_REQUEST, {}, dispatch);
  const url = apiConstant().SaveAndUpdateUserAnswers;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.POST_SAVEANDUPDATEUSER_ANSWER_REQUEST, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_SAVEANDUPDATEUSER_ANSWER_REQUEST, err, dispatch);
      return Promise.reject(err);
    });
};

// https://dev-api.zumlo.co/user-service/api/v1/User/CreateUserDeviceInfo

const CreateUserDeviceInfo = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.GET_CREATE_USERDEVICE_INFO_REQUEST, {}, dispatch);
  const url = apiConstant().CreateUserDeviceInfo;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_CREATE_USERDEVICE_INFO_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_CREATE_USERDEVICE_INFO_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
//https://dev-api.zumlo.co/user-service/api/v1/User/SessionTimeOut
const SessionTimeOutAPI = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.GET_SESSION_TIMEOUT_REQUEST, {}, dispatch);
  const url = apiConstant().SessionTimeOut;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_SESSION_TIMEOUT_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_SESSION_TIMEOUT_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
}; //UpdateActivityScheduledTimeWithGuid
const UpdateActivityScheduledTimeWithGuidAPI = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.UPDATEACTIVITYSCHEDULEDTIMEWITHGUID_REQUEST, {}, dispatch);
  const url = apiConstant().UpdateActivityScheduledTimeWithGuid;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        types.UPDATEACTIVITYSCHEDULEDTIMEWITHGUID_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        types.UPDATEACTIVITYSCHEDULEDTIMEWITHGUID_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
}; //UpdateActivityScheduledTimeWithGuid
const GenerateRecommendationItems = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  const url = apiConstant().GenerateRecommendationItems;
  return ajaxPostWithToken(url, requestbody, functionName)
    .then((resp) => {
      return Promise.resolve(resp);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}; //GenerateRecommendationItems

export default {
  GetSeekerWellnessPlanDetailsAsync,
  GetSeekerPersonalInfo,
  UpdateSeekerPersonalInfo,
  GetAllFormImages,
  UploadSeekerProfilePicture,
  CreateGoalAndAspirations,
  AddEmailOrPhoneNumber,
  VerifySeekerEmailOrPhoneNumberOTP,
  SeekerOnboardingStepAnswer,
  GetConsentFormByType,
  GetUserPreferences,
  GetPreferenceStepsByCodeId,
  PreferenceStepAnswer,
  SendContactForm,
  ChangePassword,
  SaveExplorerPreferences,
  GetUserMedicalHistory,
  GetMedicalHistoryStepsByCodeId,
  MedicalHistoryStepAnswer,
  UpdateUserSkippedCategory,
  GetUserSkippedCategory,
  GetWellnessPlanDetails,
  GetUserStepAndOptionsWithAnswers,
  SaveAndUpdateUserAnswers,
  CreateUserDeviceInfo,
  SessionTimeOutAPI,
  UpdateActivityScheduledTimeWithGuidAPI,
  GenerateRecommendationItems,
};
