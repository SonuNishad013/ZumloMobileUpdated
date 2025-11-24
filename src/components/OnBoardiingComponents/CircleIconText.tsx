import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ImageStyle,
  View,
} from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { formatSentenceCase } from "../../helper/sentenceCase";
import CustomImage from "../ImageRender";
interface Props {
  onPress?: () => void;
  title?: string;
  iconSource?: any;
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  textStyle?: TextStyle;
  mainContainer?: ViewStyle;
  tintIconColor?: any;
  source?: any;
}

const CircleIconText: React.FC<Props> = ({
  onPress,
  title,
  iconSource,
  containerStyle,
  imageStyle,
  textStyle,
  mainContainer,
  tintIconColor,
  source,
}) => {
  return (
    <View style={[mainContainer]}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.container, containerStyle]}
      >
        {/* <Image
          source={iconSource}
          style={[styles.image, imageStyle]}
          resizeMode={"contain"}
        /> */}
        <CustomImage
          source={{ uri: source }}
          width={moderateScale(22)}
          height={moderateScale(22)}
          style={styles?.image}
          tintColor={tintIconColor}
        />
        <Text
          // numberOfLines={2}
          style={[styles.text, textStyle]}
        >
          {formatSentenceCase(title)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CircleIconText;

const styles = StyleSheet.create({
  container: {
    height: moderateScale(100),
    width: moderateScale(100),
    borderRadius: moderateScale(50),
    borderWidth: moderateScale(1),
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    // height: moderateScale(20),
    // width: moderateScale(20),
    marginTop: moderateScale(15),
  },
  text: {
    fontSize: textScale(10),
    fontWeight: "600",
    marginTop: moderateScale(10),
    textAlign: "center",
    height: moderateScale(30),
    width: moderateScale(90),
    color: colors?.SurfCrest,
  },
});
