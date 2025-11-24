import { ajaxGet } from "../../config/apiService";
import apiConstant from "../../constant/apiConstant";
import Alltypes from "../types";

const dispatchData = (type: any, payload: any, dispatch: any) => {
    dispatch({
        type: type,
        payload: payload,
    });
};
const GetGlobalCodesByCategoryName = (
    dispatch: any,
    requestbody: any,
    functionName: any,
    params?: any
) => {
    dispatchData(Alltypes.GlobalCodesCategoryType.GET_GETGLOBALCODESBYCATEGORYNAME_REQUEST, {}, dispatch);
    const url = apiConstant().GetGlobalCodesByCategoryName + "?categoryName=" + `${params}`;
    return ajaxGet(url, requestbody, functionName, dispatch)
        .then((resp) => {
            dispatchData(Alltypes.GlobalCodesCategoryType.GET_GETGLOBALCODESBYCATEGORYNAME_SUCCESS, resp, dispatch);
            return Promise.resolve(resp);
        })
        .catch((err) => {
            dispatchData(Alltypes.GlobalCodesCategoryType.GET_GETGLOBALCODESBYCATEGORYNAME_FAILURE, err, dispatch);
            return Promise.reject(err);
        });
};
export default {
    GetGlobalCodesByCategoryName,
};