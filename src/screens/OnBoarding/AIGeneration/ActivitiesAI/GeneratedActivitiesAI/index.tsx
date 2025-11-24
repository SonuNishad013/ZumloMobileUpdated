import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import ScreenWrapper from "../../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../../constant/colors";
import { styles } from "./styles";
import CommonHeader from "../../../../../components/Header/commonHeader";
import { moderateScale } from "../../../../../constant/responsiveStyle";
import { imagePath } from "../../../../../assets/png/imagePath";
import * as AsyncStorage from "../../../../../utils/Storage/AsyncStorage";
import ActivitesTaskCardOnBoarding from "../../../../../components/OnBoardiingComponents/ActivitesTaskCardOnBoarding";
import navigationString from "../../../../../navigation/navigationString";
import { event } from "../../../../../navigation/emitter";
import {
  filterCategoryData,
  filterglobalCodeOptionsData,
} from "../../../../../helper/getGlobalCodes";
import allActions from "../../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

import CommonLoader from "../../../../../components/Loader";
import { strings } from "../../../../../constant/strings";
import {
  alertTypes,
  categoryName,
  codeName,
} from "../../../../../constant/AllGlobalNameConstant";
import UserInfoWithHealthStatusSummary from "../../CommonScreen/CommonComponents/UserInfoWithhealthStatusSummary";
import BottomButtons from "../../CommonScreen/CommonComponents/BottomButtons";
import CommonAlert from "../../../../../components/CommonAlert/CommonAlert";
import { capitalizeFirstLetter } from "../../../../../constant/CustomHook/CommonFunctions";
import appConstant, {
  discardActivityEnums,
} from "../../../../../constant/appConstant";
import { UpdateUserSkippedCategory } from "../../../../../helper/commonApi";
import { CommonActions } from "@react-navigation/native";
import EditActivitiesGoalsAlert from "../../../../../components/Alerts/EditActivitiesGoalsAlert";
import ToastApiResponse from "../../../../../components/Toast/ToastApiResponse";
import { getConflictingActivities } from "../../../../../helper/amendDataHelper";
import { subscriptionFun } from "../../../../../constant/SubscriptionPlanValidation";
import {
  getBuySubscriptionDetail,
  getSeekerInfoRedux,
} from "../../../../../redux/selector";
import UpgradeModal from "../../../../SubscriptionPlan/UpgradeModal";
import {
  Enum_NavigateFrom,
  SUBSCRIPTION_NAVIGATION_FROM,
} from "../../../../../constant/ENUM";
import { IAP_Strings } from "../../../../SubscriptionPlan/IAP_Strings";
import { getStartEndTimeByActivities } from "../../../../../helper/duration";
var subscriptionStatus: any = false;

interface Props {
  navigation?: any;
  route?: any;
}

const GeneratedActivitiesAI: React.FC<Props> = ({ navigation, route }) => {
  const {
    activitesData,
    reqData,
    from,
    newString,
    purpuse,
    ExistingID,
    editingFor,
    replcaeApiPayload,
    oldActivityData,
  } = route?.params;
  console.log("activitesDataactivitesDataactivitesData", activitesData);
  const dispatch: any = useDispatch();
  const subscriptionDetail = useSelector(getBuySubscriptionDetail());
  const getseekerInfoRedux = useSelector(getSeekerInfoRedux());
  let scrollViewRef: any = null;
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [reAnswer, setReAnswer] = useState(route?.params?.anserData);
  const [data, setData] = useState<any>([]);
  const [isCheck, setIsCheck] = useState<boolean[]>([false]);
  const [editModal, setEditModal] = useState(false);
  const [trackId, setTrackId] = useState<string>("");
  const [aiGeneratedResponse, setAiGeneratedResponse] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });
  const [modalData, setModalData] = useState<any>({
    type: alertTypes?.editGoalsActivities,
    onFirstPress: () => {},
    onSecondPress: () => {},
    cancelButtonPress: () => {},
    isAlertIcon: false,
  });
  const [activitiesGlobalCode, setActivitiesGlobalCode] = useState<
    number | null
  >(null);
  const [exitAlert, setExitAlert] = useState(false);

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
    const backHandler = BackHandler.addEventListener(
      strings?.hardwareBackPress,
      () => {
        setExitAlert(true);
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);
  const handleScrollToTop = () => {
    if (scrollViewRef) {
      scrollViewRef?.scrollTo({ x: 0, y: 0, animated: true });
    }
  };

  useEffect(() => {
    isUserLoginToken();
    getGlobalCode();
    getLoginUserTyep();
  }, []);
  console.log("from====-=-=-=-=-=>", reqData, from);

  useEffect(() => {
    setReAnswer(route?.params?.anserData);
  }, [route?.params?.anserData]);

  const [UserType, setUserType] = useState<any>();
  const getLoginUserTyep = async () => {
    let loginType = await AsyncStorage.getItem(AsyncStorage.ISPLANNER_USER);
    setUserType(JSON.parse(loginType));
    // let parsedLoginType = JSON.parse(loginType);
  };

  console.log("UserType-->", UserType);
  useEffect(() => {
    setData([]); // Clear old data
    setTimeout(() => {
      setData(activitesData?.assistantResponse?.activities || []); // Add new data
    }, 0);
  }, [activitesData?.assistantResponse?.activities]);

  useEffect(() => {
    setIsCheck(data.map(() => false));
  }, [data]);

  // Toggle checkbox state at a specific index
  const toggleCheck = (index: number) => {
    setIsCheck((prev) => {
      const newChecks = [...prev];
      newChecks[index] = !newChecks[index];
      return newChecks;
    });
  };

  const isUserLoginToken = async () => {
    try {
      const loginUserData = await AsyncStorage.getItem(
        AsyncStorage.LOGIN_USER_DATA
      );
      setUserDetails(JSON.parse(loginUserData));
    } catch (error) {
      console.error("Error retrieving login user data:", error);
    }
  };

  const getGlobalCode = useCallback(async () => {
    try {
      const globalCodeData = await AsyncStorage.getItem(
        AsyncStorage.GLOBALCODEWITHCATEGORY
      );
      const onboardingGlobalData = await filterCategoryData(
        JSON.parse(globalCodeData),
        categoryName.aiGenerationCategory
      );
      const globalCodeOptionsData = await filterglobalCodeOptionsData(
        onboardingGlobalData[0].globalCodeOptions,
        codeName.activities
      );
      setActivitiesGlobalCode(globalCodeOptionsData[0]?.globalCodeId);
    } catch (error) {
      console.error("Error fetching global code:", error);
    }
  }, []);

  const createActivities = async () => {
    // createActivitiesAPI();
    // Intentionally commented out: this code is used to show the subscription plan purchase dialog
    if (subscriptionStatus) {
      createActivitiesAPI();
    } else {
      setShowModal(true);
    }
  };
  const createActivitiesAPI = async () => {
    const rawData = getConflictingActivities(data);

    if (
      rawData?.length !== 0 &&
      JSON.stringify(rawData?.at(0)?.scheduleTime) !==
        JSON.stringify(oldActivityData?.scheduleTimeArray)
    ) {
      setToasterDetails({
        showToast: true,
        code: 0,
        message:
          "You have some activities with scheduling conflicts. Please adjust them before proceeding.",
      });
      return;
    } else {
      setIsLoading(true);

      try {
        const requestBody = ["Edit", "Replace"].includes(purpuse)
          ? {
              categoryId: activitiesGlobalCode,
              trackId: trackId !== "" ? trackId : activitesData?.trackId,
              isRecordReplaced: true,
              isRecordSelected: false,
              activityId: ExistingID,
            }
          : {
              categoryId: activitiesGlobalCode,
              trackId: activitesData?.trackId,
              isRecordReplaced: false,
              isRecordSelected: false,
              activityId: 0,
            };

        const response = await allActions.OnBoarding.CreateActivitiesFromAI(
          dispatch,
          requestBody,
          "CreateActivities"
        );
        setIsLoading(false);
        console.log("response", { response, requestBody });
        if (response.statusCode === 200) {
          UpdateUserSkippedCategory(activitiesGlobalCode, dispatch, allActions);
          if (from === Enum_NavigateFrom?.SummaryTab) {
            navigation.pop(2);
            navigation.navigate(navigationString.Summary);
          }
          if (from === "Dashboard") {
            navigation.navigate(navigationString.PlannerDashboard, {
              from: "Dashoard",
            });
          } else if (from == "Wellness Prompt") {
            // navigation.dispatch(StackActions.popToTop());

            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: navigationString.Wellbeing }],
              })
            );

            navigation.navigate(navigationString.PlannerDashboard, {
              from: "Dashoard",
            });
          } else if (from == "WellnessOverview") {
            navigation.pop(3);
          } else if (from == "DailyRoutine") {
            // navigation.pop(1);
            navigation.navigate(navigationString.DailyRoutine);
          } else {
            onSavePlannerExplorer(userDetails);
          }
        } else {
        }
      } catch (error) {
        setIsLoading(false);
      }
    }
  };

  const onSavePlannerExplorer = async (userData: any) => {
    setIsLoading(true);
    try {
      const req = {
        userId: userData?.id !== undefined ? userData?.userId : 0,
        strategyTypeId: appConstant.explorer_planner_type.planner,
      };
      const response = await allActions.OnBoarding.SaveSeekerPlannerExplorerId(
        dispatch,
        req,
        "onSavePlannerExplorer"
      );
      setIsLoading(false);

      if (response?.statusCode == 200) {
        if (from === strings.WellnessPrompt) {
          navigation.navigate(navigationString.WellnessOverview, {
            from: "Wellness Plan",
          });
        } else if (from === "Dashboard") {
          navigation.navigate(navigationString.PlannerDashboard, {
            from: "Dashboard",
          });
        } else if (from === "AIGenerated") {
          event.emit(strings.login_);

          AsyncStorage.storeItemKey(
            AsyncStorage.ISPLANNER_USER,
            JSON.stringify({
              isPlanner:
                from === "AIGenerated"
                  ? true
                  : UserType?.isPlanner
                  ? true
                  : false,
              isSelected: true,
            })
          );
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error saving planner explorer:", error);
    }
  };

  const regenerateOnboardingDetails = async () => {
    setIsLoading(true);
    try {
      const requestBody = {
        categoryId: activitiesGlobalCode,
        aspNetUserId: null,
        regenerateStepQuesAnswer: reAnswer,
      };
      const response = await allActions.OnBoarding.RegenerateOnboardingDetails(
        dispatch,
        requestBody,
        "regenerateOnboardingDetails"
      );
      setIsLoading(false);
      if (response.statusCode === 200) {
        setData(response?.data?.assistantResponse?.goals);
      } else {
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error regenerating onboarding details:", error);
    }
  };

  //New code for discard activity

  const DeleteSelectedActivitiesFromAIResponse = async () => {
    const filterSelected = data.filter(
      (_: any, index: number) => isCheck[index]
    );
    const GuIs = filterSelected.map((item: any) => item?.guid);
    const showUncheck = data.filter((_: any, index: number) => !isCheck[index]);
    if (data.length === 1 || GuIs?.length === data?.length) {
      setToasterDetails({
        showToast: true,
        code: 0,
        message: "You cannot discard last activity.",
      });
      return;
    }
    if (!GuIs?.length) {
      setToasterDetails({
        showToast: true,
        code: 0,
        message: "Please select at-least one activity.",
      });
      return;
    }

    setIsLoading(true);

    let requestbody = {
      guids: GuIs,
      trackId: activitesData?.trackId,
      category: discardActivityEnums.activity,
    };
    allActions.OnBoarding.DeleteSelectedActivitiesFromAIResponse(
      dispatch,
      requestbody,
      "DeleteSelectedActivitiesFromAIResponse"
    )
      .then((response: any) => {
        console.log(
          "response for DeleteSelectedActivitiesFromAIResponse-==>",
          response
        );
        if (response.statusCode == 200) {
          setData(showUncheck);
          setEditModal(false);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
        setToasterDetails({
          showToast: true,
          code: 1,
          message: response.message,
        });
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  //New code for discard activity
  const handleCancel = () => setEditModal(false);
  const postActivitiesShowMeMore = async () => {
    setIsLoading(true);
    try {
      const response =
        await allActions.dashboardAction.ReplaceActivityDetailsByIdAPI(
          dispatch,
          replcaeApiPayload,
          "ReplaceActivityDetailsByIdAPI"
        );
      console.log("response______>>>", response);
      setIsLoading(false);
      if (response.statusCode == 200) {
        setToasterDetails({
          showToast: true,
          code: 1,
          message: response?.message,
        });
        allActions?.dashboardAction?.saveTemporarySlotData(dispatch, []);
        console.log("response____>>>", response);
        setData(response?.data?.assistantResponse?.activities);
        setTrackId(response?.data?.trackId);
        setAiGeneratedResponse(response?.data);
      } else {
        setToasterDetails({
          showToast: true,
          code: 0,
          message: response?.message,
        });
      }
    } catch (error) {
      setToasterDetails({
        showToast: true,
        code: 0,
        message: "Something went wrong.",
      });
      setIsLoading(false);
    }
  };
  return (
    console.log("userDetails", newString),
    (
      <ScreenWrapper statusBarColor={colors.prussianBlue}>
        <View style={styles.mainContainer}>
          {/* <Image style={styles.iconStyle2} source={imagePath.SunHalfIcon} /> */}
          <CommonHeader
            headerName={strings.activities} //uncomment this code later on for edit/replace functionality
            edit={!["Replace", "Edit"].includes(purpuse) && !editModal}
            editPress={() => {
              setEditModal(!editModal);
              setIsCheck(data.map(() => false));
            }}
            // isBackIcon={false}
            isBackIcon={
              [
                "Dashboard",
                "Wellness Prompt",
                "WellnessOverview",
                "DailyRoutine",
              ]?.includes(from)
                ? true
                : false
            }
            textContainer={[
              styles.textContainerStyle,
              {
                marginLeft: [
                  "Dashboard",
                  "Wellness Prompt",
                  "DailyRoutine",
                ]?.includes(from)
                  ? moderateScale(10)
                  : 0,
              },
            ]}
            onBackPress={() => {
              navigation.goBack();
              allActions?.dashboardAction?.saveTemporarySlotData(dispatch, []);
            }}
            mainContainer={styles.mainContainerHeader}
            iconContainer={styles.iconCon}
            isCross={editModal}
            onCancel={() => setEditModal(false)}
          />
          <ScrollView
            style={styles.scrollStyle}
            contentContainerStyle={styles.contentContainerStyle}
            scrollsToTop={true}
            ref={(ref) => {
              scrollViewRef = ref;
            }}
          >
            {!isLoading ? (
              <>
                <UserInfoWithHealthStatusSummary
                  name={
                    userDetails?.firstName &&
                    ", " + capitalizeFirstLetter(userDetails?.firstName)
                  }
                  subTitle={
                    editModal
                      ? "Your Current Activities"
                      : `I’ve handpicked some activities for you`
                  }
                  subTitle2={
                    editModal
                      ? "Swap or remove any activity—wellness works best when it fits real life."
                      : "These activities are tailored to support your current mood, energy, and wellness goals."
                  }
                  healthStatusSummary={
                    activitesData?.assistantResponse?.healthStatusSummary
                  }
                />
                <View style={{ marginTop: moderateScale(15) }} />
                {/* <View style={styles.flotImageContainer}>
                  <View style={styles.flotImage}>
                    <Image
                      style={styles.iconStyle1}
                      source={imagePath.SunHalfIcon}
                      resizeMode={"contain"}
                    />
                  </View>
                </View> */}
                {!data || data.length === 0 ? (
                  <BottomButtons
                    data={data}
                    on_RegenerateBlank={regenerateOnboardingDetails}
                  />
                ) : (
                  <>
                    <FlatList
                      data={data}
                      keyExtractor={(item, index) => "key" + index}
                      style={styles.flatStyle}
                      contentContainerStyle={{ gap: 10 }}
                      renderItem={({ item, index }) => {
                        let extractActivities: any = data?.map((itm: any) => {
                          return {
                            schTime: itm?.scheduleTime,
                            durations: itm?.duration,
                          };
                        });

                        let startEndTime: string[][] =
                          getStartEndTimeByActivities(extractActivities);
                        return (
                          <View
                            style={{
                              flexDirection: "row",
                              width: "100%",
                              // backgroundColor: "gray",
                              alignItems: "flex-start",
                              gap: 5,
                            }}
                          >
                            {/* {false && ( //uncomment this code later on for edit/replace functionality */}
                            {editModal && (
                              <Pressable
                                onPress={() => toggleCheck(index)}
                                style={{
                                  height: moderateScale(18),
                                  width: moderateScale(18),
                                  borderWidth: moderateScale(1),
                                  borderColor: isCheck[index]
                                    ? colors?.polishedPine
                                    : colors.grayColorOP2, //pbRGB
                                  justifyContent: "center",
                                  alignItems: "center",
                                  marginTop: 5,
                                  borderRadius: moderateScale(5),
                                }}
                              >
                                {isCheck[index] && (
                                  <Image
                                    source={imagePath?.check}
                                    style={{
                                      tintColor: colors.polishedPine,
                                      height: moderateScale(13),
                                      width: moderateScale(13),
                                    }}
                                  />
                                )}
                              </Pressable>
                            )}
                            <ActivitesTaskCardOnBoarding
                              container={{
                                flex: 1,
                              }}
                              image={item.logo}
                              title={item?.title || "--"}
                              subTitle={item?.subActivityName || "--"}
                              isConflict={
                                JSON.stringify(item?.scheduleTime) !==
                                  JSON.stringify(
                                    oldActivityData?.scheduleTimeArray
                                  ) && item?.isConflicts
                              }
                              conflictMessage={item?.conflictMessage}
                              cardPress={() => {
                                allActions?.dashboardAction?.saveCurrentSuggestionsScheduleTime(
                                  dispatch,
                                  startEndTime
                                );
                                navigation?.navigate(
                                  navigationString?.ActivitesDetails,
                                  {
                                    activitesData: item,
                                    activitiesData: 579,
                                    from:
                                      from === "DailyRoutine"
                                        ? "DailyRoutine"
                                        : from === "Wellness Prompt"
                                        ? "Wellness Prompt"
                                        : from === "Dashboard"
                                        ? "Dashboard"
                                        : from === "WellnessOverview"
                                        ? from
                                        : "Activity",
                                    reqData: reqData,
                                    isConflict:
                                      JSON.stringify(item?.scheduleTime) !==
                                        JSON.stringify(
                                          oldActivityData?.scheduleTimeArray
                                        ) && item?.isConflicts,
                                    trackId: trackId || activitesData?.trackId,

                                    ExistingID: ExistingID,
                                    purpuse,
                                    replcaeApiPayload,
                                    trackId_: trackId,
                                    data,

                                    // activitesData:
                                    AigeneratedData: {
                                      assistantResponse: {
                                        activities: data,
                                      },
                                      trackId:
                                        trackId || activitesData?.trackId,
                                      responseType: activitesData?.responseType,
                                      threadId: activitesData?.threadId,
                                    },
                                  }
                                );
                              }}
                            />
                          </View>
                        );
                      }}
                      ListFooterComponent={() => (
                        <BottomButtons
                          buttonText2={
                            editModal
                              ? strings?.Remove
                              : strings?.regenerateCap_
                          }
                          buttonText1={strings?.Add_to_my_day}
                          data={data}
                          on_StartNow={createActivities}
                          on_RegenerateQuestions={() => {
                            //postActivitiesShowMeMore
                            // return;
                            if (purpuse === "Replace") {
                              postActivitiesShowMeMore();
                            } else {
                              navigation.navigate(
                                navigationString?.ReGenerateActivitesAI,
                                {
                                  from: from,
                                  reqData: reqData,
                                  newString: newString,
                                }
                              );
                            }
                          }}
                          onDiscardClick={() => {
                            // setIsCheck(data.map(() => false));
                            const filterSelected = data.filter(
                              (_: any, index: number) => isCheck[index]
                            );
                            const showUncheck = data.filter(
                              (_: any, index: number) => !isCheck[index]
                            );

                            DeleteSelectedActivitiesFromAIResponse();
                            // setData(showUncheck);
                            const GuIs = filterSelected.map(
                              (item: any) => item?.guid
                            );
                            setEditModal(false);
                          }}
                          onEditRegenerateClick={() => {
                            const filterSelected = data.filter(
                              (_: any, index: number) => isCheck[index]
                            );
                            const GuIs = filterSelected.map(
                              (item: any) => item?.guid
                            );
                            if (!GuIs?.length) {
                              setToasterDetails({
                                showToast: true,
                                code: 0,
                                message: strings?.PleaseSelectAtLeastOne,
                              });
                              return;
                            }
                            navigation.navigate(
                              navigationString?.ReGenerateActivitesAI,
                              {
                                from: from,
                                reqData: reqData,
                                newString: newString,
                                GuIs,
                                filterSelected,
                                editModal,
                                trackId: activitesData?.trackId,
                                responseType: activitesData?.responseType,
                              }
                            );
                            setEditModal(false);
                          }}
                          isEditingEnable={editModal}
                          isSkip={
                            [
                              Enum_NavigateFrom?.WellnessPrompt,
                              Enum_NavigateFrom?.Dashboard,
                              Enum_NavigateFrom?.WellnessOverview,
                              Enum_NavigateFrom?.DailyRoutine,
                              Enum_NavigateFrom?.Dashboard,
                              Enum_NavigateFrom?.SummaryTab,
                            ].includes(from)
                              ? false
                              : true
                          }
                          aiSuggestion={"activities"}
                          onSkipPress={() => {
                            navigation.navigate(
                              navigationString.SelectActivity,
                              {
                                from: from,
                                reqData: reqData,
                                newString: newString,
                              }
                            );
                            allActions?.dashboardAction?.saveTemporarySlotData(
                              dispatch,
                              []
                            );
                          }}
                        />
                      )}
                    />
                  </>
                )}
              </>
            ) : (
              <View style={styles.loaderTop}>
                <CommonLoader />
              </View>
            )}
          </ScrollView>
          {exitAlert && (
            <CommonAlert
              alertMessage={"Are you sure you want to exit the app?"}
              isVisible={true}
              alertLeftButtonText="CANCEL"
              alertRightButtonText="OK"
              customAlertTxtStyles={{
                textAlign: "center",
                marginBottom: moderateScale(10),
              }}
              alertLeftButtonOnPress={() => setExitAlert(false)}
              alertRightButtonOnPress={() => {
                setExitAlert(false);
                BackHandler.exitApp();
              }}
              isAlertIcon
            />
          )}
          {/* {exitAlert && (
            <EditActivitiesGoalsAlert
              isVisible={editModal}
              type={modalData?.type}
              hideAlert={handleCancel}
              onFirstPress={modalData?.onFirstPress}
              onSecondPress={modalData?.onSecondPress}
              onCancel={handleCancel}
            />
          )} */}
          {toasterDetails?.showToast && (
            <ToastApiResponse
              data={toasterDetails}
              setToasterDetails={setToasterDetails}
              code={toasterDetails?.code}
              message={toasterDetails?.message}
            />
          )}
        </View>
        <UpgradeModal
          navigation={navigation}
          visible={showModal}
          setShowModal={setShowModal}
          fromScreen={SUBSCRIPTION_NAVIGATION_FROM?.DASHBOARD}
          isPlanner={false}
          title={IAP_Strings?.AI_genrate_activity_title}
          description={IAP_Strings?.AI_genrate_activity_desc}
        />
      </ScreenWrapper>
    )
  );
};

export default React.memo(GeneratedActivitiesAI);
