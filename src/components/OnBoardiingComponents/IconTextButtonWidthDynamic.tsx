import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";
import React from "react";
import colors from "../../constant/colors";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import { formatSentenceCase } from "../../helper/sentenceCase";
import CustomImage from "../ImageRender";

interface Props {
  onPress?: () => void;
  title?: string;
  iconSource?: any;
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  textStyle?: TextStyle;
  isImage?: any;
  tintIconColor?: any;
  mainContainer?: any;
}

const IconTextButtonWidthDynamic: React.FC<Props> = ({
  onPress,
  title,
  iconSource,

  containerStyle,
  imageStyle,
  textStyle,
  isImage,
  tintIconColor,
  mainContainer,
}) => {
  return (
    console.log("iconSource=-=-=>", isImage),
    (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.container, containerStyle]}
      >
        {isImage && (
          <CustomImage
            source={iconSource}
            width={moderateScale(22)}
            height={moderateScale(22)}
            style={styles?.image}
            tintColor={tintIconColor}
            mainContainer={mainContainer}
          />
        )}
        <Text style={[styles.text, textStyle]}>
          {formatSentenceCase(title)}
        </Text>
      </TouchableOpacity>
    )
  );
};

export default IconTextButtonWidthDynamic;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors?.polishedPine,
    borderColor: colors?.SurfCrest,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(30),
    paddingRight: moderateScale(5),
    paddingLeft: moderateScale(10),
    marginBottom: moderateScale(10),
    flexDirection: "row",
    alignItems: "center",
    minHeight: moderateScale(45),
    paddingVertical: moderateScale(5),
    marginRight: moderateScale(5),
    gap: moderateScale(10),
  },
  image: {
    height: moderateScale(22),
    width: moderateScale(22),
    tintColor: colors?.SurfCrest,
    marginRight: moderateScale(10),
  },
  text: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.SurfCrest,
    marginRight: moderateScale(30),
  },
});
