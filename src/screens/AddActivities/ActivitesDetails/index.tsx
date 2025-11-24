import { Alert, ScrollView, Text, View } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import CommonHeader from "../../../components/Header/commonHeader";
import { strings } from "../../../constant/strings";
import navigationString from "../../../navigation/navigationString";
import {
  ActivityInfo,
  BottomButtons,
  Card,
  RecentActivites,
  Recommendations,
} from "./RenderUI";
import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import CommonLoader from "../../../components/Loader";
import styles from "./styles";
import moment from "moment";
import { formatSentenceCase } from "../../../helper/sentenceCase";
import { event } from "../../../navigation/emitter";
import * as AsyncStorageUtils from "../../../utils/Storage/AsyncStorage";
import { YYYY_MM_DD } from "../../../constant/dateFormatConstants";
import { PieChart } from "react-native-gifted-charts";
import {
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import * as AsyncStore from "../../../utils/Storage/AsyncStorage";
import useDynamicPromptingHub from "../../../components/Hooks/getSignalRConnectionETL";
import DeviceInfo from "react-native-device-info";
import {
  GetUserActivityAvailabilityAPI,
  GetUserScheduledActivitiesList,
} from "../../../helper/commonApi";
import logger from "../../../constant/logger";
import ShimmerPlaceHolder from "../../../components/SimmerEffect";
import { keys } from "underscore";
import { Enum_ActivitiesFrequency } from "../../../constant/ENUM";

interface Props {
  navigation?: any;
  route?: any;
}

const ActivitesDetails: React.FC<Props> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const {
    activitesData,
    from,
    isSameDay,
    isConflict,
    AigeneratedData,
    ExistingID,
    purpuse,
    fromUpdateScheduleTime,
    replcaeApiPayload,
    editfor,
    trackId,
  } = route?.params;
  logger("checkActivoity0_________", activitesData);
  const [IsLoading, setIsLoading] = useState(true);
  const [ActivityGraphDetails, setActivityGraphDetails] = useState<any>([]);
  const [OverAllProgress, setOverAllProgress] = useState<any>([]);
  const [ActivityDetails, setActivityDetails] = useState<any>(
    // from === "Dashboard" ? {} :
    activitesData
  );
  const [RecentActivity, setRecentActivity] = useState([]);
  let showButton =
    isSameDay === true ? true : isSameDay === undefined ? true : false;
  const isActivityDetailsFetched = useRef(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(from === "fromExplorer");
    }, 1500);

    // Cleanup function to clear the timeout
    return () => clearTimeout(timeout);
  }, [from]);

  // Always invoke the hook, but its behavior depends on userDetails
  const [userDetails, setUserDetails] = useState<any>(null);
  const [isReadyForDynamicPrompting, setIsReadyForDynamicPrompting] =
    useState(false);

  // Fetch user details once on component mount
  useEffect(() => {
    if (isConflict) {
      GetUserScheduledActivitiesList(dispatch);
    }
    const getUserTokenn = async () => {
      let USERINFO = await AsyncStore.getItem(AsyncStore.LOGIN_USER_DATA);
      const parsedUserInfo = JSON.parse(USERINFO);

      if (parsedUserInfo?.token && parsedUserInfo?.userId) {
        setUserDetails(parsedUserInfo);
        setIsReadyForDynamicPrompting(true); // Mark as ready for prompting
      }
    };
    getUserTokenn();
  }, []);
  const [DeviceID, setDeviceID] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await DeviceInfo.getUniqueId();
      setDeviceID(response);
    }
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (from === "NotificationClick") {
        logger("checkActivoity3Wherecalled_________", route?.params?.id);
        setIsLoading(true);
        getActivityDetails(route?.params?.id);
      }
      if (from === "ExplorerActivity" && activitesData) {
        getActivityDetails(activitesData);

        isActivityDetailsFetched.current = true;
      }

      if (
        (from === "Dashboard" || from === "WellnessOverview") &&
        activitesData?.id
      ) {
        getActivityDetails(activitesData.id);

        isActivityDetailsFetched.current = true;
      }
    }, [activitesData, from])
  );

  const getActivityDetails = async (id: any) => {
    logger("checkActivoity2from_________", from);
    let req = {};
    let payload = `${
      "activityId=" +
      id +
      "&" +
      "targetDate=" +
      moment(new Date()).format("YYYY-MM-DD")
    }`;
    setIsLoading(true);
    try {
      const response =
        await allActions.OnBoarding.GetActivityDetailsByIdAndDate(
          dispatch,
          req,
          "getActivityDetails",
          payload
        );
      if (response?.statusCode === 200) {
        let data = response?.data?.recentActivities.filter(
          (item: any, index: any) => {
            if (moment(item.createdDate).isSame(moment(), "day")) {
              return item;
            }
          }
        );
        logger("checkActivoity1_________", response?.data);
        setRecentActivity(data);
        setActivityDetails(response?.data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const frequencyCount = parseInt(ActivityDetails?.frequencyCount || "1", 10);

  return (
    <ScreenWrapper statusBarColor={colors?.SaltBox}>
      <CommonHeader
        headerName={formatSentenceCase(strings?.activityDetails)}
        onBackPress={() => navigation?.goBack()}
        iconContainer={styles.iconContainer}
        mainContainer={styles.mainContainer}
      />
      {IsLoading ? (
        <CommonLoader />
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles?.scrollStyle}
        >
          {ActivityDetails ? (
            <ActivityInfo
              ActivityDetails={ActivityDetails}
              repeatation={frequencyCount}
            />
          ) : (
            <View
              style={{
                height: moderateScale(150),
                width: "100%",
                alignSelf: "center",
                backgroundColor: colors?.prussianBlue,
              }}
            >
              <ShimmerPlaceHolder
                width={"100%"}
                height={moderateScale(150)}
                backgroundColor={colors.darkthemeColor}
              ></ShimmerPlaceHolder>
            </View>
          )}
          {ActivityGraphDetails?.[0]?.activityOverallGraph?.progress > 0 && (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginVertical: moderateScale(10),
              }}
            >
              <PieChart
                donut
                innerRadius={80}
                data={OverAllProgress}
                centerLabelComponent={() => {
                  return (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: textScale(25),
                          color: colors.SurfCrest,
                        }}
                      >
                        {ActivityGraphDetails?.[0]?.activityOverallGraph
                          ?.progress + "%"}
                      </Text>
                      <Text
                        style={{
                          fontSize: textScale(12),
                          color: colors.SurfCrest,
                        }}
                      >
                        {"Over all progress"}
                      </Text>
                    </View>
                  );
                }}
                backgroundColor={colors.SaltBox}
              />
            </View>
          )}
          {RecentActivity && RecentActivity.length > 0 && (
            <RecentActivites
              data={RecentActivity}
              totalHours={ActivityDetails?.duration}
              navigation={navigation}
              ActivityDetails={ActivityDetails}
              fromDetailsPage={true}
            />
          )}
          {ActivityDetails?.recommendations ? (
            <Recommendations
              ActivityDetails={ActivityDetails}
              recommendations={ActivityDetails?.recommendations}
              navigation={navigation}
              from={from}
              trackId={trackId || AigeneratedData?.trackId}
              AigeneratedData={AigeneratedData}
            />
          ) : (
            <View
              style={{
                height: moderateScale(100),
                width: "100%",
                alignSelf: "center",
                backgroundColor: colors?.prussianBlue,
                marginTop: moderateScale(20),
              }}
            >
              <ShimmerPlaceHolder
                width={"100%"}
                height={moderateScale(100)}
                backgroundColor={colors.darkthemeColor}
              ></ShimmerPlaceHolder>
            </View>
          )}
          {isConflict && (
            <>
              <Text
                style={{
                  marginTop: moderateScale(9),
                  color: colors?.royalOrangeDark,
                }}
              >
                {activitesData?.conflictMessage}
              </Text>
              <BottomButtons
                onPressStart={() =>
                  navigation.navigate(
                    navigationString.UpdateScheduleTimeScreen,
                    {
                      ...route?.params,
                      AigeneratedData,
                      activitesData,
                      from,
                      ExistingID,
                      purpuse,
                      fromUpdateScheduleTime: fromUpdateScheduleTime ?? 1,
                      replcaeApiPayload,
                      editfor,
                    }
                  )
                }
                isConflict={true}
              />
            </>
          )}
          {from !== "ExplorerActivity" && showButton && ActivityDetails && (
            <>
              {ActivityDetails && ActivityDetails?.recentActivities && (
                <>
                  {RecentActivity?.length < frequencyCount &&
                    !RecentActivity?.some(
                      (item: { createdDate: string; [key: string]: any }) =>
                        ActivityDetails?.frequency ===
                        Enum_ActivitiesFrequency?.Weekly
                          ? moment(item?.createdDate).isSame(moment(), "day")
                          : ActivityDetails?.frequency ===
                            Enum_ActivitiesFrequency?.Monthly
                          ? moment(item?.createdDate).isSame(moment(), "month")
                          : false
                    ) && ( //checking current day submitted response willbe coming inside RecentActivity
                      <BottomButtons
                        onPressStart={() =>
                          !ActivityDetails?.isFeatured
                            ? navigation?.navigate(
                                navigationString?.ActivityFeedback,
                                {
                                  ActivityDetails: ActivityDetails,
                                  isMedicineActivity:
                                    ActivityDetails.duration === "",
                                  from: from,
                                }
                              )
                            : navigation.navigate(
                                navigationString.MoodJournaling,
                                {
                                  from: "Activity",
                                  ActivityDetails: ActivityDetails,
                                  other: route?.params,
                                  socketDetails: {
                                    DeviceID: DeviceID,
                                  },
                                }
                              )
                        }
                        isFeatured={ActivityDetails?.isFeatured}
                      />
                    )}
                </>
              )}
            </>
          )}

          {from === "ExplorerActivity" && (
            <BottomButtons
              onPressStart={() =>
                !ActivityDetails?.isFeatured
                  ? navigation?.navigate(navigationString?.ActivityFeedback, {
                      ActivityDetails: ActivityDetails,
                      isMedicineActivity: ActivityDetails.duration === "",
                      from: from,
                    })
                  : navigation.navigate(navigationString.MoodJournaling, {
                      from: "Activity",
                      ActivityDetails: ActivityDetails,
                      socketDetails: {
                        DeviceID: DeviceID,
                      },
                    })
              }
              isFeatured={ActivityDetails?.isFeatured}
            />
          )}
        </ScrollView>
      )}
    </ScreenWrapper>
  );
};

export default ActivitesDetails;
