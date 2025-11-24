import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import React, { ReactElement, useState } from "react";
import colors from "../../../../constant/colors";
import CommonButton from "../../../../components/Buttons/commonButton";
import { strings } from "../../../../constant/strings";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import CommonHeader from "../../../../components/Header/commonHeader";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import DatePicker from "react-native-date-picker";
import CommonInput from "../../../../components/Inputs/commonInput";
import { CounterMinus, CounterPlus } from "../../../../assets";
import { calenderModeENUM } from "../../../../constant/ENUM";
interface Props {
  navigation?: any;
}

const AddManualReading: React.FC<Props> = ({ navigation }): ReactElement => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [timeOpen, setTimeOpen] = useState(false);

  const [count, setCount] = useState(0);

  const incrementCounter = () => {
    setCount(count + 1);
  };

  const decrementCounter = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const Header = () => (
    <View>
      <CommonHeader headerName={strings?.headerAddVital} />
    </View>
  );

  const Button = () => (
    <View style={styles.button}>
      <CommonButton btnName={strings?.submit} />
    </View>
  );

  const DeviceStatus = () => (
    <View style={styles.OuterView}>
      <View style={styles.DeviceStatusView}>
        <View>
          <Text style={styles.Bptext}>{strings.Bp}</Text>
          <Text style={styles.DeviceStatustext}>{strings?.DeviceStatus}</Text>
        </View>
      </View>
    </View>
  );

  const DateTimePicker = () => (
    <View style={styles.OuterView}>
      <Text style={styles.SelectDateTimeText}>{strings?.selectDateTime}</Text>
      <View style={styles.DateTimeView}>
        {/* Date Picker */}
        <GestureHandlerRootView>
          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={styles.DateTimeOuterView}
          >
            <Text>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>
        </GestureHandlerRootView>
        <DatePicker
          modal
          open={open}
          date={date}
          mode={calenderModeENUM?.date}
          onConfirm={(date) => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />

        <GestureHandlerRootView>
          <TouchableOpacity
            onPress={() => setTimeOpen(true)}
            style={[
              styles.DateTimeOuterView,
              { marginLeft: moderateScale(20) },
            ]}
          >
            <Text>{time.toLocaleDateString()}</Text>
          </TouchableOpacity>
        </GestureHandlerRootView>
        <DatePicker
          modal
          open={timeOpen}
          date={time}
          mode={calenderModeENUM?.time}
          onConfirm={(time) => {
            setTimeOpen(false);
            setTime(time);
          }}
          onCancel={() => {
            setTimeOpen(false);
          }}
        />
      </View>
    </View>
  );

  const Meters = () => (
    <View style={styles.OuterView}>
      <View style={styles.metersView}>
        <Text style={styles.valueText}>{strings?.Systolic}</Text>
        <GestureHandlerRootView>
          <View style={styles.counterView}>
            <TouchableOpacity onPress={incrementCounter}>
              <CounterPlus height={26} width={26} />
            </TouchableOpacity>
            <View style={{ paddingHorizontal: moderateScale(5) }} />
            <Text style={styles.countText}>{count}</Text>
            <View style={{ paddingHorizontal: moderateScale(5) }} />
            <TouchableOpacity onPress={decrementCounter}>
              <CounterMinus height={26} width={26} />
            </TouchableOpacity>
          </View>
        </GestureHandlerRootView>
      </View>

      <View style={{ paddingVertical: moderateScale(20) }}>
        <View style={styles.metersView}>
          <Text style={styles.valueText}>{strings?.Diastolic}</Text>
          <GestureHandlerRootView>
            <View style={styles.counterView}>
              <TouchableOpacity onPress={incrementCounter}>
                <CounterPlus height={26} width={26} />
              </TouchableOpacity>
              <View style={{ paddingHorizontal: moderateScale(5) }} />
              <Text style={styles.countText}>{count}</Text>
              <View style={{ paddingHorizontal: moderateScale(5) }} />
              <TouchableOpacity onPress={decrementCounter}>
                <CounterMinus height={26} width={26} />
              </TouchableOpacity>
            </View>
          </GestureHandlerRootView>
        </View>
      </View>

      <View style={styles.metersView}>
        <Text style={styles.valueText}>{strings?.heartrate}</Text>
        <GestureHandlerRootView>
          <View style={styles.counterView}>
            <TouchableOpacity onPress={incrementCounter}>
              <CounterPlus height={26} width={26} />
            </TouchableOpacity>
            <View style={{ paddingHorizontal: moderateScale(5) }} />
            <Text style={styles.countText}>{count}</Text>
            <View style={{ paddingHorizontal: moderateScale(5) }} />
            <TouchableOpacity onPress={decrementCounter}>
              <CounterMinus height={26} width={26} />
            </TouchableOpacity>
          </View>
        </GestureHandlerRootView>
      </View>
    </View>
  );

  const FeelingBox = () => (
    <View style={styles.OuterView}>
      <CommonInput
        placeholderTextColor={colors?.SurfCrest}
        placeholder={strings?.feelingBox}
        textAlignVertical={"top"}
        backGroundColor={"transparent"}
        borderColor={colors?.royalOrange}
        wordCount={true}
        multiline={true}
        writeWords={"5"}
        writeWordsStyle={{ color: colors?.SurfCrest }}
        maxWords={"150"}
        mainContainer={{
          height: moderateScale(162),
          borderColor: colors?.royalOrange,
          marginTop: moderateScale(15),
        }}
        inputText={{ height: moderateScale(130) }}
        isWidth={false}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={["1"]}
        keyExtractor={(item, index) => "key" + index}
        renderItem={() => (
          <View style={{ marginHorizontal: moderateScale(19) }}>
            {Header()}
            {DeviceStatus()}
            {DateTimePicker()}
            {Meters()}
            {FeelingBox()}
          </View>
        )}
        contentContainerStyle={{ paddingBottom: moderateScale(110) }}
      />
      {Button()}
    </View>
  );
};
export default AddManualReading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.themeColor,
  },
  button: {
    position: "absolute",
    bottom: "5%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 59, // Example height
  },
  innerView: {
    // width: moderateScale(350),
    // alignSelf: "center",
  },
  OuterView: {
    paddingTop: moderateScale(20),
  },
  DeviceStatusView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Bptext: {
    color: colors?.royalOrange,
    fontWeight: "600",
    fontSize: textScale(14),
    fontFamily: "Poppins-Regular",
  },
  DeviceStatustext: {
    color: colors?.SurfCrest,
    fontWeight: "400",
    fontSize: textScale(14),
    fontFamily: "Poppins-Regular",
  },
  SelectDateTimeText: {
    fontWeight: "600",
    color: colors?.SurfCrest,
    fontSize: textScale(14),
  },
  DateTimeView: {
    flexDirection: "row",
    paddingTop: moderateScale(10),
  },
  DateTimeOuterView: {
    borderRadius: 10,
    borderColor: colors?.royalOrange,
    borderWidth: moderateScale(1),
    width: moderateScale(166),
    height: moderateScale(56),
    justifyContent: "center",
  },
  metersView: {
    borderRadius: 10,
    borderColor: colors?.royalOrange,
    borderWidth: moderateScale(1),
    height: moderateScale(56),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(10),
  },
  counterView: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  valueText: {
    fontWeight: "600",
    color: colors?.SurfCrest,
    fontFamily: "Poppins-Regular",
  },
  countText: {
    fontWeight: "500",
    color: colors?.royalOrange,
  },
});
