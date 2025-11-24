// styles.ts
import { StyleSheet } from "react-native";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";

export const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    dateContainer: { flexDirection: "row" },
    dateTextContainer: { marginHorizontal: moderateScale(10) },
    dateStyle: {
        fontSize: textScale(14),
        fontFamily: "Poppins-Regular",
        fontWeight: "600",
        color: colors.SurfCrest,
    },
    notificationContainer: {
        flexDirection: "row",
        width: moderateScale(100),
        justifyContent: "space-between",
    },
    iconContainer: {
        width: moderateScale(40),
        height: moderateScale(40),
        backgroundColor: colors.SurfCrest,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        borderRadius: moderateScale(40)
    },
    notificationCountContainer: {
        width: moderateScale(20),
        height: moderateScale(20),
        // backgroundColor: colors.SurfCrest,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: colors.royalOrange,
        borderRadius: 10,
    },
    notificationCountText: {
        color: colors.SurfCrest,
        fontSize: textScale(9),
        fontWeight: "bold",
    },
    userInfoContainer: {
        flexDirection: "row",
        justifyContent: 'space-evenly',
        alignItems: "center",
        marginTop: moderateScale(20), height: moderateScale(100)
    },
    profileImageContainer: {
        width: moderateScale(20),
        height: moderateScale(40),
        backgroundColor: colors.SurfCrest,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: moderateScale(32),
    },
    profileImage: {},
    userInfoTextContainer: {
        marginHorizontal: moderateScale(30),
        justifyContent: "space-between",
        flexDirection: "column",
        height: moderateScale(50),
    },
    userInfoName: {
        fontSize: textScale(24),
        fontWeight: '700',
        fontFamily: "Poppins-Regular",
        color: colors.SurfCrest,
    },
    userStatusContainer: {
        flexDirection: "row",
        alignItems: 'center'
    },
    smileEmojiContainer: {
        height: moderateScale(24),
        width: 24,
        justifyContent: 'center',
    },
    userStatusText: {
        fontSize: textScale(20),
        fontWeight: '700',
        fontFamily: "Poppins-Regular",
        color: colors.SurfCrest,
    },
});

