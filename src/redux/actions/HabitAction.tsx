import {
  ajaxDelete,
  ajaxGet,
  ajaxPostWithToken,
} from "../../config/apiService";
import apiConstant from "../../constant/apiConstant";

const getHabitsDetailsAPI = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  modifiedUrl?: boolean
) => {
  const url_1 =
    apiConstant().GetHabitsDetails +
    `?TargetDate=${requestbody?.TargetDate}&PageNumber=${requestbody?.PageNumber}&PageSize=${requestbody?.PageSize}&Frequency=${requestbody?.Frequency}`;
  const url_2 =
    apiConstant().GetHabitsDetails +
    `?&PageNumber=${requestbody?.PageNumber}&PageSize=${requestbody?.PageSize}`;
  const url = modifiedUrl ? url_2 : url_1;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      return Promise.resolve(resp);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const saveHabitTrackingAPI = (requestbody: any, functionName: any) => {
  const url = apiConstant().SaveHabitTracking;
  return ajaxPostWithToken(url, requestbody, functionName)
    .then((resp) => {
      return Promise.resolve(resp);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
const createHabitAPI = (requestbody: any, functionName: any) => {
  const url = apiConstant().CreateHabit;
  return ajaxPostWithToken(url, requestbody, functionName)
    .then((resp) => {
      return Promise.resolve(resp);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
//GetHabitCategories
const getHabitCategoriesAPI = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  const url = apiConstant().GetHabitCategories;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      return Promise.resolve(resp);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
const getHabitProgressByIdAPI = (requestbody: any, functionName: any) => {
  const url = apiConstant().GetHabitById + `/${requestbody?.habitId}`;
  return ajaxGet(url, requestbody, functionName, "")
    .then((resp) => {
      return Promise.resolve(resp);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
const getHabitTrackingForGraphAPI = (requestbody: any, functionName: any) => {
  const url =
    apiConstant().GetHabitTrackingForGraph +
    `?startDate=${requestbody?.startDate}&endDate=${requestbody?.endDate}`;
  return ajaxGet(url, requestbody, functionName, "")
    .then((resp) => {
      return Promise.resolve(resp);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
const getHabitProgressAPI = (requestbody: any, functionName: any) => {
  const url = apiConstant().GetHabitProgress + `/${requestbody?.habitId}`;
  return ajaxGet(url, requestbody, functionName, "")
    .then((resp) => {
      return Promise.resolve(resp);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
const deleteHabitAPI = (requestbody: any, functionName: any) => {
  const url = apiConstant().DeleteHabit + `/${requestbody?.habitId}`;
  return ajaxDelete(url, requestbody, functionName, "")
    .then((resp) => {
      return Promise.resolve(resp);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
export default {
  getHabitsDetailsAPI,
  saveHabitTrackingAPI,
  createHabitAPI,
  getHabitCategoriesAPI,
  getHabitTrackingForGraphAPI,
  getHabitProgressAPI,
  deleteHabitAPI,
  getHabitProgressByIdAPI,
};
