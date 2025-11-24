import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { ReactElement, useMemo, useState } from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { BtmDropdownIcon } from "../../../assets";
import moment from "moment";

interface Props {
  dateAble?: any;
  onCalendarPress?: () => void;
  onSelectDate?: any;
  selectedDate?: any;
  mainContainer?: ViewStyle;
  weekContainer?: ViewStyle;
  setTodayDate?: any;
  selectedStartDate?: any;
}

const CurrentWeekDays: React.FC<Props> = ({
  dateAble,
  onCalendarPress,
  onSelectDate,
  selectedDate,
  mainContainer,
  weekContainer,
  setTodayDate,
  selectedStartDate,
}): ReactElement => {
  const todayDateObject = dateAble.find((item: any) => item.isTodayDate);

  console.log("todayDateObject", todayDateObject);

  // Use useMemo to compute formattedDate only when todayDateObject changes
  const formattedDate = useMemo(() => {
    if (todayDateObject) {
      return moment(
        `${todayDateObject.year}-${todayDateObject.month}-${todayDateObject.date}`,
        "YYYY-MMM-DD"
      ).format("YYYY-MM-DD");
    }
    return null; // Fallback if todayDateObject is not found
  }, [todayDateObject]);

  const [curentSelectedDate, setcurentSelectedDate] = useState(formattedDate);

  // Update curentSelectedDate when formattedDate changes
  React.useEffect(() => {
    if (formattedDate) {
      setcurentSelectedDate(formattedDate);
    }
  }, [formattedDate]);

  const renderDays = (itm: any, idx: number, year: any, time: any) => {
    setTodayDate(itm.isTodayDate && itm);
    return (
      <TouchableOpacity
        style={[
          styles.dayContainer,
          {
            backgroundColor: itm.isTodayDate
              ? colors?.royalOrange
              : colors?.SurfCrest,
          },
        ]}
        onPress={() => {
          onSelectDate(itm, idx, dateAble, time);
        }}
      >
        <Text style={styles.dayText}>{itm?.day}</Text>
        <Text style={styles.dateText}>{itm?.date}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[{ marginHorizontal: moderateScale(15) }, mainContainer]}>
      <View style={styles.headerContainer}>
        <View style={styles?.lineStyle} />
        <View>
          <TouchableOpacity
            style={styles.monthDropdown}
            onPress={onCalendarPress}
          >
            <Text style={styles.monthText}>
              {moment(curentSelectedDate).format("MMMM, YYYY")}
            </Text>
            <BtmDropdownIcon />
          </TouchableOpacity>
        </View>
        <View style={styles?.lineStyle} />
      </View>

      <View style={[styles?.weekContainer, weekContainer]}>
        <FlatList
          data={dateAble}
          keyExtractor={(item, index) => "key" + index}
          horizontal
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item, index }) =>
            renderDays(
              item,
              index,
              moment(selectedStartDate).format("YYYY"),
              moment(selectedStartDate).format("HH")
            )
          }
        />
      </View>
    </View>
  );
};

export default CurrentWeekDays;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  monthDropdown: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: moderateScale(15),
  },
  monthText: {
    width: "auto",
    textAlign: "center",
    color: colors?.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "400",
    marginRight: moderateScale(10),
  },
  dayContainer: {
    height: moderateScale(55),
    width: moderateScale(40),
    borderRadius: moderateScale(36),
    paddingVertical: moderateScale(15),
    justifyContent: "space-between",
    alignItems: "center",
  },
  dayText: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors?.prussianBlue,
  },
  dateText: {
    fontSize: textScale(14),
    fontWeight: "500",
    color: colors?.prussianBlue,
  },
  separator: {
    marginLeft: moderateScale(10),
  },

  lineStyle: {
    flex: 1,
    height: moderateScale(0.5),
    backgroundColor: colors?.SurfCrest,
  },

  weekContainer: { flex: 1, alignSelf: "center", marginTop: moderateScale(15) },
});
