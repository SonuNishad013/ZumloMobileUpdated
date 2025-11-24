import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import React from "react";
import { textLabelSize } from "../../../utils/TextConfig";

interface Props {
  name?: any;
  msg?: any;
  color?: any;
  onPress?: () => void;
  container?: ViewStyle;
  textStyle?: TextStyle;
  nameText?: TextStyle;
  displayShowAll?: any;
}

const SeeAllHeaderWellness: React.FC<Props> = ({
  name,
  msg,
  color,
  onPress,
  container,
  textStyle,
  nameText,
  displayShowAll,
}) => (
  <View style={[styles.container, container]}>
    <Text style={[styles.nameText, nameText]}>{name}</Text>
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.msgText, textStyle]}>
        {displayShowAll === false ? "" : msg}
      </Text>
    </TouchableOpacity>
  </View>
);

export default SeeAllHeaderWellness;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: moderateScale(10),
    justifyContent: "space-between",
  },
  nameText: {
    fontSize: textLabelSize?.titleFont,
    fontWeight: "700",
    color: colors.prussianBlue,
  },
  msgText: {
    fontSize: textLabelSize?.subtTitleFont,
    fontWeight: "400",
    color: colors.polishedPine,
  },
});
