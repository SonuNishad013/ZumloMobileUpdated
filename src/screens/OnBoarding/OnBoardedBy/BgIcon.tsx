import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BGCircleOp } from "../../../assets";
import { moderateScale } from "../../../constant/responsiveStyle";

interface Props {}
const BgIcon: React.FC<Props> = () => {
  return (
    <View style={style?.iconContainer}>
      <BGCircleOp />
    </View>
  );
};

export default BgIcon;

const style = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    right: moderateScale(0),
  },
});
