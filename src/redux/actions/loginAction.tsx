import types from "../types/loginTypes";
import * as AsyncStorageUtils from "../../utils/Storage/AsyncStorage";
import {
  ajaxDelete,
  ajaxGet,
  ajaxPost,
  ajaxPostWithToken,
} from "../../config/apiService";
import apiConstant from "../../constant/apiConstant";
import { event } from "../../navigation/emitter";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import loginTypes from "../types/loginTypes";
import appConstant from "../../constant/appConstant";
import { saveSeekerProfileData } from "../../helper/saveSeekerProfileData";
import DeviceInfo from "react-native-device-info";
import { Platform } from "react-native";
import { CreateUserDevice_API } from "../../helper/commonApi";

// import apiUrl from "../../constant/apiUrl";

const dispatchData = (type: any, payload: any, dispatch: any) => {
  dispatch({
    type: type,
    payload: payload,
  });
};
const SignUpWithEmailAndPhone = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  params?: any
) => {
  dispatchData(types.POST_SELF_SIGNUP_REQUEST, {}, dispatch);
  const url = apiConstant().SignUpWithEmailOrPhone + params;
  return ajaxPost(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.POST_SELF_SIGNUP_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_SELF_SIGNUP_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
const SignUpOTPVerify = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  param?: any
) => {
  dispatchData(types.POST_OTP_VERIFY_REQUEST, {}, dispatch);
  const url = apiConstant().VerifyEmailAndPhoneSignUpOtp + param;
  return ajaxPost(url, requestbody, functionName, dispatch)
    .then((resp) => {
      console.log("resp?.data", resp?.data);
      if (resp?.data !== null) {
        AsyncStorageUtils.storeItemKey(
          AsyncStorageUtils.ACCESS_TOKEN,
          resp?.data?.token
        );
        AsyncStorageUtils.storeItemKey(
          AsyncStorageUtils.LOGIN_USER_DATA,
          JSON.stringify(resp?.data)
        );
      }
      dispatchData(types.POST_OTP_VERIFY_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_OTP_VERIFY_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
const SelfSignUpAPI = (dispatch: any, requestbody: any, functionName: any) => {
  dispatchData(types.POST_SELF_SIGNUP_REQUEST, {}, dispatch);
  const url = apiConstant().Register;
  return ajaxPost(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.POST_SELF_SIGNUP_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_SELF_SIGNUP_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
const seekerData = async (dispatch: any) => {
  await saveSeekerProfileData(dispatch);
};
interface loginProps {
  deviceToken: string;
  deviceType: number; // 1 for iOS, 2 for Android
  deviceModel: string;
  operatingSystem: string;
  osVersion: any;
  appVersion: string;
  timeZone: string;
  DeviceID: string;
}
export const CreateUserDeviceCall = async (dispatch: any) => {
  const normalizeTimeZone = (tz: string) => {
    if (tz === "Asia/Calcutta") return "Asia/Kolkata";
    return tz;
  };

  const timeZone = normalizeTimeZone(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  console.log("timeZone", timeZone);
  // let DeviceID = await DeviceInfo.getDeviceId();
  let DeviceID = await DeviceInfo.getUniqueId();
  const isEmulator = await DeviceInfo.isEmulator();
  console.log("DeviceIDDeviceID", DeviceID);
  let fcmToken = await AsyncStorageUtils?.getItem(AsyncStorageUtils?.FCM_TOKEN);
  console.log("fcmToken===>>> in loginaction", JSON.parse(fcmToken));
  let payload: loginProps = {
    deviceToken: JSON.parse(fcmToken),
    deviceType: 1,
    deviceModel: DeviceInfo.getModel() + ` isVirtual=${isEmulator}`,
    operatingSystem: Platform.OS,
    osVersion:
      Platform.OS === "android"
        ? JSON.stringify(Platform.Version)
        : Platform.Version,
    appVersion: DeviceInfo?.getVersion(),
    timeZone: timeZone,
    DeviceID: DeviceID,
  };
  console.log("payload===>>", payload);
  await CreateUserDevice_API(payload, dispatch);
};
const LoginApi = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  comeFromWhichScreen: any
) => {
  dispatchData(types.POST_LOGIN_EMAIL_REQUEST, {}, dispatch);
  const url = apiConstant().loginwithEmail;
  return ajaxPost(url, requestbody, functionName, dispatch, "Login")
    .then((resp) => {
      console.log("resp=-=-=-=-=-=>LoginApi ", url, requestbody, resp);

      if (resp?.data?.token) {
        AsyncStorageUtils.storeItemKey(
          AsyncStorageUtils.ACCESS_TOKEN,
          resp?.data?.token
        );
        AsyncStorageUtils.storeItemKey(
          AsyncStorageUtils.LOGIN_USER_DATA,
          JSON.stringify(resp?.data)
        );
        seekerData(dispatch);
        CreateUserDeviceCall(dispatch);
        AsyncStorageUtils.storeItemKey(AsyncStorageUtils.LOGIN_TYPE, "email");
        //planer & explorer switch
        // event.emit("login");
        setTimeout(() => {
          if (resp?.data?.strategyTypeId) {
            event.emit("login");

            AsyncStorageUtils.storeItemKey(
              AsyncStorageUtils.ISPLANNER_USER,
              JSON.stringify({
                isPlanner:
                  resp?.data?.strategyTypeId ==
                  appConstant.explorer_planner_type.planner
                    ? true
                    : false,
                isSelected: true,
              })
            );
          } else {
            event.emit("login");
          }
        }, 2000);
        dispatchData(types.POST_TOKEN_SUCCESS, resp?.data?.token, dispatch);
      }
      dispatchData(types.POST_LOGIN_EMAIL_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      console.log("errerrerrerr", err);
      dispatchData(types.POST_LOGIN_EMAIL_FAILURE, err, dispatch);
      return err;
    });
};

const LoginWithPhoneAPI = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.POST_LOGIN_PHONE_REQUEST, {}, dispatch);
  const url = apiConstant().LoginwithPhone;
  return ajaxPost(url, requestbody, functionName, dispatch)
    .then((resp) => {
      if (resp?.data?.token) {
        AsyncStorageUtils.storeItemKey(
          AsyncStorageUtils.ACCESS_TOKEN,
          resp?.data?.token
        );
        AsyncStorageUtils.storeItemKey(
          AsyncStorageUtils.LOGIN_USER_DATA,
          JSON.stringify(resp?.data)
        );
        seekerData(dispatch);
        CreateUserDeviceCall(dispatch);
        // AsyncStorageUtils.storeItemKey(AsyncStorageUtils.LOGIN_TYPE, "phone");
        event.emit("login");

        dispatchData(types.POST_TOKEN_SUCCESS, resp?.data?.token, dispatch);
      }
      dispatchData(types.POST_LOGIN_PHONE_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_LOGIN_PHONE_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const LoginWithGoogle = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.POST_LOGIN_WITH_GOOGLE_REQUEST, {}, dispatch);
  const url = apiConstant().GoogleAuthenticate;
  return ajaxPost(url, requestbody, functionName, dispatch)
    .then((resp) => {
      console.log("resp===-=>", resp);

      if (resp?.data?.token) {
        AsyncStorageUtils.storeItemKey(
          AsyncStorageUtils.ACCESS_TOKEN,
          resp?.data?.token
        );
        AsyncStorageUtils.storeItemKey(
          AsyncStorageUtils.LOGIN_USER_DATA,
          JSON.stringify(resp?.data)
        );
        CreateUserDeviceCall(dispatch);
        AsyncStorageUtils.storeItemKey(AsyncStorageUtils.LOGIN_TYPE, "google");
        event.emit("login");

        dispatchData(types.POST_TOKEN_SUCCESS, resp?.data?.token, dispatch);
      }
      dispatchData(types.POST_LOGIN_WITH_GOOGLE_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_LOGIN_WITH_GOOGLE_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const LoginWithApple = (dispatch: any, requestbody: any, functionName: any) => {
  dispatchData(types.POST_LOGIN_WITH_APPLE_REQUEST, {}, dispatch);
  const url = apiConstant().AppleAuthenticate;
  return ajaxPost(url, requestbody, functionName, dispatch)
    .then((resp) => {
      if (resp?.data?.token) {
        AsyncStorageUtils.storeItemKey(
          AsyncStorageUtils.ACCESS_TOKEN,
          resp?.data?.token
        );
        AsyncStorageUtils.storeItemKey(
          AsyncStorageUtils.LOGIN_USER_DATA,
          JSON.stringify(resp?.data)
        );
        CreateUserDeviceCall(dispatch);
        AsyncStorageUtils.storeItemKey(AsyncStorageUtils.LOGIN_TYPE, "apple");
        event.emit("login");

        dispatchData(types.POST_TOKEN_SUCCESS, resp?.data?.token, dispatch);
      }
      dispatchData(types.POST_LOGIN_WITH_APPLE_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_LOGIN_WITH_APPLE_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const ForgotPasswordAPI = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.POST_FORGOT_PASSWORD_REQUEST, {}, dispatch);
  const url = apiConstant().ForgotPassword;
  return ajaxPost(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.POST_FORGOT_PASSWORD_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_FORGOT_PASSWORD_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
const Register = (dispatch: any, requestbody: any, functionName: any) => {
  dispatchData(types.POST_REGISTER_REQUEST, {}, dispatch);
  const url = apiConstant().Register + "?orgId=0";
  return ajaxPost(url, requestbody, functionName, dispatch)
    .then((resp) => {
      console.log("register==>resp", resp);

      if (resp?.data) {
        console.log("ok token and emit is saved");

        // event.emit("login");
        AsyncStorageUtils.storeItemKey(
          AsyncStorageUtils.ACCESS_TOKEN,
          resp?.data?.token
        );
        AsyncStorageUtils.storeItemKey(
          AsyncStorageUtils.LOGIN_USER_DATA,
          JSON.stringify(resp?.data)
        );
        AsyncStorageUtils.storeItemKey(AsyncStorageUtils.LOGIN_TYPE, "email");
      }
      dispatchData(types.POST_REGISTER_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      console.log("register==>err", err);
      dispatchData(types.POST_REGISTER_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
const VerifyForgotPasswordOtp = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.POST_VERIFYFORGOTPASSWORDOTP_REQUEST, {}, dispatch);
  const url = apiConstant().VerifyForgotPasswordOtp;
  return ajaxPost(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.POST_VERIFYFORGOTPASSWORDOTP_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_VERIFYFORGOTPASSWORDOTP_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
const ResetPassword = (dispatch: any, requestbody: any, functionName: any) => {
  dispatchData(types.POST_RESETPASSWORD_REQUEST, {}, dispatch);
  const url = apiConstant().ResetPassword;
  return ajaxPost(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.POST_RESETPASSWORD_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_RESETPASSWORD_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

// verify for phone number only
const VerifyOtp = (dispatch: any, requestbody: any, functionName: any) => {
  dispatchData(types.POST_PHONE_VERIFYOTP_REQUEST, {}, dispatch);
  const url = apiConstant().VerifyOtp;
  return ajaxPost(url, requestbody, functionName, dispatch)
    .then((resp) => {
      if (resp?.data?.token) {
        AsyncStorageUtils.storeItemKey(
          AsyncStorageUtils.ACCESS_TOKEN,
          resp?.data?.token
        );
        AsyncStorageUtils.storeItemKey(
          AsyncStorageUtils.LOGIN_USER_DATA,
          JSON.stringify(resp?.data)
        );
        seekerData(dispatch);
        CreateUserDeviceCall(dispatch);
      }

      setTimeout(() => {
        if (
          resp?.data?.strategyTypeId ==
          appConstant.explorer_planner_type.planner
        ) {
          event.emit("login");

          AsyncStorageUtils.storeItemKey(
            AsyncStorageUtils.ISPLANNER_USER,
            JSON.stringify({ isPlanner: true, isSelected: true })
          );
        } else if (
          resp?.data?.strategyTypeId ==
          appConstant.explorer_planner_type.explorer
        ) {
          event.emit("login");

          AsyncStorageUtils.storeItemKey(
            AsyncStorageUtils.ISPLANNER_USER,
            JSON.stringify({ isPlanner: false, isSelected: true })
          );
        } else {
          event.emit("login");
        }
      }, 2000);

      dispatchData(types.POST_PHONE_VERIFYOTP_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_PHONE_VERIFYOTP_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
const ResendOtp_SignUpWithEmailAndPhone = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(
    types.POST_RESENDOTP_SIGNUPWITHEMAILANDPHONE_REQUEST,
    {},
    dispatch
  );
  const url = apiConstant().ResendOtp_SignUpWithEmailAndPhone;
  return ajaxPost(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        types.POST_RESENDOTP_SIGNUPWITHEMAILANDPHONE_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        types.POST_RESENDOTP_SIGNUPWITHEMAILANDPHONE_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
};
const ResendOtp_LoginWithPhone = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.POST_RESENDOTP_LOGINWITHPHONE_REQUEST, {}, dispatch);
  const url = apiConstant().ResendOtp_LoginWithPhone;
  return ajaxPost(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.POST_RESENDOTP_LOGINWITHPHONE_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_RESENDOTP_LOGINWITHPHONE_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
const ResendOtp_ForgotPassword = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.POST_RESENDOTP_FORGOTPASSWORD_REQUEST, {}, dispatch);
  const url = apiConstant().ResendOtp_ForgotPassword;
  return ajaxPost(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.POST_RESENDOTP_FORGOTPASSWORD_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_RESENDOTP_FORGOTPASSWORD_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

// SignOut Action
const SignOut = (dispatch: any, requestbody: any, functionName: any) => {
  dispatchData(types.POST_SIGN_OUT_REQUEST, {}, dispatch);
  const url = apiConstant().SignOut;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      if (resp.statusCode === 200) {
        GoogleSignin.signOut();
        AsyncStorageUtils.removeItem(AsyncStorageUtils?.LOGIN_TYPE);
        AsyncStorageUtils.removeItem(AsyncStorageUtils.ACCESS_TOKEN).then(
          () => {
            event.emit("logout");
            dispatchData(types.POST_SIGN_OUT_SUCCESS, resp, dispatch);
            dispatch({
              type: loginTypes.POST_USERTYPE_SUCCESS,
              payload: { isLoginUser: false, userType: "explorer" },
            });
          }
        );
        AsyncStorageUtils.removeItem(AsyncStorageUtils.ISPLANNER_USER);
      } else {
        dispatchData(types.POST_SIGN_OUT_FAILURE, resp, dispatch);
      }
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_SIGN_OUT_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const GetClinicianDetailBySeekerEmail = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(
    types.GET_CLINICIAN_DETAILS_BY_SEEKEREMAIL_REQUEST,
    {},
    dispatch
  );
  const url = apiConstant().GetClinicianDetailBySeekerEmail;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      console.log("check resp for GetClinicianDetailBySeekerEmail", resp);

      // if (!resp?.data?.isValid) {
      //   event.emit("login");
      // }
      dispatchData(
        types.GET_CLINICIAN_DETAILS_BY_SEEKEREMAIL_REQUEST,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        types.GET_CLINICIAN_DETAILS_BY_SEEKEREMAIL_REQUEST,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
};
const GetInvitedSeekerDetails = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.POST_GETINVITEDSEEKERDETAILS_REQUEST, {}, dispatch);
  const url = apiConstant().GetInvitedSeekerDetails;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.POST_GETINVITEDSEEKERDETAILS_REQUEST, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_GETINVITEDSEEKERDETAILS_REQUEST, err, dispatch);
      return Promise.reject(err);
    });
};
const SaveOrUpdateSeekerInfo = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.POST_SAVEORUPDATESEEKERINFO_REQUEST, {}, dispatch);
  const url = apiConstant().SaveOrUpdateSeekerInfo;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.POST_SAVEORUPDATESEEKERINFO_REQUEST, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_SAVEORUPDATESEEKERINFO_REQUEST, err, dispatch);
      return Promise.reject(err);
    });
};
const GetSeekerWellnessPlanDetailsAsync = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(
    types.GET_GETSEEKERWELLNESSPLANDETAILSASYNC_REQUEST,
    {},
    dispatch
  );
  const url = apiConstant().GetSeekerWellnessPlanDetailsAsync;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        types.GET_GETSEEKERWELLNESSPLANDETAILSASYNC_REQUEST,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        types.GET_GETSEEKERWELLNESSPLANDETAILSASYNC_REQUEST,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
};
const saveName = (dispatch: any, val: any) => {
  dispatchData(types.SEEKER_NAME_REQUEST, val, dispatch);
};

// const DeleteUser = (dispatch: any, requestbody: any, functionName: any) => {
//   dispatchData(types.POST_DELETEUSER_REQUEST, {}, dispatch);
//   const url = apiConstant().DeleteUser;
//   return ajaxDelete(url, requestbody, functionName, dispatch)
//     .then((resp) => {
//       if (resp.statusCode === 200) {

//         dispatch({
//           type: loginTypes.POST_USERTYPE_SUCCESS,
//             payload: { isLoginUser: false, userType: "explorer" },
//            });
//            return Promise.resolve(resp);
//         // GoogleSignin.signOut();
//         // AsyncStorageUtils.removeItem(AsyncStorageUtils?.LOGIN_TYPE);
//         // AsyncStorageUtils.removeItem(AsyncStorageUtils.ACCESS_TOKEN).then(
//         //   () => {
//         //     event.emit("logout");
//         //     dispatchData(types.POST_DELETEUSER_SUCCESS, resp, dispatch);
//         //     dispatch({
//         //       type: loginTypes.POST_USERTYPE_SUCCESS,
//         //       payload: { isLoginUser: false, userType: "explorer" },
//         //     });
//         //   }
//         // );
//         // AsyncStorageUtils.removeItem(AsyncStorageUtils.ISPLANNER_USER);
//       } else {
//         dispatchData(types.POST_DELETEUSER_FAILURE, resp, dispatch);
//       }
//       return Promise.resolve(resp);
//     })
//     .catch((err) => {
//       dispatchData(types.POST_SIGN_OUT_FAILURE, err, dispatch);
//       return Promise.reject(err);
//     });
// };

const DeleteUser = (dispatch: any, requestbody: any, functionName: any) => {
  dispatchData(types.POST_DELETEUSER_REQUEST, {}, dispatch);
  const url = apiConstant().DeleteUser;
  return ajaxDelete(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.POST_DELETEUSER_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_DELETEUSER_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const VerifyOtpAndDeleteUser = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.POST_VERIFYOTPAND_DELETEUSER_REQUEST, {}, dispatch);
  const url = apiConstant().VerifyOtpAndDeleteUser;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.POST_VERIFYOTPAND_DELETEUSER_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_VERIFYOTPAND_DELETEUSER_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const SaveUserPrivacyPolicyInfo = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.POST_SAVEUSERPRIVACYPOLICEINFO_REQUEST, {}, dispatch);
  const url = apiConstant().SaveUserPrivacyPolicyInfo;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        types.POST_SAVEUSERPRIVACYPOLICEINFO_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_SAVEUSERPRIVACYPOLICEINFO_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const SaveConsentForm = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.POST_SAVECONSENTFORM_REQUEST, {}, dispatch);
  const url = apiConstant().SaveConsentForm;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.POST_SAVECONSENTFORM_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_SAVECONSENTFORM_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const GetConsentFormStatus = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.POST_SAVECONSENTFORM_REQUEST, {}, dispatch);
  const url = apiConstant().GetConsentFormStatus;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.POST_SAVECONSENTFORM_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_SAVECONSENTFORM_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
const ValidateUserEmail = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  const url = apiConstant().ValidateUserEmail + `/${requestbody?.email}`;

  console.log("urlurlurlurlurl", url);
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      return Promise.resolve(resp);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
//ValidateUserEmail
export default {
  SignUpWithEmailAndPhone,
  SignUpOTPVerify,
  SelfSignUpAPI,
  LoginApi,
  LoginWithPhoneAPI,
  LoginWithGoogle,
  ForgotPasswordAPI,
  LoginWithApple,
  Register,
  VerifyForgotPasswordOtp,
  ResetPassword,
  VerifyOtp,
  ResendOtp_SignUpWithEmailAndPhone,
  ResendOtp_LoginWithPhone,
  ResendOtp_ForgotPassword,
  SignOut,
  GetClinicianDetailBySeekerEmail,
  GetInvitedSeekerDetails,
  SaveOrUpdateSeekerInfo,
  GetSeekerWellnessPlanDetailsAsync,
  saveName,
  DeleteUser,
  VerifyOtpAndDeleteUser,
  SaveUserPrivacyPolicyInfo,
  SaveConsentForm,
  GetConsentFormStatus,
  ValidateUserEmail,
};
