import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CommonBoxButton from "../../../components/Buttons/commonBoxButton";
import { strings } from "../../../constant/strings";
import { PlusIconWhite } from "../../../assets";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import navigationString from "../../../navigation/navigationString";

interface Props {
  onPress?: () => void;
  navigation?: any;
}
const StepsPlusBtn: React.FC<Props> = ({ navigation }) => {
  return (
    <>
      <Text style={style?.stepsTxtStyle}>{strings?.steps}</Text>
      <View style={style?.stepsValPlusContainer}>
        <Text style={style?.stepsValueTxtStyle}>{"8,254"}</Text>
        <View style={style?.boxBtnContainer}>
          <CommonBoxButton
            onPress={() => navigation?.navigate(navigationString?.AddActivity)}
            SvgIcon={PlusIconWhite}
          />
        </View>
      </View>
    </>
  );
};

export default StepsPlusBtn;

const style = StyleSheet.create({
  stepsTxtStyle: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
    marginTop: moderateScale(35),
  },
  stepsValPlusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stepsValueTxtStyle: {
    fontSize: textScale(62),
    fontWeight: "700",
    color: colors?.royalOrange,
  },
  boxBtnContainer: { alignSelf: "center" },
});
