import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import CommonHeader from "../../../components/Header/commonHeader";
import {
  height,
  moderateScale,
  textScale,
} from "../../../constant/responsiveStyle";
import CommunityPicture from "../AddAnonymousName/CommunityPicture";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../../redux/actions";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import { strings } from "../../../constant/strings";
import CommonButton from "../../../components/Buttons/commonButton";
import FeedsListing from "../CommunityTabs/HomeTab/FeedsListing";
import navigationString from "../../../navigation/navigationString";
import * as AsyncStorageUtils from "../../../utils/Storage/AsyncStorage";
import { profileDetailsCommunity } from "../../../redux/selector";
import DeviceInfo from "react-native-device-info";
import MainGroupCard from "../CommunityComponents/MainGroupCard";
import { getGroupActionTextSmall } from "../../../helper/CommunityHelper";
import TitleSideLine from "../CommunityComponents/TitleSideLine";
import { GrpNoData } from "../../../assets";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import { STATUS_CODES, TOAST_STATUS } from "../../../constant/appConstant";
import { COMPONENT_NAMES_ENUM } from "../../../constant/ENUM";
import { useFocusEffect } from "@react-navigation/native";

interface Props {
  navigation?: any;
  route?: any;
}
const OtherSeekerProfile: React.FC<Props> = ({ navigation, route }) => {
  const dispatch: any = useDispatch();
  const { memberId } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [memberData, setMemberData] = useState<any>({});
  const [allFeeds, setAllFeeds] = useState([]);
  const [publicGroup, setPublicGroup] = useState<any>([]);
  const [userToken, setuserToken] = useState<any>();
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  const memberDataCurrent = useSelector(profileDetailsCommunity());
  const [userData, setuserData] = useState<any>();
  const toasterFunction = (code: any, message: any) => {
    setToasterDetails({
      showToast: true,
      code: code,
      message: message,
    });
  };
  const [deviceID, setDeviceID] = useState("");
  useEffect(() => {
    async function fetchData() {
      const response = await DeviceInfo.getUniqueId();
      setDeviceID(response);
    }
    fetchData();
  }, []);
  useEffect(() => {
    isUserLoginToken();
    getUserTokenn();
  }, [memberId]);
  useFocusEffect(
    useCallback(() => {
      userProfileById();
    }, [])
  );
  const isUserLoginToken = async () => {
    let loginUserData = await AsyncStorageUtils.getItem(
      AsyncStorageUtils.LOGIN_USER_DATA
    );
    if (loginUserData !== null) {
      setuserData(JSON.parse(loginUserData));
    }
  };
  const getUserTokenn = async () => {
    let bearerToken = await AsyncStorageUtils.getItem(
      AsyncStorageUtils.ACCESS_TOKEN
    );
    setuserToken(bearerToken);
  };

  const userProfileById = () => {
    let queryParams = `?id=${memberId}`;
    allActions?.communitiesAction
      .userProfileById(
        dispatch,
        {},
        API_FUN_NAMES?.userProfileById,
        queryParams
      )
      .then((response: any) => {
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          setMemberData(response?.data);
          setAllFeeds(response?.data?.feeds);
          setPublicGroup(
            response?.data?.groups?.filter(
              (item: any) => !item?.isLoggedInMemberBlocked
            )
          );
        } else {
          toasterFunction(TOAST_STATUS?.ERROR, response?.message);
          navigation?.goBack();
        }
      })
      .catch((err) => {
        toasterFunction(TOAST_STATUS?.ERROR, err?.message);
      });
  };

  const updatedData = () => {
    let update = { ...memberData, isConnectionRequestSent: true };
    return update;
  };
  const createConnection = () => {
    setIsLoading(true);
    let requestBody = {
      connectedMemberId: memberId,
    };
    allActions?.communitiesAction
      .createConnection(dispatch, requestBody, API_FUN_NAMES?.createConnection)
      .then((response: any) => {
        setIsLoading(false);
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          setMemberData(updatedData);
          toasterFunction(TOAST_STATUS?.SUCCESS, response?.message);
        } else {
          toasterFunction(TOAST_STATUS?.ERROR, response?.message);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        toasterFunction(TOAST_STATUS?.ERROR, err?.message);
      });
  };

  const onChatIcon = async () => {
    if (userData && deviceID) {
      navigation.navigate(navigationString.CommunityChat, {
        userData: userData,
        userToken_: userToken,
        currentId_: memberDataCurrent?.id,
        deviceID: deviceID,
        memberData_: memberData,
      });
    }
  };

  return (
    <ScreenWrapper statusBarColor={colors?.prussianBlue}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <CommonHeader
            onBackPress={() => {
              navigation.goBack();
            }}
            headerName={strings?.profile}
            iconContainer={styles.iconContainer}
            textStyle={styles.headerTextStyle}
            mainContainer={styles.mainContainer}
            isChatIcon={memberData?.isConnection}
            onChat={onChatIcon}
          />
          <View style={styles.profileContainer}>
            <CommunityPicture
              source={{
                uri: memberData?.aliasProfilePicture,
              }}
              activeOpacity={1}
              categoryItem={styles.communityPictureStyle}
            />
            <View style={styles.profileDetailsContainer}>
              <Text style={styles.profileName}>{memberData?.aliasName}</Text>
            </View>
          </View>
        </View>

        <ScrollView
          style={styles.flexPass}
          contentContainerStyle={styles?.providePaddingBottom}
        >
          {publicGroup?.length === 0 && allFeeds?.length === 0 && (
            <View style={styles?.noGroupView}>
              <GrpNoData />
              <Text style={styles?.noFeedText}>
                {strings?.No_group_or_feeds}
              </Text>
              <Text style={styles?.detailText}>
                {strings?.To_add_feeds_in_your_profile}
              </Text>
            </View>
          )}
          <FlatList
            data={publicGroup}
            style={styles.suggestedGroupsList}
            keyExtractor={(item, index) => "key" + index}
            contentContainerStyle={styles.suggestedGroupsContent}
            renderItem={({ item, index }: any) => (
              <MainGroupCard
                dispatch={dispatch}
                id={item?.id}
                index={index}
                isJoinedGroup={item?.isJoinedGroup}
                isJoinRequestSent={item?.isJoinRequestSent}
                toasterFunction={toasterFunction}
                name={item?.name}
                groupPrivacy={item?.groupPrivacy}
                description={item?.description}
                source={item?.profilePicture}
                memberCount={item?.joinedMemberCount}
                navigation={navigation}
                mainContainer={{
                  marginLeft:
                    index === 0 ? moderateScale(15) : moderateScale(0),
                  marginRight: moderateScale(0),
                }}
                status={getGroupActionTextSmall(item)}
                updateStatus={(status: any) => {
                  if (status?.length) {
                    userProfileById();
                  }
                }}
                IsAdmin={route.params?.item?.isAdmin}
                item={item}
              />
            )}
            ListHeaderComponent={
              publicGroup?.length > 0 && (
                <TitleSideLine
                  titleText={styles.titleText}
                  container={styles.titleContainer}
                  title={strings?.Group}
                />
              )
            }
            ListFooterComponent={
              allFeeds?.length > 0 && (
                <TitleSideLine
                  titleText={styles.titleText}
                  container={styles.titleContainer}
                  title={strings?.Feeds}
                />
              )
            }
          />
          <FeedsListing
            allFeeds={allFeeds}
            navigation={navigation}
            setAllFeeds={setAllFeeds}
            toasterFunction={toasterFunction}
            whereFrom={COMPONENT_NAMES_ENUM?.OtherSeekerProfile}
            postReShared={() => {}}
            managePagination={() => {}}
          />
        </ScrollView>
        <CommonButton
          btnName={
            memberData?.isConnection
              ? strings?.Connected
              : memberData?.isConnectionRequestSent
              ? strings?.Requested
              : strings?.Connect
          }
          onPress={
            memberData?.isConnectionRequestSent ||
            memberData?.isConnection ||
            isLoading
              ? () => {} //if we get API for removing/withdrawal of join request sended.
              : createConnection //for creating connection
          }
          mainContainer={styles?.mainContainer_}
          isLoading={isLoading}
        />
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

export default OtherSeekerProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.SurfCrest,
  },
  providePaddingBottom: {
    paddingBottom: moderateScale(20),
  },
  mainContainer_: {
    alignSelf: "center",
    marginBottom: moderateScale(20),
  },
  flexPass: {
    flex: 1,
  },
  container2: {
    flex: 1,
    backgroundColor: "green",
    justifyContent: "center",
  },
  noFeedText: {
    alignItems: "center",
    textAlign: "center",
    fontSize: textScale(16),
    color: colors?.prussianBlue,
    marginTop: moderateScale(5),
  },
  detailText: {
    fontSize: textScale(12),
    color: colors?.lightprussianBlue,
    marginTop: moderateScale(5),
    textAlign: "center",
  },
  noGroupView: {
    justifyContent: "center",
    alignItems: "center",
    height: height / 2,
    marginHorizontal: moderateScale(25),
  },
  headerContainer: {
    backgroundColor: colors?.prussianBlue,
    height: moderateScale(230),
    paddingTop: moderateScale(15),
    borderBottomLeftRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(30),
    paddingHorizontal: moderateScale(19),
  },
  iconContainer: {
    backgroundColor: colors?.saltOpLight2,
  },
  mainContainer: {
    marginHorizontal: moderateScale(0),
  },
  headerTextStyle: {
    color: colors?.SurfCrest,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(30),
  },
  communityPictureStyle: {
    borderStyle: "solid",
    height: moderateScale(120),
    width: moderateScale(120),
    borderRadius: moderateScale(130),
  },
  profileDetailsContainer: {
    gap: moderateScale(5),
    marginLeft: moderateScale(15),
  },
  profileName: {
    fontSize: textScale(24),
    fontWeight: "700",
    color: colors?.SurfCrest,
  },
  profileAlias: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.SurfCrest,
  },
  suggestedGroupsHeader: {
    marginHorizontal: moderateScale(19),
  },
  suggestedGroupsList: {
    marginTop: moderateScale(5),
  },
  suggestedGroupsContent: {
    gap: moderateScale(15),
    paddingHorizontal: moderateScale(19),
  },
  titleText: {
    fontWeight: "400",
    fontSize: textScale(14),
  },
  titleContainer: {
    marginTop: moderateScale(30),
  },
});
