import types from "../types/getGlobalCode";
import { ajaxGet } from "../../config/apiService";
import apiConstant from "../../constant/apiConstant";

const dispatchData = (type: any, payload: any, dispatch: any) => {
  dispatch({
    type: type,
    payload: payload,
  });
};
const getAllGlobalCodesWithCategory = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.GET_ALLGLOBALCODES_WITHCATEGORY_REQUEST, {}, dispatch);
  const url = apiConstant().GetAllGlobalCodesWithImages;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        types.GET_ALLGLOBALCODES_WITHCATEGORY_REQUEST,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        types.GET_ALLGLOBALCODES_WITHCATEGORY_REQUEST,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
};

const getAllGlobalCodesWithCategory2 = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.GET_ALLGLOBALCODES_WITHCATEGORY_REQUEST, {}, dispatch);
  const url = apiConstant().GetAllGlobalCodesWithCategory;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        types.GET_ALLGLOBALCODES_WITHCATEGORY_REQUEST,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        types.GET_ALLGLOBALCODES_WITHCATEGORY_REQUEST,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
};
export default {
  getAllGlobalCodesWithCategory,
  getAllGlobalCodesWithCategory2,
};
