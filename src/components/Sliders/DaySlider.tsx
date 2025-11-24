import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { Slider } from "../../components/SliderComponent";
import colors from "../../constant/colors";
import { moderateScale, textScale } from "../../constant/responsiveStyle";

interface Props {
  onValueChange?: any;
  onSlidingComplete?: any;
  value?: any;

  initialValue?: any;
  lastValue?: any;
  barStyle?: ViewStyle;
  disableMinTrackTintColor?: any;
  maximumTrackTintColor?: any;
  minimumTrackTintColor?: any;
  ValueTitleText?: any;
  ValueTitle?: any;
  cacheValue?: any;
  progressValue?: any;
  mainSliderContainer?: ViewStyle;
}

const DaySlider: React.FC<Props> = ({
  onValueChange,
  value,
  onSlidingComplete,
  initialValue,
  lastValue,
  barStyle,
  disableMinTrackTintColor,
  maximumTrackTintColor,
  minimumTrackTintColor,
  ValueTitleText,
  ValueTitle,
  cacheValue,
  progressValue,
  mainSliderContainer,
}) => {
  const progress = useSharedValue(progressValue);
  const min = useSharedValue(initialValue);
  const max = useSharedValue(lastValue);
  const cache = useSharedValue(cacheValue);

  return (
    console.log(
      "progressValue====>>>",
      value, //check for value is it exactly same as you have saved
      progress, // set progressvalue in progress so that slider render it's progress initialy
      progressValue,
      initialValue
    ),
    (
      <View
        style={[
          {
            marginTop: moderateScale(40),
            marginHorizontal: moderateScale(19),
            marginBottom: moderateScale(20),
          },
          mainSliderContainer,
        ]}
      >
        <Slider
          onSlidingComplete={onSlidingComplete}
          onValueChange={onValueChange}
          snapToStep={false}
          cache={cache}
          progress={progress}
          minimumValue={min}
          maximumValue={max}
          theme={{
            disableMinTrackTintColor: disableMinTrackTintColor,
            maximumTrackTintColor: maximumTrackTintColor,
            minimumTrackTintColor: minimumTrackTintColor,
            cacheTrackTintColor: "transparent",
            bubbleBackgroundColor: "transparent",
          }}
          containerStyle={styles.sliderContainer}
          renderThumb={() => {
            return (
              <View
                style={{
                  marginTop: moderateScale(-69.75),
                  paddingLeft: moderateScale(-20),
                }}
              >
                <View style={[styles?.barStyle, barStyle]}></View>

                <Text
                  style={{
                    color: colors?.royalOrange,
                    fontWeight: "500",
                    fontSize: textScale(24),
                  }}
                >
                  {value ? value?.split(" ")?.[0] : 0}
                </Text>

                {ValueTitleText && (
                  <Text
                    style={{
                      color: colors?.SurfCrest,
                      fontWeight: "400",
                      fontSize: textScale(10),
                    }}
                  >
                    {ValueTitleText}
                  </Text>
                )}
              </View>
            );
          }}
        />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors?.surfCrustOp3,
    paddingTop: moderateScale(40),
    paddingBottom: moderateScale(40),
    borderRadius: moderateScale(15),
    marginTop: moderateScale(7),
  },
  sliderContainer: {
    height: moderateScale(20),
    borderRadius: moderateScale(20),
    // borderWidth: moderateScale(1),
    // borderColor: colors?.white,
  },
  bubbleContainer: {
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: moderateScale(25),
    backgroundColor: colors?.surfCrustOp,
    alignItems: "center",
    justifyContent: "flex-end",
    borderColor: colors?.royalOrange,
    borderWidth: moderateScale(2),
    marginBottom: moderateScale(45),
    marginLeft: moderateScale(24),
  },
  bubbleText: {
    fontSize: textScale(22),
    backgroundColor: "transparent",
    color: colors?.SurfCrest,
    fontWeight: "700",
    marginTop: moderateScale(20),
  },
  barStyle: {
    height: moderateScale(19.5),
    width: moderateScale(19.5),
    backgroundColor: colors?.royalOrange,
    borderRadius: moderateScale(12),
    position: "absolute",
    marginTop: moderateScale(60),
    paddingRight: moderateScale(10),
  },
});

export default DaySlider;
