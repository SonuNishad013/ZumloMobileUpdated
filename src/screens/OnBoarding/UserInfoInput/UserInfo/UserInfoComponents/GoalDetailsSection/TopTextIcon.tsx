import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  moderateScale,
  textScale,
} from "../../../../../../constant/responsiveStyle";
import { ColorProperties } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import colors from "../../../../../../constant/colors";
import { MeditationPose } from "../../../../../../assets";
interface Props {}
const TopTextIcon: React.FC<Props> = () => {
  return (
    <View style={styles?.textImageMainContainer}>
      <Text style={styles?.mainTxtTitleStyle}>
        {"Your Goals, Your Way: \n Customize, Achieve, Repeat."}
      </Text>
      <MeditationPose
        height={`${moderateScale(201.5)}`}
        width={`${moderateScale(201.5)}`}
      />
    </View>
  );
};

export default TopTextIcon;

const styles = StyleSheet.create({
  textImageMainContainer: {
    marginHorizontal: moderateScale(19.5),
    marginTop: moderateScale(30),
    width: moderateScale(345),
    alignItems: "center",
    alignSelf: "center",
  },
  mainTxtTitleStyle: {
    fontSize: textScale(24),
    fontWeight: "700",
    color: colors?.SurfCrest,
    textAlign: "center",
    marginBottom: moderateScale(15),
  },
  mainTxtDescriptionStyle: {
    fontSize: textScale(24),
    fontWeight: "700",
    color: colors?.SurfCrest,
    textAlign: "center",
  },
});
