import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { CalendarIcon, NotificationIcon } from "../../assets";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";

interface Props {
  currentDate?: any;
  onChatPress?: any;
  onNotificationPress?: any;
  notificationCount?: any;
  massageCount?: any;
  navigation?: any;
}

const HeaderDateNotificationMessage: React.FC<Props> = ({
  currentDate,
  onChatPress,
  onNotificationPress,
  notificationCount,
  massageCount,
  navigation,
}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.dateContainer}>
        <CalendarIcon width={moderateScale(21)} height={moderateScale(22)} />
        <View style={styles.dateTextContainer}>
          <Text style={styles.dateStyle}>{currentDate}</Text>
        </View>
      </View>
      <View style={[styles.notificationContainer]}>
        {/* <IconContainerCircle
          icon={<ChatIcon />}
          onPress={onChatPress}
          // onPress={() => {
          //   navigation.navigate(navigationString.ChatWithDr)
          // }}
          count={massageCount}
          type="chat"
        /> */}
        <IconContainerCircle
          icon={<NotificationIcon />}
          onPress={onNotificationPress}
          count={notificationCount}
          type="notification"
        />
      </View>
    </View>
  );
};

const IconContainerCircle = ({ icon, count, type, onPress }: any) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.iconContainerCircle,
          {
            backgroundColor:
              type === "notification" ? colors.SurfCrest : colors.royalOrange,
          },
        ]}
      >
        {icon}
      </View>
      {count > 0 && (
        <View
          style={[
            styles.notificationCountContainer,
            {
              backgroundColor:
                type === "notification" ? colors.royalOrange : colors.SurfCrest,
            },
          ]}
        >
          <Text style={styles.notificationCountText}>{count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors?.backgroundTheme,
    marginTop: moderateScale(15),
    marginBottom: moderateScale(10),
    paddingHorizontal: moderateScale(19),
  },
  dateContainer: { flexDirection: "row", alignItems: "center" },
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
    // backgroundColor: "red",
    justifyContent: "flex-end",
    gap: moderateScale(15),
  },
  iconContainerCircle: {
    width: moderateScale(40),
    height: moderateScale(40),
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderRadius: moderateScale(40),
  },
  notificationCountContainer: {
    position: "absolute",
    bottom: moderateScale(27),
    height: moderateScale(15),
    width: moderateScale(15),
    borderRadius: moderateScale(7.5),
    justifyContent: "center",
    alignItems: "center",
  },
  notificationCountText: {
    color: colors.prussianBlue,
    fontSize: textScale(9),
    fontWeight: "bold",
  },
});

export default HeaderDateNotificationMessage;
