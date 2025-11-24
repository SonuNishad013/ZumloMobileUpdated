import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";

interface Props {
  source?: any;
  title?: any;
  onPress?: () => void;
  button?: ViewStyle;
  image?: ImageStyle;
  text?: TextStyle;
  activeOpacity?: any;
  isIcon?: any;
}
const MinBoxButtonIcon: React.FC<Props> = ({
  source,
  title,
  onPress,
  button,
  image,
  text,
  activeOpacity,
  isIcon = true,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, button]}
      activeOpacity={activeOpacity ?? 1}
    >
      {isIcon && (
        <Image
          source={source}
          resizeMode={"contain"}
          style={[styles.image, image]}
        />
      )}
      {title && <Text style={[styles.text, text]}>{title}</Text>}
    </TouchableOpacity>
  );
};

export default MinBoxButtonIcon;

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
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
