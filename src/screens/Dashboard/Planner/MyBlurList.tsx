import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ImageBackground,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import colors from "../../../constant/colors";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import { imagePath } from "../../../assets/png/imagePath";
import { useDispatch } from "react-redux";
import allActions from "../../../redux/actions";

import navigationString from "../../../navigation/navigationString";
import * as AsyncStorageUtils from "../../../utils/Storage/AsyncStorage";
import {
  filterCategoryData,
  filterglobalCodeOptionsData,
} from "../../../helper/getGlobalCodes";
import { strings } from "../../../constant/strings";
import CommonLoader from "../../../components/Loader";
import CommonHealthLoader from "../../../components/Loader/CommonHealthLoader";
import { aiProvider, STATUS_CODES } from "../../../constant/appConstant";
import {
  dashboardClickENUM,
  Enum_NavigateFrom,
  PrompTypeENUM,
} from "../../../constant/ENUM";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import logger from "../../../constant/logger";
import { findValueByKey } from "../Summary/component/Hooks/transformGoalsFromAPI";
import { textLabelSize } from "../../../utils/TextConfig";

const MyBlurList = ({
  myData,
  navigation,
  skipCategories,
  UserType,
  onScroll,
  isLoader,
  setToasterDetails,
}: any) => {
  const dispatch = useDispatch();
  const [InitialQuestions, setInitialQuestions] = useState();
  const [getWellnessGlobalData, setgetWellnessGlobalData] = useState<any>();
  const [isLoading, setisLoading] = useState(false);
  const [aiLoader, setAiLoader] = useState(false);
  useEffect(() => {
    getGlobalCode();
    GetUserPlannerOnboardingResponse();
  }, []);

  useEffect(() => {
    isLoader(aiLoader);
  }, [aiLoader]);

  const handleOnPress = (name: any) => {
    logger("name_______name_______name_______", name);
    switch (name?.toLowerCase()) {
      case dashboardClickENUM?.Profile.toLowerCase():
        return navigation?.navigate(navigationString.MyProfile);
      case dashboardClickENUM?.Goals_And_Aspiration.toLowerCase():
        return navigation?.navigate(navigationString.GoalsAndAspiration, {
          from: dashboardClickENUM?.Wellness,
        });
      case "wellnessplan":
      case strings.WellnessHeader.toLowerCase():
        return GetOnboardingSteps(getWellnessGlobalData?.[0]?.globalCodeId);
      case strings.goal.toLowerCase():
        return getAIResp(InitialQuestions, strings.goals, 271);
      case strings.preferences.toLowerCase():
        return navigation?.navigate(navigationString.Preferences);
      case strings.recommendations.toLowerCase():
        // return getAIResp(InitialQuestions, strings.recommendations, 300);
        navigation?.navigate(navigationString?.QuestionForBooksAndVideo, {
          from: Enum_NavigateFrom?.WellnessPrompt,
        });
        return;
      case strings.activities.toLowerCase():
        return getAIResp(InitialQuestions, strings.activities, 301);
      default:
        break;
    }
  };
  let req = [
    {
      stepId: 7,
      optionId: 32,
    },
    {
      stepId: 8,
      optionId: 37,
    },
    {
      stepId: 9,
      optionId: 42,
    },
    {
      stepId: 10,
      optionId: 47,
    },
    {
      stepId: 11,
      optionId: 52,
    },
    {
      stepId: 12,
      optionId: 57,
    },
    {
      stepId: 13,
      optionId: 63,
      isSkip: false,
      answer: "",
    },
  ];
  const GetUserPlannerOnboardingResponse = async () => {
    try {
      const response =
        await allActions.OnBoarding.GetUserPlannerOnboardingResponse(
          dispatch,
          {},
          API_FUN_NAMES?.GetUserPlannerOnboardingResponse
        );
      if (response.statusCode === STATUS_CODES?.RESPONSE_OK) {
        const uniqueData = response?.data.filter(
          (value: any, index: any, self: any) =>
            index ===
            self.findIndex(
              (t: any) =>
                t.stepId === value.stepId &&
                t.optionId === value.optionId &&
                t.isSkip === value.isSkip
            )
        );
        setInitialQuestions(uniqueData);
      } else {
      }
    } catch (error) {
    } finally {
    }
  };
  const getAIResp = async (reqData: any, type: any, cId: any) => {
    setAiLoader(true);
    try {
      const requestBody = {
        aspNetUserId: null,
        isCategorySelected: true,
        categoryId: cId,
        linkRequired: false,
        aiProvider: aiProvider?.Goals,
        skipCategory:
          "Give me another response from the choice of {" + `${type}` + "}.",
        stepOption: req,
      };
      const response =
        await allActions.seekerDetails.SeekerOnboardingStepAnswer(
          dispatch,
          requestBody,
          API_FUN_NAMES?.seekerOnboardingStepAnswer
        );
      ///////////New--------------
      if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
        if (
          response?.data?.responseType.toLowerCase() ===
          strings.goals_lower_case.toLowerCase()
        ) {
          const isGoalDataAvailable: any[] = findValueByKey(response, "goals");
          if (isGoalDataAvailable?.length) {
            navigation?.navigate(navigationString?.GeneratedGoalAI, {
              goalsData: response?.data,
              reqData: reqData,
              from: PrompTypeENUM?.Wellness_Prompt,
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
            navigation?.navigate(navigationString?.GeneratedRecommendationsAI, {
              recommendationsData: response?.data,
              reqData: reqData,
              from: PrompTypeENUM?.Wellness_Prompt,
            });
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
              from: PrompTypeENUM?.Wellness_Prompt,
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
        setAiLoader(false);
      }
    } catch (error: any) {}
  };
  const getGlobalCode = async () => {
    try {
      const getGlobalCodeData = await AsyncStorageUtils.getItem(
        AsyncStorageUtils.GLOBALCODEWITHCATEGORY
      );
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
      logger("Error retrieving login user data:", error);
    }
  };
  const GetOnboardingSteps = (categoryId: any) => {
    setisLoading(true);
    let requestbody = {};
    allActions.OnBoarding.GetOnboardingSteps(
      dispatch,
      requestbody,
      API_FUN_NAMES?.getOnboardingSteps,
      categoryId ? categoryId : 216 //216 is default category
    )
      .then((response: any) => {
        setisLoading(false);
        if (response.statusCode == STATUS_CODES?.RESPONSE_OK) {
          navigation.navigate(navigationString.WellnessPlanIndex, {
            wellnessQuestions: response.data,
            reqData1: InitialQuestions,
            from: PrompTypeENUM?.Wellness_Prompt,
            fromWellnessOverView: true,
          });
        } else {
        }
      })
      .catch((err) => {
        setisLoading(false);
      });
  };
  const scrollY = useRef(new Animated.Value(0)).current;
  const ITEM_HEIGHT = moderateScale(400);
  const renderItem = ({ item, index }: any) => {
    const backgroundImages = [
      imagePath?.WellbeingTabCards,
      imagePath?.WellbeingTabCards1,
    ];
    const inputRange = [
      (index - 1) * ITEM_HEIGHT,
      index * ITEM_HEIGHT,
      (index + 1) * ITEM_HEIGHT,
    ];
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.75, 1, 0.75],
      extrapolate: strings?.clamp,
    });

    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: strings?.clamp,
    });

    return (
      <Pressable>
        <Animated.View
          style={[styles.animatedItem, { transform: [{ scale }], opacity }]}
        >
          <ImageBackground
            source={backgroundImages[index % 2]}
            // source={{ uri: item?.imageUrl }}
            style={[
              styles.imageBackground,
              {
                overflow: "hidden",
                // backgroundColor:
                //   index % 2 === 1
                //     ? colors?.backgroundTheme
                //     : colors?.polishedPine,
                borderRadius: moderateScale(16),
              },
            ]}
          >
            <View
              style={{
                flex: 1,
                // backgroundColor: "green",
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  styles.text,
                  {
                    color:
                      index % 2 === 1
                        ? colors?.SurfCrest
                        : colors?.prussianBlue,
                    // item.codeName === strings?.Profile_ || strings?.Goals_
                    //   ? colors?.prussianBlue
                    //   : colors?.SurfCrest,
                    fontSize: textLabelSize?.titleFont,
                    fontWeight: "bold",
                  },
                ]}
              >
                {item.title}
              </Text>
              <Text
                style={[
                  styles.text,
                  {
                    color:
                      index % 2 === 1
                        ? colors?.SurfCrest
                        : colors?.prussianBlue,
                    // item.codeName === strings?.Profile_ || strings?.Goals_
                    //   ? colors?.prussianBlue
                    //   : colors?.SurfCrest,
                    fontStyle: "italic",
                    fontSize: textLabelSize?.subtTitleFont,
                    marginTop: moderateScale(15),
                  },
                ]}
              >
                {item?.description}
              </Text>
            </View>
            <View style={{ marginTop: moderateScale(40) }} />
            <TouchableOpacity
              onPress={() => handleOnPress(item?.codeName)}
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
              >
                <Image
                  source={imagePath.ForwardArrow}
                  tintColor={colors?.transparent}
                />
              </View>
              <Text style={styles.buttonTextCaursal}>
                {CTAButtonWellbieng(item.codeName)}
              </Text>
              <View style={styles.arrowContainer}>
                <Image source={imagePath.ForwardArrow} />
              </View>
            </TouchableOpacity>
          </ImageBackground>
        </Animated.View>
      </Pressable>
    );
  };

  return (
    <>
      {!isLoading ? (
        <>
          {aiLoader ? (
            <CommonHealthLoader />
          ) : (
            <Animated.FlatList
              data={skipCategories}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.contentContainer}
              ListHeaderComponent={() => (
                <View style={styles.headerContainer}>
                  <Text style={styles.headerText}>
                    {"You’ve got goals\nLet’s make a plan."}
                  </Text>
                  <Text style={styles.subHeaderText}>
                    {
                      "We’ll help you create a wellness plan that\nfits your lifestyle—step by step."
                    }
                  </Text>
                </View>
              )}
              renderItem={renderItem}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true }
              )}
              onScrollBeginDrag={onScroll}
              ListFooterComponent={
                <View style={{ height: moderateScale(100) }} />
              }
              snapToInterval={ITEM_HEIGHT}
              decelerationRate={strings?.fast}
            />
          )}
        </>
      ) : (
        <>
          <CommonLoader />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  animatedItem: {
    alignSelf: "center",
  },
  imageBackground: {
    height: moderateScale(390),
    width: moderateScale(336),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: moderateScale(20),
    paddingHorizontal: moderateScale(19),
  },
  text: {
    textAlign: "center",
    fontSize: textScale(14),
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: moderateScale(5),
    borderRadius: moderateScale(30),
    alignItems: "center",
    marginTop: moderateScale(15),
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
    color: colors?.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "500",
    // marginLeft: moderateScale(30),
    // backgroundColor: "red",
  },
  iconContainer: {
    backgroundColor: "rgba(203, 226, 209, 1)",
    padding: moderateScale(10),
    borderRadius: moderateScale(20),
    // position: "absolute",
    // right: 0,
  },
  contentContainer: {
    marginVertical: moderateScale(20),
    gap: moderateScale(20),
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: moderateScale(15),
    marginTop: 29,
  },
  headerText: {
    textAlign: "center",
    fontSize: textScale(24),
    color: colors?.royalOrangeDark,
    fontWeight: "700",
  },
  subHeaderText: {
    textAlign: "center",
    fontSize: textScale(14),
    color: colors?.SurfCrest,
    fontWeight: "400",
  },
  button: {
    flexDirection: "row",
    padding: moderateScale(5),
    borderRadius: moderateScale(30),
    alignItems: "center",
    marginTop: moderateScale(15),
    marginBottom: moderateScale(10),
    marginHorizontal: moderateScale(35),
  },
  buttonConcat: {
    backgroundColor: colors.prussianBlue,
    position: "absolute",
    bottom: 0,
  },
  buttonTextCaursal: {
    flex: 1,
    textAlign: "center",
    color: colors.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "500",
  },
  arrowContainer: {
    backgroundColor: colors.SurfCrest,
    padding: moderateScale(10),
    borderRadius: moderateScale(20),
  },
  arrowContainerConcat: {
    backgroundColor: colors?.transparent,
  },
});

export const CTAButtonWellbieng = (codeName: any) => {
  switch (codeName) {
    case "WellnessPlan":
      return "Generate my plan ";
    case "Goals":
      return "Let's explore";
    case "Recommendations":
      return "View recommendations ";
    case "Activities":
      return "Let’s do it";

    default:
      break;
  }
};
export default MyBlurList;
