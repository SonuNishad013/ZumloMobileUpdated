import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { strings } from "../../../constant/strings";
import CreateGoalButton from "../zUserGoalscomponents/createGoalButton";
import navigationString from "../../../navigation/navigationString";

interface Props {
  onPress?: () => void;
}
const TitleTextButton: React.FC<Props> = ({  onPress }) => {
  return (
    <>
      <Text style={style?.mainTxtTitleStyle}>{strings?.WellBeing}</Text>
      <Text style={style?.mainTxtDescriptionStyle}>
        {strings?.WellBeingDis}
      </Text>
      <CreateGoalButton
        onPress={onPress}
        mainContainer={{ marginTop: moderateScale(25) }}
        title={strings?.ownGoals}
      />
    </>
  );
};

export default TitleTextButton;

const style = StyleSheet.create({
  mainTxtTitleStyle: {
    fontSize: textScale(24),
    fontWeight: "700",
    color: colors?.prussianBlue,
    marginTop: moderateScale(30),
  },
  mainTxtDescriptionStyle: {
    fontSize: textScale(24),
    fontWeight: "700",
    color: colors?.prussianBlue,
  },
});
