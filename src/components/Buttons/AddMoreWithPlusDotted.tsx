import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  Image,
} from "react-native";
import React from "react";
import { imagePath } from "../../assets/png/imagePath";
import { moderateScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { textLabelSize } from "../../utils/TextConfig";

interface Props {
  mainContainer?: ViewStyle;
  title?: string;
  iconStyle?: any;
  titleStyle?: TextStyle;
  onPress?: (event: GestureResponderEvent) => void;
}
const AddMoreWithPlusDotted: React.FC<Props> = ({
  title,
  mainContainer,
  iconStyle,
  titleStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[style?.mainContainer, mainContainer]}
    >
      <Image
        style={[style?.iconStyle, iconStyle]}
        source={imagePath?.PlusImage}
      />
      <Text style={[style?.titleStyle, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  mainContainer: {
    height: moderateScale(49.11),
    width: "auto",
    borderWidth: moderateScale(0.7),
    borderRadius: moderateScale(7),
    borderColor: colors?.SaltBox,
    borderStyle: "dashed",
    flexDirection: "row",
    alignItems: "center",
  },
  iconStyle: {
    marginHorizontal: moderateScale(16),
    tintColor: colors?.SaltBox,
  },
  titleStyle: {
    color: colors?.SaltBox,
    fontSize: textLabelSize?.subtTitleFont,
    fontWeight: "400",
  },
});

export default AddMoreWithPlusDotted;
