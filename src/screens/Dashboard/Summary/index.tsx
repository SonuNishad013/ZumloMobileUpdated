import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ImageBackground, ScrollView, View } from "react-native";
import allActions from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { imagePath } from "../../../assets/png/imagePath";
import SegmentedTabs from "./SegmentedTabs";
import WellnessOverviewCard from "./component/wellnessoverviewCard";
import navigationString from "../../../navigation/navigationString";
import { aiProvider, STATUS_CODES } from "../../../constant/appConstant";
import GoalsListing from "./component/GoalsListing";
import ActivityListing from "./component/ActivityListing";
import { transformIndependentGoalsFromAPI } from "./component/Hooks/transformGoalsFromAPI";
import {
  getBuySubscriptionDetail,
  getSeekerDetailsData,
  getSeekerInfoRedux,
} from "../../../redux/selector";
import moment from "moment";
import { statsMyGoals } from "./DummyData";
import Vitals from "./component/Vitals";
import * as AsyncStorage from "../../../utils/Storage/AsyncStorage";
import {
  filterCategoryData,
  filterglobalCodeOptionsData,
  getGlobalCodeOptionsId,
} from "../../../helper/getGlobalCodes";
import CommonLoader from "../../../components/Loader";
import { strings } from "../../../constant/strings";
import logger from "../../../constant/logger";
import colors from "../../../constant/colors";
import { styles } from "./Styles";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import {
  DurationFilterType,
  Enum_HabitItemIsFrom,
  Enum_NavigateFrom,
  GlobalCategoryName,
  GlobalCodeName,
  SHOW_MODAL_FOR_ENUM,
  SummaryProgressCategory,
} from "../../../constant/ENUM";
import JournalListing from "./component/JournalListing";
import { useIsFocused } from "@react-navigation/native";
import { subscriptionFun } from "../../../constant/SubscriptionPlanValidation";
import { BlurView } from "@react-native-community/blur";
import MessageLimitFinishModal from "../../ChatScreeen/MessageLimitFinishModal";
import { PLAN_IDS } from "../../../utils/PlanIds";
import { useFocusEffect } from "@react-navigation/native";
import { IAP_Strings } from "../../SubscriptionPlan/IAP_Strings";
import { activityDetails, SummaryProps } from "./type";
import JournalModal from "../../MoodTracking/Journal/JournalModal";
import SummaryVitalsOverview from "./SummaryVitalsOverview";
import HabitTrackingOverview from "./component/HabitTrackingOverview";
import { YYYY_MM_DD } from "../../../constant/dateFormatConstants";

var subscriptionStatus: any = false;
const Summary: FunctionComponent<SummaryProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const focus = useIsFocused();
  const subscriptionDetail = useSelector(getBuySubscriptionDetail());
  const getseekerInfoRedux = useSelector(getSeekerInfoRedux());
  const [journalTitle, setJournalTitle] = useState<any>({});
  const [journalData, setJournalData] = useState<any>({});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [getWellnessGlobalData, setgetWellnessGlobalData] = useState<any>();
  const [isBlur, setIsBlur] = useState(true);
  const [goalProgressData, setGoalProgressData] = useState({
    data: [],
    avgProgress: 0,
    allProgressData: { title: "", description: "" },
    apiStatus: false,
  });
  const [independentGoal, setindependentGoal] = useState({
    data: [],
    apiStatus: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [activityProgress, setactivityProgress] = useState<activityDetails>({
    details: [],
    activityArray: [],
    apiStatus: false,
  });
  const InitialQuestions = null;
  const [vitalSummaryData, setVitalSummaryData] = useState<any>([]);
  let userData = useSelector(getSeekerDetailsData());
  const [allGlobalCode, setAllGlobalCode] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDialogFor, setShowDialogFor] = useState("");
  const [habitLoader, setHabiLoader] = useState(false);
  const [habitTrackingData, sethabitTrackingData] = useState<any>(null);
  const [showHabitData, setShowHabitData] = useState(false);

  useEffect(() => {
    getGlobalCode();
  }, []);

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

  useFocusEffect(
    React.useCallback(() => {
      getSeekerPersonalInfo();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      if (selectedIndex === 0) {
        GetUserWellnessPlanProgress();
      }
      if (selectedIndex === 1) {
        GetUserGoalProgress();
      }
      if (selectedIndex === 2) {
        GetUserActivityProgress();
      }
      if (selectedIndex === 3) {
        getVitalSummary_API_Response();
      }

      if (selectedIndex === 4) {
        getUserJournalsProgress();
      }
      if (selectedIndex === 5) {
        getHabitOverview();
      }
    }, [selectedIndex])
  );

  useEffect(() => {
    fetchMoodJournalingAPI();
  }, []);
  const getHabitOverview = async () => {
    setHabiLoader(true);
    try {
      const request = {
        startDate: moment().startOf("month").format(YYYY_MM_DD),
        endDate: moment().endOf("month").format(YYYY_MM_DD),
      };
      const response =
        await allActions?.HabitAction?.getHabitTrackingForGraphAPI(
          request,
          API_FUN_NAMES?.getHabitTrackingForGraphAPI
        );
      logger("response___", response?.data);
      if (response) {
        setHabiLoader(false);
      }
      if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
        // logger("response___", response);
        if (
          response?.data?.totalHabitsTracked > 0 &&
          response?.data.hasOwnProperty("monthDetails")
        ) {
          setShowHabitData(true);
          sethabitTrackingData(response?.data);
        } else {
          setShowHabitData(false);
        }
      }
    } catch (error) {
      setHabiLoader(false);
    }
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
        setJournalTitle(response?.data);
      }
    } catch (err) {
      console.error("Error fetching dynamic prompting question:", err);
    }
  };

  const getUserJournalsProgress = async () => {
    setIsLoading(true);
    try {
      const params = "";
      const response =
        await allActions.wellnessProgress.GetMoodJournalingGraphDetails(
          dispatch,
          {},
          API_FUN_NAMES?.GetUserSkippedCategory,
          params
        );
      logger("journalData___", response?.data);
      setIsLoading(false);
      if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
        setJournalData(response?.data);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getSeekerPersonalInfo = async () => {
    let userId = 0;
    let requestbody = {};
    allActions.seekerDetails
      .GetSeekerPersonalInfo(
        dispatch,
        requestbody,
        API_FUN_NAMES?.getSeekerPersonalInfo,
        userId
      )
      .then((response: any) => {
        if (response.statusCode == 200) {
          if (!subscriptionStatus) {
            setTimeout(() => {
              if (
                response.data?.subscriptionPlanInfo?.productId ==
                  PLAN_IDS?.BASIC_PLAN ||
                response.data?.subscriptionPlanInfo == null
              ) {
                setShowDialogFor(SHOW_MODAL_FOR_ENUM?.SUBSCRIPTION);
                setShowModal(true);
              }
            }, 1000);
          }
        }
      })
      .catch((err) => {});
  };

  const getGlobalCode = async () => {
    try {
      const getGlobalCodeData = await AsyncStorage.getItem(
        AsyncStorage.GLOBALCODEWITHCATEGORY
      );
      setAllGlobalCode(getGlobalCodeData);
      let getWellnessGlobalData = await filterCategoryData(
        JSON.parse(getGlobalCodeData),
        GlobalCategoryName?.AIGenerationCategory
      );

      let getGlobalCodeOptionsData = await filterglobalCodeOptionsData(
        getWellnessGlobalData?.[0].globalCodeOptions,
        GlobalCodeName?.WellnessPlan
      );
      setgetWellnessGlobalData(getGlobalCodeOptionsData);
    } catch (error) {
      logger("Error retrieving login user data:", error);
    }
  };

  const getVitalSummary_API_Response = () => {
    let requestbody = {};
    allActions.addDevice
      .getVitalSummary(dispatch, requestbody, API_FUN_NAMES?.getVitalSummary)
      .then((response: any) => {
        if (response.statusCode === 200) {
          if (response?.data?.healthVitalSummary) {
            // Check if healthVitalSummary exists in the response
            let data_: any[] = []; // Initialize an empty array to store the required values
            // Iterate over the keys of healthVitalSummary
            Object.entries(response.data.healthVitalSummary).forEach(
              ([key, value]: [string, any]) => {
                if (key !== "vitalTypesMaxScore" && value?.vitalUnit) {
                  data_.push(value); // Add the object to the array
                }
              }
            );
            logger("data_____", data_);
            data_?.length > 0 && setVitalSummaryData(data_); // Update the state with the filtered data
          }
        } else {
        }
      })
      .catch((err: any) => {});
  };

  const GetUserActivityProgress = async () => {
    setIsLoading(true);
    const req = new URLSearchParams({
      filter: `${DurationFilterType?.For_OverAll}`,
      aiProvider: `${aiProvider.Goals}`,
      category: `${SummaryProgressCategory.Activity}`,
    }).toString();

    try {
      let response =
        await allActions?.wellnessProgress?.GetUserActivityProgress(
          dispatch,
          null,
          API_FUN_NAMES?.GetUserActivityProgress,
          req
        );

      setIsLoading(false);
      if (response.statusCode === 200) {
        setactivityProgress({
          details: response?.data,
          activityArray: response?.data?.activityProgressDetails,
          apiStatus: true, // Ensure apiStatus is included
        });
      } else {
        setactivityProgress({
          details: [],
          activityArray: [],
          apiStatus: false,
        });
      }
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      logger("finally");
    }
  };
  const GetUserWellnessPlanProgress = async () => {
    setIsLoading(true);
    const req = new URLSearchParams({
      graphFilter: `${DurationFilterType?.For_OverAll}`,
      aiProvider: `${aiProvider.Goals}`,
      category: `${SummaryProgressCategory?.WellnessPlan}`,
    }).toString();
    try {
      const response =
        await allActions.wellnessProgress.GetUserWellnessPlanProgress(
          dispatch,
          {},
          API_FUN_NAMES?.GetUserSkippedCategory,
          req
        );
      setIsLoading(false);
      if (response.statusCode === 200) {
        const colors = ["#FFB64D", "#4DB38E", "#553D67", "#A66DD4", "#4DA6FF"]; // Add more if needed
        const goalData = response?.data?.wellnessProgress?.goalProgressOverview;
        const allProgressData =
          response?.data?.wellnessProgress?.progressStatus;
        const data = response?.data?.wellnessProgress?.goalProgressOverview.map(
          (goal: any, index: number) => ({
            color: colors[index % colors.length], // Safe dynamic coloring
            progress: goal?.progressSummary?.overallGoalProgressInPercentage,
          })
        );

        const totalProgress = goalData.reduce(
          (sum: any, goal: any) =>
            sum + goal?.progressSummary?.overallGoalProgressInPercentage,
          0
        );

        const avgProgress =
          goalData.length > 0 ? totalProgress / goalData.length : 0;

        setGoalProgressData({
          data,
          avgProgress,
          allProgressData,
          apiStatus: true,
        });
      } else {
        setGoalProgressData({
          data: [],
          avgProgress: 0,
          allProgressData: { title: "", description: "" },
          apiStatus: false,
        });
      }
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      logger("finally");
    }
  };

  const GetUserGoalProgress = async () => {
    setIsLoading(true);
    const req = new URLSearchParams({
      filter: `${DurationFilterType?.For_OverAll}`,
      aiProvider: aiProvider?.Goals,
      category: `${SummaryProgressCategory?.Goals}`,
    }).toString();
    try {
      const response = await allActions.wellnessProgress.GetUserGoalProgress(
        dispatch,
        {},
        API_FUN_NAMES?.GetUserSkippedCategory,
        req
      );
      setIsLoading(false);

      if (response.statusCode === 200) {
        let data = transformIndependentGoalsFromAPI(response);

        setindependentGoal({
          data: data,
          apiStatus: true,
        });
      } else {
        setindependentGoal({
          data: [],
          apiStatus: false,
        });
      }
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      logger("finally");
    }
  };

  const renderWellnessOverview = () => {
    return (
      <View>
        <WellnessOverviewCard
          goalProgressData={goalProgressData}
          isWellnessplan={goalProgressData?.apiStatus}
          onShowMore={() => {
            navigation.navigate(navigationString.WellnessOverviewDetails);
          }}
          processWellnessPlan={() =>
            GetOnboardingSteps(
              getWellnessGlobalData?.[0]?.globalCodeId,
              "planner"
            )
          }
          showOnStaging={true}
        />
      </View>
    );
  };
  const renderGoalProgress = () => {
    return (
      <GoalsListing
        GoalsListingData={independentGoal}
        navigation={navigation}
        goalClick={() => getAIResp(InitialQuestions, strings.goals)}
        showOnStaging={true}
      />
    );
  };
  const renderActivityProgress = () => {
    return (
      <ActivityListing
        ActivityListingData={activityProgress?.details?.activityProgressDetails}
        navigation={navigation}
        activityClick={() =>
          getAIResp(InitialQuestions, strings.activities_lower_case)
        }
        showOnStaging={true}
      />
    );
  };
  const renderVitalProgress = () => {
    logger("vitalSummaryData_____", vitalSummaryData);
    return (
      <>
        {vitalSummaryData?.length === 0 ? (
          <Vitals
            addDevice={() =>
              navigation.navigate(navigationString.AddDevice, {
                from: Enum_NavigateFrom?.SummaryTab,
              })
            }
            AddVitalManual={() =>
              navigation.navigate(navigationString.AddManualReading, {
                userData,
                isDataAvailable: false,
                from: Enum_NavigateFrom?.SummaryTab,
              })
            }
          />
        ) : (
          <>
            <SummaryVitalsOverview
              userData={userData}
              navigation={navigation}
            />
          </>
        )}
      </>
    );
  };
  const renderJournals = () => {
    return (
      <JournalListing
        onShowMore={() =>
          navigation?.navigate(navigationString?.JournalsOverview, {
            data: journalData,
            isFrom: "Summary",
          })
        }
        data={journalData}
        addJournal={() => {
          setShowDialogFor(SHOW_MODAL_FOR_ENUM?.JOURNAL);
          setShowModal(true);
        }}
        navigation={navigation}
      />
    );
  };

  const renderHabits = () => {
    return (
      <HabitTrackingOverview
        isLoading={habitLoader}
        hasData={showHabitData}
        habitOverviewData={habitTrackingData}
        navigation={navigation}
        addJournal={() => {
          navigation?.navigate(navigationString?.AddHabitForm, {
            isFrom: Enum_HabitItemIsFrom?.HABITPROGRESS,
          });
        }}
      />
    );
  };

  const GetOnboardingSteps = (categoryId: any, from: any) => {
    setIsLoading(true);
    let requestbody = {};
    allActions.OnBoarding.GetOnboardingSteps(
      dispatch,
      requestbody,
      API_FUN_NAMES?.getOnboardingSteps,
      categoryId ?? 216
    )
      .then((response: any) => {
        setIsLoading(false);
        if (response.statusCode == 200) {
          navigation.navigate(navigationString.WellnessPlanIndex, {
            wellnessQuestions: response.data,
            reqData1: InitialQuestions,
            from: Enum_NavigateFrom?.SummaryTab,
            isWellnessPrompt: true,
          });
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const getAIResp = async (reqData: any, type: any) => {
    setIsLoading(true);
    const catID = await getGlobalCodeOptionsId(
      JSON.parse(allGlobalCode),
      GlobalCategoryName?.AIGenerationCategory,
      type
    );

    try {
      if (catID) {
        const requestBody = {
          categoryId: catID?.globalCodeId,
          linkRequired: false,
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

        if (response?.statusCode === 200) {
          if (
            response?.data?.responseType.toLowerCase() ===
            strings.goals_lower_case.toLowerCase()
          ) {
            navigation?.navigate(navigationString?.GeneratedGoalAI, {
              goalsData: response?.data,
              reqData: reqData,
              from: Enum_NavigateFrom?.SummaryTab,
            });
          } else if (
            response?.data?.responseType.toLowerCase() ===
            strings.recommendations.toLowerCase()
          ) {
            navigation?.navigate(navigationString?.GeneratedRecommendationsAI, {
              recommendationsData: response?.data,
              reqData: reqData,
              from: Enum_NavigateFrom?.SummaryTab,
            });
          } else if (
            response?.data?.responseType.toLowerCase() ===
            strings.activities.toLowerCase()
          ) {
            navigation?.navigate(navigationString?.GeneratedActivitiesAI, {
              activitesData: response?.data,
              reqData: reqData,
              from: Enum_NavigateFrom?.SummaryTab,
            });
          }
        }
      }
    } catch (error: any) {
      logger("Error fetching AI response", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* <WorkInProgress //Remove this code when the work is completed
      /> */}
      <ImageBackground
        source={imagePath.SummaryBackgroundImage}
        style={{ flex: 1 }}
      >
        <View style={styles?.scrollViewContainer}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            style={styles?.scrollViewStyle}
          >
            <SegmentedTabs
              selectedIndex={selectedIndex}
              onTabPress={(index) => setSelectedIndex(index)}
            />
          </ScrollView>
          <ScrollView>
            {selectedIndex === 0 && renderWellnessOverview()}
            {selectedIndex === 1 && renderGoalProgress()}
            {selectedIndex === 2 && renderActivityProgress()}
            {selectedIndex === 3 && renderVitalProgress()}
            {selectedIndex === 4 && renderJournals()}
            {selectedIndex === 5 && renderHabits()}
          </ScrollView>
        </View>
        {!isBlur && (
          <View style={styles?.blurViewContainer}>
            <BlurView
              style={styles?.blurViewStyle}
              blurType="light"
              blurAmount={1}
              reducedTransparencyFallbackColor={colors?.white}
            />
          </View>
        )}

        {showDialogFor == SHOW_MODAL_FOR_ENUM?.SUBSCRIPTION && (
          <MessageLimitFinishModal
            navigation={navigation}
            visible={showModal}
            setShowModal={setShowModal}
            title={IAP_Strings?.progressTrack_title}
            detail={IAP_Strings?.progressTrack_desc}
          />
        )}

        {isLoading && <CommonLoader />}

        {showDialogFor == SHOW_MODAL_FOR_ENUM?.JOURNAL && (
          <JournalModal
            navigation={navigation}
            visible={showModal}
            setShowModal={setShowModal}
            data={journalTitle}
            isFrom={"Summary"}
          />
        )}
      </ImageBackground>
    </>
  );
};

export default Summary;
