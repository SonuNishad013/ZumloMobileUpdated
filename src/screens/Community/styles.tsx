import { StyleSheet } from "react-native";
import colors from "../../constant/colors";
import {
  height,
  moderateScale,
  textScale,
} from "../../constant/responsiveStyle";
import { textLabelSize } from "../../utils/TextConfig";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.SurfCrest,
  },
  scrollView: {
    backgroundColor: colors.SurfCrest,
  },
  scrollViewContent: {
    paddingVertical: moderateScale(30),
  },
  addMoreContainer: {
    marginHorizontal: moderateScale(19),
  },
  trendingFeedsList: {
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(20),
  },
  trendingFeedsContent: {
    gap: moderateScale(10),
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
  firstGroupCard: {
    marginLeft: moderateScale(15),
  },
  defaultGroupCard: {
    marginRight: moderateScale(0),
  },
  containerStyle: {
    marginHorizontal: moderateScale(19),
    paddingBottom: moderateScale(30),
  },

  containerStyle2: {
    backgroundColor: colors?.prussianBlue,
    marginHorizontal: moderateScale(0),
    paddingBottom: moderateScale(10),
    paddingTop: moderateScale(30),
    paddingHorizontal: moderateScale(19),
    zIndex: 1,
  },
  wrongView: {
    flex: 1,
    alignItems: "center",
  },
  wrongText: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.prussianBlue,
    alignSelf: "center",
  },
  rbSheetContainer: {
    backgroundColor: colors?.SurfCrest,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
  },
  shimmerView: {
    alignSelf: "center",
    marginTop: moderateScale(40),
  },
  headerStyleText: {
    fontSize: textLabelSize?.titleFont,
    fontWeight: "700",
    color: colors.prussianBlue,
    marginBottom: moderateScale(30),
  },
  noDataFoundView: {
    marginTop: moderateScale(20),
    paddingHorizontal: moderateScale(20),
  },
  invisibleLoader: {
    height: height,
    opacity: 0,
    zIndex: 999,
    position: "absolute",
  },
});
