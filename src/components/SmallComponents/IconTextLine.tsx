import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";

interface Props {
  title?: any;
  isSvgIcon?: any;
  SvgIcon?: any;
}
const IconTextLine: React.FC<Props> = ({ title, isSvgIcon, SvgIcon }) => {
  return (
    <View style={styles?.headerContainer}>
      {isSvgIcon && (
        <View style={styles?.svgViewStyle}>
          <SvgIcon height={moderateScale(20)} width={moderateScale(20)} />
        </View>
      )}
      <Text style={styles?.headingText}>{title}</Text>
      <View style={styles?.divider} />
    </View>
  );
};

export default IconTextLine;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: moderateScale(15),
    gap: moderateScale(10),
  },
  headingText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors.SurfCrest,
  },
  divider: {
    flex: 1,
    height: 0.4,
    backgroundColor: colors.SurfCrest,
  },
  svgViewStyle: {},
});
