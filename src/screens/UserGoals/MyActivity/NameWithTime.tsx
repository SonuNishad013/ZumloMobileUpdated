import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { strings } from "../../../constant/strings";

interface Props {}
const NameWithTime: React.FC<Props> = () => {
  return (
    <>
      <Text style={style?.nameTxtStyle}>
        {strings?.hello} {"Vinod"}
      </Text>

      <Text style={style?.txtStyle1}>
        {strings?.walk}
        <Text style={{ color: colors?.royalOrange }}>
          {"69"}
          {strings?.min}
        </Text>
        <Text>{strings?.today}</Text>
      </Text>
    </>
  );
};

export default NameWithTime;

const style = StyleSheet.create({
  nameTxtStyle: {
    fontSize: textScale(25),
    fontWeight: "500",
    color: colors?.SurfCrest,
    marginTop:moderateScale(10)
  },
  todayDataContainer: { flexDirection: "row" },
  txtStyle1: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.SurfCrest,
  },
});
