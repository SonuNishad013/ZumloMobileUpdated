import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import StatusBarHeader from "../../Profile/Preferences/StatusBarHeader";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import allActions from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import CommonSearchBar from "../../../components/SearchBar/commonSearchBar";
import { strings } from "../../../constant/strings";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { imagePath } from "../../../assets/png/imagePath";
import AddMemberDetailsCard from "../CommunityComponents/AddMemberDetailsCard";
import navigationString from "../../../navigation/navigationString";
import CommonLoader from "../../../components/Loader";
import ToggleBar from "../CommunityTabs/ProfileTab/ToggleBar";
import appConstant, {
  STATUS_CODES,
  TOAST_STATUS,
} from "../../../constant/appConstant";
import { profileDetailsCommunity } from "../../../redux/selector";
import {
  COMPONENT_NAMES_ENUM,
  GROUP_STATUS,
  MEMBER_KEYS,
} from "../../../constant/ENUM";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";

interface Props {
  navigation?: any;
  route?: any;
}
const GroupAllMembers: React.FC<Props> = ({ navigation, route }) => {
  const memberDataCurrent = useSelector(profileDetailsCommunity());
  const dispatch: any = useDispatch();
  const {
    allMemberList,
    from,
    isAmMemberOfThisGroup,
    groupId,
    groupDetailsData,
  } = route.params;
  const [memberListData, setMemberListData] = useState<any>(
    allMemberList?.joinedMembers || []
  );
  const [filteredData, setFilteredData] = useState<any>([]);
  const [isAllLoading, setIsAllLoading] = useState(false);
  const [searchContainLength, setSearchContainLength] = useState(false);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });
  const toasterFunction = (code: any, message: any) => {
    setToasterDetails({
      showToast: true,
      code: code,
      message: message,
    });
  };

  useEffect(() => {
    from !== COMPONENT_NAMES_ENUM?.groupDetails && connectedUserList();
  }, []);

  const getGroupStatus = (item: any) => {
    if (selectedTab == 0) {
      if (item?.isAdmin) {
        return GROUP_STATUS?.Admin;
      } else {
        return GROUP_STATUS?.Joined;
      }
    } else if (selectedTab == 1) {
      return GROUP_STATUS?.JoinRequested;
    } else if (selectedTab == 2) {
      return GROUP_STATUS?.InvitationSent;
    } else if (selectedTab == 3) {
      return GROUP_STATUS?.Blocked;
    }
  };

  const renderMemberCard = ({ item }: any) => (
    <AddMemberDetailsCard
      userName={item?.aliasName || item?.name}
      status={getGroupStatus(item)}
      source={
        item?.aliasProfilePicture
          ? { uri: item?.aliasProfilePicture }
          : imagePath?.dummyProfileIcon
      }
      isSelector={false}
      onCardPress={() => {
        if (item?.memberId === memberDataCurrent?.id) {
          navigation?.navigate(navigationString?.Community);
        } else {
          navigation?.navigate(navigationString?.OtherSeekerProfile, {
            memberId: item?.memberId,
            item: item,
          });
        }
      }}
    />
  );

  const connectedUserList = async () => {
    setIsAllLoading(true);
    try {
      const response = await allActions.communitiesAction.connectedUserList(
        dispatch,
        {},
        API_FUN_NAMES?.connectedUserList
      );
      setIsAllLoading(false);
      if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
        setIsAllLoading(false);
        setMemberListData(allMemberList);
      } else {
        setIsAllLoading(false);
        toasterFunction(TOAST_STATUS?.ERROR, response?.message);
      }
    } catch (err: any) {
      setIsAllLoading(false);
      toasterFunction(TOAST_STATUS?.ERROR, err?.message);
    }
  };

  const handleSearch = (text: any) => {
    if (text?.length > 0) {
      setSearchContainLength(true);
    } else {
      setSearchContainLength(false);
    }
    const searchText = text?.toLowerCase();
    const filtered = memberListData?.filter((item: any) =>
      item?.aliasName?.toLowerCase()?.includes(searchText)
    );
    setFilteredData(filtered?.length > 0 && text ? filtered : []);
  };
  const [selectedTab, setSelectedTab] = useState<any>(0);
  useEffect(() => {
    setMemberListData([]);
    refreshData();
  }, [selectedTab, allMemberList]);

  const refreshData = () => {
    let queryParams = `?id=${groupId}&takeRecords=0`;
    allActions.communitiesAction
      .groupDetailsById(
        dispatch,
        {},
        API_FUN_NAMES?.groupDetailsById,
        queryParams
      )
      .then((response: any) => {
        if (response?.statusCode == 200) {
          const memberKeys = [
            MEMBER_KEYS?.joinedMembers,
            MEMBER_KEYS?.joinRequestMembers,
            MEMBER_KEYS?.invitedMembers,
            MEMBER_KEYS?.blockedMembers,
          ];

          const key = memberKeys[selectedTab] || MEMBER_KEYS?.joinedMembers;
          setMemberListData(response?.data?.members?.[key] || []);
        } else {
          setMemberListData([]);
        }
      })
      .catch((err: any) => {
        toasterFunction(TOAST_STATUS?.ERROR, err?.message);
      });
  };
  return (
    <ScreenWrapper statusBarColor={colors?.SaltBox}>
      <View style={styles?.container}>
        <StatusBarHeader
          headerName={strings?.All_members}
          navigation={navigation}
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
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            {groupDetailsData?.isCreatedGroup && (
              <ToggleBar
                data={
                  isAmMemberOfThisGroup
                    ? appConstant?.groupMemebersDetailsTab
                    : appConstant?.groupMemebersDetailsTabForuser
                }
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
            )}
            <FlatList
              data={searchContainLength ? filteredData : memberListData}
              keyExtractor={(item, index) => "key" + index}
              ListEmptyComponent={
                <View>
                  <Text style={styles.emptyListText}>
                    {filteredData?.length > 0
                      ? strings?.noDataFound
                      : strings?.noConnection}
                  </Text>
                </View>
              }
              scrollEnabled={false}
              style={styles.trendingFeedsList}
              contentContainerStyle={styles.trendingFeedsContent}
              renderItem={renderMemberCard}
            />
          </KeyboardAwareScrollView>
        )}
      </View>
      {toasterDetails?.showToast && (
        <ToastApiResponse
          data={toasterDetails}
          setToasterDetails={setToasterDetails}
          code={toasterDetails?.code}
          message={toasterDetails?.message}
        />
      )}
    </ScreenWrapper>
  );
};

export default GroupAllMembers;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors?.SurfCrest,
    flex: 1,
  },
  trendingFeedsList: {
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(20),
  },
  trendingFeedsContent: {
    gap: moderateScale(10),
  },
  searchBarContainer: {
    marginTop: moderateScale(10),
    marginHorizontal: moderateScale(19),
    borderRadius: moderateScale(35),
    height: moderateScale(45),
    marginBottom: moderateScale(10),
  },
  textInputStyle: {
    flex: 1,
  },
  emptyListText: {
    fontWeight: "600",
    fontSize: textScale(24),
    color: colors?.prussianBlue,
    alignSelf: "center",
    marginTop: moderateScale(200),
  },
});
