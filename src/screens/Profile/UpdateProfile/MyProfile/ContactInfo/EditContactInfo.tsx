import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  moderateScale,
  textScale,
} from "../../../../../constant/responsiveStyle";
import colors from "../../../../../constant/colors";
import CommonInput from "../../../../../components/Inputs/commonInput";
import CommonButton from "../../../../../components/Buttons/commonButton";
import { strings } from "../../../../../constant/strings";
import CountryPicker from "react-native-country-picker-modal";
import { emailCheck } from "../../../../../validations/validation";
import allActions from "../../../../../redux/actions";
import { useDispatch } from "react-redux";
import OtpView from "../../../../OnBoarding/ForgotPassword/OtpValidation/OtpView";
import BackgroundTimer from "react-native-background-timer";
import CommonAlert from "../../../../../components/CommonAlert/CommonAlert";
import { DropdownPP } from "../../../../../assets";
import ToastApiResponse from "../../../../../components/Toast/ToastApiResponse";
import { getCountryCodeNumberLength } from "../../../../../helper/duration";
import logger from "../../../../../constant/logger";
import { maxLength } from "../../../../../utils/TextConfig";

const EditContactInfo = ({
  onPressUpdate,
  onPresCancel,
  userData,
  setIsEdited,
  userLoginType,
  setToasterDetails,
}: any) => {
  const removePlus = (value: any) => {
    if (value?.charAt(0) == "+") {
      return value?.slice(1);
    } else {
      return value;
    }
  };
  const [phnErrMsg, setPhnErrMsg] = useState("");
  const [isPhnError, setisPhnError] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [email, setemail] = useState(!userData?.email ? "" : userData?.email);
  const [emailErrMsg, setemailErrMsg] = useState("");
  const [isemailError, setisemailError] = useState(false);
  const [otpValue, setOtpValue] = useState<string>("");
  const [OTPError, setOTPError] = useState(false);
  const [timerOn, setTimerOn] = useState(true);
  const [counter, setCounter] = useState(30);
  const [otpField, setOtpField] = useState(false);
  const [resendOtpCount, setresendOtpCount] = useState(0);
  const [phn, setPhn] = useState(
    !userData?.phoneNumber ? "" : userData?.phoneNumber
  );
  const [countryCode, setCountryCode] = useState(
    !userData?.flagCode ? "US" : userData?.flagCode
  );
  const [CountryCodeNumber, setCountryCodeNumber] = useState<any>(
    !userData?.countryCode ? "1" : removePlus(userData?.countryCode)
  );

  const onSelect = (country: any) => {
    console.log("country", country);
    setCountryCodeNumber(country?.callingCode?.[0]);
    setCountryCode(country?.cca2);
  };
  const PhnValidate = (phn: any) => {
    setPhn(phn.replace(/[^0-9]/g, ""));
  };

  const emailValidate = (eml: any) => {
    var pattern = /[`!#$%^&*()_\s+\=\[\]{};':"\\|,<>\/?~]/;
    if (!pattern.test(eml) || eml == "") {
      setemail(eml);
      setisemailError(false);
    }
  };

  const emailValidation = () => {
    if (email.trim() === "") {
      setisemailError(true);
      setemailErrMsg("Mind filling this in? It helps us keep in touch.");
    } else if (!emailCheck(email)) {
      setisemailError(true);
      setemailErrMsg(strings?.emailvalidError);
    } else {
      AddEmailOrPhoneNumber();
    }
  };

  const dispatch = useDispatch();
  const AddEmailOrPhoneNumber = async () => {
    setisLoading(true);
    try {
      let requestbody = {
        email: userLoginType != "email" ? email.toLowerCase() : null,
        phoneNumber: userLoginType != "phone" ? phn : null,
        countryCode: userLoginType != "phone" ? `+${CountryCodeNumber}` : null,
        flagCode: userLoginType != "phone" ? countryCode : null,
      };
      console.log("first=requestbody==>", requestbody);
      allActions.seekerDetails
        .AddEmailOrPhoneNumber(dispatch, requestbody, "AddEmailOrPhoneNumber")
        .then((response: any) => {
          logger("checkAddEmailAndPhoneresponse____", response);
          if (response.statusCode == 200) {
            setisLoading(false);
            setOtpField(true);
            setToasterDetails({
              showToast: true,
              code: 1,
              message: response.message,
            });
          } else {
            setisLoading(false);
            setIsAlertVisible(true);
            setIsAlertMsg(response?.message);
          }
        })
        .catch((err: any) => {
          setisLoading(false);
          console.log("check error==>", err);
          setIsAlertVisible(true);
          setIsAlertMsg(err?.message);
        });
    } catch (error) {
      setisLoading(false);
      setIsAlertMsg(error);
    }
  };
  const phoneValidate = () => {
    if (phn.trim() === "") {
      setisPhnError(true);
      setPhnErrMsg(strings?.phoneError);
    } else if (phn.length >= 10) {
      setisPhnError(false);
      setPhnErrMsg("");
      AddEmailOrPhoneNumber();
    } else {
      setisPhnError(true);
      setPhnErrMsg(strings?.phoneValidError);
    }
  };

  const otpValidation = () => {
    if (otpValue.length === 6) {
      setOTPError(false);
      verifySeekerEmailOrPhoneNumberOTP();
    } else {
      setOTPError(true);
    }
  };

  const resendOtp = async () => {
    setOtpValue("");
    setCounter(30);
    setTimerOn(true);
    setresendOtpCount(resendOtpCount + 1);
    // resendOtpSignUpWithEmailAndPhone();
    AddEmailOrPhoneNumber();
  };

  const verifySeekerEmailOrPhoneNumberOTP = () => {
    setisLoading(true);
    try {
      let requestbody = {
        email: userLoginType != "email" ? email.toLowerCase() : null,
        phoneNumber: userLoginType != "phone" ? phn : null,
        countryCode: userLoginType != "phone" ? `+${CountryCodeNumber}` : null,
        flagCode: userLoginType != "phone" ? countryCode : null,
        otp: otpValue,
      };
      allActions.seekerDetails
        .VerifySeekerEmailOrPhoneNumberOTP(
          dispatch,
          requestbody,
          "verifySeekerEmailOrPhoneNumberOTP"
        )
        .then((response: any) => {
          setisLoading(false);
          if (response.statusCode == 200) {
            console.log("verifySeekerEmailOrPhoneNumberOTP", response?.message);
            setOtpField(false);
            onPressUpdate([
              {
                key: "email",
                value: email,
              },
              {
                key: "phoneNumber",
                value: phn,
              },
              {
                key: "countryCode",
                value: `+${CountryCodeNumber}`,
              },
              {
                key: "flagCode",
                value: countryCode,
              },
            ]);
          } else {
            setToasterDetails({
              showToast: true,
              code: 0,
              message: response.message,
            });
          }
        })
        .catch((err) => {
          setisLoading(false);
          setToasterDetails({
            showToast: true,
            code: 0,
            message: err.message,
          });
        });
    } catch (error) {
      setisLoading(false);
      setToasterDetails({
        showToast: true,
        code: 0,
        message: error,
      });
    }
  };

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

  const onOTPchange = (otp: any) => {
    const numericValue = otp.replace(/\D/g, "");
    setOtpValue(numericValue);
    setOTPError(false);
  };
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isAlertMsg, setIsAlertMsg] = useState<any>("");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, marginHorizontal: moderateScale(19) }}
    >
      {otpField ? (
        <OtpView
          onOTPchange={onOTPchange}
          otpValue={otpValue}
          OTPError={OTPError}
          resendOtpCount={resendOtpCount}
          counter={counter}
          isLoading={isLoading}
          otpValidation={otpValidation}
          resendOtp={resendOtp}
          headerShow={false}
          btmBtn={false}
          timerTxtStyle={{
            fontSize: textScale(14),
            color: colors?.prussianBlue,
            fontWeight: "400",
          }}
          boxView={{
            height: moderateScale(50),
            backgroundColor: "transparent",
            width: moderateScale(50),
            fontSize: textScale(22),
            borderRadius: moderateScale(8),
            borderWidth: moderateScale(1.2),
            textAlign: "center",
            paddingTop: moderateScale(9),
            color: colors?.prussianBlue,
          }}
          mainContainer={{
            marginHorizontal: moderateScale(0),
          }}
        />
      ) : (
        <>
          <Text
            style={[styles.textBasicInfo, { marginBottom: moderateScale(15) }]}
          >
            {"How to reach you"}
          </Text>
          <CommonInput
            isWidth={false}
            placeholder={strings?.enterEmail}
            value={email}
            inputText={{
              color: colors.prussianBlue,
            }}
            placeholderTextColor={colors?.prussianBlue}
            onChangeText={(email: string) => {
              setIsEdited(true);
              emailValidate(email);
            }}
            isError={isemailError}
            errorMsg={emailErrMsg}
            iseditable={userLoginType == "email" ? false : true}
          />
          <>
            {userData?.phoneNumber && userLoginType == "phone" ? (
              <CommonInput
                isWidth={false}
                placeholder={strings?.enterEmail}
                value={
                  !userData?.countryCode
                    ? userData?.phoneNumber
                    : userData?.countryCode + " " + userData?.phoneNumber
                }
                inputText={{
                  color: colors.prussianBlue,
                }}
                placeholderTextColor={colors?.grey}
                iseditable={false}
                onPressIcon={() => console.log("phoneNumber Icon Press")}
              />
            ) : (
              <View style={styles.phnView}>
                <CountryPicker
                  countryCode={countryCode}
                  withFlagButton={true}
                  withCallingCodeButton={true}
                  withFilter={true}
                  withAlphaFilter={true}
                  withCallingCode={true}
                  onSelect={onSelect}
                  theme={{
                    onBackgroundTextColor: colors.prussianBlue,
                    backgroundColor: colors.SurfCrest,
                    primaryColorVariant: "grey",
                  }}
                  visible={false}
                  containerButtonStyle={{
                    borderColor: colors.royalOrange,
                    width: getCountryCodeNumberLength(CountryCodeNumber?.length)
                      ?.widthInput,
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    left: getCountryCodeNumberLength(CountryCodeNumber?.length)
                      ?.icon,
                    top: moderateScale(25),
                  }}
                >
                  <DropdownPP
                    style={{
                      marginLeft: moderateScale(5),
                    }}
                  />
                </View>
                <View style={{ marginRight: moderateScale(10) }} />
                <TextInput
                  placeholder={strings?.enterPhone}
                  value={phn}
                  onChangeText={(phn: any) => {
                    setIsEdited(true);
                    PhnValidate(phn);
                  }}
                  placeholderTextColor={colors.grey}
                  maxLength={maxLength?.maxLengthForPhoneNumber}
                  keyboardType={"numeric"}
                  style={{
                    fontSize: textScale(15),
                    color: colors.prussianBlue,
                    height: moderateScale(50),
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}
                />
              </View>
            )}
            {isPhnError && (
              <Text
                style={{
                  color: colors.prussianBlue,
                  paddingLeft: moderateScale(8),
                  marginTop: moderateScale(5),
                }}
              >
                {phnErrMsg}
              </Text>
            )}
          </>
        </>
      )}
      {logger("otpFieldotpField_____", { otpField, userLoginType })}
      <CommonButton
        onPress={() => {
          otpField
            ? otpValidation()
            : userLoginType == "email"
            ? phoneValidate()
            : emailValidation();
        }}
        mainContainer={{
          height: moderateScale(52),
          marginTop: moderateScale(35),
          width: "auto",
        }}
        btnName={otpField ? "VERIFY OTP" : "Send code"}
        isLoading={isLoading}
      />

      <CommonButton
        onPress={() => onPresCancel()}
        mainContainer={{
          height: moderateScale(52),
          width: "auto",
          backgroundColor: "transparent",
        }}
        btnNameStyle={{ color: colors.prussianBlue }}
        btnName={"Cancel"}
      />
      <CommonAlert
        isAlertIcon={true}
        isVisible={isAlertVisible}
        alertMessage={isAlertMsg}
        alertLeftButtonText={"OK"}
        customAlertTxtStyles={{
          textAlign: "center",
        }}
        alertLeftButtonOnPress={() => setIsAlertVisible(false)}
      />
    </KeyboardAvoidingView>
  );
};

export default EditContactInfo;

const styles = StyleSheet.create({
  textBasicInfo: {
    fontSize: textScale(14),
    color: colors?.prussianBlue,
    fontWeight: "600",
    marginTop: moderateScale(15),
  },
  dropDownView: {
    paddingTop: moderateScale(15),
    zIndex: 1000,
    alignSelf: "center",
  },
  phnView: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: moderateScale(15),
    borderColor: colors?.polishedPine,
    borderWidth: moderateScale(1),
    height: moderateScale(56),
    padding: moderateScale(10),
    marginTop: moderateScale(5),
    backgroundColor: colors?.lightSurfCrest,
  },
});
