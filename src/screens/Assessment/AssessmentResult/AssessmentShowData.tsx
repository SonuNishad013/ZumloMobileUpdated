import { Image, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";

interface Props {
  renderPerView?: ViewStyle;
  title?: string;
  percentage?: string;
  description?: string;
  icon?: any;
}
const AssessmentShowData: React.FC<Props> = ({
  renderPerView,
  title,
  percentage,
  description,
  icon,
}) => {
  return (
    <View style={style?.mainContainer}>
      <View style={style?.iconTitlePerView}>
        <View style={style?.iconTitleView}>
          <Image source={icon} style={style?.iconStyle} />
          <Text style={style?.titleTxtStyle}>{title}</Text>
        </View>
        <Text style={style?.perTxtStyle}>{percentage}</Text>
      </View>
      <View style={style?.lineStyleView}>
        <View style={[style?.renderPerView, renderPerView]} />
      </View>
      <Text style={style?.btmTxtStyle}>{description}</Text>
    </View>
  );
};

export default AssessmentShowData;

const style = StyleSheet.create({
  mainContainer: {
    width: moderateScale(333),
    marginTop: moderateScale(40),
  },
  iconTitlePerView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconTitleView: {
    flexDirection: "row",
  },
  titleTxtStyle: {
    fontSize: textScale(16),
    fontWeight: "600",
    color: colors?.SurfCrest,
    marginLeft: moderateScale(10),
  },
  perTxtStyle: {
    fontSize: textScale(16),
    fontWeight: "600",
    color: colors?.SurfCrest,
  },
  lineStyleView: {
    height: moderateScale(10),
    backgroundColor: colors?.grey,
    borderRadius: moderateScale(100),
    marginTop: moderateScale(15),
    width: moderateScale(331),
    alignSelf: "center",
  },
  renderPerView: {
    backgroundColor: colors?.royalOrange,
    width: "50%",
    height: moderateScale(10),
    borderRadius: moderateScale(100),
  },

  btmTxtStyle: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.SilverChalice,
    marginTop: moderateScale(10),
  },
  iconStyle: { height: moderateScale(20), width: moderateScale(20) },
});
