import { StyleSheet } from "react-native";
import {
  moderateScale,
  textScale,
  width,
} from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";

const styles = StyleSheet.create({
  innerBottomSheetView: {
    flex: 1,
    paddingVertical: moderateScale(25),
  },
  rbContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.SurfCrest,
    height: moderateScale(420),
  },
  justifyContent: { justifyContent: "center", alignItems: "center" },
  AnswerText: {
    color: colors.prussianBlue,
    fontSize: textScale(14),
    fontWeight: "600",
    marginVertical: moderateScale(10),
  },
  ImageBackground: {
    width: width / 1.1,
    justifyContent: "center",
    marginTop: moderateScale(15),
  },
  answerMsg: {
    fontSize: textScale(10),
    fontWeight: "500",
    color: colors.SurfCrest,
    textAlign: "center",
    margin: moderateScale(25),
    lineHeight: moderateScale(15),
  },
  btnStyle: {
    width: "auto",
    height: moderateScale(40),
    margin: moderateScale(15),
  },
  correctAns: {
    color: colors.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "600",
    marginVertical: moderateScale(10),
    textAlign: "center",
  },
  optionContainer: {
    height: moderateScale(56),
    justifyContent: "center",
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    marginVertical: moderateScale(5),
    borderColor: colors.SurfCrest,
    padding: 5,
    backgroundColor: colors.transparent, // Default background
  },
  selectedOption: {
    backgroundColor: colors.polishedPine, // Background color when selected
  },
  optionText: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors.SurfCrest,
    marginLeft: moderateScale(10),
  },
  container: {
    height: moderateScale(200),
    justifyContent: "center",
    alignItems: "center",
  },
  skipText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors.royalOrange,
  },
  questionText: {
    color: colors.SurfCrest,
    fontSize: textScale(18),
    fontWeight: "400",
    paddingBottom: moderateScale(5),
  },
  contentContainerStyle: {
    marginTop: moderateScale(50),
    marginHorizontal: moderateScale(15),
  },
});
export default styles;
