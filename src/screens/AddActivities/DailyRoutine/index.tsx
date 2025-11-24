import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import CommonHeader from "../../../components/Header/commonHeader";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import TaskListsContainer from "./TaskListsContainer";
import CalendarComponent from "../../../components/CalendarComponent/CalendarComponent";
import moment from "moment";
import CurrentWeekDays from "./DaysShow";
import updateCurrentWeek from "./getWeek";
import { strings } from "../../../constant/strings";
import allActions from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import ToastMsg from "../../../components/Hooks/useToast";
import categorizeTasks from "./categorizeTasks";
import { NoDataIcon } from "../../../assets";
import CommonLoader from "../../../components/Loader";
import { arrange } from "../../../helper/scheduleArragnge";
import { useIsFocused } from "@react-navigation/native";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import { getUsersAvailableSlots } from "../../../redux/selector";
import { DailyRouteTab_ENUM } from "../../../constant/ENUM";
import { DATE_FORMAT } from "../../../constant/DateFormats";

interface Props {
  navigation?: any;
  route?: any;
}

const DailyRoutine: React.FC<Props> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [showStartDate, setShowStartDate] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(moment());
  const [currentWeek, setCurrentWeek] = useState<any[]>([]);
  const [dateChanged, setDateChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [taskData, setTaskData] = useState<any[]>([]); // Initialized as an empty array
  const [selectedDate_, setSelectedDate_] = useState<any>();
  const [datePickFromCalender, setDatePickFromCalender] = useState<any>(
    moment().format(DATE_FORMAT?.habitDateFormat)
  );
  const [habitListData, setHabitListData] = useState<any[]>([]);
  const [callApiAgain, setCallApiAgain] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>(
    DailyRouteTab_ENUM?.ACTIVITIES
  );
  const [showSelectedDateOnCalender, setShowSelectedDateOnCalender] =
    useState<string>();
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  const mySlotes = useSelector(getUsersAvailableSlots());

  useEffect(() => {
    getWeekData();
  }, [dateChanged]);

  const isFocused = useIsFocused();

  useEffect(() => {
    GenerateOnboardingDetails();
  }, [isFocused]);

  useEffect(() => {
    if (callApiAgain) GenerateOnboardingDetails();
  }, [callApiAgain]);

  useEffect(() => {
    GenerateOnboardingDetails();
  }, [selectedDate_]);

  const GenerateOnboardingDetails = async () => {
    setIsLoading(true);
    try {
      await allActions.dashboardAction
        .GenerateOnboardingDetails(
          dispatch,
          undefined,
          "GetDailyQoutesByDate",
          selectedDate_
        )
        .then((response: any) => {
          setIsLoading(false);
          if (response.statusCode == 200) {
            setCallApiAgain(false);
            if (Array.isArray(response.data)) {
              setTaskData(response.data);
            } else {
              console.error("Expected an array for task data:", response.data);
              setTaskData([]);
            }
          }
        })
        .catch((err) => {
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
    }
  };

  const categorizedData = useMemo(() => categorizeTasks(taskData), [taskData]);

  let lastValidDate: string | null = null; // To store the last valid date

  function formatDateString(dateObj: any): string | null {
    if (!dateObj || !dateObj.date || !dateObj.year || !dateObj.month) {
      console.error("Invalid date object:", dateObj);
      return null; // Return null if the date object is invalid
    }

    const { date, year, month } = dateObj;
    const monthMap: any = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };

    const monthNumber = monthMap[month];

    if (!monthNumber) {
      console.error("Invalid month in date object:", dateObj);
      return null; // Return null if the month is invalid
    }

    return `${date}-${monthNumber}-${year}`;
  }

  const getConvertedDate = (date: any) => {
    let formattedDate: any = formatDateString(date);
    if (formattedDate && moment(formattedDate, "DD-MM-YYYY").isValid()) {
      lastValidDate = moment(formattedDate, "DD-MM-YYYY").format("YYYY-MM-DD"); // Save the valid date in ISO format
      setSelectedDate_(lastValidDate);
      // setSelectedDate(lastValidDate);
    } else if (lastValidDate) {
      setSelectedDate_(lastValidDate); // Retry with last valid date
      // setSelectedDate(lastValidDate);
    }
  };

  const getWeekData = () => {
    let { days } = updateCurrentWeek(selectedStartDate);
    setCurrentWeek(days);

    setDateChanged(false);
  };

  const onSelectDate_ = (item: any, index: any, data: any) => {
    let date = item.date;
    const updatedData = data.map((item: any) => {
      if (item.date === date) {
        const dummyDate = data.find((item: any) => item.date === date);
        const formattedDate = moment(
          `${dummyDate.year}-${dummyDate.month}-${dummyDate.date}`,
          "YYYY-MMM-DD"
        ).format("YYYY-MM-DD");
        setShowSelectedDateOnCalender(formattedDate);
        return {
          ...item,
          isTodayDate: true,
          day: item.day,
          year: item.year,
          month: item.month,
        };
      } else {
        return {
          ...item,
          isTodayDate: false,
        };
      }
    });
    setCurrentWeek(updatedData);
  };

  const memorizedDate = useMemo(
    () => (
      <CurrentWeekDays
        dateAble={currentWeek}
        onCalendarPress={() => {
          setShowStartDate(true);
        }}
        onSelectDate={(item: any, idx: any, data: any) => {
          onSelectDate_(item, idx, data);
          let date = item?.date + "-" + item?.month + "-" + item?.year;
          const formattedDate = moment(date, "DD-MMM-YYYY").format(
            "YYYY-MM-DD"
          );
          setDatePickFromCalender(formattedDate);
        }}
        selectedStartDate={selectedStartDate}
        setTodayDate={(date: any) => getConvertedDate(date)}
        selectedDate={selectedStartDate}
        mainContainer={{ height: moderateScale(90) }}
      />
    ),
    [currentWeek]
  );

  const memorizedTaskListsContainer = useMemo(
    () => (
      <TaskListsContainer
        morningTaskData={categorizedData}
        navigation={navigation}
        from={true}
        isSameDay={moment(selectedDate_).isSame(moment(), "day")}
        selectedDate={selectedDate_}
        setIsLoading={setIsLoading}
        callApiAgain={(val: any) => {
          setCallApiAgain(val?.callApiAgain);
          if (val?.response?.statusCode === 200) {
            setToasterDetails({
              showToast: true,
              code: 1,
              message: val?.response?.message,
            });
          } else {
            setToasterDetails({
              showToast: true,
              code: 0,
              message: strings?.somethingWrong,
            });
          }
        }}
        selectedTab={selectedTab}
        datePickFromCalender={selectedDate_}
        setHabitListData={(val: any) => setHabitListData(val)}
        // datePickFromCalender={datePickFromCalender}// inder's code
      />
    ),
    [categorizedData, selectedTab, datePickFromCalender, selectedDate_]
  );

  const renderHeader = () => {
    return (
      <View style={{ marginTop: moderateScale(15) }}>
        <CommonHeader
          headerName={"Your day, your way"}
          onBackPress={() => navigation?.goBack()}
          mainContainer={{
            marginHorizontal: moderateScale(19),
            height: moderateScale(50),
            alignItems: "center",
          }}
          iconContainer={{ backgroundColor: colors?.darkPrussianBlue }}
        />
      </View>
    );
  };

  const onSelectDate = (date: any) => {
    const selectedDate = moment(date.dateString);

    setSelectedStartDate(selectedDate);
    updateCurrentWeek(selectedDate);
    setDateChanged(true);
  };

  return (
    <ScreenWrapper statusBarColor={colors?.prussianBlue}>
      {renderHeader()}
      <View style={{ flex: 1 }}>
        {memorizedDate}
        {categorizedData.some(
          (category) =>
            (category.data && category.data.length > 0) || habitListData
        ) ? (
          <>
            <View style={style?.tabButtonsView}>
              <TouchableOpacity
                onPress={() => setSelectedTab(DailyRouteTab_ENUM?.ACTIVITIES)}
                style={
                  selectedTab == DailyRouteTab_ENUM?.ACTIVITIES
                    ? style?.selectedButtonView
                    : style?.unselectedButtonView
                }
              >
                <Text style={style?.buttonText}>{strings?.Activities}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedTab(DailyRouteTab_ENUM?.HABITS)}
                style={
                  selectedTab == DailyRouteTab_ENUM?.HABITS
                    ? style?.selectedButtonView
                    : style?.unselectedButtonView
                }
              >
                <Text style={style?.buttonText}>{strings?.Habits}</Text>
              </TouchableOpacity>
            </View>
            {memorizedTaskListsContainer}
          </>
        ) : (
          <View
            style={{
              marginTop: moderateScale(50),
              justifyContent: "center",
              alignItems: "center",
              height: moderateScale(150),
            }}
          >
            <Text
              style={{
                fontSize: textScale(18),
                fontWeight: "700",
                color: colors.SurfCrest,
              }}
            >
              {"No data found!"}
            </Text>
            <NoDataIcon style={{ marginTop: 10 }} />
          </View>
        )}
      </View>
      <CalendarComponent
        visibility={showStartDate}
        setShowCalender={setShowStartDate}
        onSelectDate={(val) => {
          setShowSelectedDateOnCalender(val?.dateString);
          onSelectDate(val);
        }}
        maxDate={moment().add(1, "year").format("DD-MMM-YYYY")}
        currentDate={moment(
          !!showSelectedDateOnCalender
            ? showSelectedDateOnCalender
            : moment().format("YYYY-MM-DD"),
          "YYYY-MM-DD"
        ).format("DD-MMM-YYYY")}
      />
      {isLoading && <CommonLoader />}
      {toasterDetails?.showToast && (
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

export default DailyRoutine;

const style = StyleSheet.create({
  tabButtonsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: moderateScale(14),
    marginTop: moderateScale(25),
    marginBottom: -moderateScale(10),
  },
  selectedButtonView: {
    borderWidth: moderateScale(1),
    borderColor: colors?.polishedPine,
    backgroundColor: colors?.polishedPine,
    flex: 1,
    marginHorizontal: moderateScale(7),
    alignItems: "center",
    borderRadius: moderateScale(25),
  },
  buttonText: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.SurfCrest,
    paddingVertical: moderateScale(10),
  },
  unselectedButtonView: {
    borderWidth: moderateScale(1),
    borderColor: colors?.SurfCrest,
    backgroundColor: colors?.transparent,
    flex: 1,
    marginHorizontal: moderateScale(7),
    alignItems: "center",
    borderRadius: moderateScale(25),
  },
});
