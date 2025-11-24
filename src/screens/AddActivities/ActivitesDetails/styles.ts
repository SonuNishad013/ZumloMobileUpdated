import { StyleSheet } from "react-native";
import colors from "../../../constant/colors";
import {
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkbackgroundTheme,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  progressContainer: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  timerTextContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  mainTimeText: {
    color: colors.royalOrange,
    fontSize: textScale(39),
    fontWeight: "600",
  },
  remainingTimeText: {
    color: colors.SurfCrest,
    fontSize: textScale(12),
    fontWeight: "600",
  },
  minsText: {
    color: colors.SurfCrest,
    fontSize: textScale(12),
    fontWeight: "400",
  },
  buttonsContainer: {
    marginTop: 50,
    alignItems: "center",
  },
  endButton: {
    backgroundColor: colors.OceanGreen,
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 30,
    marginBottom: 20,
  },
  endButtonText: {
    color: "white",
    fontSize: textScale(16),
    fontWeight: "600",
  },
  startPauseButton: {
    backgroundColor: colors.royalOrange,
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 30,
  },
  startPauseButtonText: {
    color: "white",
    fontSize: textScale(16),
    fontWeight: "600",
  },
  progressText: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    color: "#FF9F5C",
  },
  iconContainer: {
    backgroundColor: colors?.backIconBg,
  },
  mainContainer: {
    paddingBottom: moderateScale(15),
    paddingTop: moderateScale(15),
    paddingHorizontal: moderateScale(19),
  },
  scrollView: {
    paddingHorizontal: moderateScale(19),
  },
  activityContainer: {
    borderColor: colors?.royalOrange,
    borderWidth: moderateScale(1),
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: moderateScale(20),
    paddingLeft: moderateScale(20),
    paddingRight: moderateScale(40),
    borderRadius: moderateScale(8),
    backgroundColor: "rgba(255, 157, 72, 0.15)",
  },
  textContainer: {
    gap: moderateScale(8),
    width: width / 1.9,
  },
  titleText: {
    fontWeight: "600",
    fontSize: moderateScale(14),
    color: colors?.SurfCrest,
  },
  descriptionText: {
    fontWeight: "400",
    fontSize: moderateScale(10),
    color: colors?.SurfCrest,
  },
  image: {
    height: moderateScale(63),
    width: moderateScale(63),
    resizeMode: "contain",
  },
  activityInfoRow: {
    flexDirection: "row",
    gap: moderateScale(20),
    alignItems: "center",
    marginTop: moderateScale(30),
    width: width * 0.9,
  },
  boxButtonIcon: {
    height: moderateScale(46),
    width: moderateScale(46),
    borderRadius: moderateScale(8),
  },
  boxButtonIconImage: {
    // tintColor: colors?.SurfCrest,
    height: moderateScale(35),
    width: moderateScale(85),
    resizeMode: "contain",
  },
  activityInfoText: {
    fontSize: textScale(18),
    fontWeight: "700",
    color: colors?.SurfCrest,
    width: moderateScale(280),
  },
  activityDescription: {
    marginTop: moderateScale(20),
    fontWeight: "400",
    fontSize: textScale(12),
    color: colors?.SurfCrest,
  },
  iconTextRow: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: moderateScale(10),
    flexWrap: "wrap",
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  iconText: {
    fontSize: textScale(12),
    fontWeight: "400",
    color: colors?.SurfCrest,
  },
  headerNameText: {
    color: colors?.SurfCrest,
    fontWeight: "600",
    fontSize: textScale(10),
  },
  headerTextStyle: {
    color: colors?.royalOrange,
    fontWeight: "600",
    fontSize: textScale(14),
  },
  headerContainer: {
    marginTop: moderateScale(40),
  },
  recentActivityContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: moderateScale(15),
    paddingLeft: moderateScale(20),
    paddingRight: moderateScale(20),
    borderRadius: moderateScale(8),
    backgroundColor: colors?.SurfCrest,
    marginVertical: moderateScale(5),
  },
  recentActivityTextContainer: {
    gap: moderateScale(8),
    width: width / 1.9,
  },
  recentActivityTime: {
    fontWeight: "600",
    fontSize: moderateScale(24),
    color: colors?.prussianBlue,
  },
  recentActivityAM: {
    fontWeight: "400",
    fontSize: moderateScale(10),
    color: colors?.prussianBlue,
    // paddingLeft: moderateScale(10),
    marginBottom: moderateScale(4),
    marginLeft: moderateScale(-5),
  },
  recentActivityFeedback: {
    fontWeight: "400",
    fontSize: moderateScale(10),
    color: colors?.prussianBlue,
  },
  circularProgressContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  circularProgressText: {
    fontSize: textScale(10),
    color: colors?.prussianBlue,
    fontWeight: "600",
  },
  circularProgressTextMin: {
    fontSize: textScale(10),
    color: colors?.prussianBlue,
    fontWeight: "400",
  },
  recommendationsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: moderateScale(15),
    paddingLeft: moderateScale(20),
    paddingRight: moderateScale(40),
    borderRadius: moderateScale(8),
    backgroundColor: colors?.polishedPine,
  },
  recommendationsImage: {
    width: moderateScale(46),
    height: moderateScale(46),
    backgroundColor: colors?.SurfCrest,
    borderRadius: moderateScale(8),
    // resizeMode:'contain'
  },
  recommendationsTextContainer: {
    marginLeft: moderateScale(15),
    gap: moderateScale(1),
    width: width / 1.5,
  },
  recommendationsTitle: {
    fontWeight: "600",
    fontSize: moderateScale(14),
    color: colors?.SurfCrest,
  },
  recommendationsSubtitle: {
    fontWeight: "400",
    fontSize: moderateScale(10),
    color: colors?.SurfCrest,
    marginTop: moderateScale(5),
  },
  leterStyle: {
    marginTop: moderateScale(40),
    color: colors?.SurfCrest,
    fontSize: textScale(14),
    alignSelf: "center",
  },
  startBtn: {
    width: "auto",
    marginTop: moderateScale(100),
  },
  scrollStyle: { paddingBottom: moderateScale(30) },
});
