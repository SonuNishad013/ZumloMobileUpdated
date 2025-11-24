import {
  Animated,
  StyleSheet,
  View,
  Dimensions,
  Text,
  ImageBackground,
  ScrollView,
  Image,
} from "react-native";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import {
  height,
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { imagePath } from "../../../assets/png/imagePath";
import { formatSentenceCase } from "../../../helper/sentenceCase";
import {
  DynamicPromptsFaceIcon,
  DynamicPromptsFaceIcon2,
} from "../../../assets";
import navigationString from "../../../navigation/navigationString";
import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";

import _ from "underscore";
import CommonButton from "../../../components/Buttons/commonButton";
import CommonAlert from "../../../components/CommonAlert/CommonAlert";
import { allContentType, selectableFields } from "../Questions/FieldTypes";
import ShimmerEffect from "./ShimmerEffect";

const { height: screenHeight } = Dimensions.get("window");
interface PromptsIndexProps {
  navigation?: any;
  route?: any;
}

const DynamicPrompts: FunctionComponent<PromptsIndexProps> = ({
  navigation,
  route,
}: any) => {
  console.log("route-=-=->", route);

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const redScaleAnim = useRef(new Animated.Value(1)).current;
  const redTranslateYAnim = useRef(new Animated.Value(0)).current;
  const key1OpacityAnim = useRef(new Animated.Value(0)).current;
  const key2OpacityAnim = useRef(new Animated.Value(0)).current;

  const firstSlidesColor = ["#3C839D", "#043A4E"];
  const secondSlidesColor = [colors?.backgroundTheme, colors?.backgroundTheme];
  const [showFirstSlide, setShowFirstSlide] = useState(true);
  const [questionData, setquestionData] = useState<any>({});
  const [isSkip, setisSkip] = useState(false);
  const [isUIAvailable, setisUIAvailable] = useState(false);
  useEffect(() => {
    GetUserMissingProfileDataPointQuestions(route?.params?.parsedResponseData);
  }, []);
  useEffect(() => {
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
  }, []);

  const GetUserMissingProfileDataPointQuestions = (response?: any) => {
    setIsLoading(true);
    if (response.statusCode == 200) {
      if (!response?.data || response?.data?.length === 0) {
        setIsLoading(false);
        navigation.goBack();
      } else {
        const isAnyControlTypeSelectable = response?.data.some((q: any) =>
          allContentType.includes(q.controlType)
        );
        //for testing dummy json for questions
        // let data = [
        //   {
        //     questionId: "MedicalHistory-7",
        //     question: "When was your recent medical visit?",
        //     questionDiscription: "Notification Preferences",
        //     controlType: "SingleSelect",
        //     header: "Notification Settings",
        //     chainId: "M-345",
        //     options: [
        //       {
        //         id: 103,
        //         optionValue: "Asian",
        //         optionLabel: "Asian",
        //       },
        //       {
        //         id: 104,
        //         optionValue: "Black or African American",
        //         optionLabel: "Black or African American",
        //       },
        //     ],
        //     answer: [],
        //     isEtl: false,
        //     createdDate: "2025-05-06T04:58:28.3095452Z",
        //     lastRecordSavedDate: "2025-04-30T06:51:49.173067",
        //   },
        // ];
        setIsLoading(false);
        setisUIAvailable(isAnyControlTypeSelectable);
        setquestionData(response?.data);
      }
    } else {
      navigation.goBack();
    }
  };

  const onSkipQuestion = async (data_: any) => {
    setIsLoading(true);
    let data = await data_.map((item: any) => {
      return {
        questionId: item?.questionId,
        answer: [],
        otherAnswer: "",
        isPermanentSkip: true,
      };
    });
    setisSkip(false);
    let requestbody = {
      answers: data,
    };
    allActions.dashboardAction
      .SaveUserMissingProfileDataPointAnswers(
        dispatch,
        requestbody,
        "onSkipQuestion"
      )
      .then((response: any) => {
        if (response.statusCode == 200) {
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  return (
    <LinearGradient
      colors={showFirstSlide ? firstSlidesColor : secondSlidesColor}
      style={styles.gradientContainer}
    >
      {!_.isEmpty(questionData) && (
        <View style={styles.mainContainer}>
          <View
            style={{
              height: moderateScale(30),
              justifyContent: "center",
              alignItems: "center",
              borderWidth: moderateScale(1),
              borderColor: colors.royalOrange,
              paddingHorizontal: moderateScale(10),
              borderRadius: moderateScale(30),
            }}
          >
            <Text
              style={{
                fontSize: textScale(14),
                color: colors.SurfCrest,
                fontWeight: "500",
              }}
            >
              {questionData?.length > 1
                ? "Total questions:" + questionData?.length
                : "Total question: " + questionData?.length}
            </Text>
          </View>

          <Text
            onPress={() => {
              navigation?.goBack();
              onSkipQuestion(questionData);
            }}
            style={{
              color: colors.SurfCrest,
              fontSize: textScale(16),
              fontWeight: "600",
            }}
          >
            {"Skip"}
          </Text>
        </View>
      )}
      <View>
        <Animated.View
          style={[
            styles.redBox,
            {
              transform: [
                { scale: redScaleAnim },
                { translateY: redTranslateYAnim },
              ],
              // marginBottom: 50,
            },
          ]}
        >
          <DynamicPromptsFaceIcon2 width={200} height={200} />
          {/* <DynamicPromptsFaceIcon /> */}
          <Text
            style={styles.firstSlideText}
          >{`I’d love to get to know you better`}</Text>
        </Animated.View>
        <Animated.View
          key={1}
          style={{
            width: width,
            height: height,
            justifyContent: "flex-end",
            position: "absolute",
            opacity: key1OpacityAnim,
          }}
        >
          <View
            style={{
              width: width,
              height: height * 0.6,
              alignItems: "center",
            }}
          >
            <ImageBackground
              source={imagePath?.D_P_FlowerText}
              resizeMode={"contain"}
              style={{
                width: width * 0.8,
                height: height * 0.4,
                justifyContent: "center",
                paddingHorizontal: moderateScale(19),
              }}
            >
              <>
                {isLoading ? (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Image
                      style={{
                        height: moderateScale(150),
                        width: moderateScale(150),
                      }}
                      source={imagePath.LoaderSurf}
                    />
                  </View>
                ) : (
                  <>
                    <Text
                      style={{
                        fontSize: textScale(18),
                        fontWeight: "700",
                        color: colors?.backgroundTheme,
                        marginTop: moderateScale(10),
                        textAlign: "center",
                      }}
                    >
                      {!_.isEmpty(questionData) &&
                        (questionData && questionData?.length >= 1
                          ? formatSentenceCase(questionData?.[0]?.header)
                          : "There are multiple questions to be answered.")}
                    </Text>
                  </>
                )}
              </>
            </ImageBackground>
            <>
              <CommonButton
                btnName={
                  isLoading
                    ? "Loading..."
                    : !_.isEmpty(questionData)
                    ? "Next"
                    : "Close"
                }
                mainContainer={{
                  marginTop: moderateScale(10),
                  height: moderateScale(45),
                }}
                onPress={() => {
                  if (isLoading) return;
                  !_.isEmpty(questionData)
                    ? navigation.navigate(navigationString.QuestionsIndex, {
                        questionData: questionData,
                        isUIAvailable: isUIAvailable,
                        hasEtl: route?.params?.hasEtl,
                        from: route?.params?.from,
                      })
                    : navigation.goBack();
                }}
                isLoading={isLoading}
              />
            </>
          </View>
        </Animated.View>
      </View>
      <CommonAlert
        isVisible={isSkip}
        alertMessage={"Are you sure!!"}
        alertLeftButtonOnPress={() => navigation.goBack()}
        alertRightButtonOnPress={() => {
          navigation?.goBack();
          onSkipQuestion(questionData);
        }}
        alertLeftButtonText={"No"}
        alertRightButtonText={"Yes"}
        isDescription
        DescriptionMessage="You want to skip this question permanently?"
      />
    </LinearGradient>
  );
};

export default DynamicPrompts;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  redBox: {
    width: width,
    height: screenHeight * 0.8,
    alignItems: "center",
    justifyContent: "center",
  },
  firstSlideText: {
    color: colors?.SurfCrest,
    fontSize: textScale(26),
    fontWeight: "bold",
    marginTop: moderateScale(20),
    width: "80%",
    textAlign: "center",
  },
  mainContainer: {
    height: moderateScale(50),
    marginTop: moderateScale(30),
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "flex-end",
    marginHorizontal: moderateScale(15),
  },
});
