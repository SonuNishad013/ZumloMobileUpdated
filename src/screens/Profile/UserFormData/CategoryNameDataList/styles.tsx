import { StyleSheet } from "react-native";
import colors from "../../../../constant/colors";
import { moderateScale } from "../../../../constant/responsiveStyle";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.SaltBox,
  },
  headerContainer: {
    backgroundColor: colors?.SaltBox,
    height: moderateScale(70),
    paddingTop: moderateScale(15),
    borderBottomLeftRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(30),
    paddingHorizontal: moderateScale(19),
  },
  headerTextStyle: {
    color: colors?.SurfCrest,
  },
  headerMainContainer: {
    marginHorizontal: moderateScale(0),
  },
  contentContainerStyle: {
    paddingVertical: moderateScale(10),
  },
  flatStyle: {
    flexGrow: 1,
  },
});
