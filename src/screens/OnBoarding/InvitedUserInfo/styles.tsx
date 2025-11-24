// styles.ts
import { StyleSheet } from "react-native";
import { height, moderateScale, textScale, width } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";

export const styles = StyleSheet.create({
  container2: {
    marginTop: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    borderWidth: 1,
    marginVertical: moderateScale(10)
  },
  dropdownContainer: {
    marginVertical: moderateScale(5),
    borderRadius: moderateScale(15),
    borderColor: colors.lightSurfCrest2,
    borderWidth: 1,
    height: moderateScale(56),
    backgroundColor: colors.lightSurfCrest,
  },
  aboutInputContainer: {
    height: moderateScale(122),
    borderColor: colors.lightSurfCrest2,
    borderWidth: 1,
    marginVertical: moderateScale(10),
    backgroundColor: colors.lightSurfCrest,
  },
  container: {
    // flex: 1,
    height:height,
    backgroundColor: colors?.SurfCrest,
  },
  headerContainer: {
    backgroundColor: colors.backgroundTheme,
    height: moderateScale(65),
    borderBottomLeftRadius: moderateScale(25),
    borderBottomRightRadius: moderateScale(25),
    paddingTop:moderateScale(15)
  },
  headerMainContainer: {
    backgroundColor: colors.backgroundTheme,
    marginHorizontal: moderateScale(15),
    // marginBottom: moderateScale(15),
  },
  tabBarView: {
    height: moderateScale(50),
    marginHorizontal: moderateScale(15),
    marginTop: moderateScale(10),
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabBarItem: {
    height: moderateScale(30),
    width: width / 3.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: moderateScale(3),
  },
  tabBarItemText: {
    marginHorizontal: moderateScale(10),
    fontSize: textScale(10),
    fontWeight: '400',
  },
  commontextStyle: { fontSize: textScale(14), color: colors.lightprussianBlue },
  phnView: {
    flexDirection: 'row',
    // // justifyContent:'space-between',
    // alignItems: 'center',
    // borderRadius: moderateScale(15),
    // borderColor: colors?.lightSurfCrest2,
    // borderWidth: 1,
    // padding: moderateScale(5),
    backgroundColor:colors.lightSurfCrest,
    borderWidth: moderateScale(1),
    // width: moderateScale(331),
    height: moderateScale(56),
    // justifyContent: "space-between",
    borderColor: colors?.polishedPine,
    borderRadius: moderateScale(15),
    // flexDirection: "row",
    alignItems:'center',
    paddingHorizontal: moderateScale(9),
    marginVertical: moderateScale(5),
    width: moderateScale(331) 
  },
});

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
    color: 'lightblack',
  },
  selectedHolderTxt: {
    fontSize: textScale(10),
    color: 'lightblack',
    marginTop: moderateScale(6),
  },
  notSelectedHolderTxt: {
    fontSize: textScale(10),
    color: colors.ShadowGreen,
    marginTop: moderateScale(6),
  }
});
