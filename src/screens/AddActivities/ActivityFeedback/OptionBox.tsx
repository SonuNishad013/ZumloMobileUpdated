import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";

interface Props {
  title?: string;
  description?: string;
  onPress?: () => void;
  container?: ViewStyle;
}
const OptionBox: React.FC<Props> = ({
  title,
  description,
  onPress,
  container,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, container]}>
        <Text style={styles.optionText}>{title}</Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(11),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors?.surfCrustOp,
    padding: moderateScale(17),
    borderWidth: moderateScale(1),
  },
  optionText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.royalOrangeDark,
  },
  descriptionText: {
    fontSize: textScale(10),
    marginTop: moderateScale(4),
    fontWeight: "400",
    color: colors?.SurfCrest,
  },
});

export default OptionBox;
