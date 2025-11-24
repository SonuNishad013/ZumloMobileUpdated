import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { strings } from "../../constant/strings";
import colors from "../../constant/colors";
import {
  moderateScale,
  textScale,
  width,
} from "../../constant/responsiveStyle";
import navigationString from "../../navigation/navigationString";
interface OnboardingConsentProps {
  navigation: any;
  setIsChecked: (value: boolean) => void;
  isChecked?: boolean;
  mainContainer?: any;
}
const OnboardingConsent: React.FC<OnboardingConsentProps> = ({
  navigation,
  isChecked,
  setIsChecked,
  mainContainer,
}) => {
  return (
    <View style={[styles?.consentContainerInRegisterScreen, mainContainer]}>
      <TouchableOpacity
        onPress={() => setIsChecked(!isChecked)}
        style={styles?.consentCheckBox}
      >
        {isChecked && <Text style={{ color: colors?.SurfCrest }}>✓</Text>}
      </TouchableOpacity>

      <Text style={styles?.consentText}>
        {strings?.registerScreenConsent}
        <Text
          style={{ color: colors?.royalOrangeDark }}
          onPress={() =>
            navigation?.navigate(navigationString?.OnboardingPrivacyPolicy)
          }
        >
          {" "}
          {strings?.Privacy_Policy}
        </Text>
      </Text>
    </View>
  );
};

export default OnboardingConsent;

const styles = StyleSheet.create({
  consentContainerInRegisterScreen: {
    marginBottom: moderateScale(19),
    flexDirection: "row",
    gap: moderateScale(5),
    alignItems: "flex-start",
  },
  consentCheckBox: {
    height: moderateScale(16),
    width: moderateScale(16),
    borderWidth: 1,
    borderColor: colors?.SurfCrest,
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateScale(2),
  },
  consentText: {
    color: colors?.SurfCrest,
    width: width * 0.85,
    fontSize: textScale(13),
  },
});
