import React, { ReactElement, useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import navigationString from "../../../navigation/navigationString";
import CommonButton from "../../../components/Buttons/commonButton";
import colors from "../../../constant/colors";
import {
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import CommonInput from "../../../components/Inputs/commonInput";
import { emailCheck } from "../../../validations/validation";
import { strings } from "../../../constant/strings";
import CountryPicker from "react-native-country-picker-modal";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import { useFocusEffect } from "@react-navigation/native";
import HeaderSignUp from "./HeaderSignUp";
import WelcomeView from "./WelcomeView";
import SocialLogin from "./SocialLogin";
import CustomToggleBar from "../../../components/CustomToggleBar";
import ChangeBtmScreen from "../ForgotPassword/commonComponent/ChangeBtmScreen";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../../redux/actions";
import { loginWithGoogle } from "../../../helper/googleAuth";
import { loginWithApple } from "../../../helper/appleAuth";
import { styles } from "./styles";
import appConstant, { STATUS_CODES } from "../../../constant/appConstant";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getSeekerName } from "../../../redux/selector";
import { BtmDropdownIcon } from "../../../assets";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import { backgrounColor } from "../../../constant/ProfileConstant";
import { getCountryCodeNumberLength } from "../../../helper/duration";
import OnboardingConsent from "../../../components/OnboardingConsent/OnboardingConsent";
import { maxLength } from "../../../utils/TextConfig";
import logger from "../../../constant/logger";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import apiConstant from "../../../constant/apiConstant";
import ErrorModal from "../ErrorModal";
import CommonLoader from "../../../components/Loader";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
let error_title: string = "";
let error_desc: string = "";
interface Props {
  navigation?: any;
}
const Register: React.FC<Props> = ({ navigation }): ReactElement => {
  const dispatch = useDispatch();
  let seekerName = useSelector(getSeekerName());
  const [isLoading, setisLoading] = useState(false);
  const [email, setemail] = useState("");
  const [emailErrMsg, setemailErrMsg] = useState("");
  const [isemailError, setisemailError] = useState(false);
  const [phn, setPhn] = useState("");
  const [phnErrMsg, setPhnErrMsg] = useState("");
  const [isPhnError, setisPhnError] = useState(false);
  const [index, setIndex] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [routesForAll, setroutesForAll] = useState([
    { key: "first", title: "Email" },
    { key: "second", title: "Phone" },
  ]);
  const [routes] = useState(routesForAll);
  const [routesTab, setroutesTab] = useState("first");
  const [countryCode, setCountryCode] = useState("US");
  const [CountryCodeNumber, setCountryCodeNumber] = useState("1");
  const [countryData, setcountryData] = useState<any>();
  const [isChecked, setIsChecked] = useState(false);

  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });
  useEffect(() => {
    let us_CountryData = {
      cca2: "US",
      currency: ["USD"],
      callingCode: ["1"],
      region: "Americas",
      subregion: "North America",
      flag: "flag-us",
      name: "United States",
    };
    setcountryData(us_CountryData);
  }, []);
  const onSelect = (country: any) => {
    console.log("country", country?.callingCode?.[0]);
    setcountryData(country);
    setCountryCodeNumber(country?.callingCode?.[0]);
    setCountryCode(country.cca2);
  };
  const [toggleIdx, setToggleIdx] = useState(0);
  const emailValidate = (eml: any) => {
    // var pattern = /[`!#$%^&*()_\s+\=\[\]{};':"\\|,<>\/?~]/;
    // var pattern = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // if (!pattern.test(eml) || eml == "") {
    // setemail(eml);
    // setisemailError(false);
    // }
    var pattern = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (eml === "") {
      // Case 1: Allow user to clear text
      setemail(eml);
      setisemailError(false);
    } else if (/\s/.test(eml)) {
      // Case 2: Prevent spaces anywhere in the text
      setemail(eml);
      setisemailError(false);
    } else if (!pattern.test(eml)) {
      // Case 3: Has value but not matching regex
      setemail(eml);
      setisemailError(false);
    } else {
      // Case 4: Valid email according to regex
      setemail(eml);
      setisemailError(false);
    }
  };

  const emailValidation = () => {
    if (email.trim() === "") {
      setisemailError(true);
      setemailErrMsg("Please enter your email");
    } else if (!emailCheck(email)) {
      setisemailError(true);
      setemailErrMsg(strings?.emailvalidError);
    } else {
      Signup_api();
    }
  };
  const phoneValidate = () => {
    if (phn.trim() === "") {
      setisPhnError(true);
      setPhnErrMsg(strings?.phoneError);
    } else if (phn.length >= 10) {
      setisPhnError(false);
      setPhnErrMsg("");
      Signup_api();
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
    setPhn(phn.replace(/[^0-9]/g, ""));
  };

  useFocusEffect(() => {
    const currentRouteName = routes[index].key;
    setroutesTab(currentRouteName);
  });
  const Signup_api = async () => {
    setisLoading(true);
    try {
      let requestbody = {
        email: toggleIdx == 0 ? `${email.toLowerCase()}` : null,
        phoneNumber: toggleIdx !== 0 ? `${phn}` : null,
        countryCode: toggleIdx !== 0 ? "+" + `${CountryCodeNumber}` : null,
        flagCode: toggleIdx !== 0 ? `${countryCode}` : null,
        orgId: 0,
        name: seekerName || "User",
      };
      allActions.Auth.SignUpWithEmailAndPhone(
        dispatch,
        requestbody,
        "Signup_api",
        "?orgId=0"
      )
        .then((response: any) => {
          if (response.statusCode == 200) {
            setisLoading(false);
            setToasterDetails({
              showToast: true,
              code: 1,
              message: response?.message,
            });

            setTimeout(() => {
              navigation.navigate(navigationString?.OtpValidation, {
                from: "signup",
                type:
                  toggleIdx == 0
                    ? { isEmail: true, data: email.toLowerCase() }
                    : {
                        isEmail: false,
                        data: "+" + `${CountryCodeNumber}` + `${phn}`,
                        phoneNumber: toggleIdx !== 0 ? `${phn}` : null,
                        countryCode:
                          toggleIdx !== 0
                            ? "+" + `${countryData?.callingCode?.[0]}`
                            : null,
                        flagCode:
                          toggleIdx !== 0 ? `${countryData?.cca2}` : null,
                      },
              });
            }, 1000);
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
    } catch (error) {
      setisLoading(false);
      setToasterDetails({
        showToast: true,
        code: 0,
        message: error,
      });
    }
  };

  const LoginView = () => {
    return (
      <View style={styles.mailLoginView}>
        <CustomToggleBar
          data={appConstant.authTabData}
          itemContainerStyle={{ flex: 1 }}
          titleIndex={(index: any) => setToggleIdx(index)}
        />

        <View
          style={{ height: moderateScale(120), marginTop: moderateScale(5) }}
        >
          {toggleIdx == 0 ? (
            <>
              <CommonInput
                placeholder={strings.enterEmail}
                mainContainer={{
                  borderColor: colors.royalOrange,
                  marginTop: moderateScale(25),
                }}
                value={email}
                onChangeText={emailValidate}
                isError={isemailError}
                errorMsg={emailErrMsg}
                placeholderTextColor={colors.SurfCrest}
                backGroundColor={colors.SaltBox}
                borderColor={colors.royalOrange}
                isWidth={false}
                onFocus={onEmailFocus}
                inputText={{ color: colors.SurfCrest }}
                maxLength={30}
              />
            </>
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
                  onSelect={onSelect}
                  theme={{
                    onBackgroundTextColor: colors.SurfCrest,
                    backgroundColor: colors.themeColor,
                    primaryColorVariant: "grey",
                  }}
                  containerButtonStyle={{
                    borderColor: colors.royalOrange,
                    width: getCountryCodeNumberLength(CountryCodeNumber?.length)
                      ?.widthInput,
                  }}
                />

                <View
                  style={[
                    styles?.btmDrop_,
                    {
                      left: getCountryCodeNumberLength(
                        CountryCodeNumber?.length
                      )?.icon,
                    },
                  ]}
                >
                  <BtmDropdownIcon style={styles?.btm_} />
                </View>

                <View style={{ marginRight: moderateScale(10) }} />
                <TextInput
                  placeholder={strings?.enterPhone}
                  value={phn}
                  onChangeText={(phn: any) => PhnValidate(phn)}
                  placeholderTextColor={colors.SurfCrest}
                  maxLength={maxLength?.maxLengthForPhoneNumber}
                  keyboardType={"numeric"}
                  style={styles?.number_}
                />
              </View>
              {isPhnError && <Text style={styles?.Phone_err}>{phnErrMsg}</Text>}
            </>
          )}
        </View>
        {toggleIdx !== 0 && (
          <OnboardingConsent
            navigation={navigation}
            setIsChecked={setIsChecked}
            isChecked={isChecked}
          />
        )}
        <CommonButton
          btnName={"Send me the code "}
          btnNameStyle={styles.loginButtonText}
          mainContainer={{
            width: "auto",
            backgroundColor:
              toggleIdx == 0
                ? colors?.polishedPine
                : !isChecked
                ? colors?.polishedPineOP2
                : colors?.polishedPine,
          }}
          onPress={() => (toggleIdx == 0 ? emailValidation() : phoneValidate())}
          isLoading={isLoading}
          disabled={toggleIdx == 0 ? false : !isChecked}
        />
      </View>
    );
  };
  async function onAppleButtonPress() {
    let appleData: any = await loginWithApple();

    if (appleData) {
      console.log("appleData?.fullName?.givenName-->", appleData);
      let requestbody = {
        idToken: `${appleData?.identityToken}`,
        userInfoData: {
          id: `${appleData?.user}`,
          email: !appleData?.email ? "" : `${appleData?.email}`,
          firstName: !appleData?.fullName?.givenName
            ? ""
            : `${appleData?.fullName?.givenName}`,
          lastName: "",
          provider: "apple",
        },
        credentialType: appConstant.credentialType.apple,
      };
      logger("requestbody", requestbody, "appleData?.email", appleData?.email);
      validateAPI(appleData?.email || appleData?.user, requestbody);
    }
  }
  const GoogleSigin = async () => {
    let authResponse: any = await loginWithGoogle();

    if (authResponse) {
      let requestbody = {
        idToken: `${authResponse?.idToken}`,
        userInfoData: {
          id: `${authResponse?.user?.id}`,
          email: `${authResponse?.user?.email}`,
          firstName: authResponse?.user?.name
            ? `${authResponse?.user?.name}`
            : seekerName || "",
          lastName: "",
          provider: "google",
        },
        credentialType: appConstant.credentialType.google,
      };

      validateAPI(authResponse?.user?.email, requestbody);
    }
  };

  const validateAPI = (email: any, requestbody: any) => {
    const url = apiConstant().ValidateUserEmail + `/${email}`;
    setLoader(true);
    fetch(url)
      .then((response) => {
        setLoader(false);

        if (!response.ok) {
          // Handle non-200 responses
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setLoader(false);

        if (data?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          if (data?.data) {
            error_title = "Email Already in Use";
            error_desc =
              "This email is already used by another sign-in method. Please try logging in using that method.";
            setIsModal(true);
            GoogleSignin.signOut();
          } else {
            restApiToLogin(requestbody);
          }
        } else {
          error_title = "Error";
          error_desc = "Something went wrong";
          setIsModal(true);
        }
        console.log("Data received:", data);
      })
      .catch((error) => {
        setLoader(false);
        console.error("Fetch error:", error);
      });
  };
  const restApiToLogin = async (requestbody: any) => {
    try {
      console.log("Request Body:", requestbody);
      setisLoading(true);
      const requestbodyData = await requestbody;
      const provider = requestbodyData?.userInfoData?.provider;
      const apiType =
        provider === "google"
          ? "LoginWithGoogle_api"
          : provider === "apple"
          ? "LoginWithApple_api"
          : null;

      if (!apiType) {
        throw new Error("Invalid provider");
      }
      const loginResponse = await allActions.Auth.LoginApi(
        dispatch,
        requestbody,
        apiType,
        "register"
      );
      console.log("Login Response:", loginResponse);
      if (loginResponse?.statusCode === 200) {
        console.log("Login Successful!");
      } else {
        setToasterDetails({
          showToast: true,
          type: 0,
          message: loginResponse?.message || strings?.somethingWrong,
        });
      }
    } catch (error: any) {
      console.error("Error in restApiToLogin:", error);
      setToasterDetails({
        showToast: true,
        type: 0,
        message: error.message || strings?.unexpectedError,
      });
    } finally {
      setisLoading(false);
    }
  };

  return (
    <ScreenWrapper statusBarColor={colors.backgroundTheme}>
      <HeaderSignUp navigation={navigation} />
      <KeyboardAwareScrollView>
        <View style={styles?.innerView}>
          <WelcomeView seekerName={seekerName} />
          {LoginView()}
          <SocialLogin
            onGoogleLogin={GoogleSigin}
            onAppleLogin={() => onAppleButtonPress()}
            mainContainer={styles?.mConatiner}
          />
        </View>
      </KeyboardAwareScrollView>
      <ChangeBtmScreen
        content={strings.HaveAccount}
        title={"Log in now"}
        onPress={() => navigation.navigate(navigationString?.LoginInput)}
        mainContainer={{ marginBottom: moderateScale(20) }}
      />
      {toasterDetails?.showToast && (
        <ToastApiResponse
          data={toasterDetails}
          setToasterDetails={setToasterDetails}
          code={toasterDetails?.code}
          message={toasterDetails?.message}
        />
      )}

      <ErrorModal
        isVisible={isModal}
        title={error_title}
        description={error_desc}
        setIsModal={setIsModal}
      />
      {loader && <CommonLoader />}
    </ScreenWrapper>
  );
};

export default Register;
