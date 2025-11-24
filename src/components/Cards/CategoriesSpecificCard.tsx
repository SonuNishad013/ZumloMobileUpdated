import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../constant/colors";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import CommonButton from "../Buttons/commonButton";

interface Props {
    title?:string
    btnName?:any
    icon?:any
}
const CategoriesSpecificCard: React.FC<Props> = ({title,btnName,icon}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          {title}
        </Text>
        <CommonButton
          btnName={btnName}
          mainContainer={styles.buttonContainer}
          btnNameStyle={styles.buttonText}
        />
      </View>
      <Image style={styles?.imageStyle} source={icon} />
    </View>
  );
};

export default CategoriesSpecificCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors?.polishedPine,
    height: moderateScale(186),
    width: moderateScale(150),
    borderRadius: moderateScale(10),
    marginRight:moderateScale(15)
  },
  content: {
    paddingHorizontal: moderateScale(10),
    paddingTop: moderateScale(7),
  },
  title: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
  },
  buttonContainer: {
    backgroundColor: colors?.prussianBlue,
    height: moderateScale(20),
    width: moderateScale(84),
    marginTop: moderateScale(5),
  },
  buttonText: {
    fontSize: textScale(10),
    fontWeight: "400",
  },
  imageStyle: {
    height: moderateScale(80),
    width: moderateScale(150),
    resizeMode: "contain",
    position: "absolute",
    bottom: moderateScale(0),
  },
});
