import React, { useEffect, useState } from "react";
import { ImageBackground, Text, View } from "react-native";
import navigationString from "../../../../navigation/navigationString";
import { strings } from "../../../../constant/strings";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../constant/colors";
import ChangeBtmScreen from "../commonComponent/ChangeBtmScreen";
import { imagePath } from "../../../../assets/png/imagePath";
import BackgroundTimer from "react-native-background-timer";
import { styles } from "./styles";
import allActions from "../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import OtpView from "./OtpView";
import { getSeekerName } from "../../../../redux/selector";
import * as AsyncStorageUtils from "../../../../utils/Storage/AsyncStorage";
import appConstant, { STATUS_CODES } from "../../../../constant/appConstant";
import CommonLoader from "../../../../components/Loader";
import ToastApiResponse from "../../../../components/Toast/ToastApiResponse";
import { moderateScale } from "../../../../constant/responsiveStyle";
import { API_FUN_NAMES } from "../../../../constant/APIsFunctionNames";
import logger from "../../../../constant/logger";

interface Props {
  navigation?: any;
  route?: any;
}

const OtpValidation: React.FC<Props> = ({ navigation, route }) => {
  const { from, type } = route.params;
  let seekerName = useSelector(getSeekerName());
  const dispatch = useDispatch();
  const [otpValue, setOtpValue] = useState<string>("");
  const [OTPError, setOTPError] = useState(false);
  const [timerOn, setTimerOn] = useState(true);
  const [counter, setCounter] = useState(30);
  const [resendOtpCount, setresendOtpCount] = useState(0);
  const [isLoading, setisLoading] = useState(false);

  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  useEffect(() => {
    if (timerOn) startTimer();
    else BackgroundTimer.stopBackgroundTimer();
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [timerOn]);
  useEffect(() => {
    if (counter === 0) {
      setTimerOn(false);
      BackgroundTimer.stopBackgroundTimer();
    }
  }, [counter]);
  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setCounter((secs) => {
        if (secs > 0) return secs - 1;
        else return 0;
      });
    }, 1000);
  };

  const resendOtp = async () => {
    setOtpValue("");
    setCounter(30);
    setTimerOn(true);
    setresendOtpCount(resendOtpCount + 1);
    switch (from) {
      case "signup":
        resendOtpSignUpWithEmailAndPhone();
        break;
      case "Validate_Phone":
        resendOtpLoginWithPhone();
        break;
      case "forgot_email":
        resendOtpForgotPassword();
        break;
      default:
        break;
    }
  };
  const onOTPchange = (otp: any) => {
    const numericValue = otp.replace(/\D/g, "");
    setOtpValue(numericValue);
    setOTPError(false);
  };
  const otpValidation = () => {
    if (otpValue.length === 6) {
      setOTPError(false);
      signUpOTPVerify();
    } else {
      setOTPError(true);
    }
  };
  const signUpOTPVerify = () => {
    if (from === "forgot_email") {
      forgotPwdVerifyOTP();
    } else if (from === "Validate_Phone") {
      VerifyOtp();
    } else {
      VerifyEmailAndPhoneSignUpOtp();
    }
  };
  const resendOtpForgotPassword = () => {
    setisLoading(true);

    let requestbody = {
      email: type.data,
    };
    allActions.Auth.ForgotPasswordAPI(
      dispatch,
      requestbody,
      "ResendOtp_ForgotPassword"
    )
      .then((response: any) => {
        if (response.statusCode == 200) {
          setisLoading(false);
          setToasterDetails({
            showToast: true,
            code: 1,
            message: response?.message,
          });
        } else {
          setisLoading(false);
          setToasterDetails({
            showToast: true,
            code: 0,
            message: response?.message,
          });
        }
      })
      .catch((err) => {
        setisLoading(false);
        setToasterDetails({
          showToast: true,
          code: 0,
          message: err?.message,
        });
      });
  };
  const resendOtpLoginWithPhone = () => {
    setisLoading(true);

    let requestbody = {
      phoneNumber: type?.phoneNumber,
      countryCode: type?.countryCode,
      flagCode: type?.flagCode,
      orgId: 0,
    };
    allActions.Auth.ResendOtp_SignUpWithEmailAndPhone(
      dispatch,
      requestbody,
      "ResendOtp_LoginWithPhone"
    )
      .then((response: any) => {
        if (response.statusCode == 200) {
          setisLoading(false);
          setToasterDetails({
            showToast: true,
            code: 1,
            message: response?.message,
          });
        } else {
          setisLoading(false);
          setToasterDetails({
            showToast: true,
            code: 0,
            message: response?.message,
          });
        }
      })
      .catch((err) => {
        setisLoading(false);
        setToasterDetails({
          showToast: true,
          code: 0,
          message: err?.message,
        });
      });
  };
  const resendOtpSignUpWithEmailAndPhone = () => {
    setisLoading(true);

    let requestbody = {
      email: type?.isEmail ? type.data : null,
      phoneNumber: !type?.isEmail ? type.phoneNumber : null,
      countryCode: !type?.isEmail ? type.countryCode : null,
      flagCode: !type?.isEmail ? type.flagCode : null,
      orgId: 0,
      name: seekerName || "User",
    };
    allActions.Auth.ResendOtp_SignUpWithEmailAndPhone(
      dispatch,
      requestbody,
      "ResendOtp_SignUpWithEmailAndPhone"
    )
      .then((response: any) => {
        if (response?.statusCode == 200) {
          setisLoading(false);
          setToasterDetails({
            showToast: true,
            code: 1,
            message: response?.message,
          });
        } else {
          setisLoading(false);
          setToasterDetails({
            showToast: true,
            code: 0,
            message: response?.message,
          });
        }
      })
      .catch((err) => {
        setisLoading(false);
        setToasterDetails({
          showToast: true,
          code: 0,
          message: err?.message,
        });
      });
  };
  const VerifyOtp = () => {
    setisLoading(true);

    let requestbody = {
      otp: otpValue,
      phoneNumber: type?.phoneNumber,
      countryCode: type?.countryCode,
      flagCode: type?.flagCode,
      credentialType: appConstant.credentialType.phone,
      orgId: 0,
    };

    allActions.Auth.VerifyOtp(dispatch, requestbody, "VerifyOtp")
      .then((response: any) => {
        if (response.statusCode == 200) {
          setisLoading(false);

          AsyncStorageUtils.storeItemKey(AsyncStorageUtils.LOGIN_TYPE, "phone");
          navigation.navigate(navigationString.PasswordChanged, {
            purpose: "phone_Login",
          });
        } else {
          setisLoading(false);
          setToasterDetails({
            showToast: true,
            code: 0,
            message: response?.message,
          });
        }
      })
      .catch((err) => {
        setisLoading(false);
        setToasterDetails({
          showToast: true,
          code: 0,
          message: err?.message,
        });
      });
  };
  const forgotPwdVerifyOTP = () => {
    setisLoading(true);

    let requestbody = {
      otp: otpValue,
      email: type?.isEmail ? type.data : null,
      otpType: 1,
      orgId: 0,
    };
    allActions.Auth.VerifyForgotPasswordOtp(
      dispatch,
      requestbody,
      "forgotPwdVerifyOTP"
    )
      .then((response: any) => {
        if (response.statusCode == 200) {
          setisLoading(false);
          navigation.navigate(navigationString?.CreateNewPassword, {
            from: "forgotPwdVerifyOTP",
            type: type?.userToken,
            purpose: "forgot_password",
            id: response.data.userId,
          });
        } else {
          setisLoading(false);
          setToasterDetails({
            showToast: true,
            code: 0,
            message: response?.message,
          });
        }
      })
      .catch((err) => {
        setisLoading(false);
        setToasterDetails({
          showToast: true,
          code: 0,
          message: err?.message,
        });
      });
  };
  const VerifyEmailAndPhoneSignUpOtp = () => {
    setisLoading(true);

    let requestbody = {
      otp: otpValue,
      email: type?.isEmail ? type.data : null,
      phoneNumber: !type?.isEmail ? type?.phoneNumber : null,
      firstName: seekerName,
      lastName: "",
      flagCode: !type?.isEmail ? type?.flagCode : null,
      countryCode: !type?.isEmail ? type?.countryCode : null,
      otpType: 2,
      orgId: 0,
    };

    allActions.Auth.SignUpOTPVerify(
      dispatch,
      requestbody,
      "VerifyEmailAndPhoneSignUpOtp",
      `${"?orgId=0"}`
    )
      .then((response: any) => {
        if (response.statusCode == 200) {
          if (type?.isEmail) {
            setisLoading(false);
            setToasterDetails({
              showToast: true,
              code: 1,
              message: response?.message,
            });
            navigation.navigate(navigationString?.CreateNewPassword, {
              from: navigationString.CreateNewPassword,
              type: { isEmail: true, data: type?.data.toLowerCase() },
              purpose: "email_sign",
            });
          } else {
            setisLoading(false);
            setToasterDetails({
              showToast: true,
              code: 1,
              message: response?.message,
            });
            navigation.navigate(navigationString?.PasswordChanged, {
              from: navigationString.OtpValidation,
              purpose: "phone_sign",
            });
          }
        } else {
          setisLoading(false);
          setToasterDetails({
            showToast: true,
            code: 0,
            message: response?.message,
          });
        }
      })
      .catch((err) => {
        setisLoading(false);
        setToasterDetails({
          showToast: true,
          code: 0,
          message: err?.message,
        });
      });
  };

  return (
    <ScreenWrapper statusBarColor={colors?.SaltBox}>
      <ImageBackground
        style={styles?.ibStyle}
        source={imagePath?.BgLeft}
        resizeMode={"stretch"}
      >
        {/* {isLoading ? (
          <CommonLoader />
        ) : ( */}
        <>
          <View style={{ marginTop: moderateScale(100) }} />
          <OtpView
            from={from}
            type={type}
            navigation={navigation}
            onOTPchange={onOTPchange}
            otpValue={otpValue}
            OTPError={OTPError}
            resendOtpCount={resendOtpCount}
            counter={counter}
            isLoading={isLoading}
            otpValidation={otpValidation}
            resendOtp={resendOtp}
          />

          {from !== "Validate_Phone" && (
            <ChangeBtmScreen
              content={strings.rememberPassword}
              title={strings.LOGIN}
              onPress={() => navigation.navigate(navigationString?.LoginInput)}
              mainContainer={styles?.chgBtnContainer}
            />
          )}
        </>
        {/* )} */}
        {toasterDetails?.showToast && (
          <ToastApiResponse
            data={toasterDetails}
            setToasterDetails={setToasterDetails}
            code={toasterDetails?.code}
            message={toasterDetails?.message}
          />
        )}
      </ImageBackground>
    </ScreenWrapper>
  );
};
export default OtpValidation;
