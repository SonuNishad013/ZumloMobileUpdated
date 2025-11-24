import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import {
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { ScoringIcon } from "../../../assets";

interface Props {
  planContainer?: ViewStyle;
  typeContainer?: ViewStyle;
  statusContainer?: ViewStyle;
  suggestion?: string;
  type?: string;
  questionCoutn?: any;
  status?: string;
}
const AssessmentsDetalis: React.FC<Props> = ({
  planContainer,
  typeContainer,
  statusContainer,
  suggestion,
  type,
  questionCoutn,
  status,
}) => {
  return (
    <View style={[styles.planContainer, planContainer]}>
      <View style={styles.planContent}>
        <View style={styles.textContainer}>
          <View
            style={{
              marginHorizontal: moderateScale(10),
            }}
          >
            <View style={styles.headerContainer}>
              <View style={styles.suggestionContainer}>
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </View>
              <View style={[styles.typeContainer, typeContainer]}>
                <ScoringIcon
                  height={`${moderateScale(24)}`}
                  width={`${moderateScale(24)}`}
                />
                <Text style={styles.typeText}>{type}</Text>
              </View>
            </View>
            <Text style={styles.totalQuestionsText}>
              {`${questionCoutn}` + " Total Questions"}
            </Text>
          </View>
          <View style={[styles.statusContainer, statusContainer]}>
            <View style={styles.separator} />
            <View style={styles.statusTextContainer}>
              <Text style={styles.unassignedText}>{status}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AssessmentsDetalis;

const styles = StyleSheet.create({
  planContainer: {
    backgroundColor: colors.sutfCrestOp,
    borderRadius: moderateScale(10),
    marginVertical: moderateScale(10),
    justifyContent: "space-between",
    overflow: "hidden",
  },
  planContent: {
    justifyContent: "space-between",
  },
  textContainer: {
    marginHorizontal: moderateScale(8),
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  suggestionContainer: {
    width: width / 1.7,
    marginTop: moderateScale(10),
  },
  suggestionText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.prussianBlue,
  },
  typeContainer: {
    borderBottomLeftRadius: moderateScale(17),
    borderTopLeftRadius: moderateScale(17),
    marginHorizontal: moderateScale(-18),
    backgroundColor: colors.polishedPine,
    height: moderateScale(30),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: moderateScale(5),
  },
  typeText: {
    marginHorizontal: moderateScale(10),
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors.SurfCrest,
  },
  totalQuestionsText: {
    marginTop: moderateScale(10),
    fontSize: textScale(12),
    fontWeight: "400",
    color: colors.SaltBox,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: moderateScale(10),
    backgroundColor: colors.polishedPine,
    height: moderateScale(40),
    borderRadius: moderateScale(9),
  },
  separator: {
    height: moderateScale(1),
    backgroundColor: colors.SurfCrest,
    opacity: 0.4,
    flex: 1,
  },
  statusTextContainer: {
    marginHorizontal: moderateScale(10),
  },
  assignedText: {
    fontSize: textScale(12),
    fontWeight: "600",
    color: colors.prussianBlue,
  },
  unassignedText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.prussianBlue,
  },
});
