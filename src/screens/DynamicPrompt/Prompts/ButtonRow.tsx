import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { moderateScale } from "../../../constant/responsiveStyle";
interface Props {
  width?: any;
  key1OpacityAnim?: any;
  onSkipPress?: any;
  onNextPress?: any;
  skipText?: any;
  nextText?: any;
  skipStyle?: any;
  nextStyle?: any;
  colors?: any;
  textScale?: any;
  moderateScale?: any;
}
const ButtonRow: React.FC<Props> = ({
  width,
  key1OpacityAnim,
  onSkipPress,
  onNextPress,
  skipText = "Skip",
  nextText = "Next",
  skipStyle = {},
  nextStyle = {},
  colors,
  textScale,
}) => {
  return (
    <View style={[styles.container, { width, marginTop: moderateScale(20) }]}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: colors?.lightSurfCrest,
            borderRadius: moderateScale(30),
          },
          skipStyle,
        ]}
        onPress={onSkipPress}
      >
        <Animated.View style={{ opacity: key1OpacityAnim }}>
          <Text
            style={[
              styles.text,
              {
                color: colors?.prussianBlue,
                fontSize: textScale(14),
                paddingVertical: moderateScale(15),
              },
            ]}
          >
            {skipText}
          </Text>
        </Animated.View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: colors?.polishedPine,
            borderRadius: moderateScale(30),
          },
          nextStyle,
        ]}
        onPress={onNextPress}
      >
        <Animated.View style={{ opacity: key1OpacityAnim }}>
          <Text
            style={[
              styles.text,
              {
                color: colors?.SurfCrest,
                fontSize: textScale(14),
                paddingVertical: moderateScale(15),
              },
            ]}
          >
            {nextText}
          </Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  button: {
    width: "40%",
    alignItems: "center",
    marginTop: 8,
  },
  text: {
    fontWeight: "500",
    textAlign: "center",
  },
});

export default ButtonRow;
