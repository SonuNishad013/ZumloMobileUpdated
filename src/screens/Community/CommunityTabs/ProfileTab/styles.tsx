import { StyleSheet } from "react-native";

import colors from "../../../../constant/colors";
import { moderateScale } from "../../../../constant/responsiveStyle";

export const styles = StyleSheet.create({
  tabContainerWrapper: {
    marginTop: moderateScale(20),
    marginBottom: moderateScale(15),
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: moderateScale(19),
  },
  buttonContainer: {
    height: moderateScale(34),
    paddingHorizontal: moderateScale(25),
    borderWidth: moderateScale(1),
    marginRight: moderateScale(10),
    borderRadius: moderateScale(20),
  },
  selectedButton: {
    backgroundColor: colors.polishedPine,
    borderColor: colors.polishedPine,
  },
  unselectedButton: {
    backgroundColor: colors.transparent,
    borderColor: colors.grey,
  },
  buttonText: {
    fontSize: moderateScale(14),
  },
  selectedButtonText: {
    color: colors.SurfCrest,
  },
  unselectedButtonText: {
    color: colors.grey,
  },
});
