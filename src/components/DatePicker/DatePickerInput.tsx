import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { moderateScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { imagePath } from "../../assets/png/imagePath";
import DatePicker from "react-native-date-picker";
import { current_Year_Last_Date } from "../../constant/ProfileConstant";
import logger from "../../constant/logger";

interface Props {
  container?: any;
  showDatePicker?: any;
  setShowDatePicker?: any;
  selectedDate?: any;
  setSelectedDate?: any;
  isMaxDate?: any;
  MaxDate?: any;
  MainContainer?: any;
  IconTintColor?: any;
  ShowDate?: any;
  minimumDate?: any;
  isDatePicker?: any;
}

const DatePickerInput: React.FC<Props> = ({
  container,
  showDatePicker,
  setShowDatePicker,
  selectedDate,
  setSelectedDate,
  isMaxDate,
  MaxDate,
  MainContainer,
  IconTintColor = false,
  ShowDate,
  minimumDate,
  isDatePicker = true,
}: any) => (
  <View style={[styles.mainContainer, container]}>
    <TouchableOpacity
      style={[styles.buttonContainer, MainContainer]}
      onPress={() => setShowDatePicker(true)}
    >
      <Text style={styles.dateText}>{ShowDate}</Text>
      <Image
        source={imagePath.dropdown}
        tintColor={IconTintColor ? colors.SurfCrest : colors.royalOrange}
      />
    </TouchableOpacity>
    <DatePicker
      modal
      open={showDatePicker}
      date={
        selectedDate instanceof Date && !isNaN(selectedDate.getTime())
          ? selectedDate
          : new Date()
      }
      mode={isDatePicker ? "date" : "time"}
      onConfirm={(date) => {
        logger("check_____date", date instanceof Date, date);
        setSelectedDate(date);
      }}
      minimumDate={minimumDate}
      maximumDate={isMaxDate ? MaxDate : current_Year_Last_Date}
      onCancel={() => setShowDatePicker(false)}
    />
  </View>
);

export default DatePickerInput;

const styles = StyleSheet.create({
  buttonContainer: {
    height: moderateScale(56),
    width: "100%",
    borderWidth: moderateScale(1),
    borderColor: colors.SurfCrest,
    borderRadius: moderateScale(16),
    justifyContent: "space-between",
    paddingStart: moderateScale(18),
    marginTop: moderateScale(10),
    flexDirection: "row",
    alignItems: "center",
    paddingEnd: moderateScale(18),
  },
  dateText: {
    color: colors.SurfCrest,
    fontSize: moderateScale(14),
  },
  mainContainer: {
    marginHorizontal: moderateScale(19),
  },
});
