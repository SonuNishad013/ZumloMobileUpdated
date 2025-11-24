import { Platform, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import colors from "../../../constant/colors";
import { strings } from "../../../constant/strings";
import { moderateScale } from "../../../constant/responsiveStyle";
import { AppleIcon, FacebookIcon, GoogleIcon } from "../../../assets";
import SocialButton from "../../../components/Buttons/socialButton";

interface Props {
  onGoogleLogin?: () => void;
  onFacebookLogin?: () => void;
  onAppleLogin?: () => void;
  mainContainer?: ViewStyle;
}

const SocialLogin: React.FC<Props> = ({
  onGoogleLogin,
  onFacebookLogin,
  onAppleLogin,
  mainContainer,
}) => {
  return (
    <View style={mainContainer}>
      <View style={styles.separator}>
        <View style={styles.line} />
        <Text style={styles.text}>{"or log in with "}</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.socialButtonContainer}>
        <SocialButton SVGImage={GoogleIcon} onPress={onGoogleLogin} />
        {/* <SocialButton SVGImage={FacebookIcon} onPress={onFacebookLogin} /> */}
        {Platform.OS === "ios" && (
          <SocialButton SVGImage={AppleIcon} onPress={onAppleLogin} />
        )}
      </View>
    </View>
  );
};

export default SocialLogin;

const styles = StyleSheet.create({
  separator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: moderateScale(30),
  },
  line: {
    flex: 1,
    height: moderateScale(1),
    backgroundColor: "white",
  },
  text: {
    color: colors.white,
    marginHorizontal: moderateScale(6),
  },
  socialButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: moderateScale(25),
    gap: moderateScale(15),
  },
});
