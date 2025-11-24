import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import React from "react";
import TitleHeader from "./TitleHeader";
import { moderateScale } from "../../../constant/responsiveStyle";
import DatePicker from "react-native-date-picker";
import { imagePath } from "../../../assets/png/imagePath";
import colors from "../../../constant/colors";
import moment from "moment";
import { MM_DD_YYYY } from "../../../constant/dateFormatConstants";
import { current_Year_Last_Date } from "../../../constant/ProfileConstant";
import { strings } from "../../../constant/strings";

const CustomDatePicker = ({
  showDatePicker,
  setShowDatePicker,
  selectedDate,
  setSelectedDate,
  title,
  isMaxDate,
  MaxDate,
  MainContainer,
  IconTintColor = false,
  innerTitle,
  onCancelClick,
  pickerTitle,
}: any) => (
  <View style={{}}>
    <TitleHeader title={title ? title : strings?.Target_Date} />
    <TouchableOpacity
      style={[styles?.container, MainContainer]}
      onPress={() => setShowDatePicker(true)}
    >
      <Text style={styles?.dateStyle}>
        {moment(selectedDate)?.isSame(moment(), strings?.day)
          ? innerTitle
          : moment(selectedDate)?.format(MM_DD_YYYY)}
      </Text>
      <Image
        source={imagePath?.dropdown}
        tintColor={IconTintColor ? colors.SurfCrest : colors.royalOrange}
      />
    </TouchableOpacity>

    <DatePicker
      modal
      open={showDatePicker}
      date={selectedDate}
      mode={strings?.date}
      onConfirm={(date) => {
        setSelectedDate(date);
      }}
      title={pickerTitle || strings?.selectDate}
      minimumDate={new Date()}
      maximumDate={isMaxDate ? MaxDate : current_Year_Last_Date}
      onCancel={() => {
        onCancelClick ? onCancelClick() : setShowDatePicker(false);
      }}
    />
  </View>
);
export default CustomDatePicker;

const styles = StyleSheet.create({
  container: {
    height: moderateScale(56),
    width: "100%",
    borderWidth: 1,
    borderColor: colors.royalOrange,
    borderRadius: 16,
    justifyContent: "space-between",
    paddingStart: 18,
    flexDirection: "row",
    alignItems: "center",
    paddingEnd: 18,
  },
  dateStyle: {
    color: colors.SurfCrest,
    fontSize: moderateScale(14),
  },
});
