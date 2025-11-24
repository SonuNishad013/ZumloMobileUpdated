import {
  Text,
  ImageBackground,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
interface Props {
  mainContainer?: ViewStyle;
  title?: any;
  image?: any;
  onPress?: () => void;
}

const TypeCard: React.FC<Props> = ({
  image,
  title,
  onPress,
  mainContainer,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.mainContainer, mainContainer]}
    >
      <ImageBackground source={image} style={styles?.image}>
        <Text style={styles?.textStyle} numberOfLines={2}>
          {title}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: { height: moderateScale(188.88) },
  textStyle: {
    width: moderateScale(107.09),
    marginTop: moderateScale(15.33),
    marginLeft: moderateScale(12.79),
    fontWeight: "600",
    fontSize: textScale(14),
    color: colors?.prussianBlue,
  },
  image: {
    height: moderateScale(188.88),
    width: moderateScale(157.92),
    borderRadius: moderateScale(8.67),
  },
});
export default TypeCard;
