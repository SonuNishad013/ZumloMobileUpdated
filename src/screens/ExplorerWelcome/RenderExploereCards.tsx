import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { imagePath } from "../../assets/png/imagePath";
import {
  height,
  moderateScale,
  textScale,
  width,
} from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { strings } from "../../constant/strings";
import Swiper from "react-native-deck-swiper";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import navigationString from "../../navigation/navigationString";
import allActions from "../../redux/actions";
import { useDispatch } from "react-redux";
import { onSelectExplorer } from "../../helper/explorerFunction";
import { filterCategoryData } from "../../helper/getGlobalCodes";
import CommonButton from "../../components/Buttons/commonButton";
import * as AsyncStorageUtils from "../../utils/Storage/AsyncStorage";
import { categoryName } from "../../constant/AllGlobalNameConstant";
import appConstant, { aiProvider } from "../../constant/appConstant";
import { capitalizeFirstLetter } from "../../validations/capitalizeFirstLetter";
import CustomToast from "../../components/Toast";
import ChatCard from "./ChatCard";
import LastPrompt from "./LastPrompt";
import { getBtnName } from "./helperFunction";
import DeviceInfo from "react-native-device-info";
import { formatSentenceCase } from "../../helper/sentenceCase";
import { textLabelSize } from "../../utils/TextConfig";
import CommonLoader from "../../components/Loader";
import logger from "../../constant/logger";
import { GlobalCodeName } from "../../constant/ENUM";
import CommonHealthLoader from "../../components/Loader/CommonHealthLoader";
import FastImage from "react-native-fast-image";

const RenderExploereCards = ({
  onNextPress,
  lastActivityData,
  showToasterDetails,
}: any) => {
  const navigation: any = useNavigation();
  const focus = useIsFocused();
  const dispatch: any = useDispatch();
  const [userData, setUserData] = useState<any>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const translateY = useRef(new Animated.Value(0)).current;
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [cardsData, setCardsData] = useState<any[]>([]);
  const [activityId, setActivityId] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [promptLoader, setPromptLoader] = useState(false);
  const [DeviceID, setDeviceID] = useState("");
  const [aiGeneratedCategories, setAiGeneratedCategories] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await DeviceInfo.getUniqueId();
      setDeviceID(response);
    }
    fetchData();
  }, []);
  useEffect(() => {
    if (isFirstTime) {
      let bounceCount = 0;
      const maxBounces = 2;

      const bounce = () => {
        if (bounceCount < maxBounces) {
          bounceCount++;

          Animated.sequence([
            Animated.timing(translateY, {
              toValue: -50,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(translateY, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ]).start(() => {
            if (bounceCount < maxBounces) {
              bounce();
            } else {
              setIsFirstTime(false);
            }
          });
        }
      };

      bounce();
    }
  }, [isFirstTime]);
  useEffect(() => {
    getGlobalCode();
  }, []);
  const getGlobalCode = async () => {
    try {
      const getGlobalCodeData = await AsyncStorageUtils.getItem(
        AsyncStorageUtils.GLOBALCODEWITHCATEGORY
      );
      let getExplorerPrompts = await filterCategoryData(
        JSON.parse(getGlobalCodeData),
        categoryName.explorerPreferences
      );
      let parsedGlobalCodes: any[] = JSON.parse(getGlobalCodeData);

      type GlobalCodeOption = {
        globalCodeId: number;
        codeName: string;
        [key: string]: any;
      };

      type AiCategory = {
        categoryDescription: string;
        categoryId: number;
        categoryName: string;
        globalCodeOptions: GlobalCodeOption[];
      };
      let extractAiCategories: AiCategory = parsedGlobalCodes?.find(
        (item) => item?.categoryName === "AIGenerationCategory"
      );
      setAiGeneratedCategories(extractAiCategories?.globalCodeOptions);
      let data = moveConversationToSecondLast(
        getExplorerPrompts?.[0]?.globalCodeOptions
      );
      setCardsData(
        data.filter(
          (item: any) =>
            item.codeName !== GlobalCodeName?.Reduce_Stress_Activities
        )
      );
      setTimeout(() => {
        setIsLoading(false);
      }, 5000);
    } catch (error) {
      console.error("Error retrieving login user data:", error);
    }
  };
  let last = cardsData[cardsData?.length - 1];
  const moveConversationToSecondLast = (array: any) => {
    const conversationIndex = array.findIndex(
      (item: any) => item.codeName === "Conversation"
    );

    if (conversationIndex > -1) {
      const [conversationItem] = array.splice(conversationIndex, 1);
      array.splice(array.length, 0, conversationItem);
    }

    return array;
  };

  useEffect(() => {
    getSeekerPersonalInfo();
    GetActivitiesTemplates();
  }, [focus]);

  useEffect(() => {
    if (userData == undefined) getSeekerPersonalInfo();
  }, [userData]);

  const GetActivitiesTemplates = () => {
    let requestbody = 1;
    allActions.OnBoarding.GetActivitiesTemplates(
      dispatch,
      requestbody,
      "GetActivitiesTemplates"
    )
      .then(async (response: any) => {
        if (response.statusCode == 200) {
          setActivityId(response?.data?.[0]);
        }
      })
      .catch((err: any) => {});
  };
  const getSeekerPersonalInfo = async () => {
    let userId = 0;
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
          setUserData(response.data);
        } else {
          console.log("response");
        }
      })
      .catch((err) => {});
  };

  const saveSettingGoals = async (inedx: any) => {
    onSelectExplorer_();
    if (inedx == 1) {
      navigation.navigate(navigationString.GoalsAndAspiration, {
        onSwiperClick: false,
        from: "ExplorerActivity",
      });
    }
  };

  const SaveUserActivitiesFromTemplate = (ActivityDetails: any) => {
    try {
      let requestbody = {
        activityId: ActivityDetails?.id,
      };

      allActions.OnBoarding.SaveUserActivitiesFromTemplate(
        dispatch,
        requestbody,
        "SaveUserActivitiesFromTemplate"
      )
        .then(async (response: any) => {
          if (response.statusCode == 200) {
            onSelectExplorer_();
            navigation.navigate(navigationString?.ExplorerActivityPreferences, {
              from: "ExplorerActivity",
              data: ActivityDetails,
            });
          } else {
            console.log("response?.message", response?.message);
          }
        })
        .catch((err: any) => {
          console.log("response?.message", err?.message);
        });
    } catch (error) {
      console.log("response?.message", error);
    }
  };

  const onSelectExplorer_ = () => {
    let req = {
      userId: userData?.userId !== undefined ? userData?.userId : 0,
      strategyTypeId: appConstant.explorer_planner_type.explorer,
    };
    allActions.OnBoarding.SaveSeekerPlannerExplorerId(
      dispatch,
      req,
      "saveQuestion"
    )
      .then((response: any) => {
        console.log("response SaveSeekerPlannerExplorerId", response);
      })
      .catch((err) => {});
  };
  const navWithSelectExplorer = async (
    nav: string,
    userData: any,
    index: any,
    DeviceID?: any
  ) => {
    const a = await onSelectExplorer(
      userData,
      dispatch,
      allActions,
      "fromExplorer",
      navigation,
      { nav: nav, emitEvent: false },
      false,
      DeviceID
    );
    console.log("a after onSelectExplorer", a);
  };

  const GetOnboardingSteps = (categoryId: any) => {
    setPromptLoader(true);
    let requestbody = {};
    allActions.OnBoarding.GetOnboardingSteps(
      dispatch,
      requestbody,
      "getOnboardingSteps",
      categoryId
    )
      .then((response: any) => {
        if (response) {
          setPromptLoader(false);
        }
        if (response.statusCode == 200) {
          navigation.navigate(navigationString.WellnessPlanIndex, {
            wellnessQuestions: response.data,
            reqData1: [],
            from: "ExplorerActivity",
            newString: "",
          });
        } else {
          showToasterDetails({
            showToast: true,
            code: 0,
            message: response.message,
          });
        }
      })
      .catch((err) => {
        setPromptLoader(false);
        showToasterDetails({
          showToast: true,
          code: 0,
          message: err.message,
        });
      });
  };

  const callApi = async (categoryId: any, isaiProviderRequired: boolean) => {
    setPromptLoader(true);
    try {
      const requestBody = {
        isCategorySelected: true,
        stepOption: [],
        categoryId: categoryId,
        linkRequired: false,
        aiProvider: isaiProviderRequired
          ? aiProvider?.WellnessPlan
          : aiProvider?.Goals,
      };
      const response =
        await allActions.seekerDetails.SeekerOnboardingStepAnswer(
          dispatch,
          requestBody,
          "seekerOnboardingStepAnswer"
        );
      if (response) {
        setPromptLoader(false);
      }
      const skipStatus: any = response?.data;
      if (response?.statusCode == 200) {
        skipStatus?.assistantResponse?.challenges?.[0]?.goals?.[0]?.quizzes?.[0]
          ?.question &&
          navigation.navigate(navigationString.Quiz, {
            QuizData:
              response?.data?.assistantResponse?.challenges?.[0]?.goals?.[0]
                ?.quizzes?.[0],
            userData: userData,
            QuizDataDetails:
              skipStatus?.assistantResponse?.challenges?.[0]?.goals?.[0],
            reqData: [],
            from: "ExplorerActivity",
            newString: "",
          });
      } else {
        showToasterDetails({
          showToast: true,
          code: 0,
          message: response.message,
        });
      }
    } catch (error: any) {
      setPromptLoader(false);
      showToasterDetails({
        showToast: true,
        code: 0,
        message: error.message,
      });
    }
  };

  const navigateTo = (codeName: string, index: any, userData: any) => {
    switch (codeName) {
      case "Mood Tracking":
        navWithSelectExplorer(
          navigationString?.TrackEmo,
          userData,
          index,
          DeviceID
        );
        return;
      case "Setting Goals":
        saveSettingGoals(index);
        return;
      case "Relaxation Activities":
        SaveUserActivitiesFromTemplate(activityId);
        return;
      case "Wellness Plan":
        const wellnessplanID = aiGeneratedCategories?.find(
          (item) => item?.codeName === "WellnessPlan"
        );
        GetOnboardingSteps(wellnessplanID?.globalCodeId || 216);
        return;
      case "Quiz":
        const quizId = aiGeneratedCategories?.find(
          (item) => item?.codeName === "Quiz"
        );
        callApi(quizId?.globalCodeId || 496, false);
        return;
      case "Questionnaire":
        navigation?.navigate(navigationString?.OnBoardingPlannerSteps, {
          from: "fromExplorer",
          userData: userData,
        });
        return;
      default:
        break;
    }
  };

  return (
    <>
      {isLoading ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image source={imagePath.ExplorerPrompts} />
        </View>
      ) : (
        <>
          <ImageBackground
            source={imagePath?.StaryBG}
            style={{
              height: height,
              paddingHorizontal: moderateScale(29),
            }}
          >
            {cardsData?.length > 0 && (
              <>
                {currentIndex !== 6 && (
                  <Swiper
                    cardVerticalMargin={height * 0.2}
                    cardHorizontalMargin={width * 0.1}
                    cards={cardsData}
                    renderCard={(cardData: any, index: any) => {
                      return (
                        <>
                          {cardData.codeName !== "Conversation" &&
                            cardData.codeName !==
                              "Reduce stress Activities" && (
                              <Animated.View
                                style={{ transform: [{ translateY }] }}
                              >
                                <FastImage
                                  source={{
                                    uri: cardData?.imageURL,
                                    priority: FastImage.priority.high,
                                    cache: FastImage.cacheControl.immutable,
                                  }}
                                  resizeMode={FastImage.resizeMode.stretch}
                                  style={styles.cardImageBackground}
                                >
                                  <View style={styles.cardContentContainer}>
                                    <Text style={styles.cardSubTitle}>
                                      {cardData?.subTitle}
                                    </Text>
                                    <Text style={styles.cardDescription}>
                                      {cardData?.description}
                                    </Text>
                                  </View>
                                  <TouchableOpacity
                                    onPress={() => {
                                      navigateTo(
                                        cardData?.codeName,
                                        index,
                                        userData
                                      );
                                    }}
                                    // disabled={disableButton}
                                    style={[
                                      styles.detailsContainer,
                                      {
                                        backgroundColor:
                                          cardData?.codeName === "Setting Goals"
                                            ? colors?.backgroundTheme
                                            : colors?.polishedPine,
                                      },
                                    ]}
                                  >
                                    <Text style={styles.detailsText}>
                                      {capitalizeFirstLetter(
                                        getBtnName(cardData)
                                      )}
                                    </Text>
                                    <Image
                                      style={styles.arrow}
                                      source={imagePath?.CirArrow}
                                    />
                                  </TouchableOpacity>
                                </FastImage>
                              </Animated.View>
                            )}
                        </>
                      );
                    }}
                    disableBottomSwipe={true}
                    disableRightSwipe={true}
                    disableLeftSwipe={true}
                    onSwiped={(cardIndex: number) => {
                      if (cardIndex == 5) setCurrentIndex(6);
                    }}
                    cardIndex={0}
                    backgroundColor={"transparent"}
                    stackSize={3}
                  />
                )}
              </>
            )}
            {currentIndex === 6 && (
              <ChatCard
                onPress={() =>
                  navWithSelectExplorer(
                    navigationString?.ChatScreen,
                    userData,
                    4,
                    DeviceID
                  )
                }
              />
            )}
            {currentIndex === 6 && (
              <CommonButton
                onPress={() => {
                  setCurrentIndex(currentIndex + 1);
                  if (currentIndex === 6) {
                    onNextPress();
                    lastActivityData(last);
                  }
                }}
                btnName={formatSentenceCase("Maybe later")}
                mainContainer={{
                  width: "auto",
                  marginTop: moderateScale(35),
                  backgroundColor: colors?.polishedPine,
                }}
              />
            )}
          </ImageBackground>
          <LastPrompt
            onPress={async () => {
              onNextPress();
              await onSelectExplorer(
                userData,
                dispatch,
                allActions,
                "fromExplorer",
                navigation,
                { nav: "", emitEvent: true }
              );
            }}
          />
          {promptLoader && <CommonLoader />}
        </>
      )}
    </>
  );
};

export default RenderExploereCards;

const styles = StyleSheet.create({
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: moderateScale(30),
    padding: moderateScale(10),
    width: moderateScale(260),
    alignSelf: "center",
    paddingVertical: moderateScale(15),
  },
  detailsText: {
    color: colors.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "500",
    alignSelf: "center",
  },
  arrow: {
    height: moderateScale(35),
    width: moderateScale(35),
    position: "absolute",
    right: moderateScale(10),
  },
  cardImageBackground: {
    height: moderateScale(395),
    width: width * 0.8,
    padding: moderateScale(5),
  },
  cardContentContainer: {
    flex: 1,
    alignItems: "center",
    marginVertical: moderateScale(15),
    gap: moderateScale(10),
    paddingHorizontal: moderateScale(10),
  },
  cardSubTitle: {
    fontSize: textLabelSize?.titleFont,
    color: colors?.SurfCrest,
    fontWeight: "600",
    textAlign: "center",
  },
  cardDescription: {
    fontSize: textLabelSize?.subtTitleFont,
    color: colors?.SurfCrest,
    fontWeight: "500",
    textAlign: "center",
  },
});
