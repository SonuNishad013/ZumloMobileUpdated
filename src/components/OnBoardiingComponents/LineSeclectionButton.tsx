import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { imagePath } from "../../assets/png/imagePath";
import { formatSentenceCase } from "../../helper/sentenceCase";
import CustomImage from "../ImageRender";
import { capitalizeFirstLetter } from "../../validations/capitalizeFirstLetter";

interface Props {
  title?: any;
  touchStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  textStyle?: any;
  isImage?: boolean;
  onPress?: () => void;
  source?: any;
  isRightIcon?: any;
  tintIconColor?: any;
  mainContainer?: ViewStyle;
  isTintColor?: any;
  isFormateRequired?: boolean;
}
const LineSeclectionButton: React.FC<Props> = ({
  title,
  touchStyle,
  imageStyle,
  textStyle,
  isImage,
  onPress,
  source,
  isRightIcon,
  tintIconColor,
  mainContainer,
  isTintColor,
  isFormateRequired = true,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles?.touchStyle, touchStyle]}
    >
      {isImage && (
        <CustomImage
          source={source}
          width={moderateScale(22)}
          height={moderateScale(22)}
          style={styles?.imageStyle}
          tintColor={tintIconColor}
          mainContainer={mainContainer}
          isTintColor={isTintColor}
        />
      )}
      <Text style={[styles?.textStyle, textStyle]}>
        {isFormateRequired ? formatSentenceCase(title) : title}
      </Text>
      {isRightIcon && (
        <Image style={styles?.rightIconStyle} source={imagePath?.Tick} />
      )}
    </TouchableOpacity>
  );
};

export default LineSeclectionButton;

const styles = StyleSheet.create({
  touchStyle: {
    // height: moderateScale(56),
    flex: 1,
    backgroundColor: colors?.polishedPine,
    borderColor: colors?.SurfCrest,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(15),
    paddingHorizontal: moderateScale(15),
    marginBottom: moderateScale(10),
    flexDirection: "row",
    alignItems: "center",
    minHeight: moderateScale(60),
    paddingVertical: moderateScale(5),
    gap: moderateScale(15),
  },
  imageStyle: {
    height: moderateScale(22),
    width: moderateScale(22),
    tintColor: colors?.SurfCrest,
    marginRight: moderateScale(10),
  },
  textStyle: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.SurfCrest,
    marginRight: moderateScale(30),
    width: moderateScale(270),
  },
  rightIconStyle: {
    marginTop: moderateScale(10),
  },
});
