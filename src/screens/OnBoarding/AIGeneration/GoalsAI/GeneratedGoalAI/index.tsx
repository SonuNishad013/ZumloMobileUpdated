import {
  BackHandler,
  FlatList,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../../constant/colors";
import {
  moderateScale,
  textScale,
} from "../../../../../constant/responsiveStyle";
import ListDataView from "./ListDataView";
import * as AsyncStorage from "../../../../../utils/Storage/AsyncStorage";
import { styles } from "./styles";
import { event } from "../../../../../navigation/emitter";
import {
  filterCategoryData,
  filterglobalCodeOptionsData,
} from "../../../../../helper/getGlobalCodes";
import allActions from "../../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import CommonLoader from "../../../../../components/Loader";
import moment from "moment";
import { MM_DD_YYY } from "../../../../../constant/dateFormatConstants";
import navigationString from "../../../../../navigation/navigationString";
import BottomButtons from "../../CommonScreen/CommonComponents/BottomButtons";
import { strings } from "../../../../../constant/strings";
import UserInfoWithHealthStatusSummary from "../../CommonScreen/CommonComponents/UserInfoWithhealthStatusSummary";
import MainHeaderAI from "../../CommonScreen/CommonComponents/MainHeaderAI";
import {
  categoryName,
  codeName,
} from "../../../../../constant/AllGlobalNameConstant";
import { categorizeTasks } from "../../CommonScreen/Helper/Helper";
import CommonAlert from "../../../../../components/CommonAlert/CommonAlert";
import { capitalizeFirstLetter } from "../../../../../constant/CustomHook/CommonFunctions";
import appConstant, {
  discardActivityEnums,
} from "../../../../../constant/appConstant";
import calculateDuration from "../../../../../helper/duration";
import { UpdateUserSkippedCategory } from "../../../../../helper/commonApi";
import { CommonActions } from "@react-navigation/native";
import { formatSentenceCase } from "../../../../../helper/sentenceCase";
import CommonHeader from "../../../../../components/Header/commonHeader";
import { addKeyToActivities } from "../../../../../helper/amendDataHelper";
import ToastApiResponse from "../../../../../components/Toast/ToastApiResponse";
import Modal from "react-native-modal";
import { subscriptionFun } from "../../../../../constant/SubscriptionPlanValidation";
import {
  Ennum_ListedIn,
  Enum_EditReplaceButton,
  Enum_NavigateFrom,
  SUBSCRIPTION_NAVIGATION_FROM,
} from "../../../../../constant/ENUM";
import UpgradeModal from "../../../../SubscriptionPlan/UpgradeModal";
import { IAP_Strings } from "../../../../SubscriptionPlan/IAP_Strings";
import {
  getBuySubscriptionDetail,
  getSeekerInfoRedux,
} from "../../../../../redux/selector";
import { CalendarIcon } from "../../../../../assets";
var subscriptionStatus: any = false;

interface Props {
  navigation?: any;
  route?: any;
}
const GeneratedGoalAI: React.FC<Props> = ({ navigation, route }) => {
  const dispatch: any = useDispatch();
  const subscriptionDetail = useSelector(getBuySubscriptionDetail());
  const getseekerInfoRedux = useSelector(getSeekerInfoRedux());

  const createArray = (length: any) => {
    return Array.from({ length }, () => ({ isShow: false }));
  };
  const {
    goalsData,
    reqData,
    from,
    newString,
    purpuse,
    ExistingID,
    replcaeApiPayload,
  } = route?.params;

  const [userDeatils, setuserDeatils] = useState<any>();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [goalsGlobalCode, setgoalsGlobalCode] = useState<number>(0);
  const [data, setData] = useState<any>([]);
  const [reAnswer, setReAnswer] = useState([]);
  const [showDotClick, setShowDotClick] = useState(createArray(data?.length));
  const [exitAlert, setExitAlert] = useState(false);
  const [isCheck, setIsCheck] = useState<boolean[]>([false]);
  const [editModal, setEditModal] = useState(false);
  const [collectedGuids, setCollectedGuids] = useState<any[]>([]);
  const [dataWithoutChecked, setDataWithoutChecked] = useState<any>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editableType, setEditableType] = useState("");
  const [trackId, setTrackId] = useState<string>("");
  const [aiGeneratedResponse, setAiGeneratedResponse] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });
  const [selectedGuids, setSelectedGuids] = useState<String[]>();
  const onPressRecommendation = (index: any) => {
    let list: any = [...showDotClick];
    list[index].isShow = !list[index]?.isShow;
    setShowDotClick(list);
  };
  console.log("goalsData from", from);

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
        if (Platform.OS == "android") {
          setExitAlert(true);
          return true;
        }
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);
  useEffect(() => {
    isUserLoginToken();
    getGlobalCode();
    getLoginUserTyep();
  }, []);
  useEffect(() => {
    setData(
      addKeyToActivities(
        goalsData?.assistantResponse?.goals,
        "isChecked",
        false
      )
    );
  }, [goalsData?.assistantResponse]);
  useEffect(() => {
    setReAnswer(route?.params?.anserData);
    setShowDotClick(createArray(data?.length));
  }, [route?.params?.anserData, data]);

  const isUserLoginToken = async () => {
    let loginUserData = await AsyncStorage.getItem(
      AsyncStorage.LOGIN_USER_DATA
    );
    setuserDeatils(JSON.parse(loginUserData));
  };

  const [userType, setUserType] = useState<any>();
  const getLoginUserTyep = async () => {
    let loginType = await AsyncStorage.getItem(AsyncStorage.ISPLANNER_USER);
    setUserType(JSON.parse(loginType));
  };

  console.log("UserType-->", userType);
  const getGlobalCode = async () => {
    try {
      const getGlobalCodeData = await AsyncStorage.getItem(
        AsyncStorage.GLOBALCODEWITHCATEGORY
      );
      let getOnboardingGlobalData = await filterCategoryData(
        JSON.parse(getGlobalCodeData),
        categoryName?.aiGenerationCategory
      );
      let getGlobalCodeOptionsData = await filterglobalCodeOptionsData(
        getOnboardingGlobalData?.[0].globalCodeOptions,
        codeName?.goals
      );
      setgoalsGlobalCode(getGlobalCodeOptionsData?.[0]?.globalCodeId);
    } catch (error) {
      console.error("Error retrieving login user data:", error);
    }
  };
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

  const saveCreatedGoals = () => {
    saveCreatedGoalsAPI();
    // Intentionally commented out: this code is used to show the subscription plan purchase dialog
    // if (subscriptionStatus) {
    //   saveCreatedGoalsAPI();
    // } else {
    //   setShowModal(true);
    // }
  };
  const saveCreatedGoalsAPI = () => {
    // setisLoading(true);
    //need to handle the isConflict here as well and manage the nav and route data from schedule screen need to send whole goals data and getBack with updated keys go to activities details and then updatescheduleTimeScreen then come back here .
    console.log("myData_____________", data);
    const gotchData = getConflictingActivities(data);
    console.log("gotchDatagotchDatagotchData_____", gotchData);

    if (gotchData?.length !== 0) {
      setToasterDetails({
        showToast: true,
        code: 0,
        message:
          "You have some activities with scheduling conflicts. Please adjust them before proceeding.",
      });
      return;
    } else {
      const requestbody = ["Edit", "Replace"].includes(purpuse)
        ? {
          categoryId: goalsGlobalCode,
          trackId: trackId !== "" ? trackId : goalsData?.trackId,
          isRecordReplaced: true,
          goalId: replcaeApiPayload.id,
        }
        : {
          categoryId: goalsGlobalCode,
          trackId: goalsData?.trackId,
          isRecordReplaced: false,
          goalId: 0,
        };
      console.log("requestbody_generateGoals", requestbody);
      // return;
      allActions.OnBoarding.CreateGoalsFromAI(
        dispatch,
        requestbody,
        "saveCreatedGoals"
      )
        .then((response: any) => {
          setisLoading(false);
          if (response.statusCode == 200) {
            UpdateUserSkippedCategory(goalsGlobalCode, dispatch, allActions);
            allActions?.dashboardAction?.saveTemporarySlotData(dispatch, []);
            //Clear the temporary slots when user click on start now ,show me more and back button
            if (from === Enum_NavigateFrom?.SummaryTab) {
              navigation.pop(2);
              navigation.navigate(navigationString.Summary);
            }
            if (from === "Dashboard") {
              navigation.navigate(navigationString.PlannerDashboard, {
                from: "Dashoard",
              });
            } else if (from == "Wellness Prompt") {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    {
                      name: navigationString.Wellbeing,
                    },
                  ],
                })
              );
            } else if (from === "WellnessOverview") {
              navigation.pop(3);
            } else if (from === "IndependentGoals") {
              navigation.pop(3);
            } else {
              //"IndependentGoals"
              onSavePlanner_Explorer(userDeatils);
            }
          } else {
            setisLoading(false);
          }
        })
        .catch((err) => {
          setisLoading(false);
        });
    }
    return;
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

        if (response?.statusCode == 200) {
          if (from == "Wellness Prompt") {
            navigation.navigate(navigationString.WellnessOverview, {
              from: "Wellness Plan",
            });
          } else {
            event.emit(strings.login_);

            AsyncStorage.storeItemKey(
              AsyncStorage.ISPLANNER_USER,
              JSON.stringify({
                isPlanner:
                  from === "AIGenerated"
                    ? true
                    : userType?.isPlanner
                      ? true
                      : false,
                isSelected: true,
              })
            );
          }
        }
      })
      .catch((err) => {
        setisLoading(false);
      });
  };
  const regenerateOnboardingDetails = () => {
    setisLoading(true);

    let requestbody = {
      categoryId: goalsGlobalCode,
      aspNetUserId: null,
      regenerateStepQuesAnswer: reAnswer,
    };
    console.log("request-=-=>", requestbody);

    allActions.OnBoarding.RegenerateOnboardingDetails(
      dispatch,
      requestbody,
      "regenerateOnboardingDetails"
    )
      .then((response: any) => {
        setisLoading(false);
        if (response.statusCode == 200) {
          // setData(response?.data?.assistantResponse?.goals);
          setData(
            addKeyToActivities(
              response?.data?.assistantResponse?.goals,
              "isChecked",
              false
            )
          );
        } else if (response.statusCode == 400) {
          regenerateOnboardingDetails();
        } else {
          setisLoading(false);
        }
      })
      .catch((err) => {
        setisLoading(false);
      });
  };

  const updatedData = async (id: any, idx: any) => {
    let update = [...data];
    let findIdx = update[idx]?.activities?.findIndex(
      (item: any) => item?.guid == id
    );

    await update[idx]?.activities?.map((itm: any, index: any) => {
      // let item: any;
      if (findIdx == index) {
        console.log("itm.hasOwnProperty___>>>", itm);
        if (itm.hasOwnProperty("isChecked")) {
          itm.isChecked = !itm?.isChecked;
          return itm;
        } else {
          itm.isChecked = true;
          return itm;
        }
      } else {
        return itm;
      }
    });
    console.log("findIdx000===updateupdate2223", update);

    const dataWithoutIsChecked_ = update.map((parentItem) => ({
      ...parentItem,
      activities: parentItem.activities?.filter(
        (activity: any) => activity.isChecked === false
      ),
    }));

    console.log("---->00->", dataWithoutIsChecked_);
    setDataWithoutChecked(dataWithoutIsChecked_);
    setData(update);
    console.log("findIdx000>", findIdx, update[idx]?.activities);
  };

  const handleResetValue = () => {
    setEditModal(false);
    setEditableType("");
    setCollectedGuids([]);
    setisLoading(false);
  };

  //new code for delete selected goal's activities
  const DeleteSelectedActivitiesFromAIResponse = async () => {
    setisLoading(true);
    //Will handle if and else here, if editableType is GOALS then we will filter out the goals and
    if (editableType === "GOALS") {
      const selectedGoals = data?.filter((item: any) =>
        collectedGuids.includes(item.goalGuid)
      );
      const unSelectedGoals = data?.filter(
        (item: any) => !collectedGuids.includes(item.goalGuid)
      );
      console.log("Log_both_goals___", { selectedGoals, unSelectedGoals });
      if (!collectedGuids.length) {
        setToasterDetails({
          showToast: true,
          code: 0,
          message: "Please select at-least one goal.",
        });
        setisLoading(false);
        return;
      }
      if (selectedGoals.length === data.length) {
        setToasterDetails({
          showToast: true,
          code: 0,
          message: "The final goal cannot be deleted.",
        });
        setisLoading(false);
        return;
      }
      let requestbody = {
        guids: collectedGuids,
        trackId: goalsData?.trackId,
        category: discardActivityEnums.goals,
      };
      console.log("requestbody____>>>>", requestbody);
      allActions.OnBoarding.DeleteSelectedGoalsFromAIResponse(
        dispatch,
        requestbody,
        "DeleteSelectedActivitiesFromAIResponse"
      )
        .then((response: any) => {
          console.log(
            "response for_DeleteSelectedGoalsFromAIResponse-==>",
            response
          );
          if (response.statusCode == 200) {
            setData(unSelectedGoals);
            setEditModal(false);
            setToasterDetails({
              showToast: true,
              code: 1,
              message: response.message,
            });
          }
        })
        .catch((err) => {
          setToasterDetails({
            showToast: true,
            code: 0,
            message: err.message,
          });
          setisLoading(false);
        });
      handleResetValue();
    } else {
      //We will handle the editableType is ACTIVITIES here
      const myData = data.some((item: any) =>
        item.activities.every((activity: any) =>
          collectedGuids.includes(activity?.guid)
        )
      );
      console.log("firstmyData", myData);
      const allActivities: any[] = data
        .map((item: any) => item.activities)
        .flat();
      const dataWithoutIsChecked = data.map((parentItem: any) => ({
        ...parentItem,
        activities: parentItem.activities?.filter(
          (activity: any) => activity.isChecked === false
        ),
      }));
      console.log(
        "collectedGuids",
        collectedGuids,
        "allActivities===------???allActivities",
        allActivities?.length
      );
      if (
        allActivities?.length === 1 ||
        collectedGuids?.length === allActivities?.length ||
        myData
      ) {
        setisLoading(false);
        setEditModal(false);
        setCollectedGuids([]);
        setToasterDetails({
          showToast: true,
          code: 0,
          message:
            "You cannot remove all activities from the goals; at least one must remain.",
        });
        setData(addKeyToActivities(data, "isChecked", false));
        return;
      }

      if (!collectedGuids.length) {
        setToasterDetails({
          showToast: true,
          code: 0,
          message: "Please select at-least one activity.",
        });
        handleResetValue();
        setisLoading(false);
        setData(addKeyToActivities(data, "isChecked", false));
        return;
      }
      let requestbody = {
        guids: collectedGuids,
        trackId: goalsData?.trackId,
        category: discardActivityEnums.goals,
      };
      console.log("requestbody____>>>>", requestbody);
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
            setData(dataWithoutIsChecked);
            setEditModal(false);
            setisLoading(false);
          } else {
            setisLoading(false);
          }
          setToasterDetails({
            showToast: true,
            code: 1,
            message: response.message,
          });
        })
        .catch((err) => {
          setisLoading(false);
        });
      handleResetValue();
    }
  };

  //new code for delete selected goal's activities
  const toggleSelection = (key: String) => {
    console.log("key______???????>>", key, Array.isArray(collectedGuids));
    if (collectedGuids.includes(key)) {
      const filteredId = collectedGuids.filter((item: string) => item !== key);
      console.log("filteredId______", filteredId);
      setCollectedGuids(filteredId);
    } else {
      console.log("filteredId______[...collectedGuids, key]", [
        ...collectedGuids,
        key,
      ]);
      setCollectedGuids([...collectedGuids, key]);
    }
  };
  //new code
  const postActivitiesShowMeMore = async () => {
    setisLoading(true);
    try {
      const response =
        await allActions.dashboardAction.ReplaceGoalDetailsByIdAPI(
          dispatch,
          replcaeApiPayload,
          "ReplaceGoalDetailsByIdAPI"
        );

      setisLoading(false);
      if (response.statusCode == 200) {
        setToasterDetails({
          showToast: true,
          code: 1,
          message: response?.message,
        });
        console.log("response____>>>", response);
        setData(
          addKeyToActivities(
            response?.data?.assistantResponse?.goals,
            "isChecked",
            false
          )
        );
        setTrackId(response?.data?.trackId);
        setAiGeneratedResponse(response?.data);
      } else {
        console.log("error___________mmmmm234", response);
        setToasterDetails({
          showToast: true,
          code: 0,
          message: "Something wents wrong.",
        });
      }
    } catch (error) {
      console.log("error___________mmmmm", error);
      setToasterDetails({
        showToast: true,
        code: 0,
        message: error,
      });
      setisLoading(false);
    }
  };
  //new code
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
            borderRadius: 20,
            width: "auto",
            maxWidth: isTimeperiod ? moderateScale(160) : "auto",
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
  return (
    <ScreenWrapper statusBarColor={colors?.prussianBlue}>
      <View style={styles?.mainContainer}>
        <CommonHeader
          headerName={"Goals picked for you"} //uncomment this code later on for edit/replace functionality
          edit={!["Replace", "Edit"].includes(purpuse) && !editModal}
          editPress={() => {
            setShowEditModal(true);
            setIsCheck(data.map(() => false));
          }}
          isBackIcon={
            [
              "Dashboard",
              "Wellness Prompt",
              "WellnessOverview",
              "IndependentGoals",
              Enum_NavigateFrom?.SummaryTab,
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
                "WellnessOverview",
                "IndependentGoals",
                Enum_NavigateFrom?.SummaryTab,
              ]?.includes(from)
                ? moderateScale(10)
                : 0,
            },
          ]}
          onBackPress={() => {
            navigation.goBack();
            allActions?.dashboardAction?.saveTemporarySlotData(dispatch, []);
            //Clear the temporary slots when user click on start now ,show me more and back button
          }}
          mainContainer={styles.mainContainerHeader}
          iconContainer={styles.iconCon}
          isCross={editModal && editableType !== ""}
          onCancel={() => {
            setEditModal(false);
            setEditableType("");
            setCollectedGuids([]);
            setData(addKeyToActivities(data, "isChecked", false));
          }}
        />
        <ScrollView
          style={styles?.scrollStyle}
          contentContainerStyle={styles?.contentContainerStyle}
        >
          <UserInfoWithHealthStatusSummary
            name={
              userDeatils?.firstName &&
              ", " + capitalizeFirstLetter(userDeatils?.firstName)
            }
            subTitle={"Here are your well-being goals"}
            healthStatusSummary={
              goalsData?.assistantResponse?.healthStatusSummary
            }
          />
          <Text
            style={{
              fontSize: textScale(12),
              fontFamily: "Poppins-Regular",
              fontWeight: "400",
              color: colors.SurfCrest,
              marginTop: moderateScale(5),
              fontStyle: "italic",
            }}
          >
            {"Backed by science, powered by you. "}
          </Text>
          {descriptionSection()}
          <View
            style={{
              marginTop: moderateScale(20),
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: moderateScale(10),
            }}
          >
            <Text
              style={{
                color: colors.royalOrangeDark,
                fontWeight: "600",
                fontSize: textScale(16),
                marginRight: moderateScale(10),
              }}
            >
              {"Your goals"}
            </Text>
            <View
              style={{
                backgroundColor: colors.SurfCrest,
                width: moderateScale(280),
                height: moderateScale(1),
              }}
            />
          </View>
          {/* <Image style={styles?.iconStyle1} source={imagePath?.SunHalfIcon} /> */}
          {!isLoading ? (
            <>
              {!data || data.length <= 0 ? (
                <BottomButtons
                  data={data}
                  on_RegenerateBlank={() => regenerateOnboardingDetails()}
                />
              ) : (
                <FlatList
                  data={data}
                  keyExtractor={(item, index) => "key" + index}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }: any) => {
                    console.log("collectedGuidscollectedGuids", {
                      // collectedGuids,
                      // item,
                      condition: editModal,
                      newCon: editableType === "ACTIVITIES",
                      lastCon: showDotClick[index]?.isShow,
                    });
                    const isSelected = collectedGuids.includes(item?.goalGuid);

                    return (
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        {editableType === "GOALS" && (
                          <TouchableOpacity
                            style={{
                              height: 20,
                              width: 20,
                              marginRight: 2,
                              borderWidth: 1,
                              borderRadius: moderateScale(5),
                              justifyContent: "center",
                              alignItems: "center",
                              borderColor: colors.SurfCrest,
                              marginTop: moderateScale(5),
                            }}
                            onPress={() => toggleSelection(item?.goalGuid)} // We will update this key with guid
                          >
                            {isSelected && (
                              <Text style={{ color: colors.SurfCrest }}>✓</Text>
                            )}
                          </TouchableOpacity>
                        )}
                        <View
                          style={{
                            marginTop: moderateScale(15),
                            borderWidth: 1,
                            borderColor: colors.OceanGreen,
                            borderRadius: moderateScale(10),
                            padding: moderateScale(10),
                          }}
                        >
                          <ListDataView
                            listedIn={Ennum_ListedIn?.Goals}
                            AigeneratedData={aiGeneratedResponse ?? goalsData}
                            goalsFlatlistData={data}
                            replcaeApiPayload={replcaeApiPayload}
                            purpuse={purpuse}
                            editfor={"Goals"}
                            ExistingID={ExistingID}
                            mainTitle={formatSentenceCase(item?.title)}
                            index={index}
                            duration={calculateDuration(
                              item?.startDate,
                              item?.endDate
                            )}
                            start_end_Date={`${moment(item?.startDate).format(
                              MM_DD_YYY
                            )} to ${moment(item?.endDate).format(MM_DD_YYY)}`}
                            timeSystem={item?.timeline}
                            preferred={item?.goalCategory}
                            description={item?.description}
                            onPress={() =>
                              !editModal && onPressRecommendation(index)
                            }
                            isListShow={
                              editModal && editableType === "ACTIVITIES"
                                ? true
                                : editableType === "GOALS"
                                  ? false
                                  : showDotClick[index]?.isShow
                            }
                            combinData={
                              item?.activities?.length > 0 &&
                              item?.activities &&
                              categorizeTasks(item?.activities)
                            }
                            navigation={navigation}
                            roundButtonIcon={
                              !showDotClick[index]?.isShow && {
                                transform: [{ rotate: "180deg" }],
                              }
                            }
                            item={item}
                            from={from}
                            editModal={editModal}
                            onPressCheck={(data_: any) => {
                              console.log(
                                "onPressCheck",
                                data_,
                                "collectedGuids",
                                collectedGuids,
                                [...collectedGuids, data_]
                              );
                              if (collectedGuids.includes(data_)) {
                                const filteredData = collectedGuids.filter(
                                  (item: any) => item !== data_
                                );
                                setCollectedGuids(filteredData);
                              } else {
                                setCollectedGuids([...collectedGuids, data_]);
                              }
                              updatedData(data_, index);
                            }}
                            showCircleButton={editableType === "GOALS"}
                          />
                        </View>
                      </View>
                    );
                  }}
                  ListFooterComponent={() => (
                    <>
                      <BottomButtons
                        buttonText1={"Add to my goals"}
                        buttonText2={
                          editModal ? strings?.discard : "Explore more options"
                        }
                        data={data}
                        on_StartNow={saveCreatedGoals}
                        on_RegenerateQuestions={() => {
                          if (purpuse === "Replace") {
                            postActivitiesShowMeMore();
                          } else {
                            navigation.navigate(
                              navigationString?.ReGenerateGoalAI,
                              {
                                from: from,
                                reqData: reqData,
                                newString: newString,
                              }
                            );
                          }
                        }}
                        onDiscardClick={() => {
                          DeleteSelectedActivitiesFromAIResponse();
                        }}
                        onEditRegenerateClick={() => {
                          console.log("first");

                          if (editableType === "GOALS") {
                            const selectedGoals =
                              goalsData?.assistantResponse?.goals?.filter(
                                (item: any) =>
                                  collectedGuids.includes(item.goalGuid)
                              );
                            console.log(
                              "selectedGoals______",

                              {
                                selectedGoals,
                                collectedGuids,
                                goalsArray: goalsData,
                              }
                            );
                            console.log("selectedGoals______aaaaa", {
                              from: from,
                              reqData: reqData,
                              newString: newString,
                              GuIs: collectedGuids,
                              GoalsGuid: collectedGuids,
                              selectedGoals,
                              editModal,
                              trackId: goalsData?.trackId,
                              responseType: goalsData?.responseType,
                              editableType,
                            });

                            if (!collectedGuids.length) {
                              setToasterDetails({
                                showToast: true,
                                code: 0,
                                message: "Please select at-least one goal.",
                              });
                              return;
                            }
                            navigation.navigate(
                              navigationString?.ReGenerateGoalAI,
                              {
                                from: from,
                                reqData: reqData,
                                newString: newString,
                                GuIs: collectedGuids,
                                GoalsGuid: collectedGuids,
                                selectedGoals,
                                editModal,
                                trackId: goalsData?.trackId,
                                responseType: goalsData?.responseType,
                                // regenerateQuestionsResponsebyUser:
                                //   regenerateQuestionsResponsebyUser,
                                editableType,
                              }
                            );
                          } else {
                            const filterSelected = data.filter(
                              (_: any, index: number) => isCheck[index]
                            );
                            console.log("filterSelected", filterSelected);
                            const GuIs = filterSelected.map(
                              (item: any) => item?.guid
                            );
                            console.log("filterSelected=guid", GuIs);
                            if (!collectedGuids.length) {
                              setToasterDetails({
                                showToast: true,
                                code: 0,
                                message: "Please select at-least one activity.",
                              });
                              return;
                            }
                            navigation.navigate(
                              navigationString?.ReGenerateGoalAI,
                              {
                                from: from,
                                reqData: reqData,
                                newString: newString,
                                GuIs: collectedGuids,
                                filterSelected,
                                editModal,
                                trackId: goalsData?.trackId,
                                responseType: goalsData?.responseType,
                                editableType,
                              }
                            );
                            setTimeout(() => {
                              setData(
                                addKeyToActivities(data, "isChecked", false)
                              );
                            }, 300);
                          }

                          setEditModal(false);
                          setCollectedGuids([]);
                          setEditableType("");
                        }}
                        isEditingEnable={editModal}
                        isSkip={
                          [
                            "Wellness Prompt",
                            "Dashboard",
                            "WellnessOverview",
                            "DailyRoutine",
                            "IndependentGoals",
                            Enum_NavigateFrom?.SummaryTab,
                          ].includes(from)
                            ? false
                            : true
                        }
                        onSkipPress={() =>
                          navigation.navigate(navigationString.SelectActivity, {
                            from: from,
                            reqData: reqData,
                            newString: newString,
                          })
                        }
                        aiSuggestion={"goals"}
                      />
                    </>
                  )}
                />
              )}
            </>
          ) : (
            <View
              style={{
                marginTop: moderateScale(200),
              }}
            >
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
            alertLeftButtonOnPress={() => {
              setExitAlert(false);
            }}
            alertRightButtonOnPress={() => {
              setExitAlert(false);
              BackHandler.exitApp();
            }}
            isAlertIcon
          />
        )}
        {toasterDetails?.showToast && (
          <ToastApiResponse
            data={toasterDetails}
            setToasterDetails={setToasterDetails}
            code={toasterDetails?.code}
            message={toasterDetails?.message}
          />
        )}

        {showEditModal && (
          <>
            <View>
              <Modal
                isVisible={showEditModal}
                onBackdropPress={() => setShowEditModal(false)}
                onBackButtonPress={() => setShowEditModal(false)}
                animationIn={"fadeIn"}
              >
                <View
                  style={{
                    height: moderateScale(303),
                    width: moderateScale(336),
                    backgroundColor: colors?.SurfCrest,
                    alignItems: "center",
                    padding: moderateScale(19),
                    borderRadius: moderateScale(19),
                    alignSelf: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: textScale(24),
                      fontWeight: "700",
                      color: colors?.prussianBlue,
                      textAlign: "center",
                    }}
                  >
                    {"Want to make a change?"}
                  </Text>
                  <Text
                    style={{
                      fontSize: textScale(14),
                      fontWeight: "400",
                      color: colors?.prussianBlue,
                      textAlign: "center",
                      marginTop: moderateScale(20),
                    }}
                  >
                    {
                      "Pick what you’d like to update—your goal or the steps that support it."
                    }
                  </Text>
                  <View style={{ marginTop: moderateScale(30) }} />
                  {[
                    Enum_EditReplaceButton?.GOALS,
                    Enum_EditReplaceButton?.ACTIVITIES,
                  ].map((item: any, index: number) => (
                    <TouchableOpacity
                      onPress={() => {
                        setShowEditModal(false);
                        setEditableType(item);
                        setEditModal(true);
                      }}
                      style={{
                        paddingVertical: moderateScale(15),
                        backgroundColor:
                          index === 1
                            ? colors.polishedPine
                            : colors?.backgroundTheme,
                        justifyContent: "center",
                        alignItems: "center",
                        width: "70%",
                        borderRadius: moderateScale(50),
                        marginBottom: moderateScale(-5),
                        marginTop: moderateScale(20),
                      }}
                    >
                      <Text
                        style={{
                          color: colors?.SurfCrest,
                          fontSize: textScale(14),
                          fontWeight: "500",
                        }}
                      >
                        {item === Enum_EditReplaceButton?.GOALS
                          ? "Edit goals"
                          : "Edit activities"}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </Modal>
            </View>
          </>
        )}
      </View>

      <UpgradeModal
        navigation={navigation}
        visible={showModal}
        setShowModal={setShowModal}
        fromScreen={SUBSCRIPTION_NAVIGATION_FROM?.DASHBOARD}
        isPlanner={false}
        title={IAP_Strings?.AI_genrate_goals_title}
        description={IAP_Strings?.AI_genrate_goals_desc}
      />
    </ScreenWrapper>
  );
};

export default GeneratedGoalAI;
