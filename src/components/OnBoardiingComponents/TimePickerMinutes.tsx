import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import CircularSlider from "../TimePicker/CircularSlider";
import colors from "../../constant/colors";
import { ClockSaltIcon, MoonsaltIcon } from "../../assets";
import { moderateScale } from "../../constant/responsiveStyle";

interface Props {
  onChangesTime?: (value: number) => void;
  value?: number;
  showMin: boolean;
}

const TimePickerMinutes: React.FC<Props> = ({
  onChangesTime,
  value,
  showMin = false,
}) => {
  const initialAngleLength = value ? value / 2 : 0; // Calculate initial angleLength based on value
  const [startAngle, setStartAngle] = useState(0);
  const [angleLength, setAngleLength] = useState(initialAngleLength);
  const [updatedValue, setUpdatedValue] = useState<number>(value || 0);

  useEffect(() => {
    setAngleLength(value ? value / 2 + 0.1 : 0); // Update angleLength when value changes
    setUpdatedValue(value || 0);
  }, [value]);

  useEffect(() => {
    if (onChangesTime) {
      onChangesTime(updatedValue);
    }
  }, [updatedValue]);

  return (
    <>
      <CircularSlider
        mainStyle={styles.mainStyle}
        startAngle={startAngle}
        angleLength={angleLength}
        onUpdate={({ startAngle, angleLength }) => {
          setStartAngle(startAngle);
          const updated = Math.trunc(angleLength * 2);
          setUpdatedValue(updated);
          setAngleLength(angleLength);
        }}
        value={showMin ? `${updatedValue * 5} min` : `${updatedValue} hrs`}
        segments={2}
        strokeWidth={30}
        radius={130}
        gradientColorFrom={colors?.royalOrange}
        gradientColorTo={colors?.royalOrange}
        showClockFace
        clockFaceColor={colors?.SurfCrest}
        bgCircleColor={colors?.clockColor}
        stopIcon={<ClockSaltIcon />}
        startIcon={<MoonsaltIcon />}
        showMin
      />
    </>
  );
};

export default TimePickerMinutes;

const styles = StyleSheet.create({
  mainStyle: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: moderateScale(60),
  },
});
