import { StyleSheet } from "react-native";
import {
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";

export const styles = StyleSheet.create({
  headerContainer: {
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(15),
    paddingBottom: moderateScale(10),
  },
  iconContainer: {
    backgroundColor: colors.darkPrussianBlue,
  },
  questionText: {
    fontSize: textScale(25),
    fontWeight: "500",
    color: colors.SurfCrest,
    alignSelf: "center",
    textAlign: "center",
    marginTop: moderateScale(40),
    width: width / 1.3,
  },
  textInputStretch: {
    borderRadius: moderateScale(15),
    marginTop: moderateScale(15),
    marginHorizontal: moderateScale(0),
  },
  newSpecInput: {
    height: moderateScale(125),
    marginTop: moderateScale(10),
  },
  container: {
    marginTop: moderateScale(20),
    alignItems: "center",
  },
  buttonContainer: {
    backgroundColor: colors?.SaltBox,
    height: moderateScale(31),
    width: moderateScale(162),
    marginTop: moderateScale(15),
  },
  flatListContent: {
    gap: moderateScale(15),
    marginTop: moderateScale(30),
  },
  sliderView: {
    marginTop: moderateScale(80),
    marginBottom: moderateScale(40),
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: moderateScale(19),
  },
  commonButtonContainer: {
    width: "auto",
    height: moderateScale(56),
    marginTop: moderateScale(20),
    marginBottom: moderateScale(10),
  },
  optionBox: {
    borderRadius: moderateScale(11),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors?.surfCrustOp2,
    padding: moderateScale(17),
    borderWidth: moderateScale(1),
    borderColor: colors?.transparent,
  },
  optionBoxSelected: {
    borderColor: colors?.royalOrangeDark,
  },
  optionValue: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.royalOrangeDark,
  },
  optionLabel: {
    fontSize: textScale(12),
    marginTop: moderateScale(4),
    fontWeight: "400",
    color: colors?.SurfCrest,
  },
  bgImage: {
    flex: 1,
  },
  listContainer: {
    gap: moderateScale(9),
    marginTop: moderateScale(9),
    paddingBottom: `${moderateScale(20)}%`,
  },
  slotButton: {
    width: "23%",
    borderWidth: 1,
    alignItems: "center",
    paddingVertical: moderateScale(10),
    marginHorizontal: moderateScale(4),
    borderRadius: moderateScale(50),
    borderColor: colors.SurfCrest,
  },
  selectedSlot: {
    backgroundColor: colors.polishedPine, // Change to selected color
    borderColor: colors.SurfCrest, // Change border color when selected
  },
  timeText: {
    fontSize: textScale(13),
    fontWeight: "400",
    color: colors?.SurfCrest,
  },
  selectedText: {
    color: colors.white, // Change text color when selected
  },
  sectionHeader: {
    gap: moderateScale(5),
    flexDirection: "row",
    alignItems: "center",
    marginBottom: moderateScale(10),
  },
  sectionHeaderText: {
    fontSize: textScale(16),
    color: colors.SurfCrest,
    marginHorizontal: moderateScale(10),
  },
  itemContainer: {
    marginHorizontal: moderateScale(20),
  },
  listHeaderDivider: {
    flex: moderateScale(1),
    borderWidth: moderateScale(1),
    borderColor: colors.grey,
    opacity: 0.2,
  },
});
