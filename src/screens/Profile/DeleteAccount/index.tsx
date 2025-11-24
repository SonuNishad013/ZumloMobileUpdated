import React, { ReactElement, useEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";
import CommonButton from "../../../components/Buttons/commonButton";
import colors from "../../../constant/colors";
import { moderateScale } from "../../../constant/responsiveStyle";
import CommonInput from "../../../components/Inputs/commonInput";
import { emailCheck } from "../../../validations/validation";
import { strings } from "../../../constant/strings";
import CountryPicker from "react-native-country-picker-modal";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import { useDispatch, useSelector } from "react-redux";
import CommonHeader from "../../../components/Header/commonHeader";
import OtpView from "../../OnBoarding/ForgotPassword/OtpValidation/OtpView";
import BackgroundTimer from "react-native-background-timer";
import allActions from "../../../redux/actions";
import * as AsyncStorage from "../../../utils/Storage/AsyncStorage";
import { event } from "../../../navigation/emitter";
import { DropdownPP } from "../../../assets";
import { styles } from "./styles";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import { getCountryCodeNumberLength } from "../../../helper/duration";
import { formatSentenceCase } from "../../../helper/sentenceCase";
import { PATTERNS } from "../../../constant/Patterns";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import {
  OTP_LIMIT,
  STATUS_CODES,
  TOAST_STATUS,
} from "../../../constant/appConstant";
import { APPLY_STATUS } from "../../../constant/ENUM";
import logger from "../../../constant/logger";
import { getSeekerDetailsData } from "../../../redux/selector";
import CommonLoader from "../../../components/Loader";

interface Props {
  navigation?: any;
  route?: any;
}
const DeleteAccount: React.FC<Props> = ({
  navigation,
  route,
}): ReactElement => {
  const { userLoginType, userData } = route?.params;

  let userData_ = useSelector(getSeekerDetailsData());

  const removePlus = (value: any) => {
    if (value?.charAt(0) == "+") {
      return value?.slice(1);
    } else {
      return value;
    }
  };

  const dispatch: any = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const [email, setemail] = useState(
    userData_?.data?.contactInformation?.email
      ? userData_?.data?.contactInformation?.email
      : ""
  );
  const [emailErrMsg, setemailErrMsg] = useState("");
  const [isemailError, setisemailError] = useState(false);
  const [phn, setPhn] = useState(
    userData?.contactInformation?.phoneNumber
      ? userData?.contactInformation?.phoneNumber
      : ""
  );
  const [phnErrMsg, setPhnErrMsg] = useState("");
  const [isPhnError, setisPhnError] = useState(false);
  const [countryCode, setCountryCode] = useState<any>(
    userData?.contactInformation?.flagCode
      ? userData?.contactInformation?.flagCode
      : "US"
  );
  const [CountryCodeNumber, setCountryCodeNumber] = useState<any>(
    userData?.contactInformation?.countryCode
      ? removePlus(userData?.contactInformation?.countryCode)
      : "1"
  );
  const [otpValue, setOtpValue] = useState<string>("");
  const [OTPError, setOTPError] = useState(false);
  const [timerOn, setTimerOn] = useState<any>(true);
  const [counter, setCounter] = useState(30);
  const [resendOtpCount, setresendOtpCount] = useState(0);
  const [otpField, setOtpField] = useState(false);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  const emailValidate = (eml: any) => {
    var pattern = PATTERNS?.email;
    if (!pattern.test(eml) || eml == "") {
      setemail(eml);
      setisemailError(false);
    }
  };

  const emailValidation = () => {
    if (email.trim() === "") {
      setisemailError(true);
      setemailErrMsg(strings?.emailError);
    } else if (!emailCheck(email)) {
      setisemailError(true);
      setemailErrMsg(strings?.emailvalidError);
    } else {
      deleteAccount();
    }
  };
  const phoneValidate = () => {
    if (phn.trim() === "") {
      setisPhnError(true);
      setPhnErrMsg(strings?.phoneError);
    } else if (phn.length >= 10) {
      setisPhnError(false);
      setPhnErrMsg("");
      deleteAccount();
    } else {
      setisPhnError(true);
      setPhnErrMsg(strings?.phoneValidError);
    }
  };

  const onEmailFocus = () => {
    setisemailError(false);
    setemailErrMsg("");
    if (email.length === 0) {
      setisemailError(false);
      setemailErrMsg("");
    }
  };

  const PhnValidate = (phn: any) => {
    setPhn(phn.replace(PATTERNS?.phone, ""));
  };
  const deleteAccount = async () => {
    setisLoading(true);
    try {
      let requestbody = {
        confirmEmail:
          userLoginType == strings?.email ? `${email?.toLowerCase()}` : null,
        confirmMobileNumber: userLoginType !== strings?.email ? `${phn}` : null,
        countryCode:
          userLoginType !== strings?.email
            ? "+" + `${CountryCodeNumber}`
            : null,
        flag: userLoginType !== strings?.email ? `${countryCode}` : null,
      };
      allActions.Auth.DeleteUser(
        dispatch,
        requestbody,
        API_FUN_NAMES?.deleteAccount
      )
        .then((response: any) => {
          setisLoading(false);
          if (response.statusCode == STATUS_CODES?.RESPONSE_OK) {
            setOtpField(true);
            setToasterDetails({
              showToast: true,
              code: TOAST_STATUS?.SUCCESS,
              message: formatSentenceCase(response.message),
            });
          } else {
            setToasterDetails({
              showToast: true,
              code: TOAST_STATUS?.ERROR,
              message: response.message,
            });
          }
          setisLoading(false);
        })
        .catch((err: any) => {
          setisLoading(false);
          setToasterDetails({
            showToast: true,
            code: TOAST_STATUS?.ERROR,
            message: err.message,
          });
        });
    } catch (error) {
      setisLoading(false);
      setToasterDetails({
        showToast: true,
        code: TOAST_STATUS?.ERROR,
        message: error,
      });
    }
  };

  const verifyOtpAndDeleteUser = async () => {
    setisLoading(true);
    try {
      let requestbody = {
        otp: otpValue,
        phoneNumber: userLoginType == strings?.email ? null : `${phn}`,
        email:
          userLoginType == strings?.email ? `${email?.toLowerCase()}` : null,
        countryCode:
          userLoginType !== strings?.email
            ? "+" + `${CountryCodeNumber}`
            : null,
      };
      allActions.Auth.VerifyOtpAndDeleteUser(
        dispatch,
        requestbody,
        API_FUN_NAMES?.Signup_api
      )
        .then((response: any) => {
          if (response.statusCode === STATUS_CODES?.RESPONSE_ACCEPTED) {
            setToasterDetails({
              showToast: true,
              code: TOAST_STATUS?.SUCCESS,
              message: response.message,
            });
            setTimeout(() => {
              AsyncStorage.removeItem(AsyncStorage?.LOGIN_TYPE);
              AsyncStorage.removeItem(AsyncStorage.ISPLANNER_USER);
              AsyncStorage.removeItem(AsyncStorage.ACCESS_TOKEN).then(() => {
                event.emit(strings?.logout);
              });
            }, 2000);
          } else {
            setisLoading(false);
            setToasterDetails({
              showToast: true,
              code: TOAST_STATUS?.ERROR,
              message: response.message,
            });
          }
        })
        .catch((err) => {
          setisLoading(false);
          setToasterDetails({
            showToast: true,
            code: TOAST_STATUS?.ERROR,
            message: err.message,
          });
        });
    } catch (error) {
      setisLoading(false);
      setToasterDetails({
        showToast: true,
        code: TOAST_STATUS?.ERROR,
        message: error,
      });
    }
  };

  const LoginView = () => {
    return (
      <View>
        <View style={styles.inputContainer}>
          {userLoginType == strings?.email ? (
            <CommonInput
              placeholder={strings.enterEmail}
              mainContainer={styles.emailInput}
              value={email}
              onChangeText={emailValidate}
              isError={isemailError}
              errorMsg={emailErrMsg}
              placeholderTextColor={colors.grey}
              backGroundColor={colors.SurfCrest}
              borderColor={colors.prussianBlue}
              isWidth={false}
              onFocus={onEmailFocus}
              inputText={styles.inputText}
              iseditable={false}
            />
          ) : (
            <>
              <View style={styles.phnView}>
                <CountryPicker
                  countryCode={countryCode}
                  withFlagButton={true}
                  withCallingCodeButton={true}
                  withFilter={true}
                  withAlphaFilter={true}
                  withCallingCode={true}
                  theme={{
                    onBackgroundTextColor: colors.prussianBlue,
                    backgroundColor: colors.SurfCrest,
                    primaryColorVariant: colors?.grey,
                  }}
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
                  <DropdownPP />
                </View>

                <View style={styles.phnMarginRight} />
                <TextInput
                  placeholder={strings?.enterPhone}
                  value={phn}
                  onChangeText={(phn: any) => PhnValidate(phn)}
                  placeholderTextColor={colors?.grey}
                  maxLength={14}
                  keyboardType={APPLY_STATUS?.numeric}
                  style={styles.phnTextInput}
                  editable={false}
                />
              </View>
              {isPhnError && (
                <Text style={styles.phnErrorText}>{phnErrMsg}</Text>
              )}
            </>
          )}
        </View>
        <CommonButton
          btnName={strings.GetOtp}
          btnNameStyle={styles.loginButtonText}
          mainContainer={styles.commonButtonContainer}
          onPress={() =>
            userLoginType == strings?.email
              ? emailValidation()
              : phoneValidate()
          }
          // isLoading={isLoading}
        />
      </View>
    );
  };

  useEffect(() => {
    if (otpField) {
      if (timerOn) startTimer();
      else BackgroundTimer.stopBackgroundTimer();
      return () => {
        BackgroundTimer.stopBackgroundTimer();
      };
    }
  }, [timerOn, otpField]);

  useEffect(() => {
    if (otpField) {
      if (counter === 0) {
        setTimerOn(false);
        BackgroundTimer.stopBackgroundTimer();
      }
    }
  }, [counter, otpField]);

  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setCounter((secs) => {
        if (secs > 0) return secs - 1;
        else return 0;
      });
    }, 1000);
  };

  const onOTPchange = (otp: any) => {
    const numericValue = otp.replace(PATTERNS?.OTP, "");
    setOtpValue(numericValue);
    setOTPError(false);
  };

  const otpValidation = () => {
    if (otpValue.length === OTP_LIMIT?.limit) {
      setOTPError(false);
      verifyOtpAndDeleteUser();
    } else {
      setOTPError(true);
    }
  };

  const resendOtp = async () => {
    setOtpValue("");
    setCounter(30);
    setTimerOn(true);
    setresendOtpCount(resendOtpCount + 1);
    deleteAccount();
  };

  return (
    <ScreenWrapper statusBarColor={colors.SurfCrest}>
      <CommonHeader
        onBackPress={() => {
          if (otpField) {
            setOtpField(false);
          } else {
            navigation?.goBack();
          }
        }}
        headerName={strings?.Delete_Account}
        mainContainer={styles.headerContainer}
        textStyle={styles.headerText}
        iconContainer={styles.headerIconContainer}
      />
      <View style={styles.innerView}>
        <Text style={styles.confirmDeletionText}>
          {strings?.Confirm_account_deletion}
        </Text>
        <Text style={styles.deletionDescription}>
          {strings?.This_is_your_final_chance_to_back_out}
        </Text>
        {otpField ? (
          <>
            <OtpView
              onOTPchange={onOTPchange}
              otpValue={otpValue}
              OTPError={OTPError}
              resendOtpCount={resendOtpCount}
              counter={counter}
              // isLoading={isLoading}
              otpValidation={otpValidation}
              resendOtp={resendOtp}
              headerShow={false}
              btmBtn={true}
              timerTxtStyle={styles.timerTxtStyle}
              boxView={styles.boxView}
              mainContainer={styles.otpMainContainer}
            />
          </>
        ) : (
          LoginView()
        )}
      </View>
      {toasterDetails?.showToast && (
        <ToastApiResponse
          data={toasterDetails}
          setToasterDetails={setToasterDetails}
          code={toasterDetails?.code}
          message={toasterDetails?.message}
        />
      )}
      {isLoading && <CommonLoader />}
    </ScreenWrapper>
  );
};

export default DeleteAccount;
