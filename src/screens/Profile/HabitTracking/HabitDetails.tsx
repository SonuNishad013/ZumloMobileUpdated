import {
  Alert,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { imagePath } from "../../../assets/png/imagePath";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import Header from "./Header";
import { StringsHabitTracking } from "./StringsHabitTracking";
import logger from "../../../constant/logger";
import colors from "../../../constant/colors";
import {
  height,
  moderateScale,
  textScale,
} from "../../../constant/responsiveStyle";
import {
  DaysHabitTracking,
  Enum_HabitFrequancy_,
  Enum_submitHabit,
} from "../../../constant/ENUM";
import { habitDetailStyle, styles } from "./styles";
import { CalendarIcon } from "../../../assets";
import moment from "moment";
import { hh_mm_A } from "../../../constant/dateFormatConstants";
import CommonButton from "../../../components/Buttons/commonButton";
import RBSheet from "react-native-raw-bottom-sheet";
import allActions from "../../../redux/actions";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import { STATUS_CODES } from "../../../constant/appConstant";
import CommonLoader from "../../../components/Loader";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import { DATE_FORMAT } from "../../../constant/DateFormats";
import { useFocusEffect } from "@react-navigation/native";
interface HabitDetailsProps {
  navigation?: any;
  route?: any;
}
const bottomSheetOpenDuration = 250;
const HabitDetails: React.FC<HabitDetailsProps> = ({ navigation, route }) => {
  logger("checkHabitDetailsRoute_____", route?.params);
  const rbSheetRef = useRef<any>(null);
  const { HabitDetailData, date, from, NotificationData } = route?.params;
  const [habitDetailsInfo, sethabitDetails] = useState<any>(
    HabitDetailData || null
  );
  const freq =
    habitDetailsInfo && Enum_HabitFrequancy_[habitDetailsInfo?.frequency];
  const days_: any[] = habitDetailsInfo && habitDetailsInfo?.daysOfWeek;
  const daysList: string[] =
    habitDetailsInfo && days_?.map((day) => DaysHabitTracking[day]);
  const [feedback, setFeedback] = useState<string>("");
  const [isLoader, setIsLoader] = useState(NotificationData ? true : false);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  useFocusEffect(
    useCallback(() => {
      logger("from__", from);
      logger("NotificationData__", NotificationData);
      if (from === "NotificationClick") {
        NotificationData && getHabitDetailsByID(Number(NotificationData?.Id));
      } else {
        HabitDetailData && sethabitDetails(HabitDetailData);
      }
    }, [])
  );

  const onButtonPress = (isSkipped: boolean) => {
    if (!isSkipped) {
      rbSheetRef?.current?.open();
    } else {
      submitHabitFeedback(Enum_submitHabit?.skipper);
    }
  };
  const checkIsSameDay = () => {
    if (date || moment().format(DATE_FORMAT?.format_year_month_date)) {
      const isSameDay = moment(
        date || moment().format(DATE_FORMAT?.format_year_month_date)
      ).isSame(moment(), "day");
      return isSameDay;
    } else {
      return true;
    }
  };
  const submitHabitFeedback = async (status: number) => {
    setIsLoader(true);
    const requestBoady = {
      habitId: habitDetailsInfo?.habitId,
      habitStatus: status,
      notes: feedback?.trim(),
    };
    try {
      const response = await allActions?.HabitAction?.saveHabitTrackingAPI(
        requestBoady,
        API_FUN_NAMES?.saveHabitTrackingAPI
      );
      rbSheetRef.current.close();
      if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
        setIsLoader(false);
        setToasterDetails({
          showToast: true,
          code: 1,
          message: response?.message,
        });
        navigation?.pop(1);
        setFeedback("");
      } else {
        setIsLoader(false);
        setToasterDetails({
          showToast: true,
          code: 0,
          message: response?.message,
        });
      }
    } catch (error: any) {
      setIsLoader(false);
      setToasterDetails({
        showToast: true,
        code: 0,
        message: error?.message,
      });
    }
  };
  const getHabitDetailsByID = async (id: number) => {
    setIsLoader(true);
    try {
      let requestBody = {
        habitId: id || habitDetailsInfo?.habitId,
      };
      const response = await allActions?.HabitAction?.getHabitProgressByIdAPI(
        requestBody,
        API_FUN_NAMES?.getHabitProgressByIdAPI
      );
      if (response) {
        setIsLoader(false);
        setToasterDetails({
          showToast: true,
          code: 1,
          message: response?.message,
        });
      }
      if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
        sethabitDetails(response?.data);
      } else {
        navigation?.goBack();
      }
    } catch (error) {
      setIsLoader(false);
      setToasterDetails({
        showToast: true,
        code: 0,
        message: "Something went wrong",
      });
      navigation?.goBack();
    }
  };
  return (
    logger("isLoading okay____", isLoader),
    (
      <ImageBackground
        source={imagePath?.PhysicalHealthBackground}
        style={{ flex: 1 }}
      >
        <ScreenWrapper statusBarColor={colors?.transparent}>
          <View style={{ flex: 1 }}>
            <Header
              title={StringsHabitTracking?.habitDetails}
              navigation={navigation}
              container={{ backgroundColor: colors?.transparent }}
            />
            {!isLoader ? (
              <>
                <Text style={habitDetailStyle?.headerStyle}>
                  {
                    "Your routine, your pace. Everything you’ve set for this habit is right here."
                  }
                </Text>
                <View style={habitDetailStyle?.detailContainer}>
                  <Text style={habitDetailStyle?.TitleText}>
                    {habitDetailsInfo?.name}
                  </Text>
                  <Text
                    style={[
                      habitDetailStyle?.scheduleNow,
                      { marginVertical: moderateScale(15) },
                    ]}
                  >
                    {"Scheduled for "}
                  </Text>

                  <View
                    style={[
                      habitDetailStyle?.freqencyTextIconConatiner,
                      { alignSelf: "center" },
                    ]}
                  >
                    <CalendarIcon
                      width={moderateScale(15)}
                      height={moderateScale(15)}
                    />

                    <Text
                      style={[
                        styles?.daysText,
                        {
                          color: colors?.SurfCrest,
                          marginLeft: moderateScale(5),
                        },
                      ]}
                    >
                      {freq}
                    </Text>
                  </View>
                  <FlatList
                    scrollEnabled={false}
                    bounces={false}
                    data={daysList}
                    horizontal
                    renderItem={({ item: itm, index: idx }) => {
                      const color = [
                        colors?.backgroundTheme,
                        colors?.royalOrangeDark,
                        colors?.polishedPine,
                      ];
                      return (
                        <View
                          style={[
                            styles.daysBox,
                            {
                              backgroundColor: color[0],
                              marginRight: moderateScale(5),
                            },
                          ]}
                        >
                          <Text
                            style={[
                              habitDetailStyle?.daysText,
                              {
                                color: colors?.SurfCrest,
                              },
                            ]}
                          >
                            {itm}
                          </Text>
                        </View>
                      );
                    }}
                  />

                  <View style={habitDetailStyle?.circleTextContainer}>
                    <View style={habitDetailStyle?.circlurView}>
                      <Text
                        style={[
                          habitDetailStyle?.reminderText,
                          { fontSize: moderateScale(18) },
                        ]}
                      >
                        {StringsHabitTracking?.Goal_for_the_habit_is}
                      </Text>
                      <Text style={habitDetailStyle?.goalsCountText}>
                        {`${habitDetailsInfo?.goal} ${StringsHabitTracking?.Times}`}
                      </Text>
                    </View>

                    <Text style={habitDetailStyle?.reminderText}>
                      {`${StringsHabitTracking?.Reminder_set_for}`}
                      <Text
                        style={{ color: colors?.SurfCrest, fontWeight: "400" }}
                      >
                        {habitDetailsInfo?.reminderTime}
                      </Text>
                    </Text>
                    <Text style={habitDetailStyle?.reminderText}>
                      {`${StringsHabitTracking?.Duration_of_habit_is}`}
                      <Text
                        style={{ color: colors?.SurfCrest, fontWeight: "400" }}
                      >
                        {habitDetailsInfo?.duration}
                      </Text>
                    </Text>
                  </View>

                  {daysList?.includes(moment().format("ddd")) &&
                    checkIsSameDay() && (
                      <>
                        <CommonButton
                          btnName={"I did it"}
                          onPress={() => onButtonPress(false)}
                        />
                        <CommonButton
                          btnName={"Skip for now"}
                          mainContainer={habitDetailStyle?.skipButtonContainer}
                          onPress={() => onButtonPress(true)}
                        />
                      </>
                    )}
                </View>
              </>
            ) : (
              <CommonLoader />
            )}
          </View>
          <RBSheet
            height={height * 0.4}
            ref={rbSheetRef}
            openDuration={bottomSheetOpenDuration}
            customStyles={{ container: habitDetailStyle?.sheet }}
            closeOnDragDown={true}
          >
            <View style={habitDetailStyle?.sheetInnverView}>
              <Text
                style={habitDetailStyle?.skipButtonSheetText}
                onPress={() => {
                  //call the api for submitting the habit without feedback
                  submitHabitFeedback(Enum_submitHabit?.completed);
                }}
              >
                {StringsHabitTracking?.Skip}
              </Text>
              <Text style={habitDetailStyle?.sheetDescriptionText}>
                {
                  StringsHabitTracking?.We_would_love_to_take_your_feedback_on_this_habit
                }
              </Text>
              <TextInput
                value={feedback}
                onChangeText={setFeedback}
                multiline
                style={habitDetailStyle?.textBox}
                placeholder={StringsHabitTracking?.Add_feedback}
                placeholderTextColor={colors?.prussianBlue}
              />
              <CommonButton
                btnName={StringsHabitTracking?.Save}
                onPress={() => {
                  submitHabitFeedback(Enum_submitHabit?.completed);
                }}
              />
            </View>
          </RBSheet>

          {toasterDetails?.showToast && (
            <ToastApiResponse
              data={toasterDetails}
              setToasterDetails={setToasterDetails}
              code={toasterDetails?.code}
              message={toasterDetails?.message}
            />
          )}
        </ScreenWrapper>
      </ImageBackground>
    )
  );
};

export default HabitDetails;
