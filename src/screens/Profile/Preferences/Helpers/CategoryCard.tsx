import {
  ImageBackground,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";
import { ForwordGrayIcon } from "../../../../assets";

interface Props {
  onPress?: any;
  title?: any;
  imageBackground?: ImageStyle;
  button?: ViewStyle;
  titleText?: TextStyle;
  iconContainer?: ViewStyle;
  source?: any;
}

const CategoryCard: React.FC<Props> = ({
  onPress,
  title,
  imageBackground,
  button,
  titleText,
  iconContainer,
  source,
}) => {
  return (
    <View style={styles?.conainer}>
      <ImageBackground
        source={source}
        resizeMode={"stretch"}
        style={[styles.imageBackground, imageBackground]}
      >
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={onPress} style={[styles.button, button]}>
            <View></View>
            <View>
              <Text style={[styles.titleText, titleText]}>{title}</Text>
            </View>
            <View style={[styles.iconContainer, iconContainer]}>
              <ForwordGrayIcon />
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  conainer: {
    flex: 1,
  },
  imageBackground: {
    marginTop: moderateScale(10),
    justifyContent: "flex-end",
    alignItems: "center",
    width: "auto",
    height: moderateScale(253),
    borderRadius: moderateScale(22),
  },
  innerContainer: {
    height: moderateScale(253 / 3),
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderRadius: moderateScale(22),
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.SurfCrest,
    flexDirection: "row",
    width: moderateScale(286),
    height: moderateScale(40),
  },
  titleText: {
    color: colors.saltNew,
    fontSize: textScale(14),
    fontWeight: "600",
  },
  iconContainer: {
    justifyContent: "flex-end",
    flexDirection: "row",
    marginRight: moderateScale(10),
  },
});
