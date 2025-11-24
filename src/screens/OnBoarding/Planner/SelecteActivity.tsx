import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomAlert from "../../../components/CommonAlert/CustomAlert";
import { imagePath } from "../../../assets/png/imagePath";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import navigationString from "../../../navigation/navigationString";
import * as AsyncStorageUtils from "../../../utils/Storage/AsyncStorage";
import {
  filterCategoryData,
  filterglobalCodeOptionsData,
} from "../../../helper/getGlobalCodes";
import allActions from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import CommonAlert from "../../../components/CommonAlert/CommonAlert";
import CommonHealthLoader from "../../../components/Loader/CommonHealthLoader";
import {
  height,
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import { strings } from "../../../constant/strings";
import * as AsyncStorage from "../../../utils/Storage/AsyncStorage";
import CommonButton from "../../../components/Buttons/commonButton";
import QuizModal from "./QuizModal";
import appConstant, { aiProvider } from "../../../constant/appConstant";
import { useFocusEffect } from "@react-navigation/native";
import { categoryName } from "../../../constant/AllGlobalNameConstant";
import { formatSentenceCase } from "../../../helper/sentenceCase";
import * as AsyncStore from "../../../utils/Storage/AsyncStorage";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import {
  APPLY_STATUS,
  Enum_NavigateFrom,
  skipCategoryEnum,
  SUBSCRIPTION_NAVIGATION_FROM,
} from "../../../constant/ENUM";
import { styles } from "./styles";
import { subscriptionFun } from "../../../constant/SubscriptionPlanValidation";
import {
  getBuySubscriptionDetail,
  getSeekerInfoRedux,
} from "../../../redux/selector";
import UpgradeModal from "../../SubscriptionPlan/UpgradeModal";
import { IAP_Strings } from "../../SubscriptionPlan/IAP_Strings";
import logger from "../../../constant/logger";

interface Props {
  navigation?: any;
  route?: any;
}
const SelectActivity: React.FC<Props> = ({ navigation, route }) => {
  const dispatch: any = useDispatch();
  const { reqData, from } = route?.params;

  const [isLoading, setisLoading] = useState(false);
  const [getWellnessGlobalData, setgetWellnessGlobalData] = useState<any>();
  const [AllGlobalCode, setAllGlobalCode] = useState<any>([]);
  const [alertMessage, setAlertMessage] = useState<any>("");
  const [skipCategory, setSkipCategory] = useState<any>(null);
  const [alertTitle, setAlertTitle] = useState<any>("");
  const [responseData, setResponseData] = useState([]);
  const [isAlertModal, setIsAlertModal] = useState<boolean>(false);
  const [newObj, setNewObj] = useState<any>([]);
  const [oldObj, setOldObj] = useState<any>([
    strings.conversation,
    strings.wellness_plan,
    strings.goals_lower_case,
    strings.activities_lower_case,
    strings.recommendations,
    strings.quiz,
  ]);
  const [subscriptionModal, setSubscriptionModal] = useState(false);
  const [isChatModal, setisChatModal] = useState(false);
  const [isQuizModal, setisQuizModal] = useState(false);
  const [userData, setUserData] = useState<any>();
  const [isFailedModal, setIsFailedModal] = useState(false);
  const [failtedMessage, setFailedMessage] = useState("");
  const [SkipCategoryString, setSkipCategoryString] = useState(
    from == "AIGenerated" ? route?.params?.newString : ""
  );
  const [QuizData, setQuizData] = useState<any>([]);
  const [isAI_Activity, setisAI_Activity] = useState(false);
  const [QuizData1, setQuizData1] = useState<any>();
  const [isCategorySelected, setisCategorySelected] = useState(false);
  const [userToken, setuserToken] = useState<any>();
  const [initialQuestionResponse, setInitialQuestionResponse] = useState<any[]>(
    []
  );

  useEffect(() => {
    getGlobalCode();
    seekerOnboardingStepAnswer(false);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setisLoading(true);
      setSkipCategoryString(
        from === "AIGenerated" ? route?.params?.newString : ""
      );
      const timeoutId = setTimeout(() => {
        if (from === "AIGenerated") {
          setSkipCategoryString(route?.params?.newString);
          onSkipGoal(reqData, from, route?.params?.newString);
        }
      }, 500);

      return () => clearTimeout(timeoutId); // Cleanup to avoid memory leaks
    }, [from, route?.params?.newString]) // Include all relevant dependencies
  );

  useEffect(() => {
    isUserLoginToken();
    getUserTokenn();
  }, []);
  const getUserTokenn = async () => {
    let bearerToken = await AsyncStore.getItem(AsyncStore.ACCESS_TOKEN);
    let questionResponse = await AsyncStore.getItem(
      AsyncStore?.ONBOARDING_QUESTIONS_RESPONSE
    );
    logger("questionResponse_____", {
      questionResponse,
      parsed_questionResponse: JSON?.parse(questionResponse)?.reqData,
    });
    setInitialQuestionResponse(JSON?.parse(questionResponse)?.reqData);

    setuserToken(bearerToken);
  };
  const isUserLoginToken = async () => {
    let loginUserData = await AsyncStorage.getItem(
      AsyncStorage.LOGIN_USER_DATA
    );
    AsyncStorage.storeItemKey(
      AsyncStorageUtils.IS_WELLNESSPLAN_SELECTED,
      JSON.stringify(false)
    );
    if (loginUserData !== null) {
      setUserData(JSON.parse(loginUserData));
    }
  };
  const getGlobalCode = async () => {
    try {
      const getGlobalCodeData = await AsyncStorageUtils.getItem(
        AsyncStorageUtils.GLOBALCODEWITHCATEGORY
      );
      let getWellnessGlobalData = await filterCategoryData(
        JSON.parse(getGlobalCodeData),
        categoryName.aiGenerationCategory
      );

      setAllGlobalCode(getWellnessGlobalData?.[0]?.globalCodeOptions);

      let getGlobalCodeOptionsData = await filterglobalCodeOptionsData(
        getWellnessGlobalData?.[0].globalCodeOptions,
        "WellnessPlan"
      );

      setgetWellnessGlobalData(getGlobalCodeOptionsData);
    } catch (error) {
      console.error("Error retrieving login user data:", error);
    }
  };
  const moveItem = (Item: any) => {
    let item = /wellness/i.test(Item)
      ? "wellness"
      : Item === "quiz"
      ? "quiz"
      : Item;

    const index = oldObj.indexOf(item);

    if (index !== -1) {
      let newoldObj = [...oldObj];
      newoldObj.splice(index, 1);
      let updateOldArray = newoldObj;

      setOldObj(newoldObj);
      const newnewObj = [...newObj, item];
      let updateNewArray = newnewObj;
      setNewObj(newnewObj);

      let string = `Give me another response from the choice of {${updateOldArray.join(
        ", "
      )}}.I do not want this response {${updateNewArray.join(", ")}}.`;
      console.log("is-string", newoldObj);

      setSkipCategoryString(string);
      return string;
    }
  };

  const seekerOnboardingStepAnswer = async (
    isRetry: boolean,
    from?: any,
    newString?: any
  ) => {
    setisAI_Activity(false);
    setIsFailedModal(false);
    setisLoading(true);
    try {
      const requestBody = {
        categoryId: 0,
        linkRequired: false,
        aiProvider: aiProvider?.Goals,
        isCategorySelected: isCategorySelected,
        skipCategory:
          from === "AIGenerated"
            ? newString
            : skipCategory
            ? !isRetry
              ? moveItem(skipCategory)
              : SkipCategoryString
            : null,
        stepOption: reqData,
      };

      const response =
        await allActions.seekerDetails.SeekerOnboardingStepAnswer(
          dispatch,
          requestBody,
          "seekerOnboardingStepAnswer"
        );
      setisLoading(false);

      if (response?.statusCode === 200) {
        const skipStatus: any = response?.data;
        if (!skipStatus) {
          seekerOnboardingStepAnswer(false);
          return;
        }
        const responseType =
          skipStatus.responseType ||
          skipStatus.response_type ||
          skipStatus?.response_Type ||
          skipStatus?.responseType ||
          "wellness";

        setSkipCategory(responseType);

        setAlertTitle(responseType);
        setResponseData(skipStatus);
        setAlertMessage(skipStatus?.validationMessage || "");
        if (responseType === strings.conversation) {
          setisChatModal(true);
          setIsAlertModal(false);
        } else if (responseType == strings.quiz || responseType == "quiz") {
          setisQuizModal(true);
          setIsAlertModal(false);
          setQuizData(
            skipStatus?.assistantResponse?.challenges?.[0]?.goals?.[0]?.quizzes
          );
          setQuizData1(
            skipStatus?.assistantResponse?.challenges?.[0]?.goals?.[0]
          );
        } else if (response.data.responseType === "error") {
          handleError(response?.data?.error);
        } else {
          setIsAlertModal(true);
        }
      } else {
        handleError(response?.message);
      }
    } catch (error: any) {
      setisLoading(false);
      console.log("Network Error:", error);
      handleError(error?.message);
    }
  };

  const handleError = (message: any) => {
    setIsFailedModal(true);
    setisLoading(false);
    setFailedMessage(message);
  };

  const GetOnboardingSteps = (categoryId: any, skipCategory: any) => {
    setisLoading(true);
    let newString = moveItem(skipCategory);
    let requestbody = {};
    allActions.OnBoarding.GetOnboardingSteps(
      dispatch,
      requestbody,
      API_FUN_NAMES?.getOnboardingSteps,
      categoryId
    )
      .then((response: any) => {
        setisLoading(false);
        if (response.statusCode == 200) {
          setIsAlertModal(false);

          navigation.navigate(navigationString.WellnessPlanIndex, {
            wellnessQuestions: response.data,
            reqData1: reqData,
            from: "AIGenerated",
            newString: newString,
          });
        } else {
        }
      })
      .catch((err) => {
        setisLoading(false);
      });
  };
  const callApi = async (
    isSelected: any,
    skipCategory: any,
    categoryId: any,
    isaiProviderRequired: boolean
  ) => {
    let newString = moveItem(skipCategory);

    setisChatModal(false);
    setisQuizModal(false);
    setisAI_Activity(false);
    setIsFailedModal(false);
    setisLoading(true);
    setIsAlertModal(false);
    try {
      const requestBody = {
        isCategorySelected: true,
        stepOption: initialQuestionResponse,
        categoryId: categoryId,
        linkRequired: false,
        aiProvider: aiProvider?.Goals,
      };

      const response =
        await allActions.seekerDetails.SeekerOnboardingStepAnswer(
          dispatch,
          requestBody,
          API_FUN_NAMES?.seekerOnboardingStepAnswer
        );

      const skipStatus: any = response?.data;
      const responseType =
        skipStatus.responseType ||
        skipStatus.response_type ||
        skipStatus?.response_Type ||
        skipStatus?.responseType;

      setSkipCategory(responseType);
      setisLoading(false);
      if (response?.statusCode == 200) {
        setisLoading(false);
        setIsAlertModal(false);

        if (skipCategory == skipCategoryEnum?.RECOMMENDATIONS) {
          navigation?.navigate(navigationString?.GeneratedRecommendationsAI, {
            recommendationsData: response?.data,
            reqData: reqData,
            from: "AIGenerated",
            newString: newString,
          });
        }

        if (
          [skipCategoryEnum?.QUIZ, skipCategoryEnum?.QUIZ_SMALL_CASE].includes(
            skipCategory
          )
        ) {
          skipStatus?.assistantResponse?.challenges?.[0]?.goals?.[0]
            ?.quizzes?.[0]?.question &&
            navigation.navigate(navigationString.Quiz, {
              QuizData:
                response?.data?.assistantResponse?.challenges?.[0]?.goals?.[0]
                  ?.quizzes?.[0],
              userData: userData,
              QuizDataDetails:
                skipStatus?.assistantResponse?.challenges?.[0]?.goals?.[0],
              reqData: reqData,
              from: "AIGenerated",
              newString: newString,
            });
        }
        //goal
        if (skipCategory == skipCategoryEnum?.GOALS_LOWERCASE) {
          navigation?.navigate(navigationString?.GeneratedGoalAI, {
            goalsData: response?.data,
            reqData: reqData,
            from: "AIGenerated",
            newString: newString,
          });
        }
        //activity
        if (skipCategory == skipCategoryEnum?.ACTIVITIES_LOWERCASE) {
          navigation?.navigate(navigationString?.GeneratedActivitiesAI, {
            activitesData: response?.data,
            reqData: reqData,
            from: "AIGenerated",
            newString: newString,
          });
        }
      }
    } catch (error: any) {
      setisLoading(false);
      console.log("Network Error:", error);
      handleError(error?.message);
    }
  };

  const getGlobalCodeId = (categoryName: any) => {
    return AllGlobalCode?.find(
      (item: any) => item.codeName.toLowerCase() === categoryName.toLowerCase()
    )?.globalCodeId;
  };

  const onYesClick = async () => {
    switch (skipCategory) {
      case strings.wellness_plan1:
        GetOnboardingSteps(getGlobalCodeId("WellnessPlan"), skipCategory);
        break;
      case strings.goals_lower_case:
        setIsAlertModal(false);
        callApi(true, skipCategory, getGlobalCodeId("Goals"), true);
        break;
      case strings.recommendations:
        setIsAlertModal(false);
        let newString = moveItem(skipCategory);
        // callApi(true, skipCategory, getGlobalCodeId("Recommendations"), false);
        navigation?.navigate(navigationString?.QuestionForBooksAndVideo, {
          from: Enum_NavigateFrom?.AIGenerated,
          reqData: reqData,
          newString: newString,
        });
        break;
      case strings.activities_lower_case:
        setIsAlertModal(false);
        callApi(true, skipCategory, getGlobalCodeId("Activities"), false);
        break;
      case strings.conversation:
        setIsAlertModal(false);
        navigation?.navigate(navigationString?.GeneratedRecommendationsAI, {
          recommendationsData: responseData,
        });
        break;
      case "Wellness Plan":
        GetOnboardingSteps(getGlobalCodeId("WellnessPlan"), skipCategory);
        break;
      case "wellness plan":
        GetOnboardingSteps(getGlobalCodeId("WellnessPlan"), skipCategory);
        break;
      case strings?.wellness_plan:
        GetOnboardingSteps(getGlobalCodeId("WellnessPlan"), skipCategory);
        break;
      case "wellness":
        GetOnboardingSteps(getGlobalCodeId("WellnessPlan"), skipCategory);
        break;
      default:
        break;
    }
  };

  const onSkipGoal = (reqData?: any, from?: any, newString?: any) => {
    let onSkipConditon =
      newString !== undefined ? oldObj.length === 0 : oldObj.length === 1;

    if (onSkipConditon) {
      setIsAlertModal(false);
      setisChatModal(false);
      setisQuizModal(false);
      onSavePlanner_Explorer(userData, true);
    } else {
      seekerOnboardingStepAnswer(false, from, newString);
    }
  };
  const onChatStart = () => {
    setisChatModal(false);
    onSavePlanner_Explorer(userData, false); //call this function because on selecting conversation we are taking user to conversation and from there we are giving 2 option to the user eighter go to dashboard on backicon click or chat, we are not saving user stratergyTypeId as planner or explorer
  };
  const onSavePlanner_Explorer = (userData: any, chatClick: boolean) => {
    let req = {
      userId: userData?.id !== undefined ? userData?.userId : 0,
      strategyTypeId: appConstant.explorer_planner_type.planner,
    };

    setisLoading(true);

    allActions.OnBoarding.SaveSeekerPlannerExplorerId(
      dispatch,
      req,
      API_FUN_NAMES?.onSavePlanner_Explorer
    )
      .then((response: any) => {
        setisLoading(false);
        AsyncStorage.storeItemKey(
          AsyncStorage.ISPLANNER_USER,
          JSON.stringify({ isPlanner: true, isSelected: true })
        );
        if (chatClick === true) {
          const onSelectExplorer_ = () => {
            let req = {
              userId: userData?.userId !== undefined ? userData?.userId : 0,
              strategyTypeId: appConstant.explorer_planner_type.planner,
            };

            allActions.OnBoarding.SaveSeekerPlannerExplorerId(
              dispatch,
              req,
              "saveQuestion"
            )
              .then((response: any) => {
                navigation?.navigate(navigationString?.ProductGuideMain, {
                  from: "AIGeneratedSkipped",
                });
              })
              .catch((err) => {});
          };
          onSelectExplorer_();
        } else {
          navigation?.navigate(navigationString?.ChatScreen, {
            userData: userData,
            reqData: reqData,
            from: "AIGenerated",
            userTokenn: userToken,
          });
        }
      })
      .catch((err) => {
        setisLoading(false);
      });
  };
  const chatModal = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          marginHorizontal: moderateScale(15),
          marginBottom: moderateScale(50),
        }}
      >
        <View>
          <ImageBackground
            source={imagePath.NewChatModal}
            resizeMode={APPLY_STATUS?.contain}
            style={styles?.chatModalContainer}
          >
            <View style={styles?.innerContainer}>
              <Text style={styles?.greetingTextStyle}>
                {strings.chatGreeting}
              </Text>
              <Text style={styles?.descriptionTextStyle}>
                {strings.chatModalDescription}
              </Text>
              <Text
                style={{
                  fontSize: textScale(16),
                  fontWeight: "700",
                  color: colors.SaltBox,
                  textAlign: "center",
                  marginTop: moderateScale(0),
                }}
              >
                {"Tap the bubble below -\nI’m all ears. "}
              </Text>
            </View>
            <View style={styles?.buttonouterView}>
              <View style={styles?.buttonInnerView} />
              <TouchableOpacity
                onPress={() => onChatStart()}
                style={styles?.buttonContainer}
              />
            </View>
          </ImageBackground>
        </View>

        <CommonButton
          btnName={formatSentenceCase("Maybe later")}
          onPress={() => {
            setisChatModal(false);
            onSkipGoal();
          }}
          mainContainer={styles?.buttonMainContainer}
        />
      </View>
    );
  };

  const getCategoryId = (categoryName: any) => {
    const result = AllGlobalCode.find(
      (item: any) => item?.codeName == categoryName
    );
    return result.globalCodeId;
  };

  return (
    <ScreenWrapper statusBarColor={colors?.SaltBox}>
      <ImageBackground source={imagePath.BGSaltFlow} style={{ flex: 1 }}>
        {!isLoading ? (
          <CustomAlert
            heading={formatSentenceCase(alertTitle)}
            subHeading={alertMessage}
            issubHeading={alertMessage !== undefined}
            visible={isAlertModal}
            onSkip={() => onSkipGoal()}
            onYes={() => onYesClick()}
            imageSource={renderAlertImageCard(skipCategory)}
            onYesStyle={{ backgroundColor: colors.polishedPine }}
            onSkipStyle={{
              backgroundColor:
                skipCategory === strings.wellness_plan
                  ? colors?.lightTheme2
                  : skipCategory === strings.recommendations
                  ? colors?.SurfCrest
                  : colors.prussianBlue,
            }}
            skipCategory={skipCategory}
            leftButtonText={formatSentenceCase("Not today")}
            rightButtonText={formatSentenceCase("Let’s go ")}
            leftButtonTextStyle={{
              color:
                skipCategory === strings.recommendations
                  ? colors?.prussianBlue
                  : colors?.SurfCrest,
            }}
            headingSubHeadingTextColor={{
              color:
                skipCategory === strings.activities_lower_case
                  ? colors?.prussianBlue
                  : skipCategory === strings.wellness_plan
                  ? colors?.royalOrangeDark
                  : colors?.SurfCrest,
            }}
          />
        ) : (
          <View style={styles?.loaderContainer}>
            <CommonHealthLoader />
          </View>
        )}
        <CommonAlert
          isVisible={isFailedModal}
          alertMessage={failtedMessage}
          alertRightButtonOnPress={() => seekerOnboardingStepAnswer(true)}
          alertRightButtonText={strings.retry}
        />

        {isChatModal && <>{chatModal()}</>}
        {isQuizModal && (
          <>
            <QuizModal
              onPressSkip={() => {
                setisChatModal(false);
                setisQuizModal(false);
                onSkipGoal();
              }}
              onPressYes={() =>
                callApi(true, skipCategory, getCategoryId("Quiz"), false)
              }
            />
          </>
        )}
      </ImageBackground>
    </ScreenWrapper>
  );
};
export default SelectActivity;

const renderAlertImageCard = (skipCategory: string) => {
  switch (skipCategory) {
    case strings.wellness_plan:
      return imagePath?.WellnessPlanCard;
    case strings.wellness_plan2:
      return imagePath?.WellnessPlanCard;
    case strings?.wellness_plan1:
      return imagePath?.WellnessPlanCard;
    case strings?.wellness:
      return imagePath?.WellnessPlanCard;
    case strings.goals_lower_case:
      return imagePath?.GoalsCard;
    case strings.activities_lower_case:
      return imagePath?.ActivityCard;
    case strings.recommendations:
      return imagePath?.RecommendationCard;
    default:
      break;
  }
};
