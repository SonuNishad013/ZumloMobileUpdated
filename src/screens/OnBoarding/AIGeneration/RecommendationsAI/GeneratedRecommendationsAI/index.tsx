import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../../constant/colors";
import { styles } from "./styles";
import { moderateScale } from "../../../../../constant/responsiveStyle";
import { imagePath } from "../../../../../assets/png/imagePath";
import * as AsyncStorage from "../../../../../utils/Storage/AsyncStorage";
import navigationString from "../../../../../navigation/navigationString";
import { event } from "../../../../../navigation/emitter";
import ActivitesRecommendationCard from "../../../../../components/OnBoardiingComponents/ActivitesRecommendationCard";
import {
  filterCategoryData,
  filterglobalCodeOptionsData,
} from "../../../../../helper/getGlobalCodes";
import allActions from "../../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import CommonLoader from "../../../../../components/Loader";
import UserInfoWithHealthStatusSummary from "../../CommonScreen/CommonComponents/UserInfoWithhealthStatusSummary";
import { strings } from "../../../../../constant/strings";
import BottomButtons from "../../CommonScreen/CommonComponents/BottomButtons";
import MainHeaderAI from "../../CommonScreen/CommonComponents/MainHeaderAI";
import CommonAlert from "../../../../../components/CommonAlert/CommonAlert";
import { capitalizeFirstLetter } from "../../../../../constant/CustomHook/CommonFunctions";
import {
  categoryName,
  codeName,
} from "../../../../../constant/AllGlobalNameConstant";
import appConstant from "../../../../../constant/appConstant";
import { UpdateUserSkippedCategory } from "../../../../../helper/commonApi";
import { CommonActions } from "@react-navigation/native";
import { subscriptionFun } from "../../../../../constant/SubscriptionPlanValidation";
import {
  Enum_RecommendationContentType,
  Enum_RecommendationListedIn,
  RecommendationTab_ENUM,
  SUBSCRIPTION_NAVIGATION_FROM,
} from "../../../../../constant/ENUM";
import {
  getBuySubscriptionDetail,
  getSeekerInfoRedux,
} from "../../../../../redux/selector";
import UpgradeModal from "../../../../SubscriptionPlan/UpgradeModal";
import { IAP_Strings } from "../../../../SubscriptionPlan/IAP_Strings";
import logger from "../../../../../constant/logger";
import { examplerImage } from "../../../../../constant/RecommendationConstant";
import RecommendationCardForBooks from "../../../../../components/OnBoardiingComponents/RecommendationCardForBooks";
import RecommendationCard from "../../../../../components/OnBoardiingComponents/RecommendationCard";
import { getThumbnailFromYoutubeURL } from "../../../../../helper/RecommendationHelper";

var subscriptionStatus: any = false;
interface Props {
  navigation?: any;
  route?: any;
}
const GeneratedRecommendationsAI: React.FC<Props> = ({ navigation, route }) => {
  const { recommendationsData, reqData, from, newString } = route?.params;

  const subscriptionDetail = useSelector(getBuySubscriptionDetail());
  const getseekerInfoRedux = useSelector(getSeekerInfoRedux());

  const dispatch: any = useDispatch();
  const [isLoading, setIsLoading] = useState<any>(false);
  const [userDeatils, setuserDeatils] = useState<any>();
  const [reAnswer, setReAnswer] = useState(route?.params?.anserData);
  const [showModal, setShowModal] = useState(false);
  const [recommendationsGlobalCode, setRecommendationsGlobalCode] =
    useState<any>(0);
  const [data, setData] = useState<any>([]);
  const [exitAlert, setExitAlert] = useState(false);
  const [buttonValue, setButtonValue] = useState<string>(
    RecommendationTab_ENUM?.VIDEOS
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

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      strings?.hardwareBackPress,
      () => {
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

  const [UserType, setUserType] = useState<any>();
  const getLoginUserTyep = async () => {
    let loginType = await AsyncStorage.getItem(AsyncStorage.ISPLANNER_USER);
    setUserType(JSON.parse(loginType));
  };

  useEffect(() => {
    console.log("call_data_1", recommendationsData);
    //assistantResponse.recommendations[0].books
    if (recommendationsData) {
      setData({
        videos:
          recommendationsData?.assistantResponse.recommendations[0].videos ||
          [],
        books:
          recommendationsData?.assistantResponse.recommendations[0].books || [],
      });
    }
    // setData(recommendationsData?.assistantResponse?.recommendations);
  }, [recommendationsData?.assistantResponse?.recommendations, buttonValue]);
  useEffect(() => {
    setReAnswer(route?.params?.anserData);
  }, [route?.params?.anserData]);

  const isUserLoginToken = async () => {
    let loginUserData = await AsyncStorage.getItem(
      AsyncStorage.LOGIN_USER_DATA
    );
    setuserDeatils(JSON.parse(loginUserData));
  };
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
        codeName?.recommendations
      );

      setRecommendationsGlobalCode(getGlobalCodeOptionsData?.[0]?.globalCodeId);
    } catch (error) {
      console.error("Error retrieving login user data:", error);
    }
  };

  const createRecommendations = () => {
    createRecommendationsAPI();
    // Intentionally commented out: this code is used to show the subscription plan purchase dialog
    // if (subscriptionStatus) {
    //   createRecommendationsAPI();
    // } else {
    //   setShowModal(true);
    // }
  };
  const createRecommendationsAPI = () => {
    setIsLoading(true);

    let requestbody = {
      categoryId: recommendationsGlobalCode,
      trackId: recommendationsData?.trackId,
    };

    allActions.OnBoarding.CreateRecommendationsFromAI(
      dispatch,
      requestbody,
      "createRecommendations"
    )
      .then((response: any) => {
        setIsLoading(false);

        console.log("call_api_1");
        if (response.statusCode == 200) {
          UpdateUserSkippedCategory(
            recommendationsGlobalCode,
            dispatch,
            allActions
          );
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
          } else {
            onSavePlanner_Explorer(userDeatils);
          }
        } else {
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  const onSavePlanner_Explorer = (userData: any) => {
    let req = {
      userId: userData?.id !== undefined ? userData?.userId : 0,
      strategyTypeId: appConstant.explorer_planner_type.planner,
    };

    setIsLoading(true);

    allActions.OnBoarding.SaveSeekerPlannerExplorerId(
      dispatch,
      req,
      "onSavePlanner_Explorer"
    )
      .then((response: any) => {
        setIsLoading(false);

        if (response?.statusCode == 200) {
          if (from == strings.WellnessPrompt) {
            navigation.navigate(navigationString.WellnessOverview, {
              from: "Wellness Plan",
            });
          } else if (from == "Dashoard") {
            navigation.navigate(navigationString.PlannerDashboard, {
              from: "Dashoard",
            });
          } else {
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
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  const regenerateOnboardingDetails = () => {
    setIsLoading(true);

    let requestbody = {
      categoryId: recommendationsGlobalCode,
      aspNetUserId: null,
      regenerateStepQuesAnswer: reAnswer,
    };

    allActions.OnBoarding.RegenerateOnboardingDetails(
      dispatch,
      requestbody,
      "regenerateOnboardingDetails"
    )
      .then((response: any) => {
        setIsLoading(false);
        if (response.statusCode == 200) {
          console.log("call_data_2");

          // setData(response?.data?.assistantResponse?.recommendations);
          setData({
            videos: response?.data?.videos || [],
            books: response?.data?.books || [],
          });
        } else {
          // regenerateOnboardingDetails();
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  return (
    logger("data___", data),
    (
      <ScreenWrapper statusBarColor={colors?.prussianBlue}>
        <View style={styles?.mainContainer}>
          <Image style={styles?.iconStyle2} source={imagePath?.SunHalfIcon} />
          <MainHeaderAI
            title={"Recommendations"}
            navigation={navigation}
            isBackIcon={
              ["Dashboard", "Wellness Prompt"]?.includes(from) ? true : false
            }
            onBackPress={() =>
              ["Dashboard", "Wellness Prompt"]?.includes(from)
                ? navigation?.pop(3)
                : navigation?.goBack()
            }
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
              subTitle={strings.recommendationText}
              healthStatusSummary={
                recommendationsData?.assistantResponse?.healthStatusSummary
              }
            />
            <Image style={styles?.iconStyle1} source={imagePath?.SunHalfIcon} />
            {!isLoading ? (
              <>
                {!data || data.length <= 0 ? (
                  <BottomButtons
                    data={data}
                    on_RegenerateBlank={regenerateOnboardingDetails}
                  />
                ) : (
                  <FlatList
                    data={
                      buttonValue === RecommendationTab_ENUM?.BOOKS
                        ? data?.books
                        : data?.videos
                    }
                    style={{
                      marginTop: moderateScale(65),
                    }}
                    keyExtractor={(item, index) => "key" + index}
                    contentContainerStyle={{ gap: moderateScale(10) }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    ListHeaderComponent={() => {
                      return (
                        <View style={styles?.buttonContainer}>
                          <TouchableOpacity
                            onPress={() =>
                              setButtonValue(RecommendationTab_ENUM?.BOOKS)
                            }
                            style={
                              buttonValue == RecommendationTab_ENUM?.BOOKS
                                ? styles?.selectedButtonView
                                : styles?.unselectedButtonView
                            }
                          >
                            <Text
                              style={
                                buttonValue == RecommendationTab_ENUM?.BOOKS
                                  ? styles?.selectedButtonText
                                  : styles?.unselectedButtonText
                              }
                            >
                              {Enum_RecommendationContentType?.BOOKS}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              setButtonValue(RecommendationTab_ENUM?.VIDEOS)
                            }
                            style={
                              buttonValue == RecommendationTab_ENUM?.VIDEOS
                                ? styles?.selectedButtonView
                                : styles?.unselectedButtonView
                            }
                          >
                            <Text
                              style={
                                buttonValue == RecommendationTab_ENUM?.VIDEOS
                                  ? styles?.selectedButtonText
                                  : styles?.unselectedButtonText
                              }
                            >
                              {Enum_RecommendationContentType?.VIDEO}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      );
                    }}
                    renderItem={({ item }: any) => {
                      return (
                        <>
                          {buttonValue == RecommendationTab_ENUM?.BOOKS ? (
                            <RecommendationCardForBooks
                              card={[
                                styles?.cardView,
                                { backgroundColor: colors?.SaltBox },
                              ]}
                              author={item?.author ? item?.author : "unknown"}
                              title={item?.bookTitle ? item?.bookTitle : "--"}
                              summary={item?.summary ? item?.summary : "--"}
                              frequency={
                                item?.frequency ? item?.frequency : "--"
                              }
                              items={
                                item?.items?.length > 0 || item?.items
                                  ? item?.items?.length
                                  : "--"
                              }
                              source={
                                item?.logo &&
                                  !examplerImage.includes(item?.logo)
                                  ? { uri: item?.logo }
                                  : imagePath?.BookPlaceHolder
                              }
                              onPress={() =>
                                navigation?.navigate(
                                  navigationString?.RecommendationList,
                                  {
                                    data: item,
                                    recomendationContentType:
                                      Enum_RecommendationContentType?.BOOKS,
                                    listRenderIn:
                                      Enum_RecommendationListedIn?.AiGeneration,
                                  }
                                )
                              }
                            />
                          ) : (
                            <RecommendationCard
                              card={[
                                styles?.cardView,
                                { backgroundColor: colors?.SaltBox },
                              ]}
                              title={item?.title ? item?.title : "--"}
                              frequency={
                                item?.frequency ? item?.frequency : "--"
                              }
                              items={
                                item?.items?.length > 0 || item?.items
                                  ? item?.items?.length
                                  : "--"
                              }
                              source={
                                item?.logo &&
                                  !examplerImage.includes(item?.logo)
                                  ? { uri: item?.logo }
                                  : item?.link &&
                                    !examplerImage.includes(item?.link)
                                    ? getThumbnailFromYoutubeURL(item?.link)
                                    : imagePath?.VideoPlayButton
                              }
                              onPress={() =>
                                navigation?.navigate(
                                  navigationString?.RecommendationList,
                                  {
                                    data: item,
                                    recomendationContentType:
                                      Enum_RecommendationContentType?.VIDEO,
                                    trackId:
                                      recommendationsData?.trackId ||
                                      "89ade939-f032-48d7-a013-da902df8ea96_hardCoded",

                                    AigeneratedData: recommendationsData,
                                    videoLink: item?.link,
                                    recommendationDetails: {
                                      items: [item],
                                    },
                                  }
                                )
                              }
                            />
                          )}
                        </>
                      );
                    }}
                    ListFooterComponent={() => (
                      <BottomButtons
                        buttonText1={"Add to library"}
                        data={data}
                        on_StartNow={createRecommendations}
                        on_RegenerateQuestions={() => {
                          if (true) {
                            navigation.navigate(
                              navigationString?.ReGenerateRecommendationsAI,
                              {
                                from: from,
                                reqData: reqData,
                                newString: newString,
                              }
                            );
                          } else {
                            setShowModal(true);
                          }
                        }}
                        isSkip={
                          from === "Wellness Prompt"
                            ? false
                            : from === "Dashboard"
                              ? false
                              : true
                        }
                        aiSuggestion={"recommendations"}
                        onSkipPress={() =>
                          navigation.navigate(navigationString.SelectActivity, {
                            from: from,
                            reqData: reqData,
                            newString: newString,
                          })
                        }
                      />
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
        </View>
        <UpgradeModal
          navigation={navigation}
          visible={showModal}
          setShowModal={setShowModal}
          fromScreen={SUBSCRIPTION_NAVIGATION_FROM?.DASHBOARD}
          isPlanner={false}
          title={IAP_Strings?.AI_genrate_recommendation_title}
          description={IAP_Strings?.AI_genrate_recommendation_desc}
        />
      </ScreenWrapper>
    )
  );
};
export default GeneratedRecommendationsAI;
