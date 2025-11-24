import React from "react";
import { View, StyleSheet, ViewStyle, Text } from "react-native";
import VerticalSlider from "rn-vertical-slider";
import colors from "../../constant/colors";
import ScaleIcon from "./ScaleIcon"; // Ensure this is the correct path to your ScaleIcon component
import { formatSentenceCase } from "../../helper/sentenceCase";

interface CommonVerticalSliderProps {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  labels: any;
  trackColor?: string;
  indicatorStyle?: ViewStyle;
  indicatorBarStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  sliderStyle?: ViewStyle;
  scaleHeight: number;
  scaleWidth: number;
}

const CommonVerticalSlider: React.FC<CommonVerticalSliderProps> = ({
  value,
  min,
  max,
  step,
  onChange,
  labels,
  trackColor,
  containerStyle,
  sliderStyle,
  indicatorStyle,
  indicatorBarStyle,
  scaleHeight,
  scaleWidth,
}) => {
  console.log("first00labels00>", labels);
  return (
    <View style={[styles.container, containerStyle]}>
      <ScaleIcon
        scaleHeight={scaleHeight}
        scaleWidth={scaleWidth}
        labelCount={labels?.length}
      />
      <View style={styles.sliderContainer}>
        <VerticalSlider
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={onChange}
          height={scaleHeight}
          width={40}
          minimumTrackTintColor={
            !trackColor ? trackColor : colors?.lightSurfCrest15
          }
          maximumTrackTintColor={colors?.lightSurfCrest15}
          showIndicator
          renderIndicator={() => (
            <View style={[styles.indicator, indicatorStyle]}>
              <View style={[styles.indicatorBar, indicatorBarStyle]} />
            </View>
          )}
          containerStyle={sliderStyle}
          sliderStyle={{
            backgroundColor: trackColor,
            borderRadius: 33,
          }}
        />
      </View>
      <View style={[styles.scaleContainer, { height: scaleHeight }]}>
        {labels
          .slice()
          .reverse()
          .map((label: any, index: any) => {
            return (
              <Text
                key={index + label}
                style={[
                  styles.label,
                  {
                    color: label?.isSelected
                      ? colors?.royalOrange
                      : colors?.SurfCrest,
                  },
                ]}
              >
                {formatSentenceCase(
                  label?.optionValue ? label?.optionValue : label?.title
                )}
              </Text>
            );
          })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 20,
  },
  sliderContainer: {
    marginLeft: 10,
  },
  indicator: {
    height: 70,
    width: 40,
    top: -35,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors?.royalOrangeDark,
    position: "absolute",
  },
  indicatorBar: {
    height: 35,
    width: 2,
    backgroundColor: colors.orangeD,
    transform: [{ rotate: "90deg" }],
  },

  scaleContainer: {
    justifyContent: "space-between",
    height: 400,
    marginLeft: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors?.SurfCrest,
  },
});

export default CommonVerticalSlider;
