import {} from "react-native";
import { useEffect, useRef, useState } from "react";
import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { fromNav } from "../../../constant/CommunityConstant";
import { community_Group_Invitation } from "../../../constant/notificationFormName";
import navigationString from "../../../navigation/navigationString";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import { STATUS_CODES, TOAST_STATUS } from "../../../constant/appConstant";
import { strings } from "../../../constant/strings";
import logger from "../../../constant/logger";

const useGroupDetailsHook = (groupId?: any, from?: any, navigation?: any) => {
  const dispatch: any = useDispatch();
  const isFocused = useIsFocused();
  const rbSheetRefMenu = useRef<any>(null);
  const [isJoinedGroup, setIsJoinedGroup] = useState<any>(false);
  const [isJoinRequestSent, setIsJoinRequestSent] = useState(false);
  const [allFeeds, setAllFeeds] = useState([]);
  const [isAllLoading, setIsAllLoading] = useState(true);
  const [isLoader, setIsLoader] = useState(true);
  const [groupDeatils, setGroupDeatils] = useState<any>({});
  const [groupList, setGroupList] = useState<any>([]);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  useEffect(() => {
    suggestedGroups();
    feedsByGroupId();
  }, [isFocused]);
  useEffect(() => {
    groupDetailsById();
  }, [isJoinedGroup, isJoinRequestSent, isFocused]);
  const toasterFunction = (code: any, message: any) => {
    setToasterDetails({
      showToast: true,
      code: code,
      message: message,
    });
  };
  const groupDetailsById = () => {
    if (isFirstTime) {
      setIsAllLoading(true);
    }
    let queryParams = `?id=${groupId}&takeRecords=0`;
    allActions.communitiesAction
      .groupDetailsById(
        dispatch,
        {},
        API_FUN_NAMES?.groupDetailsById,
        queryParams
      )
      .then((response: any) => {
        setIsLoader(false);
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          setGroupDeatils(response?.data);
          if (response?.data?.isJoinedGroup !== isJoinedGroup) {
            setIsJoinedGroup(!isJoinedGroup);
          }
          if (response?.data?.isJoinRequestSent !== isJoinRequestSent) {
            setIsJoinRequestSent(!isJoinRequestSent);
          }
          setIsAllLoading(false);
          setIsFirstTime(false);
        } else {
          toasterFunction(TOAST_STATUS?.ERROR, response?.message);
          setIsAllLoading(false);
        }
      })
      .catch((err: any) => {
        setIsLoader(false);
        toasterFunction(TOAST_STATUS?.ERROR, err?.message);
        setIsAllLoading(false);
      });
  };
  const feedsByGroupId = () => {
    let queryParams = `?groupId=${groupId}`;
    allActions.communitiesAction
      .feedsByGroupId(dispatch, {}, strings?.feedsByGroupId, queryParams)
      .then((response: any) => {
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          setAllFeeds(response?.data?.feedsList);
          setIsAllLoading(false);
        } else {
          setIsAllLoading(false);
        }
      })
      .catch((err: any) => {
        logger("error_err", err);
      });
  };
  const suggestedGroups = () => {
    let requestbody = {};
    allActions?.communitiesAction
      .suggestedGroups(dispatch, requestbody, API_FUN_NAMES?.suggestedGroups)
      .then(async (response: any) => {
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          setGroupList(
            response?.data?.reduce((acc: any[], item: any) => {
              if (item.id !== groupId && !item.isLoggedInMemberBlocked) {
                acc.push(item);
              }
              return acc;
            }, [])
          );
        }
      })
      .catch((err) => {
        toasterFunction(TOAST_STATUS?.ERROR, err?.message);
      });
  };

  const isBackPress = () => {
    if (from === fromNav?.create_Group) {
      navigation?.pop(2);
    } else if (from === community_Group_Invitation) {
      navigation?.navigate(navigationString?.Community);
    } else {
      navigation?.goBack();
    }
  };
  const deleteGroup = () => {
    let queryParams = `/${groupId}`;
    allActions.communitiesAction
      .deleteGroup(dispatch, {}, API_FUN_NAMES?.deleteGroup, queryParams)
      .then((response: any) => {
        setIsAllLoading(false);
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          toasterFunction(TOAST_STATUS?.SUCCESS, response?.message);
          isBackPress();
        } else {
          toasterFunction(TOAST_STATUS?.ERROR, response?.message);
        }
      })
      .catch((err: any) => {
        toasterFunction(TOAST_STATUS?.ERROR, err?.message);
      });
  };
  return {
    allFeeds,
    isAllLoading,
    groupDeatils,
    groupList,
    toasterDetails,
    rbSheetRefMenu,
    deleteGroup,
    isJoinedGroup,
    setIsJoinedGroup,
    isJoinRequestSent,
    setIsJoinRequestSent,
    isBackPress,
    setAllFeeds,
    dispatch,
    setGroupList,
    setToasterDetails,
    isLoader,
  };
};

export default useGroupDetailsHook;
