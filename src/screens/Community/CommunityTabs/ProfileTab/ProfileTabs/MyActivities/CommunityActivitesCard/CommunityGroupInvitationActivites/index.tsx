import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../../../../../../../../constant/colors";
import {
  moderateScale,
  textScale,
} from "../../../../../../../../constant/responsiveStyle";
import { imagePath } from "../../../../../../../../assets/png/imagePath";
import moment from "moment";
import CommonButton from "../../../../../../../../components/Buttons/commonButton";
import allActions from "../../../../../../../../redux/actions";
import { notificationTypesId } from "../../../../../../../../constant/notificationFormName";
import { useSelector } from "react-redux";
import {
  getPostStatus,
  profileDetailsCommunity,
} from "../../../../../../../../redux/selector";
import { strings } from "../../../../../../../../constant/strings";
import { API_FUN_NAMES } from "../../../../../../../../constant/APIsFunctionNames";
import {
  STATUS_CODES,
  TOAST_STATUS,
} from "../../../../../../../../constant/appConstant";
import { APPLY_STATUS } from "../../../../../../../../constant/ENUM";

interface Props {
  item?: any;
  index?: any;
  dispatch?: any;
  notificationListData?: any;
  setNotificationListData?: any;
  toasterFunction?: any;
}
const CommunityGroupInvitationActivites: React.FC<Props> = ({
  item,
  index,
  dispatch,
  notificationListData,
  setNotificationListData,
  toasterFunction,
}) => {
  const memberDataCurrent = useSelector(profileDetailsCommunity());
  let postStatus = useSelector(getPostStatus());
  const notificationObjectData = () => {
    switch (item?.notificationType) {
      case notificationTypesId?.communityGroupInvitation:
        return {
          title: strings?.Community_Group_Invitation,
          description: item?.description,
          acceptOrRejectInviteType: 1,
          groupId: JSON?.parse(item?.data)?.Id,
          memberId: JSON?.parse(item?.data)?.MemberId,
        };
      case notificationTypesId?.communityJoinRequest:
        return {
          title: strings?.Community_Group_Join_Request,
          memberId: JSON?.parse(item?.data)?.MemberId,
          description: item?.description,
          acceptOrRejectInviteType: 2,
          groupId: JSON?.parse(item?.data)?.Id,
        };
      case notificationTypesId?.connectUser:
        return {
          title: strings?.Connection_request,
          memberId: JSON?.parse(item?.data)?.MemberId,
          description: item?.description,
          communityUserProfileImage: JSON?.parse(item?.data)?.ProfilePicture,
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
      .acceptOrRejectInvite(
        dispatch,
        requestBody,
        API_FUN_NAMES?.acceptOrRejectInvite
      )
      .then((response: any) => {
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          setNotificationListData(updateNotificationList);
          toasterFunction(TOAST_STATUS?.SUCCESS, response?.message);
        } else {
          toasterFunction(TOAST_STATUS?.ERROR, response?.message);
          setNotificationListData(updateNotificationList);
        }
      })
      .catch((err: any) => {
        toasterFunction(TOAST_STATUS?.ERROR, err?.message);
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
        API_FUN_NAMES?.acceptOrRejectConnectionRequest
      )
      .then((response: any) => {
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          dispatch({
            type: API_FUN_NAMES?.postStatus,
            payload: postStatus + 1,
          });
          setNotificationListData(updateNotificationList);
          toasterFunction(TOAST_STATUS?.SUCCESS, response?.message);
        } else {
          toasterFunction(TOAST_STATUS?.ERROR, response?.message);
          setNotificationListData(updateNotificationList);
          if (response?.message === strings?.user_not_found) {
            deleteNotificationById(item);
          }
        }
      })
      .catch((err: any) => {
        toasterFunction(TOAST_STATUS?.ERROR, err?.message);
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
          resizeMode={APPLY_STATUS?.stretch}
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
              if (item?.notificationType === notificationTypesId?.connectUser) {
                acceptOrRejectConnectionRequest(true);
              } else acceptOrRejectInvite(true);
            }}
            btnName={strings?.Accept}
            mainContainer={styles.acceptButton}
          />
          <CommonButton
            btnName={strings?.Reject}
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

export default CommunityGroupInvitationActivites;

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
    backgroundColor: colors?.prussianBlue,
  },
  rejectText: {
    color: colors?.SurfCrest,
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
