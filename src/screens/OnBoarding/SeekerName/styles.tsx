import { StyleSheet } from "react-native";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { textLabelSize } from "../../../utils/TextConfig";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageView: {
    // height: moderateScale(160),
    // width: moderateScale(170),
    // borderRadius: moderateScale(90),
    marginTop: moderateScale(70),
    // alignSelf: "center",
    // backgroundColor: colors?.SurfCrest,
    // justifyContent: "center",
    alignItems: "center",
  },
  questionContainer: {
    marginTop: moderateScale(40),
    marginHorizontal: moderateScale(19),
  },
  questionNumber: {
    fontSize: textScale(25),
    fontWeight: "500",
    color: colors.SurfCrest,
  },
  questionText: {
    fontSize: textLabelSize?.headerTextSize,
    fontWeight: "700",
    color: colors.SurfCrest,
    marginLeft: moderateScale(5),
  },
  subquestionText: {
    fontSize: textLabelSize?.subHeaderTextSize,
    fontWeight: "500",
    color: colors.royalOrangeDark,
    marginLeft: moderateScale(5),
    marginTop: moderateScale(10),
  },
  nameText: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors.SurfCrest,
    marginTop: moderateScale(10),
    marginLeft: moderateScale(5),
  },
  inputContainer: {
    borderColor: colors.royalOrange,
    marginTop: moderateScale(20),
  },
  inputText: {
    color: colors.SurfCrest,
  },

  iconContainer: {
    height: moderateScale(30),
    width: moderateScale(30),
    backgroundColor: colors.backIconBg,
    borderRadius: moderateScale(7),
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateScale(15),
    marginLeft: moderateScale(19),
    position: "absolute",
    zIndex: 1,
  },
  cmnBtnM: {
    alignSelf: "center",
    marginBottom: moderateScale(20),
    marginTop: moderateScale(20),
    width: "auto",
    marginHorizontal: moderateScale(19),
  },
});
