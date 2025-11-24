//calender
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import CommonHeader from "../../../components/Header/commonHeader";
import colors from "../../../constant/colors";
import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import moment from "moment";
import { RecentActivites } from "./RenderUI";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import { NoDataIcon } from "../../../assets";
import CommonLoader from "../../../components/Loader";
import { CircularProgress } from "react-native-circular-progress";
import styles from "./styles";
import {
  calculateFillPercentage,
  getProgressText,
} from "../../../helper/duration";
import { ddd_DD_MMM_MMM } from "../../../constant/dateFormatConstants";
// import { styles } from './styles';

interface Props {
  navigation?: any;
  route?: any;
}
const ActivityCalendarView = ({ navigation, route }: any) => {
  const { ActivityDetails } = route?.params;

  console.log("-ActivityDetails-->>ActivityDetails>", ActivityDetails);

  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [IsLoading, setIsLoading] = useState(false);
  const [RecentActivity, setRecentActivity] = useState([]);
  useEffect(() => {
    if (ActivityDetails?.id) {
      GetActivityRecentHistoryByDateAndId();
    }
  }, [selectedDate]);
  const GetActivityRecentHistoryByDateAndId = async () => {
    let req = {};
    setIsLoading(true);

    allActions.OnBoarding.GetActivityRecentHistoryByDateAndId(
      dispatch,
      req,
      "GetActivityRecentHistoryByDateAndId",
      // "targetDate=2024-08-24&activityId=579",
      "?targetDate=" +
        `${selectedDate}` +
        "&activityId=" +
        `${ActivityDetails?.id}`
    )
      .then((response: any) => {
        if (response?.statusCode == 200) {
          setIsLoading(false);
          if (response?.data) {
            setRecentActivity(response?.data);
          }
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString);
  };

  const sortByCreatedDateDescending = (arr: any) => {
    // Sort the array by createdDate
    const sortedArray = arr?.slice()?.sort((a: any, b: any) => {
      // Convert createdDate from UTC to local time for comparison
      return moment.utc(a?.createdDate)?.diff(moment.utc(b?.createdDate));
    });

    // Map the sorted array to create a new array with formatted createdDate
    return sortedArray?.map((item: any) => ({
      ...item, // Spread the original item properties
      createdDate: moment
        .utc(item?.createdDate)
        .local()
        .format("YYYY-MM-DD HH:mm:ss"), // Format createdDate to local time
      stepAnswer: item?.stepAnswer?.map((step: any) => ({
        ...step,
        createdDate: moment
          .utc(step?.createdDate)
          .local()
          .format("YYYY-MM-DD HH:mm:ss"), // Format stepAnswer createdDate
      })),
    }));
  };

  return (
    console.log("cehck RecentActivity details ====>", RecentActivity),
    (
      <ScreenWrapper statusBarColor={colors.darkbackgroundTheme}>
        <CommonHeader
          headerName={"Recent activity history"}
          mainContainer={{
            backgroundColor: colors.darkbackgroundTheme,
            marginTop: moderateScale(20),
            marginLeft: moderateScale(19),
          }}
          onBackPress={() => navigation.goBack()}
        />
        <>
          <ScrollView
            style={{
              flex: 1,
              backgroundColor: colors.darkbackgroundTheme,
              padding: 20,
              paddingBottom: moderateScale(60),
            }}
          >
            <Calendar
              current={moment(new Date()).format("YYYY-MM-DD")}
              onDayPress={onDayPress}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  marked: true,
                  selectedColor: "#6DC1A4",
                },
                // '2024-09-01': { marked: true, dotColor: '#FFCC5C' },
                // '2024-09-07': { marked: true, dotColor: '#FFCC5C' },
                // '2024-09-15': { marked: true, dotColor: '#FFCC5C' },
                // '2024-09-22': { marked: true, dotColor: '#FFCC5C' },
              }}
              theme={{
                backgroundColor: colors.darkbackgroundTheme,
                calendarBackground: colors.darkbackgroundTheme,
                textSectionTitleColor: "#FFFFFF",
                dayTextColor: "#FFFFFF",
                monthTextColor: "#FF9F5C",
                arrowColor: "#FF9F5C",
                todayTextColor: "#6DC1A4",
                selectedDayTextColor: "#FFFFFF",
                selectedDayBackgroundColor: "#6DC1A4",
                textDayFontWeight: "300",
                textMonthFontWeight: "bold",
                textDayHeaderFontWeight: "bold",
                textDayFontSize: 16,
                textMonthFontSize: 20,
                textDayHeaderFontSize: 14,
              }}
              // Hide extra days from other months
              hideExtraDays={true}
              // Enable the swipe between months
              enableSwipeMonths={true}
            />
            {IsLoading ? (
              <CommonLoader />
            ) : (
              <View style={{}}>
                {RecentActivity?.length > 0 ? (
                  <>
                    {sortByCreatedDateDescending(RecentActivity).map(
                      (item: any, index: any) => {
                        console.log("item?.createdDate", item?.createdDate);

                        const { fillPercentage, displayText } =
                          calculateFillPercentage(ActivityDetails, item);
                        console.log("item2-->", item);
                        console.log("first2", "fillPercentage", fillPercentage);
                        console.log("first2", "displayText", displayText);
                        return (
                          <View style={styles.recentActivityContainer}>
                            <View>
                              <View
                                style={[
                                  styles.recentActivityTextContainer,
                                  {
                                    flexDirection: "row",
                                    alignItems: "flex-end",
                                  },
                                ]}
                              >
                                <Text style={[styles.recentActivityTime]}>
                                  {moment(item?.createdDate).format("hh:mm")}
                                </Text>
                                <Text style={[styles.recentActivityAM, {}]}>
                                  {moment(item?.createdDate).format("A")}
                                </Text>
                              </View>
                              <Text
                                style={[
                                  styles.recentActivityAM,
                                  {
                                    marginLeft: moderateScale(2),
                                    marginTop: moderateScale(3),
                                    fontSize: textScale(12),
                                  },
                                ]}
                              >
                                {/* {moment(item?.createdDate).format("DD-MM-YYYY")} */}
                                {moment(item?.createdDate).format(
                                  ddd_DD_MMM_MMM
                                )}
                              </Text>
                              {item?.stepAnswer?.[2]?.answer && (
                                <Text style={[styles.recentActivityFeedback]}>
                                  {item?.stepAnswer?.[2]?.answer}
                                </Text>
                              )}
                            </View>
                            <View
                              style={{
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {/* <CircularProgress
                                size={60}
                                width={6}
                                // fill={
                                //   calculateFillPercentage(ActivityDetails, item)
                                //     ?.fillPercentage
                                // }
                                fill={parseInt(
                                  getProgressText(
                                    ActivityDetails,
                                    item
                                  ).replace("%", "")
                                )}
                                tintColor={colors?.SaltBox}
                                backgroundColor={colors?.lightGrey}
                                rotation={210}
                                lineCap="round"
                                arcSweepAngle={360}
                              >
                                {() => (
                                  <>
                                    {ActivityDetails?.isFeatured ? (
                                      <View
                                        style={styles.circularProgressContainer}
                                      >
                                        <Text
                                          style={styles.circularProgressText}
                                        >
                                          {"100%"}
                                        </Text>
                                      </View>
                                    ) : (
                                      <View
                                        style={styles.circularProgressContainer}
                                      >
                                        <Text
                                          style={styles.circularProgressText}
                                        >
                                          {getProgressText(
                                            ActivityDetails,
                                            item
                                          )}
                                        </Text>
                                      </View>
                                    )}
                                  </>
                                )}
                              </CircularProgress> */}
                              <CircularProgress
                                size={60}
                                width={6}
                                // fill={parseInt(
                                //   getProgressText(ActivityDetails, item).replace("%", "")
                                // )}
                                fill={item?.progress}
                                tintColor={colors?.SaltBox}
                                backgroundColor={colors?.lightGrey}
                                rotation={210}
                                lineCap="round"
                                arcSweepAngle={360}
                              >
                                {() => {
                                  return (
                                    console.log(
                                      "getProgressText(ActivityDetails, item)",
                                      getProgressText(ActivityDetails, item)
                                    ),
                                    (
                                      <>
                                        {ActivityDetails?.isFeatured ? (
                                          <View
                                            style={
                                              styles.circularProgressContainer
                                            }
                                          >
                                            <Text
                                              style={
                                                styles.circularProgressText
                                              }
                                            >
                                              {"100%"}
                                            </Text>
                                          </View>
                                        ) : (
                                          <View
                                            style={
                                              styles.circularProgressContainer
                                            }
                                          >
                                            <Text
                                              style={
                                                styles.circularProgressText
                                              }
                                            >
                                              {/* {getProgressText(ActivityDetails, item)} */}
                                              {Number(item?.progress).toFixed(
                                                0
                                              )}
                                              %
                                            </Text>
                                          </View>
                                        )}
                                      </>
                                    )
                                  );
                                }}
                              </CircularProgress>
                              <Text
                                style={{
                                  fontSize: textScale(12),
                                  color: colors.prussianBlue,
                                  fontWeight: "600",
                                  marginTop: moderateScale(5),
                                }}
                              >
                                {"Today's progress"}
                              </Text>
                            </View>
                          </View>
                        );
                      }
                    )}
                  </>
                ) : (
                  <>
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <NoDataIcon
                        width={`${moderateScale(100)}`}
                        height={`${moderateScale(100)}`}
                      />
                      <Text
                        style={{
                          fontSize: textScale(16),
                          fontWeight: "600",
                          color: colors.SurfCrest,
                        }}
                      >
                        {"No data"}
                      </Text>
                    </View>
                  </>
                )}
              </View>
            )}
          </ScrollView>
        </>
      </ScreenWrapper>
    )
  );
};

export default ActivityCalendarView;
