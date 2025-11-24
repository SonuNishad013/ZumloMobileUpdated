import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";

const CommonEditHeader = ({ title }: any) => {
  return <Text style={styles.textBasicInfo}>{title}</Text>;
};

export default CommonEditHeader;

const styles = StyleSheet.create({
  textBasicInfo: {
    fontSize: textScale(14),
    color: colors?.prussianBlue,
    fontWeight: "600",
    marginTop: moderateScale(15),
    marginBottom: moderateScale(5),
  },
});
