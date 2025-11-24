import { StyleSheet } from "react-native";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";

export const styles = StyleSheet.create({
  confirmDeletionText: {
    fontSize: textScale(24),
    color: colors.prussianBlue,
    fontWeight: "600",
    marginTop: moderateScale(25),
  },
  deletionDescription: {
    fontSize: textScale(14),
    color: colors.prussianBlue,
    fontWeight: "400",
    marginTop: moderateScale(10),
  },
  inputContainer: {
    height: moderateScale(117),
    marginTop: moderateScale(15),
  },
  emailInput: {
    borderColor: colors.royalOrange,
  },
  inputText: {
    color: colors.prussianBlue,
  },
  phnView: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: moderateScale(15),
    borderColor: colors?.royalOrange,
    borderWidth: moderateScale(1),
    height: moderateScale(56),
    padding: moderateScale(10),
    marginTop: moderateScale(5),
  },
  phnTextInput: {
    fontSize: textScale(15),
    color: colors.prussianBlue,
    height: moderateScale(50),
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  phnMarginRight: {
    marginRight: moderateScale(10),
  },
  phnErrorText: {
    color: colors.royalOrange,
    paddingLeft: moderateScale(8),
    marginTop: moderateScale(5),
  },
  innerView: {
    flex: 1,
    marginHorizontal: moderateScale(19),
  },
  commonButtonContainer: {
    width: "auto",
  },
  headerContainer: {
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(15),
    marginBottom: moderateScale(10),
  },
  headerText: {
    color: colors?.prussianBlue,
  },
  headerIconContainer: {
    backgroundColor: colors?.saltLight,
  },
  loginButtonText: {
    color: colors.SurfCrest,
  },
  timerTxtStyle: {
    fontSize: textScale(14),
    color: colors?.prussianBlue,
    fontWeight: "400",
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
    color: colors?.prussianBlue,
  },
  otpMainContainer: {
    marginHorizontal: moderateScale(0),
  },
});
