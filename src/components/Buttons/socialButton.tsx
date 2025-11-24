import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";

interface Props {
  mainContainer?: ViewStyle;
  onPress?: () => void;
  SVGImage?: any;
}

const SocialButton: React.FC<Props> = ({
  mainContainer,
  onPress,
  SVGImage,
}) => {
  return (
    <TouchableOpacity
      style={[styles.mainContainer, mainContainer]}
      onPress={onPress}
    >
      <SVGImage
        height={`${moderateScale(26)}`}
        width={`${moderateScale(26)}`}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    height: moderateScale(56),
    // width: moderateScale(105),
    backgroundColor: colors.white,
    borderRadius: moderateScale(28),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: moderateScale(0.5),
    borderColor: colors.brightGray,
    flex: 1,
  },
  btnNameStyle: {
    color: colors.prussianBlue,
    fontSize: textScale(14),
    fontWeight: "500",
  },
});
export default SocialButton;
