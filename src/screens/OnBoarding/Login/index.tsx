import { Platform, ScrollView } from "react-native";
import React, { ReactElement, useEffect, useState } from "react";
import navigationString from "../../../navigation/navigationString";
import colors from "../../../constant/colors";
import { emailCheck, passwordCheck } from "../../../validations/validation";
import { strings } from "../../../constant/strings";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import styles from "./styles";
import SocialLogin from "../Register/SocialLogin";
import ChangeBtmScreen from "../ForgotPassword/commonComponent/ChangeBtmScreen";
import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import { loginWithApple } from "../../../helper/appleAuth";
import { loginWithGoogle } from "../../../helper/googleAuth";
import LoginView from "./LoginView";
import CommonHeader from "../../../components/Header/commonHeader";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import appConstant, { STATUS_CODES } from "../../../constant/appConstant";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import { useFocusEffect } from "@react-navigation/native";
import * as AsyncStorage from "../../../utils/Storage/AsyncStorage";
import DeviceInfo from "react-native-device-info";
import apiConstant from "../../../constant/apiConstant";
import CommonLoader from "../../../components/Loader";
import ErrorModal from "../ErrorModal";
let error_title: string = "";
let error_desc: string = "";
interface Props {
  navigation?: any;
}
const LoginInput: React.FC<Props> = ({ navigation }): ReactElement => {
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [logInType, setLogInType] = useState(0);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [CountryCodeNumber, setCountryCodeNumber] = useState("1");
  const [countryCode, setCountryCode] = useState<string>("US");
  const [countryData, setcountryData] = useState<any>();
  const [loader, setLoader] = useState(false);

  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });
  const [FCMToken, setFCMToken] = useState<string>("");
  useFocusEffect(
    React.useCallback(() => {
      getFCMToken();
      allActions.Auth.saveName(dispatch, "");
    }, [])
  );
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
  const getFCMToken = async () => {
    const normalizeTimeZone = (tz: string) => {
      if (tz === "Asia/Calcutta") return "Asia/Kolkata";
      return tz;
    };

    const timeZone = normalizeTimeZone(
      Intl.DateTimeFormat().resolvedOptions().timeZone
    );

    let fcmToken = await AsyncStorage?.getItem(AsyncStorage?.FCM_TOKEN);
    console.log("fcmToken is here", JSON?.parse(fcmToken));

    let model = DeviceInfo.getModel();
    let brand = DeviceInfo.getBrand();
    let systemVersion = DeviceInfo.getSystemVersion();
    let version = DeviceInfo?.getVersion();
    let deviceDetails = `${Platform.OS} ${systemVersion} ${brand} ${model} version:${version} `;
    console.log("deviceDetails", deviceDetails);
    setFCMToken(JSON?.parse(fcmToken));
  };
  // const FCMToken=
  const onSelect = (country: any) => {
    console.log("country-=-=>", country);

    setcountryData(country);
    setCountryCodeNumber(country?.callingCode?.[0]);
    setCountryCode(country.cca2);
  };
  const [emailLogin, setEmailLogin] = useState({
    email: "",
    emailError: false,
    emailErrorMsg: "",
  });
  const [password1, setPassword1] = useState({
    password: "",
    passwordError: false,
    passwordErrorMsg: "",
  });
  const [phoneLogin, setPhoneLogin] = useState({
    phone: "",
    phoneError: false,
    phoneErrorMsg: "",
  });

  async function onAppleButtonPress() {
    let appleData: any = await loginWithApple();
    if (appleData) {
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
        orgId: 0,
      };
      validateAPI(appleData?.email || appleData?.user, requestbody);
    }
  }
  const onGoogleSignIn = async () => {
    GoogleSignin.signOut();
    let authResponse: any = await loginWithGoogle();

    if (authResponse) {
      let requestbody = {
        idToken: `${authResponse?.idToken}`,
        userInfoData: {
          id: `${authResponse?.user?.id}`,
          email: `${authResponse?.user?.email}`,
          firstName: `${authResponse?.user?.name}`,
          lastName: "",
          provider: "google",
        },
        credentialType: appConstant.credentialType.google,
        orgId: 0,
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
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setLoader(false);

        if (data?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          if (data?.data == false) {
            error_title = "Email not found";
            error_desc =
              "No email found for this Google email. Please register first before logging in.";
            setIsModal(true);
          } else {
            restApiToLogin(requestbody);
          }
        } else {
          error_title = "Error";
          error_desc = "Something went wrong";
          setIsModal(true);
        }
      })
      .catch((error) => {
        setLoader(false);
        console.error("Fetch error:", error);
      });
  };
  const validateEmail = () => {
    if (!emailCheck(emailLogin?.email)) {
      setEmailLogin({
        ...emailLogin,
        emailError: true,
        emailErrorMsg: strings?.emailvalidError,
      });
    }
    if (emailLogin?.email === "") {
      setEmailLogin({
        ...emailLogin,
        emailError: true,
        emailErrorMsg: strings?.emailError,
      });
    }
    if (!passwordCheck(password1?.password)) {
      setPassword1({
        ...password1,
        passwordError: true,
        passwordErrorMsg: strings?.passwordValidError,
      });
    }
    if (password1?.password == "") {
      setPassword1({
        ...password1,
        passwordError: true,
        passwordErrorMsg: strings?.passwordError,
      });
    }
    if (
      emailLogin?.email !== "" &&
      emailCheck(emailLogin?.email) &&
      password1?.password !== "" &&
      passwordCheck(password1?.password)
    ) {
      let emailInfo = {
        email: `${emailLogin?.email.toLowerCase()}`,
        password: `${password1?.password}`,
        credentialType: appConstant.credentialType.email,
        orgId: 0,
      };
      restApiToLogin(emailInfo);
    }
  };
  const validatePhone = () => {
    if (phoneLogin.phone.length < 10 && phoneLogin.phone.length > 0) {
      setPhoneLogin({
        ...phoneLogin,
        phoneError: true,
        phoneErrorMsg: strings?.phoneValidError,
      });
    }
    if (phoneLogin?.phone == "") {
      setPhoneLogin({
        ...phoneLogin,
        phoneError: true,
        phoneErrorMsg: strings?.phoneError,
      });
    }
    if (!(phoneLogin.phone.length < 10) && phoneLogin?.phone !== "") {
      let phoneInfo = {
        phoneNumber: `${phoneLogin?.phone}`,
        countryCode: "+" + `${CountryCodeNumber}`,
        flagCode: `${countryCode}`,
        credentialType: appConstant.credentialType.phone,
        orgId: 0,
      };
      restApiToLogin(phoneInfo);
    }
  };

  const restApiToLogin = async (requestbody: any) => {
    setisLoading(true);
    const requestbodyData = await requestbody;
    let loginResponse;
    if (requestbodyData?.userInfoData?.provider == "google") {
      loginResponse = await allActions.Auth.LoginApi(
        dispatch,
        requestbody,
        "LoginWithGoogle_api",
        "login"
      );
    } else if (requestbodyData?.userInfoData?.provider == "apple") {
      loginResponse = await allActions.Auth.LoginApi(
        dispatch,
        requestbody,
        "LoginWithApple_api",
        "login"
      );
    }
    if (Object.keys(requestbodyData)[0] == "email") {
      loginResponse = await allActions.Auth.LoginApi(
        dispatch,
        requestbody,
        "EmailLogin_api",
        "login"
      );
    }
    if (Object.keys(requestbodyData)[0] == "phoneNumber") {
      loginResponse = await allActions.Auth.LoginApi(
        dispatch,
        requestbody,
        "LoginPhone_api",
        "login"
      );
    }

    setisLoading(false);
    if (loginResponse) {
      if (loginResponse.statusCode == 200) {
        if (Object.keys(requestbodyData)[0] == "phoneNumber") {
          setTimeout(() => {
            navigation.navigate(navigationString?.OtpValidation, {
              from: "Validate_Phone",
              type: {
                isEmail: true,
                data: "+" + `${CountryCodeNumber}${phoneLogin?.phone}`,
                phoneNumber: `${phoneLogin?.phone}`,
                countryCode: "+" + `${countryData?.callingCode?.[0]}`,
                flagCode: `${countryData?.cca2}`,
              },
            });
          }, 2000);
        } else {
          setisLoading(false);
        }

        setToasterDetails({
          showToast: true,
          code: 1,
          message: loginResponse?.message,
        });

        setisLoading(false);
      } else {
        setisLoading(false);
        setToasterDetails({
          showToast: true,
          code: 0,
          message: loginResponse?.message,
        });
      }
    }
  };

  return (
    <ScreenWrapper statusBarColor={colors.backgroundTheme}>
      <CommonHeader
        headerName={strings.login}
        onBackPress={() => navigation.goBack()}
        mainContainer={styles?.containerHeader}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <LoginView
          navigation={navigation}
          logInType={logInType}
          setLogInType={setLogInType}
          emailLogin={emailLogin}
          setEmailLogin={setEmailLogin}
          password1={password1}
          isPasswordVisible={isPasswordVisible}
          setPassword1={setPassword1}
          setPasswordVisible={setPasswordVisible}
          countryCode={countryCode}
          onSelectCoutryCode={onSelect}
          phoneLogin={phoneLogin}
          setPhoneLogin={setPhoneLogin}
          onPressLogin={() =>
            logInType == 0 ? validateEmail() : validatePhone()
          }
          isLoading={isLoading}
          CountryCodeNumber={CountryCodeNumber}
        />
        <SocialLogin
          onGoogleLogin={onGoogleSignIn}
          onAppleLogin={() => onAppleButtonPress()}
        />
        <ChangeBtmScreen
          title={"Create an account"}
          content={"New here?"}
          onPress={() => navigation.navigate(navigationString.SeekerName)}
          mainContainer={styles?.changeBtmScreenStyle}
        />
      </ScrollView>
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

export default LoginInput;
