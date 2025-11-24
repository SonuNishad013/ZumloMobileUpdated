import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../constant/colors";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import CommonButton from "../Buttons/commonButton";

interface Props {
  btnTitle?: string;
  description?: string;
  image?: any;
}
const ActivitesCard: React.FC<Props> = ({ btnTitle, description, image }) => {
  return (
    <View style={styles.container}>
      <CommonButton
        btnName={btnTitle}
        mainContainer={styles.buttonContainer}
        btnNameStyle={styles.buttonName}
      />
      <Text style={styles.title}>{description}</Text>
      <Image source={image} resizeMode="contain" style={styles.image} />
    </View>
  );
};

export default ActivitesCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors?.polishedPine,
    height: moderateScale(345),
    width: moderateScale(279),
    borderRadius: moderateScale(10),
    paddingTop: moderateScale(25),
  },
  buttonContainer: {
    width: moderateScale(84),
    height: moderateScale(24),
    backgroundColor: colors?.SurfCrest,
    marginHorizontal: moderateScale(15),
  },
  buttonName: {
    color: colors?.prussianBlue,
    fontWeight: "400",
    fontSize: textScale(10),
  },
  title: {
    color: colors?.prussianBlue,
    fontWeight: "700",
    fontSize: textScale(24),
    marginTop: moderateScale(10),
    width: moderateScale(190),
    marginHorizontal: moderateScale(15),
  },
  image: {
    height: moderateScale(160),
    width: moderateScale(279),
    position: "absolute",
    bottom: moderateScale(0),
  },
});
