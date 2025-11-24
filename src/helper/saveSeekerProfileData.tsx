import * as AsyncStorageUtils from "../utils/Storage/AsyncStorage";
import ToastMsg from "../components/Hooks/useToast";
import allActions from "../redux/actions";

export const saveSeekerProfileData = async (dispatch: any) => {
  console.log("im here ===>", dispatch, allActions);
  let requestbody = {};
  let userId = 0;
  let GlobalData = await allActions.seekerDetails
    .GetSeekerPersonalInfo(
      dispatch,
      requestbody,
      "getSeekerPersonalInfo",
      userId
    )
    .then((response: any) => {
      console.log("response for save planner=-?>", response);
      if (response?.statusCode === 200) {
        ToastMsg("success", "Success", response?.message);

        AsyncStorageUtils.storeItemKey(
          AsyncStorageUtils.SEEKERS_PROFILE_DATA,
          JSON.stringify(response?.data)
        );
      }
    })
    .catch((err: any) => {
      console.log("err=-=>", err);
    });
  return GlobalData;
};
