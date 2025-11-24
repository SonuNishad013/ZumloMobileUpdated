import { StyleSheet } from "react-native";
import colors from "../../../constant/colors";
import {
  height,
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  messagesListContainer: {
    padding: moderateScale(10),
  },
  messageContainer: {
    marginVertical: moderateScale(10),
    borderRadius: moderateScale(35),
    alignItems: "center",
    borderWidth: moderateScale(1),
    borderColor: colors?.royalOrangeDark,
    minHeight: moderateScale(20),
  },
  messageText: {
    fontSize: textScale(13),
    fontWeight: "400",
    color: colors?.SurfCrest,
    margin: moderateScale(10),
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: moderateScale(10),
    gap: moderateScale(15),
    marginBottom: moderateScale(10),
  },
  inputSubContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(35),
    flex: 1,
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(14),
    justifyContent: "space-between",
    borderColor: colors.polishedPine,
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  input: {
    flex: 1,
    maxHeight: moderateScale(75),
    color: colors.SurfCrest,
    paddingHorizontal: moderateScale(10),
    marginRight: moderateScale(10),
    minHeight: moderateScale(30),
  },
  typingIndicatorContainer: {
    padding: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    width: moderateScale(156),
    paddingHorizontal: moderateScale(18),
    paddingVertical: moderateScale(28),

    borderRadius: moderateScale(20),
    alignItems: "center",
    justifyContent: "center",
  },
  titleStyle: {
    textAlign: "center",
    fontSize: textScale(14),
    fontWeight: "600",
  },
  goToDashbaordText: {
    color: colors.SurfCrest,
    textDecorationLine: "underline",
    borderEndWidth: moderateScale(1),
  },
  flatlistContentStyle: {
    gap: moderateScale(15),
    marginTop: moderateScale(40),
    alignSelf: "center",
  },
  gotoDahbaordView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateScale(40),
  },
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(5),
    alignSelf: "flex-start",
    paddingStart: moderateScale(19),
  },
  sentView: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(5),
    alignSelf: "flex-end",
    paddingEnd: moderateScale(20),
  },
  senttext: {
    color: colors.SurfCrest,
    fontWeight: "400",
    fontSize: textScale(10),
  },
  readContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(5),
    alignSelf: "flex-end",
    paddingEnd: moderateScale(20),
  },
  readText: {
    color: colors.SurfCrest,
    fontWeight: "400",
    fontSize: textScale(10),
  },

  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: moderateScale(10),
  },
  loadingGif: {
    width: moderateScale(50),
    height: moderateScale(35),
  },
  highlightedText: {
    fontWeight: "bold",
    color: colors.SurfCrest,
    textAlign: "left",
  },
  noMessage: {
    fontSize: textScale(14),
    color: colors?.SaltBox,
    fontWeight: "400",
    marginTop: moderateScale(10),
  },
  hightView_ios: {
    height: height * 0.71,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
  },
  hightView_android: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  imageContainerStyle: { flex: 1, marginTop: moderateScale(-15) },
  contentContainerStyle: {
    marginHorizontal: moderateScale(15),
  },
  KeyboardAvoidingViewStyle: {
    flex: 1,
  },
  innerViewContainer: {
    flex: 1,
    flexDirection: "row",

    alignItems: "center",
  },
  innerImageStyle: {
    height: moderateScale(35),
    width: moderateScale(35),
    borderRadius: moderateScale(17),
    overflow: "hidden",
    resizeMode: "cover",
    borderWidth: 2,
    borderColor: colors?.polishedPine,
  },
  addFlex: {
    flex: 1,
  },
});
export default styles;

export const getMessageArea = (isSender: any) => {
  let styleReturn: any = {
    maxWidth: width - moderateScale(60),
    backgroundColor: isSender ? colors?.SaltBox : colors.SurfCrest,
    borderTopLeftRadius: moderateScale(15),
    borderTopRightRadius: moderateScale(15),
    borderBottomLeftRadius: isSender ? moderateScale(10) : moderateScale(0),
    borderBottomRightRadius: isSender ? moderateScale(0) : moderateScale(10),
    alignSelf: isSender ? "flex-end" : "flex-start",
    justifyContent: isSender ? "flex-start" : "flex-end",
    borderColor: isSender ? colors.royalOrange : colors.transparent,
  };
  return styleReturn;
};
