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
import colors from "../../constant/colors";
import { moderateScale } from "../../constant/responsiveStyle";
import { CircleRightIcon } from "../../assets";

interface Props {
  icon?: any;
  title?: string;
  isSelected?: boolean;
  planContainer?: ViewStyle;
  onPress?: () => void;
  text?: TextStyle;
  image?: any;
}

const WellnessPlan: React.FC<Props> = ({
  icon,
  title,
  isSelected,
  planContainer,
  onPress,
  text,
  image,
}) => {
  return (
    <View style={styles.container}>
      {isSelected && (
        <View style={styles.circleIcon}>
          <CircleRightIcon />
        </View>
      )}
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.planContainer, planContainer]}>
          <Image style={[styles?.image, image]} source={icon} />
          <Text style={[styles.text, text]}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  circleIcon: {
    position: "absolute",
    zIndex: 1,
    right: moderateScale(7),
    top: moderateScale(7),
  },
  planContainer: {
    backgroundColor: colors?.polishedPine,
    height: moderateScale(84),
    borderColor: colors?.royalOrange,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(15),
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: moderateScale(20),
  },
  image: {
    height: moderateScale(25),
    width: moderateScale(20),
    tintColor: colors?.SurfCrest,
  },
  text: {
    fontSize: moderateScale(10),
    fontWeight: "600",
    textAlign: "center",
    width: moderateScale(125),
    marginTop: moderateScale(7),
  },
});

export default WellnessPlan;
