import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import * as Progress from "react-native-progress";
import BackgroundTimer from "react-native-background-timer";
import navigationString from "../../../navigation/navigationString";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import CommonHeader from "../../../components/Header/commonHeader";
import colors from "../../../constant/colors";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
// import { styles } from "./styles";
import { convertToMinutes } from "../../../components/Hooks/getMinFromHr";
import CommonButton from "../../../components/Buttons/commonButton";
import moment from "moment";
import BoxButtonIcon from "../../../components/OnBoardiingComponents/BoxButtonIcon";
import { imagePath } from "../../../assets/png/imagePath";
import { strings } from "../../../constant/strings";
import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import styles from "./styles";

const StartActivity = ({ navigation, route }: any) => {
  const dispatch = useDispatch();
  const [totalTime, setTotalTime] = useState<any>(); // Default time: 10 minutes 13 seconds
  const [elapsedTime, setElapsedTime] = useState(0); // Time elapsed in seconds
  const [timerOn, setTimerOn] = useState(false); // Timer initially off
  const [progress, setProgress] = useState(0); // Start progress at 0 (clockwise)
  const radius = 100; // Radius of the circle for calculating the icon position
  const iconSize = 24; // Icon size for accurate positioning
  const [isFirstTime, setisFirstTime] = useState(true);
  const [activityHistoryId, setactivityHistoryId] = useState(1);
  const { ActivityDetails } = route?.params;
  useEffect(() => {
    if (ActivityDetails) {
      let time = convertToMinutes(ActivityDetails?.duration);
      setTotalTime(time * 60);
    }
  }, []);
  console.log("ActivityDetails", ActivityDetails);

  useEffect(() => {
    if (timerOn) {
      startTimer();
    } else {
      BackgroundTimer.stopBackgroundTimer();
    }

    return () => BackgroundTimer.stopBackgroundTimer();
  }, [timerOn]);

  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setElapsedTime((prevElapsedTime) => {
        const newElapsedTime = prevElapsedTime + 1;
        setProgress(newElapsedTime / totalTime);

        if (newElapsedTime >= totalTime) {
          BackgroundTimer.stopBackgroundTimer();
          setTimerOn(false);
          return totalTime;
        }

        return newElapsedTime;
      });
    }, 1000); // 1 second interval
  };

  const formatTime = (timeInSeconds: any) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const remainingTime = totalTime - elapsedTime;
  const getPayload = (
    activityHistoryId: any,
    activityHistoryType: any,
    type: any
  ) => {
    // let req={
    //     activityId:ActivityDetails?.id,
    //     activityHistoryId:activityHistoryId,
    //     activityHistoryType:activityHistoryType
    // }
    let payload: any = {
      activityId: ActivityDetails?.id,
      activityHistoryType: activityHistoryType,
    };

    if (type === "start") {
      payload.activityHistoryId = activityHistoryId; // When starting, it could be 0
    }

    if (type === "end") {
      payload.activityHistoryId = activityHistoryId; // Assuming an ongoing activity has an ID
      payload.spentTime = elapsedTime; // In seconds
      payload.totalTime = totalTime; // In seconds
    }
    if (type === "pause") {
      payload.activityHistoryId = activityHistoryId; // Assuming an ongoing activity has an ID
      payload.spentTime = elapsedTime; // In seconds
      payload.totalTime = totalTime; // In seconds
    }

    if (type === "IsFeatured") {
      payload.activityHistoryId = 0;
      payload.formName = ActivityDetails?.formName || 343; // Global code FormName
      payload.formKeyId = ActivityDetails?.formKeyId || 1; // Primary key from mood journal
    }
    console.log("getPayload for start==>", payload);
    // await saveActivityDetails(payload)
    return payload;
  };
  const saveActivityDetails = async (payload: any, type: any) => {
    try {
      // Dispatch the action or call the API
      let resp = await allActions.OnBoarding.SaveActivityHistoryDetail(
        dispatch,
        payload,
        "SaveActivityHistoryDetail"
      );
      console.log("Successfully saved activity history", resp, type);
      if (resp.statusCode == 200) {
        setactivityHistoryId(resp?.data);
        if (type == "end") {
          navigation?.navigate(navigationString?.ActivityFeedback, {
            id: ActivityDetails?.id,
            activityHistoryId: resp?.data,
            totalTime: moment
              .duration(
                ActivityDetails?.duration.replace(/[^\d].*/, ""),
                "hours"
              )
              .asMinutes(),
            completedTime: remainingTime,
          });
        } else {
        }
      }
    } catch (error) {
      console.log("Error saving activity history", error);
    } finally {
      // setIsLoading(false);
    }
  };
  const ActivityAPI = (req: any, type: any) => {
    console.log("ActivityAPI req=-=-=-=-=-=>", req);
    saveActivityDetails(req, type);
  };
  const StartNow = () => {
    //activityHistoryId,activityHistoryType,
    setTimerOn(!timerOn);
    setisFirstTime(true);
    ActivityAPI(getPayload(activityHistoryId, 1, "start"), "start");
  };
  const endNow = () => {
    setTimerOn(!timerOn);
    setisFirstTime(true);
    ActivityAPI(getPayload(activityHistoryId, 2, "end"), "end");
  };
  const pauseNow = () => {
    // setTimerOn(!timerOn)
    setTimerOn(!timerOn);
    setisFirstTime(false);
    ActivityAPI(getPayload(activityHistoryId, 4, "pause"), "pause");
  };
  return (
    <ScreenWrapper statusBarColor={colors.darkbackgroundTheme}>
      {/* <CommonHeader
                headerName="Activity Details"
                mainContainer={{ backgroundColor: colors.darkbackgroundTheme }}
                onBackPress={() => navigation.goBack()}
            /> */}
      <CommonHeader
        headerName={strings?.activityDetails}
        onBackPress={() => navigation?.goBack()}
        iconContainer={styles.iconContainer}
        mainContainer={styles.mainContainer}
      />
      <View
        style={[
          styles.activityInfoRow,
          { marginTop: moderateScale(20), marginHorizontal: moderateScale(30) },
        ]}
      >
        <BoxButtonIcon
          activeOpacity={0}
          button={styles.boxButtonIcon}
          source={imagePath?.MedVector}
          image={styles.boxButtonIconImage}
        />
        <Text style={styles.activityInfoText}>{ActivityDetails?.name}</Text>
      </View>
      <ScrollView style={styles.container}>
        {/* Circular Progress Bar */}
        <View style={styles.progressContainer}>
          <Progress.Circle
            size={2 * radius}
            progress={progress}
            showsText={true}
            formatText={() => (
              <View style={styles.timerTextContainer}>
                <Text style={styles.mainTimeText}>{formatTime(totalTime)}</Text>
                <Text style={styles.remainingTimeText}>
                  -{formatTime(remainingTime)}{" "}
                  <Text style={styles.minsText}>mins</Text>
                </Text>
              </View>
            )}
            textStyle={styles.progressText}
            color={colors.polishedPine}
            unfilledColor="rgba(255, 255, 255, 0.2)"
            borderWidth={0}
            thickness={8}
          />
        </View>

        <View style={styles.buttonsContainer}>
          <CommonButton
            btnName={timerOn ? "End Now" : "Start Now"}
            onPress={() => {
              timerOn
                ? // navigation?.navigate(navigationString?.ActivityCalendarView)
                  endNow()
                : StartNow();
            }}
          />
          <CommonButton
            btnName={timerOn ? "Pause" : "Cancel"}
            mainContainer={{
              marginTop: moderateScale(20),
              width: moderateScale(100),
              backgroundColor: "transparent",
            }}
            onPress={() => {
              timerOn ? pauseNow() : navigation.goBack();
            }}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default StartActivity;
