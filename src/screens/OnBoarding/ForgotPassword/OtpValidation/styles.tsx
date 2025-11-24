import { StyleSheet } from "react-native";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";

export const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: moderateScale(20),
    flex: 1,
  },
  ibStyle: { flex: 1 },
  btnMainContainer: {
    marginTop: moderateScale(30),
  },
  btnTextStyle: {
    color: colors.white,
  },
  btmStringBtnMainContainer: {
    alignSelf: "center",
    // flex: 0.07,
  },
  inputMainContainer: {
    marginTop: moderateScale(25),
  },
  otpInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  otpInput: {
    height: moderateScale(50),
    backgroundColor: "transparent",
    width: moderateScale(50),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(8),
    borderWidth: moderateScale(1.2),
  },
  otpInputText: {
    fontSize: textScale(22),
    color: colors.SurfCrest,
    fontWeight: "700",
  },
  boxView: {
    height: moderateScale(50),
    backgroundColor: "transparent",
    width: moderateScale(50),
    fontSize: textScale(22),
    borderRadius: moderateScale(8),
    borderWidth: moderateScale(1.2),
    textAlign: "center",
    paddingTop: moderateScale(9),
    color: "#CBE2D1",
  },
  isFocusedStyle: {
    borderColor: colors?.royalOrange,
    color: colors?.SurfCrest,
  },
  timerContainer: { marginTop: moderateScale(15) },

  timerTxtStyle: {
    fontSize: textScale(14),
    color: colors?.SurfCrest,
    fontWeight: "400",
  },
  errorTxt: {
    marginTop: moderateScale(12),
    color: colors.royalOrange,
    fontSize: textScale(14),
  },
  chgBtnContainer: { marginBottom: moderateScale(20) },
  counterTxt: { color: colors?.royalOrange },
  actionBtn: {
    width: "auto",
    marginTop: moderateScale(30),
  },
});
