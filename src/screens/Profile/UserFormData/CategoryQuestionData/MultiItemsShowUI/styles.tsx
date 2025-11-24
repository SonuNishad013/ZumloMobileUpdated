import { StyleSheet } from "react-native";
import {
  moderateScale,
  textScale,
} from "../../../../../constant/responsiveStyle";
import colors from "../../../../../constant/colors";

export const styles = StyleSheet.create({
  flatList: {
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(25),
  },
  addButtonContainer: {
    width: "auto",
    marginTop: moderateScale(10),
    marginHorizontal: moderateScale(19),
  },
  lineSelectionText: {
    flex: 1,
  },
  textInputStretch: {
    marginHorizontal: moderateScale(19),
    borderRadius: moderateScale(15),
    marginTop: moderateScale(15),
  },
  commonButtonContainer: {
    width: "auto",
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(20),
  },
  newSpecInput: {
    height: moderateScale(125),
    marginTop: moderateScale(10),
  },
  flatListContentContainer: {
    gap: moderateScale(15),
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  commonDropDownContainer: {
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(15),
  },
  commonSheetDropDownMainContainer: {
    backgroundColor: colors?.transparent,
    flex: 1,
    borderColor: colors?.SurfCrest,
  },
  commonSheetDropDownPlaceholder: {
    color: colors?.SurfCrest,
  },
  commonSheetDropDownContainer: {
    backgroundColor: colors?.SurfCrest,
    borderColor: colors?.SaltBox,
  },
  commonSheetDropDownItemText: {
    color: colors?.prussianBlue,
  },
  commonSheetDropDownSelectedText: {
    color: colors?.SurfCrest,
  },
  spreader: {
    flex: 1,
    height: moderateScale(0.9),
    backgroundColor: colors?.surfCrustOp,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: moderateScale(20),
    backgroundColor: colors?.SurfCrest,
    marginTop: moderateScale(20),
    marginHorizontal: moderateScale(19),
    overflow: "hidden",
  },
  flatListContentContainer2: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(5),
  },
  multiSelectBoxContainer: { justifyContent: "center", alignItems: "center" },
  container3: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors?.SurfCrest,
    borderRadius: moderateScale(50),
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(20),
    overflow: "hidden",
  },
  descriptionText: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.SurfCrest,
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(10),
  },
  containerBubble: {
    marginHorizontal: moderateScale(19),
    height: moderateScale(120),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
    backgroundColor: colors.prussianBlue,
    marginTop: moderateScale(20),
  },
  sliderContainer: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    width: "100%",
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: moderateScale(-10),
    marginBottom: moderateScale(20),
  },
  labelText: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors.SurfCrest,
  },
});
