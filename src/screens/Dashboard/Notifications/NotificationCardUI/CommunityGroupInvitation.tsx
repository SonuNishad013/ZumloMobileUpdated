import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../../../../constant/colors";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import { imagePath } from "../../../../assets/png/imagePath";
import moment from "moment";
import CommonButton from "../../../../components/Buttons/commonButton";
import allActions from "../../../../redux/actions";
import { notificationTypesId } from "../../../../constant/notificationFormName";
import { API_FUN_NAMES } from "../../../../constant/APIsFunctionNames";
import { useSelector } from "react-redux";
import { getPostStatus } from "../../../../redux/selector";
import logger from "../../../../constant/logger";
import { strings } from "../../../../constant/strings";

interface Props {
  item?: any;
  index?: any;
  dispatch?: any;
  notificationListData?: any;
  setNotificationListData?: any;
  toasterFunction?: any;
}
const CommunityGroupInvitation: React.FC<Props> = ({
  item,
  index,
  dispatch,
  notificationListData,
  setNotificationListData,
  toasterFunction,
}) => {
  let postStatus = useSelector(getPostStatus());
  const notificationObjectData = () => {
    switch (item?.notificationType) {
      case notificationTypesId?.communityGroupInvitation:
        return {
          title: "Community Group Invitation",
          description: item?.description,
          memberId: 0,
          acceptOrRejectInviteType: 1,
          groupId: JSON?.parse(item?.data)?.Id,
        };
      case notificationTypesId?.communityJoinRequest:
        return {
          title: "Community Group Join Request",
          memberId: JSON?.parse(item?.data)?.MemberId,
          description: item?.description,
          acceptOrRejectInviteType: 2,
          groupId: JSON?.parse(item?.data)?.Id,
        };
      case notificationTypesId?.connectUser:
        return {
          title: "Connection request",
          memberId: JSON?.parse(item?.data)?.MemberId,
          description: item?.description,
          communityUserProfileImage: JSON?.parse(item?.data)?.ProfilePicture,
        };
      default:
        return {
          title: "--",
          memberId: 0,
          description: "--",
          acceptOrRejectInviteType: 0,
          groupId: 0,
        };
    }
  };

  const updateNotificationList = () => {
    let update = [...notificationListData];
    update?.splice(index, 1);
    return update;
  };

  const acceptOrRejectInvite = (isAccept: boolean) => {
    let requestBody = {
      isAccept,
      memberId: notificationObjectData()?.memberId,
      groupId: notificationObjectData()?.groupId,
      acceptOrRejectInviteType:
        notificationObjectData()?.acceptOrRejectInviteType,
      notificationId: item?.id,
    };
    allActions.communitiesAction
      .acceptOrRejectInvite(dispatch, requestBody, "acceptOrRejectInvite")
      .then((response: any) => {
        if (response?.statusCode == 200) {
          setNotificationListData(updateNotificationList);
          toasterFunction(1, response?.message);
        } else {
          toasterFunction(0, response?.message);
          setNotificationListData(updateNotificationList);
        }
      })
      .catch((err: any) => {
        toasterFunction(0, err?.message);
      });
  };

  const acceptOrRejectConnectionRequest = (isAccept: boolean) => {
    let requestBody = {
      isAccept,
      requestSenderMemberId: notificationObjectData()?.memberId,
      notificationId: item?.id,
    };
    allActions.communitiesAction
      .acceptOrRejectConnectionRequest(
        dispatch,
        requestBody,
        "acceptOrRejectConnectionRequest"
      )
      .then((response: any) => {
        if (response?.statusCode == 200) {
          dispatch({
            type: API_FUN_NAMES?.postStatus,
            payload: postStatus + 1,
          });
          setNotificationListData(updateNotificationList);
          toasterFunction(1, response?.message);
        } else {
          toasterFunction(0, response?.message);
          setNotificationListData(updateNotificationList);
          if (response?.message === strings?.user_not_found) {
            deleteNotificationById(item);
          }
        }
      })
      .catch((err: any) => {
        toasterFunction(0, err?.message);
      });
  };
  // Delete notification if user not found response received in accept and reject connection request .
  const deleteNotificationById = async (item: any) => {
    let requestBody = null;
    let param = item?.id;
    try {
      const response =
        await allActions.notificationAction.DeleteNotificationByIdAPI(
          dispatch,
          requestBody,
          "saveNotification",
          param
        );
      if (response.statusCode === 200) {
      } else {
        toasterFunction(0, response?.message);
      }
    } catch (error: any) {
      toasterFunction(0, error?.message);
    } finally {
    }
  };
  logger("item____", {
    parsedData: JSON.parse(item?.data)?.ProfilePicture,
    item,
  });
  return (
    <TouchableOpacity activeOpacity={1} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={
            item?.imageUrl ||
            notificationObjectData()?.communityUserProfileImage
              ? {
                  uri:
                    notificationObjectData()?.communityUserProfileImage ||
                    item?.imageUrl,
                }
              : imagePath?.dummyProfileIcon
          }
          style={styles.calendarIcon}
          resizeMode="stretch"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{notificationObjectData()?.title}</Text>
        <Text style={styles.description}>
          {notificationObjectData()?.description}
        </Text>
        <View style={styles.buttonContainer}>
          <CommonButton
            onPress={() => {
              console.log(
                "notificationTypesId?.connectUser->",
                notificationTypesId?.connectUser
              );

              if (item?.notificationType === notificationTypesId?.connectUser) {
                acceptOrRejectConnectionRequest(true);
              } else acceptOrRejectInvite(true);
            }}
            btnName={"Accept"}
            mainContainer={styles.acceptButton}
          />
          <CommonButton
            btnName={"Reject"}
            onPress={() => {
              if (item?.notificationType === notificationTypesId?.connectUser) {
                acceptOrRejectConnectionRequest(false);
              } else acceptOrRejectInvite(false);
            }}
            mainContainer={styles.rejectButton}
            btnNameStyle={styles.rejectText}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.timeStampContainer}>
        <Text style={styles.timeStamp}>
          {moment.utc(item?.createdDate).local().fromNow()}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default CommunityGroupInvitation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors?.prussianBlue,
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
    color: colors?.SurfCrest,
    flexShrink: 1,
  },
  description: {
    fontSize: textScale(12),
    fontWeight: "400",
    color: colors?.SurfCrest,
    flexShrink: 1,
    flexWrap: "wrap",
  },
  buttonContainer: {
    flexDirection: "row",
    paddingBottom: moderateScale(10),
    alignSelf: "flex-end",
    gap: moderateScale(10),
    marginTop: moderateScale(10),
  },
  acceptButton: {
    height: moderateScale(25),
    width: moderateScale(80),
  },
  rejectButton: {
    height: moderateScale(25),
    width: moderateScale(80),
    backgroundColor: colors?.SurfCrest,
  },
  rejectText: {
    color: colors?.prussianBlue,
  },
  timeStampContainer: {
    position: "absolute",
    right: moderateScale(15),
    bottom: moderateScale(5),
  },
  timeStamp: {
    color: colors?.SurfCrest,
    fontSize: textScale(10),
  },
});
