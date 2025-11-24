import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import AddMemberDetailsCard from "../CommunityComponents/AddMemberDetailsCard";
import CommonLoader from "../../../components/Loader";
import CommonSearchBar from "../../../components/SearchBar/commonSearchBar";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import { multiSelectedByUserId } from "../../../constant/CustomHook/CommonFunctions";
import colors from "../../../constant/colors";
import { strings } from "../../../constant/strings";
import { styles } from "./styles";
import allActions from "../../../redux/actions";
import { imagePath } from "../../../assets/png/imagePath";
import { getSelectedGroupMembers } from "../../../redux/selector";
import { mergeArraysGroupSelected } from "../../../helper/CommunityHelper";
import navigationString from "../../../navigation/navigationString";
import CommunityHeaderNotificationMessage from "../../../components/Header/CommunityHeaderNotificationMassage";
import { fromNav } from "../../../constant/CommunityConstant";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import { STATUS_CODES, TOAST_STATUS } from "../../../constant/appConstant";
import logger from "../../../constant/logger";

interface Props {
  navigation?: any;
  route?: any;
}
const AddMembersInGroup: React.FC<Props> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { from, groupId } = route.params;
  const [memberListData, setMemberListData] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [selectedMembers, setSelectedMembers] = useState(0);
  const [isAllLoading, setIsAllLoading] = useState(false);

  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });
  const selectedMembersSaved = useSelector(getSelectedGroupMembers());

  const toasterFunction = (code: any, message: any) => {
    setToasterDetails({
      showToast: true,
      code: code,
      message: message,
    });
  };
  useEffect(() => {
    setSelectedMembers(
      memberListData?.filter((item: any) => item?.isSelected)?.length
    );
  }, [memberListData]);

  useEffect(() => {
    if (from == fromNav?.groupDetailsRemoveMembers) {
      membersByGroupId();
    } else {
      communityUserList();
    }
  }, []);

  const getFrom = () => {
    if ([fromNav?.individual_Feed, fromNav?.create_Group]?.includes(from)) {
      return 0;
    } else {
      return groupId;
    }
  };

  const membersByGroupId = async () => {
    setIsAllLoading(true);
    let queryParams = `/${groupId}`;
    try {
      const response = await allActions.communitiesAction.membersByGroupId(
        dispatch,
        {},
        API_FUN_NAMES?.communityUserList,
        queryParams
      );
      setIsAllLoading(false);
      if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
        setIsAllLoading(false);
        updateSelectedSeeker(
          mergeArraysGroupSelected(selectedMembersSaved, response?.data)
        );
      } else {
        setIsAllLoading(false);
        handleToaster(response?.message);
      }
    } catch (err: any) {
      setIsAllLoading(false);
      handleToaster(err?.message);
    }
  };

  const communityUserList = async () => {
    setIsAllLoading(true);
    let requestBody = {
      groupId: getFrom(),
    };
    try {
      const response = await allActions.communitiesAction.communityUserList(
        dispatch,
        requestBody,
        API_FUN_NAMES?.communityUserList
      );
      setIsAllLoading(false);
      if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
        setIsAllLoading(false);
        updateSelectedSeeker(
          mergeArraysGroupSelected(selectedMembersSaved, response?.data?.list)
        );
      } else {
        setIsAllLoading(false);
        handleToaster(response?.message);
      }
    } catch (err: any) {
      setIsAllLoading(false);
      handleToaster(err?.message);
    }
  };

  const handleToaster = (message: any) => {
    setToasterDetails({ showToast: true, code: TOAST_STATUS?.ERROR, message });
  };

  const updateSelectedSeeker = (data: any) => {
    const sortedData = [
      ...data
        .filter((item: any) => item?.isSelected)
        .sort((a: any, b: any) => a?.aliasName?.localeCompare(b?.aliasName)),
      ...data
        .filter((item: any) => !item?.isSelected)
        .sort((a: any, b: any) => a?.aliasName?.localeCompare(b?.aliasName)),
    ];
    setMemberListData(sortedData);
  };

  const handleSearch = (text: any) => {
    const searchText = text?.toLowerCase();
    const filtered = memberListData?.filter((item: any) =>
      item?.aliasName?.toLowerCase()?.includes(searchText)
    );
    setFilteredData(filtered?.length > 0 && text ? filtered : []);
  };

  const renderMemberCard = ({ item }: any) => (
    <AddMemberDetailsCard
      userName={item?.aliasName}
      isStatus={false}
      source={
        item?.aliasProfilePicture
          ? { uri: item?.aliasProfilePicture }
          : imagePath?.dummyProfileIcon
      }
      checkButton={{
        backgroundColor: item?.isSelected
          ? colors?.polishedPine
          : colors?.transparent,
      }}
      checkIcon={{
        tintColor: item?.isSelected ? colors?.SurfCrest : colors?.transparent,
      }}
      onPress={() =>
        updateSelectedSeeker(
          multiSelectedByUserId(memberListData, item?.userId)
        )
      }
      onCardPress={() => {
        navigation?.navigate(navigationString?.OtherSeekerProfile, {
          memberId: item?.id,
        });
      }}
    />
  );

  const addGroupMembers = () => {
    setIsAllLoading(true);
    let requestbody = {
      memberIds: memberListData
        ?.filter((itm: any) => itm?.isSelected)
        ?.map((item: any) => {
          return item?.id;
        }),
      groupId: groupId,
    };
    allActions?.communitiesAction
      .addGroupMembers(dispatch, requestbody, API_FUN_NAMES?.addGroupMembers)
      .then(async (response: any) => {
        setIsAllLoading(false);
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          toasterFunction(TOAST_STATUS?.SUCCESS, response?.message);
          allActions?.communitiesAction?.groupSelectedMembers(dispatch, []);
          navigation.goBack();
        } else {
          toasterFunction(TOAST_STATUS?.ERROR, response?.message);
        }
      })
      .catch((err) => {
        setIsAllLoading(false);
        toasterFunction(TOAST_STATUS?.ERROR, err?.message);
      });
  };

  const removeGroupMembers = () => {
    setIsAllLoading(true);
    let requestbody = {
      groupMemberIds: memberListData
        ?.filter((itm: any) => itm?.isSelected)
        ?.map((item: any) => {
          return item?.id;
        }),
      groupId: groupId,
    };

    allActions?.communitiesAction
      .removeGroupMembers(
        dispatch,
        requestbody,
        API_FUN_NAMES?.removeGroupMembers
      )
      .then(async (response: any) => {
        setIsAllLoading(false);
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          toasterFunction(TOAST_STATUS?.SUCCESS, response?.message);
          allActions?.communitiesAction?.groupSelectedMembers(dispatch, []);
          navigation.goBack();
        } else {
          toasterFunction(TOAST_STATUS?.ERROR, response?.message);
        }
      })
      .catch((err) => {
        setIsAllLoading(false);
        toasterFunction(0, err?.message);
      });
  };

  const headerName = () => {
    switch (from) {
      case fromNav?.individual_Feed:
        return strings?.tagMembers;
      case fromNav?.create_Group:
        return strings?.tagMembers;
      default:
        return strings.addMembers;
    }
  };

  return (
    <ScreenWrapper statusBarColor={colors.SaltBox}>
      <View style={styles.container}>
        <CommunityHeaderNotificationMessage
          headerName={headerName()}
          isBackIcon
          container={styles.headerContainer}
          textContainer={styles.headerTextContainer}
          mainContainer={styles.headerMainContainer}
          isNextIcon={!!selectedMembers}
          onNextPress={() => {
            if (from == fromNav?.groupDetailsAddMembers) {
              addGroupMembers();
            } else if (from == fromNav?.groupDetailsRemoveMembers) {
              removeGroupMembers();
            } else {
              allActions.communitiesAction?.groupSelectedMembers(
                dispatch,
                memberListData?.filter((itm: any) => itm?.isSelected)
              );
              navigation.goBack();
            }
          }}
          onBackPress={() => navigation.goBack()}
        />
        <CommonSearchBar
          placeholder={strings.search}
          onChangeText={handleSearch}
          mainContainer={styles.searchBarContainer}
          textInputStyle={styles.textInputStyle}
        />
        {isAllLoading ? (
          <CommonLoader />
        ) : (
          <FlatList
            keyExtractor={(item, index) => "key" + index}
            data={filteredData.length > 0 ? filteredData : memberListData}
            style={styles.flatList}
            contentContainerStyle={styles.flatListContent}
            ListEmptyComponent={
              <Text style={styles.emptyListText}>
                {strings?.noMembersAdded}
              </Text>
            }
            ListHeaderComponent={
              <View style={styles.listHeaderContainer}>
                {selectedMembers > 0 && (
                  <Text style={styles.selectedMembersText}>
                    {selectedMembers}
                  </Text>
                )}
                {memberListData?.length > 0 && (
                  <Text style={styles.selectedMembersInfoText}>
                    {selectedMembers
                      ? strings.selected
                      : strings.kindlySelectMembers}
                  </Text>
                )}
              </View>
            }
            renderItem={renderMemberCard}
          />
        )}
      </View>
      {toasterDetails.showToast && (
        <ToastApiResponse
          data={toasterDetails}
          setToasterDetails={setToasterDetails}
          code={toasterDetails.code}
          message={toasterDetails.message}
        />
      )}
    </ScreenWrapper>
  );
};

export default AddMembersInGroup;
