import { StyleSheet } from "react-native";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";

export const style = StyleSheet.create({
  TimePickerMainContainer: {
    marginTop: moderateScale(35),
  },
  selectDurationTxt: {
    fontSize: textScale(14),
    color: colors?.SurfCrest,
    fontWeight: "400",
  },
  valSliderContainer: {
    height: moderateScale(192.26),
    backgroundColor: colors?.surfCrustOp3,
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
