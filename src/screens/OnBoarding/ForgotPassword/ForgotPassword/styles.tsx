import { StyleSheet } from "react-native";
import {
  height,
  moderateScale,
  textScale,
} from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";

export const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: moderateScale(19),
    flex: 1,
    paddingTop: moderateScale(100),
  },
  inputContainer: {
    borderColor: colors?.royalOrange,
    marginTop: moderateScale(25),
  },
  inputErrorContainer: { height: moderateScale(115) },
  inputText: {
    color: colors?.SurfCrest,
  },
  buttonContainer: {
    width: "auto",
  },
  btnTextStyle: {
    color: colors?.white,
  },
  phnView: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: moderateScale(15),
    borderColor: colors?.royalOrange,
    borderWidth: moderateScale(1),
    height: moderateScale(56),
    padding: moderateScale(10),
  },
  numberContainer: { marginRight: moderateScale(10) },
  numberInputStyle: {
    fontSize: textScale(15),
    color: colors.SurfCrest,
    height: moderateScale(50),
    justifyContent: "center",
    alignItems: "center",
  },
  ibStyle: { flex: 1 },
  btmBtnContainer: { marginBottom: moderateScale(20) },
  phnErrorTxt: {
    color: colors.royalOrange,
    paddingLeft: moderateScale(8),
    paddingTop: moderateScale(5),
  },
});
