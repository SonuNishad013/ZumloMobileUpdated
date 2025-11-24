import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import colors from "../../../../constant/colors";
import CommonInput from "../../../../components/Inputs/commonInput";
import CommonButton from "../../../../components/Buttons/commonButton";
import HeaderTitleDescription from "../commonComponent/HeaderTitleDescription";
import { strings } from "../../../../constant/strings";
import {
  CloseIcon,
  EyesGreenIcon,
  EyesOpen,
  GreenArrow,
  Successmark,
} from "../../../../assets";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./styles";
import { moderateScale } from "../../../../constant/responsiveStyle";
import PasswordToolTip from "./PasswordToolTip";

const CreateNewPasswordView = ({
  ispwdTip,
  value,
  setValue,
  passwordShow,
  setpasswordShowShow,
  setispwdTip,
  value2,
  setValue2,
  confirmPasswordShow,
  setConfirmPasswordShow,
  validation,
  navigation,
  from,
  isLoading,
  setnewPassCompleted,
}: any) => {
  const [password, setPassword] = useState("");

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isLongEnough = password.length >= 8;
  useEffect(() => {
    setnewPassCompleted(
      hasUppercase &&
        hasLowercase &&
        hasNumber &&
        hasSpecialChar &&
        isLongEnough
    );
  }, [hasUppercase, hasLowercase, hasNumber, hasSpecialChar, isLongEnough]);
  return (
    <KeyboardAwareScrollView
      style={styles.mainContainer}
      showsVerticalScrollIndicator={false}
    >
      <HeaderTitleDescription
        title={"Set your password"}
        description={
          from == "forgotPwdVerifyOTP"
            ? strings.newPasswordDes
            : "Almost there! Just create a password to make this space yours."
        }
        isBackIcon={false}
        mainContainer={{ marginTop: moderateScale(30) }}
        titleTxtStyle={{ marginTop: moderateScale(5) }}
      />
      <View style={{ marginTop: moderateScale(50) }}>
        {ispwdTip && (
          <PasswordToolTip
            hasUppercase={hasUppercase}
            hasLowercase={hasLowercase}
            hasNumber={hasNumber}
            hasSpecialChar={hasSpecialChar}
            isLongEnough={isLongEnough}
          />
        )}
        <View style={{ marginTop: moderateScale(10) }} />
        <CommonInput
          mainContainer={styles.cmnInputStyle}
          placeholder={strings.enterPassword}
          value={value.password}
          eyeIcon={true}
          onChangeText={(val: any) => {
            setPassword(val);
            setValue({ ...value, password: val, passwordError: false });
          }}
          errorMsg={value?.passwordErrorMsg}
          isError={value?.passwordError}
          inputText={styles.cmnInputTxtStyle}
          placeholderTextColor={colors.SurfCrest}
          SVGImage={!passwordShow ? EyesOpen : EyesGreenIcon}
          secureTextEntry={passwordShow}
          onPressIcon={() => setpasswordShowShow(!passwordShow)}
          backGroundColor={colors.SaltBox}
          borderColor={colors.royalOrange}
          isWidth={false}
          onFocus={() => setispwdTip(true)}
          onBlur={() => setispwdTip(false)}
        />

        <View style={{ marginTop: moderateScale(20) }} />

        <CommonInput
          mainContainer={styles.cmnInputStyle}
          placeholder={strings.reEnterPassword}
          value={value2?.confirmPassword}
          onChangeText={(val: any) =>
            setValue2({
              ...value2,
              confirmPassword: val,
              confirmPasswordError: false,
            })
          }
          eyeIcon={true}
          errorMsg={value2?.confirmPasswordErrorMsg}
          isError={value2?.confirmPasswordError}
          inputText={styles.cmnInputTxtStyle}
          placeholderTextColor={colors.SurfCrest}
          SVGImage={!confirmPasswordShow ? EyesOpen : EyesGreenIcon}
          secureTextEntry={confirmPasswordShow}
          onPressIcon={() => setConfirmPasswordShow(!confirmPasswordShow)}
          backGroundColor={colors.SaltBox}
          borderColor={colors.royalOrange}
          isWidth={false}
        />
      </View>
      <CommonButton
        btnNameStyle={styles?.comBtnNameStyle}
        btnName={"Save and continue"}
        onPress={validation}
        mainContainer={styles?.cmnBtnStyle}
        isLoading={isLoading}
      />
    </KeyboardAwareScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default CreateNewPasswordView;
