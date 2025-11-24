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
  radioButtonInner?: ViewStyle;
  onPress?: () => void;
}

const RadioSelection: React.FC<Props> = ({
  title,
  description,
  radioButtonInner,
  onPress,
}) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.publicText}>{title}</Text>
        <TouchableOpacity onPress={onPress} style={styles.radioButtonOuter}>
          <View style={[styles.radioButtonInner, radioButtonInner]} />
        </TouchableOpacity>
      </View>
      <Text style={styles.descriptionText}>{description}</Text>
    </>
  );
};

export default RadioSelection;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  publicText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
  },
  radioButtonOuter: {
    height: moderateScale(16),
    width: moderateScale(16),
    borderRadius: moderateScale(8),
    borderWidth: moderateScale(0.5),
    borderColor: colors?.SurfCrest,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonInner: {
    height: moderateScale(10),
    width: moderateScale(10),
    borderRadius: moderateScale(5),
    backgroundColor: colors?.royalOrange,
    marginLeft: moderateScale(0.5),
  },
  descriptionText: {
    marginTop: moderateScale(10),
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors?.whiteOp6,
    width: "85%",
  },
});
