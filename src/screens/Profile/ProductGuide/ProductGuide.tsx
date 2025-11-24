import React, { useRef, useEffect, useState } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  height,
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import { imagePath } from "../../../assets/png/imagePath";
import colors from "../../../constant/colors";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import navigationString from "../../../navigation/navigationString";
import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import { useIsFocused } from "@react-navigation/native";
import { event } from "../../../navigation/emitter";
import * as AsyncStorageUtils from "../../../utils/Storage/AsyncStorage";
import { strings } from "../../../constant/strings";
import {
  API_FUN_NAMES,
  SOCKET_FUN_NAME,
} from "../../../constant/APIsFunctionNames";
import { STATUS_CODES, TOAST_STATUS } from "../../../constant/appConstant";
import { APPLY_STATUS, COMPONENT_NAMES_ENUM } from "../../../constant/ENUM";
interface Props {
  onBackPress?: any;
  navigation?: any;
  routeData?: any;
  userData?: any;
  userTokenn: string;
}

const ProductGuide: React.FC<Props> = ({
  onBackPress,
  navigation,
  routeData,
  userData,
  userTokenn,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current; // Scale for white & yellow views
  const slideAnim = useRef(new Animated.Value(height)).current; // Horizontal slide animation
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  const dispatch = useDispatch();
  const sampleText = [
    strings?.sampleText_1,
    strings?.sampleText_2,
    strings?.sampleText_3,
    strings?.sampleText_4,
    strings?.sampleText_5,
    strings?.sampleText_6,
  ];

  const ImagesData = [
    imagePath?.PT_PROFILE,
    imagePath?.PT_WELLNESSPLAN,
    imagePath?.ProductGuideImg05,
    imagePath?.PT_RECOMMENDATION,
    imagePath?.ProductTourChatModal,
    imagePath?.PT_WELLNESS_OVERVIEW,
  ];
  const ButtonText = [
    strings?.GO_TO_PROFILE_SECTION,
    strings?.GENERATE_NOW,
    strings?.CONNECT_NOW,
    strings?.EXPLORE_NOW,
    strings?.CHAT_NOW,
    strings?.TRACK_NOW,
  ];
  const animatedTop = useRef(new Animated.Value(-200)).current; // Starts off-screen vertically
  const animatedRight = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    slideAnim.setValue(height);

    const animateSequence = () => {
      if (currentIndex < 5) {
        Animated.sequence([
          Animated.parallel([
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(animatedTop, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: false,
            }),
            Animated.timing(animatedRight, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: false,
            }),
          ]),

          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),

          Animated.delay(2500),

          Animated.timing(slideAnim, {
            toValue: height,
            duration: 500,
            useNativeDriver: true,
          }),

          Animated.parallel([
            Animated.timing(scaleAnim, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(animatedTop, {
              toValue: -200,
              duration: 1000,
              useNativeDriver: false,
            }),
            Animated.timing(animatedRight, {
              toValue: -200,
              duration: 1000,
              useNativeDriver: false,
            }),
          ]),
        ]).start(() => {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        });
      } else {
        Animated.sequence([
          Animated.parallel([
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(animatedTop, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: false,
            }),
            Animated.timing(animatedRight, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: false,
            }),
          ]),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start();
      }
    };

    animateSequence();
  }, [currentIndex, scaleAnim, animatedTop, animatedRight, slideAnim]);

  const getWidth = () => {
    switch (currentIndex) {
      case 0:
        return "17%";
      case 1:
        return "34%";
      case 2:
        return "50%";
      case 3:
        return "67%";
      case 4:
        return "84%";
      case 5:
        return "100%";
    }
  };
  const GetOnboardingSteps = (categoryId: any) => {
    let requestbody = {};
    allActions.OnBoarding.GetOnboardingSteps(
      dispatch,
      requestbody,
      API_FUN_NAMES?.getOnboardingSteps,
      categoryId
    )
      .then((response: any) => {
        if (response.statusCode == STATUS_CODES?.RESPONSE_OK) {
          navigation.navigate(navigationString.WellnessPlanIndex, {
            wellnessQuestions: response.data,
            reqData1: [],
            from: routeData?.params?.from || COMPONENT_NAMES_ENUM?.ProductGuide,
            newString: "",
          });
        } else {
          setToasterDetails({
            showToast: true,
            code: TOAST_STATUS?.ERROR,
            message: response.message,
          });
        }
      })
      .catch((err) => {
        setToasterDetails({
          showToast: true,
          code: TOAST_STATUS?.ERROR,
          message: err.message,
        });
      });
  };
  const getWellnessPlanDetails = async () => {
    try {
      const response = await allActions.seekerDetails.GetWellnessPlanDetails(
        dispatch,
        {},
        API_FUN_NAMES?.getWellnessPlanDetails
      );
      if (
        response.statusCode === STATUS_CODES?.RESPONSE_OK ||
        response.statusCode === STATUS_CODES?.RESPONSE_SUCCESS
      ) {
        if (Array.isArray(response?.data)) {
          navigation.navigate(navigationString?.Wellbeing, {
            from: COMPONENT_NAMES_ENUM?.ProductGuide,
          });

          navigation.pop(2);
        } else {
          GetOnboardingSteps(216); //for wellnesss plan
        }
      } else {
        setToasterDetails({
          showToast: true,
          code: TOAST_STATUS?.ERROR,
          message: response?.message,
        });
      }
    } catch (error: any) {
      setToasterDetails({
        showToast: true,
        code: TOAST_STATUS?.ERROR,
        message: error?.message,
      });
    }
  };
  const handleButtonPress = () => {
    switch (currentIndex) {
      case 0:
        navigation?.navigate(navigationString?.MyProfile, {
          from: routeData?.params?.from || COMPONENT_NAMES_ENUM?.ProductGuide,
        });
        return;
      case 1: //for wellness plan
        getWellnessPlanDetails();
        return;
      case 2:
        navigation?.navigate(navigationString?.AddDevice, {
          from: routeData?.params?.from || COMPONENT_NAMES_ENUM?.ProductGuide,
        });
        return;
      case 3: //for recommendation handling
        if (
          [
            strings?.AIGeneratedSkipped,
            strings?.fromExplorer,
            strings?.ExplorerActivity,
          ].includes(routeData?.params?.from)
        ) {
          const isPlanner =
            routeData?.params?.from === strings?.AIGeneratedSkipped;
          event.emit(SOCKET_FUN_NAME?.login);
          AsyncStorageUtils.storeItemKey(
            AsyncStorageUtils.ISPLANNER_USER,
            JSON.stringify({ isPlanner: isPlanner, isSelected: true })
          );
        } else {
          navigation.navigate(navigationString?.PlannerDashboard, {
            from: COMPONENT_NAMES_ENUM?.ProductGuide,
          });
          setTimeout(() => {
            navigation.pop(3);
          }, 500);
        }

        return;
      case 4: //for chat handling
        navigation?.navigate(navigationString?.ChatScreen, {
          from: routeData?.params?.from || COMPONENT_NAMES_ENUM?.ProductGuide,
          userData,
          userTokenn,
        });
        return;
      case 5: //for wellness plan
        if (
          [
            strings?.AIGeneratedSkipped,
            strings?.fromExplorer,
            strings?.ExplorerActivity,
          ].includes(routeData?.params?.from)
        ) {
          const isPlanner =
            routeData?.params?.from === strings?.AIGeneratedSkipped;
          event.emit(SOCKET_FUN_NAME?.login);
          AsyncStorageUtils.storeItemKey(
            AsyncStorageUtils.ISPLANNER_USER,
            JSON.stringify({ isPlanner: isPlanner, isSelected: true })
          );

          setTimeout(() => {
            event.emit(strings?.tabSwitch);
          }, 500);
        } else {
          navigation.navigate(navigationString?.Wellbeing, {
            from: COMPONENT_NAMES_ENUM?.ProductGuide,
          });
          setTimeout(() => {
            navigation.pop(3);
          }, 500);
        }

      default:
        break;
    }
  };
  return (
    <ScreenWrapper statusBarColor={colors?.prussianBlue}>
      <TouchableOpacity style={styles?.clickView} onPress={onBackPress}>
        <Text style={styles?.doneText}>
          {currentIndex === 5 ? strings.Done : strings?.Skip}
        </Text>
      </TouchableOpacity>

      <View style={styles.redView}>
        <Animated.View
          style={[
            styles?.animateView,
            { top: animatedTop, right: animatedRight },
          ]}
        >
          <Animated.View
            style={[
              styles.whiteView,
              {
                transform: [{ scale: scaleAnim }],
              },
              {
                backgroundColor:
                  currentIndex % 2 === 1
                    ? colors?.royalOrangeDarkOP2
                    : colors?.polishedPineOP2,
              },
            ]}
          >
            <Animated.View
              style={[
                styles.yellowView,
                {
                  backgroundColor:
                    currentIndex % 2 === 1
                      ? colors?.royalOrangeDark
                      : colors?.polishedPine,
                  paddingBottom:
                    currentIndex === 1
                      ? moderateScale(80)
                      : [3].includes(currentIndex)
                      ? moderateScale(55)
                      : currentIndex === 4
                      ? moderateScale(30)
                      : moderateScale(60),
                },
              ]}
            >
              <Animated.Text
                style={[
                  styles.text,
                  {
                    color:
                      currentIndex % 2 === 1
                        ? colors?.prussianBlue
                        : colors?.SurfCrest,
                    fontSize:
                      currentIndex === 4 ? textScale(18.4) : textScale(20),
                    alignSelf: "center",

                    marginTop: [0, 5].includes(currentIndex)
                      ? 10
                      : currentIndex === 4
                      ? 20
                      : 0,
                  },
                ]}
              >
                {sampleText[currentIndex]}
              </Animated.Text>
            </Animated.View>
          </Animated.View>
        </Animated.View>

        <View style={styles.centerView}>
          <Animated.View
            style={[
              styles.animatedBasicInfo,
              { transform: [{ translateY: slideAnim }] },
              { gap: 19 },
            ]}
          >
            <View style={styles?.smallView}>
              <Image
                style={{
                  width:
                    currentIndex === 2
                      ? width
                      : currentIndex === 4
                      ? width * 0.95
                      : width * 0.95,
                  height: height * 0.47,

                  borderRadius: [2, 4].includes(currentIndex)
                    ? moderateScale(0)
                    : moderateScale(15),
                }}
                source={ImagesData[currentIndex]}
                resizeMode={APPLY_STATUS?.contain}
              />
            </View>

            <View
              style={[
                styles?.touchableView,
                {
                  bottom: [2, 4, 5].includes(currentIndex) ? 0 : -15,
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles?.tochableContainer,
                  {
                    backgroundColor:
                      currentIndex % 2 === 0
                        ? colors?.royalOrangeDark
                        : colors?.SurfCrest,
                  },
                ]}
                onPress={handleButtonPress}
              >
                <Text style={styles?.touchText}>
                  {ButtonText[currentIndex]}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          <View style={styles?.view_one}>
            <View style={[styles?.view_two, { width: getWidth() }]} />
          </View>
        </View>
      </View>
      {toasterDetails?.showToaster && (
        <ToastApiResponse
          data={toasterDetails}
          setToasterDetails={setToasterDetails}
          code={toasterDetails?.code}
          message={toasterDetails?.message}
        />
      )}
    </ScreenWrapper>
  );
};

export default ProductGuide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.prussianBlue,
  },
  skipText: {
    fontWeight: "500",
    fontSize: textScale(16),
    color: colors?.prussianBlue,
    alignSelf: "flex-end",
    marginRight: moderateScale(40),
    marginBottom: moderateScale(20),
  },
  redView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: colors?.prussianBlue,
  },
  whiteView: {
    width: width * 0.8,
    height: width * 0.8,
    justifyContent: "center",
    alignItems: "center",
    padding: moderateScale(10),
    borderRadius: moderateScale(200),
    right: -30,
    top: 0,
  },
  text: {
    fontSize: textScale(20),
    width: width * 0.5,
    fontWeight: "500",
    textAlign: "center",
  },
  yellowView: {
    height: width * 0.7,
    width: width * 0.7,
    justifyContent: "flex-end",
    alignItems: "center",

    borderRadius: moderateScale(200),
  },

  centerView: {
    height: "70%",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  animatedBasicInfo: {},
  clickView: {
    marginLeft: 21,
    zIndex: 1,
  },
  doneText: {
    color: colors?.SurfCrest,
    fontWeight: "500",
    fontSize: textScale(14),
  },
  animateView: {
    width: width * 0.96,
    height: width * 0.96,
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },
  smallView: {
    width: width,
    alignItems: "center",
    top: -10,
  },
  touchableView: {
    width: width,
    alignItems: "center",
  },
  tochableContainer: {
    width: width * 0.85,
    height: height * 0.08,

    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  touchText: {
    fontWeight: "500",
    fontSize: textScale(14),
    color: colors?.prussianBlue,
  },
  view_one: {
    width: width * 0.85,
    alignSelf: "center",
    position: "absolute",
    bottom: height * 0.03,
    height: 2,
    backgroundColor: "#FFFFFF2E",
  },
  view_two: {
    height: 2,
    backgroundColor: colors?.SurfCrest,
  },
});
