import { StyleSheet, Text, TextStyle } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { formatSentenceCase } from "../../../helper/sentenceCase";
import { capitalizeFirstLetter } from "../../../validations/capitalizeFirstLetter";

interface Props {
  heading?: any;
  textStyle?: TextStyle;
}
const MainHeading: React.FC<Props> = ({ heading, textStyle }) => {
  return (
    <Text style={[styles?.headerText2, textStyle]}>
      {capitalizeFirstLetter(heading)}
    </Text>
  );
};

export default MainHeading;

const styles = StyleSheet.create({
  headerText2: {
    color: colors?.SurfCrest,
    fontSize: textScale(24),
    fontWeight: "500",
    marginTop: moderateScale(15),
    marginHorizontal: moderateScale(19),
  },
});
