import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";

interface Props {
  title?: any;
  container?: ViewStyle;
  titleText?: TextStyle;
  line?: ViewStyle;
}

const TitleSideLine: React.FC<Props> = ({
  title,
  container,
  titleText,
  line,
}) => {
  return (
    <View style={[styles.container, container]}>
      <Text style={[styles.titleText, titleText]}>{title}</Text>
      <View style={[styles.line, line]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: moderateScale(19),
  },
  titleText: {
    fontSize: textScale(10),
    color: colors.prussianBlue,
    fontWeight: "600",
    marginRight: moderateScale(10),
  },
  line: {
    flex: 1,
    backgroundColor: colors.grey,
    height: moderateScale(0.7),
  },
});

export default TitleSideLine;
