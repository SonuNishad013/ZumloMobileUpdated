import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";

interface Props {
  stepDescription?: string;
  placeholder?: any;
  isLine?: any;
}
const QuestionDescription: React.FC<Props> = ({
  stepDescription,
  placeholder,
  isLine,
}) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerDescription}>{stepDescription}</Text>
      {isLine && <View style={styles.headerLine} />}
      <Text style={styles.headerPlaceholder}>{placeholder}</Text>
    </View>
  );
};

export default QuestionDescription;

const styles = StyleSheet.create({
  headerContainer: {
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: moderateScale(25),
  },
  headerDescription: {
    fontSize: textScale(24),
    fontWeight: "500",
    color: colors?.SurfCrest,
    marginLeft: moderateScale(19),
    marginRight: moderateScale(3),
  },
  headerPlaceholder: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.SurfCrest,
    marginLeft: moderateScale(19),
    marginRight: moderateScale(19),
    marginTop: moderateScale(10),
  },
  headerLine: {
    height: moderateScale(0.5),
    backgroundColor: colors?.SurfCrest,
    flex: 1,
    marginLeft: moderateScale(19),
    marginTop: moderateScale(8),
  },
});
