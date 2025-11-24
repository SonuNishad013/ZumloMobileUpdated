import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { strings } from "../../../constant/strings";
import CommonHeader from "../../../components/Header/commonHeader";

interface Props {
  navigation?: any;
  score?: any;
}

const HeaderHealthScore: React.FC<Props> = ({
  navigation,
  score,
}) => {
  return (
    <View style={style.inputMainContainer}>
      <CommonHeader
        onBackPress={() => navigation.goBack()}
        headerName={strings.yourGoals}
        iconContainer={style.headerIconContainer}
        textStyle={style.headerTextStyle}
      />
      <View style={style.percentDataContainer}>
        <Text style={style.userValTxtStyle}>{score}</Text>
        <Text style={style.slashStyle}>/</Text>
        <Text style={style.totalPerTxtStyle}>{"100"}</Text>
      </View>
      <Text style={style.healthScoreTxtStyle}>{strings.healthScrore}</Text>
    </View>
  );
};

export default HeaderHealthScore;

const style = StyleSheet.create({
  inputMainContainer: {
    backgroundColor: colors.prussianBlue,
    paddingTop: moderateScale(10),
    borderBottomLeftRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(30),
    paddingHorizontal: moderateScale(17),
    paddingBottom: moderateScale(15),
  },
  percentDataContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    overflow: "hidden",
    marginTop: moderateScale(13),
  },
  userValTxtStyle: {
    fontSize: textScale(62),
    fontWeight: "700",
    color: colors.royalOrange,
  },
  slashStyle: {
    fontSize: textScale(33),
    fontWeight: "500",
    color: colors.SilverChalice,
    paddingBottom: moderateScale(12),
  },
  totalPerTxtStyle: {
    fontSize: textScale(25),
    fontWeight: "500",
    color: colors.SilverChalice,
    paddingBottom: moderateScale(10),
  },
  healthScoreTxtStyle: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors.SilverChalice,
  },
  headerIconContainer: {
    backgroundColor: colors.Daintree,
  },
  headerTextStyle: {
    color: colors.SurfCrest,
  },
});
