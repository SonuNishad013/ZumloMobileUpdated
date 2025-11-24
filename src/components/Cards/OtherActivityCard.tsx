import {
  Image,
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

interface Props {
  title?: string;
  icon?: any;
  onPress?: () => void;
  container?: ViewStyle;
  line?: ViewStyle;
  text?: TextStyle;
}
const OtherActivityCard: React.FC<Props> = ({
  title,
  icon,
  container,
  line,
  text,
  onPress,
}) => {

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <View style={[styles.container, container]}>
        <View style={styles.content}>
          <View style={[styles.line, line]} />
          <Text style={[styles.text, text]}>{title}</Text>
        </View>
        <Image style={styles.image} source={icon} resizeMode="contain" />
      </View>
    </TouchableOpacity>
  );
};

export default OtherActivityCard;

const styles = StyleSheet.create({
  container: {
    height: moderateScale(94),
    backgroundColor: colors?.prussianBlue,
    justifyContent: "center",
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(15),
    marginTop: moderateScale(-8),
  },
  content: {
    flexDirection: "row",
    width: moderateScale(160),
  },
  line: {
    width: moderateScale(3),
    backgroundColor: "white",
  },
  text: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
    marginLeft: moderateScale(15),
  },
  image: {
    position: "absolute",
    height: moderateScale(85),
    right: 10,
    bottom: 0,
  },
});
