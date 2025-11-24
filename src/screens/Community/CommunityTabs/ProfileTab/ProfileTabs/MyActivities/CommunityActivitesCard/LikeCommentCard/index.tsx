import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../../../../../../../../constant/colors";
import {
  moderateScale,
  textScale,
} from "../../../../../../../../constant/responsiveStyle";
import moment from "moment";
import { notificationTypesId } from "../../../../../../../../constant/notificationFormName";
import { decodeSpaces } from "../../../../../../../../helper/CommunityHelper";
import navigationString from "../../../../../../../../navigation/navigationString";
import { useNavigation } from "@react-navigation/native";
import { strings } from "../../../../../../../../constant/strings";

interface Props {
  item?: any;
  index?: any;
}
const LikeCommentCardActivites: React.FC<Props> = ({ item, index }) => {
  const navigation: any = useNavigation();
  const notificationObjectData = () => {
    switch (item?.notificationType) {
      case notificationTypesId?.likedFeed:
        return {
          title: strings?.Like_your_feed,
          description: item?.description,
          memberId: 0,
          acceptOrRejectInviteType: 1,
          groupId: JSON?.parse(item?.data)?.Id,
        };
      case notificationTypesId?.commentFeed:
        return {
          title: strings?.Comment_on_feed,
          memberId: JSON?.parse(item?.data)?.MemberId,
          description: item?.description,
          acceptOrRejectInviteType: 2,
          groupId: JSON?.parse(item?.data)?.Id,
        };
      case notificationTypesId?.commentReply:
        return {
          title: strings?.Comment_on_your_feed,
          memberId: JSON?.parse(item?.data)?.MemberId,
          description: item?.description,
          acceptOrRejectInviteType: 3,
          groupId: JSON?.parse(item?.data)?.Id,
        };
      case notificationTypesId?.taggedUserNotification:
        return {
          title: strings?.Tagged_in_feed,
          memberId: JSON?.parse(item?.data)?.MemberId,
          description: item?.description,
          acceptOrRejectInviteType: 4,
          groupId: JSON?.parse(item?.data)?.Id,
        };
      case notificationTypesId?.DeleteFeed:
        return {
          title: strings?.Feed_deleted,
          description: item?.description,
          memberId: 0,
          acceptOrRejectInviteType: 1,
          groupId: JSON?.parse(item?.data)?.Id,
        };
      case notificationTypesId?.ReportFeed:
        return {
          title: strings?.Report_your_feed,
          description: item?.description,
          memberId: 0,
          acceptOrRejectInviteType: 1,
          groupId: JSON?.parse(item?.data)?.Id,
        };
      case notificationTypesId?.DeleteGroup:
        return {
          title: strings?.Group_deleted,
          description: item?.description,
          memberId: 0,
          acceptOrRejectInviteType: 1,
          groupId: JSON?.parse(item?.data)?.Id,
        };

      default:
        return {
          title: strings?.blankSpace,
          memberId: 0,
          description: strings?.blankSpace,
          acceptOrRejectInviteType: 0,
          groupId: 0,
        };
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onPress={() => {
        const isNotificationTypeIncluded = [
          notificationTypesId?.DeleteFeed,
          notificationTypesId?.DeleteGroup,
        ].includes(item?.notificationType);

        if (isNotificationTypeIncluded) {
          return;
        }
        navigation?.navigate(navigationString?.IndependentFeed, {
          feedId: JSON?.parse(item?.data)?.FeedId,
          NotificationItem: item,
        });
      }}
    >
      <View style={styles.textContainer}>
        <Text style={styles.title}>{notificationObjectData()?.title}</Text>
        <Text style={styles.description}>
          {decodeSpaces(notificationObjectData()?.description)}
        </Text>
      </View>
      <TouchableOpacity style={styles.timeStampContainer}>
        <Text style={styles.timeStamp}>
          {moment.utc(item?.createdDate)?.local()?.fromNow()}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default LikeCommentCardActivites;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors?.SurfCrest,
    padding: moderateScale(15),
    borderRadius: moderateScale(15),
    flexDirection: "row",
    gap: moderateScale(10),
  },

  imageContainer: {
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: moderateScale(25),
    backgroundColor: colors.SurfCrest,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: moderateScale(1),
    borderColor: colors?.surfCrustOp2,
  },
  calendarIcon: {
    height: moderateScale(48),
    width: moderateScale(48),
    borderRadius: moderateScale(24),
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.prussianBlue,
    flexShrink: 1,
  },
  description: {
    fontSize: textScale(12),
    fontWeight: "400",
    color: colors?.prussianBlue,
    flexShrink: 1,
    flexWrap: "wrap",
  },

  timeStampContainer: {
    position: "absolute",
    right: moderateScale(15),
    bottom: moderateScale(5),
  },
  timeStamp: {
    color: colors?.prussianBlue,
    fontSize: textScale(10),
  },
});
