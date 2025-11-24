import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import CommonButton from "../../../components/Buttons/commonButton";
import { strings } from "../../../constant/strings";
import CustomToggleBar from "../../../components/CustomToggleBar";
import CommonInput from "../../../components/Inputs/commonInput";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import CountryPicker from "react-native-country-picker-modal";
import styles from "./styles";
import colors from "../../../constant/colors";
import {
  BtmDropdownIcon,
  EyesGreenIcon,
  EyesOpen,
  GymIcon,
} from "../../../assets";
import navigationString from "../../../navigation/navigationString";
import appConstant from "../../../constant/appConstant";
import { getCountryCodeNumberLength } from "../../../helper/duration";
import { ButtonSentencecase } from "../../../helper/sentenceCase";
import OnboardingConsent from "../../../components/OnboardingConsent/OnboardingConsent";
import { maxLength } from "../../../utils/TextConfig";

const LoginView = ({
  logInType,
  setLogInType,
  emailLogin,
  setEmailLogin,
  password1,
  isPasswordVisible,
  setPassword1,
  setPasswordVisible,
  countryCode,
  onSelectCoutryCode,
  phoneLogin,
  setPhoneLogin,
  navigation,
  onPressLogin,
  isLoading,
  CountryCodeNumber,
}: any) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <Text style={styles.welcomeText}>{"It’s good to see you\nagain."}</Text>
      <Text style={styles.subwelcomeText}>
        {"Let’s pick up where you left off. "}
      </Text>
      <CustomToggleBar
        data={appConstant.authTabData}
        itemContainerStyle={{ flex: 1 }}
        titleIndex={(index: any) => setLogInType(index)}
      />
      {logInType == 0 ? (
        <>
          <CommonInput
            placeholder={strings.enterEmail}
            mainContainer={{
              marginTop: moderateScale(30),
            }}
            value={emailLogin?.email}
            inputText={{ color: colors.SurfCrest }}
            onChangeText={(eml: any) => {
              var pattern = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
              if (eml === "") {
                // Case 1: Allow user to clear text
                setEmailLogin({
                  ...emailLogin,
                  email: eml,
                  emailError: false, // no error on empty, user is still typing
                });
              } else if (/\s/.test(eml)) {
                // Case 2: Prevent spaces anywhere in the text
                setEmailLogin({
                  ...emailLogin,
                  email: emailLogin.email, // revert to previous valid value
                  emailError: true,
                });
              } else if (!pattern.test(eml)) {
                // Case 3: Has value but not matching regex
                setEmailLogin({
                  ...emailLogin,
                  email: eml,
                  emailError: true,
                });
              } else {
                // Case 4: Valid email according to regex
                setEmailLogin({
                  ...emailLogin,
                  email: eml,
                  emailError: false,
                });
              }
            }}
            maxLength={30}
            isError={emailLogin?.emailError}
            errorMsg={emailLogin?.emailErrorMsg}
            placeholderTextColor={colors.SurfCrest}
            backGroundColor={colors.SaltBox}
            borderColor={colors.royalOrange}
            isWidth={false}
          />
          <CommonInput
            placeholder={strings.enterPassword}
            mainContainer={{
              marginTop: !password1?.passwordError
                ? moderateScale(15)
                : moderateScale(20),
            }}
            SVGImage={!isPasswordVisible ? EyesGreenIcon : EyesOpen}
            secureTextEntry={!isPasswordVisible}
            value={password1?.password}
            inputText={{ color: colors.SurfCrest }}
            onChangeText={(pwd: any) => {
              setPassword1({
                ...password1,
                password: pwd,
                passwordError: false,
              });
            }}
            eyeIcon={true}
            isError={password1?.passwordError}
            errorMsg={password1?.passwordErrorMsg}
            onPressIcon={() => setPasswordVisible(!isPasswordVisible)}
            placeholderTextColor={colors.SurfCrest}
            backGroundColor={colors.SaltBox}
            borderColor={colors.royalOrange}
            isWidth={false}
            maxLength={16}
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
              onSelect={onSelectCoutryCode}
              theme={{
                onBackgroundTextColor: colors.SurfCrest,
                backgroundColor: colors.themeColor,
                primaryColorVariant: colors?.grey,
                fontSize: textScale(15),
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
              <BtmDropdownIcon
                style={{
                  marginLeft: moderateScale(5),
                }}
              />
            </View>
            <TextInput
              placeholder={strings?.enterPhone}
              value={phoneLogin?.phone}
              onChangeText={(phn: any) => {
                setPhoneLogin({
                  ...phoneLogin,
                  phone: phn.replace(/[^0-9]/g, ""),
                  phoneError: false,
                });
              }}
              placeholderTextColor={colors.SurfCrest}
              maxLength={maxLength?.maxLengthForPhoneNumber}
              keyboardType={"numeric"}
              style={styles?.textInputStylePhn}
            />
          </View>
          {phoneLogin?.phoneError && (
            <Text style={styles?.phnerrorTxt}>{phoneLogin?.phoneErrorMsg}</Text>
          )}
        </>
      )}
      {logInType == 0 && (
        <Text
          style={styles.forgetPwdView}
          onPress={() => navigation.navigate(navigationString.ForgotPassword)}
        >
          {ButtonSentencecase("Forgot your password?")}
        </Text>
      )}
      {logInType == 1 && (
        <OnboardingConsent
          navigation={navigation}
          setIsChecked={setIsChecked}
          isChecked={isChecked}
          mainContainer={styles?.consentContainerInRegisterScreen}
        />
      )}

      <CommonButton
        btnName={"Log in"}
        btnNameStyle={styles.loginButtonText}
        mainContainer={[
          styles?.btmBtnContainer,
          {
            width: "auto",
            backgroundColor:
              logInType == 0
                ? colors?.polishedPine
                : !isChecked
                ? colors?.polishedPineOP2
                : colors?.polishedPine,
          },
        ]}
        onPress={() => onPressLogin()}
        isLoading={isLoading}
        disabled={logInType == 0 ? false : !isChecked}
      />
    </>
  );
};

export default LoginView;
