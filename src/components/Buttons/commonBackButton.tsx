import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from "react-native";
import React from "react";
import { moderateScale } from "../../constant/responsiveStyle";
import { BackIcon } from "../../assets";

interface Props {
  SVGImage?: any;
  mainContainer?: ViewStyle;
  onPress?: () => void;
}
const CommonBackButton: React.FC<Props> = ({
  SVGImage,
  mainContainer,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[style?.mainContainer, mainContainer]}
    >
      <BackIcon
        height={`${moderateScale(19)}`}
        width={`${moderateScale(19)}`}
      />
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    borderWidth: moderateScale(1),
    height: moderateScale(41),
    width: moderateScale(41),
    borderRadius: moderateScale(12),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: "white",
  },
});

export default CommonBackButton;
