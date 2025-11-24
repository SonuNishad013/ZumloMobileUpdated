import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  height,
  moderateScale,
  textScale,
} from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import VerticalSlider from "rn-vertical-slider";
import { ExtrovertIcon, IntrovertIcon } from "../../assets";

const TraitsSlider = ({
  prevAnswer,
  indicatorColor,
  sliderBarColor,
  slidersHeight,
  indicatorsHeight,
  unselectedIconSize,
  selectedIconSize,
  data,
  sliderContainerStyle,
  sliderBarStyle,
  indicatorStyle,
  setStringValue,
}: any) => {
  let initialValue;
  if (prevAnswer) {
    initialValue = prevAnswer == "Introvert" ? 0 : 10;
  } else {
    initialValue = 5;
  }
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    if (value == 5) {
      setStringValue("");
    } else if (value < 5) {
      setStringValue("Introvert");
    } else {
      setStringValue("Extrovert");
    }
  }, [value]);

  let extrovertIconDimensions =
    value > 2
      ? selectedIconSize || moderateScale(70)
      : unselectedIconSize || moderateScale(60);
  let IntrovertIconDimensions =
    value < 1.5
      ? selectedIconSize || moderateScale(70)
      : unselectedIconSize || moderateScale(60);

  return (
    <View style={styles.container}>
      <ExtrovertIcon
        fill={colors?.royalOrangeDark}
        height={extrovertIconDimensions}
        width={extrovertIconDimensions}
      />
      <Text style={styles.extrovertText}>{"Extrovert"}</Text>
      <VerticalSlider
        value={value}
        onChange={setValue}
        height={slidersHeight || height * 0.35}
        width={5}
        step={10}
        min={1}
        max={10}
        borderRadius={5}
        minimumTrackTintColor={sliderBarColor || colors?.traitSliderBar}
        maximumTrackTintColor={sliderBarColor || colors?.traitSliderBar}
        showIndicator
        renderIndicatorHeight={indicatorsHeight || moderateScale(70)}
        renderIndicator={() => (
          <View
            style={[
              {
                height: indicatorsHeight || moderateScale(70),
                backgroundColor: indicatorColor || "#fff",
              },
              styles.indicator,
              indicatorStyle,
            ]}
          />
        )}
        containerStyle={[styles.sliderContainer, sliderContainerStyle]}
        sliderStyle={[styles.sliderBar, sliderBarStyle]}
      />
      <IntrovertIcon
        fill={colors?.SurfCrest}
        height={IntrovertIconDimensions}
        width={IntrovertIconDimensions}
        style={styles.introvertIcon}
      />
      <Text style={styles.introvertText}>{"Introvert"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: moderateScale(20),
  },
  extrovertText: {
    marginBottom: moderateScale(20),
    marginTop: moderateScale(5),
    color: colors?.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "600",
  },
  indicator: {
    width: moderateScale(14),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    left: moderateScale(12),
  },
  sliderContainer: {
    backgroundColor: colors?.transparent,
    borderRadius: moderateScale(10),
    width: moderateScale(40),
    justifyContent: "center",
  },
  sliderBar: {
    borderRadius: moderateScale(5),
    width: moderateScale(10),
    alignSelf: "center",
  },
  introvertIcon: {
    marginTop: moderateScale(20),
  },
  introvertText: {
    margin: moderateScale(5),
    color: colors?.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "600",
  },
});

export default TraitsSlider;
