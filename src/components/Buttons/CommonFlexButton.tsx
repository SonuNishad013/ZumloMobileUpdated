import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { moderateScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";

interface Props {
  btnName?: string;
  buttonContainer?: any;
  buttonText?: any;
  onPress?: any;
  isBold?: any;
  btnValue?: any;
  buttonTextValue?: any;
  isDisable?: boolean;
}
const CommonFlexButton: React.FC<Props> = ({
  btnName,
  buttonContainer,
  buttonText,
  onPress,
  isBold,
  btnValue,
  buttonTextValue,
  isDisable = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonContainer,

        {
          backgroundColor: isDisable
            ? colors?.polishedPineOP3
            : colors?.polishedPineOP3,
          opacity: isDisable ? 0.5 : 1,
        },
        buttonContainer,
      ]}
      disabled={isDisable}
    >
      {isBold ? (
        <View
          style={{
            flexDirection: "row",
            gap: moderateScale(2),
            alignItems: "baseline",
            // backgroundColor: "gray",
          }}
        >
          <Text style={[styles.buttonTextValue, buttonTextValue]}>
            {btnValue}
          </Text>
          <Text style={[styles.buttonText, buttonText]}>{btnName}</Text>
        </View>
      ) : (
        <Text style={[styles.buttonText, buttonText]}>{btnName}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CommonFlexButton;

const styles = StyleSheet.create({
  buttonContainer: {
    height: moderateScale(30),
    // backgroundColor: colors?.polishedPineOP3,
    paddingHorizontal: moderateScale(8),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(44),
    alignSelf: "flex-start",
  },
  buttonText: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(12),
    fontWeight: "500",
  },
  buttonTextValue: {
    color: colors?.royalOrangeDark,
    fontSize: moderateScale(15),
    fontWeight: "600",
  },
});
