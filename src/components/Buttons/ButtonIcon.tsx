import { Image, ImageStyle, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { imagePath } from "../../assets/png/imagePath";

interface Props {
    container?:ViewStyle
    imageStyle?:ImageStyle
    onPress?:()=>void
}
const ButtonIcon: React.FC<Props> = ({container,imageStyle,onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
    <View style={[styles.container,container]}>
      <Text style={styles.text}>{"Recipe"}</Text>
      <Image
        style={[styles.imageStyle,imageStyle]}
        source={imagePath?.EggIcon}
        resizeMode="contain"
      />
    </View>
    </TouchableOpacity>
  );
};

export default ButtonIcon;

const styles = StyleSheet.create({
  container: {
    height: moderateScale(35),
    width: moderateScale(119),
    backgroundColor: colors?.SaltBox,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: moderateScale(16),
    flexDirection: "row",
  },
  text: {
    fontWeight: "600",
    fontSize: textScale(14),
    color: colors?.SurfCrest
  },
  imageStyle: {
    height: moderateScale(20),
    resizeMode: "contain"
  }
});
