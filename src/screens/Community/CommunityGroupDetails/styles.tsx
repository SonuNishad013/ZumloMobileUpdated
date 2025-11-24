import { StyleSheet } from "react-native";
import colors from "../../../constant/colors";
import { moderateScale } from "../../../constant/responsiveStyle";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors?.SurfCrest,
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: moderateScale(19),
    backgroundColor: colors?.SaltBox,
    paddingBottom: moderateScale(15),
    paddingTop: moderateScale(10),
  },
  scrollViewContent: {
    paddingBottom: moderateScale(50),
  },
  addMoreButtonContainer: {
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(20),
  },
  suggestedGroupsHeader: {
    marginHorizontal: moderateScale(19),
  },
  suggestedGroupsList: {
    marginTop: moderateScale(5),
  },
  suggestedGroupsContent: {
    gap: moderateScale(15),
  },
  noFeedText: {
    textAlign: "center",
    color: colors?.prussianBlue,
    fontSize: moderateScale(14),
    fontWeight: "400",
    width: "70%",
    alignSelf: "center",
    marginTop: moderateScale(60),
  },
  feedListContainer: {
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(20),
  },
  feedListInnerContainer: {
    gap: moderateScale(10),
  },
});
