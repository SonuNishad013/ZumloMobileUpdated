import wellnessProgressType from "../types/wellnessProgressType";
import { ajaxGet, ajaxPostWithToken } from "../../config/apiService";
import apiConstant from "../../constant/apiConstant";

const dispatchData = (type: any, payload: any, dispatch: any) => {
  dispatch({
    type: type,
    payload: payload,
  });
};
const GetUserWellnessPlanProgress = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  params: any
) => {
  dispatchData(
    wellnessProgressType.GET_GETUSERWELLNESSPLANPROGRESS_REQUEST,
    {},
    dispatch
  );
  const url = apiConstant().GetUserWellnessPlanProgress + "?" + params;

  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        wellnessProgressType.GET_GETUSERWELLNESSPLANPROGRESS_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        wellnessProgressType.GET_GETUSERWELLNESSPLANPROGRESS_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
};
const GetUserGoalProgressById = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  params: any
) => {
  dispatchData(
    wellnessProgressType.GET_GETUSERGOALPROGRESSBYID_REQUEST,
    {},
    dispatch
  );
  const url = apiConstant().GetUserGoalProgressById + "?" + params;

  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        wellnessProgressType.GET_GETUSERGOALPROGRESSBYID_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        wellnessProgressType.GET_GETUSERGOALPROGRESSBYID_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
};
const GetUserGoalProgress = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  params: any
) => {
  dispatchData(
    wellnessProgressType.GET_GETUSERGOALPROGRESS_REQUEST,
    {},
    dispatch
  );
  const url = apiConstant().GetUserGoalProgress + "?" + params;

  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        wellnessProgressType.GET_GETUSERGOALPROGRESS_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        wellnessProgressType.GET_GETUSERGOALPROGRESS_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
};
const GetUserActivityProgressById = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  params: any
) => {
  dispatchData(
    wellnessProgressType.GET_GETUSERACTIVITYPROGRESSBYID_REQUEST,
    {},
    dispatch
  );
  const url = apiConstant().GetUserActivityProgressById + "?" + params;

  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        wellnessProgressType.GET_GETUSERACTIVITYPROGRESSBYID_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        wellnessProgressType.GET_GETUSERACTIVITYPROGRESSBYID_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
};

const GetUserActivityProgress = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  params: any
) => {
  dispatchData(
    wellnessProgressType.GET_GETUSERACTIVITYPROGRESS_REQUEST,
    {},
    dispatch
  );
  const url = apiConstant().GetUserActivityProgress + "?" + params;

  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        wellnessProgressType.GET_GETUSERACTIVITYPROGRESS_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        wellnessProgressType.GET_GETUSERACTIVITYPROGRESS_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
};

const GetMoodJournalingGraphDetails = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  params: any
) => {
  const url = apiConstant().GetMoodJournalingGraphDetails + `${params}`;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      return Promise.resolve(resp);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export default {
  GetUserWellnessPlanProgress,
  GetUserGoalProgressById,
  GetUserGoalProgress,
  GetUserActivityProgress,
  GetUserActivityProgressById,
  GetMoodJournalingGraphDetails,
};
