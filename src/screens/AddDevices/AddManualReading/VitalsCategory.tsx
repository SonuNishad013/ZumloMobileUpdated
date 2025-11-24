import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";

interface Props {
  mainContainer?: ViewStyle;
  imageStyle?: ImageStyle;
  textStyle?: TextStyle;
  title?: any;
  image?: any;
  onPress?: () => void;
  isSvg?: boolean;
  SvgIcon?: any;
}

const VitalsCategory: React.FC<Props> = ({
  mainContainer,
  imageStyle,
  textStyle,
  title,
  image,
  onPress,
  isSvg = false,
  SvgIcon,
}) => {
  return (
    <TouchableOpacity
      style={[styles.mainContainer, mainContainer]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      {isSvg ? (
        <View style={styles.svgContainer}>
          {SvgIcon && (
            <SvgIcon height={moderateScale(27)} width={moderateScale(27)} />
          )}
        </View>
      ) : (
        <Image
          style={[styles.imageStyle, imageStyle]}
          source={image}
          resizeMode="contain"
        />
      )}
      <Text style={[styles.textStyle, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default VitalsCategory;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: moderateScale(126),
    backgroundColor: colors.SaltBox,
    marginTop: moderateScale(15),
    borderRadius: moderateScale(15),
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    height: moderateScale(40),
    width: moderateScale(40),
  },
  textStyle: {
    fontWeight: "600",
    fontSize: textScale(10),
    textAlign: "center",
    marginTop: moderateScale(7),
    color: colors.SurfCrest,
  },
  svgContainer: {
    height: moderateScale(27),
    width: moderateScale(27),
    alignItems: "center",
    justifyContent: "center",
  },
});
