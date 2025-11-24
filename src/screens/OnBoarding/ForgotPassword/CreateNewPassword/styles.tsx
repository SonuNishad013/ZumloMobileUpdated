import { StyleSheet } from "react-native";
import { moderateScale } from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";

export const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: moderateScale(19),
    flex: 1,
  },
  bgImg: { flex: 1 },
  cmnInputStyle: {
    borderColor: colors.royalOrange,
  },
  cmnInputStyle2: {
    borderColor: colors.royalOrange,
    marginTop: moderateScale(10),
  },
  cmnInputTxtStyle: {
    color: colors.SurfCrest,
  },
  matchTxt: { color: colors.royalOrange, paddingLeft: moderateScale(8) },
  btmBtnContainer: {
    marginBottom: moderateScale(20),
  },
  cmnBtnStyle: { width: "auto", marginTop: moderateScale(20) },
  comBtnNameStyle: {
    color: colors.white,
  },
});
