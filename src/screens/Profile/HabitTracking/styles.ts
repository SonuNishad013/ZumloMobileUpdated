import { StyleSheet } from "react-native";
import colors from "../../../constant/colors";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import { PoppinsItalic } from "../../../assets/fonts";

export const styles = StyleSheet.create({
  mainContianer: { flex: 1, backgroundColor: colors?.SurfCrest },
  mainListConatiner: {
    gap: moderateScale(9),
    paddingHorizontal: moderateScale(19),
    marginTop: moderateScale(19),
  },
  cardStyle: {
    backgroundColor: colors?.prussianBlue,
    width: "100%",
    padding: moderateScale(10),
    borderRadius: moderateScale(15),
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  TitleText: {
    color: colors?.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "600",
    fontFamily: PoppinsItalic,
    maxWidth: moderateScale(250),
    marginBottom: moderateScale(5),
  },
  timeReminderbox: {
    flexDirection: "row",
    gap: moderateScale(5),
    alignItems: "center",
  },
  timeText: {
    color: colors?.SurfCrest,
    fontSize: textScale(10),
    fontWeight: "400",
  },
  daysContainer: {
    gap: moderateScale(8),
    marginBottom: moderateScale(8),
  },
  daysBox: {
    paddingHorizontal: moderateScale(10),
    flexDirection: "row",
    gap: 5,
    borderRadius: moderateScale(15),
    paddingVertical: moderateScale(2),
    alignItems: "center",
  },
  daysText: {
    fontSize: textScale(10),
    fontWeight: "600",
  },
  numberOfGoalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  numberOfGoalText: {
    color: colors?.SurfCrest,
    fontSize: textScale(10),
    fontWeight: "400",
  },
  heighlightText: { fontWeight: "600", color: colors?.royalOrangeDark },
  goalsText: {
    color: colors?.royalOrangeDark,
    fontSize: textScale(14),
    fontWeight: "400",
  },
  viewButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(34, 84, 98, 1)",
    borderRadius: moderateScale(15),
    paddingLeft: moderateScale(10),
  },
  buttonListContainer: {
    flexDirection: "row",
    gap: moderateScale(10),
    marginTop: moderateScale(10),
  },
  buttonstyle: {
    flex: 1,
    alignItems: "center",
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(16),
  },
  //Floating button style
  FloatingButtonContainer: {
    backgroundColor: colors?.backgroundTheme,
    width: moderateScale(50),
    height: moderateScale(50),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(50),
    position: "absolute",
    overflow: "hidden",
    bottom: moderateScale(70),
    right: moderateScale(30),
    zIndex: 999,
  },

  //Form
  container: {
    flexDirection: "row",
    alignSelf: "center",
  },
  clickableView: {
    height: 109,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "white",
    // margin: moderateScale(16),
    marginStart: 0,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  addBottom: {
    marginBottom: moderateScale(5),
  },
  codeName: {
    fontSize: textScale(10),
    fontWeight: "700",
    color: "white",
  },
});
export const habitDetailStyle = StyleSheet.create({
  TitleText: {
    color: colors?.SurfCrest,
    fontSize: textScale(24),
    fontWeight: "600",
    textAlign: "center",
  },
  scheduleNow: {
    color: colors?.royalOrangeDark,
    fontSize: textScale(14),
    fontWeight: "600",
  },
  headerStyle: {
    color: colors?.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "500",
    fontStyle: "italic",
    textAlign: "center",
    marginHorizontal: moderateScale(20),
  },
  daysText: {
    fontSize: textScale(12),
    fontWeight: "600",
  },
  detailContainer: {
    width: "100%",
    alignItems: "center",
    // gap: moderateScale(15),
    paddingHorizontal: moderateScale(19),
    marginTop: moderateScale(29),
  },
  circleTextContainer: {
    marginVertical: moderateScale(20),
    gap: moderateScale(15),
    marginBottom: moderateScale(40),
  },
  circlurView: {
    height: moderateScale(160),
    width: moderateScale(160),
    borderWidth: 1,
    borderColor: "rgba(203, 226, 209, 0.36)",
    borderRadius: moderateScale(100),
    justifyContent: "center",
    alignItems: "center",
    gap: moderateScale(10),
  },
  reminderText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.royalOrangeDark,
    textAlign: "center",
  },
  goalsCountText: {
    fontSize: textScale(18),
    fontWeight: "400",
    color: colors?.SurfCrest,
    textAlign: "center",
  },
  skipButtonContainer: {
    backgroundColor: colors?.transparent,
    borderWidth: 1,
    borderColor: colors?.SurfCrest,
    marginTop: moderateScale(15),
  },
  sheet: {
    backgroundColor: colors.SurfCrest,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
  },
  sheetInnverView: {
    width: "100%",
    height: moderateScale(200),
    paddingHorizontal: moderateScale(19),
    gap: moderateScale(19),
  },
  skipButtonSheetText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.backgroundTheme,
    textAlign: "right",
  },
  sheetDescriptionText: {
    fontSize: textScale(20),
    fontWeight: "600",
    color: colors?.prussianBlue,
  },
  textBox: {
    height: moderateScale(100),
    width: "100%",
    padding: moderateScale(20),
    borderRadius: moderateScale(16),
    borderWidth: 1,
    borderColor: colors?.prussianBlue,
    paddingTop: moderateScale(10),
  },
  freqencyTextIconConatiner: {
    backgroundColor: colors?.polishedPine,
    paddingHorizontal: moderateScale(15),
    flexDirection: "row",
    borderRadius: moderateScale(15),
    paddingVertical: moderateScale(2),
    alignItems: "center",
    marginBottom: moderateScale(10),
    justifyContent: "center",
    alignSelf: "flex-start",
  },
});
