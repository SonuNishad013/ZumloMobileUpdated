import React from "react";
import { Image, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { moderateScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";

interface Props {
  mainContainer?: ViewStyle;
  onPress?: () => void;
  SvgIcon?: any;
  PngIcon?: any;
  iconStyle?: any;
  resizeMode?: any;
  iconShow?: any;
  activeOpacity?: number;
  tintColor?: any;
  disable?: boolean;
  isImageUrl?: any;
  url?: any;
}

const RoundButton: React.FC<Props> = ({
  mainContainer,
  onPress,
  SvgIcon,
  PngIcon,
  iconStyle,
  resizeMode,
  iconShow,
  activeOpacity,
  tintColor,
  disable = false,
  isImageUrl = false,
  url,
}) => {
  return (
    <TouchableOpacity
      style={[styles.mainContainer, mainContainer]}
      onPress={onPress}
      activeOpacity={activeOpacity ?? 0.8}
      disabled={disable}
    >
      {PngIcon ? (
        <Image
          style={iconStyle}
          source={isImageUrl ? { uri: url } : iconShow}
          resizeMode={resizeMode}
          tintColor={tintColor}
        />
      ) : (
        <SvgIcon />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: moderateScale(55),
    width: moderateScale(55),
    backgroundColor: colors?.SurfCrest,
    borderRadius: moderateScale(55),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: moderateScale(1),
  },
});
export default RoundButton;
