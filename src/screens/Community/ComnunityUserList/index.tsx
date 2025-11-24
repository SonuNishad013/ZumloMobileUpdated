import { FlatList, StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import StatusBarHeader from "../../Profile/Preferences/StatusBarHeader";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import CommonSearchBar from "../../../components/SearchBar/commonSearchBar";
import { strings } from "../../../constant/strings";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { imagePath } from "../../../assets/png/imagePath";
import AddMemberDetailsCard from "../CommunityComponents/AddMemberDetailsCard";
import navigationString from "../../../navigation/navigationString";
import CommonLoader from "../../../components/Loader";
import { useIsFocused } from "@react-navigation/native";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import { STATUS_CODES, TOAST_STATUS } from "../../../constant/appConstant";

interface Props {
  navigation?: any;
}
const ConnectionList: React.FC<Props> = ({ navigation }) => {
  const dispatch: any = useDispatch();
  const isFocused = useIsFocused();
  const [memberListData, setMemberListData] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [isAllLoading, setIsAllLoading] = useState(false);
  const [isSearchEmpty, setIsSearchEmpty] = useState(true);
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
  }, [isFocused]);

  const getGroupStatus = (item: any) => {
    if (item?.isConnection) return strings?.Connection;
    if (item?.isConnectionRequestSent) return strings?.joinReqestSend;
    return strings?.Not_connection;
  };

  const renderMemberCard = ({ item }: any) => (
    <AddMemberDetailsCard
      userName={item?.aliasName}
      status={getGroupStatus(item)}
      source={
        item?.aliasProfilePicture
          ? { uri: item?.aliasProfilePicture }
          : imagePath?.dummyProfileIcon
      }
      isSelector={false}
      onCardPress={() => {
        navigation?.navigate(navigationString?.OtherSeekerProfile, {
          memberId: item?.id,
        });
      }}
    />
  );

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

  const handleSearch = (text: string) => {
    const searchText = text?.toLowerCase();
    if (searchText?.length === 0) {
      setIsSearchEmpty(true);
    } else {
      setIsSearchEmpty(false);
    }
    const filtered = memberListData?.filter((item: any) =>
      item?.aliasName?.toLowerCase()?.includes(searchText)
    );
    setFilteredData(filtered?.length > 0 && text ? filtered : []);
  };

  return (
    <ScreenWrapper statusBarColor={colors?.SaltBox}>
      <View style={styles?.conatiner}>
        <StatusBarHeader
          headerName={strings?.Community_users}
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
            <FlatList
              data={!isSearchEmpty ? filteredData : memberListData}
              scrollEnabled={false}
              style={styles.trendingFeedsList}
              keyExtractor={(item, index) => "key" + index}
              contentContainerStyle={styles.trendingFeedsContent}
              renderItem={renderMemberCard}
              ListEmptyComponent={
                <View style={styles?.noDataView}>
                  <Text style={{ color: colors?.prussianBlue }}>
                    {strings?.noDataFound}
                  </Text>
                </View>
              }
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

export default ConnectionList;
const styles = StyleSheet.create({
  conatiner: {
    backgroundColor: colors?.SurfCrest,
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
  noDataView: {
    alignItems: "center",
    marginTop: moderateScale(150),
  },
});
