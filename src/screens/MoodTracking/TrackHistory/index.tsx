import { BackHandler, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import {
  height,
  moderateScale,
  textScale,
} from "../../../constant/responsiveStyle";
import AllMoodLists from "./AllMoodLists";
import CommonHeader from "../../../components/Header/commonHeader";
import CalendarComponent from "../../../components/CalendarComponent/CalendarComponent";
import moment from "moment";
import updateCurrentWeek from "../../AddActivities/DailyRoutine/getWeek";
import CurrentWeekDays from "../../AddActivities/DailyRoutine/DaysShow";
import navigationString from "../../../navigation/navigationString";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../../redux/actions";
import { NoDataIcon } from "../../../assets";
import { event } from "../../../navigation/emitter";
import * as AsyncStorageUtils from "../../../utils/Storage/AsyncStorage";
import { strings } from "../../../constant/strings";
import { loginEmitter } from "../../Profile/GoalsAndAspiration/helperFunction";
import CommonLoader from "../../../components/Loader";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import CommonButton from "../../../components/Buttons/commonButton";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import DeviceInfo from "react-native-device-info";
import {
  dashboardClickENUM,
  DashboardFooterAnimateButton,
  SUBSCRIPTION_NAVIGATION_FROM,
} from "../../../constant/ENUM";
import FloatingAddMutton from "../../Profile/HabitTracking/FloatingAddMutton";
import UpgradeModal from "../../SubscriptionPlan/UpgradeModal";
import { IAP_Strings } from "../../SubscriptionPlan/IAP_Strings";
import { subscriptionFun } from "../../../constant/SubscriptionPlanValidation";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import {
  getBuySubscriptionDetail,
  getSeekerInfoRedux,
} from "../../../redux/selector";

interface Props {
  navigation?: any;
  route?: any;
}
let subscriptionTitle = "Subscription Plans";
var subscriptionStatus: any = false;
const TrackHistory: React.FC<Props> = ({ navigation, route }) => {
  console.log("routes in history", route);
  const dispatch = useDispatch();
  const type = route?.params?.type;
  const isFrom = route?.params?.isFrom;

  const subscriptionDetail = useSelector(getBuySubscriptionDetail());
  const getseekerInfoRedux = useSelector(getSeekerInfoRedux());

  const [moodData, setMoodData] = useState([]);
  const [showStartDate, setShowStartDate] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(moment());
  const [currentWeek, setCurrentWeek] = useState<any[]>([]);
  const [dateChanged, setDateChanged] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [deviceID, setDeviceID] = useState<string>("");
  const [subscriptionModal, setSubscriptionModal] = useState(false);
  const [selectedDate_, setSelectedDate_] = useState<any>(
    moment(new Date()).utc().format("YYYY-MM-DD HH:mm:ss")
  );
  const [showSelectedDateOnCalender, setShowSelectedDateOnCalender] =
    useState<string>();
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  useEffect(() => {
    getWeekData();
  }, [dateChanged]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      strings?.hardwareBackPress,
      () => {
        setTimeout(() => {
          loginEmitter();
        }, 2000);
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);
  useFocusEffect(
    useCallback(() => {
      if (typeof selectedDate_ === "string") {
        if (type === strings.moodTracking_) {
          GetMoodTrackingDetails(selectedDate_);
        } else if (type === strings?.moodJournaling_) {
          getMoodJournalingDetails(selectedDate_);
        }
      }
    }, [selectedDate_])
  );

  useEffect(() => {
    const init = async () => {
      subscriptionStatus = await subscriptionFun(
        subscriptionDetail,
        getseekerInfoRedux
      );
    };
    init();
  }, [subscriptionDetail]);

  useFocusEffect(
    useCallback(() => {
      getSubscriptionStatusFromServer(dispatch);
    }, [])
  );
  const getSubscriptionStatusFromServer = async (dispatch: any) => {
    let requestbody = {};
    allActions.seekerDetails
      .GetSeekerPersonalInfo(
        dispatch,
        requestbody,
        API_FUN_NAMES?.getSeekerPersonalInfo
      )
      .then((response: any) => {})
      .catch((err) => {});
  };
  const getWeekData = () => {
    const { days } = updateCurrentWeek(selectedStartDate);
    setCurrentWeek(days);
    setDateChanged(false);
  };

  const onSelectDate = (date: any) => {
    const selectedDate = moment(date.dateString);
    setSelectedStartDate(selectedDate);
    updateCurrentWeek(selectedDate);
    setDateChanged(true);
  };
  useEffect(() => {
    async function fetchData() {
      const response = await DeviceInfo.getUniqueId();
      setDeviceID(response);
    }
    fetchData();
  }, []);
  const onSelectDate_ = (item: any, index: any, data: any, time: any) => {
    const updatedData = data.map((day: any) => ({
      ...day,
      isTodayDate: day.date === item.date,
      time: time,
    }));
    //new code
    const dummyDate = data.find((itms: any) => itms.date === item.date);
    const formattedDate = moment(
      `${dummyDate.year}-${dummyDate.month}-${dummyDate.date}`,
      "YYYY-MMM-DD"
    ).format("YYYY-MM-DD");
    console.log("formattedDateformattedDate", formattedDate);
    setShowSelectedDateOnCalender(formattedDate);
    //new code
    setCurrentWeek(updatedData);
  };

  const footerAnimationButton = (type: any, title: any) => {
    if (subscriptionStatus) {
      if (type == DashboardFooterAnimateButton?.moodTrack) {
        navigation.navigate(navigationString.TrackEmo, {
          from: dashboardClickENUM?.Profile,
          socketDetails: {
            DeviceID: deviceID,
          },
        });
      }
    } else {
      subscriptionTitle = `${title} is premium feature`;
      setSubscriptionModal(true);
    }
  };
  const formatDateString = (dateObj: any): string | null => {
    if (!dateObj?.date || !dateObj?.year || !dateObj?.month) {
      return null;
    }
    const monthMap: any = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    const date = moment(
      `${dateObj.date}-${monthMap[dateObj.month]}-${dateObj.year}`,
      "DD-MM-YYYY"
    );
    // console.l
    const now = moment();
    date.hours(now.hours());
    date.minutes(now.minutes());
    date.seconds(now.seconds());

    return date.format("YYYY-MM-DD HH:mm:ss");
  };

  const getConvertedDate = (date: any) => {
    if (Object.keys(date).length !== 0) {
      const formattedDate = moment(formatDateString(date)).toDate();
      if (formattedDate) {
        const validDate = moment(formattedDate)
          .utc()
          .format("YYYY-MM-DD HH:mm:ss"); // Ensure UTC format
        if (moment(validDate, "YYYY-MM-DD HH:mm:ss", true).isValid()) {
          console.log("==>validDate->", validDate);
          setSelectedDate_(validDate);
        }
      }
    }
  };
  const memorizedDate = useMemo(
    () => (
      <CurrentWeekDays
        dateAble={currentWeek}
        onCalendarPress={() => setShowStartDate(true)}
        setTodayDate={(date: any) => getConvertedDate(date)}
        onSelectDate={(item: any, idx: any, data: any, time: any) => {
          onSelectDate_(item, idx, data, time);
        }}
        selectedDate={selectedStartDate}
      />
    ),
    [currentWeek]
  );

  const memorizedAllMoodLists = useMemo(
    () =>
      moodData?.length == 0 || moodData === undefined ? (
        <View
          style={{
            marginTop: moderateScale(50),
            justifyContent: "center",
            alignItems: "center",
            height: height * 0.5,
            paddingHorizontal: moderateScale(20),
            gap: moderateScale(10),
          }}
        >
          <Text
            style={{
              fontSize: textScale(18),
              fontWeight: "700",
              color: colors.SurfCrest,
              textAlign: "center",
            }}
          >
            {"No mood entries yet! "}
          </Text>
          <Text
            style={{
              fontSize: textScale(14),
              fontWeight: "400",
              color: colors.SurfCrest,
              textAlign: "center",
            }}
          >
            {moment(selectedDate_).utc().isSame(moment().utc(), "day")
              ? "You haven’t checked in yet—tap below to share how you’re feeling today. "
              : "Check-ins can only be added for today, not past or future dates."}
          </Text>
          {moment(selectedDate_).utc().isSame(moment().utc(), "day") && (
            <CommonButton
              btnName={"Add Mood"}
              onPress={() => {
                footerAnimationButton(
                  DashboardFooterAnimateButton?.moodTrack,
                  "Mood Tracking"
                );
              }}
              mainContainer={{
                width: "100%",
                backgroundColor: colors.polishedPine,
                paddingVertical: moderateScale(10),
                marginTop: moderateScale(10),
              }}
            />
          )}
        </View>
      ) : (
        <AllMoodLists moodData={moodData} type={type} />
      ),
    [moodData, selectedDate_]
  );

  const GetMoodTrackingDetails = async (selectedDate_: any) => {
    const currentDate = moment().utc().format("YYYY-MM-DD HH:mm:ss");
    setLoading(true);
    try {
      const data = selectedDate_ || currentDate;
      const response = await allActions.dashboardAction.GetMoodTrackingDetails(
        dispatch,
        null,
        "GetMoodTrackingDetails",
        data
      );

      console.log(
        "response-GetMoodTrackingDetails->",
        response,
        data,
        "selectedDate_",
        selectedDate_
      );
      if (response.statusCode === 200) {
        // setMoodData([]);
        setMoodData(response.data);
        setLoading(false);
      } else {
        setLoading(false);
        setToasterDetails({
          showToast: true,
          code: 0,
          message: response?.message,
        });
      }
    } catch (error) {
      setLoading(false);
      setToasterDetails({
        showToast: true,
        code: 0,
        message: error,
      });
    }
  };

  const getMoodJournalingDetails = async (selectedDate_: any) => {
    console.log("called here ");

    const currentDate = moment().utc().format("YYYY-MM-DD HH:mm:ss");
    // Step 2: Log the date or perform an operation
    console.log("Current Date:", currentDate);

    setLoading(true);
    try {
      const data = selectedDate_ || currentDate;
      console.log("response-data->", data);
      const response =
        await allActions.dashboardAction.GetMoodJournalingDetails(
          dispatch,
          null,
          "getMoodJournalingDetails",
          data
        );
      console.log("response-response->", response);
      console.log(
        "response-getMoodJournalingDetails->",
        response,
        data,
        "selectedDate_",
        selectedDate_
      );
      if (response.statusCode === 200) {
        setMoodData(response?.data);
        setLoading(false);
      } else {
        setToasterDetails({
          showToast: true,
          code: 0,
          message: response?.message,
        });
      }
    } catch (error) {
      setLoading(false);
      setToasterDetails({
        showToast: true,
        code: 0,
        message: error,
      });
    }
  };

  return (
    <ScreenWrapper statusBarColor={colors.prussianBlue}>
      <CommonHeader
        headerName={
          type !== strings.moodTracking_ ? "Journal tracker" : "Mood tracker"
        }
        onBackPress={() => {
          if (isFrom == "Home") {
            navigation?.navigate(navigationString?.PlannerDashboard);
          } else if (isFrom === "Summary") {
            navigation?.navigate(navigationString?.Summary);
          } else if (isFrom === "Wellbeing") {
            navigation?.navigate(navigationString?.WellnessOverview);
          } else if (isFrom === "Profile" || isFrom === "profile") {
            navigation?.navigate(navigationString?.Profile);
          } else {
            if (
              !route?.params?.onSwiperClick &&
              route?.params?.other?.from === "fromExplorer"
            ) {
              event.emit("login");

              AsyncStorageUtils.storeItemKey(
                AsyncStorageUtils.ISPLANNER_USER,
                JSON.stringify({ isPlanner: false, isSelected: true })
              );
              console.log("back button pressed from mood history", route);
            } else if (route?.params?.isViewHistoryClicked) {
              navigation?.goBack();
            } else if (route?.params?.other) {
              switch (route?.params?.other?.from) {
                case "Dashbaord":
                case "NotificationClick":
                  navigation?.navigate(navigationString?.PlannerDashboard);
                  break;
                case "profile":
                case "Profile":
                  navigation?.navigate(navigationString?.Profile);
                  break;
                case "wellbieng":
                  navigation?.navigate(navigationString.WellnessOverview);
                  break;
                case "AIGeneratedSkipped":
                  event.emit("login");

                  AsyncStorageUtils.storeItemKey(
                    AsyncStorageUtils.ISPLANNER_USER,
                    JSON.stringify({ isPlanner: true, isSelected: true })
                  );
                  break;
                case "fromExplorer":
                  event.emit("login");

                  AsyncStorageUtils.storeItemKey(
                    AsyncStorageUtils.ISPLANNER_USER,
                    JSON.stringify({ isPlanner: false, isSelected: true })
                  );
                  break;
                case "Activity":
                  if (route?.params?.other?.mainTab === "Dashboard") {
                    navigation?.navigate(navigationString?.PlannerDashboard);
                  } else {
                    navigation?.navigate(navigationString?.WellnessOverview);
                  }
                  break;
                default:
                  // No action needed
                  break;
              }
            } else if (route?.params?.isGoback) {
              navigation.goBack();
              console.log("back button pressed from mood history", route);
            } else {
              navigation?.navigate(navigationString?.PlannerDashboard);
              console.log("back button pressed from mood history", route);
            }
          }
        }}
        mainContainer={styles.headerMainContainer}
        iconContainer={styles.headerIconContainer}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={{}}>
        {memorizedDate}
        {loading ? (
          <View
            style={{
              height: height * 0.75,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CommonLoader />
          </View>
        ) : (
          <>{memorizedAllMoodLists}</>
        )}
      </ScrollView>
      {toasterDetails?.showToaster && (
        <ToastApiResponse
          data={toasterDetails}
          setToasterDetails={setToasterDetails}
          code={toasterDetails?.code}
          message={toasterDetails?.message}
        />
      )}
      <CalendarComponent
        visibility={showStartDate}
        setShowCalender={setShowStartDate}
        onSelectDate={(val) => {
          console.log("valvalvalval====>>>", val?.dateString, val);
          setShowSelectedDateOnCalender(val?.dateString);
          onSelectDate(val);
        }}
        maxDate={moment().add(1, "year").format("DD-MMM-YYYY")}
        currentDate={moment(
          showSelectedDateOnCalender || moment().format("YYYY-MM-DD"),
          "YYYY-MM-DD"
        ).format("DD-MMM-YYYY")}
      />
      {moment(selectedDate_).utc().isSame(moment().utc(), "day") && (
        <FloatingAddMutton
          onPress={() => {
            footerAnimationButton(
              DashboardFooterAnimateButton?.moodTrack,
              "Mood Tracking"
            );
          }}
        />
      )}
      <UpgradeModal
        navigation={navigation}
        visible={subscriptionModal}
        setShowModal={setSubscriptionModal}
        fromScreen={SUBSCRIPTION_NAVIGATION_FROM?.PROFILE}
        isPlanner={false}
        title={subscriptionTitle}
        description={IAP_Strings?.subscriptionDialogDescription}
      />
    </ScreenWrapper>
  );
};

export default TrackHistory;

const styles = StyleSheet.create({
  headerMainContainer: {
    paddingBottom: moderateScale(10),
    paddingTop: moderateScale(15),
    marginHorizontal: moderateScale(19),
  },
  headerIconContainer: {
    backgroundColor: colors.Daintree,
  },
  scrollView: {
    flex: 1,
  },
  noDataContainer: {
    marginTop: moderateScale(150),
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontSize: textScale(18),
    fontWeight: "700",
    color: colors.SurfCrest,
  },
});
