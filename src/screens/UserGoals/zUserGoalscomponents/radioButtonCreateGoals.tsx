import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";

interface Props {
  mediumtype?: string;
  mainContainer?: ViewStyle;
  textStyle?: TextStyle;
  radioView?: ViewStyle;
  onPress?: () => void;
  index?: any;
}

const RadioButtonCreateGoals: React.FC<Props> = ({
  mediumtype,
  mainContainer,
  textStyle,
  radioView,
  onPress,
  index,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={[style?.mainContainer, mainContainer]}
    >
      <Text style={[style?.textStyle, textStyle]}>{mediumtype}</Text>
      <View style={[style?.radioView, radioView]} />
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    height: moderateScale(56.56),
    // width: moderateScale(334.06),
    borderRadius: moderateScale(15),
    borderWidth: moderateScale(1),
    borderColor: colors?.polishedPine,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: moderateScale(15),
  },
  textStyle: {
    color: colors?.SaltBox,
    fontWeight: "600",
    fontSize: textScale(14),
  },
  radioView: {
    height: moderateScale(14),
    width: moderateScale(14),
    borderRadius: moderateScale(7),
    borderWidth: moderateScale(1),
    borderColor: colors?.SaltBox,
  },
});

export default RadioButtonCreateGoals;

// use Like
{
  /* <RadioButtonCreateGoals
goaltype="Running"
/> */
}
