import { StyleSheet } from "react-native";
import colors from "../../../../constant/colors";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.SurfCrest,
  },
  containerBox: {
    width: "auto",
    backgroundColor: colors?.polishedPine,
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(20),
    borderRadius: moderateScale(10),
  },
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: moderateScale(10),
  },
  titleStyle: {
    fontSize: textScale(14),
    color: colors?.prussianBlue,
    fontWeight: "600",
    marginRight: moderateScale(10),
  },
  contentContainerStyle: {
    paddingBottom: moderateScale(50),
  },
  flatStyle: {
    marginHorizontal: moderateScale(19),
  },
  container2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: moderateScale(30),
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
