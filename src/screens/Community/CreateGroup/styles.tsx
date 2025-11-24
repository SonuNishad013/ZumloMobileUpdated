import { StyleSheet } from "react-native";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { textLabelSize } from "../../../utils/TextConfig";

export const styles = StyleSheet.create({
  headerContainer: {
    marginHorizontal: moderateScale(19),
    paddingBottom: moderateScale(15),
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    marginHorizontal: moderateScale(19),
    paddingBottom: moderateScale(30),
  },
  title: {
    fontSize: textLabelSize?.screenHeader,
    color: colors?.royalOrangeDark,
    fontWeight: "700",
    marginTop: moderateScale(20),
  },
  pickerView: {
    height: moderateScale(175),
  },
  description: {
    fontSize: textLabelSize?.subHeaderTextSize,
    color: colors?.whiteOp6,
    fontWeight: "400",
    width: "90%",
    marginTop: moderateScale(5),
    marginBottom: moderateScale(30),
  },
  inputContainer: {
    backgroundColor: colors?.transparent,
    width: "auto",
    borderColor: colors?.royalOrange,
    marginTop: moderateScale(0),
  },
  inputContainerG: {
    backgroundColor: colors?.transparent,
    width: "auto",
    borderColor: colors?.royalOrange,
    marginTop: moderateScale(8),
  },

  inputContainer2: {
    backgroundColor: colors?.transparent,
    width: "auto",
    borderColor: colors?.royalOrange,
    marginTop: moderateScale(8),
  },
  inputText: {
    color: colors?.SurfCrest,
  },
  buttonContainer: {
    width: "auto",
    marginBottom: moderateScale(50),
    marginTop: moderateScale(30),
  },
  inputContainerBig: {
    backgroundColor: colors?.transparent,
    width: "auto",
    borderColor: colors?.royalOrange,
    marginTop: moderateScale(15),
    height: moderateScale(153),
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(30),
  },
  inputContainerBig2: {
    backgroundColor: colors?.transparent,
    width: "auto",
    borderColor: colors?.royalOrange,
    marginTop: moderateScale(15),
    height: moderateScale(153),
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(10),
  },
  headerContainerLine: {
    marginTop: moderateScale(25),
    height: moderateScale(26),
  },
  headerText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
    marginRight: moderateScale(3),
  },
  headerLine: {
    height: moderateScale(10),
    backgroundColor: colors?.SurfCrest,
    flex: 1,
    marginTop: moderateScale(15),
    opacity: 0.5,
  },
  flatList: {
    marginTop: moderateScale(20),
  },
  flatListContent: {
    gap: moderateScale(25),
  },
  addMembersButtonContainer: {
    borderColor: colors?.royalOrange,
    marginTop: moderateScale(10),
  },
  addMembersButtonTitle: {
    color: colors?.royalOrange,
  },
  addMembersButtonIcon: {
    tintColor: colors?.royalOrange,
  },
  membersImageContainer: {
    flexDirection: "row",
    marginTop: moderateScale(25),
  },
  memberImage: {
    width: moderateScale(39),
    height: moderateScale(39),
    borderRadius: moderateScale(39),
    borderWidth: moderateScale(1),
    borderColor: colors.polishedPine,
    backgroundColor: colors?.SurfCrest,
  },
  memberImageOverlap: {
    marginLeft: moderateScale(-10),
  },
  commonInputView: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(5),
    marginTop: moderateScale(15),
    flex: 1,
  },
  addButtonView: {
    borderRadius: moderateScale(19),
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: moderateScale(56),
    marginBottom: moderateScale(5),
  },
  detailText: {
    color: colors?.royalOrange,
    marginHorizontal: moderateScale(8),
    fontSize: textScale(12),
    fontWeight: "400",
  },
  errorText: {
    color: colors?.royalOrange,
    marginHorizontal: moderateScale(8),
    fontSize: textScale(12),
    fontWeight: "400",
  },
  memberStyle: {
    marginTop: moderateScale(10),
    color: colors?.SurfCrest,
    fontWeight: "400",
    fontSize: textScale(12),
  },
});
