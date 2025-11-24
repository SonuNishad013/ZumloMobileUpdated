import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";

interface Props {
  data?: any;
}

const RecipesCardDetails: React.FC<Props> = ({ data }) => {
  return (
    <View style={style.cardContainer}>
      <View style={style.rowContainer}>
        {data?.divTime?.map((itm: any, index: number) => (
          <View key={index} style={style.timeContainer}>
            <Text style={style.timeTitle}>{itm?.title}</Text>
            <Text style={style.timeValue}>{itm?.time}</Text>
          </View>
        ))}
      </View>
      <View style={style.servingsContainer}>
        <Text style={style.servingsTitle}>{data?.servingsTitle}</Text>
        <Text style={style.servingsValue}>{data?.servings}</Text>
      </View>
      <Text style={style.noteText}>{`Note: ${data?.note}`}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors?.SaltBox,
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(8),
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeContainer: {
    // alignItems: "center",
  },
  timeTitle: {
    fontWeight: "700",
    fontSize: textScale(12),
    color: colors?.orgDark,
  },
  timeValue: {
    fontWeight: "500",
    fontSize: textScale(12),
    color: colors?.SurfCrest,
    marginTop: moderateScale(5),
  },
  servingsContainer: {
    marginTop: moderateScale(10),
  },
  servingsTitle: {
    fontWeight: "700",
    fontSize: textScale(12),
    color: colors?.orgDark,
  },
  servingsValue: {
    fontWeight: "500",
    fontSize: textScale(12),
    color: colors?.SurfCrest,
    marginTop: moderateScale(5),
  },
  noteText: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors?.SurfCrest,
    marginTop: moderateScale(20),
  },
});

export default RecipesCardDetails;
