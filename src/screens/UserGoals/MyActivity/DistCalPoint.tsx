import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";

interface Props {}
const DistCalPoint: React.FC<Props> = () => {
  return (
    <View style={style?.distCalPointMainContainer}>
      <View>
        <Text style={style?.dcpValStyle}>{"7,564 m"}</Text>
        <Text style={style?.dcpTitleTxt}>{"Distance"}</Text>
      </View>
      <View>
        <Text style={style?.dcpValStyle}>{"5,390"}</Text>
        <Text style={style?.dcpTitleTxt}>{"Calories"}</Text>
      </View>
      <View>
        <Text style={style?.dcpValStyle}>{"1,564"}</Text>
        <Text style={style?.dcpTitleTxt}>{"Points"}</Text>
      </View>
    </View>
  );
};

export default DistCalPoint;

const style = StyleSheet.create({
  distCalPointMainContainer: {
    height: moderateScale(73),
    borderColor: colors?.royalOrange,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(15),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(20),
    alignItems: "center",
    marginTop: moderateScale(30),
  },
  dcpValStyle: {
    color: colors?.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "400",
  },
  dcpTitleTxt: {
    color: colors?.SurfCrest,
    fontSize: textScale(10),
    fontWeight: "400",
  },
});
