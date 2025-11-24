import DeviceInfo from "react-native-device-info";
import allActions from "../redux/actions";
import { showToast } from "../redux/actions/toastActions";
import * as AsyncStorage from "../utils/Storage/AsyncStorage";
import { Platform } from "react-native";

export const getAllGlobalCodesWithCategory = async (dispatch: any) => {
  let fcmToken = await AsyncStorage?.getItem(AsyncStorage?.FCM_TOKEN);
  console.log("fcmToken is here", JSON?.parse(fcmToken));

  let model = DeviceInfo.getModel();
  let brand = DeviceInfo.getBrand();
  let systemVersion = DeviceInfo.getSystemVersion();
  let version = DeviceInfo?.getVersion();
  let deviceDetails = `${Platform.OS} ${systemVersion} ${brand} ${model} version:${version} `;
  console.log("deviceDetails", deviceDetails);
  let requestbody_ = {
    deviceToken: fcmToken,
    deviceType: 1,
    deviceModel: model,
    operatingSystem: "string",
    osVersion: "string",
    appVersion: "string",
    timeZone: "string",
  };
  let GlobalData = await allActions.seekerDetails
    .CreateUserDeviceInfo(
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
