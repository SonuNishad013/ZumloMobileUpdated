import React, { useEffect, useRef, useState } from "react";
import { View, ImageBackground, Text, StyleSheet, Animated } from "react-native";
import {
  moderateScale,
  height,
  textScale,
  width,
} from "../../../../constant/responsiveStyle";
import { imagePath } from "../../../../assets/png/imagePath";
import colors from "../../../../constant/colors";
import { strings } from "../../../../constant/strings";
import {
  validateNumaricPassword,
  validatePassword,
  validateSmallCasePassword,
  validateSymbollPassword,
  validateUpperCasePassword,
} from "../../../../validations/validation";
const ToolTip = ({ passwordVal, isNewPassCompleted }: any) => {
  const [newPassword, setNewPassword] = useState("");
  const [newPassError, setNewPassError] = useState(true);
  const [newLowercasePassError, setNewLowercasePassError] = useState(true);
  const [newNumberError, setNewNumberError] = useState(true);
  const [newSymbolError, setNewSymbolError] = useState(true);
  const [newPassComplete, setNewPassComplete] = useState(false);
  const [newIsMinCharError, setNewIsMinCharError] = useState(false);
  const [disabled, setDisabled] = useState(true);

  // Scale animation
  const scaleAnim = useRef(new Animated.Value(0)).current; // Start at scale 0 (hidden)

  useEffect(() => {
    onPassword(passwordVal);
    scaleIn(); // Trigger the scale animation when the component is mounted
  }, [passwordVal]);

  useEffect(() => {
    if (newPassComplete) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [newPassComplete]);

  const onPassword = (Password: any) => {
    if (Password.trim() !== null) {
      setNewPassword(Password);

      if (validateUpperCasePassword(Password)) {
        setNewPassError(false);
      } else {
        setNewPassError(true);
      }

      if (validateSmallCasePassword(Password)) {
        setNewLowercasePassError(false);
      } else {
        setNewLowercasePassError(true);
      }

      if (validateNumaricPassword(Password)) {
        setNewNumberError(false);
      } else {
        setNewNumberError(true);
      }

      if (validateSymbollPassword(Password)) {
        setNewSymbolError(false);
      } else {
        setNewSymbolError(true);
      }

      if (Password.length >= 8) {
        setNewIsMinCharError(false);
      } else {
        setNewIsMinCharError(true);
      }

      newPassAllCheck(Password);
    }
  };

  const newPassAllCheck = (Password: any) => {
    if (validatePassword(Password) && Password.length >= 8) {
      setNewPassComplete(true);
      isNewPassCompleted(true);
    } else {
      isNewPassCompleted(false);
      setDisabled(true);
      setNewPassComplete(false);
    }
  };

  // Scale-in animation
  const scaleIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 1, // Scale to full size
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  // Scale-out animation (if needed)
  const scaleOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 0, // Scale down to 0 (hidden)
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <ImageBackground
        style={{
          height: height / 8,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
        resizeMode={"stretch"}
        source={imagePath.PasswordCheck}
      >
        <View style={styles.container}>
          <View
            style={{
              justifyContent: "space-between",
              height: height / 12,
              width: "95%",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: textScale(14),
                color: colors.darkPrussianBlue,
              }}
            >
              {strings.pwdPattern}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "95%",
                height: moderateScale(15),
              }}
            >
              <Text
                style={{
                  fontSize: textScale(10),
                  fontWeight: "600",
                  color: newPassError ? colors.white : colors.backIconBg,
                }}
              >
                1 Capital Letter
              </Text>
              <Text
                style={{
                  fontSize: textScale(10),
                  color: colors.surfCrestLight,
                }}
              >
                {` | `}
              </Text>
              <Text
                style={{
                  fontSize: textScale(10),
                  fontWeight: "600",
                  color: newLowercasePassError
                    ? colors.white
                    : colors.backIconBg,
                }}
              >
                1 Small Letter
              </Text>
              <Text
                style={{
                  fontSize: textScale(10),
                  color: colors.surfCrestLight,
                }}
              >
                {` | `}
              </Text>
              <Text
                style={{
                  fontSize: textScale(10),
                  fontWeight: "600",
                  color: newNumberError ? colors.white : colors.backIconBg,
                }}
              >
                1 Number
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "95%",
                height: moderateScale(15),
              }}
            >
              <Text
                style={{
                  fontSize: textScale(10),
                  fontWeight: "600",
                  color: newSymbolError ? colors.white : colors.backIconBg,
                }}
              >
                1 Symbol
              </Text>
              <Text
                style={{
                  fontSize: textScale(10),
                  color: colors.surfCrestLight,
                  marginHorizontal: moderateScale(15),
                }}
              >
                {` | `}
              </Text>
              <Text
                style={{
                  fontSize: textScale(10),
                  fontWeight: "600",
                  color: newIsMinCharError
                    ? colors.white
                    : colors.backIconBg,
                }}
              >
                8 Letters
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </Animated.View>
  );
};

export default ToolTip;

const styles = StyleSheet.create({
  container: {
    // Add your container styles if necessary
  },
});
