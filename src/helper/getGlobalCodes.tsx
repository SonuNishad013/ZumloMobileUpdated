import { showToast } from "../redux/actions/toastActions";

const dispatchData = (type: any, payload: any, dispatch: any) => {
  dispatch({
    type: type,
    payload: payload,
  });
};
export const getAllGlobalCodesWithCategory = async (
  allActions: any,
  dispatch: any
) => {
  let requestbody_ = {};
  let GlobalData = await allActions.globalCode
    .getAllGlobalCodesWithCategory(
      dispatch,
      requestbody_,
      "getAllGlobalCodesWithCategory"
    )
    .then((response: any) => {
      if (response.statusCode == 200) {
        dispatch(showToast("Success", " successfully"));
        return response.data;
      } else {
      }
    })
    .catch((err: any) => {});
  return GlobalData;
};

export const getAllGlobalCodesWithCategory2 = async (
  allActions: any,
  dispatch: any
) => {
  let requestbody_ = {};
  let GlobalData = await allActions?.globalCode
    .getAllGlobalCodesWithCategory2(
      dispatch,
      requestbody_,
      "getAllGlobalCodesWithCategory"
    )
    .then((response: any) => {
      if (response.statusCode == 200) {
        dispatch(showToast("Success", " successfully"));
        return response.data;
      } else {
      }
    })
    .catch((err: any) => {});
  return GlobalData;
};

export const filterCategoryData = async (data_: any, key: any) => {
  let data = data_.filter((item: any, index: any) => item.categoryName == key);
  return data;
};
export const filterglobalCodeOptionsData = async (data_: any, key: any) => {
  let data = data_.filter((item: any, index: any) => item.codeName == key);
  return data;
};
export const filterglobalCodeOptionsDataId = async (data_: any, key: any) => {
  let data = data_.filter((item: any, index: any) => item.globalCodeId == key);
  return data;
};
export const getGlobalCodeOptionsId = async (
  data_: any[],
  categoryName: any,
  codeName: any
) => {
  let dataByCategoryName = data_?.filter(
    (item: any, index: any) =>
      item.categoryName.toLowerCase() == categoryName.toLowerCase()
  );
  let dataByCodeName = dataByCategoryName[0]?.globalCodeOptions.filter(
    (item: any, index: any) =>
      item.codeName.toLowerCase() == codeName.toLowerCase()
  );
  return dataByCodeName[0];
};
