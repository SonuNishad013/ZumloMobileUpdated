import React, { useEffect, useState } from "react";
import { ImageBackground } from "react-native";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../constant/colors";
import navigationString from "../../../../navigation/navigationString";
import { strings } from "../../../../constant/strings";
import ChangeBtmScreen from "../commonComponent/ChangeBtmScreen";
import { passwordCheck } from "../../../../validations/validation";
import { imagePath } from "../../../../assets/png/imagePath";
import { styles } from "./styles";
import allActions from "../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import _ from "underscore";
import CreateNewPasswordView from "./CreateNewPasswordView";
import { getSeekerName } from "../../../../redux/selector";
import ToastApiResponse from "../../../../components/Toast/ToastApiResponse";
import { environment } from "../../../../constant/appConstant";

interface Props {
  navigation?: any;
  route?: any;
}

const CreateNewPassword: React.FC<Props> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  let seekerName = useSelector(getSeekerName());
  const { from, type, purpose, id } = route?.params;

  const [ispwdTip, setispwdTip] = useState(false); // State for tooltip visibility
  const [passwordShow, setpasswordShowShow] = useState(true);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [isNewPassCompleted, setisNewPassCompleted] = useState(false);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  const [value, setValue] = useState({
    password: "",
    passwordError: false,
    passwordErrorMsg: "",
    passwordCompleted: false,
  });
  const [value2, setValue2] = useState({
    confirmPassword: "",
    confirmPasswordError: false,
    confirmPasswordErrorMsg: "",
    confirmPasswordCompleted: false,
  });

  const validatePassword = (password: any, setValue: any, strings: any) => {
    let errorMsg = "";
    let hasError = false;

    if (password.trim() === "") {
      hasError = true;
      errorMsg = strings?.passwordError;
    } else if (!passwordCheck(password)) {
      hasError = true;
      errorMsg = strings?.passwordValidError;
    }

    setValue((prevValue: any) => ({
      ...prevValue,
      passwordError: hasError,
      passwordErrorMsg: errorMsg,
      passwordCompleted: !hasError,
    }));
  };

  const validateConfirmPassword = (
    password: any,
    confirmPassword: any,
    setValue: any,
    strings: any
  ) => {
    let errorMsg = "";
    let hasError = false;

    if (confirmPassword.trim() === "") {
      hasError = true;
      errorMsg = "Please re-enter your password to confirm.";
    } else if (password !== confirmPassword) {
      hasError = true;
      errorMsg = "Passwords do not match";
    }
    console.log("hasError=-=>", hasError);

    if (hasError) {
      setValue((prevValue: any) => ({
        ...prevValue,
        confirmPasswordError: hasError,
        confirmPasswordErrorMsg: errorMsg,
        confirmPasswordCompleted: !hasError,
      }));
    } else {
      registerAPI();
    }
  };

  const passwordValidation = () =>
    validatePassword(value?.password, setValue, strings);
  const confirmPasswordValidation = () =>
    validateConfirmPassword(
      value?.password,
      value2?.confirmPassword,
      setValue2,
      strings
    );

  const validation = () => {
    passwordValidation();
    confirmPasswordValidation();
  };

  const registerAPI = () => {
    console.log("value", isNewPassCompleted);

    if (from === "forgotPwdVerifyOTP") {
      if (isNewPassCompleted) {
        if (value?.password == value2?.confirmPassword) {
          createNewPasswordAPI();
        } else {
          setValue2({
            ...value2,
            confirmPasswordError: true,
            confirmPasswordErrorMsg: strings?.samePasswordError,
          });
        }
      }
    } else {
      if (isNewPassCompleted) {
        if (value?.password == value2?.confirmPassword) {
          registerUserAPI();
        } else {
          setValue2({
            ...value2,
            confirmPasswordError: true,
            confirmPasswordErrorMsg: strings?.samePasswordError,
          });
        }
      }
    }
  };
  const createNewPasswordAPI = () => {
    setisLoading(true);

    let requestbody = {
      id: `${id}`,
      password: value?.password,
    };
    allActions.Auth.ResetPassword(dispatch, requestbody, "createNewPasswordAPI")
      .then((response: any) => {
        setisLoading(false);
        if (response.statusCode == 200) {
          navigation.navigate(navigationString?.PasswordChanged, {
            from: navigationString.CreateNewPassword,
            purpose,
          });
        } else {
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
  const registerUserAPI = () => {
    setisLoading(true);

    let requestbody =
      // email: type?.isEmail ? type?.data : null,
      // password: value?.password,
      // confirmPassword: value?.password,
      // // phoneNumber: !type?.isEmail ? type?.data : null,
      // organizationId: environment === "development" ? 3 : 1, // stage
      // firstName: seekerName,
      // lastName: "",
      // orgId: 1, //Auth.Register
      {
        email: type?.isEmail ? type?.data : null,
        password: value?.password,
        confirmPassword: value?.password,
        organizationId: 0,
        firstName: seekerName,
        lastName: "",
      };
    allActions.Auth.Register(dispatch, requestbody, "RegisteruserAPI")
      .then((response: any) => {
        console.log("response in REGISTERserApi", response);
        setisLoading(false);
        if (response.statusCode == 200) {
          // allActions.Auth.saveName(dispatch, "");
          // getClinicianDetailBySeekerEmail();
          navigation.navigate(navigationString?.PasswordChanged, {
            purpose: navigationString.CreateNewPassword,
          });
        } else {
          setToasterDetails({
            showToast: true,
            code: 0,
            message: response?.message,
          });
        }
      })
      .catch((err) => {
        // console.log("error in registerUserAPI", err);
        setisLoading(false);
        setToasterDetails({
          showToast: true,
          code: 0,
          message: err?.message,
        });
      });
  };

  const handlesetnewPassCompleted = (val: any) => {
    setisNewPassCompleted(val);
  };

  return (
    <ScreenWrapper statusBarColor={colors.SaltBox}>
      <ImageBackground
        style={styles?.bgImg}
        source={imagePath?.BgRight}
        resizeMode={"stretch"}
      >
        <CreateNewPasswordView
          ispwdTip={ispwdTip}
          value={value}
          setValue={setValue}
          passwordShow={passwordShow}
          setpasswordShowShow={setpasswordShowShow}
          setispwdTip={setispwdTip}
          value2={value2}
          setValue2={setValue2}
          confirmPasswordShow={confirmPasswordShow}
          setConfirmPasswordShow={setConfirmPasswordShow}
          validation={validation}
          navigation={navigation}
          from={from}
          isLoading={isLoading}
          setnewPassCompleted={handlesetnewPassCompleted}
        />

        {route?.params?.from !== "CreateNewPassword" ? (
          <ChangeBtmScreen
            content={strings.rememberPassword}
            title={strings.LOGIN}
            onPress={() => navigation.navigate(navigationString?.LoginInput)}
            mainContainer={styles?.btmBtnContainer}
          />
        ) : (
          <ChangeBtmScreen
            content={strings?.HaveAccount}
            title={"Log in"}
            onPress={() => navigation.navigate(navigationString?.LoginInput)}
            mainContainer={styles?.btmBtnContainer}
          />
        )}
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

export default CreateNewPassword;
