import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageSourcePropType,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from "react-native";
import React from "react";
import { moderateScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { imagePath } from "../../assets/png/imagePath";
import { formatSentenceCase } from "../../helper/sentenceCase";
import CustomImage from "../ImageRender";

interface Props {
  onPress?: () => void;
  title?: string;
  imageSource?: ImageSourcePropType;
  containerStyle?: ViewStyle;
  mainContainerView?: ViewStyle;
  imageBackgroundStyle?: ImageStyle;
  imageStyle?: ImageStyle;
  titleStyle?: TextStyle;
  tintColor?: string;
  source?: any;
  isMedIcon?: any;
  mainContainer?: ViewStyle;
  isTintColor?: boolean;
  width?: number;
  height?: number;
}

const MeditationPracticesCard: React.FC<Props> = ({
  onPress,
  title,
  imageSource = imagePath?.MedVector,
  containerStyle,
  imageBackgroundStyle,
  imageStyle,
  titleStyle,
  tintColor,
  source,
  isMedIcon = true,
  mainContainer,
  isTintColor,
  width,
  height,
  mainContainerView,
}) => {
  return (
    console.log("source====>>>", source),
    (
      <View
        style={[
          {
            padding: moderateScale(5),
            borderRadius: moderateScale(15),
          },
          mainContainer,
          mainContainerView,
        ]}
      >
        <TouchableOpacity
          style={[styles.container, containerStyle]}
          onPress={onPress}
          activeOpacity={0.5}
        >
          <Text style={[styles.title, titleStyle]}>
            {formatSentenceCase(title)}
          </Text>

          <View
            style={{
              alignSelf: "center",
              position: "absolute",
              bottom: 0,
            }}
          >
            {isMedIcon && (
              <CustomImage
                source={source}
                width={moderateScale(width ?? 191)}
                height={moderateScale(height ?? 235)}
                style={[styles.image, imageStyle]}
                mainContainer={[
                  mainContainer,
                  { backgroundColor: "transparent" },
                ]}
                isTintColor={false}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
    )
  );
};

export default MeditationPracticesCard;

const styles = StyleSheet.create({
  container: {
    height: moderateScale(256),
    width: moderateScale(191),
    backgroundColor: colors?.SurfCrest,
    borderRadius: moderateScale(15),
    // borderWidth: moderateScale(2),
    borderColor: colors?.polishedPine,
    overflow: "hidden",
  },
  imageBackground: {
    height: moderateScale(256),
    width: moderateScale(191),
  },
  image: {
    height: moderateScale(156),
    width: moderateScale(169),
  },
  title: {
    position: "absolute",
    top: moderateScale(10),
    fontSize: moderateScale(14),
    color: colors?.polishedPine,
    fontWeight: "600",
    marginHorizontal: moderateScale(15),
    zIndex: 1,
  },
});
