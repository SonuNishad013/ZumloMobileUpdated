import React, { useState, useEffect, useCallback } from "react";
import {
  FlatList,
  View,
  BackHandler,
  Text,
  TouchableOpacity,
  Pressable,
  ImageBackground,
  Image,
  Platform,
} from "react-native";
import moment from "moment";
import colors from "../../../constant/colors";
import {
  height,
  moderateScale,
  width,
} from "../../../constant/responsiveStyle";
import {
  ddd_DD_MMM_MMM,
  YYYY_MM_DD,
} from "../../../constant/dateFormatConstants";
import UserInfoWithQuates from "./UserInfoWithQuates";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import HealthInsights from "./HealthInsights";
import { styles } from "./style";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../../redux/actions";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import useToastMsg from "../../../components/Hooks/useToast";
import * as AsyncStorage from "../../../utils/Storage/AsyncStorage";
import HeaderDateNotificationMassage from "../../../components/Header/HeaderDateNotificationMassage";
import ActivitiesList from "./ActivitiesList";
import navigationString from "../../../navigation/navigationString";
import AiAnimatedButton from "./AiAnimatedButton";
import _ from "underscore";
import AddWellnessPlanDetails from "./AddWellnessPlanDetails";
import { strings } from "../../../constant/strings";
import ShimmerPlaceHolder from "../../../components/SimmerEffect";
import { imagePath } from "../../../assets/png/imagePath";
import {
  filterCategoryData,
  filterglobalCodeOptionsData,
  getAllGlobalCodesWithCategory,
  getGlobalCodeOptionsId,
} from "../../../helper/getGlobalCodes";
import { formatSentenceCase } from "../../../helper/sentenceCase";
import CommonHealthLoader from "../../../components/Loader/CommonHealthLoader";
import onBoardingTypes from "../../../redux/types/onBoardingTypes";
import { getAllGlobalCodesWithCategoryProfile } from "../../Profile/UpdateProfile/MyProfile/PersonalInfo/helper";
import DeviceInfo from "react-native-device-info";
import * as AsyncStore from "../../../utils/Storage/AsyncStorage";
import { GetUserActivityAvailabilityAPI } from "../../../helper/commonApi";
import { event } from "../../../navigation/emitter";
import { aiProvider, STATUS_CODES } from "../../../constant/appConstant";
import SubscriptionPlanSuggestion from "./SubscriptionPlanSuggestion";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import {
  getBuySubscriptionDetail,
  getSeekerInfoRedux,
} from "../../../redux/selector";
import {
  ActivityComplitionStatus,
  AiSuggestionCategoryID,
  APPLY_STATUS,
  dashboardClickENUM,
  DashboardFooterAnimateButton,
  dataTypeENUM,
  eventENUM,
  MEMBERSHIP_DURATION,
  PLATEFORM,
  PrompTypeENUM,
  SUBSCRIPTION_NAVIGATION_FROM,
  vitalTypeENUM,
  Enum_NavigateFrom,
} from "../../../constant/ENUM";
import { DATE_FORMAT } from "../../../constant/DateFormats";
import { loggerMessage } from "../../../utils/CommonMethods";
import JournalModal from "../../MoodTracking/Journal/JournalModal";
import AddJournaling from "./AddJournaling";
import { findValueByKey } from "../Summary/component/Hooks/transformGoalsFromAPI";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import { subscriptionFun } from "../../../constant/SubscriptionPlanValidation";
import { getCountryCode } from "../../../constant/getCountryCode";
import logger from "../../../constant/logger";
import UpgradeModal from "../../SubscriptionPlan/UpgradeModal";
import { IAP_Strings } from "../../SubscriptionPlan/IAP_Strings";
import AppUpdateModal from "../../../utils/AppUpdateModal";
import { featuresEnableOrDisable } from "../../../utils/featuresEnableOrDisable";
import AffirmationCard from "./AffirmationCard";
import RecommendationCard from "./RecommendationCard";
import { textLabelSize } from "../../../utils/TextConfig";
import LabelHeader from "./LabelHeader";
import CreateGoals from "./CreateGoals";
import SetYourGoals from "./SetYourGoals";
import ProfileCard from "./ProfileCard";
import { CTAButtonWellbieng } from "./MyBlurList";
import { communityCode } from "../../../constant/CommunityConstant";
import NotificationPopup from "./NotificationPopup";
import { CreateUserDeviceCall } from "../../../redux/actions/loginAction";
import ChatWithAiButton from "../../../components/Buttons/ChatWithAiButton";
var subscriptionStatus: any = false;
let subscriptionTitle = "Subscription Plans";
interface DataItem {
  modifiedDate: string;
  [key: string]: any;
}
//remove all the logger and console.log from this file
const Dashboard: React.FC<{ navigation?: any; route?: any }> = ({
  navigation,
  route,
}) => {
  const [userData, setuserData] = useState<any>();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dashboardData, setDashbaordData] = useState<any>({});
  const [Activites, setActivites] = useState<any>([]);
  const [UserType, setUserType] = useState<any>();
  const [isLoading1, setisLoading1] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [healthVitalsLoader, sethealthVitalsLoader] = useState(false);
  const dispatch = useDispatch();
  const [systolicMaxScore, setSystolicMaxScore] = useState(0);
  const [diastoticMaxScore, setDiastoticMaxScore] = useState(0);
  const [heartRateMaxScore, setheartRateMaxScore] = useState(0);
  const [sleepMaxScore, setSleepMaxScore] = useState(0);
  const [bloodPressureMaxScore, setBloodPressureMaxScore] = useState(0);
  const focus = useIsFocused();
  const [stats, setStats] = useState<any>();
  const [isDataAvailable, setisDataAvailable] = useState(false);
  const [isOpen, setOpened] = useState<boolean>(false);
  const [resourceLibraryData, setResourceLibraryData] = useState<any>();
  const [InitialQuestions, setInitialQuestions] = useState(null);
  const [getWellnessGlobalData, setgetWellnessGlobalData] = useState<any>();
  const [allGlobalCode, setAllGlobalCode] = useState<any>();
  const [dashboardPrompting, setDashboardPrompting] = useState([]);
  const [isWellnessPlanExsit, setIsWellnessPlanExsit] =
    useState<boolean>(false);
  const [aiLoader, setAiLoader] = useState(false);
  const [userToken, setuserToken] = useState<any>();
  const [usersIndependentGoals, setUsersIndependentGoals] = useState<any[]>([]);
  const [DailyQuotes, setDailyQuotes] = useState([]);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [dashboardPromptIndex, setDashboardPromptIndex] = useState<number>(0);
  const ShowToast = (type: any, text1: any, text2: any) => {
    useToastMsg(type, text1, text2);
  };
  const [DeviceID, setDeviceID] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const subscriptionDetail = useSelector(getBuySubscriptionDetail());
  const getseekerInfoRedux = useSelector(getSeekerInfoRedux());

  const [userInfo, setUserInfo] = useState<any>({});
  // const [profileDataFetched, setProfileDataFetched] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [subscriptionModal, setSubscriptionModal] = useState(false);
  const [moodJournalData, setMoodJournalData] = useState<any>({});
  const [habitList, setHabitListData] = useState<any[]>([]);
  const [isSwiping, setIsSwiping] = useState(false);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  useEffect(() => {
    const checkForUpdate = async () => {
      const latestVersion: any = "1.2.0";
      const currentVersion: any = "1.0.0";
      if (latestVersion !== currentVersion) {
        if (featuresEnableOrDisable?.enableUpdateAlert) {
          setShowUpdateModal(true);
        }
      }
    };
    checkForUpdate();
  }, []);

  useEffect(() => {
    if (getseekerInfoRedux) {
      setUserInfo(getseekerInfoRedux);
    }
  }, [getseekerInfoRedux]);

  useEffect(() => {
    const init = async () => {
      subscriptionStatus = await subscriptionFun(
        subscriptionDetail,
        getseekerInfoRedux
      );
    };
    init();
  }, [subscriptionDetail]);

  useEffect(() => {
    getSubscriptionStatusFromServer(dispatch);
  }, [focus]);
  useEffect(() => {
    async function fetchData() {
      const response = await DeviceInfo.getUniqueId();
      setDeviceID(response);
    }
    fetchData();
  }, []);
  useFocusEffect(
    useCallback(() => {
      setOpened(false);
      return () => {
        setOpened(false);
      };
    }, [])
  );
  useFocusEffect(
    useCallback(() => {
      GetMobileDashboardPrompts();
      GetUserMobileDashboardDetailsByDate();
      GetUserMobileDashboardQuotesByDate();
      GetUserIndividualGoalsList_API();
      GetUserActivityAvailabilityAPI(dispatch);
      getHabitAPICalling();
      getCommunityProfile();
      clearSavedReduxData();
    }, [])
  );
  useFocusEffect(useCallback(() => {
    getSeekerPersonalInfo();
  }, []))


  const checkFCMExist = async () => {
    const fcmToken = await AsyncStorage.getItem(AsyncStorage?.FCM_TOKEN);
    if (fcmToken) {
      console.log("fcmToken_____ already exist--->", fcmToken);
      CreateUserDeviceCall(dispatch);
    } else {
      console.log("fcmToken_____ Does not exist--->", fcmToken);
      setNotificationModal(true);
      dispatch({
        type: "NO_FCM_TOKEN",
        payload: false,
      });
    }
  };
  useEffect(() => {
    checkFCMExist();
  }, []);


  useEffect(() => {
    getGlobalCode();
    getUserTokenn();
  }, []);
  useEffect(() => {
    getGlobalCode_();
    getAllGlobalCodesWithCategoryProfile();
  }, [focus]);
  useEffect(() => {
    const getUserTokenn = async () => {
      let USERINFO = await AsyncStore.getItem(AsyncStore.LOGIN_USER_DATA);
      const parsedUserInfo = JSON.parse(USERINFO);
      if (parsedUserInfo?.token && parsedUserInfo?.userId) {
        setUserDetails(parsedUserInfo);
      }
    };
    getUserTokenn();
  }, []);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      strings?.hardwareBackPress,
      () => {
        return false;
      }
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    fetchMoodJournalingAPI();
  }, []);
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
  const getCommunityProfile = () => {
    let requestbody = {};
    allActions?.communitiesAction
      .getCommunityProfile(
        dispatch,
        requestbody,
        API_FUN_NAMES?.getCommunityProfile
      )
      .then(async (response: any) => {
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          if (response?.message == communityCode?.profile_not_found) {
            allActions?.communitiesAction?.profileDetailsCommunity(
              dispatch,
              null
            );
          } else {
            allActions?.communitiesAction?.profileDetailsCommunity(
              dispatch,
              response?.data
            );
          }
        } else {
        }
      })
      .catch((err) => {
        allActions?.communitiesAction?.profileDetailsCommunity(dispatch, null);
      });
  };
  const getSubscriptionStatusFromServer = async (dispatch: any) => {
    let requestbody = {};
    allActions.seekerDetails
      .GetSeekerPersonalInfo(
        dispatch,
        requestbody,
        API_FUN_NAMES?.getSeekerPersonalInfo
      )
      .then((response: any) => { })
      .catch((err) => {
        loggerMessage("error_err", err);
      });
  };

  const GetUserIndividualGoalsList_API = async () => {
    try {
      const response =
        await allActions.dashboardAction.GetUserIndividualGoalsList(
          dispatch,
          {},
          API_FUN_NAMES?.GetUserIndividualGoalsList
        );
      if (response.statusCode === STATUS_CODES?.RESPONSE_OK) {
        if (!!response && Array.isArray(response.data)) {
          setUsersIndependentGoals(response?.data);
        }
      } else {
        return Promise.resolve(response);
      }
    } catch (error: any) {
      return Promise.reject(new Error(error));
    }
  };
  const getAllGlobalCodesWithCategory_ = async () => {
    let data = await getAllGlobalCodesWithCategory(allActions, dispatch);

    AsyncStorage?.storeItemKey(
      AsyncStorage?.GLOBALCODEWITHCATEGORY,
      JSON?.stringify(data)
    );
    data && getGlobalCode();
  };
  const getGlobalCode_ = async () => {
    try {
      const getGlobalCodeData = await AsyncStorage?.getItem(
        AsyncStorage.GLOBALCODEWITHCATEGORY
      );
      if (getGlobalCodeData == null) {
        getAllGlobalCodesWithCategory_();
      }
    } catch (error) {
      loggerMessage("Error retrieving login user data:", error);
    }
  };
  const getUserTokenn = async () => {
    let bearerToken = await AsyncStorage.getItem(AsyncStorage.ACCESS_TOKEN);
    setuserToken(bearerToken);
  };
  const clearSavedReduxData = () => {
    dispatch({
      type: onBoardingTypes.SAVE_SHORT_TERM_GOAL_DATA,
      payload: null,
    });
    dispatch({
      type: onBoardingTypes.SAVE_LONG_TERM_GOAL_DATA,
      payload: null,
    });
    dispatch({
      type: onBoardingTypes.SAVE_MEDICAL_CONDITIONS,
      payload: null,
    });
    dispatch({
      type: onBoardingTypes.FITNESS_ACTIVITY,
      payload: null,
    });
    dispatch({
      type: onBoardingTypes.SAVE_STRESSORS_TRIGGERS,
      payload: null,
    });
  };

  const getSeekerPersonalInfo = async () => {
    let userId = 0;
    setisLoading1(true);
    let requestbody = {};
    allActions.seekerDetails
      .GetSeekerPersonalInfo(
        dispatch,
        requestbody,
        API_FUN_NAMES?.getSeekerPersonalInfo,
        userId
      )
      .then((response: any) => {
        if (response.statusCode == STATUS_CODES?.RESPONSE_OK) {
          setisLoading1(false);
          setuserData(response.data);
          // setProfileDataFetched(true)
          getVitalsActivityStatus(response.data);


          if (
            response?.data?.basicInformation?.isBetaUser ||
            response?.data?.basicInformation?.isOrganizationSeeker
          ) {
            logger("beta and org user have a full access of premium features");
          } else {
            if (
              !response?.data?.basicInformation?.isFreeTrialActive &&
              response?.data?.subscriptionPlanInfo == null
            ) {
              // fetchSubscriptionList();
            }
          }
        } else {
          setisLoading1(false);
          ShowToast("error", "Error", response?.message);
        }
      })
      .catch((err) => {
        setisLoading1(false);
        ShowToast("error", "Error", err?.message);
      });
  };

  const fetchSubscriptionList = async () => {
    const countryCode = await getCountryCode();
    allActions.SubscriptionAction.getSubscriptionPlans(
      dispatch,
      "",
      API_FUN_NAMES?.getSubscriptionPlans,
      countryCode
    )
      .then((response: any) => {
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          const result = response?.data.filter(
            (item: any) => item?.duration == MEMBERSHIP_DURATION?.BASIC
          );
          const basicPlanId = result[0]?.id;
          userMoveToBasicPlan(basicPlanId, countryCode);
        }
      })
      .catch((err) => {
        logger("error_list_", err);
      });
  };
  const platformType = () => {
    if (Platform?.OS == PLATEFORM?.android) {
      return 1;
    } else {
      return 2;
    }
  };
  const userMoveToBasicPlan = async (planID: any, countryCode: any) => {
    try {
      let payload = {
        planId: planID,
        productId: "basic",
        transactionId: MEMBERSHIP_DURATION?.BASIC,
        transactionReceipt: MEMBERSHIP_DURATION?.BASIC,
        purchaseResponse: null,
        transactionDate: null,
        totalAmount: null,
        amountInUSD: null,
        currency: null,
        country: countryCode,
        platformType: platformType(),
        planType: 3,
      };
      const response =
        await allActions?.SubscriptionAction?.buySubscriptionPlan(
          payload,
          API_FUN_NAMES?.buySubscription
        );
      if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
        getSeekerPersonalInfo();
      }
    } catch (err: any) { }
  };

  const GetMobileDashboardPrompts = async () => {
    setisLoading1(true);
    let requestbody = 3;
    allActions.dashboardAction
      .GetMobileDashboardPrompts(
        dispatch,
        requestbody,
        API_FUN_NAMES?.GetMobileDashboardPrompts
      )
      .then((response: any) => {
        if (response.statusCode == STATUS_CODES?.RESPONSE_OK) {
          let filterData =
            response?.data.length > 0
              ? response?.data
                ?.filter(
                  (item: any) =>
                    !item.isRecordExist &&
                    ![
                      PrompTypeENUM?.Goals_And_Aspirations,
                      PrompTypeENUM?.Profile,
                      PrompTypeENUM?.Preferences,
                    ].includes(item?.codeName) &&
                    item?.title !== "Goals And Aspirations"
                )
                .sort(
                  (x: DataItem, y: DataItem) =>
                    new Date(x.modifiedDate) - new Date(y.modifiedDate)
                )
              : [];

          setIsWellnessPlanExsit(
            filterData.some(
              (item: any) => item.codeName === PrompTypeENUM?.WellnessPlan
            )
          );
          logger("filterData____", filterData);
          setDashboardPrompting(filterData);
          setisLoading1(false);
        } else {
          setisLoading1(false);
          ShowToast("error", "Error", response?.message);
        }
      })
      .catch((err) => {
        setisLoading1(false);
        ShowToast("error", "Error", err?.message);
      });
  };
  const getResourceLibraryData = async () => {
    setisLoading1(true);
    let requestbody = 1;
    allActions.OnBoarding.GetResourceLibraryTemplate(
      dispatch,
      requestbody,
      API_FUN_NAMES?.GetResourceLibraryTemplate
    )
      .then((response: any) => {
        if (response.statusCode == STATUS_CODES?.RESPONSE_OK) {
          setisLoading1(false);
          setResourceLibraryData(response?.data);
        } else {
          setisLoading1(false);
          ShowToast("error", "Error", response?.message);
        }
      })
      .catch((err) => {
        setisLoading1(false);
        ShowToast("error", "Error", err?.message);
      });
  };
  const GetUserMobileDashboardDetailsByDate = async () => {
    setisLoading(true);
    let requestbody;
    let data = moment(new Date()).format(DATE_FORMAT?.format_year_month_date);
    await allActions.dashboardAction
      .GetUserMobileDashboardDetailsByDate(
        dispatch,
        requestbody,
        API_FUN_NAMES?.GetUserMobileDashboardDetailsByDate,
        data
      )
      .then((response: any) => {
        setisLoading(false);
        if (response.statusCode == STATUS_CODES?.RESPONSE_OK) {
          setDashbaordData(response.data);
          setActivites(response.data.activities);
        } else {
          ShowToast("error", "Error", response?.message);
        }
      })
      .catch((err) => {
        ShowToast("error", "Error", err?.message);
      });
  };
  const GetUserMobileDashboardQuotesByDate = async () => {
    let requestbody;
    let data = moment(new Date()).format(DATE_FORMAT?.format_year_month_date);
    await allActions.dashboardAction
      .GetUserMobileDashboardQuotesByDate(
        dispatch,
        requestbody,
        API_FUN_NAMES?.GetUserMobileDashboardQuotesByDate,
        data
      )
      .then((response: any) => {
        if (response.statusCode == STATUS_CODES?.RESPONSE_OK) {
          setDailyQuotes(response?.data?.quotes);
        } else {
          ShowToast("error", "Error", response?.message);
        }
      })
      .catch((err) => {
        ShowToast("error", "Error", err?.message);
      });
  };
  const getVitalsActivityStatus = async (useInfo: any) => {
    sethealthVitalsLoader(true);
    let data = useInfo?.userId !== undefined ? `${useInfo?.userId}` : `${0}`;
    let requestbody = {};
    await allActions.addDevice
      .getVitalsActivityStatus(
        dispatch,
        requestbody,
        API_FUN_NAMES?.getVitalsActivityStatus,
        "/" + data
      )
      .then((response: any) => {
        if (response.statusCode == STATUS_CODES?.RESPONSE_OK) {
          if (
            response?.data?.bloodPressureVitalData !== null ||
            response?.data?.heartRateVitalData !== null ||
            response?.data?.sleepVitalData !== null ||
            response?.data?.stepVitalData !== null
          ) {
            setisDataAvailable(true);
          } else {
            setisDataAvailable(false);
          }
          setStats(response?.data);
          console.log("stats______response?.data_______", response?.data);

          setSystolicMaxScore(response?.data?.vitalTypesMaxScore?.systolic);
          setDiastoticMaxScore(response?.data?.vitalTypesMaxScore?.diastolic);
          setheartRateMaxScore(response?.data?.vitalTypesMaxScore?.heartRate);
          setBloodPressureMaxScore(
            response?.data?.vitalTypesMaxScore?.bloodPressure
          );
          setSleepMaxScore(response?.data?.vitalTypesMaxScore?.sleep);
          sethealthVitalsLoader(false);
        } else {
          sethealthVitalsLoader(false);
          ShowToast("error", "Error", response?.message);
        }
      })
      .catch((err) => {
        sethealthVitalsLoader(false);
        ShowToast("error", "Error", err?.message);
      });
  };
  const getHabitAPICalling = async () => {
    try {
      let requestBody = {
        TargetDate: moment().format(YYYY_MM_DD),
        PageNumber: 1,
        PageSize: 1,
        Frequency: 1,
      };

      const response = await allActions.HabitAction.getHabitsDetailsAPI(
        dispatch,
        requestBody,
        API_FUN_NAMES?.GetHabitsDetails
      );

      if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
        setHabitListData(response?.data?.habitDetails);

        if (setHabitListData) setHabitListData(response?.data?.habitDetails);
      } else {
        setHabitListData([]);
        if (setHabitListData) setHabitListData([]);
      }
    } catch (error) { }
  };
  // Function to check if all objects except vitalTypesMaxScore are empty
  const areAllOtherObjectsEmpty = (obj: any) => {
    return Object.keys(obj)
      .filter((key) => key !== vitalTypeENUM?.vitalTypesMaxScore)
      .every(
        (key) =>
          obj[key] === null ||
          (typeof obj[key] === dataTypeENUM?.object &&
            Object.keys(obj[key]).length === 0)
      );
  };
  //new code for arranging activity data in acord with schedule time
  function sortActivitiesByScheduleTime(activities: any) {
    return activities.sort((a: any, b: any) => {
      // Parse scheduleTime to a moment object with AM/PM format
      const timeA: any = moment(
        a.scheduleTime,
        DATE_FORMAT?.format_hour_minute_second
      );
      const timeB: any = moment(
        b.scheduleTime,
        DATE_FORMAT?.format_hour_minute_second
      );
      // Compare times in ascending order
      return timeA - timeB;
    });
  }
  const renderHealthDevice = () => {
    return (
      <>
        {stats !== undefined ? (
          <HealthInsights
            navigation={navigation}
            systolicMaxScore={systolicMaxScore}
            diastoticMaxScore={diastoticMaxScore}
            heartRateMaxScore={heartRateMaxScore}
            sleepMaxScore={sleepMaxScore}
            bloodPressureMaxScore={bloodPressureMaxScore}
            stats={stats}
            userData={userData}
            isDataAvailable={isDataAvailable}
            isHealthInsights={areAllOtherObjectsEmpty(stats)}
            isLoading={healthVitalsLoader}
            DailyQuotes={DailyQuotes}
          />
        ) : null}
      </>
    );
  };
  const renderActivity = () => {
    return (
      <>
        {isLoading ? (
          <ShimmerPlaceHolder
            width={width - moderateScale(50)}
            height={moderateScale(110)}
            backgroundColor={colors.darkthemeColor}
          ></ShimmerPlaceHolder>
        ) : (
          <>
            {dashboardData?.activities?.length > 0 || habitList.length > 0 ? (
              <ActivitiesList
                activitesData={sortActivitiesByScheduleTime(
                  Activites.flatMap((item: any) => {
                    const scheduleTimes: string[] = item.scheduleTime || [];
                    const statusArrayRaw = item.status;
                    const parsedStatus: string[] = statusArrayRaw
                      ? JSON.parse(statusArrayRaw)
                      : [];

                    if (!scheduleTimes.length) {
                      // Case: Empty scheduleTime
                      return [
                        {
                          ...item,
                          scheduleTime: "", // empty string
                          scheduleTimeArray: [],
                          status: parsedStatus[0] || null,
                          status2: parsedStatus,
                          computedStatus: parsedStatus[0] || null,
                        },
                      ];
                    }

                    // Case: Normal schedule with status alignment
                    const alignedStatusArray =
                      parsedStatus.length === scheduleTimes.length
                        ? parsedStatus
                        : Array(scheduleTimes.length).fill(
                          parsedStatus[0] || strings?.Not_started
                        );

                    const partialStatus =
                      (alignedStatusArray.includes(
                        ActivityComplitionStatus?.Expire
                      ) &&
                        alignedStatusArray.includes(
                          ActivityComplitionStatus?.Completed
                        )) ||
                        (alignedStatusArray.includes(
                          ActivityComplitionStatus?.Completed
                        ) &&
                          alignedStatusArray.includes(
                            ActivityComplitionStatus?.Not_started
                          ))
                        ? ActivityComplitionStatus?.Partially_Completed
                        : alignedStatusArray[0];

                    return [
                      {
                        ...item,
                        scheduleTime: scheduleTimes[0],
                        scheduleTimeArray: scheduleTimes,
                        status: alignedStatusArray[0],
                        status2: alignedStatusArray,
                        computedStatus: partialStatus,
                      },
                    ];
                  }).slice(0, 3)
                )}
                navigation={navigation}
                updateDashboardActivities={() =>
                  GetUserMobileDashboardDetailsByDate()
                }
                setHabitListData={(val: any) => setHabitListData(val)}
                habitList={habitList}
                setIsSwiping={setIsSwiping}
              />
            ) : (
              <>
                <LabelHeader
                  title={strings?.Task_Events}
                  showAll={true}
                  seelAllClick={() =>
                    navigation?.navigate(navigationString.DailyRoutine)
                  }
                />
                <View style={styles?.no_task_view}>
                  <Text style={styles?.no_task_text}>
                    {
                      "No tasks or events scheduled—use this time to breathe, explore, or just be.  To view what’s coming up, tap “See all.”"
                    }
                  </Text>
                </View>
              </>
            )}
          </>
        )}
      </>
    );
  };

  const handleOnPress = (name: any, index: any) => {
    if (subscriptionStatus) {
      switch (name?.toLowerCase()) {
        case dashboardClickENUM?.Profile.toLowerCase():
          return navigation?.navigate(navigationString.MyProfile);
        case dashboardClickENUM?.Goals_And_Aspirations.toLowerCase():
          return navigation?.navigate(navigationString.GoalsAndAspiration, {
            from: dashboardClickENUM?.Dashboard,
          });
        case strings.WellnessHeader_.toLowerCase():
          return GetOnboardingSteps(
            getWellnessGlobalData?.[0]?.globalCodeId,
            dashboardClickENUM?.planner
          );
        case strings.goal.toLowerCase():
          return getAIResp(InitialQuestions, strings.goals);
        case strings.preferences.toLowerCase():
          return navigation?.navigate(navigationString.Preferences);
        case strings.recommendations.toLowerCase():
          // return getAIResp(InitialQuestions, strings.recommendations);
          navigation?.navigate(navigationString?.QuestionForBooksAndVideo, {
            from: Enum_NavigateFrom?.Dashboard,
          });
          return;
        case strings.activities.toLowerCase():
          return getAIResp(InitialQuestions, strings.activities);
        default:
          break;
      }
    } else {
      subscriptionTitle = `${name} is premium feature`;
      setSubscriptionModal(true);
    }
  };
  const getGlobalCode = async () => {
    try {
      const getGlobalCodeData = await AsyncStorage.getItem(
        AsyncStorage.GLOBALCODEWITHCATEGORY
      );
      setAllGlobalCode(getGlobalCodeData);
      let getWellnessGlobalData = await filterCategoryData(
        JSON.parse(getGlobalCodeData),
        strings?.AIGenerationCategory
      );
      let getGlobalCodeOptionsData = await filterglobalCodeOptionsData(
        getWellnessGlobalData?.[0].globalCodeOptions,
        strings?.WellnessPlan
      );
      setgetWellnessGlobalData(getGlobalCodeOptionsData);
    } catch (error) {
      loggerMessage("Error retrieving login user data:", error);
    }
  };
  const GetOnboardingSteps = (categoryId: any, from: any) => {
    setisLoading1(true);
    setAiLoader(true);
    let requestbody = {};
    allActions.OnBoarding.GetOnboardingSteps(
      dispatch,
      requestbody,
      API_FUN_NAMES?.getOnboardingSteps,
      categoryId ?? AiSuggestionCategoryID?.Wellness_Plan //216 is default category
    )
      .then((response: any) => {
        setAiLoader(false);
        setisLoading1(false);
        if (response.statusCode == STATUS_CODES?.RESPONSE_OK) {
          if (from == dashboardClickENUM?.planner) {
            navigation.navigate(navigationString.WellnessPlanIndex, {
              wellnessQuestions: response.data,
              reqData1: InitialQuestions,
              from: dashboardClickENUM?.Dashboard,
              isWellnessPrompt: true,
            });
          }
        } else {
          ShowToast("error", "Error", response?.message);
        }
      })
      .catch((err) => {
        ShowToast("error", "Error", err?.message);
        setisLoading(false);
        setAiLoader(false);
      });
  };
  const getAIResp = async (reqData: any, type: any) => {
    setAiLoader(true);
    event.emit(eventENUM?.isAIloader, { isAiloader: true }); // Emit event when loading starts
    const catID = await getGlobalCodeOptionsId(
      JSON.parse(allGlobalCode),
      strings?.AIGenerationCategory,
      type
    );
    try {
      if (catID) {
        const requestBody = {
          categoryId: catID?.globalCodeId,
          linkRequired: false, //Need to set false, cuz we don't need url inside any recommemndation we are getting
          aiProvider: aiProvider?.Goals,
          aspNetUserId: null,
          isCategorySelected: true,
          skipCategory:
            "Give me another response from the choice of {" + `${type}` + "}.",
          stepOption: [],
        };
        const response =
          await allActions.seekerDetails.SeekerOnboardingStepAnswer(
            dispatch,
            requestBody,
            API_FUN_NAMES?.seekerOnboardingStepAnswer
          );
        if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
          if (
            response?.data?.responseType.toLowerCase() ===
            strings.goals_lower_case.toLowerCase()
          ) {
            const isGoalDataAvailable: any[] = findValueByKey(
              response,
              "goals"
            );
            if (isGoalDataAvailable?.length) {
              navigation?.navigate(navigationString?.GeneratedGoalAI, {
                goalsData: response?.data,
                reqData: reqData,
                from: dashboardClickENUM?.Dashboard,
              });
            } else {
              //If No goals is coming in AI response show toaster
              setToasterDetails({
                showToast: true,
                code: 0,
                message:
                  strings?.Zumlo_Is_Still_Thinking_About_What_Goal_Will_Suit_You_Best,
              });
            }
          } else if (
            response?.data?.responseType.toLowerCase() ===
            strings.recommendations.toLowerCase()
          ) {
            //recommendations
            const isRecommendationsDataAvailable: any[] = findValueByKey(
              response,
              "recommendations"
            );
            if (
              Array.isArray(isRecommendationsDataAvailable) &&
              isRecommendationsDataAvailable?.length
            ) {
              navigation?.navigate(
                navigationString?.GeneratedRecommendationsAI,
                {
                  recommendationsData: response?.data,
                  reqData: reqData,
                  from: dashboardClickENUM?.Dashboard,
                }
              );
            } else {
              setToasterDetails({
                showToast: true,
                code: 0,
                message:
                  strings?.Zumlo_Is_Still_Thinking_About_What_Goal_Will_Suit_You_Best,
              });
            }
          } else if (
            response?.data?.responseType.toLowerCase() ===
            strings.activities.toLowerCase()
          ) {
            const isAvctivitiesDataAvailable: any[] = findValueByKey(
              response,
              "activities"
            );
            if (isAvctivitiesDataAvailable.length) {
              navigation?.navigate(navigationString?.GeneratedActivitiesAI, {
                activitesData: response?.data,
                reqData: reqData,
                from: dashboardClickENUM?.Dashboard,
              });
            } else {
              //If No activities is coming in AI response show toaster
              setToasterDetails({
                showToast: true,
                code: 0,
                message:
                  strings?.Zumlo_Is_Still_Thinking_About_What_Activities_Will_Suit_You_Best,
              });
            }
          }
        } else {
          logger("dashboardPlanner____AI_suggestionerror2222", response);
          setToasterDetails({
            showToast: true,
            code: 0,
            message: strings?.somethingWrong,
          });
        }
      }
    } catch (error: any) {
      logger("dashboardPlanner____AI_suggestionerror", error);
      setToasterDetails({
        showToast: true,
        code: 0,
        message: strings?.somethingWrong,
      });
      loggerMessage("Error fetching AI response", error);
    } finally {
      setAiLoader(false);
      event.emit(eventENUM?.isAIloader, { isAiloader: false }); // Emit event when loading stops
    }
  };

  const onChatIcon = async () => {
    if (userData) {
      navigation.navigate(navigationString.ChatScreen, {
        userData: userData,
        from: strings?.dashboard_,
        userTokenn: userToken,
      });
    }
  };
  const renderItem = ({ item, index }: any) => {
    const backgroundImage = [
      imagePath?.DashboardPrompt_purple_1,
      imagePath?.DashboardPrompt_2,
      imagePath?.DashboardPrompt_3,
    ];
    return (
      <Pressable>
        <View
          style={[
            styles.containerCaursal,
            (item?.title === strings?.Profile ||
              item?.title === strings?.Goals_) &&
            styles.profileGoalsBorder,
          ]}
        >
          <ImageBackground
            source={backgroundImage[index % 3]}
            resizeMode={APPLY_STATUS?.stretch}
            style={[
              styles.imageBackground,
              {
                borderRadius: moderateScale(15),
              },
            ]}
          >
            <View
              style={{
                justifyContent: "center",
                height: moderateScale(270),
              }}
            >
              <Text
                style={[
                  styles.titleText,
                  styles?.titleTextConcat,
                  {
                    fontSize: textLabelSize?.titleFont,
                    color: colors?.royalOrangeDark,
                    fontWeight: "600",
                    paddingHorizontal: moderateScale(12),
                  },
                ]}
              >
                {formatSentenceCase(item?.title)}
              </Text>

              <Text
                style={[
                  styles.titleText,
                  styles?.titleTextConcat,
                  {
                    fontSize: textLabelSize?.subtTitleFont,
                    color: colors?.SurfCrest,
                    paddingHorizontal: moderateScale(12),
                  },
                ]}
              >
                {item?.description}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => handleOnPress(item?.codeName, index)}
              style={[
                styles.button,
                styles?.buttonConcat,
                {
                  backgroundColor: colors?.buttonTransparent,
                },
              ]}
            >
              <View
                style={[styles.arrowContainer, styles?.arrowContainerConcat]}
              ></View>
              <Text style={styles.buttonTextCaursal}>
                {CTAButtonWellbieng(item.codeName)}
              </Text>
              <View style={styles.arrowContainer}>
                <Image source={imagePath.ForwardArrow} />
              </View>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </Pressable>
    );
  };
  const footerAnimationButton = (type: any, title: any) => {
    if (subscriptionStatus) {
      setOpened(!isOpen);
      if (type == DashboardFooterAnimateButton?.moodTrack) {
        navigation.navigate(navigationString.TrackEmo, {
          from: dashboardClickENUM?.Dashbaord,
          socketDetails: {
            DeviceID: DeviceID,
          },
        });
      } else {
        setShowModal(true);
      }
    } else {
      subscriptionTitle = `${title} is premium feature`;
      setSubscriptionModal(true);
    }
  };

  const renderSubscriptionCard = () => {
    if (
      userInfo?.basicInformation?.isBetaUser ||
      userInfo?.basicInformation?.isOrganizationSeeker ||
      userInfo?.subscriptionPlanInfo?.duration ==
      MEMBERSHIP_DURATION?.MONTHLY ||
      userInfo?.subscriptionPlanInfo?.duration == MEMBERSHIP_DURATION?.YEARLY
    ) {
      return null;
    } else {
      return (
        <SubscriptionPlanSuggestion
          subscriptionDetail={subscriptionDetail}
          basicInformation={userInfo}
          navigation={navigation}
        />
      );
    }
  };

  return (
    <ScreenWrapper statusBarColor={colors?.backgroundTheme} isFlexNeeded={true}>
      <View style={styles?.allMainontainer}>
        <HeaderDateNotificationMassage
          currentDate={moment(currentTime).format(ddd_DD_MMM_MMM)}
          massageCount={0}
          navigation={navigation}
          onNotificationPress={() =>
            navigation?.navigate(navigationString?.NotificationScreen, {
              from: dashboardClickENUM?.Dashboard,
            })
          }
        />
        <FlatList
          data={["1"]}
          nestedScrollEnabled
          keyExtractor={(item, index) => "key" + index}
          bounces={false}
          scrollEnabled={!isSwiping}
          contentContainerStyle={styles?.flatListContainer}
          onScroll={() => {
            setOpened(false);
          }}
          renderItem={() => (
            <>
              <UserInfoWithQuates
                greetingMsg={DailyQuotes}
                userData={userData}
                isLoading={isLoading1}
                UserType={UserType}
              />

              <View
                style={{
                  paddingHorizontal: moderateScale(15),
                }}
              >
                {/* {renderSubscriptionCard()} */}

                {isLoading1 && isLoading && dashboardPrompting?.length == 0 ? (
                  <View style={styles?.alignmentCenterView}>
                    <ShimmerPlaceHolder
                      width={width - moderateScale(60)}
                      height={moderateScale(110)}
                      backgroundColor={colors.darkthemeColor}
                    />
                  </View>
                ) : (
                  <>
                    <LabelHeader
                      title={strings?.Suggestions_}
                      showAll={false}
                      seelAllClick={() => { }}
                    />

                    <View
                      style={[styles?.suggestionView, { height: height * 0.4 }]}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          if (dashboardPromptIndex > 0) {
                            setDashboardPromptIndex(dashboardPromptIndex - 1);
                          }
                        }}
                        style={{
                          opacity: dashboardPromptIndex === 0 ? 0.5 : 1,
                        }}
                        disabled={dashboardPromptIndex === 0}
                      >
                        <Image
                          source={imagePath?.forward}
                          style={styles?.imageBorder}
                        />
                      </TouchableOpacity>
                      {dashboardPrompting.map((item, index) => {
                        return (
                          <>
                            {dashboardPromptIndex === index &&
                              renderItem({ item, index })}
                          </>
                        );
                      })}
                      <TouchableOpacity
                        onPress={() => {
                          if (
                            dashboardPrompting?.some(
                              (item: any) =>
                                item?.codeName === PrompTypeENUM?.WellnessPlan
                            )
                          ) {
                            if (dashboardPromptIndex < 3) {
                              setDashboardPromptIndex(dashboardPromptIndex + 1);
                            }
                          } else if (dashboardPromptIndex < 2) {
                            setDashboardPromptIndex(dashboardPromptIndex + 1);
                          }
                        }}
                        style={{
                          opacity: isWellnessPlanExsit
                            ? dashboardPromptIndex === 3
                              ? 0.5
                              : 1
                            : dashboardPromptIndex === 2
                              ? 0.5
                              : 1,
                        }}
                        disabled={
                          isWellnessPlanExsit
                            ? dashboardPromptIndex === 3
                            : dashboardPromptIndex === 2
                        }
                      >
                        <Image
                          source={imagePath?.forward}
                          style={styles?.forwardImage}
                        />
                      </TouchableOpacity>
                    </View>
                  </>
                )}

                {renderActivity()}
                <LabelHeader
                  title={strings?.Health_insights}
                  showAll={false}
                  seelAllClick={() => { }}
                />

                {renderHealthDevice()}
                <LabelHeader
                  title={"Curated for you"}
                  showAll={false}
                  seelAllClick={() =>
                    navigation?.navigate(navigationString.DailyRoutine)
                  }
                />

                <RecommendationCard
                  navigation={navigation}
                  allRecommendations={dashboardData?.recommendations || []}
                />
                {moodJournalData?.title && (
                  <>
                    <LabelHeader
                      title={strings?.Add_Journaling}
                      showAll={false}
                      seelAllClick={() => { }}
                    />
                    <AddJournaling
                      navigation={navigation}
                      data={moodJournalData}
                    />
                  </>
                )}
                <LabelHeader
                  title={"Your daily boost"}
                  showAll={false}
                  seelAllClick={() => { }}
                />
                <AffirmationCard navigation={navigation} />

                <LabelHeader
                  title={"Create your goals"}
                  showAll={false}
                  seelAllClick={() => { }}
                />
                <CreateGoals navigation={navigation} />

                {usersIndependentGoals?.length > 0 && (
                  <>
                    <LabelHeader
                      title={"Your chosen goals"}
                      showAll={true}
                      seelAllClick={() =>
                        navigation.navigate(
                          navigationString.IndependentGoalsScreen
                        )
                      }
                    />

                    <SetYourGoals navigation={navigation} />
                  </>
                )}

                <LabelHeader
                  title={"Let's complete your story"}
                  showAll={false}
                  seelAllClick={() => { }}
                />
                <ProfileCard navigation={navigation} />

                <LabelHeader
                  title={"Tune the app to you"}
                  showAll={false}
                  seelAllClick={() => { }}
                />
                <AddWellnessPlanDetails
                  onAddWellnessPlanDetails={() => {
                    navigation.navigate(navigationString.Preferences, {
                      from: dashboardClickENUM?.Dashboard,
                    });
                  }}
                />
              </View>
            </>
          )}
        />

        <AiAnimatedButton
          isOpen={isOpen}
          setOpened={() => setOpened(!isOpen)}
          onPressMood={() =>
            footerAnimationButton(
              DashboardFooterAnimateButton?.moodTrack,
              "Mood Tracking"
            )
          }
          onMoodJournalingPress={() =>
            footerAnimationButton(
              DashboardFooterAnimateButton?.moodJournal,
              "Mood Journal"
            )
          }
        />

        <ChatWithAiButton
          onPress={() => onChatIcon()}
        />

      </View>
      {aiLoader && <CommonHealthLoader />}

      <JournalModal
        navigation={navigation}
        visible={showModal}
        setShowModal={setShowModal}
        data={moodJournalData}
      />

      <NotificationPopup
        visible={notificationModal}
        setShowModal={setNotificationModal}
      />
      <UpgradeModal
        navigation={navigation}
        visible={subscriptionModal}
        setShowModal={setSubscriptionModal}
        fromScreen={SUBSCRIPTION_NAVIGATION_FROM?.DASHBOARD}
        isPlanner={false}
        title={subscriptionTitle}
        description={IAP_Strings?.subscriptionDialogDescription}
      />

      {toasterDetails?.showToast && (
        <ToastApiResponse
          data={toasterDetails}
          setToasterDetails={setToasterDetails}
          code={toasterDetails?.code}
          message={toasterDetails?.message}
        />
      )}
      <AppUpdateModal
        visible={showUpdateModal}
        storeUrlIOS="https://apps.apple.com/us/app/your-app-id"
        storeUrlAndroid="https://play.google.com/store/apps/details?id=com.yourapp"
      />
    </ScreenWrapper>
  );
};
export default Dashboard;


