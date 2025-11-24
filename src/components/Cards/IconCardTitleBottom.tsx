import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";
import React from "react";
import { moderateScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";

import { formatSentenceCase } from "../../helper/sentenceCase";
import CustomImage from "../ImageRender";

interface Props {
  onPress?: () => void;
  title?: string;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  source?: any;
  mainContainer?: ViewStyle;
}

const IconCardTitleBottom: React.FC<Props> = ({
  onPress,
  title,
  containerStyle,
  titleStyle,
  source,
  mainContainer,
}) => {
  console.log("source---->", source);
  return (
    <View
      style={[
        {
          alignItems: "center",
        },
        mainContainer,
      ]}
    >
      <TouchableOpacity
        style={[styles.container, containerStyle]}
        onPress={onPress}
        activeOpacity={0.5}
      >
        <CustomImage
          source={source}
          width={moderateScale(191)}
          height={moderateScale(256)}
          isTintColor={false}
        />
      </TouchableOpacity>
      <Text style={[styles.title, titleStyle]}>
        {formatSentenceCase(title)}
      </Text>
    </View>
  );
};

export default IconCardTitleBottom;

const styles = StyleSheet.create({
  container: {
    height: moderateScale(300),
    width: moderateScale(300),
    borderRadius: moderateScale(313),
    borderWidth: moderateScale(1),
    borderColor: colors?.SurfCrest,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackground: {
    height: moderateScale(256),
    width: moderateScale(191),
  },
  title: {
    fontSize: moderateScale(18),
    color: colors?.SurfCrest,
    fontWeight: "600",
    marginTop: moderateScale(20),
  },
});
