import { ajaxGet, ajaxPostWithToken } from "../../config/apiService";
import apiConstant from "../../constant/apiConstant";
import Alltypes from "../types";

const dispatchData = (type: any, payload: any, dispatch: any) => {
  dispatch({
    type: type,
    payload: payload,
  });
};
const getSubscriptionPlans = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  params?: any
) => {
  dispatchData(Alltypes.SubscriptionType.POST_FETCH_PLAN_REQUEST, "", dispatch);
  const url =
    apiConstant().GetSubscriptionPlansForSeeker + "?country=" + `${params}`;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        Alltypes.SubscriptionType.POST_FETCH_PLAN_SUCCESS,
        resp,
        dispatch
      );

      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        Alltypes.SubscriptionType.POST_FETCH_PLAN_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
};

const buySubscriptionPlan = (requestbody: any, functionName: any) => {
  const url = apiConstant().BuySeekerPlan;
  return ajaxPostWithToken(url, requestbody, functionName)
    .then((resp) => {
      return Promise.resolve(resp);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const GetAIChatCountForSubscriptionPlan = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  const url = apiConstant().GetAIChatCountForSubscriptionPlan;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      return Promise.resolve(resp);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const StartFreeTrial = (requestbody: any, functionName: any) => {
  const url = apiConstant().StartFreeTrial;
  return ajaxPostWithToken(url, requestbody, functionName)
    .then((resp) => {
      return Promise.resolve(resp);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export default {
  getSubscriptionPlans,
  buySubscriptionPlan,
  GetAIChatCountForSubscriptionPlan,
  StartFreeTrial,
};
