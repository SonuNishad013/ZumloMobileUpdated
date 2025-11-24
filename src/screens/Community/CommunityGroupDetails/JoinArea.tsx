import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import CommonFlexButton from "../../../components/Buttons/CommonFlexButton";
import colors from "../../../constant/colors";
import { strings } from "../../../constant/strings";
import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import { groupPrivacyType } from "../../../constant/CommunityConstant";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import { STATUS_CODES, TOAST_STATUS } from "../../../constant/appConstant";

interface Props {
  id?: any;
  toasterFunction?: any;
  isJoinedGroup?: any;
  groupPrivacy?: any;
  setIsJoinedGroup?: any;
  setIsJoinRequestSent?: any;
  isJoinRequestSent?: any;
  isLoggedInMemberBlocked?: boolean;
}
const JoinArea: React.FC<Props> = ({
  id,
  toasterFunction,
  isJoinedGroup,
  groupPrivacy,
  setIsJoinedGroup,
  setIsJoinRequestSent,
  isJoinRequestSent,
  isLoggedInMemberBlocked,
}) => {
  const dispatch: any = useDispatch();
  const joinGroup = () => {
    let requestbody = {
      groupId: id,
    };
    allActions.communitiesAction
      .joinGroup(dispatch, requestbody, API_FUN_NAMES?.joinGroup)
      .then((response: any) => {
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          if (groupPrivacy == groupPrivacyType?.public && !isJoinedGroup) {
            setIsJoinedGroup(true);
            setIsJoinRequestSent(false);
          } else {
            setIsJoinRequestSent(true);
            setIsJoinedGroup(false);
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
          setIsJoinedGroup(false);
          setIsJoinRequestSent(false);
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
          setIsJoinedGroup(false);
          setIsJoinRequestSent(false);
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
    if (isLoggedInMemberBlocked) {
      return;
    } else if (groupPrivacy == groupPrivacyType?.public && !isJoinedGroup) {
      joinGroup();
    } else if (isJoinedGroup) {
      leaveGroup();
    } else if (isJoinRequestSent) {
      removeJoinRequest();
    } else {
      joinGroup();
    }
  };
  const getGroupAction = (
    isJoinRequestSent: boolean,
    isJoinedGroup: boolean
  ) => {
    if (isLoggedInMemberBlocked) {
      return { text: strings?.blocked, color: colors?.red };
    }
    if (isJoinedGroup) {
      return { text: strings?.leaveGroup, color: colors?.red };
    }
    if (isJoinRequestSent) {
      return { text: strings?.joinReqestSend, color: colors?.prussianBlue };
    }
    return { text: strings?.joinGroup, color: colors?.polishedPine };
  };
  return (
    <View style={styles.container}>
      <View style={[styles.header]}>
        <Text style={styles.title}>{strings?.howToStart}</Text>
        <CommonFlexButton
          btnName={getGroupAction(isJoinRequestSent, isJoinedGroup)?.text}
          onPress={onJoinPress}
          buttonContainer={{
            backgrounColor: getGroupAction(isJoinRequestSent, isJoinedGroup)
              ?.color,
          }}
          isDisable={isLoggedInMemberBlocked === true}
        />
      </View>
      <Text style={styles.description}>{strings?.dummyText}</Text>
      <Text style={styles.subtitle}>{strings?.LetPresent}</Text>
      <Text style={styles.description}>{strings?.dummyText}</Text>
    </View>
  );
};

export default JoinArea;

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(30),
    marginHorizontal: moderateScale(19),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: textScale(24),
    fontWeight: "700",
    color: colors?.prussianBlue,
  },
  subtitle: {
    fontSize: textScale(24),
    fontWeight: "700",
    color: colors?.prussianBlue,
    marginTop: moderateScale(30),
  },
  description: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors?.prussianBlue,
    marginTop: moderateScale(10),
  },
});
