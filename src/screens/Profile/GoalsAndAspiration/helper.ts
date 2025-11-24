import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import { STATUS_CODES } from "../../../constant/appConstant";

export const fetchImagesData = async (allActions: any, dispatch: any) => {
  //for all image
  let requestbody = {};
  let imageData = await allActions.seekerDetails
    .GetAllFormImages(dispatch, requestbody, API_FUN_NAMES?.GetAllFormImages)
    .then((response: any) => {
      return response.data;
    })
    .catch((err: any) => {});
  //for global data
  let requestbody_ = {};
  let GlobalData = await allActions.globalCode
    .getAllGlobalCodesWithCategory(
      dispatch,
      requestbody_,
      API_FUN_NAMES?.getAllGlobalCodesWithCategory
    )
    .then((response: any) => {
      if (response.statusCode == STATUS_CODES?.RESPONSE_OK) {
        return response.data;
      } else {
      }
    })
    .catch((err: any) => {});
  let combineData = imageData?.[0]?.categoryOption.concat(GlobalData);

  return combineData;
};
