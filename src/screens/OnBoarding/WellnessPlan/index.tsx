import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  UIManager,
  SectionList,
  ScrollView,
  BackHandler,
} from "react-native";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import CommonHeader from "../../../components/Header/commonHeader";
import {
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import CommonButton from "../../../components/Buttons/commonButton";
import { imagePath } from "../../../assets/png/imagePath";
import navigationString from "../../../navigation/navigationString";
import { CalendarIcon, MoonIcon, MorningIcon, SunIcon } from "../../../assets";
import { event } from "../../../navigation/emitter";
import allActions from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import * as AsyncStorage from "../../../utils/Storage/AsyncStorage";
import DetailsBox from "../../../components/OnBoardiingComponents/DetailsBox";
import CommonHealthLoader from "../../../components/Loader/CommonHealthLoader";
import appConstant, {
  discardActivityEnums,
  longTermVariants_,
  shortTermVariants,
} from "../../../constant/appConstant";
import { strings } from "../../../constant/strings";
import TaskDetails from "../../AddActivities/DailyRoutine/TaskDetails";
import categorizeTasks from "../../AddActivities/DailyRoutine/categorizeTasks";
import calculateDuration, {
  getStartEndTimeByActivities,
} from "../../../helper/duration";
import { UpdateUserSkippedCategory } from "../../../helper/commonApi";
import onBoardingTypes from "../../../redux/types/onBoardingTypes";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import CommonLoader from "../../../components/Loader";
import Modal from "react-native-modal";
import { subscriptionFun } from "../../../constant/SubscriptionPlanValidation";
import {
  Enum_EditReplaceButton,
  Enum_NavigateFrom,
  SUBSCRIPTION_NAVIGATION_FROM,
} from "../../../constant/ENUM";
import UpgradeModal from "../../SubscriptionPlan/UpgradeModal";
import { IAP_Strings } from "../../SubscriptionPlan/IAP_Strings";
import {
  getBuySubscriptionDetail,
  getSeekerInfoRedux,
} from "../../../redux/selector";
import { textLabelSize } from "../../../utils/TextConfig";
import logger from "../../../constant/logger";

var subscriptionStatus: any = false;

const WellnessPlan = ({ navigation, route }: any) => {
  const subscriptionDetail = useSelector(getBuySubscriptionDetail());
  const getseekerInfoRedux = useSelector(getSeekerInfoRedux());
  const dispatch = useDispatch();

  const {
    from,
    reqData,
    fromWellnessOverView,
    newString,
    fromUpdateScheduleTime,
  } = route.params;

  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState(false);
  const [isLoading2, setisLoading2] = useState(false);
  const [userData, setuserData] = useState<any>();
  const [RegenrateReq, setRegenrateReq] = useState<any>();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editableType, setEditableType] = useState("");
  const [isSelectionEnable, setIsSelectionEnable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activityList, setactivityList] = useState<any>();
  const [wellnessData, setWellnessData] = useState(route?.params?.data);
  const [data, setData] = useState([
    {
      title: "Short term goals",
      subTitle:
        "Guidance on developing healthy habits, setting goals, and maintaining overall well-being.",
      data: [
        {
          header: "Improve Sleep Quality",
          date: "2023-06-01",
          period: "Next month",
          cause: "Sleep",
        },
        {
          header: "Reduce anxiety symptoms",
          date: "2023-06-01",
          period: "Next month",
          cause: "Mental Health",
        },
      ],
      isOpen: false,
    },
    {
      title: "Long term goals",
      subTitle:
        "Guidance on developing healthy habits, setting goals, and maintaining overall well-being.",
      data: [
        {
          header: "Improve Sleep Quality",
          date: "2023-06-01",
          period: "six months",
          cause: "Physical Health",
        },
        {
          header: "Reduce anxiety symptoms",
          date: "2023-06-01",
          period: "six months",
          cause: "Lifestyle",
        },
      ],
      isOpen: false,
    },
  ]); //This state is being used for rendering Goals item list UI
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [UserType, setUserType] = useState<any>();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<any>([]);
  const [wellnessPlanReplaceDetials, setWellnessPlanReplaceDetials] =
    useState<any>(null);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  const isUserLoginToken = async () => {
    let loginUserData = await AsyncStorage.getItem(
      AsyncStorage.LOGIN_USER_DATA
    );
    let wellnessPlanReplaceDetials = await AsyncStorage.getItem(
      AsyncStorage.WELLNESS_PLAN_ID_AND_REGENERATE_ID
    );

    setWellnessPlanReplaceDetials(JSON.parse(wellnessPlanReplaceDetials));
    setuserData(JSON.parse(loginUserData));
  };
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
    isUserLoginToken();
    getLoginUserTyep();
  }, []);
  useEffect(() => {
    const backAction = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      strings?.hardwareBackPress,
      backAction
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    setWellnessData(route?.params?.data);
  }, [route?.params?.data, route?.params?.fromUpdateScheduleTime]);
  useEffect(() => {
    setWellnessData(route?.params?.data);
  }, [fromUpdateScheduleTime, route?.params?.fromUpdateScheduleTime]);
  useEffect(() => {
    if (from == "ReGenerate" || from == "Generate") {
      setRegenrateReq(route?.params?.regenerateStepQuesAnswer);
    }
  }, [from]);

  useEffect(() => {
    const shortTermGoals = goals?.filter(
      (goal: any) => shortTermVariants.includes(goal?.goalType) // goal?.goalType === "short-term"
    );
    const longTermGoals = goals?.filter(
      (goal: any) => longTermVariants_.includes(goal?.goalType) //goal?.goalType === "long-term"
    );
    const activities = goals?.map((goal: any) => goal?.activities);
    setactivityList(activities);
    setData((prevData: any) => [
      { ...prevData[0], data: shortTermGoals },
      { ...prevData[1], data: longTermGoals },
    ]);
  }, [wellnessData, route?.params?.fromUpdateScheduleTime]);
  //new
  useEffect(() => {
    setactivityList(
      wellnessData?.assistantResponse?.goals.map((goal: any) => goal.activities)
    );
  }, [wellnessData]);

  const goals: any[] = wellnessData?.assistantResponse?.goals;
  const saveQuestion = () => {
    if (from !== "Generate") {
      saveQuestion_(RegenrateReq);
    } else {
      saveWellnessQuestion(RegenrateReq);
    }
  };
  const saveWellnessQuestion = (SelectedQuestionData: any) => {
    setisLoading(true);

    allActions.OnBoarding.GenerateOnboardingDetails(
      dispatch,
      SelectedQuestionData,
      "saveQuestion"
    )
      .then((response: any) => {
        setWellnessData(response.data);
      })
      .catch((err) => {
        setisLoading(false);
      });
  };
  const saveQuestion_ = (SelectedQuestionData: any) => {
    setisLoading(true);
    let regenerateStepQuesAnswer =
      SelectedQuestionData.regenerateStepQuesAnswer;

    let requestbody = {
      aspNetUserId: "",
      regenerateStepQuesAnswer,
    };
    allActions.OnBoarding.ReGenerateSeekerWellnessPlan(
      dispatch,
      requestbody,
      "saveQuestion_"
    )
      .then((response: any) => {
        setWellnessData(response.data);
      })
      .catch((err) => {
        setisLoading(false);
      });
  };

  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const handlePress = (index: number) => {
    // Toggle the expanded state
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    // LayoutAnimation?.configureNext(LayoutAnimation?.Presets?.easeInEaseOut);
  };

  const onStartWellnessPlan = () => {
    // onStartWellnessPlanAPI(wellnessPlanReplaceDetials?.isWellPlanIDRequired);

    // Intentionally commented out: this code is used to show the subscription plan purchase dialog
    if (subscriptionStatus) {
      onStartWellnessPlanAPI(wellnessPlanReplaceDetials?.isWellPlanIDRequired);
    } else {
      setShowModal(true);
    }
  };

  const onStartWellnessPlanAPI = async (isWellPlanIDRequired: boolean) => {
    setisLoading(true);
    const gotchData: any[] = getConflictingActivities(wellnessData);
    if (gotchData?.length > 0) {
      setToasterDetails({
        showToast: true,
        code: 0,
        message:
          "You have some activities with scheduling conflicts. Please adjust them before proceeding.",
      });
      setisLoading(false);
      return;
    } else {
      // return;

      let req = {
        categoryId: 216,
        trackId: `${wellnessData?.trackId}`,
      };
      // payload when user tries to replace wellness plan.
      let reqForReplaceWellnessPlan = {
        categoryId: 216,
        trackId: `${wellnessData?.trackId}`,
        isRecordReplaced: wellnessPlanReplaceDetials?.isWellPlanIDRequired,
        wellnessPlanId: wellnessPlanReplaceDetials?.wellnessPlanId, //old wellness plan ID
      };

      allActions.OnBoarding.CreateWellnessPlanDetails(
        dispatch,
        isWellPlanIDRequired ? reqForReplaceWellnessPlan : req,
        "onStartWellnessPlan"
      )
        .then((response: any) => {
          if (response.statusCode == 200) {
            setTimeout(() => {
              UpdateUserSkippedCategory(216, dispatch, allActions);
              onSavePlanner_Explorer(userData);
              clearTemporaryTimeSlots();
              //here set wellnessplan generate and assigned to the user

              AsyncStorage.storeItemKey(
                AsyncStorage.IS_WELLNESSPLAN_SELECTED,
                JSON.stringify(true)
              );
              navigation.pop(2);
              if (from === Enum_NavigateFrom.SummaryTab) {
                navigation.navigate(navigationString.Summary);
              }
            }, 5000);
          }
        })
        .catch((err) => {
          setisLoading(false);
        });
    }
  };

  const getLoginUserTyep = async () => {
    let loginType = await AsyncStorage.getItem(AsyncStorage.ISPLANNER_USER);
    setUserType(JSON.parse(loginType));
  };

  const onSavePlanner_Explorer = (userData: any) => {
    let req = {
      userId: userData?.id !== undefined ? userData?.userId : 0,
      strategyTypeId: appConstant.explorer_planner_type.planner,
    };

    setisLoading(true);

    allActions.OnBoarding.SaveSeekerPlannerExplorerId(
      dispatch,
      req,
      "onSavePlanner_Explorer"
    )
      .then((response: any) => {
        setisLoading(false);
        if (from == "Wellness Prompt") {
          navigation.navigate(navigationString.WellnessOverview, {
            from: "Wellness Plan",
          });
        } else if (from == "Dashboard" || from === "ProductGuide") {
          navigation.navigate(navigationString.PlannerDashboard, {
            from: "Wellness Plan",
          });
          navigation.pop(5);
        } else {
          event.emit(strings.login_);

          AsyncStorage.storeItemKey(
            AsyncStorage.ISPLANNER_USER,
            JSON.stringify({
              isPlanner:
                from === "AIGenerated"
                  ? true
                  : from === "ExplorerActivity"
                  ? false
                  : UserType?.isPlanner
                  ? true
                  : false,
              isSelected: true,
            })
          );
        }
      })
      .catch((err) => {
        setisLoading(false);
      });
  };
  const onReplaceActivity = () => {
    // When navigating to RepplaceWellnessActivity
    navigation.navigate(navigationString.RepplaceWellnessActivity, {
      selectedActivities: getSelectedItemsData(),
      trackId: wellnessData?.trackId,
      from: from,
      newString: newString,
      scheduleTime: "",
      reqData: reqData,
      responseType: editableType.toLowerCase(),
      parentCategory: discardActivityEnums?.wellness,
      guids: selectedItems,
      regenerateQuestionsResponsebyUser:
        route?.params?.regenerateQuestionsResponsebyUser,
    });
    executeDefaultState();
  };
  const descriptionSection = () => {
    return (
      <View style={{ paddingVertical: moderateScale(10) }}>
        <View style={{ flexDirection: "row" }}>
          <ItemGridView
            title={"Crafted with care by Zumlo"}
            containerStyle={{ backgroundColor: colors?.SurfCrest }}
            textStyle={{ fontSize: 13 }}
          />
        </View>
      </View>
    );
  };
  function removeActivitiesByGuids(
    data: any = wellnessData,
    guidsToRemove: string[] = []
  ) {
    if (!Array.isArray(guidsToRemove) || guidsToRemove.length === 0)
      return data;

    const newDataReadyToSet: any = {
      ...data,
      assistantResponse: {
        ...data.assistantResponse,
        goals: data.assistantResponse.goals
          .map((goal: any) => {
            // Filter activities that are not in guidsToRemove
            const filteredActivities = goal.activities.filter(
              (activity: any) => !guidsToRemove.includes(activity.guid)
            );

            // Check if any of the target activities existed in this goal
            const hadMatchingActivities = goal.activities.some(
              (activity: any) => guidsToRemove.includes(activity.guid)
            );

            // If goal lost all activities due to removal, drop the goal
            if (hadMatchingActivities && filteredActivities.length === 0) {
              return null;
            }

            return {
              ...goal,
              activities: filteredActivities,
            };
          })
          .filter((goal: any) => goal !== null),
      },
    };
    setWellnessData(newDataReadyToSet);
    setisLoading2(false);
  }

  //delete activity
  const DeleteSelectedActivitiesFromAIResponse = async (
    selectedActivities: any[]
  ) => {
    const extractAllActivities: any[] = goals?.flatMap(
      (item: any) => item?.activities
    ); //This will give all activity inside of all goals
    const extractAllGoals: any[] = goals?.map((item: any) => item);
    const guids_Act: string[] = selectedActivities.map((item) => item.guid);
    logger("selectedActivities___", {
      selectedActivities,
      goals,
      goalGuid_: selectedActivities.map((item) => item.goalGuid),
      unSelectedGoals: goals.filter(
        (item: any) =>
          !selectedActivities
            .map((item) => item.goalGuid)
            .includes(item.goalGuid)
      ),
      guids_Act,
      extractAllActivities,
      extractAllGoals,
      editableType,
    });

    // return;
    setisLoading2(true);
    if (editableType === "GOALS") {
      if (selectedActivities.length === goals.length) {
        setToasterDetails({
          showToast: true,
          code: 0,
          message: "You cannot discard all goals atleast left one goal.",
        });
        executeDefaultState();
      } else {
        const goalGuid_ = selectedActivities.map((item) => item.goalGuid);
        const unSelectedGoals = goals.filter(
          (item: any) => !goalGuid_.includes(item.goalGuid)
        );

        let requestbody = {
          guids: goalGuid_,
          trackId: wellnessData?.trackId,
          category: discardActivityEnums.wellness,
        };
        allActions.OnBoarding.DeleteSelectedGoalsFromAIResponse(
          dispatch,
          requestbody,
          "DeleteSelectedGoalsFromAIResponse"
        )
          .then((response: any) => {
            if (response.statusCode == 200) {
              onDiscardActivity(unSelectedGoals);
              executeDefaultState();
              setisLoading2(false);
            }
            setToasterDetails({
              showToast: true,
              code: 1,
              message: response.message,
            });
          })
          .catch((err) => {
            setisLoading2(false);
            setToasterDetails({
              showToast: true,
              code: 1,
              message: err.message,
            });
          });
        setisLoading2(false);
      }
    } else {
      if (selectedActivities.length === extractAllActivities.length) {
        setToasterDetails({
          showToast: true,
          code: 0,
          message:
            "You cannot discard all activities atleast left one activity.",
        });
        executeDefaultState();
        return;
      }
      let guids = selectedActivities.map((item) => item.guid);
      let requestbody = {
        guids: guids,
        trackId: wellnessData?.trackId,
        category: discardActivityEnums.wellness,
      };
      allActions.OnBoarding.DeleteSelectedActivitiesFromAIResponse(
        dispatch,
        requestbody,
        "DeleteSelectedActivitiesFromAIResponse"
      )
        .then((response: any) => {
          if (response.statusCode == 200) {
            removeActivitiesByGuids(wellnessData, guids_Act);
          } else {
            setisLoading2(false);
          }
          setToasterDetails({
            showToast: true,
            code: 1,
            message: response.message,
          });
          executeDefaultState();
        })
        .catch((err) => {
          setisLoading2(false);
        });
    }
  };

  const executeDefaultState = () => {
    setEditableType("");
    setIsSelectionEnable(false);
    setSelectedGoals([]);
    setSelectedItems([]);
    setisLoading2(false);
  };
  const onDiscardActivity = (selectedActivities: any[]) => {
    if (!wellnessData || selectedActivities.length === 0) return;

    if (editableType === "GOALS") {
      setWellnessData((prevData: any) => ({
        ...prevData,
        assistantResponse: {
          ...prevData.assistantResponse,
          goals: selectedActivities,
        },
      }));

      const shortTermGoals = selectedActivities?.filter(
        (goal: any) => goal?.goalType === "Short-term"
      );
      const longTermGoals = selectedActivities?.filter(
        (goal: any) => goal?.goalType === "Long-term"
      );

      setData((prevData: any) => [
        shortTermGoals.length !== 0 && {
          ...prevData[0],
          data: shortTermGoals,
        },
        longTermGoals.length !== 0 && { ...prevData[1], data: longTermGoals },
      ]);
    } else {
      const updatedGoals = wellnessData?.assistantResponse?.goals.map(
        (goal: any) => ({
          ...goal,
          activities: goal.activities.filter(
            (activity: any) =>
              !selectedActivities.some(
                (selected) => selected.guid === activity.guid
              )
          ),
        })
      );

      setWellnessData((prevData: any) => ({
        ...prevData,
        assistantResponse: {
          ...prevData.assistantResponse,
          goals: updatedGoals,
        },
      }));
    }
    setisLoading2(false);
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
  const header = () => {
    return (
      <View>
        <CommonHeader
          isBackIcon={route?.params?.from === "AIGenerated" ? false : true} //from select activity screen then hide icon
          iconContainer={{
            backgroundColor: "#00000033",
            marginRight: route?.params?.from === "AIGenerated" ? 0 : 10, //from select activity screen then don't give margin
          }}
          headerName="Wellness Plan"
          textContainer={{
            marginHorizontal: moderateScale(0),
          }}
          onBackPress={() => {
            clearSavedReduxData();
            navigation.pop(2);
            clearTemporaryTimeSlots();
          }} //popping 2 screen on click first plan screen and 2nd one is wellness plan questions screen
          mainContainer={{
            marginTop: moderateScale(15),
            marginBottom: moderateScale(10),
            // backgroundColor: "red",
          }}
          edit={!isSelectionEnable ? true : false}
          isCross={isSelectionEnable ? true : false}
          editPress={() => {
            setShowEditModal(true);
            setSelectedItems([]);
          }}
          onCancel={executeDefaultState}
        />
      </View>
    );
  };

  const ItemWellnessPlan = ({ item, tapOnItem, index }: any) => {
    const isExpanded =
      editableType === "GOALS" ? true : index === expandedIndex;

    return (
      <>
        {item?.data.length > 0 && (
          <>
            <View
              style={{
                flexDirection: "row",
                marginTop:
                  item?.title == "Short term goals"
                    ? moderateScale(0)
                    : moderateScale(20),
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: textScale(20),
                    color: colors?.prussianBlue,
                  }}
                >
                  {item?.title}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  height: moderateScale(28),
                  width: moderateScale(28),
                  backgroundColor:
                    item?.title == "Short Term Goals"
                      ? colors?.prussianBlue
                      : colors?.backgroundTheme,
                  borderRadius: moderateScale(20),
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => tapOnItem()}
              >
                <Image
                  source={
                    isExpanded ? imagePath.UPArrow : imagePath?.RightArrow
                  }
                  style={{
                    tintColor: colors?.SurfCrest,
                    height: moderateScale(isExpanded ? 20 : 14),
                    width: moderateScale(isExpanded ? 20 : 14),
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {isExpanded &&
                item?.data?.map((elem: any) => {
                  const key = elem?.goalGuid;
                  const isSelected = selectedItems.includes(key);
                  const toggleSelection = (key: string) => {
                    // We will update this key with goalGuid
                    const currentSelectedGoal: any = goals.filter(
                      (item: any) => item?.goalGuid === key
                    );
                    const matchGoal: any[] = selectedGoals.filter(
                      (item: any) => item?.goalGuid == key
                    );
                    const unMatchGoal: any[] = selectedGoals.filter(
                      (item: any) => item?.goalGuid !== key
                    );

                    if (matchGoal?.length == 0) {
                      setSelectedGoals([
                        ...selectedGoals,
                        ...currentSelectedGoal,
                      ]);
                    } else {
                      setSelectedGoals(unMatchGoal);
                    }
                    setSelectedItems((prev) =>
                      prev.includes(key)
                        ? prev.filter((itemKey) => itemKey !== key)
                        : [...prev, key]
                    );
                  };
                  return (
                    <>
                      <View style={{ flexDirection: "row" }}>
                        {editableType === "GOALS" && (
                          <TouchableOpacity
                            style={style?.goalsCheckBox}
                            onPress={() => toggleSelection(elem?.goalGuid)} // We will update this key with guid
                          >
                            {isSelected && (
                              <Text style={{ color: colors.backgroundTheme }}>
                                ✓
                              </Text>
                            )}
                          </TouchableOpacity>
                        )}
                        <DetailsBox
                          duration={calculateDuration(
                            elem?.startDate,
                            elem?.endDate
                          )}
                          mainTitle={elem?.title}
                          date={moment(elem?.startDate).format("YYYY-MM-DD")}
                          timeSystem={elem.timeLine || elem?.timeline}
                          preferred={
                            elem?.goalCategoryText || elem?.goalCategory
                          }
                          description={elem?.description}
                          container={{
                            backgroundColor:
                              elem?.goalTypeText == "Short-term"
                                ? colors?.prussianBlue
                                : colors?.backgroundTheme,
                          }}
                          item={elem}
                        />
                      </View>
                    </>
                  );
                })}
            </View>
          </>
        )}
      </>
    );
  };

  const ItemGridView = ({
    image,
    title,
    containerStyle,
    textStyle,
    isTimeperiod,
  }: any) => {
    return (
      <View
        style={[
          {
            maxWidth: isTimeperiod ? moderateScale(160) : "auto",
            borderRadius: 20,
            width: "auto",
            backgroundColor: colors?.royalOrangeDark,
            alignItems: "center",
            height: moderateScale(27),
            marginEnd: moderateScale(10),
            paddingHorizontal: moderateScale(20),
            marginTop: moderateScale(5),
            flexDirection: "row",
            alignItem: "center",
            justifyContent: "space-between",
          },
          containerStyle,
        ]}
      >
        {image && (
          <View style={{ marginRight: moderateScale(5) }}>
            <CalendarIcon />
          </View>
        )}

        <Text
          style={[
            {
              fontSize: textScale(10),
              fontWeight: "400",
              color: colors?.prussianBlue,
            },
            textStyle,
          ]}
        >
          {title}
        </Text>
      </View>
    );
  };

  const onRegenerateWellnessPlan = async () => {
    navigation.navigate(navigationString?.SelectReGenerationCategory, {
      from: from,
      fromWellnessOverView: fromWellnessOverView,
      newString: newString,
    });
  };
  const callFunction = (data: any) => {
    navigation.navigate(navigationString.SelectActivity, {
      from: from,
      reqData: data,
      newString: newString,
    });
  };
  const nameSection = () => {
    return (
      <View style={{ marginTop: moderateScale(25) }}>
        <Text style={style?.Hitext}>Hi, {userData?.firstName}</Text>
        <Text style={style?.personalisedText}>
          {"Here’s your personalized wellness plan"}
        </Text>
        <Text style={style?.thoughtfullyText}>
          {"Thoughtfully designed to fit your needs—small steps, real impact."}
        </Text>
      </View>
    );
  };

  const categorizedData = categorizeTasks(
    activityList !== undefined ? activityList?.flat() : []
  );

  const getSelectedItemsData = () => {
    if (editableType === "GOALS") {
      return selectedGoals;
    } else {
      let a = categorizedData.flatMap((section) =>
        section.data.filter((_itm: any) => selectedItems.includes(_itm?.guid))
      );
      return a;
    }
  };
  const renderItem = ({
    item,
    section,
    index,
  }: {
    item: any;
    section: any;
    index: number;
  }) => {
    const key = item?.guid;
    const isSelected = selectedItems.includes(item?.guid);

    const toggleSelection = (key: string) => {
      setSelectedItems((prev) =>
        prev.includes(key)
          ? prev.filter((itemKey) => itemKey !== key)
          : [...prev, key]
      );
    };

    const allDataItems = categorizedData.flatMap((section) => section.data);

    let extractActivities: any = allDataItems?.map((itm: any) => {
      let isScheduleTimeArray = Array.isArray(itm?.scheduleTime);
      return {
        schTime: !isScheduleTimeArray
          ? itm?.scheduleTimeArray
          : itm?.scheduleTime,
        durations: itm?.duration,
      };
    });

    let startEndTime: string[][] =
      getStartEndTimeByActivities(extractActivities);

    const sectionColors: Record<string, string> = {
      [strings.morning]: colors?.SurfCrest,
      [strings.Afternoon]: colors?.SaltBox,
      Night: colors?.saltLight,
    };
    return (
      <View style={style.itemContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={[
              style?.ActivityCheck,
              {
                borderColor:
                  editableType === "ACTIVITIES"
                    ? colors.SurfCrest
                    : colors?.transparent,
              },
            ]}
            onPress={() => toggleSelection(item?.guid)}
          >
            {isSelected && <Text style={{ color: colors.SurfCrest }}>✓</Text>}
          </TouchableOpacity>

          <TaskDetails
            data={item}
            section={section}
            hideActivityImage={true}
            mainBoxContainer={{
              backgroundColor:
                sectionColors[section?.title] ?? colors?.polishedPine,
              borderWidth:
                section?.title === strings.morning
                  ? moderateScale(0)
                  : moderateScale(1),
              borderColor:
                section?.title === strings.morning
                  ? colors?.SurfCrest
                  : colors.SurfCrest,
              marginTop: 10,
              width: width - moderateScale(70),
            }}
            activityImageContainerStyle={{
              borderColor: colors?.SurfCrest,
              borderWidth: 1,
            }}
            titleTextStyle={{
              color:
                section?.title === strings.morning
                  ? colors.prussianBlue
                  : colors.white,
              width: moderateScale(240),
            }}
            timeTextStyle={{
              color:
                section?.title === strings.morning
                  ? colors.prussianBlue
                  : colors.white,
            }}
            streakTextStyle={{
              color:
                section?.title === strings.morning
                  ? colors.prussianBlue
                  : colors.white,
            }}
            onPress={() => {
              allActions?.dashboardAction?.saveCurrentSuggestionsScheduleTime(
                dispatch,
                startEndTime
              );
              navigation?.navigate(navigationString?.ActivitesDetails, {
                ...route?.params,
                activitesData: item,
                activitiesData: 579,
                from: from,
                AigeneratedData: wellnessData || route?.params?.data,
                isConflict: item?.isConflicts,
                fromUpdateScheduleTime: fromUpdateScheduleTime ?? 1,
              });
            }}
            isWellnessplanDetials={true}
            animationKey={key}
            expandedKey={expandedKey}
            morningTaskData={categorizeTasks(
              activityList !== undefined ? activityList?.flat() : []
            )}
            setExpandedKey={setExpandedKey}
            isConflicts={item?.isConflicts}
            conflictMessage={item?.conflictMessage}
            AigeneratedData={route?.params?.data}
          />
        </View>
      </View>
    );
  };

  const renderSectionHeader = ({ section }: { section: any }) => (
    <>
      {section?.data?.length > 0 && (
        <View
          style={[
            style.sectionHeader,
            {
              marginTop:
                section.title === strings.morning
                  ? moderateScale(15)
                  : moderateScale(20),
              marginBottom: moderateScale(5),
            },
          ]}
        >
          {section?.title === strings.morning ? (
            <MorningIcon width={moderateScale(20)} height={moderateScale(20)} />
          ) : (
            <>
              {section.title === "Night" ? (
                <MoonIcon
                  width={`${moderateScale(20)}`}
                  height={`${moderateScale(20)}`}
                />
              ) : (
                <SunIcon
                  width={`${moderateScale(20)}`}
                  height={`${moderateScale(20)}`}
                />
              )}
            </>
          )}
          <View style={style?.numberOfActivty}>
            <Text style={style.sectionHeaderText}>
              {section.title} ({section?.data?.length})
            </Text>
            <View style={style?.lineBelowNumberOfActivty} />
          </View>
        </View>
      )}
    </>
  );
  // const categorizedData = useMemo(() => categorizeTasks(activityList.flat()), [activityList]);
  function getConflictingActivities(obj: any) {
    let conflictingActivities: any[] = [];

    if (typeof obj !== "object" || obj === null) return conflictingActivities;

    for (const key in obj) {
      if (key === "activities" && Array.isArray(obj[key])) {
        // Filter activities where isConflicts is true
        const conflicts = obj[key].filter(
          (activity) => activity.isConflicts === true
        );
        conflictingActivities = conflictingActivities.concat(conflicts);
      }

      // Recursively search inside nested objects
      if (typeof obj[key] === "object") {
        conflictingActivities = conflictingActivities.concat(
          getConflictingActivities(obj[key])
        );
      }
    }

    return conflictingActivities;
  }
  const goalsSection = () => {
    const categorizedData = categorizeTasks(
      activityList !== undefined ? activityList?.flat() : []
    );

    return (
      <>
        {nameSection()}
        {descriptionSection()}
        <View style={style?.containerAboveYourGoal}>
          <Text style={style?.textyourGoals}>
            {categorizedData?.length > 0 ? "Your goals" : "Activity"}
          </Text>
          <View style={style?.lineStyleyourGoals} />
        </View>
        <Text style={style?.anchoredtext}>
          {
            "Anchored in what matters to you—short-term clarity, long-term direction."
          }
        </Text>
        <View style={style?.containerlistBox}>
          {data?.map((item, index) => (
            <>
              <ItemWellnessPlan
                item={item}
                index={index}
                tapOnItem={() => handlePress(index)}
              />
              {index + 1 !== data?.length && (
                <View style={style?.goalsSeparator} />
              )}
            </>
          ))}
        </View>
        {categorizedData?.length > 0 && (
          <View style={style?.conatinerYourActivity}>
            <Text style={style?.textYourActivity}>
              {categorizedData?.length > 0 ? "Your activities" : "Activity"}
            </Text>
            <View style={style?.activitySeprator} />
          </View>
        )}
        <Text style={style?.OrganisedText}>
          {"Organized by time of day for a calmer, more focused routine."}
        </Text>
        <SectionList
          sections={categorizedData || []}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          contentContainerStyle={{
            paddingBottom: moderateScale(10),
          }}
        />
        {buttonSection(reqData, getSelectedItemsData().length > 0)}
      </>
    );
  };

  const manageButton = (isActivitySelected: any) => {
    if (isActivitySelected) {
      DeleteSelectedActivitiesFromAIResponse(getSelectedItemsData());
    } else {
      onRegenerateWellnessPlan();
    }
  };
  const buttonSection = (reqData1: any, isActivitySelected: boolean) => {
    return (
      <View style={style?.buttonContainer}>
        {wellnessData !== null ? (
          <>
            <CommonButton
              btnName={isActivitySelected ? "Replace" : "Start now"}
              mainContainer={{
                backgroundColor: colors?.backgroundTheme,
                width: "auto",
              }}
              onPress={() => {
                isActivitySelected
                  ? onReplaceActivity()
                  : onStartWellnessPlan(route?.params?.isWellPlanIDRequired);
              }}
            />
            <CommonButton
              btnName={isActivitySelected ? "Discard" : strings?.regenerateCap_}
              mainContainer={style?.CommonButtonMainContainer}
              onPress={() => manageButton(isActivitySelected)}
            />
            {![
              "SummaryTab",
              "Wellness Prompt",
              "Dashboard",
              "ExplorerActivity",
              "fromExplorer",
              "WellnessOverview",
            ].includes(from) && (
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <TouchableOpacity onPress={() => callFunction(reqData1)}>
                  <Text style={style?.mayBeLater}>{"Maybe later"}</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        ) : (
          <CommonButton
            btnName={strings?.regenerateCap_}
            mainContainer={style?.saveQuestion}
            onPress={() => saveQuestion()}
          />
        )}
      </View>
    );
  };
  const clearTemporaryTimeSlots = () => {
    allActions?.dashboardAction?.saveTemporarySlotData(dispatch, []);
    //Clear the temporary slots when user click on start now ,show me more and back button
  };

  return (
    <ScreenWrapper statusBarColor={colors?.prussianBlue}>
      {toasterDetails?.showToast && (
        <ToastApiResponse
          data={toasterDetails}
          setToasterDetails={setToasterDetails}
          code={toasterDetails?.code}
          message={toasterDetails?.message}
        />
      )}
      {isLoading ? (
        <CommonHealthLoader />
      ) : (
        <View
          style={{
            paddingHorizontal: moderateScale(20),
            flex: 1,
          }}
        >
          {header()}
          {wellnessData !== null ? (
            <ScrollView>{goalsSection()}</ScrollView>
          ) : (
            <View style={style?.somethingwentPopContainer}>
              <Text style={style?.somethingText}>
                {
                  "Oops! We couldn't generate new content based on your answers. Please click the 'Regenerate' button below to give it another slot."
                }
              </Text>
              {buttonSection(reqData, getSelectedItemsData().length > 0)}
            </View>
          )}
        </View>
      )}
      {isLoading2 && <CommonLoader />}
      {showEditModal && (
        <>
          <View>
            <Modal
              isVisible={showEditModal}
              onBackdropPress={() => setShowEditModal(false)}
              onBackButtonPress={() => setShowEditModal(false)}
              animationIn={"fadeIn"}
            >
              <View style={style?.editPopupContainer}>
                <Text style={style?.makeaChangeText}>{"Make a change"}</Text>
                <Text style={style?.updateTextstyle}>
                  {"What would you like to update?"}
                </Text>
                <Text style={style?.pickOneText}>
                  {
                    "Pick one to edit, remove, or replace—whatever feels right for you."
                  }{" "}
                </Text>
                {[
                  Enum_EditReplaceButton?.GOALS,
                  Enum_EditReplaceButton?.ACTIVITIES,
                ].map((item: any, index: number) => (
                  <TouchableOpacity
                    onPress={() => {
                      setShowEditModal(false);
                      setEditableType(item);
                      setSelectedItems([]);
                      setIsSelectionEnable(true);
                    }}
                    style={[
                      style?.editPopupButtons,
                      {
                        backgroundColor:
                          index === 1
                            ? colors.polishedPine
                            : colors?.backgroundTheme,
                      },
                    ]}
                  >
                    <Text style={style?.editbuttonTexts}>
                      {item === Enum_EditReplaceButton?.GOALS
                        ? "Goals"
                        : "Activities"}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Modal>
          </View>
        </>
      )}

      <UpgradeModal
        navigation={navigation}
        visible={showModal}
        setShowModal={setShowModal}
        fromScreen={SUBSCRIPTION_NAVIGATION_FROM?.DASHBOARD}
        isPlanner={false}
        title={IAP_Strings?.AI_genrate_wellness_plan_title}
        description={IAP_Strings?.AI_genrate_wellness_plan_desc}
      />
    </ScreenWrapper>
  );
};

export default WellnessPlan;

const style = StyleSheet.create({
  lineFullContainer: {
    height: moderateScale(5),
    backgroundColor: colors?.surfLight,
    borderRadius: moderateScale(100),
    width: width / 1.19,
    alignSelf: "center",
  },
  percentShowLine: {},
  itemContainer: {
    // marginLeft: moderateScale(20),
  },
  sectionHeader: {
    marginHorizontal: moderateScale(15),
    flexDirection: "row",
    height: moderateScale(20),
    alignItems: "center",
  },
  sectionHeaderText: {
    fontSize: textLabelSize?.subHeaderTextSize,
    color: colors.SurfCrest,
    marginHorizontal: moderateScale(10),
  },

  listHeaderDivider: {
    flex: moderateScale(1),
    borderWidth: moderateScale(1),
    borderColor: colors.grey,
    opacity: 0.2,
  },
  editPopupButtons: {
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    borderRadius: moderateScale(50),
    marginBottom: moderateScale(-5),
    paddingVertical: moderateScale(15),
  },
  editbuttonTexts: {
    color: colors?.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "600",
  },
  editPopupContainer: {
    height: moderateScale(303),
    width: moderateScale(336),
    backgroundColor: colors?.SurfCrest,
    alignItems: "center",
    padding: moderateScale(19),
    gap: moderateScale(12),
    justifyContent: "space-between",
    borderRadius: moderateScale(19),
    alignSelf: "center",
  },
  makeaChangeText: {
    fontSize: textScale(24),
    fontWeight: "700",
    color: colors?.prussianBlue,
    textAlign: "center",
  },
  updateTextstyle: {
    fontSize: textScale(16),
    fontWeight: "700",
    color: colors?.prussianBlue,
    textAlign: "center",
  },
  pickOneText: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.prussianBlue,
    textAlign: "center",
  },
  somethingwentPopContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  somethingText: { fontSize: textScale(20), color: colors.SurfCrest },
  goalsCheckBox: {
    height: 20,
    width: 20,
    marginRight: 2,
    borderWidth: 1,
    borderRadius: moderateScale(5),
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.backgroundTheme,
    marginTop: moderateScale(5),
  },
  Hitext: {
    fontSize: textScale(24),
    fontWeight: "700",
    color: colors?.SurfCrest,
  },
  personalisedText: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.SurfCrest,
    marginTop: moderateScale(5),
  },
  thoughtfullyText: {
    fontSize: textScale(12),
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
    color: colors.SurfCrest,
    marginTop: moderateScale(5),
    fontStyle: "italic",
  },
  ActivityCheck: {
    height: 20,
    width: 20,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: moderateScale(5),
    justifyContent: "center",
    alignItems: "center",
  },
  numberOfActivty: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  lineBelowNumberOfActivty: {
    width: moderateScale(200),
    height: moderateScale(1),
    backgroundColor: colors.SurfCrest,
  },
  containerAboveYourGoal: {
    marginTop: moderateScale(20),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: moderateScale(10),
  },
  textyourGoals: {
    color: colors.royalOrangeDark,
    fontWeight: "600",
    fontSize: textScale(16),
    marginRight: moderateScale(10),
  },
  lineStyleyourGoals: {
    backgroundColor: colors.SurfCrest,
    width: moderateScale(280),
    height: moderateScale(1),
  },
  anchoredtext: {
    color: colors.SurfCrest,
    fontWeight: "400",
    fontSize: textScale(14),
    marginBottom: moderateScale(20),
  },
  containerlistBox: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors?.SurfCrest,
    borderRadius: moderateScale(10),
  },
  goalsSeparator: {
    width: width - moderateScale(100),
    height: 0.5,
    backgroundColor: colors.prussianBlue,
    marginTop: 15,
    marginBottom: -5,
  },
  conatinerYourActivity: {
    marginTop: moderateScale(20),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textYourActivity: {
    color: colors.royalOrangeDark,
    fontWeight: "600",
    fontSize: textScale(16),
    marginRight: moderateScale(10),
  },
  activitySeprator: {
    backgroundColor: colors.SurfCrest,
    width: moderateScale(280),
    height: moderateScale(1),
  },
  OrganisedText: {
    color: colors.SurfCrest,
    fontWeight: "400",
    fontSize: textScale(14),
    marginTop: moderateScale(10),
  },
  buttonContainer: {
    gap: moderateScale(10),
    paddingVertical: moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
  },
  CommonButtonMainContainer: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors?.polishedPine,
    width: "auto",
  },
  mayBeLater: {
    color: colors?.royalOrangeDark,
    fontSize: textScale(14),
    fontWeight: "400",
    padding: moderateScale(10),
  },
  saveQuestion: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors?.polishedPine,
    width: "auto",
  },
});
