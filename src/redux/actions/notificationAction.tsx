import {
  ajaxDelete,
  ajaxGet,
  ajaxPostWithToken,
} from "../../config/apiService";
import apiConstant from "../../constant/apiConstant";
import types from "../types/notificationType";

const dispatchData = (type: any, payload: any, dispatch: any) => {
  dispatch({
    type: type,
    payload: payload,
  });
};

//new code
const getAllNotifications = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.GET_ALL_NOTIFICATIONS_REQUEST, {}, dispatch);
  const url =
    apiConstant().GetAllNotifications +
    `?pageIndex=${requestbody?.pageIndex}&pageSize=${requestbody?.pageSize}&deviceType=${requestbody?.deviceType}`;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_ALL_NOTIFICATIONS_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_ALL_NOTIFICATIONS_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
const saveNotification = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.GET_SAVE_NOTIFICATION_REQUEST, {}, dispatch);
  const url = apiConstant().SaveNotification;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_SAVE_NOTIFICATION_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_SAVE_NOTIFICATION_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
const UpdateNotificationStatus = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.GET_UPDATE_NOTIFICATION_STATUS_REQUEST, {}, dispatch);
  const url = apiConstant().UpdateNotificationStatus;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        types.GET_UPDATE_NOTIFICATION_STATUS_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_UPDATE_NOTIFICATION_STATUS_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
//new code
//https://dev-api.zumlo.co/notification-service/api/v1/Notifications/DeleteNotificationById/5136
const DeleteNotificationByIdAPI = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  params: any
) => {
  console.log("activityIdactivityIdparams====>>>", requestbody);
  dispatchData(types.DELETENOTIFICATIONBYID_REQUEST, {}, dispatch);
  const url = apiConstant().DeleteNotificationById + `/${params}`;
  return ajaxDelete(url, null, functionName, dispatch)
    .then((resp: any) => {
      dispatchData(types.DELETENOTIFICATIONBYID_REQUEST, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err: any) => {
      dispatchData(types.DELETENOTIFICATIONBYID_REQUEST, err, dispatch);
      return Promise.reject(err);
    });
};

const communityActivities = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.GET_COMMUNITY_ACTIVITES_REQUEST, {}, dispatch);
  const url = apiConstant().CommunityActivities;

  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_COMMUNITY_ACTIVITES_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_COMMUNITY_ACTIVITES_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

export default {
  getAllNotifications,
  saveNotification,
  UpdateNotificationStatus,
  communityActivities,
  DeleteNotificationByIdAPI,
};
