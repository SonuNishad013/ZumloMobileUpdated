import { StyleSheet } from "react-native";
import {
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";

const style = StyleSheet.create({
  roundBtnContainer: {
    right: 13,
    top: 70,
    zIndex: 1,
    height: moderateScale(24),
    width: moderateScale(24),
    paddingTop: moderateScale(7),
    // marginTop: moderateScale(15),
  },
  mainBoxContainer: {
    height: "auto",
    backgroundColor: colors?.SurfCrest,
    borderRadius: moderateScale(10),
    padding: moderateScale(18),
    marginTop: moderateScale(15),
  },
  contentMainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleTextStyle: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
    width: width / 1.4,
  },
  desTextStyle: {
    fontSize: textScale(12),
    fontWeight: "400",
    color: colors?.SurfCrest,
    width: width * 0.6,
  },
  timeStreakContainer: { marginTop: moderateScale(18) },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeTextStyle: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors?.prussianBlue,
    marginLeft: moderateScale(5),
  },
  fireIconStreakTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(5),
  },
  streakTextStyle: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors?.prussianBlue,
    marginLeft: moderateScale(5),
  },
  commomBoxBtnContainer: {
    // height: moderateScale(45),
    // width: moderateScale(45),
    borderRadius: moderateScale(8),
    backgroundColor: colors?.themeColor,
  },
  percentShowMainContainer: { marginTop: moderateScale(18) },

  lineFullContainer: {
    height: moderateScale(5),
    backgroundColor: colors?.surfLight,
    borderRadius: moderateScale(100),
    width: moderateScale(279),
    alignSelf: "center",
  },
  percentShowLine: {
    backgroundColor: colors?.royalOrange,
    width: "50%",
    height: moderateScale(5),
    borderRadius: moderateScale(100),
  },
  perStatusContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: moderateScale(10),
    alignItems: "center",
    marginLeft: moderateScale(5),
  },
  percentTextStyle: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors?.prussianBlue,
  },
  commomBtnMainContainer: {
    height: moderateScale(18),
    width: moderateScale(84),
  },
  cmnBtnBtnStyle: {
    fontSize: textScale(10),
  },
  completedContainer: {
    flexDirection: "row",
    gap: moderateScale(5),
    alignItems: "center",
  },
});
export default style;
