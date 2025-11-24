import axios from "axios";
import * as AsyncStore from "../utils/Storage/AsyncStorage";
import { event } from "../navigation/emitter";
import _ from "underscore";
import logger from "../constant/logger";

const ajaxPost = async (
  url: any,
  requestParams: any,
  functionName: any,
  endPoint?: any
) => {
  var netowrkStatus: any = true;
  const headers = {
    "Content-Type": "application/json",
    Connection: "keep-alive",
    Accept: "*/*",
    OrgName: "Zumlo",
    AccessKey: "Mobile",
  };

  let request = {
    method: "post",
    url: url,

    headers: headers,
    data: requestParams,
  };

  if (JSON.parse(netowrkStatus)) {
    return axios(request)
      .then(function (response: any) {
        return Promise.resolve(response?.data);
      })
      .catch(function (error: any) {
        ajaxLogger(requestParams, error, endPoint, error?.message);
        return Promise.reject(error);
      });
  } else {
    logger("Internet not connected");
  }
};
//for log
const ajaxLogger = async (
  requestParams?: any,
  response?: any,
  endpoint?: any,
  message?: any
) => {
  var netowrkStatus: any = true;
  const headers = {
    "Content-Type": "application/json",
    Connection: "keep-alive",
    Accept: "*/*",
    OrgName: "Zumlo",
    AccessKey: "Mobile",
  };

  let request = {
    method: "post",
    url: "https://dev-api.zumlo.co/config-service/api/v1/Logger/SaveLog",
    // timeout: NETWORK_TIMEOUT,
    headers: headers,
    data: {
      reqpuest: requestParams,
      response: response,
      endpoint: endpoint,
      message: message,
    },
  };

  if (JSON.parse(netowrkStatus)) {
    return axios(request)
      .then(function (response: any) {
        return Promise.resolve(response?.data);
      })
      .catch(function (error: any) {
        return Promise.reject(error);
      });
  } else {
    logger("Internet not connected");
  }
};
const ajaxPostWithToken = async (
  url: any,
  requestParams: any,
  functionName: any
) => {
  var netowrkStatus: any = true;
  let bearerToken = await AsyncStore.getItem(AsyncStore.ACCESS_TOKEN);
  const headers = {
    "Content-Type": "application/json",
    Connection: "keep-alive",
    Accept: "*/*",
    Authorization: `${"Bearer " + bearerToken}`,
    OrgName: "Zumlo",
    AccessKey: "Mobile",
  };

  let request = {
    method: "post",
    url: url,
    headers: headers,
    data: requestParams,
  };

  if (JSON.parse(netowrkStatus)) {
    return axios(request)
      .then(function (response: any) {
        return Promise.resolve(response?.data);
      })
      .catch(function (error: any) {
        logger("ajaxPostWithToken response", error);

        return Promise.reject(error);
      });
  } else {
    logger("Internet not connected");
  }
};
const ajaxMultipartPostWithToken = async (
  url: any,
  requestParams: any,
  functionName: any,
  passSSLPinning = false
) => {
  let netowrkStatus: any = true;
  let bearerToken = await AsyncStore.getItem(AsyncStore.ACCESS_TOKEN);
  const headers = {
    "Content-Type": "multipart/form-data",
    Connection: "keep-alive",
    Accept: "*/*",
    Authorization: `${"Bearer " + bearerToken}`,
    OrgName: "Zumlo",
    AccessKey: "Mobile",
  };
  let request = {
    method: "post",
    url: url,
    headers: headers,
    data: _.isEmpty(requestParams) ? null : requestParams,
  };

  if (JSON.parse(netowrkStatus)) {
    return axios(request)
      .then(function (response: any) {
        return Promise.resolve(response?.data);
      })
      .catch(function (error: any) {
        logger("ajaxPostWithToken response_obj", { error, request });
        return Promise.reject(error);
      });
  } else {
    logger("Internet not connected");
  }
};
const ajaxMultipartPutWithToken = async (
  url: any,
  requestParams: any,
  functionName: any,
  passSSLPinning = false
) => {
  let netowrkStatus: any = true;
  let bearerToken = await AsyncStore.getItem(AsyncStore.ACCESS_TOKEN);
  const headers = {
    "Content-Type": "multipart/form-data",
    Connection: "keep-alive",
    Accept: "*/*",
    Authorization: `${"Bearer " + bearerToken}`,
    OrgName: "Zumlo",
    AccessKey: "Mobile",
  };
  let request = {
    method: "PUT",
    url: url,
    headers: headers,
    data: _.isEmpty(requestParams) ? null : requestParams,
  };

  if (JSON.parse(netowrkStatus)) {
    return axios(request)
      .then(function (response: any) {
        return Promise.resolve(response?.data);
      })
      .catch(function (error: any) {
        return Promise.reject(error);
      });
  } else {
    logger("Internet not connected");
  }
};

const ajaxGet = async (
  url: any,
  requestParams: any,
  functionName: any,
  dispatch: any
) => {
  let bearerToken = await AsyncStore.getItem(AsyncStore.ACCESS_TOKEN);
  const netowrkStatus: boolean = true; // Presumably this is your network check logic
  const headers = {
    "Content-Type": "application/json",
    Connection: "keep-alive",
    Accept: "*/*",
    Authorization: `Bearer ${bearerToken}`, // Corrected Authorization header
    OrgName: "Zumlo",
    AccessKey: "Mobile",
  };

  let request = {
    method: "get",
    url: url,
    headers: headers,
  };

  if (netowrkStatus) {
    return axios(request)
      .then(function (response: any) {
        if (
          response?.data?.statusCode === 404 &&
          response?.data?.message === "User has been deleted."
        ) {
          event.emit("sessionOut");
        } else {
          return Promise.resolve(response?.data);
        }
      })
      .catch(function (error: any) {
        if (error.response?.status === 401) {
          event.emit("sessionOut");
        }
        logger(
          `Api call, url: ${url} requestParams: ${requestParams} error: ${error}`
        );
        return Promise.reject(error);
      });
  } else {
    logger("Internet not connected");
  }
};

const ajaxPut = async (
  url: any,
  requestParams: any,
  functionName: any,
  dispatch: any
) => {
  let bearerToken = await AsyncStore.getItem(AsyncStore.ACCESS_TOKEN);
  let netowrkStatus: any = true;
  const headers = {
    "Content-Type": "application/json",
    Connection: "keep-alive",
    Accept: "*/*",
    Authorization: `${"bearer " + bearerToken}`,
    OrgName: "Zumlo",
    AccessKey: "Mobile",
  };
  let request = {
    method: "put",
    url: url,
    headers: headers,
    data: requestParams ?? requestParams,
  };
  if (JSON.parse(netowrkStatus)) {
    return axios(request)
      .then(function (response: any) {
        return Promise.resolve(response?.data);
      })
      .catch(function (error: any) {
        return Promise.reject(error);
      });
  } else {
    logger("Internet not connected");
  }
};
const ajaxDelete = async (
  url: any,
  requestParams: any,
  functionName: any,
  dispatch: any
) => {
  let bearerToken = await AsyncStore.getItem(AsyncStore.ACCESS_TOKEN);
  var netowrkStatus: any = true;
  const headers = {
    "Content-Type": "application/json",
    Connection: "keep-alive",
    Accept: "*/*",
    Authorization: `${"bearer " + bearerToken}`,
    OrgName: "Zumlo",
    AccessKey: "Mobile",
  };

  let request = {
    method: "delete",
    url: url,
    headers: headers,
    data: requestParams == null ? "" : requestParams,
  };

  if (JSON.parse(netowrkStatus)) {
    return axios(request)
      .then(function (response: any) {
        return Promise.resolve(response?.data);
      })
      .catch(function (error: any) {
        logger("response ajaxDelete", error, request);
        return Promise.reject(error);
      });
  } else {
    logger("Internet not connected");
  }
};

export {
  ajaxPost,
  ajaxPostWithToken,
  ajaxGet,
  ajaxPut,
  ajaxDelete,
  ajaxMultipartPostWithToken,
  ajaxMultipartPutWithToken,
};
