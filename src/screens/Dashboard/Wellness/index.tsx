import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  BackHandler,
  StyleSheet,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import CommonHeader from "../../../components/Header/commonHeader";
import { strings } from "../../../constant/strings";
import {
  moderateScale,
  textScale,
} from "../../../constant/responsiveStyle";
import ReviewPlans from "./ReviewPlans";
import { imagePath } from "../../../assets/png/imagePath";
import WellnessPlansList from "./WellnessPlansList";
import { styles } from "./styles";
import WellnessCompleted from "../../ExplorerWelcome/WellnessCompleted";
import allActions from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import MyBlurList from "../Planner/MyBlurList";
import {
  calculateActivitySubmissions,
  calculatePercentageScores,
  funtransformDataToKeyValueArray,
} from "./helperFunctions";
import CommonLoader from "../../../components/Loader";
import { useFocusEffect } from "@react-navigation/native";
import * as AsyncStorage from "../../../utils/Storage/AsyncStorage";
import AiAnimatedButton from "../Planner/AiAnimatedButton";
import ChatWithAiButton from "../../../components/Buttons/ChatWithAiButton";
import navigationString from "../../../navigation/navigationString";
import onBoardingTypes from "../../../redux/types/onBoardingTypes";
import moment from "moment";
import * as AsyncStore from "../../../utils/Storage/AsyncStorage";
import useDynamicPromptingHub from "../../../components/Hooks/getSignalRConnectionETL";
import DeviceInfo from "react-native-device-info";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import { BlurView } from "@react-native-community/blur";
import MessageLimitFinishModal from "../../ChatScreeen/MessageLimitFinishModal";
import { subscriptionFun } from "../../../constant/SubscriptionPlanValidation";
import {
  getBuySubscriptionDetail,
  getSeekerInfoRedux,
} from "../../../redux/selector";
var subscriptionStatus: any = false;
import { useIsFocused } from "@react-navigation/native";
import { PLAN_IDS } from "../../../utils/PlanIds";
import { IAP_Strings } from "../../SubscriptionPlan/IAP_Strings";
import JournalModal from "../../MoodTracking/Journal/JournalModal";
import { aiProvider } from "../../../constant/appConstant";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import { Enum_SkipCategory } from "../../../constant/ENUM";

interface Props {
  navigation?: any;
  route?: any;
}

const WellnessOverview: React.FC<Props> = ({ navigation, route }) => {
  const focus = useIsFocused();
  const subscriptionDetail = useSelector(getBuySubscriptionDetail());
  const getseekerInfoRedux = useSelector(getSeekerInfoRedux());
  const [overviewData, setOverviewData] = useState<any>();
  const [graphData, setGraphData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [skipCategoriesLoader, setSkipCategoriesLoader] = useState(true);
  const [skipCategories, setSkipCategories] = useState<any>([]);
  const [currentPlan, setCurrentPlan] = useState<number>(0);
  const [wellnessPlanList, setWellnessPlanList] = useState<any[]>([]);
  const [allData, setallData] = useState<any>();
  const [UserType, setUserType] = useState<any>();
  const [isOpen, setOpened] = useState<boolean>(false);
  const [userData, setuserData] = useState<any>();
  const [isLoading1, setisLoading1] = useState(false);
  const [retry, setRetry] = useState(0);
  const [selected, setSelected] = useState("Week");
  const [userToken, setuserToken] = useState<any>();
  const [aiLoader, setAiLoader] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });
  const [isBlur, setIsBlur] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showJournalModal, setShowJournalModal] = useState(false);
  const [moodJournalData, setMoodJournalData] = useState<any>({});
  const [DeviceID, setDeviceID] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [isReadyForDynamicPrompting, setIsReadyForDynamicPrompting] =
    useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      subscriptionStatus = await subscriptionFun(
        subscriptionDetail,
        getseekerInfoRedux
      );
      if (subscriptionStatus) {
        setIsBlur(subscriptionStatus);
      } else {
        setIsBlur(false);
      }
    };
    init();
  }, [subscriptionDetail, focus]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      strings?.hardwareBackPress,
      () => {
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setOpened(false);
      fetchMoodJournalingAPI();
      return () => {
        setOpened(false);
      };
    }, [])
  );
  const filterKeys = useMemo(
    () => [
      "activityFeedbackResponse",
      "goalProgress",
      "startDate",
      "dailyActivities",
      "wellnessPlan",
      "wellnessPlanGraph",
    ],
    []
  );
  //user details and signal r connection

  useEffect(() => {
    async function fetchData() {
      const response = await DeviceInfo.getUniqueId();
      setDeviceID(response);
    }
    fetchData();
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
  const GetRegenereateWellnessPlanSteps = async (id: any) => {
    try {
      setisLoading(true);
      let requestbody = {};
      await allActions.OnBoarding.GetRegenerateOnboardingDetails(
        //Getting feedback question for regenrating wellness plan like when user click on show me more in wellness plan detail and give recommendation and give feedbacks
        dispatch,
        requestbody,
        "GetGlobalCodesByCategoryName",
        216
      )
        .then((res) => {
          console.log("res for get all questions==>", res);
          if (res?.statusCode == 200) {
            // Filter data for feedback and recommendations
            let feedBackData = res.data.filter(
              (res: any) => res.regenerationStepTypeId == 214
            );
            AsyncStorage?.storeItemKey(
              AsyncStorage?.WELLNESS_PLAN_ID_AND_REGENERATE_ID,
              JSON?.stringify({
                wellnessPlanId: id,
                isWellPlanIDRequired: true,
              })
            ); //For saving wellnesss plan ID and isWellPlanIDRequired true for regenrated from wellbieng tab user wants to regenrate the wellness plan.
            navigation.navigate(navigationString.GiveFeedback, {
              data: feedBackData,
              from: navigationString.WellnessOverview,
              headerName: "Give feedback",
              newString: "",
              wellnessPlanId: id,
              isWellPlanIDRequired: true,
            });
            if (!feedBackData.length) {
              setToasterDetails({
                showToast: true,
                code: 0,
                message: "No data available for feedback and recommendations.",
              });
            }

            setisLoading(false);
          }
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          setToasterDetails({
            showToast: true,
            code: 0,
            message: "No data available for feedback and recommendations.",
          });
          setisLoading(false);
        });
    } catch (error) {
      setToasterDetails({
        showToast: true,
        code: 0,
        message: "No data available for feedback and recommendations.",
      });
      console.error("Unexpected error:", error);
      setisLoading(false);
    }
  };
  // Fetch user details once on component mount
  useEffect(() => {
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
  const { connection, isConnected, connectionId } = useDynamicPromptingHub(
    isReadyForDynamicPrompting ? userDetails?.token : null,
    isReadyForDynamicPrompting ? userDetails?.userId : null
  );

  // Additional effect to react to connection status changes
  useEffect(() => {
    if (isConnected) {
    }
  }, [isConnected, connectionId]);

  useEffect(() => {
    getUserToken();
  }, []);
  const getUserToken = async () => {
    let bearerToken = await AsyncStore.getItem(AsyncStore.ACCESS_TOKEN);
    setuserToken(bearerToken);
  };
  useFocusEffect(
    React.useCallback(() => {
      getWellnessData();
      clearSavedReduxData();
    }, [])
  );
  useEffect(() => {
    if (retry > 0) {
      getWellnessData();
    }
  }, [retry]);

  const getWellnessData = async () => {
    setLoading(true);
    await Promise.all([
      GetWellnessOverview("Week"), //here is the issue if this comes empty then it will gone couse problem if user
      getSkippedCategory(),
      getWellnessPlanDetails(),
      getLoginUserTyep(),
      getSeekerPersonalInfo(),
    ]);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
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

  const getLoginUserTyep = async () => {
    let loginType = await AsyncStorage.getItem(AsyncStorage.ISPLANNER_USER);
    setUserType(JSON.parse(loginType));
    let parsedLoginType = JSON.parse(loginType);
  };

  const getSeekerPersonalInfo = async () => {
    let userId = 0;
    setisLoading1(true);

    let requestbody = {};
    allActions.seekerDetails
      .GetSeekerPersonalInfo(
        dispatch,
        requestbody,
        "getSeekerPersonalInfo",
        userId
      )
      .then((response: any) => {
        if (response.statusCode == 200) {
          setisLoading1(false);

          setuserData(response.data);

          if (!subscriptionStatus) {
            setTimeout(() => {
              if (
                response.data?.subscriptionPlanInfo?.productId ==
                PLAN_IDS?.BASIC_PLAN ||
                response.data?.subscriptionPlanInfo == null
              ) {
                setShowModal(true);
              }
            }, 3000);
          }
        } else {
          setisLoading1(false);
        }
      })
      .catch((err) => {
        setisLoading1(false);
      });
  };
  useEffect(() => {
    GetWellnessOverview(selected);
  }, [selected]);
  const GetWellnessOverview = async (selected: any) => {
    const date = moment(new Date()).format("YYYY-MM-DD");
    let req = `?targetDate=${date}&GoalsTimePeriod=${selected == "Week" ? 1 : selected == "Month" ? 2 : 3
      }`;
    // let params = apiConstant().GetWellnessOverview + req
    const response = await allActions.dashboardAction.GetWellnessOverview(
      dispatch,
      {},
      "GetWellnessOverview",
      req
    );

    if (response.statusCode === 200) {
      if (Object.keys(response?.data).length < 1) {
        return; // return this function if response data comes with empty object
      }
      setallData(response?.data); //
      const Myresult = calculateActivitySubmissions(
        response?.data?.dailyActivities //daily activity data filtered here
      );
      const DatewiseScore = Myresult && calculatePercentageScores(Myresult);
      setGraphData(DatewiseScore);
      setOverviewData(
        funtransformDataToKeyValueArray(response?.data, filterKeys)
      );
    } else {
    }
  };

  const getSkippedCategory = async () => {
    try {
      const response = await allActions.seekerDetails.GetUserSkippedCategory(
        dispatch,
        {},
        "GetUserSkippedCategory"
      );

      if (response.statusCode === 200) {
        const filteredData = response?.data?.filter(
          (item: any) =>
            !item?.isSkip &&
            !["Goals And Aspiration", "Profile", "Preferences"].includes(
              item?.codeName
            )
        );

        setSkipCategories(filteredData.length !== 0 ? filteredData : [1]);
      } else {
      }
    } catch (error) {
    } finally {
      setSkipCategoriesLoader(false);
    }
  };

  const getWellnessPlanDetails = async () => {
    try {
      const response = await allActions.seekerDetails.GetWellnessPlanDetails(
        dispatch,
        {},
        "getWellnessPlanDetails"
      );
      if (response.statusCode === 200 || response.statusCode === 201) {
        if (Array.isArray(response?.data)) {
          setWellnessPlanList(response.data);
        }
      } else {
      }
    } catch (error) { }
  };

  const RenderHeader = () => (
    <View style={styles.headerContainer}>
      <CommonHeader
        onBackPress={() => navigation?.goBack()}
        headerName={strings?.WellnessOverview}
        iconContainer={styles.headerIconContainer}
        textStyle={styles.headerText}
        isBackIcon={false}
        mainContainer={styles.headerMainContainer}
      />
    </View>
  );

  const memoizedWellnessPlanDetails = useMemo(
    () => (
      <WellnessPlansList
        wellnessPlanList={wellnessPlanList}
        navigation={navigation}
        onScroll={() => setOpened(false)}
        onRegerateWellnessPlan={(id: any) => {
          GetRegenereateWellnessPlanSteps(id);
        }}
        setToasterDetails={(val) => {
          setToasterDetails(val);
        }}
        getWellnessPlanDetails={getWellnessPlanDetails}
        setIsLoading={setisLoading}
      />
    ),
    [wellnessPlanList]
  );

  const wellnessPlan = [
    {
      id: 1,
      icon: imagePath?.HeartIcon,
      title: "View current wellness progress",
      isSelected: true,
    },
    {
      id: 2,
      icon: imagePath?.ListIcon,
      title: "Plans details",
      isSelected: false,
    },
  ];

  return (
    <>
      <ScreenWrapper statusBarColor={colors?.prussianBlue} isFlexNeeded={true}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: colors?.prussianBlue,
              // currentPlan === 0 ? colors?.prussianBlue : colors?.SurfCrest,
            },
          ]}
        >
          {loading || skipCategoriesLoader ? (
            <CommonLoader />
          ) : (
            <>
              {skipCategories.length !== 0 ? (
                <>
                  {skipCategories?.some(
                    (item: any) =>
                      item.codeName === Enum_SkipCategory?.WellnessPlan
                  ) ? (
                    <MyBlurList
                      navigation={navigation}
                      skipCategories={skipCategories}
                      onScroll={() => setOpened(false)}
                      isLoader={(val: any) => setAiLoader(val)}
                      setToasterDetails={(val: any) => setToasterDetails(val)}
                    />
                  ) : (
                    <>
                      <View
                        style={{
                          backgroundColor: colors?.polishedPineOP2,
                          borderBottomEndRadius: moderateScale(30),
                          borderBottomStartRadius: moderateScale(30),
                        }}
                      >
                        <RenderHeader />
                        <ReviewPlans
                          wellnessPlan={wellnessPlan}
                          currentPlanIndex={currentPlan}
                          currentIndex={setCurrentPlan}
                          titleStyle={{
                            color: colors?.SurfCrest,
                          }}
                        />
                      </View>
                      <FlatList
                        data={["1"]}
                        keyExtractor={(item, index) => "key" + index}
                        showsVerticalScrollIndicator={false}
                        style={{ marginHorizontal: moderateScale(15) }}
                        onScroll={() => setOpened(false)}
                        renderItem={() => (
                          <>
                            {currentPlan === 0 ? (
                              <>
                                <WellnessCompleted
                                  navigation={navigation}
                                  graphData={graphData ? graphData : {}}
                                  overviewData={
                                    overviewData ? overviewData : []
                                  }
                                  dailyActivities={
                                    allData?.dailyActivities
                                      ? allData?.dailyActivities
                                      : []
                                  }
                                  goals={allData?.wellnessPlan?.goals}
                                />
                              </>
                            ) : (
                              memoizedWellnessPlanDetails
                            )}
                          </>
                        )}
                        contentContainerStyle={{
                          paddingBottom: moderateScale(120),
                        }}
                      />
                    </>
                  )}
                </>
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: colors?.SurfCrest,
                      padding: moderateScale(19),
                      borderRadius: moderateScale(15),
                    }}
                  >
                    <Text
                      style={{
                        fontSize: textScale(15),
                        color: colors?.prussianBlue,
                      }}
                    >
                      {"Oops! Something went wrong please click on retry"}
                    </Text>
                    <TouchableOpacity
                      onPress={() => setRetry(retry + 1)}
                      style={{
                        justifyContent: "center",
                        alignSelf: "center",
                        marginTop: moderateScale(15),
                        backgroundColor: colors?.backgroundTheme,
                        borderRadius: moderateScale(10),
                      }}
                    >
                      <Text
                        style={{
                          marginHorizontal: 20,
                          marginVertical: 10,
                          color: colors?.SurfCrest,
                        }}
                      >
                        {"Retry"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </>
          )}
        </View>

        <AiAnimatedButton
          isOpen={isOpen}
          setOpened={() => (aiLoader ? null : setOpened(!isOpen))}
          onPressMood={() =>
            navigation.navigate(navigationString.TrackEmo, {
              from: "wellbieng",
              socketDetails: {
                connectionId: connectionId,
                connection: connection,
                userData: userDetails,
                DeviceID: DeviceID,
              },
            })
          }
          onMoodJournalingPress={() => setShowJournalModal(true)}
          mainButton={{
            opacity: aiLoader ? 0.5 : 1,
          }}
        />
        <ChatWithAiButton
          onPress={() => {
            if (!aiLoader) {
              navigation.navigate(navigationString.ChatScreen, {
                userData: userData,
                from: "Wellbeing",
                userTokenn: userToken,
              });
            }
          }}
        />
        {isLoading && <CommonLoader />}
        {toasterDetails?.showToast && (
          <ToastApiResponse
            data={toasterDetails}
            setToasterDetails={setToasterDetails}
            code={toasterDetails?.code}
            message={toasterDetails?.message}
          />
        )}
        <JournalModal
          navigation={navigation}
          visible={showJournalModal}
          setShowModal={setShowJournalModal}
          data={moodJournalData}
          isFrom={"Wellbeing"}
        />
      </ScreenWrapper>

      {!isBlur && (
        <View style={styles?.blurView}>
          <BlurView
            style={{ ...StyleSheet.absoluteFillObject }}
            blurType="light"
            blurAmount={1}
            reducedTransparencyFallbackColor="white"
          />
        </View>
      )}

      <MessageLimitFinishModal
        navigation={navigation}
        visible={showModal}
        setShowModal={setShowModal}
        title={IAP_Strings?.wellbeing_tab_title}
        detail={IAP_Strings?.wellbeing_tab_desc}
      />
    </>
  );
};

export default WellnessOverview;
