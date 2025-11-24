import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Slider from "@react-native-community/slider";
import colors from "../../../constant/colors";
import { textScale } from "../../../constant/responsiveStyle";
import { SliderUnitLabel } from "../../../constant/ENUM";
import { min } from "underscore";

const { width } = Dimensions.get("window");
interface Props {
  onValueChange?: any;
  onSlidingComplete?: any;
  minShow?: any;
  maxVal?: any;
  isMaxVal?: any;
  frequencyCount?: any;
  usedInActivityFeedback: boolean;
  progress?: any;
  unit?: string;
}

const TimeSlider = ({
  maxVal,
  isMaxVal,
  onValueChange,
  frequencyCount,
  usedInActivityFeedback,
  progress,
  unit,
}: any) => {
  const [value, setValue] = useState(progress ?? 0);
  console.log("maxVal=-=>", maxVal);

  const calculatePosition = () => {
    const sliderWidth = width - 105;
    const thumbPosition = (value / maxVal) * sliderWidth;
    return thumbPosition;
  };
  const unitLabel = () => {
    switch (unit) {
      case SliderUnitLabel?.Minutes:
        return SliderUnitLabel?.Min;
      case SliderUnitLabel?.Steps:
        return SliderUnitLabel?.Steps;
      default:
        return unit || SliderUnitLabel?.Min;
    }
  };
  return (
    <View style={styles.container}>
      {/* Dynamic floating circle based on slider value */}
      <View
        style={[styles.valueContainer, { left: calculatePosition(), top: -65 }]}
      >
        <View style={styles.circle}>
          <Text style={styles.valueText}>{value}</Text>
          {!usedInActivityFeedback && (
            <Text style={styles.valueText1}>
              {/* {frequencyCount == 1 ? "min" : "count"} */}
              {unitLabel()}
            </Text>
          )}
        </View>
      </View>

      {/* Slider */}
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={maxVal}
        minimumTrackTintColor="#FF9B3B"
        maximumTrackTintColor="#95A5A6"
        thumbTintColor="#FF9B3B"
        value={Number(progress) || value}
        step={1}
        onValueChange={(val) => {
          console.log("val--->", val);
          setValue(val);
          onValueChange(val);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.transparent,
  },
  valueContainer: {
    position: "absolute",
    top: -30,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: "#FF9B3B",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.prussianBlue,
  },
  valueText: {
    fontSize: textScale(14),
    fontWeight: "bold",
    color: colors.SurfCrest,
  },
  valueText1: {
    fontSize: textScale(10),
    fontWeight: "bold",
    color: colors.SurfCrest,
  },
  slider: {
    width: width - 80,
    height: 40,
  },
  label: {
    fontSize: 18,
    color: "#95A5A6",
    marginTop: 10,
  },
});

export default TimeSlider;
