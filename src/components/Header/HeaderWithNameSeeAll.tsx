import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";

interface Props {
  name?: any;
  msg?: any;
  color?: any;
  onPress?: () => void;
  container?: ViewStyle;
  textStyle?: TextStyle;
  nameText?: TextStyle;
  navigation?: any;
  showSeeAll?: any;
}

const HeaderWithNameSeeAll: React.FC<Props> = ({
  name,
  msg,
  color,
  onPress,
  container,
  textStyle,
  nameText,
  navigation,
  showSeeAll = true,
}) => (
  <View style={[styles.container, container]}>
    <Text style={[styles.nameText, nameText]}>{name}</Text>
    {!showSeeAll ? null : (
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.msgText, textStyle]}>{msg}</Text>
      </TouchableOpacity>
    )}
  </View>
);

export default HeaderWithNameSeeAll;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: moderateScale(10),
    justifyContent: "space-between",
  },
  nameText: {
    fontSize: textScale(14),
    fontWeight: "700",
    color: colors.prussianBlue,
  },
  msgText: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors.polishedPine,
  },
});
