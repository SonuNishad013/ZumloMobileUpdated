import React from "react";
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
import { imagePath } from "../../assets/png/imagePath";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { formatSentenceCase } from "../../helper/sentenceCase";

interface Props {
  data?: any;
  onPress?: any;
  title?: any;
  touchableContainer?: ViewStyle;
  imageBackground?: ImageStyle;
  selectedText?: TextStyle;
  dashLine?: ViewStyle;
  selected?: any;
  borderColorSelected?: any;
  tintColor?: any;
}

const DashedSlider: React.FC<Props> = ({
  onPress,
  selected,
  title,
  touchableContainer,
  imageBackground,
  selectedText,
  dashLine,
  borderColorSelected,
  tintColor,
  data,
}) => {
  console.log("DashedSlider==>>selected", selected, title, data);
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.2}
      style={[styles.touchableContainer, touchableContainer]}
    >
      {selected ? (
        <View
          style={[
            styles.dashLine,
            dashLine,
            {
              borderColor: borderColorSelected ?? colors?.royalOrangeDark,
              top: -25,
            },
            { width: data?.length == 5 ? moderateScale(50) : 25 },
          ]}
        >
          <ImageBackground
            source={imagePath?.SlidersPin}
            style={[styles.imageBackground, imageBackground]}
            resizeMode="contain"
            tintColor={tintColor ?? colors?.SurfCrest}
          >
            <Text style={[styles.selectedText, selectedText]}>
              {formatSentenceCase(title)}
            </Text>
          </ImageBackground>
        </View>
      ) : (
        <View
          style={[
            styles.dashLine,
            dashLine,
            { width: data?.length == 5 ? moderateScale(50) : 25 },
          ]}
        />
      )}
    </TouchableOpacity>
  );
};

export default DashedSlider;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  flatListContentContainer: {
    height: moderateScale(70),
    alignItems: "flex-end",
    justifyContent: "space-between",
    width: "100%",
  },
  touchableContainer: {
    height: moderateScale(40),
    justifyContent: "center",
  },
  imageBackground: {
    height: moderateScale(50),
    alignItems: "center",
    bottom: -moderateScale(8),
    paddingTop: moderateScale(3),
  },
  selectedText: {
    fontSize: textScale(12),
    marginTop: moderateScale(5),
    color: colors?.prussianBlue,
  },
  dashLine: {
    borderBottomWidth: 2,
    borderColor: colors?.SlidersDull,
    width: 25,
  },
});
