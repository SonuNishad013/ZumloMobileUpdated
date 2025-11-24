import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../constant/colors";
import { moderateScale, textScale } from "../../constant/responsiveStyle";

interface Props {
  image?: any;
  title?: string;
  description?: string;
}
const AspirationsCard: React.FC<Props> = ({ image, title, description }) => {
  return (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: image }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.itemLabel}>{title}</Text>
      <Text style={styles.itemDesc}>{description}</Text>
    </View>
  );
};
export default AspirationsCard;
const styles = StyleSheet.create({
  itemContainer: {
    alignItems: "center",
    paddingTop: moderateScale(20),
    paddingBottom: moderateScale(40),
    justifyContent: "center",
    backgroundColor: colors.SurfCrest,
    borderRadius: moderateScale(15),
  },
  itemLabel: {
    fontSize: textScale(24),
    fontWeight: "600",
    color: colors?.prussianBlue,
    marginTop: moderateScale(20),
  },
  image: {
    height: moderateScale(170),
    width: moderateScale(170),
  },
  itemDesc: {
    textAlign: "center",
    color: colors.darkGrey,
    marginTop: moderateScale(10),
    fontSize: textScale(14),
  },
});
