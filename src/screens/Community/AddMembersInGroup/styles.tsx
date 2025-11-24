import { StyleSheet } from "react-native";
import colors from "../../../constant/colors";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors?.SurfCrest,
    flex: 1,
  },
  headerContainer: {
    backgroundColor: colors?.SaltBox,
  },
  headerTextContainer: {
    marginLeft: moderateScale(10),
  },
  headerMainContainer: {
    backgroundColor: colors?.SaltBox,
  },
  flatList: {
    marginHorizontal: moderateScale(19),
  },
  flatListContent: {
    gap: moderateScale(10),
    paddingBottom: moderateScale(50),
  },
  listHeaderContainer: {
    justifyContent: "flex-end",
    flexDirection: "row",
    marginTop: moderateScale(10),
  },
  selectedMembersText: {
    fontSize: textScale(14),
    color: colors?.prussianBlue,
    fontWeight: "600",
  },
  selectedMembersInfoText: {
    fontSize: textScale(14),
    color: colors?.prussianBlue,
    fontWeight: "400",
    marginLeft: moderateScale(3),
  },
  searchFlatlist: {
    backgroundColor: colors?.polishedPine,
    marginHorizontal: moderateScale(15),
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(15),
    marginTop: moderateScale(10),
    borderColor: colors?.prussianBlue,
    height: moderateScale(850),
  },
  searchContainer: {
    marginHorizontal: moderateScale(5),
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(55),
    gap: moderateScale(10),
  },
  searchBarContainer: {
    marginTop: moderateScale(25),
    marginHorizontal: moderateScale(19),
    borderRadius: moderateScale(35),
    height: moderateScale(45),
    marginBottom: moderateScale(10),
  },
  textInputStyle: {
    flex: 1,
  },

  emptyListText: {
    fontWeight: "600",
    fontSize: textScale(24),
    color: colors?.prussianBlue,
    alignSelf: "center",
    marginTop: moderateScale(200),
  },
});
