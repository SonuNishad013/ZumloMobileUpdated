import types from "../types/addDeviceType";
import { ajaxGet, ajaxPostWithToken } from "../../config/apiService";
import apiConstant from "../../constant/apiConstant";

const dispatchData = (type: any, payload: any, dispatch: any) => {
  dispatch({
    type: type,
    payload: payload,
  });
};
const addDevice = (dispatch: any, requestbody: any, functionName: any) => {
  dispatchData(types.POST_CREATEDEVICE_REQUEST, {}, dispatch);
  const url = apiConstant().CreateDevice;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.POST_CREATEDEVICE_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_CREATEDEVICE_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const createVitalsManually = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.POST_CREATE_VITAL_SMANUALLY_REQUEST, {}, dispatch);
  const url = apiConstant().CreateVitalsManually;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.POST_CREATE_VITAL_SMANUALLY_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_CREATE_VITAL_SMANUALLY_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
const CreateHealthData = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.POST_CREATEHEALTHDATA_REQUEST, {}, dispatch);
  const url = apiConstant().CreateHealthData;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.POST_CREATEHEALTHDATA_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      console.log("error for save health data", err);

      dispatchData(types.POST_CREATEHEALTHDATA_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const getVitalsActivityStatus = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  seekerId: any
) => {
  dispatchData(types.GET_VITALS_ACTIVITY_STATUS_REQUEST, {}, dispatch);
  const url = apiConstant().GetVitalsActivityStatus + `${seekerId}`;

  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_VITALS_ACTIVITY_STATUS_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_VITALS_ACTIVITY_STATUS_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
const GetVitalsActivityStatusSummary = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.POST_GETVITALSACTIVITYSTATUSSUMMARY_REQUEST, {}, dispatch);
  const url = apiConstant().GetVitalsActivityStatusSummary;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        types.POST_GETVITALSACTIVITYSTATUSSUMMARY_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        types.POST_GETVITALSACTIVITYSTATUSSUMMARY_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
};

const getVitalSummary = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.GET_VITAL_SUMMARY_REQUEST, {}, dispatch);
  const url = apiConstant().GetVitalsSummary;

  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_VITAL_SUMMARY_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_VITAL_SUMMARY_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
export default {
  addDevice,
  CreateHealthData,
  createVitalsManually,
  GetVitalsActivityStatusSummary,
  getVitalsActivityStatus,
  getVitalSummary,
};
