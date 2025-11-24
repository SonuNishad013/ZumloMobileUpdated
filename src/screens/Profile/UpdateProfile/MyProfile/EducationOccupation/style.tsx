import { StyleSheet } from "react-native";
import colors from "../../../../../constant/colors";
import {
  moderateScale,
  textScale,
} from "../../../../../constant/responsiveStyle";

export const listItemStyles = StyleSheet.create({
  renderItemContainer: {
    paddingVertical: moderateScale(18),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectedMainText: {
    fontSize: textScale(12),
    fontWeight: "600",
    color: colors.darkBlack,
  },
  notSelectedFolioTxt: {
    fontSize: textScale(12),
    color: "lightblack",
  },
  selectedHolderTxt: {
    fontSize: textScale(10),
    color: "lightblack",
    marginTop: moderateScale(6),
  },
  notSelectedHolderTxt: {
    fontSize: textScale(10),
    color: colors.ShadowGreen,
    marginTop: moderateScale(6),
  },
});
