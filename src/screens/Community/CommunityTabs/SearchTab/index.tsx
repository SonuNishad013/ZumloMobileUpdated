import { FlatList, StyleSheet, View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { strings } from "../../../../constant/strings";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import CommonSearchBar from "../../../../components/SearchBar/commonSearchBar";
import navigationString from "../../../../navigation/navigationString";
import CommonButton from "../../../../components/Buttons/commonButton";
import allActions from "../../../../redux/actions";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import CommonLoader from "../../../../components/Loader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AddMemberDetailsCard from "../../CommunityComponents/AddMemberDetailsCard";
import { imagePath } from "../../../../assets/png/imagePath";
import ToastApiResponse from "../../../../components/Toast/ToastApiResponse";
import colors from "../../../../constant/colors";
import { profileDetailsCommunity } from "../../../../redux/selector";
import MainGroupCard from "../../CommunityComponents/MainGroupCard";
import { getGroupActionText } from "../../../../helper/CommunityHelper";
import { API_FUN_NAMES } from "../../../../constant/APIsFunctionNames";
import { STATUS_CODES, TOAST_STATUS } from "../../../../constant/appConstant";
import { CHAT, ENTITY_TYPE } from "../../../../constant/ENUM";

interface Props {
  navigation?: any;
  setCommunityTab: (val: number) => void;
  sendtrigger?: any;
}
const SearchTab: React.FC<Props> = ({
  navigation,
  setCommunityTab,
  sendtrigger,
}) => {
  const isFocused = useIsFocused();
  const dispatch: any = useDispatch();
  const memberDataCurrent = useSelector(profileDetailsCommunity());
  const [searchedText, setSearchedText] = useState<string>("");
  const [isSearchedResultEmpty, setIsSearchedResultEmpty] = useState(false);
  const [searchedData, setSearchedData] = useState<any>([]);
  const [isAllLoading, setIsAllLoading] = useState(false);
  const [memberListData, setMemberListData] = useState<any>([]);
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
    communityUserList();
    sendtrigger();
  }, [isFocused]);

  const communityUserList = async () => {
    setIsAllLoading(true);
    let requestBody = {
      groupId: 0,
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
        setMemberListData(response?.data?.list);
      } else {
        setIsAllLoading(false);
        toasterFunction(TOAST_STATUS?.ERROR, response?.message);
      }
    } catch (err: any) {
      setIsAllLoading(false);
      toasterFunction(TOAST_STATUS?.ERROR, err?.message);
    }
  };
  const searchAny = async (searchedText: string) => {
    if (!searchedText.trim().length) {
      setSearchedData([]);
      return;
    }
    setIsAllLoading(true);
    try {
      const response = await allActions.communitiesAction.SearchAny(
        dispatch,
        null,
        API_FUN_NAMES?.searchAny,
        searchedText
      );
      setIsAllLoading(false);
      if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
        if (!Array.isArray(response?.data)) {
          setIsSearchedResultEmpty(true);
          setSearchedData([]);
        } else {
          setSearchedData(
            response?.data.filter((item: any) => !item?.isLoggedInMemberBlocked)
          );
        }

        setIsAllLoading(false);
      } else {
        setIsAllLoading(false);
        toasterFunction(TOAST_STATUS?.ERROR, response?.message);
      }
    } catch (err: any) {
      setIsAllLoading(false);
      toasterFunction(TOAST_STATUS?.ERROR, err?.message);
    }
  };

  const getConnectionStatus = (item: any) => {
    if (item?.isConnection) return strings?.Connection;
    if (item?.isConnectionRequestSent) return strings?.joinReqestSend;
    if (item?.isConnectionRequestReceived)
      return strings?.Connection_request_received;
    if (memberDataCurrent?.id === item?.entityId) return CHAT?.You;
    return strings?.Not_connected;
  };
  const renderMemberCard = ({ item, index }: any) => {
    return (
      <>
        {item?.entityType === ENTITY_TYPE?.group && (
          <MainGroupCard
            dispatch={dispatch}
            id={item?.entityId}
            index={index}
            isJoinedGroup={item?.isJoinedGroup}
            isJoinRequestSent={item?.isConnectionRequestSent}
            toasterFunction={toasterFunction}
            name={item?.entityName}
            groupPrivacy={item?.groupPrivacy}
            description={item?.entityDescription}
            source={item?.entityPicture}
            memberCount={item?.memberCount} //changed from memberCount to joinedMemberCount
            navigation={navigation}
            status={getGroupActionText(item)}
            card={{
              backgroundColor:
                index % 2 == 0 ? colors?.SaltBox : colors?.polishedPine,
            }}
            isSearched={true}
          />
        )}
        {item?.entityType === ENTITY_TYPE?.Community_user && (
          <AddMemberDetailsCard
            userName={item?.entityName}
            status={getConnectionStatus(item)}
            source={
              item?.entityPicture
                ? { uri: item?.entityPicture }
                : imagePath?.dummyProfileIcon
            }
            isSelector={false}
            onCardPress={() => {
              if (item?.entityType == "Group") {
                navigation?.navigate(navigationString?.CommunityGroupDetails, {
                  groupId: item?.entityId,
                });
              } else {
                if (memberDataCurrent?.id === item?.entityId) {
                  setCommunityTab(2);
                } else {
                  navigation?.navigate(navigationString?.OtherSeekerProfile, {
                    memberId: item?.entityId,
                  });
                }
              }
            }}
          />
        )}
      </>
    );
  };
  const handleSearch = (text: any) => {
    if (text?.length === 0) {
      setIsSearchedResultEmpty(false);
      setSearchedText("");
      setSearchedData([]);
      return;
    }
    const searchText = text?.toLowerCase();

    setSearchedText(searchText);
    searchAny(text?.toLowerCase());
  };
  const renderListFooter = () => {
    return (
      <View style={styles?.addMarginHorizontal}>
        <View style={styles?.centerView}>
          <Text style={styles.or_text}>{strings?.Or}</Text>
        </View>

        <CommonButton
          mainContainer={styles?.commonButtonContainer}
          onPress={() =>
            navigation?.navigate(navigationString?.ComnunityUserList)
          }
          btnName={"See everyone here"}
        />
      </View>
    );
  };
  return (
    <View>
      <CommonSearchBar
        placeholder={"Find someone in the community..."}
        onChangeText={handleSearch}
        mainContainer={styles.searchBarContainer}
        textInputStyle={styles.textInputStyle}
      />
      {isAllLoading ? (
        <View style={styles?.addTop}>
          <CommonLoader />
        </View>
      ) : (
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={searchedText.length == 0 ? [] : searchedData}
            keyExtractor={(item, index) => "key" + index}
            scrollEnabled={false}
            style={styles.trendingFeedsList}
            contentContainerStyle={styles.trendingFeedsContent}
            renderItem={renderMemberCard}
            ListEmptyComponent={
              <View>
                <Text style={styles?.noDataText}>
                  {!isSearchedResultEmpty ? "" : strings?.noDataFound}
                </Text>
              </View>
            }
            ListHeaderComponent={renderListFooter}
          />
        </KeyboardAwareScrollView>
      )}

      {toasterDetails?.showToast && (
        <ToastApiResponse
          data={toasterDetails}
          setToasterDetails={setToasterDetails}
          code={toasterDetails?.code}
          message={toasterDetails?.message}
        />
      )}
    </View>
  );
};

export default SearchTab;

const styles = StyleSheet.create({
  searchBarContainer: {
    marginTop: moderateScale(0),
    marginHorizontal: moderateScale(19),
    borderRadius: moderateScale(35),
    height: moderateScale(45),
    marginBottom: moderateScale(10),
  },
  textInputStyle: {
    flex: 1,
  },
  trendingFeedsList: {
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(20),
  },
  trendingFeedsContent: {
    gap: moderateScale(10),
    paddingBottom: moderateScale(50),
  },
  addMarginHorizontal: {
    marginHorizontal: moderateScale(-15),
  },
  centerView: {
    alignItems: "center",
  },
  or_text: {
    color: colors?.prussianBlue,
    fontSize: textScale(14),
    fontWeight: "500",
  },
  commonButtonContainer: {
    width: "92%",
    alignSelf: "center",
    marginTop: moderateScale(15),
  },
  addTop: {
    marginTop: moderateScale(150),
    justifyContent: "center",
  },
  noDataText: {
    fontSize: moderateScale(16),
    textAlign: "center",
    marginTop: moderateScale(20),
    color: colors?.prussianBlue,
  },
});
