import { StyleSheet } from "react-native";
import {
  moderateScale,
  textScale,
} from "../../../../../constant/responsiveStyle";
import colors from "../../../../../constant/colors";

export const styles = StyleSheet.create({
  imageBackground: {
    height: moderateScale(291),
    paddingHorizontal: moderateScale(19),
  },
  headerMainContainer: {
    marginTop: moderateScale(15),
    paddingBottom: moderateScale(15),
  },
  headerIconContainer: {
    backgroundColor: colors.saltLight,
  },
  headerTextStyle: {
    color: colors.SurfCrest,
  },
  mainContainer: {
    backgroundColor: colors.SurfCrest,
  },
  textContainer: {
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(15),
  },
  title: {
    fontSize: textScale(24),
    fontWeight: "700",
    color: colors.prussianBlue,
    width: moderateScale(310),
  },
  description: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors.prussianBlue,
    marginTop: moderateScale(10),
  },
  otherSessions: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors.prussianBlue,
    marginTop: moderateScale(15),
    marginBottom: moderateScale(10),
  },
  div: {
    height: moderateScale(1),
    backgroundColor: colors.prussianBlue,
  },
  recommendationsContainer: {
    flex: 1,
    backgroundColor: colors.SurfCrest,
  },
  itemSeparator: {
    height: moderateScale(1),
    flex: 1,
    backgroundColor: colors.blackO,
    marginLeft: moderateScale(19),
  },
  musicPlayButtonContainer: {
    marginHorizontal: moderateScale(19),
    marginVertical: moderateScale(20),
  },
  bookLabel: {
    fontSize: textScale(12),
    fontWeight: "600",
    color: colors?.SaltBox,
    marginTop: moderateScale(10),
  },
  authorName: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.SaltBox,
    maxWidth: moderateScale(200),
    // backgroundColor: "red",
  },
  lebaleDescription: {
    fontSize: textScale(11),
    fontWeight: "400",
    color: colors?.prussianBlue,
    marginTop: moderateScale(3),
  },
  bookTitle: {
    fontSize: textScale(28),
    fontWeight: "700",
    color: colors?.prussianBlue,
    marginBottom: moderateScale(10),
  },
  addToReading: {
    width: "100%",
    marginVertical: moderateScale(19),
    backgroundColor: colors?.SaltBox,
  },
});
