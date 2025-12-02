import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import LoaderSalt from "../Loader/LoaderSalt";
import { ButtonSentencecase } from "../../helper/sentenceCase";
import CustomImage from "../ImageRender";
import { backgrounColor } from "../../constant/ProfileConstant";

interface Props {
  mainContainer?: ViewStyle;
  onPress?: () => void;
  btnName?: string;
  btnNameStyle?: TextStyle;
  activeOpacity?: any;
  isLoading?: any;
  leftImage?: any;
  rightImage?: any;
  leftImageStyle?: any;
  rightImageStyle?: any;
  disabled?: boolean;
  tintColor?: any;
  iconSource?: any;
  tintIconColor?: any;
  TextFormatDisable?: boolean;
  testID?: string;
}

const CommonButton: React.FC<Props> = ({
  mainContainer,
  onPress,
  btnName,
  btnNameStyle,
  activeOpacity,
  isLoading,
  leftImage,
  rightImage,
  leftImageStyle,
  rightImageStyle,
  disabled = false,
  tintColor,
  iconSource,
  tintIconColor,
  TextFormatDisable,
  testID,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity || 0.5}
      style={[styles.mainContainer, mainContainer]}
      onPress={onPress}
      disabled={disabled}
      testID={testID}
    >
      {leftImage && (
        <Image
          source={leftImage}
          style={[
            {
              width: moderateScale(23),
              height: moderateScale(26),
              marginEnd: moderateScale(10),
              overflow: "hidden",
            },
            leftImageStyle,
          ]}
          tintColor={tintColor}
          resizeMode="contain"
        />
      )}
      {iconSource && (
        <CustomImage
          source={{ uri: iconSource }}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginVertical: moderateScale(10),
          }}
          mainContainer={{
            marginRight: moderateScale(10),
          }}
          tintColor={tintIconColor}
        />
      )}
      {isLoading ? (
        <LoaderSalt />
      ) : (
        <Text
          style={[
            styles.btnNameStyle,
            { color: disabled ? colors?.lightSurfCrest15 : colors?.SurfCrest },
            btnNameStyle,
          ]}
        >
          {btnName}
        </Text>
      )}
      {rightImage && (
        <Image
          source={rightImage}
          style={[
            {
              width: moderateScale(26),
              height: moderateScale(27),
              marginEnd: moderateScale(10),
              marginTop: moderateScale(10),
            },
            rightImageStyle,
          ]}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: moderateScale(60),
    width: moderateScale(335),
    backgroundColor: colors.polishedPine,
    borderRadius: moderateScale(30),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  btnNameStyle: {
    color: colors?.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "500",
    flex: 1,
    textAlign: "center",
  },
});
export default CommonButton;
