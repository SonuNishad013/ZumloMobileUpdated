import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import Header from "./Header";
import { StringsHabitTracking } from "./StringsHabitTracking";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import CommonSheetDroppDown from "../../../components/CommonDropDown/CommonSheetDroppDown";
import {
  addHabitCategory,
  addHabitDuration,
  addHabitDuration5to60,
  addHabitDuration_,
  addHabitGoals,
  frequency_data,
  weekDays,
} from "./helper";
import logger from "../../../constant/logger";
import CustomImage from "../../../components/ImageRender";
import { styles } from "./styles";
import TitleHeader from "./TitleHeader";
import DatePickerInput from "../../../components/DatePicker/DatePickerInput";
import { YYYY_MM_DD } from "../../../constant/dateFormatConstants";
import moment from "moment";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CommonButton from "../../../components/Buttons/commonButton";
import allActions from "../../../redux/actions";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import { STATUS_CODES } from "../../../constant/appConstant";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import { strings } from "../../../constant/strings";
import CommonLoader from "../../../components/Loader";
interface AddHabitFormProps {
  navigation?: any;
  route?: any;
}
interface WeekDays {
  day: string;
  isSelected: boolean;
}

interface HabitPayload {
  name: string;
  categories: string[];
  frequency: number;
  daysOfWeek: number[];
  reminderTime: string;
  duration: string;
  goal: number;
  startDate: string;
}
const AddHabitForm: React.FC<AddHabitFormProps> = ({ navigation, route }) => {
  const { categoryList } = route?.params;
  logger("categoryList__", categoryList);
  const [habitName, setHabitName] = useState<string>("");
  const [data, setData] = useState<any[]>(frequency_data);
  const [reminderTime, setReminderTime] = useState<string>("Select time");
  const [showSelectDays, setShowSelectDays] = useState<boolean>(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [durationValue, setDurationValue] = useState("");
  const [otherDurationValue, setOtherDurationValue] = useState<number | string>(
    ""
  );
  const [otherGoalValue, setOtherGoalValue] = useState<number | String>("");
  const [selectedDays, setSelectedDays] = useState<WeekDays[]>(weekDays);
  const [category, setCategory] = useState<string>("");
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherValue, setOtherValue] = useState("");
  const [showOtherInputDuration, setShowOtherInputDuration] = useState(false);
  const [showOtherInputGoals, setShowOtherInputGoals] = useState(false);
  const [goals, setGoals] = useState<string>("");
  const [selectedDaysValue, setSelectedDaysValue] = useState<number[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  const onActivitySelection = (item: any) => {
    data.map((val: any) => {
      val.isSelected = false;
      return { ...val };
    });
    const updatedArray: any[] = data.map((val: any) => {
      if (val.globalCodeId === item.globalCodeId) {
        return { ...val, isSelected: !val.isSelected };
      }
      return val;
    });
    const extractedDaily = updatedArray.filter(
      (item: any) => item?.codeName === "Daily"
    );
    if (extractedDaily[0]?.isSelected == false) {
      //If frequancy is not daily then set all day's isSelected value to false, need to pass in API
      const unselectAllDays: any[] = weekDays.map((itm) => {
        return { ...itm, isSelected: false };
      });
      setSelectedDays(unselectAllDays);
    } else {
      //If frequancy is daily then set all day's isSelected value to true, need to pass in API
      const selectAllDays: any[] = weekDays.map((itm) => {
        return { ...itm, isSelected: true };
      });
      setSelectedDaysValue(weekDays.map((item, index) => index + 1));
      setSelectedDays(selectAllDays);
    }
    setShowSelectDays(extractedDaily[0]?.isSelected);
    logger("updatedArray_____", updatedArray);
    setData(updatedArray);
  };
  const validateInputs = () => {
    const extractSelectedFrequancy: any[] = data.filter(
      (item: any) => item.isSelected
    );
    const howManyDaysSelected = selectedDays.filter(
      (item: any) => item?.isSelected
    );

    if (!habitName || !habitName.trim()) {
      return true; // true for button disable
    } else if (!category) {
      return true;
    } else if (category && category === "Other" && !otherValue) {
      return true;
    } else if (!extractSelectedFrequancy.length) {
      return true;
    } else if (!howManyDaysSelected.length) {
      return true;
    } else if (!durationValue) {
      return true; // true for button disable
    } else if (
      durationValue &&
      durationValue === "Other" &&
      !otherDurationValue
    ) {
      return true;
    } else if (!goals) {
      return true;
    } else if (goals && goals === "Other" && !otherGoalValue) {
      return true;
    } else if (!reminderTime || reminderTime === "Select time") {
      return true;
    } else {
      return false;
    }
  };
  const onSaveButtonPress = async () => {
    if (otherValue !== "") {
      const exists =
        categoryList?.some(
          (item: any) =>
            String(item?.title).toLowerCase() ===
            String(otherValue).toLowerCase()
        ) ?? false;
      if (exists) {
        //will show toaster here indicating entered category is already exist please pick from there.
        setToasterDetails({
          showToast: true,
          code: 0,
          message: strings?.Category_already_exist_please_pick_from_there,
        });
        return;
      }
    }

    try {
      setIsLoader(true);
      let requestBody: HabitPayload = {
        name: habitName.trim(),
        categories: [otherValue || category],
        frequency: data.findIndex((item: any) => item.isSelected) + 1, //This will return ["Weekly" or "Any selected frequency's codeName in array"]
        daysOfWeek: selectedDaysValue,
        reminderTime: reminderTime,
        duration:
          durationValue === "Other"
            ? String(otherDurationValue) + " Mins"
            : durationValue,
        goal: goals === "Other" ? Number(otherGoalValue) : parseInt(goals, 10),
        startDate: moment().format(YYYY_MM_DD),
      };

      const response = await allActions?.HabitAction?.createHabitAPI(
        requestBody,
        API_FUN_NAMES?.createHabitAPI
      );
      if (response) {
        setIsLoader(false);
      }
      if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
        setToasterDetails({
          showToast: true,
          code: 1,
          message: response?.message,
        });
        navigation?.goBack();
      } else {
        setToasterDetails({
          showToast: true,
          code: 0,
          message: response?.message,
        });
      }
    } catch (error: any) {
      setIsLoader(false);
      setToasterDetails({
        showToast: true,
        code: 0,
        message: error?.message,
      });
    }
  };
  const handleChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    const num = Number(cleaned);
    if (cleaned === "") {
      setOtherDurationValue("");
      return;
    }
    if (num >= 1 && num <= 60) {
      setOtherDurationValue(num);
    }
  };
  const handleChangeGoal = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    const num = Number(cleaned);
    if (cleaned === "") {
      setOtherGoalValue("");
      return;
    }
    if (num >= 1 && num <= 999) {
      setOtherGoalValue(num);
    }
  };
  return (
    <ScreenWrapper statusBarColor={colors?.backgroundTheme}>
      <View style={{ flex: 1 }}>
        <Header
          title={StringsHabitTracking?.Add_Habit}
          navigation={navigation}
          container={{ paddingBottom: moderateScale(15) }}
        />
        <KeyboardAwareScrollView
          contentContainerStyle={{
            paddingHorizontal: moderateScale(19),
            gap: moderateScale(15),
            marginBottom: moderateScale(150),
            flexGrow: 1,
          }}
          enableOnAndroid={true}
          extraScrollHeight={100}
          keyboardShouldPersistTaps="handled"
        >
          <Text
            style={{
              color: colors?.royalOrangeDark,
              fontSize: textScale(24),
              fontWeight: "500",
            }}
          >
            {StringsHabitTracking?.Create_an_new_habit}
          </Text>
          <Text
            style={{
              color: colors?.SurfCrest,
              fontSize: textScale(14),
              fontWeight: "400",
              marginBottom: moderateScale(10),
              fontStyle: "italic",
            }}
          >
            {"Pick something that feels easy to begin. Tiny \nsteps add up."}
          </Text>

          <TitleHeader title={"Name your habit"} />

          <TextInput
            onChangeText={setHabitName}
            value={habitName}
            style={{
              borderWidth: 1,
              borderColor: colors?.SurfCrest,
              padding: moderateScale(15),
              borderRadius: moderateScale(15),
              color: colors?.SurfCrest,
            }}
            placeholderTextColor={colors?.SurfCrest}
            placeholder={"E.g., “Morning walk” or “Gratitude journaling”"}
          />
          <TitleHeader title={"Pick a focus area"} />
          <CommonSheetDroppDown
            dropDownListData={categoryList ?? addHabitCategory}
            mainContainerStyle={{
              backgroundColor: "transparent",
              borderColor: colors?.SurfCrest,
            }}
            iconColor={colors?.SurfCrest}
            selectedTextStyle={{ color: colors?.SurfCrest }}
            selectedItemData={(val: any) => {
              setCategory(val.title);
              if (val.title === "Other") {
                setShowOtherInput(true);
              } else {
                setShowOtherInput(false);
                setOtherValue("");
              }
            }}
            placeholder={"Well-being, productivity, mindset..."}
            isLabelName={false}
          />
          {showOtherInput && (
            <TextInput
              onChangeText={setOtherValue}
              value={otherValue}
              style={{
                borderWidth: 1,
                borderColor: colors?.SurfCrest,
                padding: moderateScale(15),
                borderRadius: moderateScale(15),
                color: colors?.SurfCrest,
              }}
              placeholderTextColor={colors?.SurfCrest}
              placeholder={"Describe your focus in your own words"}
            />
          )}
          <View style={{ gap: moderateScale(15) }}>
            <TitleHeader title={"How often would you like to do this?"} />
            <View style={{ flexDirection: "row", gap: moderateScale(15) }}>
              {data.map((item: any, index: any) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.clickableView,
                      {
                        backgroundColor: item.isSelected
                          ? colors?.polishedPine
                          : colors?.transparent,
                      },
                    ]}
                    onPress={() => onActivitySelection(item)}
                  >
                    <CustomImage
                      source={{ uri: item.imageURL }}
                      width={moderateScale(22)}
                      height={moderateScale(22)}
                      isTintColor={false}
                      mainContainer={styles?.addBottom}
                    />
                    <Text style={styles?.codeName}>{item?.codeName}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {!showSelectDays && (
            <View style={{ gap: moderateScale(5) }}>
              <TitleHeader title="Select days" />
              <ScrollView
                contentContainerStyle={{ flexDirection: "row", gap: 5 }}
                horizontal
              >
                {selectedDays.map((item: any) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        const selectedFrequency = data.filter(
                          (item: any) => item?.isSelected
                        );

                        const updatedArray: any[] = selectedDays.map(
                          (val: any) => {
                            if (selectedFrequency[0]?.codeName === "Weekly") {
                              //If selected frequency is weekly then
                              //Handle single selection here
                              if (val.day === item.day) {
                                return { ...val, isSelected: true };
                              }
                              return { ...val, isSelected: false };
                            } else {
                              //Handle multiple selection here based on frequency other the weekly.
                              if (val.day === item.day) {
                                return { ...val, isSelected: !val.isSelected };
                              }
                              return val;
                            }
                          }
                        );

                        setSelectedDaysValue(
                          updatedArray
                            .map((item, index) =>
                              item.isSelected ? index + 1 : null
                            )
                            .filter((index) => index !== null)
                        );
                        setSelectedDays(updatedArray);
                      }}
                      style={{
                        padding: moderateScale(9),
                        backgroundColor: item.isSelected
                          ? colors?.royalOrangeDark
                          : colors.SurfCrest,
                        paddingVertical: moderateScale(30),
                        borderRadius: moderateScale(30),
                        minWidth: moderateScale(50),
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: colors?.prussianBlue,
                          fontSize: textScale(12),
                          fontWeight: "600",
                        }}
                      >
                        {item.day}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}
          <View style={{ gap: moderateScale(5) }}>
            <TitleHeader title="Set a time to be nudged" />
            <DatePickerInput
              showDatePicker={showDatePicker}
              selectedDate={new Date()}
              isDatePicker={false}
              IconTintColor
              setShowDatePicker={setShowDatePicker}
              ShowDate={reminderTime}
              setSelectedDate={(date: any) => {
                setReminderTime(moment(date).format("hh:mm A"));
                setShowDatePicker(false);
              }}
              container={{ width: "100%", marginHorizontal: 0 }}
            />
          </View>
          <View style={{ gap: moderateScale(5) }}>
            <TitleHeader title="Set your time " />
            <CommonSheetDroppDown
              dropDownListData={addHabitDuration_}
              mainContainerStyle={{
                backgroundColor: "transparent",
                borderColor: colors?.SurfCrest,
              }}
              iconColor={colors?.SurfCrest}
              selectedTextStyle={{ color: colors?.SurfCrest }}
              selectedItemData={(val: any) => {
                setDurationValue(val.title);
                if (val.title === "Other") {
                  setShowOtherInputDuration(true);
                } else {
                  setShowOtherInputDuration(false);
                  setOtherDurationValue("");
                }
              }}
              placeholder={"E.g., 5 mins, 15 mins—whatever feels doable"}
              isLabelName={false}
              dropdownPosition={"top"}
            />
          </View>
          {showOtherInputDuration && (
            <TextInput
              onChangeText={handleChange}
              keyboardType="phone-pad"
              maxLength={2}
              value={String(otherDurationValue)}
              style={{
                borderWidth: 1,
                borderColor: colors?.SurfCrest,
                padding: moderateScale(15),
                borderRadius: moderateScale(15),
                color: colors?.SurfCrest,
              }}
              placeholderTextColor={colors?.SurfCrest}
              placeholder={"Type a time that works for you"}
            />
          )}
          <View style={{ gap: moderateScale(5) }}>
            <TitleHeader title="Set your goal " />
            <CommonSheetDroppDown
              dropDownListData={addHabitGoals}
              mainContainerStyle={{
                backgroundColor: "transparent",
                borderColor: colors?.SurfCrest,
              }}
              iconColor={colors?.SurfCrest}
              selectedTextStyle={{ color: colors?.SurfCrest }}
              selectedItemData={(val: any) => {
                setGoals(val.title);
                if (val.title === "Other") {
                  setShowOtherInputGoals(true);
                } else {
                  setShowOtherInputGoals(false);
                  setOtherGoalValue("");
                }
              }}
              placeholder={"E.g., 10 times, 30 days, or your own milestone"}
              isLabelName={false}
              dropdownPosition={"top"}
            />
          </View>
          {showOtherInputGoals && (
            <TextInput
              onChangeText={handleChangeGoal}
              value={String(otherGoalValue)}
              style={{
                borderWidth: 1,
                borderColor: colors?.SurfCrest,
                padding: moderateScale(15),
                borderRadius: moderateScale(15),
                color: colors?.SurfCrest,
              }}
              keyboardType={"phone-pad"} //Only number input
              maxLength={3} //Goals custom value max length set to 3 e.g 999 not more then that.
              placeholderTextColor={colors?.SurfCrest}
              placeholder={"Set your own number here"}
            />
          )}
          <CommonButton
            btnName="Add habit"
            mainContainer={{
              width: "100%",
              backgroundColor: !validateInputs()
                ? colors?.polishedPine
                : colors?.polishedPineOP3,
              marginBottom: moderateScale(80),
            }}
            onPress={() => {
              if (!validateInputs()) {
                onSaveButtonPress();
              }
            }}
            disabled={validateInputs()}
          />
        </KeyboardAwareScrollView>
      </View>
      {toasterDetails?.showToast && (
        <ToastApiResponse
          data={toasterDetails}
          setToasterDetails={setToasterDetails}
          code={toasterDetails?.code}
          message={toasterDetails?.message}
        />
      )}
      {isLoader && <CommonLoader />}
    </ScreenWrapper>
  );
};

export default AddHabitForm;
