import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import Picker from "react-native-animated-wheel-picker";
import TimePicker from "../../UserGoals/zUserGoalscomponents/timePicker";

interface Props {
  navigation?: any;
  setBtnState?: any;
}
const DateTimePickerInput: React.FC<Props> = ({ navigation, setBtnState }) => {
  const year = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i <= 2100; i++) {
    year.push({ title: `${i}`, value: i });
  }
  const DATA1 = year;
  const DATA2 = [
    { title: "Jan", value: 1 },
    { title: "Feb", value: 2 },
    { title: "Mar", value: 3 },
    { title: "Apr", value: 4 },
    { title: "May", value: 5 },
    { title: "Jun", value: 6 },
    { title: "Jul", value: 7 },
    { title: "Aug", value: 8 },
    { title: "Sep", value: 9 },
    { title: "Oct", value: 10 },
    { title: "Nov", value: 11 },
    { title: "Dec", value: 12 },
  ];
  const day = [];
  for (let i = 1; i <= 31; i++) {
    day.push({ title: `${i}`, value: i });
  }
  const DATA3 = day;
  const minutes = [];
  for (let i = 1; i <= 60; i++) {
    minutes.push({ title: `${i}`, value: i });
  }
  const DATA6 = minutes;
  const DATA4 = [
    { title: "01", value: 1 },
    { title: "02", value: 2 },
    { title: "03", value: 3 },
    { title: "04", value: 4 },
    { title: "05", value: 5 },
    { title: "06", value: 6 },
    { title: "07", value: 7 },
    { title: "08", value: 8 },
    { title: "09", value: 9 },
    { title: "10", value: 10 },
    { title: "11", value: 11 },
    { title: "12", value: 12 },
  ];
  const DATA5 = [
    { title: "AM", value: 1 },
    { title: "PM", value: 2 },
  ];
  const DATAS = [DATA4, DATA6, DATA5];
  const DATADAY = [DATA1, DATA2, DATA3];

  const [time, setTime] = useState<any>({
    day: null,
    month: null,
    year: null,
    hours: null,
    minutes: null,
    pahar: null,
  });
  console.log(time, "time");

  useEffect(() => {
    setBtnState(time);
  }, [time]);
  return (
    <View>
      <View style={style?.TimePickerMainContainer}>
        <Text style={style?.selectDateTxt}>{"Select date and time"}</Text>
        <View style={style?.valPickerContainer}>
          <View style={style?.timePickerContainer}>
            {DATADAY?.map((item, index) => {
              return (
                <View>
                  {/* <TouchableOpacity onPress={() => onBtn()}>
                    <Text>ok</Text>
                  </TouchableOpacity> */}
                  <TimePicker
                    pickerData={item}
                    title={index === 0 ? "Year" : index === 1 ? "Month" : "Day"}
                    onSelected={(item: any) => {
                      console.log(index, item);
                      if (index === 0) {
                        setTime({ ...time, year: item?.title });
                        return;
                      }
                      if (index === 1) {
                        setTime({ ...time, month: item?.title });
                        return;
                      }
                      if (index === 2) {
                        setTime({ ...time, day: item?.title });
                        return;
                      }
                    }}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </View>

      <View
        style={{
          height: moderateScale(80),
          backgroundColor: colors?.SaltBox,
          borderRadius: moderateScale(15),
          marginTop: moderateScale(7),
          marginHorizontal: moderateScale(19.5),
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: moderateScale(21),
        }}
      >
        <View style={{ justifyContent: "center" }}>
          <Text
            style={{
              color: colors?.SurfCrest,
              fontSize: textScale(14),
              fontWeight: "600",
            }}
          >
            {"Time:"}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            height: moderateScale(80),
            width: moderateScale(130),
          }}
        >
          {DATAS.map((item, index) => {
            return (
              <Picker
                pickerData={item}
                textStyle={{ fontSize: textScale(14), fontWeight: "600" }}
                onSelected={(item) => {
                  console.log(index, item);
                  if (index === 0) {
                    setTime({ ...time, hours: item?.title });
                    return;
                  }
                  if (index === 1) {
                    setTime({ ...time, minutes: item?.title });
                    return;
                  }
                  if (index === 2) {
                    setTime({ ...time, pahar: item?.title });
                    return;
                  }
                }}
                itemHeight={moderateScale(20)}
                visible={3}
                style={{ paddingBottom: moderateScale(10), zIndex: 1 }}
                contentContainerStyle={{
                  width: moderateScale(30),
                }}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default DateTimePickerInput;

const style = StyleSheet.create({
  TimePickerMainContainer: {
    marginHorizontal: moderateScale(19.5),
    marginTop: moderateScale(35),
  },
  TimePickerMainContainer2: {
    marginHorizontal: moderateScale(19.5),
    alignSelf: "center",
    marginTop: moderateScale(10),
  },

  timePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  selectDateTxt: {
    fontSize: textScale(14),
    color: colors?.prussianBlue,
    fontWeight: "600",
  },

  valPickerContainer: {
    height: moderateScale(261.4),
    backgroundColor: colors?.SaltBox,
    borderRadius: moderateScale(15),
    justifyContent: "center",
    marginTop: moderateScale(7),
    padding: 20,
  },
});
