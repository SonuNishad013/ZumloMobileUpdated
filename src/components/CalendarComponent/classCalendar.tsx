import React, { useEffect, useRef, useState } from "react";

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import moment from "moment";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { fullMonths } from "../../utils/appCommonFunctions";
import {
  moderateScale,
  textScale,
  width,
} from "../../constant/responsiveStyle";
import { ForwordArrow } from "../../assets";
import colors from "../../constant/colors";
import { YYYY_MM_DD } from "../../constant/dateFormatConstants";

const LeftArrow = () => {
  return (
    <View
      style={{
        transform: [{ rotate: "90deg" }],
        paddingHorizontal: moderateScale(5),
      }}
    >
      <ForwordArrow
        height={`${moderateScale(15)}`}
        width={`${moderateScale(15)}`}
      />
    </View>
  );
};

const RightArrow = () => {
  return (
    <View
      style={{
        transform: [{ rotate: "270deg" }],
        paddingHorizontal: moderateScale(5),
      }}
    >
      <ForwordArrow
        height={`${moderateScale(15)}`}
        width={`${moderateScale(15)}`}
      />
    </View>
  );
};
export const CalendarWithList = (props: any) => {
  const [currentYear] = useState(Number(new Date().getFullYear()));

  const [state, setState] = useState({
    month: undefined,
    yearListVisible: false,
    current: props.current,
    changedDate: props.current,
    changedMonth: "",
    initYear: props?.minDate
      ? new Date(props?.minDate).getFullYear() - 1
      : 1899,
    maxDate: props?.maxDate ? props?.maxDate : "31-Dec-2099",
  });
  console.log("minDate", props?.minDate, state.initYear, props);
  const { yearListVisible, current }: any = state;

  const [reqIndex, setReqIndex] = useState(0);

  const years = Array(currentYear - state?.initYear + 200)
    .fill()
    .map((v, i) => i + 1);

  const calendarRef: any = React.useRef();

  useEffect(() => {
    props?.setStoreRef(calendarRef);
  }, [calendarRef]);

  const flatListRef: any = useRef();
  LocaleConfig.locales["fr"] = {
    monthNames: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    monthNamesShort: [
      "Jan",
      "Feb.",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    dayNames: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    dayNamesShort: ["S", "M", "T", "W", "T", "F", "S"],
    today: "Aujourd'hui",
  };
  LocaleConfig.defaultLocale = "fr";
  const getIndexForScroll = () => {
    try {
      const reqIndex = years?.findIndex(
        (data: any) =>
          new Date(state.current).getFullYear() == data + state.initYear
      );
      console.log({ reqIndex });
      setReqIndex(reqIndex);
    } catch (error) {}
  };

  useEffect(() => {
    if (yearListVisible) getIndexForScroll();
  }, [yearListVisible, current]);

  useEffect(() => {
    let timeout = setTimeout(() => {
      console.log("Scrolled");
      flatListRef?.current?.scrollToIndex({ index: reqIndex });
    }, 800);
    return () => clearTimeout(timeout);
  }, [reqIndex]);

  const renderYear = ({ item }: any) => {
    const year = state?.initYear + item;
    if (year <= new Date(state.maxDate).getFullYear()) {
      return (
        <TouchableOpacity
          onPress={() => onSelectYear(year)}
          style={{
            alignItems: "center",
            backgroundColor: "white",
            paddingVertical: moderateScale(10),
          }}
        >
          <Text style={{ fontSize: textScale(14), color: colors.darkBlack }}>
            {year}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const onPressYear = (month: any) => {
    const current = month;
    setState({
      ...state,
      yearListVisible: true,
      month,
      current,
      changedDate: current,
    });
  };

  const onPressHeader = () => {
    setState({
      ...state,
      yearListVisible: false,
    });
  };

  const onSelectYear = (year: any) => {
    setState((state: any) => {
      let month = state?.month;
      console.log("month", month);
      console.log("year", year);
      month = new Date(month).setFullYear(year);
      const current = moment(month).format("DD-MMM-YYYY");
      console.log("onSelectYear", { current });
      !!props?.onMonthChange &&
        props?.onMonthChange({
          date: moment(month).format(YYYY_MM_DD),
          year: moment(month).format("YYYY"),
          month: moment(month).month() + 1,
        });
      return {
        ...state,
        yearListVisible: false,
        current: new Date(current),
        changedDate: new Date(current),
      };
    });
  };

  return yearListVisible ? (
    <View style={[props.style, { width: width - 100 }]}>
      <View style={{ paddingVertical: moderateScale(10) }}>
        <TouchableOpacity
          onPress={onPressHeader}
          style={{ alignItems: "center" }}
        >
          <Text style={styles.selectedYearTxt}>
            {`${new Date(state.current).getFullYear()}`}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.reverFlStyle}
        data={years}
        renderItem={renderYear}
        showsVerticalScrollIndicator={false}
        ref={flatListRef}
        initialScrollIndex={props?.activeIndex}
        keyExtractor={(item, index) => "key" + index}
        onScrollToIndexFailed={() => {
          const wait = new Promise((resolve) => setTimeout(resolve, 500));
          wait.then(() => {
            flatListRef.current?.scrollToIndex?.({
              index: reqIndex,
              animated: true,
            });
          });
        }}
      />
    </View>
  ) : (
    <View style={{ width: width - moderateScale(50) }}>
      <Calendar
        {...props}
        current={state.current}
        onMonthChange={(date: any) => {
          setState({
            ...state,
            changedDate: date.dateString,
          });
          props?.onMonthChange?.(date);
        }}
        renderHeader={(date: any) => {
          return (
            <TouchableOpacity onPress={() => onPressYear(state?.current)}>
              <Text style={styles.dateTxtStyles}>{`${
                fullMonths[date?.getMonth()]
              }, ${date?.getUTCFullYear()}`}</Text>
            </TouchableOpacity>
          );
        }}
        renderArrow={(direction: any) =>
          direction == "left" ? <LeftArrow /> : <RightArrow />
        }
        markedDates={props?.markedDates}
        theme={{
          textDayFontSize: textScale(12),
          textDayFontWeight: "600",
          textDayHeaderFontSize: textScale(10),
          textSectionTitleColor: colors?.themeColor,
          dayTextColor: colors?.darkBlack,
          textDayHeaderFontWeight: "700",
          arrowColor: colors?.themeColor,
        }}
        disableAllTouchEventsForDisabledDays={
          props?.disableAllTouchEventsForDisabledDays
        }
        ref={calendarRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  selectedYearTxt: {
    fontSize: textScale(17),
    fontWeight: "600",
    color: colors.SurfCrest,
  },
  reverFlStyle: {
    marginTop: moderateScale(20),
    maxHeight: moderateScale(270),
  },
  dateTxtStyles: {
    fontSize: textScale(16),
    fontWeight: "600",
    color: colors.darkBlack,
  },
});
