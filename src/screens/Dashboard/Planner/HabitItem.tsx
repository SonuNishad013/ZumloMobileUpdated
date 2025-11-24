import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import {
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import {
  DaysHabitTracking,
  Enum_HabitFrequancy_,
  Enum_HabitItemIsFrom,
  Enum_HabitStatus,
  HabitListOpenFrom_ENUM,
  habitStatus,
} from "../../../constant/ENUM";
import { imagePath } from "../../../assets/png/imagePath";
import allActions from "../../../redux/actions";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import { STATUS_CODES } from "../../../constant/appConstant";
import logger from "../../../constant/logger";
import { useDispatch } from "react-redux";
import CommonLoader from "../../../components/Loader";
import { PAGINATION } from "../../../utils/pagination";
import { CalendarIcon, NoDataIcon } from "../../../assets";
import { useFocusEffect } from "@react-navigation/native";
import { strings } from "../../../constant/strings";
import navigationString from "../../../navigation/navigationString";
import moment from "moment";
import { hh_mm_A } from "../../../constant/dateFormatConstants";
import CommonButton from "../../../components/Buttons/commonButton";
const Frequency_value = 1; // 1 means daily
interface Props {
  navigation: any;
  comeFrom?: string; // Optional prop to indicate where the component is used
  date: string; // Optional prop to pass date for pagination
  setIsLoader?: (val: boolean) => void | undefined;
  setHabitListData?: (val: any) => void | undefined;
  isFrom?: string;
}
interface CategoryType {
  name?: string;
  isCustom?: boolean;
}
const HabitItem: React.FC<Props> = ({
  navigation,
  comeFrom,
  date,
  setIsLoader,
  setHabitListData,
  isFrom = "",
}) => {
  const dispatch = useDispatch();
  const [habitList, setHabitList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [category, setCategory] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      if (comeFrom === HabitListOpenFrom_ENUM?.HOME) {
        getHabitAPICalling();
      } else {
        getHabitAPIPagination();
      }
    }, [date])
  );

  useFocusEffect(
    useCallback(() => {
      !category?.length && getHabitCategories();
    }, [])
  );

  const getHabitCategories = async () => {
    try {
      const response = await allActions?.HabitAction?.getHabitCategoriesAPI(
        "dispatch",
        API_FUN_NAMES?.getHabitCategories,
        ""
      );
      if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
        setCategory(response?.data);
      } else {
        setCategory([]);
      }
    } catch (error) {
      setCategory([]);
    }
  };

  const getHabitAPICalling = async () => {
    setIsLoading(true);
    if (setIsLoader) setIsLoader(true);
    try {
      let requestBody = {
        TargetDate: date,
        PageNumber: 1,
        PageSize: 1,
        Frequency: Frequency_value,
      };

      const response = await allActions.HabitAction.getHabitsDetailsAPI(
        dispatch,
        requestBody,
        API_FUN_NAMES?.GetHabitsDetails
      );
      setIsLoading(false);
      if (setIsLoader) setIsLoader(false);
      if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
        setHabitList(response?.data?.habitDetails);

        if (setHabitListData) setHabitListData(response?.data?.habitDetails);
      } else {
        setHabitList([]);
        if (setHabitListData) setHabitListData([]);
      }
    } catch (error) {
      setIsLoading(false);
      if (setIsLoader) setIsLoader(false);
      logger("Exception in Delete", error);
    }
  };
  const getHabitAPIPagination = async (page = 1) => {
    setIsLoading(page == 1 ? true : false); // Show loader only on first page
    if (setIsLoader) setIsLoader(page == 1 ? true : false);
    //If user coming from habit tracking progress list the in payload we are not sending the target date and frequency in payload only page number and pagesize .
    try {
      let requestBody =
        isFrom === Enum_HabitItemIsFrom?.HABITPROGRESS
          ? {
              PageNumber: page,
              PageSize: PAGINATION?.HABITS,
            }
          : {
              TargetDate: date,
              PageNumber: page,
              PageSize: PAGINATION?.HABITS,
              Frequency: Frequency_value,
            };
      logger("requestBody__", requestBody);
      const response = await allActions.HabitAction.getHabitsDetailsAPI(
        dispatch,
        requestBody,
        API_FUN_NAMES?.GetHabitsDetails,
        isFrom === Enum_HabitItemIsFrom?.HABITPROGRESS
      );
      setIsLoading(false);
      if (setIsLoader) setIsLoader(false);
      if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
        const newData = response?.data?.habitDetails ?? [];

        setTotalPages(
          Math.ceil(response?.data.totalRecords / PAGINATION?.HABITS)
        );

        if (page === 1) {
          setHabitList(newData);
          if (setHabitListData) setHabitListData(newData);
        } else {
          setHabitList((prev: any) => [...prev, ...newData]);
          if (setHabitListData)
            setHabitListData((prev: any) => [...prev, ...newData]);
        }

        setPageNumber(page);
      } else {
        setHabitList([]);
        if (setHabitListData) setHabitListData([]);
      }
    } catch (error) {
      setIsLoading(false);
      if (setIsLoader) setIsLoader(false);
      logger("Exception in Delete", error);
    }
  };

  const color = [
    colors?.backgroundTheme,
    colors?.royalOrangeDark,
    colors?.polishedPine,
  ];

  const renderItemHabits = (items: { item: any; index: number }) => {
    const freq = Enum_HabitFrequancy_[items?.item?.frequency];
    const days_: any[] = items?.item?.daysOfWeek;
    const frequencyDaysList: string[] = days_.map(
      (day) => DaysHabitTracking[day]
    );
    const habitHistory: any[] = items?.item?.habitTracking ?? [];
    const submittedOnSelectedDate = habitHistory.find((item) =>
      moment(item.createdDate).isSame(date, "day")
    );

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          if (
            [
              Enum_HabitItemIsFrom?.MYHABIT,
              Enum_HabitItemIsFrom?.DAILYROUTINE,
              Enum_HabitItemIsFrom?.HOME,
            ].includes(isFrom) &&
            !submittedOnSelectedDate
          ) {
            navigation?.navigate(navigationString?.HabitDetails, {
              HabitDetailData: items?.item,
              date,
            });
          }
          if (isFrom === Enum_HabitItemIsFrom?.HABITPROGRESS) {
            navigation?.navigate(navigationString?.HabitProgressDetail, {
              habitId: items?.item?.habitId,
            });
          }
        }}
        style={
          comeFrom == HabitListOpenFrom_ENUM?.HOME
            ? styles?.habitCardView
            : styles?.habitCardView_border
        }
      >
        <View style={styles?.centerView}>
          <Text style={styles?.habitTitle}>{items?.item?.name}</Text>
        </View>
        <Text style={[styles?.habitTitle, { fontWeight: "400" }]}>
          {"This habit is set to repeat:"}
        </Text>

        <Text style={styles?.newHEader}>{`Scheduled for:`}</Text>
        <View style={styles.freqencyTextIconConatiner}>
          <CalendarIcon width={moderateScale(15)} height={moderateScale(15)} />

          <Text
            style={[
              styles.daysText,
              {
                color: colors?.SurfCrest,
                marginLeft: moderateScale(5),
              },
            ]}
          >
            {freq}
          </Text>
        </View>
        <View style={styles?.durationView}>
          <FlatList
            scrollEnabled={false}
            bounces={false}
            data={frequencyDaysList}
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
                      styles.daysText,
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
        </View>
        <View style={styles?.centerViewWithTop}>
          <Text style={styles?.habitTime}>
            {"Goal: "}
            <Text
              style={styles?.timeCount}
            >{`${items?.item?.goal} Times`}</Text>
          </Text>
        </View>

        <View style={[styles?.flexRow, { marginTop: moderateScale(10) }]}>
          <Text style={styles?.reminderText}>{`Duration:`}</Text>
          <Text style={styles?.timeCount}>{" " + items?.item?.duration}</Text>
        </View>

        <View style={[styles?.flexRow, { marginTop: moderateScale(10) }]}>
          <Text style={styles?.reminderText}>{`Reminder: `}</Text>
          <Text style={styles?.timeCount}>{` ${moment(
            items?.item?.reminderTime,
            "hh:mm A"
          ).format(hh_mm_A)}`}</Text>
        </View>
        {isFrom !== Enum_HabitItemIsFrom?.HABITPROGRESS ? (
          <>
            {submittedOnSelectedDate ? (
              <View>
                <Text
                  style={{
                    color: colors?.SurfCrest,
                    marginTop: moderateScale(15),
                    marginBottom: moderateScale(10),
                  }}
                >
                  {submittedOnSelectedDate?.notes}
                </Text>
                <View
                  style={{
                    backgroundColor:
                      Enum_HabitStatus[submittedOnSelectedDate?.habitStatus] ===
                      "Skipped"
                        ? colors?.polishedPineOP3
                        : colors?.polishedPine,
                    alignItems: "center",
                    borderRadius: moderateScale(30),
                    padding: moderateScale(10),
                    alignSelf: "flex-end",
                  }}
                >
                  <Text
                    style={{
                      color: colors?.SurfCrest,
                      fontSize: textScale(10),
                      fontWeight: "400",
                      minWidth: moderateScale(150),
                      textAlign: "center",
                    }}
                  >
                    {Enum_HabitStatus[submittedOnSelectedDate?.habitStatus]}
                  </Text>
                </View>
              </View>
            ) : (
              <Text style={styles?.statusStyle}>
                {habitStatus[items?.item?.habitStatus - 1]}
              </Text>
            )}
          </>
        ) : null}
      </TouchableOpacity>
    );
  };

  const managePagination = () => {
    if (pageNumber < totalPages) {
      getHabitAPIPagination(pageNumber + 1);
    }
  };

  const renderEmptyList = () => {
    if (isFrom === Enum_HabitItemIsFrom?.MYHABIT) {
      return (
        <View style={styles?.myhabitEmptyListContainer}>
          <Text style={styles?.myHabitUpperText}>
            {"Your habit routine starts\nwith action"}
          </Text>
          <Text style={styles?.myHabitlowerText}>
            {
              "Build something small and meaningful. Add a habit that supports the life you want—\none day at a time."
            }
          </Text>
          <Image
            style={{ marginTop: moderateScale(50) }}
            source={imagePath?.AddHabit}
          />
        </View>
      );
    } else if (isFrom === Enum_HabitItemIsFrom?.DAILYROUTINE) {
      return (
        <View style={styles?.dailyRoutineEmptyListContainer}>
          <NoDataIcon height={moderateScale(120)} width={moderateScale(120)} />
          <Text style={styles?.dailyRoutineEmptyText}>
            {/* {strings?.No_habit_found} */}
            {"Your habit list is empty"}
          </Text>
          <Text
            style={{
              fontSize: textScale(12),
              fontWeight: "500",
              color: colors?.SurfCrest,
              textAlign: "center",
              paddingHorizontal: moderateScale(20),
            }}
          >
            {/* {strings?.No_habit_found} */}
            {
              "Build routines that motivate, strengthen, and inspire you. Start adding habits today."
            }
          </Text>
          <CommonButton
            onPress={() => {
              category?.length &&
                navigation?.navigate(navigationString?.AddHabitForm, {
                  categoryList: category
                    .map((item: CategoryType) => {
                      return { ...item, title: item?.name, value: item?.name };
                    })
                    .concat([{ title: "Other", value: "Other" }]), //Dropdown list need title key and from API response we are not getting that key, So here we are appending the data and addining a new key other as well.
                });
            }}
            btnName={"Create habit"}
            mainContainer={{
              width: "auto",
              marginTop: moderateScale(35),
              backgroundColor: colors?.polishedPine,
            }}
          />
        </View>
      );
    } else {
      return <View />;
    }
  };
  return (
    <View style={styles?.mainContainer}>
      {habitList?.length && isFrom === Enum_HabitItemIsFrom?.MYHABIT ? (
        <>
          <Text style={styles.habitGlanceText}>
            {"Your habits at a glance"}
          </Text>
          <Text style={styles.habitGlanceSubText}>
            {
              "Stay consistent. These habits are here to support your goals—track your progress and keep going."
            }
          </Text>
        </>
      ) : null}

      <FlatList
        keyExtractor={(item: any) => item?.habitId.toString()}
        data={habitList}
        renderItem={renderItemHabits}
        style={
          comeFrom == HabitListOpenFrom_ENUM?.HOME ? null : styles?.paddingSpace
        }
        onEndReached={() => managePagination()}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={renderEmptyList}
      />

      {isLoading && <CommonLoader />}
    </View>
  );
};

export default HabitItem;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  habitCardView: {
    backgroundColor: colors?.prussianBlue,
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
    marginBottom: moderateScale(10),
  },
  habitCardView_border: {
    backgroundColor: colors?.prussianBlue,
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
    marginBottom: moderateScale(10),
    borderWidth: moderateScale(1),
    borderColor: colors?.SurfCrest,
  },
  paddingSpace: {
    marginHorizontal: moderateScale(20),
  },
  centerView: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  centerViewWithTop: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: moderateScale(10),
  },
  habitTitle: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(14),
    fontWeight: "600",
    maxWidth: width - moderateScale(200),
    marginBottom: moderateScale(10),
  },
  durationView: {
    flexDirection: "row",
  },
  durationType: {
    backgroundColor: colors?.SaltBox,
    alignSelf: "flex-start",
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(20),
    flexDirection: "row",
    alignItems: "center",
    height: moderateScale(25),
    marginTop: moderateScale(5),
  },
  calenderImage: {
    height: moderateScale(17),
    width: moderateScale(17),
    resizeMode: "contain",
    marginRight: moderateScale(5),
  },
  clockImageStyle: {
    height: moderateScale(25),
    width: moderateScale(25),
    resizeMode: "contain",
    marginLeft: moderateScale(5),
  },
  durationText: {
    color: colors?.SurfCrest,
    fontWeight: "600",
    fontSize: moderateScale(11),
  },
  durationDay: {
    backgroundColor: colors?.SaltBox,
    alignSelf: "flex-start",
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(20),
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    height: moderateScale(25),
    marginLeft: moderateScale(5),
    marginTop: moderateScale(5),
  },
  habitTime: {
    color: colors?.royalOrangeDark,

    fontSize: moderateScale(11),
    fontWeight: "700",
  },
  durationTime: {
    color: colors?.royalOrangeDark,
    fontSize: moderateScale(11),
    fontWeight: "700",
    textAlign: "center",
  },
  timeCount: {
    color: colors?.SurfCrest,
    fontWeight: "400",
    fontSize: moderateScale(11),
    textAlign: "right",
  },
  statusStyle: {
    marginTop: moderateScale(10),

    backgroundColor: colors?.buttonHabit,
    color: colors?.SurfCrest,
    alignSelf: "flex-start",
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(15),
    fontSize: moderateScale(12),
    fontWeight: "500",
    overflow: "hidden",
  },

  flexRow: {
    flexDirection: "row",
  },
  reminderText: {
    color: colors?.royalOrangeDark,
    fontSize: moderateScale(11),
    fontWeight: "700",
    textAlign: "right",
  },
  newHEader: {
    color: colors?.royalOrangeDark,
    fontSize: moderateScale(11),
    fontWeight: "700",
    textAlign: "left",
    marginBottom: moderateScale(10),
  },
  headerStyleText: {
    fontSize: textScale(14),
    fontWeight: "700",
    color: colors.prussianBlue,
    marginBottom: moderateScale(30),
  },
  noDataFoundView: {
    flex: 1,

    paddingHorizontal: moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
  },
  daysContainer: {
    gap: moderateScale(8),
    marginBottom: moderateScale(8),
  },
  daysBox: {
    paddingHorizontal: moderateScale(10),
    flexDirection: "row",
    gap: 5,
    borderRadius: moderateScale(15),
    paddingVertical: moderateScale(2),
    alignItems: "center",
  },
  daysText: {
    fontSize: textScale(10),
    fontWeight: "600",
  },
  myhabitEmptyListContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: moderateScale(10),
    marginTop: moderateScale(70),
  },
  myHabitUpperText: {
    color: "rgba(109, 89, 122, 1)",
    fontSize: textScale(24),
    fontWeight: "500",
    textAlign: "center",
  },
  myHabitlowerText: {
    color: "rgba(4, 58, 78, 1)",
    fontSize: textScale(14),
    fontWeight: "500",
    textAlign: "center",
    marginTop: moderateScale(10),
  },
  dailyRoutineEmptyListContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: moderateScale(10),
    marginTop: moderateScale(100),
  },
  dailyRoutineEmptyText: {
    fontSize: textScale(15),
    fontWeight: "500",
    color: colors?.SurfCrest,
  },
  habitGlanceText: {
    marginHorizontal: moderateScale(20),
    fontSize: moderateScale(20),
    color: colors?.prussianBlue,
    fontWeight: "600",
    marginTop: moderateScale(10),
  },
  habitGlanceSubText: {
    marginHorizontal: moderateScale(20),
    fontSize: moderateScale(14),
    color: colors?.prussianBlue,
    fontWeight: "400",
    marginTop: moderateScale(10),
    marginBottom: moderateScale(40),
    fontStyle: "italic",
  },
  freqencyTextIconConatiner: {
    backgroundColor: colors?.polishedPine,
    paddingHorizontal: moderateScale(15),
    flexDirection: "row",
    borderRadius: moderateScale(15),
    paddingVertical: moderateScale(2),
    alignItems: "center",
    marginBottom: moderateScale(10),
    justifyContent: "center",
    alignSelf: "flex-start",
  },
});
