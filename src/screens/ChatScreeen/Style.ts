import { StyleSheet } from "react-native";
import colors from "../../constant/colors";
import { moderateScale, textScale } from "../../constant/responsiveStyle";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  messagesListContainer: {
    padding: 10,
    // flexDirection: 'column-reverse'
  },
  messageContainer: {
    marginVertical: moderateScale(10),
    borderRadius: moderateScale(35),
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors?.royalOrangeDark,

    minHeight: moderateScale(20),
    // justifyContent: "center",
    // alignSelf: "center",
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
    padding: 10,
    gap: moderateScale(15),
    marginBottom: moderateScale(10),
  },
  inputSubContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
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
    paddingHorizontal: 10,
    marginRight: 10,
    minHeight: moderateScale(30),
  },
  typingIndicatorContainer: {
    padding: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    width: moderateScale(156),
    // height: moderateScale(119),
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
    borderEndWidth: 1,
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
  header: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.grey,
    marginBottom: moderateScale(10),
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(15),
  },
  iconContainer: {
    height: moderateScale(30),
    width: moderateScale(30),
    backgroundColor: colors.backIconBg,
    borderRadius: moderateScale(7),
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(5),
  },
  profileName: {
    color: colors.SurfCrest,
    fontWeight: "600",
    fontSize: textScale(14),
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(5),
  },
  profileStatus: {
    color: colors.SurfCrest,
    fontWeight: "400",
    fontSize: textScale(10),
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
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
});
export default styles;
