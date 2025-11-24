import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import StatusBarHeader from "../../Profile/Preferences/StatusBarHeader";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import MainGroupCard from "../CommunityComponents/MainGroupCard";
import { getGroupActionText } from "../../../helper/CommunityHelper";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import CommonSearchBar from "../../../components/SearchBar/commonSearchBar";
import { strings } from "../../../constant/strings";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import { STATUS_CODES, TOAST_STATUS } from "../../../constant/appConstant";

interface Props {
  navigation?: any;
}
const AllCommunityGroups: React.FC<Props> = ({ navigation }) => {
  const dispatch: any = useDispatch();
  const [groupList, setGroupList] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any>([]);
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
    suggestedGroups();
  }, []);
  const suggestedGroups = () => {
    allActions?.communitiesAction
      .suggestedGroups(dispatch, {}, API_FUN_NAMES?.suggestedGroups)
      .then(async (response: any) => {
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          setGroupList(
            response?.data?.filter(
              (item: any) => !item?.isLoggedInMemberBlocked
            )
          );
        } else {
          toasterFunction(TOAST_STATUS?.ERROR, response?.message);
        }
      })
      .catch((err) => {
        toasterFunction(TOAST_STATUS?.ERROR, err?.message);
      });
  };

  const handleSearch = (text: any) => {
    const searchText = text?.toLowerCase();
    const filtered = groupList?.filter((item: any) =>
      item?.name?.toLowerCase()?.includes(searchText)
    );
    setFilteredData(filtered?.length > 0 && text ? filtered : []);
  };

  return (
    <ScreenWrapper statusBarColor={colors?.SaltBox}>
      <View style={styles.container}>
        <StatusBarHeader
          headerName={strings?.suggestedGroups}
          navigation={navigation}
        />
        <CommonSearchBar
          placeholder={strings.search}
          onChangeText={handleSearch}
          mainContainer={styles.searchBarContainer}
          textInputStyle={styles.textInputStyle}
        />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={filteredData?.length > 0 ? filteredData : groupList}
            scrollEnabled={false}
            style={styles.trendingFeedsList}
            contentContainerStyle={styles.trendingFeedsContent}
            renderItem={({ item, index }) => {
              return (
                <MainGroupCard
                  dispatch={dispatch}
                  id={item?.id}
                  index={index}
                  groupList={groupList}
                  setGroupList={setGroupList}
                  isJoinedGroup={item?.isJoinedGroup}
                  isJoinRequestSent={item?.isJoinRequestSent}
                  toasterFunction={toasterFunction}
                  name={item?.name}
                  groupPrivacy={item?.groupPrivacy}
                  description={item?.description}
                  source={item?.profilePicture}
                  memberCount={item?.joinedMemberCount}
                  navigation={navigation}
                  status={getGroupActionText(item)}
                  card={{
                    backgroundColor:
                      index % 2 == 0 ? colors?.SaltBox : colors?.polishedPine,
                  }}
                />
              );
            }}
          />
        </KeyboardAwareScrollView>
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

export default AllCommunityGroups;
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
