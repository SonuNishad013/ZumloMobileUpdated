import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import {
  BGCircleOp,
  ChatIcon,
  IconsNext,
  NotificationIcon,
  NotificationIcon2,
} from "../../assets";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import CommonHeader from "./commonHeader";

interface Props {
  onChatPress?: any;
  onNotificationPress?: any;
  notificationCount?: any;
  massageCount?: any;
  isBackIcon?: boolean;
  mainContainer?: ViewStyle;
  container?: ViewStyle;
  isChatIcon?: boolean;
  isNotiIcon?: boolean;
  isNextIcon?: any;
  onNextPress?: any;
  textContainer?: TextStyle;
  headerName?: any;
  onBackPress?: any;
  communityTab?: any;
}

const CommunityHeaderNotificationMessage: React.FC<Props> = ({
  onChatPress,
  onNotificationPress,
  notificationCount,
  massageCount,
  isBackIcon = false,
  mainContainer,
  container,
  isChatIcon,
  isNotiIcon,
  isNextIcon,
  onNextPress,
  textContainer,
  headerName,
  onBackPress,
  communityTab,
}) => {
  return (
    <View
      style={[
        styles.container,
        container,
        {
          borderBottomEndRadius:
            communityTab == 2 ? moderateScale(0) : moderateScale(23),
          borderBottomStartRadius:
            communityTab == 2 ? moderateScale(0) : moderateScale(23),
        },
      ]}
    >
      <View style={[styles.mainContainer, mainContainer]}>
        <CommonHeader
          headerName={headerName}
          isBackIcon={isBackIcon}
          textContainer={[styles.textContainer, textContainer]}
          onBackPress={onBackPress}
        />
        <View style={styles.notificationContainer}>
          {isChatIcon && (
            <IconContainerCircle
              icon={<ChatIcon />}
              onPress={onChatPress}
              count={massageCount}
              type="chat"
            />
          )}
          {isNotiIcon && (
            <IconContainerCircle
              icon={<NotificationIcon2 />}
              onPress={onNotificationPress}
              count={notificationCount}
              type="notification"
              iconContainerCircle={{ backgroundColor: colors?.prussianBlue }}
            />
          )}
          {isNextIcon && (
            <IconContainerCircle
              icon={<IconsNext />}
              onPress={onNextPress}
              count={0}
              type="next"
            />
          )}
        </View>
      </View>
    </View>
  );
};

const IconContainerCircle = ({
  icon,
  count,
  type,
  onPress,
  iconContainerCircle,
}: any) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.iconContainerCircle,
          type === "notification"
            ? styles.notificationBackground
            : styles.chatBackground,
          iconContainerCircle,
        ]}
      >
        {icon}
      </View>
      {count > 0 && (
        <View
          style={[
            styles.notificationCountContainer,
            type === "notification"
              ? styles.chatBackground
              : styles.notificationBackground,
          ]}
        >
          <Text style={styles.notificationCountText}>{count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.SurfCrest,
    borderBottomEndRadius: moderateScale(23),
    borderBottomStartRadius: moderateScale(23),
  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.SurfCrest,
    marginTop: moderateScale(15),
    marginBottom: moderateScale(25),
    paddingHorizontal: moderateScale(19),
    height: moderateScale(40),
  },
  textContainer: {
    marginHorizontal: moderateScale(0),
  },
  notificationContainer: {
    flexDirection: "row",
    width: moderateScale(100),
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
  notificationBackground: {
    backgroundColor: colors.SurfCrest,
  },
  chatBackground: {
    backgroundColor: colors.royalOrange,
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

export default CommunityHeaderNotificationMessage;
