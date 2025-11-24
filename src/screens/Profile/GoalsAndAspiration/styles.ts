import { StyleSheet } from "react-native";
import {
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";

const styles = StyleSheet.create({
  textSubHeaderTitle: {
    fontSize: textScale(25),
    fontWeight: "500",
    color: colors?.SurfCrest,
    marginBottom: moderateScale(20),
  },
  buttonContainer: {
    alignSelf: "center",
    marginTop: moderateScale(30),
    marginBottom: moderateScale(10),
    width: "100%",
  },
  textTitle: {
    fontSize: textScale(13),
    fontWeight: "600",
    color: colors?.SurfCrest,
  },
  titleHeader: {
    // flexDirection: "row",
    // alignItems: "center",
    marginVertical: moderateScale(20),
    gap: moderateScale(6),
    // backgroundColor: "red",
  },
  titleHeaderView: {
    borderWidth: StyleSheet?.hairlineWidth,
    borderColor: "rgba(203, 226, 209, 0.28)",
    width: width,
    marginTop: moderateScale(5),
    marginBottom: moderateScale(-10),
  },
  cancel: {
    color: "white",
    fontSize: moderateScale(14),
    alignSelf: "center",
    marginTop: moderateScale(20),
  },
  errorText: {
    color: colors.royalOrange,
    marginTop: moderateScale(10),
  },
  addButton: {
    marginVertical: moderateScale(20),
    borderColor: colors?.SurfCrest,
    justifyContent: "center",
  },
});

export default styles;
