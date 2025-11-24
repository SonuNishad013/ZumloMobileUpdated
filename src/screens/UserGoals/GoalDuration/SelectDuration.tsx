import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { LowerAngle, UpperAngle } from "../../../assets";
import Slider from "@react-native-community/slider";

interface Props {
  value?: any;
  onValueChange?: (value: number) => void;
  Duration?: any;
}
const SelectDuration: React.FC<Props> = ({
  value,
  onValueChange,
  Duration,
}) => {
  return (
    <View style={style?.TimePickerMainContainer}>
      <Text style={style?.selectDurationTxt}>{"Select Duration"}</Text>
      <View style={style?.valSliderContainer}>
        <View style={style?.valMintContainer}>
          <View style={style?.valueContainer}>
            <UpperAngle
              height={`${moderateScale(5)}`}
              width={`${moderateScale(9)}`}
            />

            <Text style={style?.valueTxtStyle}>{Duration}</Text>
            <LowerAngle
              height={`${moderateScale(5)}`}
              width={`${moderateScale(9)}`}
            />
          </View>
          <Text style={style?.mintTxtStyle}>{"Minutes"}</Text>
        </View>
        <View>
          <Slider
            style={style?.sliderStyle}
            minimumValue={0}
            maximumValue={180}
            minimumTrackTintColor={colors?.polishedPine}
            maximumTrackTintColor={colors?.SurfCrest}
            step={1}
            value={value}
            thumbTintColor={colors?.SurfCrest}
            onValueChange={onValueChange}
          />
        </View>
      </View>
    </View>
  );
};

export default SelectDuration;

const style = StyleSheet.create({
  TimePickerMainContainer: {
    marginTop: moderateScale(35),
  },
  selectDurationTxt: {
    fontSize: textScale(14),
    color: colors?.LividBrown,
    fontWeight: "600",
  },
  valSliderContainer: {
    height: moderateScale(192.26),
    backgroundColor: colors?.SaltBox,
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
