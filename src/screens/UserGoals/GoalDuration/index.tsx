import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useMemo, useState } from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import {
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import TimePicker from "../zUserGoalscomponents/timePicker";
import SelectDuration from "./SelectDuration";
import Header from "../zUserGoalscomponents/Header";
import BtmBtn from "../zUserGoalscomponents/BtmBtn";
import { style } from "./style";
import navigationString from "../../../navigation/navigationString";

interface Props {
  navigation?: any;
}
interface DateState {
  day: string | null;
  month: string | null;
  year: string | null;
}

const GoalDuration: React.FC<Props> = ({ navigation }) => {
  const [date, setDate] = useState<DateState>({
    day: null,
    month: null,
    year: null,
  });

  const renderDatePicker = () => {
    const year = [];
    for (let i = 2000; i <= 2030; i++) {
      year.push({ title: `${i}`, value: i });
    }
    const DATA1 = year;
    const DATA2 = [
      { title: "Jan", value: 1 },
      { title: "Feb", value: 2 },
      { title: "Mar", value: 3 },
      { title: "Apr", value: 1 },
      { title: "May", value: 2 },
      { title: "Jun", value: 3 },
      { title: "Jul", value: 1 },
      { title: "Aug", value: 2 },
      { title: "Sep", value: 3 },
      { title: "Oct", value: 1 },
      { title: "Nov", value: 2 },
      { title: "Dec", value: 3 },
    ];
    const day = [];
    for (let i = 1; i <= 31; i++) {
      day.push({ title: `${i}`, value: i });
    }
    const DATA3 = day;
    console.log(date);
    return (
      <View style={style?.TimePickerMainContainer}>
        <Text style={style?.selectDateTxt}>{"Select Start Date"}</Text>
        <View style={style?.valPickerContainer}>
          <View style={style?.timePickerContainer}>
            <TimePicker
              pickerData={DATA1}
              title={"Year"}
              onSelected={(item: any) =>
                setDate({ ...date, year: item?.title })
              }
            />
            <TimePicker
              pickerData={DATA2}
              title={"Month"}
              onSelected={(item: any) =>
                setDate({ ...date, month: item?.title })
              }
            />
            <TimePicker
              pickerData={DATA3}
              title={"Day"}
              onSelected={(item: any) => setDate({ ...date, day: item?.title })}
            />
          </View>
        </View>
      </View>
    );
  };
  const [minValue, setMinValue] = useState<number>(0);

  const memorizedDurationMin = useMemo(
    () => (
      <SelectDuration
        value={minValue}
        onValueChange={(duration: number) => setMinValue(duration)}
        Duration={minValue}
      />
    ),
    [minValue]
  );

  return (
    <ScreenWrapper statusBarColor={colors?.prussianBlue}>
      <View style={{ backgroundColor: colors?.SurfCrest, flex: 1 }}>
        <Header headerName={"Goal Duration"} navigation={navigation} />
        <FlatList
          data={["1"]}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => "key" + index}
          renderItem={() => {
            return (
              <View
                style={{
                  marginHorizontal: moderateScale(19.5),
                }}
              >
                {memorizedDurationMin}
                {renderDatePicker()}
              </View>
            );
          }}
          contentContainerStyle={style?.flatBtm}
        />
        <BtmBtn
          btnName={"SUBMIT"}
          onPress={() =>
            navigation?.navigate(navigationString?.SetIntensitySpeed)
          }
        />
      </View>
    </ScreenWrapper>
  );
};

export default GoalDuration;
