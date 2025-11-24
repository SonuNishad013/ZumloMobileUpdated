import { StyleSheet } from "react-native";
import colors from "../../../../constant/colors";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors?.SurfCrest,
  },
  headerContainer: {
    backgroundColor: colors?.SaltBox,
    height: moderateScale(70),
    alignItems: "center",
    borderBottomLeftRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(30),
    paddingHorizontal: moderateScale(19),
  },
  iconContainer: {
    backgroundColor: colors?.backIconBg,
  },
  CustomToggleBarContainer: {
    marginHorizontal: moderateScale(19),
    marginBottom: moderateScale(20),
  },
  cText: { fontSize: textScale(10) },
  contentContainerStyleCobtainer: {
    paddingBottom: moderateScale(30),
  },
  scrollViewContainer: {
    flex: 1,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: moderateScale(30),
    marginHorizontal: moderateScale(19),
    marginBottom: moderateScale(20),
  },
  touchableOpacity: {
    flex: 1,
    justifyContent: "flex-end",
  },
  text: {
    fontSize: textScale(12),
    alignSelf: "center",
    fontWeight: "400",
    paddingBottom: moderateScale(12),
  },
  divider: {
    height: moderateScale(1.5),
  },
});
