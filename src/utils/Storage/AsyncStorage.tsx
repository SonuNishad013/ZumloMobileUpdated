import RNSecureKeyStore, { ACCESSIBLE } from "react-native-secure-key-store";

export const KEY_TOKEN = "token";
export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const LOGIN_USER_DATA = "LOGIN_USER_DATA";
export const ISPLANNER_USER = "ISPLANNER_USER";
export const ACCESS_TOKEN2 = "ACCESS_TOKEN2";
export const DUMMY = "dummy";
export const USERINFO = "userInfo";
export const MPIN_TOKEN = "mPINDeviceToken";
export const MPIN_SET = "MPINSET";
export const BIOMETRIC_SET = "BIOMETRICSET";
export const USERDATA = "USERDATA";
export const MPIN_USERDATA = "MPINUSERDATA";
export const SOURCE_ID = "SOURCEID";
export const BIOMETRICTYPE = "BIOMETRICTYPE";
export const GET_STARTED_SCREEN = "GET_STARTED_SCREEN";
export const GET_INVEST_EASY_MSG = "GET_INVEST_EASY_MSG";
export const GET_EASY_LINK_MSG = "GET_EASY_LINK_MSG";
export const GLOBALCODEWITHCATEGORY = "GLOBALCODEWITHCATEGORY";
export const LOGIN_TYPE = "LOGIN_TYPE";
export const SEEKERS_PROFILE_DATA = "SEEKERS_PROFILE_DATA";
export const IS_WELLNESSPLAN_SELECTED = "IS_WELLNESSPLAN_SELECTED";
export const PRODUCT_TOUR_COMPLETED = "PRODUCT_TOUR_COMPLETED";
export const PRIVACY_POLICY_IS_ENABLED = "PRIVACY_POLICY_IS_ENABLED";
export const FCM_TOKEN = "FCM_TOKEN";
export const SEEKER_COMMUNITY_PROFLE = "SEEKER_COMMUNITY_PROFLE";
export const COUNTRY_CODE = "COUNTRY_CODE";
export const ONBOARDING_QUESTIONS_RESPONSE = "ONBOARDING_QUESTIONS_RESPONSE";
export const WELLNESS_PLAN_ID_AND_REGENERATE_ID =
  "WELLNESS_PLAN_ID_AND_REGENERATE_ID";

const TAG = "AsyncStorage";

const storeItemKey = async (key: any, value: any) => {
  try {
    await RNSecureKeyStore.set(key, value, {
      accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY,
    });
  } catch (e) {
    console.log(TAG, JSON.stringify(e));
  }
};

const getItem = async (key: any) => {
  try {
    const value = await RNSecureKeyStore.get(key);
    if (value != null) {
      return value;
    }
  } catch (e) {
    console.log(TAG, JSON.stringify(e));
  }
  return null;
};

const removeItem = async (key: any) => {
  try {
    await RNSecureKeyStore.remove(key);
  } catch (e) {
    console.log(TAG, JSON.stringify(e));
  }
};

/**
 * @function clearAll
 * @description method to clear local storage of application
 */
const clearAll = async () => {
  // console.log('clear all user id', global.userID);
  try {
    // await AsyncStorage.clear();
  } catch (e) {
    console.log(TAG, JSON.stringify(e));
  }
};

export { getItem, storeItemKey, removeItem, clearAll };
