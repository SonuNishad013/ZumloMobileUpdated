import {
  Image,
  ImageStyle,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import colors from "../../../constant/colors";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import { imagePath } from "../../../assets/png/imagePath";
import { formatNumberTitle } from "../../../helper/CommunityHelper";
import { strings } from "../../../constant/strings";
import allActions from "../../../redux/actions";
import navigationString from "../../../navigation/navigationString";
import { groupPrivacyType } from "../../../constant/CommunityConstant";
import CommonButton from "../../../components/Buttons/commonButton";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import { STATUS_CODES, TOAST_STATUS } from "../../../constant/appConstant";
import { APPLY_STATUS } from "../../../constant/ENUM";
import { textLabelSize } from "../../../utils/TextConfig";

interface Props {
  source?: any;
  card?: ViewStyle;
  name?: string;
  description?: string;
  memberCount?: any;
  status?: any;
  isJoinable?: boolean;
  iconStyle?: ImageStyle;
  dispatch?: any;
  toasterFunction?: any;
  id?: any;
  isJoinedGroup?: any;
  groupList?: any;
  setGroupList?: any;
  index?: any;
  navigation?: any;
  groupPrivacy?: any;
  isJoinRequestSent?: any;
  isSuggested?: any;
  mainContainer?: any;
  updateStatus?: any;
  IsAdmin?: any;
  item?: any;
  isSearched?: boolean;
}

const MainGroupCard: React.FC<Props> = ({
  source,
  card,
  name,
  description,
  memberCount,
  status,
  isJoinable = true,
  iconStyle,
  dispatch,
  toasterFunction,
  id,
  isJoinedGroup,
  groupList,
  setGroupList,
  index,
  navigation,
  groupPrivacy,
  isJoinRequestSent,
  isSuggested = false,
  mainContainer,
  updateStatus,
  IsAdmin,
  item,
  isSearched,
}) => {
  const updateGroupStatus = (data: any, idx: any, groupPrivacy: any) => {
    let update = [...data];
    if (groupPrivacy == groupPrivacyType?.public) {
      update[idx].isJoinedGroup = !update[idx]?.isJoinedGroup;
    } else {
      update[idx].isJoinRequestSent = !update[idx]?.isJoinRequestSent;
    }

    return update;
  };
  const joinGroup = () => {
    let requestbody = {
      groupId: id,
    };
    allActions.communitiesAction
      .joinGroup(dispatch, requestbody, API_FUN_NAMES?.joinGroup)
      .then((response: any) => {
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          if (groupList?.length) {
            setGroupList(updateGroupStatus(groupList, index, groupPrivacy));
          } else {
            updateStatus(API_FUN_NAMES?.join);
          }

          if (groupPrivacy == groupPrivacyType?.private) {
            toasterFunction(TOAST_STATUS?.SUCCESS, response?.message);
          }
        } else {
          toasterFunction(TOAST_STATUS?.ERROR, response?.message);
        }
      })
      .catch((err: any) => {
        toasterFunction(TOAST_STATUS?.ERROR, err?.message);
      });
  };

  const leaveGroup = () => {
    let requestbody = {
      groupId: id,
    };

    allActions.communitiesAction
      .leaveGroup(dispatch, requestbody, API_FUN_NAMES?.LeaveGroup)
      .then((response: any) => {
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          if (groupList?.length) {
            setGroupList(updateGroupStatus(groupList, index, groupPrivacy));
          } else {
            updateStatus(API_FUN_NAMES?.leave);
          }
        } else {
          toasterFunction(TOAST_STATUS?.ERROR, response?.message);
        }
      })
      .catch((err: any) => {
        toasterFunction(TOAST_STATUS?.ERROR, err?.message);
      });
  };
  const removeJoinRequest = () => {
    let requestbody = {
      groupId: id,
    };
    allActions.communitiesAction
      .removeJoinRequest(
        dispatch,
        requestbody,
        API_FUN_NAMES?.removeJoinRequest
      )
      .then((response: any) => {
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          setGroupList(updateGroupStatus(groupList, index, groupPrivacy));
          toasterFunction(TOAST_STATUS?.SUCCESS, response?.message);
        } else {
          toasterFunction(TOAST_STATUS?.ERROR, response?.message);
        }
      })
      .catch((err: any) => {
        toasterFunction(TOAST_STATUS?.ERROR, err?.message);
      });
  };
  const onJoinPress = () => {
    if (IsAdmin || isSearched) {
      navigation?.navigate(navigationString?.CommunityGroupDetails, {
        groupId: id ?? item?.id,
      });
      return;
    } else {
      if (groupPrivacy == groupPrivacyType?.public && !isJoinedGroup) {
        joinGroup();
      } else if (isJoinedGroup) {
        leaveGroup();
      } else if (isJoinRequestSent) {
        removeJoinRequest();
      } else {
        joinGroup();
      }
    }
  };
  return (
    <>
      {isSuggested ? (
        <Pressable
          style={[styles.cardContainer, mainContainer]}
          onPress={() => {
            navigation?.navigate(navigationString?.CommunityGroupDetails, {
              groupId: id,
            });
          }}
        >
          <View style={styles.imageContainer}>
            <Image
              source={imagePath.Chakras}
              style={styles.image}
              resizeMode={APPLY_STATUS?.stretch}
            />
          </View>
          <Text numberOfLines={1} style={styles.nameText}>
            {name}
          </Text>
          <Text style={styles.followersText}>
            {formatNumberTitle(memberCount, strings?.followers)}
          </Text>
          <CommonButton
            onPress={onJoinPress}
            mainContainer={styles.buttonContainer}
            btnName={status}
            activeOpacity={0.4}
          />
        </Pressable>
      ) : (
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.card, card]}
          onPress={() => {
            navigation?.navigate(navigationString?.CommunityGroupDetails, {
              groupId: id,
            });
          }}
        >
          <Image
            source={source ? { uri: source } : imagePath?.Chakras}
            style={[styles.icon, iconStyle]}
          />
          <View style={styles.infoContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {name}
              </Text>
              <Text style={styles.subtitle} numberOfLines={2}>
                {description}
              </Text>

              <View style={styles.scheduleItem}>
                <Image
                  style={styles.scheduleIcon}
                  source={imagePath?.ProfileUser}
                />
                <Text style={styles.scheduleText}>
                  {formatNumberTitle(memberCount, strings?.members)}
                </Text>
              </View>
            </View>

            {IsAdmin || isSearched ? (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={onJoinPress}
                style={styles.detailsContainer}
              >
                <Text style={styles.detailsText}>{strings?.Group_Detail}</Text>
                <Image style={styles.arrow} source={imagePath?.CirArrow} />
              </TouchableOpacity>
            ) : (
              <>
                {isJoinable && (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={onJoinPress}
                    style={styles.detailsContainer}
                  >
                    <Text style={styles.detailsText}>{status}</Text>
                    <Image style={styles.arrow} source={imagePath?.CirArrow} />
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default MainGroupCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.SaltBox,
    padding: moderateScale(15),
    flexDirection: "row",
    borderRadius: moderateScale(15),
    gap: moderateScale(10),
  },
  icon: {
    width: moderateScale(95),
    height: moderateScale(127),
    backgroundColor: colors.SurfCrest,
    borderRadius: moderateScale(15),
  },
  infoContainer: {
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: colors.SurfCrest,
    fontSize: textLabelSize?.titleFont,
    fontWeight: "bold",
    width: moderateScale(200),
  },
  subtitle: {
    color: colors.SurfCrest,
    fontSize: textScale(10),
    fontWeight: "400",
    width: moderateScale(200),
    marginTop: moderateScale(10),
  },
  scheduleItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(15),
  },
  scheduleIcon: {
    height: moderateScale(14),
    width: moderateScale(14),
    tintColor: colors.SurfCrest,
  },
  scheduleText: {
    color: colors.SurfCrest,
    fontSize: textScale(10),
    fontWeight: "400",
    marginLeft: moderateScale(7),
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: moderateScale(30),
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    height: moderateScale(35),
    width: "auto",
  },
  detailsText: {
    color: colors.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "500",
  },
  arrow: {
    height: moderateScale(26),
    width: moderateScale(26),
    position: "absolute",
    right: moderateScale(5),
  },

  cardContainer: {
    width: moderateScale(160),
    height: moderateScale(189),
    backgroundColor: colors.prussianBlue,
    borderRadius: moderateScale(15),
    alignItems: "center",
    paddingHorizontal: moderateScale(5),
  },
  imageContainer: {
    height: moderateScale(64),
    width: moderateScale(64),
    borderRadius: moderateScale(32),
    backgroundColor: colors.SurfCrest,
    alignItems: "center",
    justifyContent: "center",
    marginTop: moderateScale(15),
  },
  image: {
    height: moderateScale(62),
    width: moderateScale(62),
    borderRadius: moderateScale(32),
  },
  nameText: {
    color: colors.SurfCrest,
    fontWeight: "600",
    fontSize: textScale(14),
    marginTop: moderateScale(10),
  },
  followersText: {
    color: colors.SurfCrest,
    fontWeight: "400",
    fontSize: textScale(14),
    marginTop: moderateScale(3),
  },
  buttonContainer: {
    width: moderateScale(110),
    height: moderateScale(30),
    marginTop: moderateScale(15),
    backgroundColor: colors.transparent,
    borderColor: colors.SurfCrest,
    borderWidth: moderateScale(1),
  },
});
