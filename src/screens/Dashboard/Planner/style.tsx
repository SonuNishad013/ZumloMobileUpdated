// styles.ts
import { StyleSheet } from "react-native";
import {
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";

export const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors?.backgroundTheme,
    paddingHorizontal: moderateScale(15),
    paddingBottom: moderateScale(15),
  },
  dateContainer: { flexDirection: "row" },
  dateTextContainer: { marginHorizontal: moderateScale(10) },
  dateStyle: {
    fontSize: textScale(14),
    fontFamily: "Poppins-Regular",
    fontWeight: "600",
    color: colors.SurfCrest,
  },
  notificationContainer: {
    flexDirection: "row",
    width: moderateScale(100),
    justifyContent: "flex-end",
  },
  // iconContainer: {
  //   width: moderateScale(40),
  //   height: moderateScale(40),
  //   justifyContent: "center",
  //   alignItems: "center",
  //   position: "relative",
  //   borderRadius: moderateScale(40),
  // },
  notificationCountContainer: {
    width: moderateScale(20),
    height: moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    // bottom: 10,
    // right: 5,
    top: 0,
    left: 0,
    backgroundColor: colors.royalOrange,
    borderRadius: 10,
  },
  padding_: {
    bottom: 15,
    right: 5,
    top: null,
    left: null,
  },
  notificationCountText: {
    color: colors.prussianBlue,
    fontSize: textScale(9),
    fontWeight: "bold",
  },
  userInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: moderateScale(20),
    height: moderateScale(100),
    // backgroundColor:'red'
  },
  profileImageContainer: {
    width: moderateScale(20),
    height: moderateScale(40),
    backgroundColor: colors.SurfCrest,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(32),
    marginHorizontal: moderateScale(15),
  },
  profileImage: {},
  userInfoTextContainer: {
    marginHorizontal: moderateScale(30),
    justifyContent: "space-between",
    flexDirection: "column",
    height: moderateScale(50),
    width: width / 2,
  },
  userInfoName: {
    fontSize: textScale(24),
    fontWeight: "700",
    fontFamily: "Poppins-Regular",
    color: colors.SurfCrest,
  },
  userStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  smileEmojiContainer: {
    height: moderateScale(24),
    width: 24,
    justifyContent: "center",
  },
  userStatusText: {
    fontSize: textScale(20),
    fontWeight: "700",
    fontFamily: "Poppins-Regular",
    color: colors.SurfCrest,
  },
  container: {
    flex: 1,
    backgroundColor: colors?.SurfCrest,
  },
  innerView: {
    width: moderateScale(335),
    alignSelf: "center",
  },
  OuterView: {
    marginTop: moderateScale(10),
  },
  ReminderView: {
    backgroundColor: colors?.backgroundTheme,
    height: moderateScale(90),
    width: moderateScale(334.6),
    borderRadius: moderateScale(15),
    // paddingTop: moderateScale(10),
  },
  closeIconContainer: {
    alignItems: "flex-end",
    top: moderateScale(4),
    right: moderateScale(4),
  },
  ReminderTextView: {
    flexDirection: "row",
    left: moderateScale(15),
  },
  textView: {
    justifyContent: "center",
    paddingLeft: moderateScale(10),
    width: moderateScale(217),
  },
  reminderTitleText: {
    color: colors.SurfCrest,
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Poppins-Regular",
  },
  reminderDesctext: {
    fontWeight: "600",
    color: colors?.white,
    lineHeight: 17,
    fontSize: 14,
  },
  ProgressView: {
    height: moderateScale(137),
    width: moderateScale(335),
    backgroundColor: colors?.polishedPine,
    borderRadius: moderateScale(15),
    justifyContent: "center",
  },
  innerProgressViews: {
    flexDirection: "row",
    alignSelf: "center",
  },
  leftProgressView: {
    width: moderateScale(178.77),
  },
  learnButton: {
    backgroundColor: colors?.prussianBlue,
    borderRadius: moderateScale(20),
    width: moderateScale(125.77),
    paddingVertical: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
  },
  ProgressDataText: {
    color: colors?.white,
    fontWeight: "600",
    fontSize: textScale(14),
    fontFamily: "Poppins-Regular",
  },
  learnButtonText: {
    color: colors?.white,
    fontWeight: "500",
    fontSize: textScale(14),
    fontFamily: "Poppins-Regular",
  },
  completeProfileView: {
    backgroundColor: colors?.prussianBlue,
    borderRadius: moderateScale(15),
    width: moderateScale(334),
    padding: moderateScale(15),
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  CompleteProfileText: {
    color: colors?.white,
    fontWeight: "500",
    fontSize: textScale(14),
    fontFamily: "Poppins-Regular",
  },
  completeButtonView: {
    backgroundColor: colors?.polishedPine,
    padding: moderateScale(10),
    borderRadius: moderateScale(20),
  },
  completeText: {
    color: colors?.white,
    fontWeight: "500",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  GoalsView: {
    backgroundColor: colors?.royalOrange,
    width: moderateScale(335),
    height: moderateScale(80),
    borderRadius: moderateScale(15),
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: moderateScale(20),
  },
  GoalsTextView: {
    width: moderateScale(214),
  },
  goalsText: {
    color: colors?.white,
    fontWeight: "600",
    fontSize: textScale(14),
    fontFamily: "Poppins-Regular",
  },
  receiveMailText: {
    color: colors?.white,
    fontWeight: "400",
    fontSize: textScale(14),
    fontFamily: "Poppins-Regular",
    marginTop: moderateScale(5),
  },
  GoalsAchievedView: {
    backgroundColor: colors?.backgroundTheme,
    width: moderateScale(335),
    height: moderateScale(80),
    borderRadius: moderateScale(15),
    justifyContent: "center",
    paddingHorizontal: moderateScale(10),
  },
  innerGoalsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  GoalAchieveText: {
    fontWeight: "600",
    color: colors?.white,
    fontSize: textScale(14),
    fontFamily: "Poppins-Regular",
  },
  achieveGoalTitleText: {
    fontWeight: "400",
    color: colors?.white,
    fontSize: textScale(14),
    fontFamily: "Poppins-Regular",
  },
  floatingButton: {
    position: "absolute",
    bottom: moderateScale(20),
    right: moderateScale(20),
    borderRadius: moderateScale(30),
  },
  animatedIconsContainer: {
    position: "absolute",
    bottom: moderateScale(80),
    right: moderateScale(20),
    flexDirection: "row",
    alignItems: "center",
  },

  animatedIcon: {
    marginLeft: moderateScale(10),
  },
  contentContainerStyle: {
    paddingBottom: moderateScale(40),
    backgroundColor: colors.SurfCrest,
  },
  allMainontainer: {
    flex: 1,
  },
  animatedTextView: {
    flexDirection: "row",
    marginHorizontal: moderateScale(15),
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: moderateScale(5),
  },

  //new
  animatedItem: {
    alignSelf: "center",
  },

  text: {
    textAlign: "center",
    fontSize: textScale(14),
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
    padding: moderateScale(5),
    borderRadius: moderateScale(30),
    alignItems: "center",
    marginTop: moderateScale(15),
    marginBottom: moderateScale(10),
    marginHorizontal: moderateScale(35),
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
    color: colors?.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "500",
  },
  iconContainer: {
    // backgroundColor: "rgba(203, 226, 209, 1)",
    backgroundColor: colors?.SurfCrest,

    padding: moderateScale(10),
    borderRadius: moderateScale(20),
  },
  contentContainer: {
    marginVertical: moderateScale(20),
    gap: moderateScale(20),
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: moderateScale(15),
    marginTop: 29,
  },
  headerText: {
    textAlign: "center",
    fontSize: textScale(24),
    color: colors?.SurfCrest,
    fontWeight: "700",
  },
  subHeaderText: {
    textAlign: "center",
    fontSize: textScale(14),
    color: colors?.SurfCrest,
    fontWeight: "400",
  },

  containerCaursal: {
    borderRadius: moderateScale(15),
    // borderWidth: 1,
    borderColor: colors.prussianBlue,
    marginHorizontal: moderateScale(10),
  },

  containerCaursalExplorere: {
    borderRadius: moderateScale(15),
    borderWidth: 1,
    borderColor: colors.themeColor,
  },
  profileGoalsBorder: {
    // borderWidth: 1,
    borderColor: colors.prussianBlue,
  },
  imageBackground: {
    height: moderateScale(325),
    width: moderateScale(265),
    alignSelf: "center",
    alignItems: "center",
    // backgroundColor: colors.themeColor,
    borderRadius: moderateScale(10),
    paddingTop: moderateScale(5),
  },
  imageBackground1: {
    height: moderateScale(300),
    width: moderateScale(265),
    alignSelf: "center",
    alignItems: "center",
    // justifyContent: "flex-end",
    backgroundColor: colors.themeColor,
    borderRadius: moderateScale(10),
    paddingTop: moderateScale(10),
  },
  titleText: {
    color: colors.prussianBlue,
    textAlign: "center",
    fontSize: textScale(14),
    fontWeight: "500",
    width: moderateScale(250),
  },
  titleTextConcat: {
    color: colors.SurfCrest,
    marginTop: moderateScale(20),
  },
  descriptionText: {
    color: colors.prussianBlue,
    textAlign: "center",
    fontSize: textScale(14),
    fontWeight: "500",
  },
  button: {
    flexDirection: "row",
    padding: moderateScale(5),
    borderRadius: moderateScale(30),
    alignItems: "center",
    marginTop: moderateScale(15),
    marginBottom: moderateScale(10),
    marginHorizontal: moderateScale(35),
  },
  buttonConcat: {
    backgroundColor: colors.prussianBlue,
    position: "absolute",
    bottom: 0,
  },
  buttonTextCaursal: {
    flex: 1,
    textAlign: "center",
    color: colors.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "500",
  },
  arrowContainer: {
    backgroundColor: colors.SurfCrest,
    padding: moderateScale(10),
    borderRadius: moderateScale(20),
  },
  arrowContainerConcat: {
    backgroundColor: colors?.transparent,
  },
  setYourGoalsButton: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: moderateScale(2),
    borderRadius: moderateScale(30),
  },
  no_task_view: {
    backgroundColor: colors.prussianBlue,
    height: moderateScale(100),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(20),
  },
  no_task_text: {
    color: colors.SurfCrest,
    marginHorizontal: moderateScale(10),
  },
  flatListContainer: {
    backgroundColor: colors.SurfCrest,
    paddingBottom: moderateScale(100),
  },
  alignmentCenterView: {
    marginTop: moderateScale(15),
    alignItems: "center",
  },
  suggestionView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  imageBorder: {
    borderRadius: moderateScale(50),
  },
  forwardImage: {
    transform: [{ rotate: "180deg" }],
    borderRadius: moderateScale(50),
  },
  renderActivityView: {
    paddingHorizontal: moderateScale(19),
    gap: moderateScale(10),
    marginTop: moderateScale(20),
  },
  setTop: {
    marginTop: moderateScale(10),
  },
  middleView: {
    paddingHorizontal: moderateScale(19),
    gap: moderateScale(20),
    marginTop: moderateScale(30),
  },
  chatView: {
    position: "absolute",
    bottom: moderateScale(10),
    right: moderateScale(17),
    alignItems: "center",
    borderRadius: 100,
  },
  headerTextColor: {
    color: colors?.prussianBlue,
  },
  bottom_pass: {
    marginBottom: moderateScale(20),
  },
});
