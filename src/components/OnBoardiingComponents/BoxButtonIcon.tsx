import {
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import {
  height,
  moderateScale,
  textScale,
  width,
} from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { formatSentenceCase } from "../../helper/sentenceCase";
import CustomImage from "../ImageRender";

interface Props {
  source?: any;
  title?: any;
  onPress?: () => void;
  button?: ViewStyle;
  image?: ImageStyle;
  text?: TextStyle;
  activeOpacity?: any;
  isIcon?: any;
  tintIconColor?: any;
  height?: any;
  width?: any;
  isTintColor?: any;
  imageStyleOut?: ViewStyle;
  forToggle?: boolean;
}
const BoxButtonIcon: React.FC<Props> = ({
  source,
  title,
  onPress,
  button,
  image,
  text,
  activeOpacity,
  isIcon = true,
  tintIconColor,
  width = moderateScale(22),
  height = moderateScale(22),
  isTintColor,
  imageStyleOut,
  forToggle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, button]}
      activeOpacity={activeOpacity ?? 1}
    >
      {isIcon && (
        <View
          style={{
            width: forToggle ? 22 : width,
          }}
        >
          <CustomImage
            source={source}
            width={moderateScale(width)}
            height={moderateScale(height)}
            style={styles?.image}
            tintColor={tintIconColor}
            // mainContainer={styles?.image}
            mainContainer={[styles?.image, imageStyleOut]}
            isTintColor={isTintColor}
          />
        </View>
      )}
      {title && (
        <Text style={[styles.text, text]}>{formatSentenceCase(title)}</Text>
      )}
    </TouchableOpacity>
  );
};

export default BoxButtonIcon;

const styles = StyleSheet.create({
  button: {
    borderWidth: moderateScale(1),
    borderColor: colors?.SurfCrest,
    padding: moderateScale(10),
    borderRadius: moderateScale(15),
    gap: moderateScale(10),
    alignItems: "center",
    height: moderateScale(109),
    width: moderateScale(102),
    justifyContent: "center",
    // backgroundColor: isSelected
    //   ? colors?.polishedPine
    //   : "transparent",
  },
  image: {
    width: moderateScale(22),
    height: moderateScale(22),
  },
  text: {
    fontSize: textScale(10),
    fontWeight: "600",
    color: colors?.SurfCrest,
    textAlign: "center",
  },
});
