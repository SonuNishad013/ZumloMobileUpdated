import {
  Image,
  ImageStyle,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { moderateScale } from "../../constant/responsiveStyle";

interface Props {
  onPress?: () => void;
  mainContainer?: ViewStyle;
  SvgIcon?: any;
  PngIcon?: any;
  source?: any;
  iconStyle?: ImageStyle;
  touchableOpacityStyle?: ViewStyle;
  isDisable?: boolean;
  height?: any;
  width?: any;
  activeOpacity?: any;
}
const CommonBoxButton: React.FC<Props> = ({
  onPress,
  mainContainer,
  SvgIcon,
  PngIcon,
  source,
  iconStyle,
  touchableOpacityStyle,
  isDisable,
  height,
  width,
  activeOpacity,
}) => {
  return (
    <TouchableOpacity
      style={touchableOpacityStyle}
      onPress={onPress}
      disabled={isDisable || false}
      activeOpacity={activeOpacity || 0.5}
    >
      <View style={[styles?.mainContainer, mainContainer]}>
        {PngIcon ? (
          <Image
            source={
              PngIcon
                ? { uri: source?.uri ? source?.uri : source }
                : { uri: source }
            }
            resizeMode={"contain"}
            style={[styles?.iconStyle, iconStyle]}
          />
        ) : (
          <SvgIcon
            height={height || `${moderateScale(17)}`}
            width={width || `${moderateScale(17)}`}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CommonBoxButton;

const styles = StyleSheet.create({
  mainContainer: {
    height: moderateScale(34),
    width: moderateScale(34),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(4),
  },
  iconStyle: {
    height: moderateScale(30),
    width: moderateScale(30),
    borderRadius: moderateScale(5),
  },
});
