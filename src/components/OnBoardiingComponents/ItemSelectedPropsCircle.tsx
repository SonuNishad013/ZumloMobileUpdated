import {
  Image,
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
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import { formatSentenceCase } from "../../helper/sentenceCase";
import CustomImage from "../ImageRender";

interface ItemSelectedPropsCircle {
  container?: ViewStyle;
  onPress?: () => void;
  innerCircle?: ViewStyle;
  imageBackground?: ImageStyle;
  imageStyle?: ImageStyle;
  titleStyle?: TextStyle;
  title?: any;
  source?: any;
  tintColor?: any;
  image?: any;
  iconSource?: any;
  tintIconColor?: any;
}

export const ItemSelectedPropsCircle: React.FC<ItemSelectedPropsCircle> = ({
  container,
  onPress,
  imageBackground,
  innerCircle,
  imageStyle,
  titleStyle,
  title,
  source,
  tintColor,
  image,
  iconSource,
  tintIconColor,
}) => {
  const renderNoSource = (title: any, iconSource: any) => {
    return (
      <View style={[stylesCircle.innerCircle, innerCircle]}>
        <Image
          source={iconSource}
          style={[stylesCircle.imageStyle, imageStyle]}
          resizeMode={"contain"}
        />
        <Text
          // numberOfLines={2}
          style={[stylesCircle.titleStyle, titleStyle]}
        >
          {formatSentenceCase(title)}
        </Text>
      </View>
    );
  };
  return (
    console.log("tintIconColor=-=->", tintIconColor),
    (
      <View style={[stylesCircle.container, container]}>
        <TouchableOpacity onPress={onPress}>
          {source ? (
            <ImageBackground
              source={source}
              style={[stylesCircle.imageBackground, imageBackground]}
              tintColor={tintColor}
            >
              <View style={[stylesCircle.innerCircle, innerCircle]}>
                {iconSource && (
                  // <Image
                  //   source={iconSource}
                  //   style={[stylesCircle.imageStyle, imageStyle]}
                  //   resizeMode={"contain"}
                  // />
                  <CustomImage
                    source={iconSource}
                    width={moderateScale(30)}
                    height={moderateScale(30)}
                    style={stylesCircle?.imageStyle}
                    tintColor={tintIconColor}
                  />
                )}
                <Text
                  // numberOfLines={2}
                  style={[stylesCircle.titleStyle, titleStyle]}
                >
                  {formatSentenceCase(title)}
                </Text>
              </View>
            </ImageBackground>
          ) : (
            renderNoSource(title, source)
          )}
        </TouchableOpacity>
      </View>
    )
  );
};

const stylesCircle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: moderateScale(10),
    // backgroundColor: "red",
  },
  imageBackground: {
    height: moderateScale(160),
    width: moderateScale(160),
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    height: moderateScale(160),
    width: moderateScale(160),
    borderRadius: moderateScale(120),
    borderWidth: moderateScale(1),
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    height: moderateScale(35),
    width: moderateScale(35),
    marginTop: moderateScale(15),
  },
  titleStyle: {
    fontSize: textScale(10),
    fontWeight: "600",
    marginTop: moderateScale(10),
    textAlign: "center",
    height: moderateScale(30),
    width: moderateScale(90),
  },
});
