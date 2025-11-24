import { StyleSheet } from "react-native";
import {
  moderateScale,
  textScale,
  verticalScale,
} from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkGreen,
  },
  header: {
    backgroundColor: colors.prussianBlue,
    paddingVertical: moderateScale(30),
    paddingHorizontal: moderateScale(20),
    borderBottomLeftRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(30),
  },
  image: {
    alignItems: "center",
    paddingTop: verticalScale(30),
  },
  contentText: {
    fontStyle: "italic",
    textAlign: "center",
    fontSize: textScale(14),
    fontWeight: "400",
    marginTop: moderateScale(20),
    color: colors?.prussianBlue,
  },
  conditionsView: {
    alignItems: "center",
    justifyContent: "center",
  },
  AgreeButtonView: {
    justifyContent: "center",
    alignItems: "center",
    height: moderateScale(100),
  },
  ViewFlat: {
    alignItems: "center",
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(30),
  },


  headerContainer: {
    backgroundColor: colors?.prussianBlue,
    height: moderateScale(70),
    paddingTop: moderateScale(15),
    borderBottomLeftRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(30),
    paddingHorizontal: moderateScale(19),
  },
  iconContainer: {
    backgroundColor: colors?.darkPrussianBlue,
  },
  mainContainer: {
    paddingBottom: moderateScale(15),
  },
  iconWrapper: {
    height: moderateScale(200),
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    marginHorizontal: moderateScale(15),
  },
});
