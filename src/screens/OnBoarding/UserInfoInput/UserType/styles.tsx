import { StyleSheet } from "react-native";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";
import { textLabelSize } from "../../../../utils/TextConfig";

export const styles = StyleSheet.create({
  welcomeText: {
    fontWeight: "700",
    fontSize: textLabelSize?.headerTextSize,
    color: colors?.SurfCrest,
    marginTop: moderateScale(25),
    width: moderateScale(330),
  },
  typeView: {
    // flexDirection: 'column',
    // justifyContent: "space-between",
    marginTop: moderateScale(30),
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 0.2,
  },
  container: {
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(50),
  },
  buttonText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.prussianBlue,
    paddingHorizontal: moderateScale(10),
    paddingTop: moderateScale(15),
    width: moderateScale(100),
  },
  imageSize: { height: moderateScale(188), width: moderateScale(157) },
  mainContainerHeader: {
    paddingBottom: moderateScale(10),
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(15),
  },
  contentContainerStyle: { paddingBottom: moderateScale(20) },
  explainerContainer: {
    height: moderateScale(200),
    gap: moderateScale(15),
  },
  explainerCard: {
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
    marginHorizontal: moderateScale(19),
    borderRadius: moderateScale(10),
  },
  plannerCard: {
    backgroundColor: colors?.royalOrangeDarkOP2,
    borderWidth: 1,
    borderColor: colors?.royalOrangeDark,
  },
  explorerCard: {
    backgroundColor: colors?.polishedPineOP2,
    borderWidth: 1,
    borderColor: colors?.polishedPine,
  },
  explainerImage: {
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: 5,
  },
  explainerTextContainer: {
    flex: 1,
    marginVertical: moderateScale(10),
  },
  explainerTitle: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
  },
  explainerContent: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.SurfCrest,
  },
  cardContainer: {
    flexDirection: "row",
    flex: 1,
    marginTop: moderateScale(40),
  },
  cardOne: {
    height: moderateScale(300),
    flex: 1,
    marginRight: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(20),
  },
  cardtwo: {
    height: moderateScale(300),
    marginLeft: moderateScale(10),
    flex: 1,
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(20),
  },
  titleText: {
    fontSize: textLabelSize?.screenHeader,
    color: colors.SurfCrest,
    fontWeight: "700",
  },
  subTitleText: {
    fontSize: textLabelSize?.subtTitleFont,
    color: colors.SurfCrest,
    fontWeight: "400",
    marginTop: moderateScale(10),
  },
  bottomImage: {
    width: "100%",
    height: moderateScale(100),
    position: "absolute",
    bottom: moderateScale(70),
    resizeMode: "stretch",
  },
  flexSet: {
    flex: 1,
  },

  shimmerViewContainer: {
    alignSelf: "center",
    marginTop: moderateScale(40),
  },
  shimmerRow: {
    marginTop: moderateScale(50),
    flexDirection: "row",
    alignItems: "center",
  },
});
