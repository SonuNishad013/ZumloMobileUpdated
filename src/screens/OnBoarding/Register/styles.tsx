import { StyleSheet } from "react-native";
import {
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";

export const styles = StyleSheet.create({
  mailLoginView: {
    marginTop: moderateScale(10),
  },

  loginButtonText: {
    color: colors.SurfCrest,
  },

  focusedText: {
    color: colors?.SurfCrest,
    fontSize: textScale(12),
  },
  unFocusedTxt: {
    color: colors?.SurfCrest,
    fontSize: textScale(12),
  },
  placeHolder: {
    flex: 1,
  },
  phnView: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: moderateScale(15),
    borderColor: colors?.royalOrange,
    borderWidth: 1,
    height: moderateScale(56),
    padding: moderateScale(10),
    marginTop: moderateScale(25),
  },
  innerView: {
    flex: 1,
    marginHorizontal: moderateScale(19),
    marginBottom: moderateScale(20),
  },
  mConatiner: { marginTop: moderateScale(10) },
  termAndServices: {
    color: colors?.SurfCrest,
    fontWeight: "500",
    fontSize: textScale(13),
  },
  consentContainerInRegisterScreen: {
    marginBottom: moderateScale(19),
    flexDirection: "row",
    gap: moderateScale(5),
    alignItems: "flex-start",
  },
  consentCheckBox: {
    height: moderateScale(15),
    width: moderateScale(15),
    borderWidth: 1,
    borderColor: colors?.SurfCrest,
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateScale(2),
  },
  consentText: {
    color: colors?.SurfCrest,
    width: width * 0.85,
    fontSize: textScale(13),
  },
  btmDrop_: {
    top: moderateScale(25),
    position: "absolute",
  },
  btm_: {
    marginLeft: moderateScale(5),
  },
  number_: {
    fontSize: textScale(15),
    color: colors.SurfCrest,
    height: moderateScale(50),
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  Phone_err: {
    color: colors.royalOrange,
    paddingLeft: moderateScale(8),
    marginTop: moderateScale(5),
  },
});
