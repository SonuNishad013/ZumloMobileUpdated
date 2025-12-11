import React, {
  ReactElement,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { FlatList, View, BackHandler, TouchableOpacity } from "react-native";
import ScreenWrapper from "../../components/SafeArea/SafeAreaWrapper";
import colors from "../../constant/colors";
import { moderateScale } from "../../constant/responsiveStyle";
import UserInformation from "./userInfo";
import Account from "./Accounts";
import NotificationSetting from "./notificationSetting";
import OtherSetting from "./otherSetting";
import * as AsyncStorage from "../../utils/Storage/AsyncStorage";
import allActions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  accountDataList,
  notificationDataList,
  otherSettingDataList,
} from "../../constant/ProfileConstant";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import AiAnimatedButton from "../Dashboard/Planner/AiAnimatedButton";
import navigationString from "../../navigation/navigationString";
import { ChatWithAi } from "../../assets";
import * as AsyncStore from "../../utils/Storage/AsyncStorage";
import DeviceInfo from "react-native-device-info";
import { strings } from "../../constant/strings";
import JournalModal from "../MoodTracking/Journal/JournalModal";
import { aiProvider } from "../../constant/appConstant";
import { API_FUN_NAMES } from "../../constant/APIsFunctionNames";
import { getSeekerInfoRedux } from "../../redux/selector";

var subscriptionStatus: any = false;
const Profile: React.FC<{ navigation?: any }> = ({
  navigation,
}): ReactElement => {
  const focus: any = useIsFocused();
  const getseekerInfoRedux = useSelector(getSeekerInfoRedux());
  const [userData, setuserData] = useState<any>(getseekerInfoRedux);
  const [userLoginType, setUserLoginType] = useState<any>();
  const [userLoginResponeseData, setUserLoginResponeseData] = useState<any>();
  const [isOpen, setOpened] = useState<boolean>(false);
  const [userToken, setuserToken] = useState<any>();
  //user details and signal r connection
  const [DeviceID, setDeviceID] = useState("");
  const [list, setList] = useState<any>([]);
  const [showModal, setShowModal] = useState(false);
  const [moodJournalData, setMoodJournalData] = useState<any>({});

  useEffect(() => {
    const filterArray = accountDataList?.filter(
      (item: any) => item?.name != "Subscription and Plans"
    );
    if (
      getseekerInfoRedux?.basicInformation?.isBetaUser ||
      getseekerInfoRedux?.basicInformation?.isOrganizationSeeker
    ) {
      setList(filterArray);
    } else {
      setList(accountDataList);
    }
  }, [accountDataList]);
  useFocusEffect(
    useCallback(() => {
      setuserData(getseekerInfoRedux);
      async function fetchData() {
        const response = await DeviceInfo.getUniqueId();
        setDeviceID(response);
      }
      fetchData();
      isUserLoginToken();
      getUserToken();
    }, [getseekerInfoRedux])
  );

  // Fetch user details once on component mount

  const isUserLoginToken = async () => {
    let loginUserData = await AsyncStorage.getItem(
      AsyncStorage.LOGIN_USER_DATA
    );
    setUserLoginResponeseData(JSON.parse(loginUserData));
  };

  const getUserToken = async () => {
    let bearerToken = await AsyncStore.getItem(AsyncStore.ACCESS_TOKEN);
    setuserToken(bearerToken);
  };
  useFocusEffect(
    useCallback(() => {
      fetchMoodJournalingAPI();
      setOpened(false);
      return () => {
        setOpened(false);
      };
    }, [])
  );
  const fetchMoodJournalingAPI = async () => {
    try {
      let requestbody = {
        aiProvider: aiProvider?.MoodJournaling,
      };
      const response = await allActions.dashboardAction.getMoodJournaling(
        requestbody,
        API_FUN_NAMES?.MoodJournalAiQuestion
      );

      if (response?.statusCode === 200) {
        setMoodJournalData(response?.data);
      }
    } catch (err) {
      console.error("Error fetching dynamic prompting question:", err);
    }
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      strings?.hardwareBackPress,
      () => {
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);

  const memoizedDUserInfo = useMemo(
    () => <UserInformation UserInformationData={userData} />,
    [userData, getseekerInfoRedux]
  );
  const memoizedAccounts = useMemo(
    () => (
      <View style={{ marginTop: moderateScale(10) }}>
        {userLoginResponeseData && (
          <Account
            AccountData={list}
            navigation={navigation}
            userLoginType={userLoginType}
            userData={userData}
            seekerLoginType={userLoginResponeseData?.loginType}
          />
        )}
      </View>
    ),
    [accountDataList, userLoginResponeseData, userData]
  );
  const memoizedNotifications = useMemo(
    () => (
      <NotificationSetting NotificationSettingData={notificationDataList} />
    ),
    [notificationDataList]
  );
  const memoizedOther = useMemo(
    () => (
      <OtherSetting
        OtherSettingData={otherSettingDataList}
        navigation={navigation}
      />
    ),
    [otherSettingDataList]
  );

  return (
    <ScreenWrapper statusBarColor={colors.darkthemColor} isFlexNeeded={true}>
      <View style={{ backgroundColor: colors.SurfCrest, flex: 1 }}>
        <View style={{ backgroundColor: colors.SurfCrest }}>
          <FlatList
            bounces={false}
            data={["1"]}
            onScroll={() => setOpened(false)}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => "key" + index}
            decelerationRate={"fast"}
            snapToAlignment="start"
            renderItem={() => (
              <>
                {memoizedDUserInfo}
                {memoizedAccounts}
                {memoizedNotifications}
                {memoizedOther}
              </>
            )}
            contentContainerStyle={{
              paddingBottom: moderateScale(105),
              marginBottom: moderateScale(30),
            }}
          />
        </View>
      </View>
      <AiAnimatedButton
        isOpen={isOpen}
        setOpened={() => setOpened(!isOpen)}
        onPressMood={() =>
          navigation.navigate(navigationString.TrackEmo, {
            from: "profile",
            socketDetails: {
              DeviceID: DeviceID,
            },
          })
        }
        onMoodJournalingPress={() => setShowModal(true)}
      />
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          if (userData) {
            navigation.navigate(navigationString.ChatScreen, {
              userData: userData,
              from: "Profile",
              userTokenn: userToken,
            });
          }
        }}
        style={{
          position: "absolute",
          bottom: moderateScale(20),
          right: moderateScale(17),
          alignItems: "center",
          borderRadius: 100,
        }}
      >
        <ChatWithAi height={moderateScale(56)} width={moderateScale(57)} />
      </TouchableOpacity>
      <JournalModal
        navigation={navigation}
        visible={showModal}
        setShowModal={setShowModal}
        data={moodJournalData}
        isFrom={"Profile"}
      />
    </ScreenWrapper>
  );
};
export default Profile;
