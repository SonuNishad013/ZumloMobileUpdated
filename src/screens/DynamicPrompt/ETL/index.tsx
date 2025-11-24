import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import colors from "../../../constant/colors";
import {
  height,
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import {
  Dummy2,
  DynamicPromptWelcome,
  ZumloPersona3,
  ZunloPersona2,
} from "../../../assets";
import CommonButton from "../../../components/Buttons/commonButton";
import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";

import { formatSentenceCase } from "../../../helper/sentenceCase";
import navigationString from "../../../navigation/navigationString";
import _ from "underscore";
import { imagePath } from "../../../assets/png/imagePath";
import CommonAlert from "../../../components/CommonAlert/CommonAlert";
import TypingText from "../../../components/Text";
import { allContentType, selectableFields } from "../Questions/FieldTypes";
import { strings } from "../../../constant/strings";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";

interface ETLQuestionsIndexProps {
  navigation?: any;
  route?: any;
}
const { height: screenHeight } = Dimensions.get("window");

const ETLQuestionsIndex: FunctionComponent<ETLQuestionsIndexProps> = ({
  navigation,
  route,
}) => {
  const { from, parsedResponseData } = route?.params;
  const dispatch = useDispatch();
  const [questionData, setquestionData] = useState<any>({});
  const [isUIAvailable, setisUIAvailable] = useState(false);
  const redScaleAnim = useRef(new Animated.Value(1)).current;
  const redTranslateYAnim = useRef(new Animated.Value(0)).current;
  const key1OpacityAnim = useRef(new Animated.Value(0)).current;
  const key2OpacityAnim = useRef(new Animated.Value(0)).current;
  const [isFrirstSlide, setisFrirstSlide] = useState(true);
  const fristSlidesColor = [colors?.backgroundTheme, colors?.backgroundTheme];
  const secondSlidesColor = [colors?.lightTheme, colors?.backgroundTheme];
  const [showFirstSlide, setShowFirstSlide] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [firstTextDone, setFirstTextDone] = useState(false);
  const [showTypingText, setShowTypingText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTypingText(true);
    }, 5000);

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setisFrirstSlide(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (!isFrirstSlide) {
      Animated.parallel([
        Animated.timing(redScaleAnim, {
          toValue: 0.7,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(redTranslateYAnim, {
          toValue: -screenHeight * 0.25,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowFirstSlide(false);

        Animated.timing(key1OpacityAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => {
          Animated.timing(key2OpacityAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }).start();
        });
      });
    }
  }, [isFrirstSlide]);
  const translateY = useRef(new Animated.Value(-height * 0.5)).current;

  useEffect(() => {
    GetUserMissingProfileDataPointQuestions(route?.params?.parsedResponseData); //This is the original code
    Animated.timing(translateY, {
      toValue: height * 0.0000001,
      duration: 4000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [route]);

  const GetUserMissingProfileDataPointQuestions = (response: any) => {
    setIsLoading(true);

    if (response.statusCode === 200) {
      if (!response?.data || response?.data?.length === 0) {
        setIsLoading(false);
        navigation.goBack();
        return;
      }

      const isAnyControlTypeSelectable = response.data.some((q: any) =>
        allContentType.includes(q.controlType)
      );

      setIsLoading(false);
      setisUIAvailable(isAnyControlTypeSelectable);
      setquestionData(response?.data);
    } else {
      setIsLoading(false);
      navigation.goBack();
    }
  };
  const onSkipQuestion = async (data_: any) => {
    let data = await data_.map((item: any) => {
      return {
        questionId: item?.questionId,
        answer: [],
        otherAnswer: "",
        isPermanentSkip: true,
      };
    });
    let requestbody = {
      answers: data,
    };

    allActions.dashboardAction
      .SaveUserMissingProfileDataPointAnswers(
        dispatch,
        requestbody,
        API_FUN_NAMES?.onSkipQuestion
      )
      .then((response: any) => {
        if (response.statusCode == 200) {
          navigation.goBack();
        } else {
        }
      })
      .catch((err) => {});
  };

  return (
    <LinearGradient
      colors={isFrirstSlide ? fristSlidesColor : secondSlidesColor}
      style={styles.gradientContainer}
    >
      {isFrirstSlide ? (
        <View style={styles?.isFirstSLideCOntainer}>
          <DynamicPromptWelcome />
          <ZunloPersona2 />
        </View>
      ) : (
        <View style={styles?.notFirstSlideConatiner}>
          <View style={styles.container}>
            <Animated.View
              style={[styles.animatedTorch, { transform: [{ translateY }] }]}
            >
              <Dummy2 width={width} />
              {isLoading ? (
                <View style={styles.torchText3}>
                  <Image
                    style={styles?.imageDimension}
                    source={imagePath.LoaderSurf}
                  />
                </View>
              ) : (
                <>
                  <View style={styles?.QuestionMainContainer}>
                    <View style={styles?.innerContainer}>
                      <Text style={styles?.questionNumber}>
                        {questionData?.length > 1
                          ? strings?.Total_questions + questionData?.length
                          : strings?.Total_question + questionData?.length}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={[styles.torchText, styles?.skipButtonStyle]}
                      onPress={() => {
                        navigation?.goBack();
                        onSkipQuestion(questionData);
                      }}
                    >
                      <Text style={styles?.skipButtonText}>
                        {strings?.etl_SkipButtonText}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {showTypingText && (
                    <TypingText
                      text={
                        !_.isEmpty(questionData)
                          ? strings?.Etl_WelcomeText
                          : strings?.Great_You_have_completed_all_info
                      }
                      style={styles.torchText}
                      onComplete={() => setFirstTextDone(true)} // Start next text after this
                    />
                  )}

                  {firstTextDone && (
                    <TypingText
                      text={
                        !_.isEmpty(questionData) &&
                        (questionData.length >= 1
                          ? questionData[0]?.header
                          : strings?.There_are_multiple_questions_to_be_answered)
                      }
                      style={styles.torchText2}
                      onComplete={() => {}}
                    />
                  )}
                </>
              )}
            </Animated.View>
          </View>
          <View style={styles?.questionConatiner}>
            <View style={[styles.redBox2]}>
              <ZumloPersona3 />
            </View>
          </View>
          <View style={styles?.NextButtonContainer}>
            <CommonButton
              btnName={
                isLoading
                  ? strings?.LoadingWithDots
                  : !_.isEmpty(questionData)
                  ? strings?.etl_NextButtonText
                  : strings?.Close
              }
              mainContainer={styles?.buttonMainContainer}
              onPress={() => {
                if (isLoading) return;
                !_.isEmpty(questionData)
                  ? navigation.navigate(navigationString.QuestionsIndex, {
                      questionData: questionData,
                      isUIAvailable: isUIAvailable,
                      from: from,
                      hasEtl: true,
                    })
                  : navigation.goBack();
              }}
              isLoading={isLoading}
            />
          </View>
        </View>
      )}
    </LinearGradient>
  );
};

export default ETLQuestionsIndex;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },

  redBox2: {
    width: width,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  firstSlideText: {
    color: colors?.SurfCrest,
    fontSize: textScale(24),
    fontWeight: "bold",
    marginTop: moderateScale(30),
  },
  lightEffect: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 50,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  animatedTorch: {
    position: "absolute",
    top: -10,
  },
  torchText: {
    color: colors.backgroundTheme,
    fontSize: textScale(21),
    fontWeight: "600",
    textAlign: "center",
    position: "absolute",
    top: "30%",
    left: 0,
    right: 0,
    marginHorizontal: moderateScale(20),
  },
  torchText2: {
    color: colors.backgroundTheme,
    fontSize: textScale(16),
    fontWeight: "600",
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    marginHorizontal: moderateScale(50),
  },
  torchText3: {
    position: "absolute",
    top: "30%",
    left: moderateScale(0),
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  isFirstSLideCOntainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  notFirstSlideConatiner: { flex: 1, justifyContent: "space-between" },
  imageDimension: {
    height: moderateScale(150),
    width: moderateScale(150),
  },
  QuestionMainContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    position: "absolute",
    top: "15%",
    left: 0,
    right: 0,
    marginHorizontal: moderateScale(20),
  },
  innerContainer: {
    height: moderateScale(30),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: moderateScale(1),
    borderColor: colors.prussianBlue,
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(30),
  },
  questionNumber: {
    fontSize: textScale(14),
    color: colors.prussianBlue,
    fontWeight: "500",
  },
  skipButtonStyle: {
    top: "15%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: moderateScale(25),
  },
  skipButtonText: { color: colors.darkPrussianBlue },
  NextButtonContainer: {
    alignItems: "center",
    marginBottom: moderateScale(60),
  },
  questionConatiner: {
    height: screenHeight / 4,
  },
  buttonMainContainer: {
    marginTop: moderateScale(20),
    height: moderateScale(45),
  },
});
