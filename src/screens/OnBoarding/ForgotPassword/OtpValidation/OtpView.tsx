import React, { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import HeaderTitleDescription from "../commonComponent/HeaderTitleDescription";
import { strings } from "../../../../constant/strings";
import colors from "../../../../constant/colors";
import { moderateScale } from "../../../../constant/responsiveStyle";
import CommonButton from "../../../../components/Buttons/commonButton";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
} from "react-native-confirmation-code-field";
import { styles } from "./styles";
import logger from "../../../../constant/logger";

const OtpView = ({
  from,
  type,
  navigation,
  onOTPchange,
  otpValue,
  OTPError,
  resendOtpCount,
  counter,
  isLoading,
  otpValidation,
  resendOtp,
  headerShow = true,
  btmBtn = true,
  timerTxtStyle,
  boxView,
  mainContainer,
}: any) => {
  let copiedDataFromType: any[] =
    headerShow &&
    Object?.keys(type).filter((itm: string) => itm === "phoneNumber"); //Having this condtion cause we are showing this component in multiple places and need to check the Header section first
  let copiedData: string | null | undefined = headerShow && from;
  function containsPhone(value: string | null | undefined): boolean {
    if (!value) return false;
    return value?.toLowerCase().includes("phone"); //Return boolean value
  }
  const [value, setValue] = useState("");

  const ref = useBlurOnFulfill({ value, cellCount: 6 });

  return (
    <View style={[styles?.mainContainer, mainContainer]}>
      {headerShow && (
        <HeaderTitleDescription
          onBackPress={() => navigation.goBack()}
          title={"Let’s make sure it’s\nreally you. "}
          description={`We’ve sent a 6-digit code to your ${
            containsPhone(copiedData) || !!copiedDataFromType?.length
              ? "phone"
              : "email"
          }.\nEnter it below to continue.`}
        />
      )}
      <CodeField
        ref={ref}
        value={otpValue}
        onChangeText={(code: string) => onOTPchange(code)}
        cellCount={6}
        rootStyle={{ marginTop: moderateScale(20) }}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete={Platform.select({
          android: "sms-otp",
          default: "one-time-code",
        })}
        testID="my-code-input"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[
              styles?.boxView,
              boxView,
              isFocused && styles?.isFocusedStyle,
              {
                borderColor:
                  index >= otpValue.length ? colors?.grey : colors?.royalOrange,
              },
            ]}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      {OTPError && <Text style={styles?.errorTxt}>{strings?.otpRequired}</Text>}
      {resendOtpCount < 4 ? (
        <View style={styles?.timerContainer}>
          <TouchableOpacity disabled={counter !== 0}>
            {counter != 0 ? (
              <Text
                style={[
                  styles?.timerTxtStyle,
                  timerTxtStyle,
                  { color: colors?.SlidersDull },
                ]}
              >
                {"Didn’t get it? Resend code in "}
                <Text style={styles?.counterTxt}>
                  {`${(counter % 60 ? counter % 60 : "00") + "s"}`}
                </Text>
              </Text>
            ) : (
              <Text
                onPress={() => resendOtp()}
                style={[styles?.timerTxtStyle, timerTxtStyle]}
              >
                {strings?.resendOTP}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      ) : (
        counter != 0 && (
          <Text
            style={{ color: colors?.royalOrange, marginTop: moderateScale(10) }}
          >
            {"Enter your otp within 5 min"}
            {/* `${(counter % 60 ? counter % 60 : "00") +
                    "s"
                    }`} */}
          </Text>
        )
      )}
      {btmBtn ? (
        <CommonButton
          onPress={() => otpValidation()}
          btnNameStyle={styles.btnTextStyle}
          btnName={"Continue"}
          isLoading={isLoading}
          mainContainer={styles?.actionBtn}
        />
      ) : null}
    </View>
  );
};

export default OtpView;
const getdescription = (key: any, type: any) => {
  switch (key) {
    case "forgot_email":
      return strings?.otpTitleEmail;
    case "signup":
      return type?.isEmail ? strings?.otpTitleEmail : strings?.otpTitlePhone;
    case "signin_phone":
      return strings?.otpTitlePhone;
    case "Validate_Phone":
      return strings?.otpTitlePhone;
    default:
      break;
  }
};
