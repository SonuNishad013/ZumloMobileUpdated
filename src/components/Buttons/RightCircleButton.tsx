import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { RightIcon } from "../../assets";

interface Props {
  onPress?: any;
  buttonContainer?: ViewStyle;
  buttonText?: TextStyle;
  title?: any;
  iconContainer?: ViewStyle;
  isSelected?: any;
}
const RightCircleButton: React.FC<Props> = ({
  onPress,
  buttonContainer,
  buttonText,
  title,
  iconContainer,
  isSelected,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonContainer, buttonContainer]}
    >
      <View style={[styles.iconContainer, iconContainer]}>
        {isSelected && (
          <RightIcon
            height={moderateScale(35)}
            width={moderateScale(35)}
            style={styles.rightIcon}
          />
        )}
      </View>
      <Text style={[styles.buttonText, buttonText]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default RightCircleButton;

const styles = StyleSheet.create({
  buttonContainer: {
    height: moderateScale(36),
    width: moderateScale(164),
    backgroundColor: colors?.polishedPine,
    borderRadius: moderateScale(65),
    alignItems: "center",
    flexDirection: "row",
  },
  iconContainer: {
    height: moderateScale(30),
    width: moderateScale(30),
    backgroundColor: colors?.SaltBox,
    borderRadius: moderateScale(30),
    marginLeft: moderateScale(5),
    justifyContent: "center",
    flexDirection: "row",
  },
  rightIcon: {
    marginTop: moderateScale(5),
  },
  buttonText: {
    fontSize: textScale(14),
    color: colors?.SurfCrest,
    marginLeft: moderateScale(10),
  },
});
