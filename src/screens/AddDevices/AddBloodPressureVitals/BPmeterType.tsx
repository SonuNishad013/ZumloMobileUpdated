import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { CounterMinus, CounterPlus } from "../../../assets";
import { strings } from "../../../constant/strings";
import colors from "../../../constant/colors";
import { moderateScale } from "../../../constant/responsiveStyle";

interface Props {
  decrementCounter?: any;
  incrementCounter?: any;
  value?: any;
  title?: any;
}
const BPmeterType: React.FC<Props> = ({
  decrementCounter,
  incrementCounter,
  value,
  title,
}) => {
  return (
    <View style={styles.metersView}>
      <Text style={styles.valueText}>{title}</Text>
      <View style={styles.counterView}>
        <TouchableOpacity
          // onPress={() => decrementCounter("systolic")}
          onPress={decrementCounter}
        >
          <CounterMinus height={26} width={26} />
        </TouchableOpacity>
        <View style={{ paddingHorizontal: moderateScale(5) }} />
        <Text style={styles.countText}>{value}</Text>
        <View style={{ paddingHorizontal: moderateScale(5) }} />
        <TouchableOpacity
          // onPress={() => incrementCounter("systolic")}
          onPress={incrementCounter}
        >
          <CounterPlus height={26} width={26} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BPmeterType;

const styles = StyleSheet.create({
  metersView: {
    borderRadius: moderateScale(10),
    borderColor: colors?.royalOrange,
    borderWidth: moderateScale(1),
    height: moderateScale(56),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(10),
  },
  counterView: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  valueText: {
    fontWeight: "600",
    color: colors?.SurfCrest,
    fontFamily: "Poppins-Regular",
  },
  countText: {
    fontWeight: "500",
    color: colors?.royalOrange,
  },
});
