import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";

import Slider from "@react-native-community/slider";
import { LowerAngle, UpperAngle } from "../../assets";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { strings } from "../../constant/strings";

interface Props {
  value?: any;
  onValueChange?: (value: number) => void;
  Duration?: any;
  TimePickerMainContainer?: ViewStyle;
  onAssendingStepCount?: () => void;
  onDessendingStepCount?: () => void;
  title?: any;
  maximumValue?: any;
  steps?: any;
  selectDuration?: string;
}
const SelectMinDuration: React.FC<Props> = ({
  value,
  onValueChange,
  Duration,
  TimePickerMainContainer,
  onAssendingStepCount,
  onDessendingStepCount,
  title,
  maximumValue,
  steps,
  selectDuration,
}) => {
  return (
    <View style={[style?.TimePickerMainContainer, TimePickerMainContainer]}>
      <Text style={style?.selectDurationTxt}>
        {selectDuration || strings?.selectDuration}
      </Text>
      <View style={style?.valSliderContainer}>
        <View style={style?.valMintContainer}>
          <View>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={onAssendingStepCount}
            >
              <UpperAngle
                height={`${moderateScale(5)}`}
                width={`${moderateScale(9)}`}
              />
            </TouchableOpacity>

            <Text style={style?.valueTxtStyle}>{Duration}</Text>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={onDessendingStepCount}
            >
              <LowerAngle
                height={`${moderateScale(5)}`}
                width={`${moderateScale(9)}`}
              />
            </TouchableOpacity>
          </View>
          <Text style={style?.mintTxtStyle}>{title}</Text>
        </View>
        <View>
          <Slider
            style={style?.sliderStyle}
            minimumValue={0}
            maximumValue={maximumValue}
            minimumTrackTintColor={colors?.polishedPine}
            maximumTrackTintColor={colors?.SurfCrest}
            step={steps}
            value={value}
            thumbTintColor={colors?.SurfCrest}
            onValueChange={onValueChange}
          />
        </View>
      </View>
    </View>
  );
};

export default SelectMinDuration;

const style = StyleSheet.create({
  TimePickerMainContainer: {
    marginTop: moderateScale(35),
  },
  selectDurationTxt: {
    fontSize: textScale(14),
    color: colors?.SurfCrest,
    fontWeight: "400",
  },
  valSliderContainer: {
    height: moderateScale(192.26),
    backgroundColor: colors?.surfCrustOp3,
    borderRadius: moderateScale(15),
    alignItems: "center",
    justifyContent: "center",
    marginTop: moderateScale(7),
  },
  valMintContainer: { flexDirection: "row", alignItems: "center" },
  valueContainer: {
    alignItems: "center",
  },
  valueTxtStyle: {
    fontSize: moderateScale(90),
    fontWeight: "600",
    color: colors?.royalOrange,
  },
  mintTxtStyle: {
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
    alignSelf: "flex-end",
    marginBottom: moderateScale(24),
  },
  sliderStyle: {
    width: moderateScale(280),
    height: moderateScale(40),
    borderRadius: moderateScale(15),
  },
});
