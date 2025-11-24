import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { Slider } from "../../components/SliderComponent";
import colors from "../../constant/colors";
import { moderateScale, textScale } from "../../constant/responsiveStyle";

import { FunBrkt } from "../../assets";

interface Props {
  onValueChange?: any;
  onSlidingComplete?: any;
  value?: any;
  title?: any;
  initialValue?: any;
  lastValue?: any;
  barStyle?: ViewStyle;
  disableMinTrackTintColor: any;
  maximumTrackTintColor: any;
  minimumTrackTintColor: any;
  ValueTitleText?: any;
  ValueTitle?: any;
  cacheValue?: any;
  progressValue?: any;
}

const SimpleSlider: React.FC<Props> = ({
  onValueChange,
  value,
  onSlidingComplete,
  title,
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
}) => {
  const progress = useSharedValue(progressValue);
  const min = useSharedValue(initialValue);
  const max = useSharedValue(lastValue);
  const cache = useSharedValue(cacheValue);

  return (
    <View style={{ marginTop: moderateScale(20) }}>
      <Text
        style={{
          fontSize: textScale(14),
          fontWeight: "400",
          color: colors?.SurfCrest,
        }}
      >
        {title}
      </Text>
      <View style={styles.container}>
        <View
          style={{
            marginHorizontal: moderateScale(35),
          }}
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
                <View>
                  <View style={[styles?.barStyle, barStyle]}>
                    <FunBrkt
                      height={`${moderateScale(15)}`}
                      width={`${moderateScale(15)}`}
                    />
                  </View>
                  <Text
                    style={{
                      color: colors?.SurfCrest,
                      fontWeight: "400",
                      fontSize: textScale(10),
                      marginTop: moderateScale(45.7),
                    }}
                  >
                    {value}
                    {ValueTitle && <Text>{ValueTitleText}</Text>}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
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
    marginTop: moderateScale(19.5),
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

export default SimpleSlider;
