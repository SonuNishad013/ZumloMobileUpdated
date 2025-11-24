import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { PlusOrangeIcon } from "../../../assets";
import { strings } from "../../../constant/strings";
import { APPLY_STATUS } from "../../../constant/ENUM";
import { textLabelSize } from "../../../utils/TextConfig";
interface Props {
  onPickerPress?: any;
  source?: any;
  image?: ImageStyle;
  imageContainer1?: ViewStyle;
  imageContainer?: ViewStyle;
  errorMsg?: any;
}
const ImagePickerUI: React.FC<Props> = ({
  onPickerPress,
  source,
  image,
  imageContainer1,
  imageContainer,
  errorMsg,
}) => {
  return (
    <View style={[styles.imageContainer1, imageContainer1]}>
      <View style={[styles.imageContainer, imageContainer]}>
        <Image
          source={source}
          style={[styles.image, image]}
          resizeMode={APPLY_STATUS?.contain}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles?.touchableStyle}
        onPress={onPickerPress}
      >
        <PlusOrangeIcon />
      </TouchableOpacity>
      <Text
        style={[
          styles?.uploadText,
          { color: errorMsg ? colors?.royalOrange : colors?.SurfCrest },
        ]}
      >
        {errorMsg ? "Add a group photo." : "Add a group image"}
      </Text>
    </View>
  );
};

export default ImagePickerUI;

const styles = StyleSheet.create({
  imageContainer: {
    width: moderateScale(121),
    height: moderateScale(121),
    borderRadius: moderateScale(121),
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors?.polishedPine,
    borderWidth: moderateScale(1),
    borderColor: colors?.polishedPine,
  },
  imageContainer1: {
    width: moderateScale(121),
    height: moderateScale(121),
    borderRadius: moderateScale(121),
    alignItems: "center",
    alignSelf: "center",
  },
  image: {
    width: "95%",
    height: "95%",
    borderRadius: moderateScale(13),
  },
  touchableStyle: {
    position: "absolute",
    backgroundColor: colors?.SaltBox,
    height: moderateScale(35),
    width: moderateScale(35),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(17.5),
    right: moderateScale(-0),
    bottom: moderateScale(-0),
    borderWidth: moderateScale(1),
    borderColor: colors?.SurfCrest,
  },
  uploadText: {
    fontSize: textLabelSize?.subtTitleFont,
    fontWeight: "400",
    color: colors?.SurfCrest,
    marginTop: moderateScale(10),
  },
});
