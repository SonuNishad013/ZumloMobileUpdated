import React, {
  ReactElement,
  useState,
  useMemo,
  useRef,
  useEffect,
} from "react";
import {
  FlatList,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  Alert,
  BackHandler,
} from "react-native";
import { dddcDosMMMsYYYY } from "../../../constant/dateFormatConstants";
import moment from "moment";
import { imagePath } from "../../../assets/png/imagePath";
import Mindfulness from "./Mindfulness";
import Nutrition from "./Nutrition";
import Fitness from "./Fitness";
import Sleep from "./Sleep";
import CategoriesSpecificList from "./CategoriesSpecificList";
import OtherActivityList from "./OtherActivityList";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import ButtonIcon from "../../../components/Buttons/ButtonIcon";
import colors from "../../../constant/colors";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import navigationString from "../../../navigation/navigationString";
// import DashboardHeader from "../Planner/DashboardHeader";
import {
  AIChatIcon,
  CalendarIcon,
  ChatIcon,
  DashboardBackgroundIcon,
  NotificationIcon,
} from "../../../assets";
// import Voice from "@react-native-community/voice";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-native-reanimated-carousel";
import allActions from "../../../redux/actions";
import { event } from "../../../navigation/emitter";
import DashboardHeader from "./DashboardHeader";
import Voice from "@react-native-voice/voice";
import { strings } from "../../../constant/strings";

const Dashboard: React.FC<{ navigation?: any }> = ({
  navigation,
}): ReactElement => {
  const [todayDate, setTodayDate] = useState<string>(
    moment(new Date()).format(dddcDosMMMsYYYY)
  );
  const userType = useSelector(
    (state: any) => state?.loginToggle?.data?.userType
  );
  const [showRecordButton, setShowRecordButton] = useState(false);

  const [notificationData, setNotificationData] = useState<number>(5);
  const [greetingData, setgreetingData] = useState([
    {
      id: 1,
      name: "Visualize your highest self and start showing up as him/her .",
    },
  ]);
  const topViewRef = useRef<View>(null);
  const [topViewHeight, setTopViewHeight] = useState(0);
  const [MindfulnessData, setMindfulnessData] = useState([
    {
      id: 1,
      type: "session",
      details: [
        {
          id: 1,
          name: "Join the Mindfulness Challenge with others!",
          description:
            "Encourage user to adopt healthy lifestyle habits that can help you.",
          count: 18,
        },
      ],
    },
    {
      id: 2,
      type: "video",
      details: [
        {
          id: 1,
          name: "My Daily Calm",
          description: "Relaxing mindfulness meditation",
          duration: "15 mins 30 secs",
        },
      ],
    },
    {
      id: 3,
      type: "new",
      details: [
        {
          id: 1,
          name: "Let's be Mindfulness for your healthy life!",
          description:
            "Let's explore the benefitsof the mindfulness with Zumlo :)",
        },
      ],
    },
  ]);
  const [NutritionData, setNutritionData] = useState([
    {
      id: 1,
      title: "“Zumlo” for healthy nutrition's and diet",
    },
  ]);
  const [FitnessData, setFitnessData] = useState([
    {
      id: 1,
      title: "Let's learn to maintain your fitness",
    },
  ]);
  const [SleepData, setSleepData] = useState([
    {
      id: 1,
      title: "Relaxing Sleeping",
    },
  ]);
  const [categoriesSpecificData, setCategoriesSpecificData] = useState([
    {
      id: 1,
      title: `“Zumlo” for healthy nutrition's and diet`,
      btnName: "20 Activities",
      icon: imagePath?.MeditaionBg,
    },
    {
      id: 2,
      title: `Relaxing Sleep pattern`,
      btnName: "10 Activities",
      icon: imagePath?.MeditaionBg,
    },
    {
      id: 3,
      title: `Have Sound therpay`,
      btnName: "5 Activities",
      icon: imagePath?.MeditaionBg,
    },
  ]);
  const [otherActivityListData, setOtherActivityListData] = useState([
    {
      id: 1,
      title: "Zumlo for healthy nutrition's and diet",
      icon: imagePath?.MeditaionBg,
    },
    {
      id: 2,
      title: "Empowering healthy nutrition and diet choices.",
      icon: imagePath?.TestImage,
    },
    {
      id: 3,
      title: "Empowering healthy nutrition.",
      icon: imagePath?.TestImage,
    },

    {
      id: 4,
      title: "“Zumlo” for healthy nutrition's and diet",
      icon: imagePath?.TestImage,
    },
    {
      id: 5,
      title: "Empowering healthy nutrition and diet choices.",
      icon: imagePath?.TestImage,
    },
    {
      id: 6,
      title: "Empowering healthy nutrition and diet choices.",
      icon: imagePath?.TestImage,
    },
  ]);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      strings?.hardwareBackPress,
      () => {
        // Do nothing to prevent the default back button behavior
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);
  // useEffect(() => {
  //   Voice.onSpeechStart = onSpeechStartHandler;
  //   Voice.onSpeechEnd = onSpeechEndHandler;
  //   Voice.onSpeechResults = onSpeechResultsHandler;

  //   // Cleanup when the component unmounts
  //   return () => {
  //     Voice.destroy().then(Voice.removeAllListeners);
  //   };
  // }, []);
  const memoizedMindfulness = useMemo(
    () => <Mindfulness MindfulnessData={MindfulnessData} />,
    [MindfulnessData]
  );
  const memoizedNutrition = useMemo(
    () => <Nutrition NutritionData={NutritionData} />,
    [NutritionData]
  );
  const memoizedFitness = useMemo(
    () => <Fitness FitnessData={FitnessData} />,
    [FitnessData]
  );
  const memoizedSleep = useMemo(
    () => <Sleep SleepData={SleepData} />,
    [SleepData]
  );

  const onSpeechStartHandler = () => {
    // Handle speech start logic
  };

  const onSpeechEndHandler = () => {
    // Handle speech end logic
  };

  const onSpeechResultsHandler = (e: any) => {
    // Handle speech results logic
  };

  const onStartButtonPress = () => {
    Voice.start("en-US");
  };
  const renderTopView = () => (
    <View
      ref={topViewRef}
      onLayout={(event) => {
        const { height } = event.nativeEvent.layout;
        setTopViewHeight(height);
      }}
      style={{
        backgroundColor: colors.backgroundTheme,
        borderBottomLeftRadius: moderateScale(25),
        borderBottomRightRadius: moderateScale(25),
      }}
    >
      <DashboardBackgroundIcon
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 16,
          bottom: 0,
        }}
        height={`${moderateScale(300)}`}
      />
      <View
        style={{
          marginHorizontal: moderateScale(15),
          marginTop: moderateScale(20),
        }}
      >
        <DashboardHeader
          date={todayDate}
          notificationData={notificationData}
          greetingMsg={greetingData}
          onProfileIcon={() => navigation.navigate(navigationString.Profile)}
          // onNotificationIcon={()=>Alert.alert("dsf")}
          onPress={() => SignOut(navigation)}
        />
      </View>
    </View>
  );
  const onAIIcon = () => {};
  const renderFloatingButton = () => (
    <TouchableOpacity
      style={styles.floatingButton}
      // onPress={() => onStartButtonPress()}
    >
      <AIChatIcon />
    </TouchableOpacity>
  );
  const [preFilledactivityType, setpreFilledactivityType] = useState([
    {
      id: 1,
      name: "Recipe",
      icon: imagePath.RecipeIcon,
      isSelected: true,
    },
    {
      id: 1,
      name: "Gym",
      icon: imagePath.RecipeIcon,
      isSelected: false,
    },
    {
      id: 1,
      name: "Music",
      icon: imagePath.RecipeIcon,
      isSelected: false,
    },
  ]);
  const onActivitySelection = (
    item: any,
    Index: any,
    Array: any,
    setArray: any
  ) => {
    let newArr = Array.map((val: any, index: any) => {
      if (Index == index) {
        val["isSelected"] = true;
      } else {
        val["isSelected"] = false;
      }
      return { ...val };
    });
    console.log("preFilledactivityType", newArr);
    setArray(newArr);
  };
  const dispatch = useDispatch();
  const SignOut = async (navigation: any) => {
    let requestbody = {};
    allActions.Auth.SignOut(dispatch, requestbody, "SignOut")
      .then((response) => {
        console.log("Signout");
      })
      .catch((err) => {});
  };

  const renderRecipe = () => (
    <View style={{ marginVertical: 10 }}>
      <FlatList
        horizontal
        data={preFilledactivityType}
        keyExtractor={(item, index) => "key" + index}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              backgroundColor: item?.isSelected
                ? colors.backgroundTheme
                : colors.prussianBlue,
              borderRadius: moderateScale(16),
              marginRight: moderateScale(15),
              height: moderateScale(35),
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() =>
              onActivitySelection(
                item,
                index,
                preFilledactivityType,
                setpreFilledactivityType
              )
            }
          >
            <View
              style={{
                marginHorizontal: moderateScale(10),
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: colors.SurfCrest,
                  fontSize: textScale(14),
                  fontWeight: "600",
                }}
              >
                {item.name}
              </Text>
              <Image
                source={item.icon}
                style={{
                  width: moderateScale(22),
                  height: moderateScale(10),
                  marginLeft: 10,
                }}
              />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
  interface IconContainerProps {
    icon: React.ReactNode;
    notificationCount?: number;
    type?: string;
    onPress?: any;
  }
  const IconContainer: React.FC<IconContainerProps> = useMemo(
    () =>
      ({
        icon,
        notificationCount,
        type,
        onPress,
      }: IconContainerProps): ReactElement =>
        (
          <TouchableOpacity onPress={onPress}>
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor:
                    type == "notification"
                      ? colors.SurfCrest
                      : colors.royalOrange,
                },
              ]}
            >
              {icon}
              {type == "notification" && (
                <>
                  {!!notificationCount && (
                    <TouchableOpacity style={styles.notificationCountContainer}>
                      <Text style={styles.notificationCountText}>
                        {notificationCount}
                      </Text>
                    </TouchableOpacity>
                  )}
                </>
              )}
            </View>
          </TouchableOpacity>
        ),
    []
  );
  return (
    <ScreenWrapper statusBarColor={colors?.prussianBlue}>
      <View style={{ backgroundColor: colors.prussianBlue, flex: 1 }}>
        <FlatList
          bounces={true}
          data={["1"]}
          keyExtractor={(item, index) => "key" + index}
          showsVerticalScrollIndicator={false}
          decelerationRate={"fast"}
          snapToAlignment="start"
          renderItem={() => (
            <>
              {userType === "explorer" ? (
                <>
                  {/* <ButtonIcon /> */}
                  <View style={{ marginHorizontal: moderateScale(15) }}>
                    {renderRecipe()}
                    <CategoriesSpecificList data={categoriesSpecificData} />
                    <OtherActivityList data={otherActivityListData} />
                  </View>
                </>
              ) : (
                <>
                  {/* {renderTopView()} */}
                  <View
                    style={{
                      marginHorizontal: moderateScale(15),
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={styles.dateContainer}>
                      <CalendarIcon
                        width={moderateScale(21)}
                        height={moderateScale(22)}
                      />
                      <View style={styles.dateTextContainer}>
                        <Text style={styles.dateStyle}>
                          {moment(new Date()).format("ddd, DD MMMM YYYY")}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={[
                        styles.notificationContainer,
                        { justifyContent: "space-between" },
                      ]}
                    >
                      <IconContainer
                        icon={<NotificationIcon />}
                        onPress={() => SignOut(navigation)}
                        notificationCount={notificationData}
                        type="notification"
                      />
                    </View>
                  </View>
                  {/* {memoizedMindfulness}
                    {memoizedNutrition}
                    {memoizedFitness}
                    {memoizedSleep} */}
                  <View style={{ marginHorizontal: moderateScale(15) }}>
                    {renderRecipe()}
                    <CategoriesSpecificList data={categoriesSpecificData} />
                    <OtherActivityList data={otherActivityListData} />
                  </View>
                </>
              )}
            </>
          )}
          contentContainerStyle={{ paddingBottom: moderateScale(40) }}
        />
        {renderFloatingButton()}
      </View>
    </ScreenWrapper>
  );
};
export default Dashboard;
const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: moderateScale(20),
    right: moderateScale(20),
    borderRadius: moderateScale(30),
    padding: moderateScale(10),
    elevation: 5,
  },
  //  mainContainer: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  // },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dateTextContainer: {
    marginHorizontal: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
  },
  dateStyle: {
    fontSize: textScale(14),
    fontFamily: "Poppins-Regular",
    fontWeight: "600",
    color: colors.SurfCrest,
  },
  notificationContainer: {
    flexDirection: "row",
    // width: moderateScale(100),
    justifyContent: "flex-end",
  },
  iconContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderRadius: moderateScale(40),
  },
  notificationCountContainer: {
    width: moderateScale(20),
    height: moderateScale(20),
    // backgroundColor: colors.SurfCrest,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: colors.royalOrange,
    borderRadius: 10,
  },
  notificationCountText: {
    color: colors.prussianBlue,
    fontSize: textScale(9),
    fontWeight: "bold",
  },
});
