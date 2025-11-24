import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { MeditationPose } from "../../../assets";

interface Props {}
const ImageText: React.FC<Props> = () => {
  return (
    <View style={style?.textImageMainContainer}>
      <Text style={style?.mainTxtTitleStyle}>{"Your Goals, Your Way:"}</Text>
      <Text style={style?.mainTxtDescriptionStyle}>
        {" Customize, Achieve, Repeat."}
      </Text>
      <View style={style?.iconContainer}>
        <MeditationPose
          height={`${moderateScale(201.5)}`}
          width={`${moderateScale(201.5)}`}
        />
      </View>
    </View>
  );
};

export default ImageText;

const style = StyleSheet.create({
  textImageMainContainer: {
    marginHorizontal: moderateScale(19.5),
    marginTop: moderateScale(20),
    width: moderateScale(345),
    alignItems: "center",
    alignSelf: "center",
  },
  mainTxtTitleStyle: {
    fontSize: textScale(24),
    fontWeight: "700",
    color: colors?.prussianBlue,
  },
  mainTxtDescriptionStyle: {
    fontSize: textScale(24),
    fontWeight: "700",
    color: colors?.prussianBlue,
    marginHorizontal: moderateScale(30),
    textAlign: "center",
  },
  iconContainer: {
    marginTop: moderateScale(15),
  },
});
