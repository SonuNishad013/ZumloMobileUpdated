import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../../constant/colors";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import CommonButton from "../../../components/Buttons/commonButton";
import { formatSentenceCase } from "../../../helper/sentenceCase";

interface Props {
  onPress?: any;
  from: string;
  purpuse?: string;
}
const NewActivityDone: React.FC<Props> = ({ onPress, from, purpuse }) => {
  const renderButtonText = () => {
    switch (from) {
      case "DailyRoutine":
        return "Go to daily routine";
      case "ExplorerActivity":
        return "Go to dashboard";
      case "IndependentGoals":
        return "Go to independent goals";
      case "WellnessOverview":
        return "Back to wellbeing";
      case "Dashboard":
        return "Done";
      default:
        return "Back to activity";
    }
  };
  return (
    <View style={styles.contentContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>
          {formatSentenceCase(
            typeof purpuse === "string" ? "Nice Work!" : "Well done!"
          )}
        </Text>
        <Text
          style={[
            styles.descriptionText,
            {
              paddingHorizontal:
                typeof purpuse === "string" ? moderateScale(30) : 0,
            },
          ]}
        >
          {typeof purpuse === "string"
            ? "You’ve taken the next step in refining your activity. Feel free to head back and continue where you left off."
            : "Thank you for your feedback."}
        </Text>
        <CommonButton
          onPress={onPress}
          btnName={renderButtonText()}
          mainContainer={styles.buttonContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  textContainer: {
    alignItems: "center",
  },
  titleText: {
    fontSize: textScale(24),
    fontWeight: "700",
    color: colors?.SurfCrest,
  },
  descriptionText: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.SurfCrest,
    marginTop: moderateScale(20),
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: moderateScale(30),
  },
});

export default NewActivityDone;
