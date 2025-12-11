import {
  Alert,
  FlatList,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../constant/colors";
import CommonHeader from "../../../../components/Header/commonHeader";
import {
  moderateScale,
  textScale,
  width,
} from "../../../../constant/responsiveStyle";
import CurrentWeekDays from "../../../AddActivities/DailyRoutine/DaysShow";
import moment from "moment";
import MoodCalendar from "./MoodCalendar";
import {
  APPLY_STATUS,
  dashboardClickENUM,
  DashboardFooterAnimateButton,
  DayType_ENUM,
  Enum_JournalType,
  Enum_QuestionSourceType,
  SUBSCRIPTION_NAVIGATION_FROM,
} from "../../../../constant/ENUM";
import { imagePath } from "../../../../assets/png/imagePath";
import { Clock, TimeOrgIcon } from "../../../../assets";
import navigationString from "../../../../navigation/navigationString";
import allActions from "../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { API_FUN_NAMES } from "../../../../constant/APIsFunctionNames";
import { aiProvider, STATUS_CODES } from "../../../../constant/appConstant";
import getWeekForJournal from "../../../AddActivities/DailyRoutine/getWeekForJournal";
import logger from "../../../../constant/logger";
import JournalModal from "../../../MoodTracking/Journal/JournalModal";
import UpgradeModal from "../../../SubscriptionPlan/UpgradeModal";
import { IAP_Strings } from "../../../SubscriptionPlan/IAP_Strings";
import { subscriptionFun } from "../../../../constant/SubscriptionPlanValidation";
import {
  getBuySubscriptionDetail,
  getSeekerInfoRedux,
} from "../../../../redux/selector";
import { useFocusEffect } from "@react-navigation/native";
import FloatingAddMutton from "../../../Profile/HabitTracking/FloatingAddMutton";

interface IndependentJournalsProps {
  navigation?: any;
  route?: any;
}
let subscriptionTitle = "Subscription Plans";
var subscriptionStatus: any = false;

const IndependentJournals: React.FC<IndependentJournalsProps> = ({
  navigation,
  route,
}) => {
  const dispatch = useDispatch();
  const { dayType, isFrom } = route?.params;

  const subscriptionDetail = useSelector(getBuySubscriptionDetail());
  const getseekerInfoRedux = useSelector(getSeekerInfoRedux());

  const [showStartDate, setShowStartDate] = useState(true);
  const [selectedStartDate, setSelectedStartDate] = useState(moment());
  const [currentWeek, setCurrentWeek] = useState<any[]>([]);
  const [list, setList] = useState([]);
  const [duplicateList, setDuplicateList] = useState([]);
  const [calenderPickDate, setCalenderPickDate] = useState("");
  const [monthlyData, setMonthlyData] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [journalType, setJournalType] = useState<string>(Enum_JournalType?.ALL);
  const [dateChanged, setDateChanged] = useState(false);
  const [moodJournalData, setMoodJournalData] = useState<any>({});
  const [showModal, setShowModal] = useState(false);
  const [subscriptionModal, setSubscriptionModal] = useState(false);

  useEffect(() => {
    getWeekData();
  }, [dateChanged]);

  useEffect(() => {
    let currentDate = moment().format("YYYY-MM-DD");
    setCalenderPickDate(moment(currentDate).format());
    getUserJournalsProgress(currentDate);
  }, []);

  useEffect(() => {
    fetchMoodJournalingAPI();
  }, []);
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
      .then((response: any) => { })
      .catch((err) => { });
  };
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
  const getData = (date: any) => {
    setCalenderPickDate(moment(date).format());
    getUserJournalsProgress(date);
  };

  const footerAnimationButton = (type: any, title: any) => {
    if (subscriptionStatus) {
      setShowModal(true);
    } else {
      subscriptionTitle = `${title} is premium feature`;
      setSubscriptionModal(true);
    }
  };

  const getUserJournalsProgress = async (date: any) => {
    try {
      setFetching(true);
      const params = `?TargetDate=${date}&IsDateFilter=true&DayType=${1}`;

      const response =
        await allActions.wellnessProgress.GetMoodJournalingGraphDetails(
          dispatch,
          {},
          API_FUN_NAMES?.GetUserSkippedCategory,
          params
        );
      if (response) setFetching(false);
      if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
        if (response?.data?.daysJournal?.length) {
          setDuplicateList(response?.data?.daysJournal);
          filterApplyFromAPI(response?.data?.daysJournal, date);
        } else {
          setDuplicateList([]);
          setList([]);
        }
      } else {
        setDuplicateList([]);
        setList([]);
      }
    } catch (error) {
      setFetching(true);
    }
  };

  const filterApplyFromAPI = (allData: any, date: any) => {
    const result = allData?.filter((item: any) => item?.date?.includes(date));
    if (result?.length) {
      updateListAccordingToJournal(result);
    } else {
      setList([]);
    }
  };

  const filterApplyFromSelectDate = (allData: any, date: any) => {
    const result = allData?.filter((item: any) => item?.date?.includes(date));
    if (result?.length) {
      updateListAccordingToJournal(result);
    } else {
      getUserJournalsProgress(date);
    }
  };

  const updateListAccordingToJournal = (listing: any) => {
    if (listing?.length) {
      if (journalType === Enum_JournalType?.ALL) {
        setList(listing);
      } else if (journalType === Enum_JournalType?.AI) {
        const AiJournals = listing.filter(
          (item: any) =>
            item?.questionSourceType === Enum_QuestionSourceType?.AiGenerated
        );
        setList(AiJournals);
      } else if (journalType === Enum_JournalType?.CUSTOM) {
        const manualJournals = listing.filter(
          (item: any) =>
            item?.questionSourceType === Enum_QuestionSourceType?.Manual
        );
        setList(manualJournals);
      }
    } else {
      setList([]);
    }
  };

  const memorizedDate = useMemo(
    () => (
      <CurrentWeekDays
        dateAble={currentWeek}
        onCalendarPress={() => setShowStartDate(true)}
        setTodayDate={(date: any) => { }}
        onSelectDate={(item: any, idx: any, data: any, time: any) => {
          onSelectDate_(item, idx, data, time);
          let selectDate = `${item?.year}-${item?.month_number}-${item?.date}`;
          setCalenderPickDate(moment(selectDate).format());
          filterApplyFromSelectDate(duplicateList, selectDate);
        }}
        selectedDate={selectedStartDate}
        weekContainer={{
          flex: 0,
          width: "100%",
          marginBottom: moderateScale(19),
        }}
      />
    ),
    [currentWeek]
  );

  const getWeekData = () => {
    const { days } = getWeekForJournal(selectedStartDate);
    setCurrentWeek(days);
    setDateChanged(false);
  };

  const onSelectDate = (date: any) => {
    const selectedDate = moment(date.dateString);
    setSelectedStartDate(selectedDate);
    getWeekForJournal(selectedDate);
    setDateChanged(true);
  };

  const onSelectDate_ = (item: any, index: any, data: any, time: any) => {
    const updatedData = data.map((day: any) => ({
      ...day,
      isTodayDate: day.date === item.date,
      time: time,
    }));
    setCurrentWeek(updatedData);
  };

  const handleBackPress = () => {
    if (isFrom == "Home") {
      navigation?.navigate(navigationString?.PlannerDashboard);
    } else if (isFrom === "Summary") {
      navigation?.navigate(navigationString?.Summary);
    } else if (isFrom === "Wellbeing") {
      navigation?.navigate(navigationString?.WellnessOverview);
    } else if (isFrom === "Profile" || isFrom === "profile") {
      navigation?.navigate(navigationString?.Profile);
    } else {
      navigation.goBack();
    }
  };
  return (
    <ScreenWrapper statusBarColor={colors?.prussianBlue}>
      <View style={{ flex: 1 }}>
        <View style={styles?.backButtonHeaderContainer}>
          <CommonHeader
            headerName={"Journal History"}
            onBackPress={handleBackPress}
            iconContainer={styles?.iconContainer}
          />
        </View>
        <View style={{ alignItems: "center" }}>{memorizedDate}</View>
        {showStartDate ? (
          <Modal transparent style={styles?.modal}>
            <TouchableOpacity
              style={{
                position: "absolute",
                backgroundColor: "transparent",
                height: moderateScale(50),
                width: moderateScale(50),
                zIndex: 100,
                top: 40,
                left: 10,
              }}
              onPress={handleBackPress}
            />

            <View style={styles?.modalInnerView}>
              <MoodCalendar
                setShowCalender={(val: boolean) => setShowStartDate(val)}
                onSelectDate={(val: any) => {
                  onSelectDate(val);
                  getData(val?.dateString);
                }}
                journalType={journalType}
                setJournalType={(val: string) => setJournalType(val)}
                list={duplicateList}
                updateMonthOrYear={(date: any) => getData(date)}
              />
            </View>
          </Modal>
        ) : (
          <FlatList
            data={list}
            contentContainerStyle={styles?.listContainer}
            renderItem={({ item, index }: any) => {
              const setOfBackgroundImages = [
                imagePath?.JournalDetailBG2,
                imagePath?.JournalDetailBG1,
                imagePath?.JournalDetailBG,
              ];
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation?.navigate(navigationString?.JournalView, {
                      journalData: item,
                      selectedStartDate: selectedStartDate,
                    });
                  }}
                >
                  <ImageBackground
                    source={setOfBackgroundImages[index % 3]}
                    style={styles?.backgroundImage}
                    resizeMode={APPLY_STATUS?.stretch}
                  >
                    <View style={styles?.timeHolder}>
                      <Text
                        style={{
                          color:
                            index % 3 === 1
                              ? colors?.prussianBlue
                              : colors?.SurfCrest,
                          flex: 1,
                          fontSize: textScale(10),
                          fontWeight: "400",
                        }}
                      >
                        {item?.questionSourceType ==
                          Enum_QuestionSourceType?.AiGenerated
                          ? "AI"
                          : "Custom"}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          flex: 1,
                          justifyContent: "flex-end",
                        }}
                      >
                        <Text
                          style={[
                            styles?.timetextstyle,
                            {
                              color:
                                index % 3 === 1
                                  ? colors?.prussianBlue
                                  : colors?.SurfCrest,
                            },
                          ]}
                        >
                          {moment.utc(item?.date).local().format("hh:mm A")}
                        </Text>
                        {index % 3 !== 0 ? <TimeOrgIcon /> : <Clock />}
                      </View>
                    </View>
                    <View style={styles?.cardStyle}>
                      <Text
                        style={[
                          styles?.titleStyle,
                          {
                            color:
                              index % 3 === 1
                                ? colors?.prussianBlue
                                : colors?.SurfCrest,
                          },
                        ]}
                        numberOfLines={1}
                      >
                        {item?.title}
                      </Text>
                      <Text
                        style={[
                          styles?.description,
                          {
                            color:
                              index % 3 === 1
                                ? colors?.SilverChalice
                                : colors?.SurfCrest,
                          },
                        ]}
                        numberOfLines={2}
                      >
                        {item?.description}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              );
            }}
            ListHeaderComponent={({ }) => {
              return (
                <View
                  style={{
                    alignItems: "center",
                    marginVertical: moderateScale(5),
                  }}
                >
                  <Text
                    style={{
                      fontSize: textScale(19),
                      fontWeight: "600",
                      color: colors?.SurfCrest,
                    }}
                  >{`Your entries for ${moment(calenderPickDate).format(
                    "MMMM D"
                  )}`}</Text>
                  <Text
                    style={{
                      color: colors?.SurfCrest,
                      fontSize: textScale(10),
                      fontWeight: "400",
                    }}
                  >{`You’ve journaled ${list?.length} times.${list?.length > 0 ? "Tap to view or reflect again." : ""
                    }`}</Text>
                  {fetching && (
                    <View
                      style={{
                        width: width,
                        alignItems: "center",
                        marginTop: moderateScale(10),
                        backgroundColor: colors?.surfCrustOp3,
                      }}
                    >
                      <Text style={{ color: colors?.SurfCrest }}>
                        Fetching...
                      </Text>
                    </View>
                  )}

                  {moment(calenderPickDate).isSame(moment(), "day") ? null : (
                    <Text
                      style={{
                        color: colors?.SurfCrest,
                        fontSize: textScale(10),
                        fontWeight: "400",
                        marginTop: moderateScale(10),
                      }}
                    >
                      Check-ins can only be added for today, not past or future
                      dates.
                    </Text>
                  )}
                </View>
              );
            }}
          />
        )}
      </View>

      <JournalModal
        navigation={navigation}
        visible={showModal}
        setShowModal={setShowModal}
        data={moodJournalData}
      />
      <UpgradeModal
        navigation={navigation}
        visible={subscriptionModal}
        setShowModal={setSubscriptionModal}
        fromScreen={SUBSCRIPTION_NAVIGATION_FROM?.PROFILE}
        isPlanner={false}
        title={subscriptionTitle}
        description={IAP_Strings?.subscriptionDialogDescription}
      />

      {moment(calenderPickDate).isSame(moment(), "day") && !list?.length && (
        <FloatingAddMutton
          onPress={() => {
            footerAnimationButton(
              DashboardFooterAnimateButton?.moodJournal,
              "Mood Journal"
            );
          }}
        />
      )}
    </ScreenWrapper>
  );
};

export default IndependentJournals;

const styles = StyleSheet.create({
  container: { flex: 1 },
  iconContainer: { backgroundColor: "#00000033" },
  backButtonHeaderContainer: {
    paddingHorizontal: moderateScale(19),
    marginBottom: moderateScale(9),
  },
  innerContainer: {
    paddingHorizontal: moderateScale(19),
    marginTop: moderateScale(10),
  },
  descriptionText: {
    fontSize: textScale(12),
    color: colors?.SurfCrest,
    fontWeight: "400",
    textAlign: "center",
  },
  card: {
    backgroundColor: colors?.moodMeterContaner,
    borderRadius: moderateScale(18),
    paddingTop: moderateScale(40),
    paddingBottom: moderateScale(25),
    marginTop: moderateScale(15),
  },
  flatList: {
    paddingHorizontal: 12,
  },
  moodBarGraphDescription: {
    textAlign: "auto",
    marginVertical: moderateScale(10),
  },
  meterBackgroundStyle: {
    backgroundColor: colors?.SurfCrest,
    opacity: 0.8,
  },
  timeTextStyle: {
    fontSize: textScale(10),
    color: colors?.SurfCrest,
    fontWeight: "600",
  },
  modal: { flex: 1, backgroundColor: "red" },
  modalInnerView: {
    paddingHorizontal: moderateScale(19),
    marginTop: moderateScale(19),
    height: "100%",
    justifyContent: "center",
    // backgroundColor: colors?.lightSurfCrest02,
  },
  listContainer: {
    gap: moderateScale(10),
    paddingHorizontal: moderateScale(19),
  },
  backgroundImage: {
    height: moderateScale(104),
    alignItems: "center",
  },
  cardStyle: {
    // alignItems: "center",
    // justifyContent: "center",
    height: "100%",
    marginTop: moderateScale(7),
    maxWidth: moderateScale(250),
    gap: moderateScale(5),
  },
  titleStyle: {
    fontSize: textScale(12),
    fontWeight: "600",
    textAlign: "center",
  },
  description: {
    fontSize: textScale(10),
    fontWeight: "400",
    textAlign: "center",
  },
  timeHolder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(10),
  },
  timetextstyle: {
    fontSize: textScale(10),
    fontWeight: "400",
    textAlign: "center",
    marginRight: moderateScale(5),
  },
});
