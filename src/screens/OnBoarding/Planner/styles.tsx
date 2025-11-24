import { Platform, StyleSheet } from "react-native";
import {
  height,
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";

export const styles = StyleSheet.create({
  buttonView: {
    paddingTop: moderateScale(10),
  },
  subContainer: {
    flex: 1,
    paddingTop: moderateScale(20),
  },
  headerMainContainer: {
    marginTop: moderateScale(15),
    marginBottom: moderateScale(15),
  },
  chatModalContainer: {
    minHeight: height / 1.3,
    width: width - moderateScale(60),
    alignItems: "center",
    padding: 10,
  },
  innerContainer: {
    marginHorizontal: moderateScale(15),
    height: height / 3,
    width: width - moderateScale(90),
    marginTop: moderateScale(70),
    // justifyContent: "center",
    // alignItems: "center",
  },
  greetingTextStyle: {
    // fontSize: textScale(24),
    // fontWeight: "700",
    // color: colors.prussianBlue,
    // textAlign: "center",
    fontSize: textScale(24),
    fontWeight: "bold",
    color: colors.polishedPine,
    textAlign: "center",
    marginTop: moderateScale(50),
  },
  descriptionTextStyle: {
    // fontSize: textScale(14),
    // fontWeight: "400",
    // color: colors.prussianBlue,
    // textAlign: "center",
    // margin: moderateScale(10),
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors.SaltBox,
    textAlign: "center",
    margin: moderateScale(20),
  },
  buttonouterView: {
    minHeight: moderateScale(height / 3.6),
    justifyContent: "flex-end",
  },
  buttonInnerView: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? moderateScale(-40) : moderateScale(10),

    alignSelf: "center",
    backgroundColor: colors?.transparent,
    height: moderateScale(150),
    width: moderateScale(160),
  },
  buttonMainContainer: {
    borderWidth: 1,
    borderColor: colors?.polishedPine,
    backgroundColor: colors?.polishedPine,
    marginTop: Platform.OS === "ios" ? moderateScale(30) : moderateScale(-10),
  },
  loaderContainer: {
    backgroundColor: colors?.SaltBox,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
