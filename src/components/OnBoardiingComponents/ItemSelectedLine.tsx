import React from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageStyle,
  TextStyle,
} from "react-native";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { imagePath } from "../../assets/png/imagePath";
import { formatSentenceCase } from "../../helper/sentenceCase";
import CustomImage from "../ImageRender";

interface Props {
  isSelected?: any;
  imageStyle?: ImageStyle;
  titleStyle?: TextStyle;
  title?: any;
  onPress?: () => void;
  source?: any;
  tintIconColor?: any;
  testID?: string;
}
export const ItemSelectedLine: React.FC<Props> = ({
  isSelected,
  imageStyle,
  titleStyle,
  title,
  onPress,
  source,
  tintIconColor,
  testID,
}) => {
  function isSVG(url: any) {
    const svgRegex = /\.svg$/i;
    return svgRegex.test(url);
  }

  return (
    console.log("source==-=-=>", source),
    (
      <TouchableOpacity onPress={onPress} style={styles.container} testID={testID}>
        <View style={styles.row}>
          {/* <Image
          style={[styles.imageStyle, imageStyle]}
          source={source ? { uri: source } : imagePath?.Table}
          resizeMode={"contain"}
        /> */}
          <CustomImage
            source={{ uri: source }}
            width={moderateScale(22)}
            height={moderateScale(22)}
            style={styles?.imageStyle}
            tintColor={tintIconColor}
          />
          <Text style={[styles.titleStyle, titleStyle]}>
            {formatSentenceCase(title)}
          </Text>
        </View>
        {isSelected && (
          <Image
            source={imagePath?.Greentick}
            style={{ marginRight: moderateScale(10) }}
          />
        )}
      </TouchableOpacity>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: moderateScale(19),
    minHeight: moderateScale(70),
    marginRight: moderateScale(40),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageStyle: {
    height: moderateScale(25),
    width: moderateScale(25),
  },
  titleStyle: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.SurfCrest,
    marginHorizontal: moderateScale(20),
    flex: 1,
  },
});

export default ItemSelectedLine;
