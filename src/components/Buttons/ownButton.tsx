import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from "react-native";
import React from "react";
import { PlusOrangeIcon } from "../../assets";
import { moderateScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";

interface Props {
  mainContainer?: ViewStyle;
  title?: string;
  iconStyle?: any;
  titleStyle?: TextStyle;
  onPress?: (event: GestureResponderEvent) => void;
}
const OwnButton: React.FC<Props> = ({
  title,
  mainContainer,
  iconStyle,
  titleStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.4}
      style={[style?.mainContainer, mainContainer]}
    >
      <PlusOrangeIcon
        style={[style?.iconStyle, iconStyle]}
        height={`${moderateScale(18.27)}`}
        width={`${moderateScale(17.63)}`}
      />
      <Text style={[style?.titleStyle, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  mainContainer: {
    height: moderateScale(49.11),
    borderWidth: moderateScale(0.7),
    borderRadius: moderateScale(7),
    borderColor: colors?.SaltBox,
    borderStyle: "dashed",
    flexDirection: "row",
    alignItems: "center",
  },
  iconStyle: {
    marginHorizontal: moderateScale(16),
  },
  titleStyle: {
    color: colors?.SaltBox,
    fontSize: moderateScale(14),
    fontWeight: "400",
  },
});

export default OwnButton;
