import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import { MinusIcon, PlusSvgIcon } from "../../assets";
import colors from "../../constant/colors";

interface Props {
  data?: any;
  onChangesFrequency?: any;
}
const DescendingAscending: React.FC<Props> = ({ data, onChangesFrequency }) => {
  const initialIndex = data ? data.findIndex((itm: any) => itm.isSelected) : -1;
  const [frequencyIndex, setFrequencyIndex] = useState(initialIndex);
  const [frequencyData, setFrequencyData] = useState<any>([]);

  useEffect(() => {
    if (data == undefined) return;
    setFrequencyData(data);
  }, [data]);
  useEffect(() => {
    onChangesFrequency(frequencyIndex);
  }, [frequencyIndex]);

  const onAddFrequency = () => {
    if (frequencyIndex == frequencyData?.length - 1) return;
    setFrequencyIndex((prev: any) => prev + 1);
  };
  const onSubtractFrequency = () => {
    if (frequencyIndex === 0) return;
    setFrequencyIndex((prev: any) => prev - 1);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onSubtractFrequency} style={styles.buttonLeft}>
        <MinusIcon style={styles.minusIcon} />
      </TouchableOpacity>
      <View style={styles.centerContainer}>
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle}>
            <Text style={styles.titleText}>
              {frequencyData[frequencyIndex]?.optionValue
                ? frequencyData[frequencyIndex]?.optionValue
                : "None"}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={onAddFrequency} style={styles.buttonRight}>
        <PlusSvgIcon style={styles.plusIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default DescendingAscending;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: moderateScale(53),
    backgroundColor: colors.themeColor,
    height: moderateScale(91),
    marginTop: moderateScale(20),
    alignSelf: "center",
  },
  buttonLeft: {
    borderTopLeftRadius: moderateScale(53),
    backgroundColor: colors.SurfCrest,
    borderBottomLeftRadius: moderateScale(53),
    width: moderateScale(105),
    justifyContent: "center",
    alignItems: "center",
    height: moderateScale(91),
  },
  minusIcon: {
    marginRight: moderateScale(40),
  },
  centerContainer: {
    zIndex: 20,
    position: "relative",
    height: moderateScale(90),
    justifyContent: "center",
    alignItems: "center",
  },
  outerCircle: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.themeColor,
    borderWidth: moderateScale(1),
    width: moderateScale(100),
    height: moderateScale(100),
    backgroundColor: colors.themeColor,
    borderRadius: moderateScale(95),
    position: "absolute",
  },
  innerCircle: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.royalOrange,
    borderWidth: moderateScale(1),
    width: moderateScale(90),
    height: moderateScale(90),
    backgroundColor: colors.themeColor,
    borderRadius: moderateScale(95),
    position: "absolute",
  },
  titleText: {
    fontSize: textScale(14),
    fontWeight: "500",
    color: colors.SurfCrest,
  },
  buttonRight: {
    backgroundColor: colors.SurfCrest,
    borderTopRightRadius: moderateScale(53),
    borderBottomRightRadius: moderateScale(53),
    width: moderateScale(105),
    justifyContent: "center",
    alignItems: "center",
    height: moderateScale(91),
  },
  plusIcon: {
    marginLeft: moderateScale(40),
  },
});
