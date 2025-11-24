import { StyleSheet } from "react-native";
import colors from "../../../constant/colors";
import {
  moderateScale,
  textScale,
  verticalScale,
} from "../../../constant/responsiveStyle";
import { textLabelSize } from "../../../utils/TextConfig";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.backgroundTheme,
    marginHorizontal: moderateScale(19),
  },
  containerHeader: {
    marginHorizontal: moderateScale(19),
    paddingBottom: moderateScale(15),
    marginTop: moderateScale(15),
  },

  backIcon: {
    backgroundColor: colors.backIconBg,
    borderColor: colors.backIconBg,
    height: moderateScale(30),
    width: moderateScale(30),
  },
  loginText: {
    fontSize: 14,
    color: colors.SurfCrest,
    fontWeight: "600",
    lineHeight: 17,
    paddingHorizontal: moderateScale(5),
  },
  mailLoginView: {},

  inputView: {
    paddingVertical: verticalScale(10),
    alignItems: "center",
  },
  forgetPwdView: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
    color: colors.SurfCrest,
    marginTop: moderateScale(5),
    paddingRight: moderateScale(10),
    // backgroundColor: "red",
    width: moderateScale(160),
    // width: "100%",
  },
  forgetPwdtext: {
    color: colors.SurfCrest,
  },
  ButtonView: {
    marginTop: moderateScale(25),
    // alignItems: "center",
  },
  loginButtonText: {
    color: colors.SurfCrest,
  },
  registerText: {
    fontWeight: "500",
    fontSize: 14,
    color: colors.SurfCrest,
  },
  loginWithView: {
    flexDirection: "row",
    alignItems: "center",
  },
  socialIconsView: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: moderateScale(25),
  },
  registerView: {
    paddingTop: moderateScale(80),
    alignItems: "center",
    paddingBottom: moderateScale(20),
  },
  focusedText: {
    color: colors?.SurfCrest,
    fontSize: textScale(12),
  },
  unFocusedTxt: {
    color: colors?.SurfCrest,
    fontSize: textScale(12),
  },
  placeHolder: {},
  phnView: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: moderateScale(15),
    borderWidth: moderateScale(1),
    padding: moderateScale(9.5),
    marginTop: moderateScale(30),
    height: moderateScale(56),
    borderColor: colors?.royalOrange,
  },
  changeBtmScreenStyle: {
    alignSelf: "center",
    marginTop: moderateScale(50),
    marginBottom: moderateScale(20),
  },
  btmBtnContainer: {
    marginBottom: moderateScale(20),
    marginTop: moderateScale(20),
    width: "auto",
  },
  phnerrorTxt: {
    color: colors.royalOrange,
    paddingLeft: moderateScale(8),
    marginTop: moderateScale(5),
  },
  textInputStylePhn: {
    paddingLeft: moderateScale(10),
    height: moderateScale(56),
    color: colors.SurfCrest,
    fontSize: textScale(15),
    flex: 1,
  },
  welcomeText: {
    fontSize: textLabelSize?.headerTextSize,
    color: colors.SurfCrest,
    fontWeight: "600",
    marginTop: moderateScale(15),
  },
  subwelcomeText: {
    fontSize: textLabelSize?.subHeaderTextSize,
    color: colors.royalOrangeDark,
    fontWeight: "400",
    marginTop: moderateScale(15),
  },
  consentContainerInRegisterScreen: { marginTop: moderateScale(20) },
});
export default styles;
