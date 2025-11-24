import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
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
import { SOCKET_FUN_NAME } from "../../../constant/APIsFunctionNames";
import { STATUS_CODES, TOAST_STATUS } from "../../../constant/appConstant";
import { useFocusEffect } from "@react-navigation/native";

interface Props {
  navigation?: any;
  route?: any;
}
const ConnectionList: React.FC<Props> = ({ navigation, route }) => {
  const dispatch: any = useDispatch();
  const { memberList } = route.params;
  const [memberListData, setMemberListData] = useState<any>(memberList);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [isAllLoading, setIsAllLoading] = useState(false);
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

  useFocusEffect(
    React.useCallback(() => {
      connectedUserList();
    }, [])
  );

  const getGroupStatus = (item: any) => {
    if (item?.isConnection) return strings?.Connection;
    if (item?.isConnectionRequestSent) return strings?.joinReqestSend;
    return strings?.Not_connection;
  };

  const renderMemberCard = ({ item }: any) => (
    <AddMemberDetailsCard
      userName={item?.aliasName}
      isStatus={false}
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

  const connectedUserList = async () => {
    setIsAllLoading(true);
    try {
      const response = await allActions.communitiesAction.connectedUserList(
        dispatch,
        {},
        SOCKET_FUN_NAME?.connectedUserList
      );
      setIsAllLoading(false);
      if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
        setIsAllLoading(false);
        setMemberListData(response?.data);
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
    const searchText = text?.toLowerCase();
    const filtered = memberListData?.filter((item: any) =>
      item?.aliasName?.toLowerCase()?.includes(searchText)
    );
    setFilteredData(filtered?.length > 0 && text ? filtered : []);
  };

  return (
    <ScreenWrapper statusBarColor={colors?.SaltBox}>
      <View
        style={{
          backgroundColor: colors?.SurfCrest,
          flex: 1,
        }}
      >
        <StatusBarHeader
          headerName={"Your connections"}
          navigation={navigation}
        />
        <View style={{ marginTop: moderateScale(20) }} />
        <CommonSearchBar
          placeholder={"Find someone"}
          onChangeText={handleSearch}
          mainContainer={styles.searchBarContainer}
          textInputStyle={styles.textInputStyle}
        />
        {isAllLoading ? (
          <CommonLoader />
        ) : (
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <FlatList
              data={filteredData?.length > 0 ? filteredData : memberListData}
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

export default ConnectionList;
const styles = StyleSheet.create({
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
