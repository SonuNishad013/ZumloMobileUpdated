import {
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
  item?: any;
  onPress?: () => void;
  mainContainer?: ViewStyle;
  titleStyle?: TextStyle;
}
const OneSelect: React.FC<Props> = ({
  item,
  onPress,
  mainContainer,
  titleStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[style?.mainContainer, mainContainer]}>
        <Text style={[style?.titleStyle, titleStyle]}>{item}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default OneSelect;

const style = StyleSheet.create({
  mainContainer: {
    height: "auto",
    paddingVertical: moderateScale(12),
    width: moderateScale(333),
    backgroundColor: colors?.ShuttleGray,
    borderColor: colors?.polishedPine,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(8),
    justifyContent: "center",
    paddingHorizontal: moderateScale(10),
    marginVertical: moderateScale(5),
  },
  titleStyle: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.SurfCrest,
  },
});
