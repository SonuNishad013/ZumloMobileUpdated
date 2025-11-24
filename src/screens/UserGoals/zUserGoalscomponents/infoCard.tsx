import {
  View,
  Text,
  Image,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageBackground,
} from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { CircleMinIcon } from "../../../assets";
import { imagePath } from "../../../assets/png/imagePath";

interface Props {
  mainContainer?: ViewStyle;
  textContainer?: ViewStyle;
  title?: any;
  description?: any;
  titleText?: TextStyle;
  lineStyle?: ViewStyle;
  descriptionText?: TextStyle;
  image?: any;
  source?:any
}

const InfoCard: React.FC<Props> = ({
  mainContainer,
  textContainer,
  title,
  description,
  titleText,
  lineStyle,
  descriptionText,
  image,
  source
}) => {
  console.log("image==>", image);

  

  return (
    <ImageBackground style={{flex:1}} source={source} resizeMode={"contain"}>
    <View style={[style?.mainContainer, mainContainer]}>
      {/* <CircleMinIcon/> */}
      <View style={[style?.textContainer, textContainer]}>
        <Text numberOfLines={2} style={[style?.titleText, titleText]}>
          {title}
        </Text>
        <View style={[style?.lineStyle, lineStyle]} />
        <Text
          numberOfLines={2}
          style={[style?.descriptionText, descriptionText]}
        >
          {description}
        </Text>
      </View>
      <View style={style?.imageContainer}>
        <Image
          source={{ uri: image }}
          style={{ width: moderateScale(150), height: moderateScale(100) }}
          resizeMode={"cover"}
        />
      </View>
    </View>
    </ImageBackground>

  );
};

const style = StyleSheet.create({
  mainContainer: {
    width: "auto",
    height: moderateScale(125),
    borderRadius: moderateScale(8),
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  textContainer: {
    height: moderateScale(80),
    width: moderateScale(176),
    alignSelf: "center",
    marginLeft: moderateScale(15),
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: textScale(16),
    color: colors?.SurfCrest,
    fontWeight: "600",
  },
  descriptionText: {
    fontSize: textScale(10),
    color: colors?.SurfCrest,
    fontWeight: "400",
  },
  lineStyle: {
    borderBottomWidth: moderateScale(0.7),
    width: moderateScale(117),
    borderColor: colors?.OceanGreen,
  },
  imageContainer: {
    alignSelf: "flex-end",
  },
});

export default InfoCard;

// use like
{
  /* <InfoCard
title={'I wanna improve my mental health'}
description={'Lorem Ipsum, sometimes referred to as lipsum'}
image={imagePath?.object}
/> */
}
