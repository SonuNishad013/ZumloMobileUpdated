import React, { useState } from "react";
import { View, ImageBackground } from "react-native";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../constant/colors";
import CommonInput from "../../../../components/Inputs/commonInput";
import CommonButton from "../../../../components/Buttons/commonButton";
import HeaderTitleDescription from "../commonComponent/HeaderTitleDescription";
import navigationString from "../../../../navigation/navigationString";
import { strings } from "../../../../constant/strings";
import ChangeBtmScreen from "../commonComponent/ChangeBtmScreen";
import { emailCheck } from "../../../../validations/validation";
import { styles } from "./styles";
import { imagePath } from "../../../../assets/png/imagePath";
import { useDispatch } from "react-redux";
import allActions from "../../../../redux/actions";
import ToastApiResponse from "../../../../components/Toast/ToastApiResponse";
import { ButtonSentencecase } from "../../../../helper/sentenceCase";

interface Props {
  navigation?: any;
}
const ForgotPassword: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const [value, setValue] = useState<any>({
    email: "",
    emailError: false,
    emailErrorMsg: "",
  });

  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  const emailValdation = () => {
    if (value.email.trim() === "") {
      setValue({
        ...value,
        emailError: true,
        emailErrorMsg: strings?.emailError,
      });
    } else if (!emailCheck(value.email)) {
      setValue({
        ...value,
        emailError: true,
        emailErrorMsg: strings?.emailvalidError,
      });
    } else {
      forgotPasswordApi();
    }
  };
  const forgotPasswordApi = () => {
    setisLoading(true);

      let requestbody = {
        email: value?.email,
      };
      allActions.Auth.ForgotPasswordAPI(
        dispatch,
        requestbody,
        "ForgotPassword_api"
      )
        .then((response: any) => {
          setisLoading(false);
          if (response.statusCode == 200) {
            setToasterDetails({
              showToast: true,
              code: 1,
              message: response?.message,
            });
            setTimeout(() => {
              navigation?.navigate(navigationString?.OtpValidation, {
                from: "forgot_email",
                type: {
                  isEmail: true,
                  data: value?.email.toLowerCase(),
                  userToken: response?.data?.userId,
                },
              });
            }, 1000);
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
  const renderDetails = () => {
    return (
      <View style={styles.mainContainer}>
        <HeaderTitleDescription
          onBackPress={() => navigation.goBack()}
          title={ButtonSentencecase(strings?.ForgotPasswordTitle)}
          description={strings?.ForgotPasswordDes}
        />
        <View style={styles?.inputErrorContainer}>
          <CommonInput
            placeholder={strings?.enterEmail}
            placeholderTextColor={colors?.SurfCrest}
            mainContainer={styles.inputContainer}
            inputText={styles.inputText}
            value={value.email}
            onChangeText={(val: any) => {
              var pattern = /[`!#$%^&*()\s+\=\[\]{};':"\\|,<>\/?~]/;
              if (!pattern.test(val) || val == "") {
                setValue({ ...value, email: val, emailError: false });
              }
            }}
            isError={value?.emailError}
            errorMsg={value?.emailErrorMsg}
            backGroundColor={colors.SaltBox}
            borderColor={colors.royalOrange}
            isWidth={false}
          />
        </View>
        <CommonButton
          btnNameStyle={styles.btnTextStyle}
          btnName={strings?.sendOTP}
          onPress={() => emailValdation()}
          isLoading={isLoading}
          mainContainer={styles.buttonContainer}
        />
      </View>
    );
  };
  return (
    <ScreenWrapper statusBarColor={colors?.SaltBox}>
      <ImageBackground style={styles?.ibStyle} source={imagePath?.BgRight}>
        {renderDetails()}
        <ChangeBtmScreen
          content={strings?.rememberPassword}
          title={strings?.LOGIN}
          onPress={() => navigation.navigate(navigationString?.LoginInput)}
          mainContainer={styles?.btmBtnContainer}
        />
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

export default ForgotPassword;
