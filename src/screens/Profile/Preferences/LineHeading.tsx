import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { formatSentenceCase } from "../../../helper/sentenceCase";
import logger from "../../../constant/logger";

interface Props {
  questionHeading?: any;
  formatingNeeded?: boolean;
}
const LineHeading: React.FC<Props> = ({ questionHeading, formatingNeeded }) => {
  logger("____itemsData?.stepDescription_______", questionHeading);
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>
        {/* {questionHeading.charAt(0) + questionHeading.slice(1).toLowerCase()} */}
        {!formatingNeeded
          ? questionHeading
          : formatSentenceCase(questionHeading)}
        {/* {questionHeading} */}
      </Text>
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
  },
});
