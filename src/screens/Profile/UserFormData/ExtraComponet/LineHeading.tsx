import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";

interface Props {
  questionHeading?: any;
  placeHolder?: string;
}
const LineHeading: React.FC<Props> = ({ questionHeading, placeHolder }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{questionHeading}</Text>
      {placeHolder ? (
        <Text style={styles?.placeHolderStyle}>{placeHolder}</Text>
      ) : null}
      <View style={styles.headerLine} />
    </View>
  );
};

export default LineHeading;

const styles = StyleSheet.create({
  headerContainer: {
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: moderateScale(25),
  },
  headerText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
    marginLeft: moderateScale(19),
    marginRight: moderateScale(3),
  },
  headerLine: {
    height: moderateScale(0.5),
    backgroundColor: colors?.SurfCrest,
    flex: 1,
    marginLeft: moderateScale(19),
    marginTop: moderateScale(8),
    opacity: 0.5,
  },
  placeHolderStyle: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(14),
    fontWeight: "400",
    marginTop: moderateScale(10),
    marginHorizontal: moderateScale(19),
  },
});
