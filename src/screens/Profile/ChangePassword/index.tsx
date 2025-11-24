import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import CommonInput from "../../../components/Inputs/commonInput";
import { moderateScale } from "../../../constant/responsiveStyle";
import HeaderTitleDescription from "../../OnBoarding/ForgotPassword/commonComponent/HeaderTitleDescription";
import { strings } from "../../../constant/strings";
import { EyesGreenIcon1, EyesOpen1 } from "../../../assets";
import { passwordCheck } from "../../../validations/validation";
import CommonButton from "../../../components/Buttons/commonButton";
import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import CommonLoader from "../../../components/Loader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PasswordToolTip from "../../OnBoarding/ForgotPassword/CreateNewPassword/PasswordToolTip";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import { STATUS_CODES, TOAST_STATUS } from "../../../constant/appConstant";
import Header from "../../MoodTracking/Journal/Header";
interface Props {
  navigation?: any;
}
const fieldsData = [
  { field: "oldPassword" },
  { field: "newPassword" },
  { field: "confirmNewPassword" },
  {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  },
];
const ChangePassword: React.FC<Props> = ({ navigation }) => {
  const [isLoading, setisLoading] = useState(false);
  const dispatch: any = useDispatch();
  const [ispwdTip, setispwdTip] = useState(false);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  const [formState, setFormState] = useState<any>({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [formErrors, setFormErrors] = useState<any>({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    matchPassword: "",
  });
  const [eyeIcons, setEyeIcons] = useState<any>({
    oldPassword: true,
    newPassword: true,
    confirmNewPassword: true,
  });

  const validatePasswords = () => {
    let isValid = true;
    let errors = { ...formErrors };

    if (formState.oldPassword.trim() === "") {
      errors.oldPassword = "Let’s confirm it’s really you.";
      isValid = false;
    } else if (!passwordCheck(formState.oldPassword)) {
      errors.oldPassword = strings?.Please_enter_a_valid_old_password;
      isValid = false;
    } else {
      errors.oldPassword = "";
    }

    if (formState.newPassword.trim() === "") {
      errors.newPassword = "Pick something different from your last one.";
      isValid = false;
    } else if (!passwordCheck(formState.newPassword)) {
      errors.newPassword = strings?.Please_enter_a_valid_new_password;
      isValid = false;
    } else {
      errors.newPassword = "";
    }

    if (formState.confirmNewPassword.trim() === "") {
      errors.confirmNewPassword = "Just to be sure—both should match.";
      isValid = false;
    } else if (formState.newPassword !== formState.confirmNewPassword) {
      errors.confirmNewPassword = "Just to be sure—both should match.";
      isValid = false;
    } else {
      errors.confirmNewPassword = "";
    }

    if (formState.newPassword !== formState.confirmNewPassword) {
      errors.matchPassword = "Just to be sure—both should match.";
      isValid = false;
    } else {
      errors.matchPassword = "";
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validatePasswords()) return;
    setisLoading(true);
    let requestbody = {
      oldPassword: `${formState.oldPassword}`,
      newPassword: `${formState.newPassword}`,
    };
    allActions.seekerDetails
      .ChangePassword(dispatch, requestbody, API_FUN_NAMES?.changePassword)
      .then((response: any) => {
        setisLoading(false);
        if (response.statusCode == STATUS_CODES?.RESPONSE_OK) {
          setToasterDetails({
            showToast: true,
            code: TOAST_STATUS?.SUCCESS,
            message: response.message,
          });
          setTimeout(() => {
            navigation?.goBack();
          }, 2000);
        } else {
          setToasterDetails({
            showToast: true,
            code: TOAST_STATUS?.ERROR,
            message: response.message,
          });
        }
      })
      .catch((err) => {
        setToasterDetails({
          showToast: true,
          code: TOAST_STATUS?.ERROR,
          message: err.message,
        });
        setisLoading(false);
      });
  };

  // Event handlers
  const handleInputChange = (field: keyof typeof formState, value: string) => {
    setFormState((prevState: any) => ({ ...prevState, [field]: value }));
  };
  const toggleEyeIcon = (field: keyof typeof eyeIcons) => {
    setEyeIcons((prevIcons: any) => ({
      ...prevIcons,
      [field]: !prevIcons[field],
    }));
  };

  const renderInput = () => (
    <View style={styles.inputContainer}>
      {[
        "oldPassword",
        "newPassword",
        "confirmNewPassword",
        // "Enter current password",
        // "Create new password",
        // "Re-enter new password",
      ].map((field, index) => {
        return (
          <>
            {ispwdTip && field === "newPassword" && (
              <PasswordToolTip
                titleStyle={{
                  marginTop: moderateScale(0),
                }}
                criteriaContainer={{
                  marginTop: moderateScale(1),
                }}
                hasUppercase={/[A-Z]/.test(formState?.newPassword)}
                hasLowercase={/[a-z]/.test(formState?.newPassword)}
                hasNumber={/[0-9]/.test(formState?.newPassword)}
                hasSpecialChar={/[!@#$%^&*(),.?":{}|<>]/.test(
                  formState?.newPassword
                )}
                isLongEnough={formState?.newPassword?.length >= 8}
              />
            )}
            <CommonInput
              key={index}
              placeholder={
                field == "oldPassword"
                  ? "Enter current password"
                  : field == "newPassword"
                  ? "Create new password"
                  : "Re-enter new password"
              }
              placeholderTextColor={colors.SurfCrest}
              maxLength={28}
              mainContainer={styles.inputStyle}
              inputText={styles.inputTextStyle}
              eyeIcon
              SVGImage={eyeIcons[field] ? EyesGreenIcon1 : EyesOpen1}
              secureTextEntry={eyeIcons[field]}
              onPressIcon={() => toggleEyeIcon(field)}
              value={formState[field]}
              onChangeText={(value: any) => handleInputChange(field, value)}
              errorMsg={formErrors[field]}
              isError={!!formErrors[field]}
              backGroundColor={colors.SaltBox}
              borderColor={colors.royalOrange}
              onFocus={() => {
                field === "newPassword" && setispwdTip(true);
              }}
              onBlur={() => {
                field === "newPassword" && setispwdTip(false);
              }}
            />
          </>
        );
      })}
    </View>
  );

  const renderBtn = () => (
    <View style={styles.btnContainer}>
      <CommonButton
        btnNameStyle={styles.buttonTextStyle}
        btnName={"Update"}
        onPress={handleSubmit}
      />
    </View>
  );

  return (
    <ScreenWrapper statusBarColor={colors.SaltBox}>
      {/* <TouchableOpacity
        onPress={() => {
          Alert.alert("jhgv");
          navigation.goBack();
        }}
      >
        <Header />
      </TouchableOpacity> */}

      <View style={styles.mainContainer}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        >
          <HeaderTitleDescription
            mainContainer={{ marginTop: moderateScale(0) }}
            onBackPress={() => navigation.goBack()}
            title={"Change your password"}
            description={
              "For extra peace of mind, choose something new and uniquely yours."
            }
          />
          {renderInput()}
        </KeyboardAwareScrollView>
        {renderBtn()}
      </View>
      {isLoading && <CommonLoader />}
      {toasterDetails?.showToast && (
        <ToastApiResponse
          data={toasterDetails}
          setToasterDetails={setToasterDetails}
          code={toasterDetails?.code}
          message={toasterDetails?.message}
        />
      )}
    </ScreenWrapper>
  );
};
export default ChangePassword;
const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: moderateScale(20),
    alignSelf: "center",
    flex: 1,
    marginTop: moderateScale(20),
  },
  inputContainer: {
    alignSelf: "center",
    marginTop: moderateScale(25),
    gap: moderateScale(10),
  },
  btnContainer: {
    alignSelf: "center",
    marginTop: moderateScale(10),
    marginBottom: moderateScale(20),
  },
  inputStyle: {
    borderColor: colors.royalOrange,
    marginVertical: moderateScale(0),
    // width: "auto",
  },
  inputTextStyle: {
    color: colors.SurfCrest,
  },
  buttonTextStyle: {
    color: colors.SurfCrest,
  },
  errorText: {
    color: colors.darkErrorColor,
  },
  iconContainer: {
    alignSelf: "flex-end",
    bottom: moderateScale(100),
  },
});
