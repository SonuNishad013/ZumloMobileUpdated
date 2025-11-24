import { StyleSheet } from "react-native";
import {
  height,
  moderateScale,
  textScale,
} from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";

export const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(15),
    marginBottom: moderateScale(10),
    zIndex: 10,
  },
  iconContainer: {
    backgroundColor: "#00000033",
  },
  imageBackground: {
    flex: 1,
    // paddingHorizontal: moderateScale(19),
  },
  scrollContentContainer: {
    paddingBottom: moderateScale(30),
  },
  helpText: {
    fontSize: textScale(24),
    fontWeight: "700",
    color: colors?.SurfCrest,
    marginTop: moderateScale(20),
  },
  inputContainer: {
    height: moderateScale(56),
    marginTop: moderateScale(25),
    borderColor: colors?.SurfCrest,
  },
  textAreaContainer: {
    height: height / 2,
    borderColor: colors?.SurfCrest,
    marginTop: moderateScale(15),
    paddingTop: moderateScale(9),
    paddingRight: moderateScale(1),
  },
  buttonContainer: {
    backgroundColor: colors?.royalOrange,
    marginTop: moderateScale(20),
    width: "auto",
  },
  inputText: {
    height: height / 2.2,
    color: colors?.SurfCrest,
  },
  keyBoard: {
    marginHorizontal: moderateScale(19),
  },
});
