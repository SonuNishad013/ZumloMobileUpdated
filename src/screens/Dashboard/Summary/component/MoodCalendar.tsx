import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import moment from "moment";
import { moderateScale } from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";
import { DropdownPP } from "../../../../assets";
import { dummyJournals } from "../data";
import {
  Enum_JournalType,
  Enum_QuestionSourceType,
} from "../../../../constant/ENUM";
import logger from "../../../../constant/logger";

interface MoodProps {
  setShowCalender: (val: boolean) => void;
  onSelectDate: (val: any) => void;
  showOuterButtons?: boolean;
  journalType?: string;
  setJournalType?: (val: string) => void;
  list: any[];
  updateMonthOrYear?: any;
}
const MoodCalendar: React.FC<MoodProps> = ({
  setShowCalender,
  onSelectDate,
  showOuterButtons = true,
  journalType,
  setJournalType,
  list,
  updateMonthOrYear,
}) => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [showPicker, setShowPicker] = useState(false);
  const [calenderSelectedDates, setCalenderSelectedDates] = useState<any[]>([]);
  const moodDates = calenderSelectedDates.map((m: any) =>
    moment(m.date, "YYYY-MM-DDTHH:mm:ss.SSSSSSS").format("YYYY-MM-DD")
  );

  useEffect(() => {
    filterDates(Enum_JournalType?.ALL);
  }, [list]);

  const generateDays = () => {
    const startOfMonth = currentDate.clone().startOf("month");
    const endOfMonth = currentDate.clone().endOf("month");
    const startDate = startOfMonth.clone().startOf("isoWeek");
    const endDate = endOfMonth.clone().endOf("isoWeek");

    const day = startDate.clone().subtract(1, "day");
    const calendar = [];

    while (day.isBefore(endDate, "day")) {
      calendar.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, "day").clone())
      );
    }

    return calendar;
  };

  const handleMonthChange = (itemValue: any) => {
    let date = currentDate.clone().month(itemValue).format("YYYY-MM-DD");
    setCurrentDate(currentDate.clone().month(itemValue));
    updateMonthOrYear(date);
  };

  const handleYearChange = (itemValue: any) => {
    let year = currentDate.clone().year(itemValue).format("YYYY-MM-DD");
    setCurrentDate(currentDate.clone().year(itemValue));
    updateMonthOrYear(year);
  };

  const calendar = generateDays();

  const filterDates = (item: any) => {
    const list_: any[] = list;

    if (item === Enum_JournalType?.ALL) {
      setCalenderSelectedDates(list_);
    } else if (item === Enum_JournalType?.AI) {
      const AiJournals = list_.filter(
        (item: any) =>
          item?.questionSourceType === Enum_QuestionSourceType?.AiGenerated
      );
      setCalenderSelectedDates(AiJournals);
    } else if (item === Enum_JournalType?.CUSTOM) {
      const manualJournals = list_.filter(
        (item: any) =>
          item?.questionSourceType === Enum_QuestionSourceType?.Manual
      );
      setCalenderSelectedDates(manualJournals);
    }
    setJournalType && setJournalType(item);
  };

  return (
    <View>
      {showOuterButtons && (
        <View style={styles?.outerButtonContainer}>
          {[
            Enum_JournalType?.ALL,
            Enum_JournalType?.AI,
            Enum_JournalType?.CUSTOM,
          ].map((item: any) => {
            return (
              <TouchableOpacity
                style={[
                  styles?.outerButtonStyle,
                  {
                    backgroundColor:
                      journalType === item
                        ? colors?.royalOrangeDark
                        : colors.transparent,
                    borderColor:
                      journalType === item
                        ? colors?.transparent
                        : colors.SurfCrest,
                  },
                ]}
                onPress={() => filterDates(item)}
              >
                <Text
                  style={[
                    styles?.outerButtonText,
                    {
                      color:
                        journalType === item
                          ? colors?.prussianBlue
                          : colors.SurfCrest,
                    },
                  ]}
                >
                  {item === "All"
                    ? "All entries"
                    : item == "AI"
                    ? "Guided"
                    : "Freestyle"}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
      <View style={styles.container}>
        {showPicker && (
          <View style={styles.pickerRow}>
            <Picker
              selectedValue={currentDate.month()}
              style={styles.picker}
              onValueChange={handleMonthChange}
            >
              {moment.months().map((month, index) => (
                <Picker.Item key={index} label={month} value={index} />
              ))}
            </Picker>

            <Picker
              selectedValue={currentDate.year()}
              style={styles.picker}
              onValueChange={handleYearChange}
            >
              {[...Array(10).keys()].map((i) => {
                const year = moment().year() - 5 + i;
                return (
                  <Picker.Item key={year} label={`${year}`} value={year} />
                );
              })}
            </Picker>
          </View>
        )}
        <TouchableOpacity
          onPress={() => setShowPicker(!showPicker)}
          style={{
            padding: 8,
            flexDirection: "row",
            gap: moderateScale(4),
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>
            {moment(currentDate).format("MMMM,YYYY")}
          </Text>
          <View
            style={{ transform: [{ rotate: showPicker ? "180deg" : "0deg" }] }}
          >
            <DropdownPP />
          </View>
        </TouchableOpacity>
        <View style={styles.weekRow}>
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
            <Text key={day} style={styles.weekDay}>
              {day}
            </Text>
          ))}
        </View>

        {calendar.map((week, i) => (
          <View key={i} style={styles.weekRow}>
            {week.map((day) => {
              const formatted = day.format("YYYY-MM-DD");
              const isCurrentMonth = day.month() === currentDate.month();
              const hasMood = moodDates.includes(formatted);

              return (
                <TouchableOpacity
                  key={formatted}
                  style={[
                    styles.day,
                    {
                      backgroundColor: hasMood
                        ? colors?.SurfCrest
                        : "transparent",
                      opacity: isCurrentMonth ? 1 : 0.3,
                    },
                  ]}
                  onPress={() => {
                    if (!isCurrentMonth) {
                      handleMonthChange(day.month());
                    }
                    onSelectDate({ dateString: day.format("YYYY-MM-DD") });
                    setShowCalender(false);
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontWeight: hasMood ? "bold" : "600",
                    }}
                  >
                    {day.date()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors?.polishedPine,
    borderRadius: moderateScale(16),
  },
  pickerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  picker: {
    flex: 1,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 4,
  },
  weekDay: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  day: {
    flex: 1,
    margin: 2,
    padding: 10,
    alignItems: "center",
    borderRadius: 25,
  },
  outerButtonContainer: {
    width: "100%",
    flexDirection: "row",
    gap: moderateScale(10),
    marginBottom: moderateScale(9),
  },
  outerButtonStyle: {
    minWidth: moderateScale(60),
    borderRadius: moderateScale(30),
    justifyContent: "center",
    alignItems: "center",
    padding: moderateScale(5),
    borderWidth: 1,
    borderColor: colors?.SurfCrest,
    paddingHorizontal: moderateScale(19),
  },
  outerButtonText: { color: colors?.SurfCrest },
});

export default MoodCalendar;
