import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CommonHeader from "../../../../components/Header/commonHeader";
import colors from "../../../../constant/colors";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import TitleHeader from "../../../Profile/GoalsAndAspiration/TitleHeader";
import CommonInput from "../../../../components/Inputs/commonInput";
import CustomDatePicker from "../../../Profile/GoalsAndAspiration/CustomDatePicker";
import AddButton from "../../../Profile/GoalsAndAspiration/AddButton";
import CommonButton from "../../../../components/Buttons/commonButton";
import moment from "moment";
import { DD_MMM_YYYY_ } from "../../../../constant/dateFormatConstants";
import { strings } from "../../../../constant/strings";
import { useDispatch, useSelector } from "react-redux";
import onBoardingTypes from "../../../../redux/types/onBoardingTypes";
import CommonLoader from "../../../../components/Loader";
import { useFocusEffect } from "@react-navigation/native";
import { getLongTermGoal } from "../../../../redux/selector";
import WellnessHeader from "./WellnessHeader";
import { DeleteIcon } from "../../../../assets";
import CustomToast from "../../../../components/Toast";

const LongTermGoals = ({
  navigation,
  questionData,
  allData,
  stepNumber,
  reqData,
}: any) => {
  const [showDatePicker, setShowDatePicker] = useState<boolean[]>([false]);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [inputsData, setInputsData] = useState([
    { description: "", title: "", targetDate: new Date() },
  ]);
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const goalData: any = useSelector(getLongTermGoal());
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });
  // const [showDatePicker, setShowDatePicker] = useState<boolean[]>([false]);

  const handleInputChange = (index: number, field: string, value: any) => {
    const newInputsData: any = [...inputsData];
    newInputsData[index][field] = value;
    setInputsData(newInputsData);
  };

  const handleDatePickerVisibility = (index: number, visible: boolean) => {
    const newVisibility = [...showDatePicker];
    newVisibility[index] = visible;
    setShowDatePicker(newVisibility);
  };
  useFocusEffect(
    React.useCallback(() => {
      if (goalData !== null && goalData !== undefined) {
        setInputsData(goalData);
      }
      return () => {
        // Additional cleanup code if needed
      };
    }, [])
  );
  const addMoreFields = () => {
    setInputsData([
      ...inputsData,
      { description: "", title: "", targetDate: new Date() },
    ]);
  };
  const onNext = () => {
    let selectedGoals = inputsData.map((item: any) => {
      let data_ = {
        Title: item.title,
        Description: item.description,
        TargetDate: moment(item.targetDate).format(DD_MMM_YYYY_),
      };
      return data_;
    });

    let apiReq = {
      StepId: questionData.stepID,
      "Questions:": questionData.stepName,
      Type: questionData.fieldName,
      Options: [],
      Goals: selectedGoals,
    };
    let selectedData_ = selectedGoals
      .map((item: any) => item.Title !== "")
      .filter((item: any) => item == true);
    if (selectedData_.length > 0) {
      setisLoading(true);
      reqData(apiReq);
      dispatch({
        type: onBoardingTypes.SAVE_LONG_TERM_GOAL_DATA,
        payload: inputsData,
      });
      setisLoading(true);
      setTimeout(() => {
        setisLoading(false);
        stepNumber(questionData?.stepNumber + 1);
      }, 1000);
    } else {
      setToasterDetails({
        showToast: true,
        code: 0,
        message: strings.pleaseFillGoalData,
      });
    }
  };
  const onDeleteFields = (index: any) => {
    setInputsData(inputsData.filter((_, i) => i !== index)); // Remove item by index
  };
  const header = () => {
    return (
      <View>
        <CommonHeader
          onBackPress={() => stepNumber(questionData?.stepNumber - 1)}
          iconContainer={{ backgroundColor: "#00000033" }}
          headerName={questionData?.fieldName}
        />
      </View>
    );
  };
  function getDateOneYearLater() {
    const today = new Date();
    const threeMonthsLater = new Date(today.setMonth(today.getMonth() + 12));
    return threeMonthsLater;
  }
  const renderInputs = (itm: any, index: number) => {
    return (
      <View key={index}>
        {index >= 1 && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: moderateScale(30),
            }}
          >
            {/* <Text style={{color:colors.orgDark}}>
                {index+1}
              </Text> */}

            <TouchableOpacity onPress={() => onDeleteFields(index)}>
              <DeleteIcon />
            </TouchableOpacity>
          </View>
        )}
        <CommonInput
          placeholderTextColor={colors?.SurfCrest}
          placeholder={"Give your goal a name"}
          backGroundColor={"transparent"}
          borderColor={colors?.SurfCrest}
          mainContainer={{
            borderColor: colors?.royalOrange,
            marginTop: moderateScale(15),
          }}
          isWidth={false}
          value={itm.title}
          onChangeText={(text: any) => handleInputChange(index, "title", text)}
          inputText={{ color: colors.SurfCrest }}
        />
        <CommonInput
          placeholderTextColor={colors?.SurfCrest}
          placeholder={"Share some more details about your goal"}
          textAlignVertical={"top"}
          backGroundColor={"transparent"}
          borderColor={colors?.SurfCrest}
          multiline={true}
          mainContainer={{
            height: moderateScale(125),
            borderColor: colors?.royalOrange,
            marginTop: moderateScale(15),
            paddingTop: moderateScale(10),
            paddingStart: moderateScale(10),
          }}
          inputText={{ height: moderateScale(105), color: colors.SurfCrest }}
          isWidth={false}
          value={itm.description}
          onChangeText={(text: any) =>
            handleInputChange(index, "description", text)
          }
        />
        {/* <CustomDatePicker
          title={"Target date"}
          showDatePicker={showDatePicker}
          selectedDate={itm.targetDate}
          setShowDatePicker={setShowDatePicker}
          setSelectedDate={(date: any) => {
            setShowDatePicker(false);
            handleInputChange(index, "targetDate", date);
          }}
          isMaxDate={true}
          MaxDate={new Date("2100-12-31")}
          innerTitle={"Select date"}
        /> */}
        <CustomDatePicker
          title={"When do you want to aim for it?"}
          pickerTitle={"Select date (From today to 1 year)"}
          showDatePicker={showDatePicker[index]}
          selectedDate={itm.targetDate}
          setShowDatePicker={() => handleDatePickerVisibility(index, true)}
          setSelectedDate={(date: any) => {
            handleInputChange(index, "targetDate", date);
            handleDatePickerVisibility(index, false);
          }}
          innerTitle={"Pick a date"}
          onCancelClick={() => {
            handleDatePickerVisibility(index, false);
          }}
          isMaxDate
          MaxDate={moment().add(1, "year").toDate()}
          isMinDate
          minimumDate={moment().toDate()}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <WellnessHeader
        onBackPress={() => {
          stepNumber(questionData?.stepNumber - 1);
        }}
        headerName={questionData?.fieldName}
      />
      <ScrollView style={{ flex: 1, paddingHorizontal: moderateScale(20) }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontWeight: "500",
              fontSize: textScale(25),
              color: colors?.SurfCrest,
              marginVertical: moderateScale(20),
            }}
          >
            {questionData?.stepName}
          </Text>
          <TitleHeader title={"What long-term goal do you want to focus on?"} />
          {inputsData.map((itm, index) => renderInputs(itm, index))}
        </View>
        <View
          style={{
            gap: 20,
            marginVertical: moderateScale(20),
            marginBottom: moderateScale(20),
          }}
        >
          <AddButton
            containerStyle={{
              borderColor: colors?.SurfCrest,
              justifyContent: "center",
              width: "100%",
            }}
            isBtnName
            btnName={"Add another"}
            onPress={addMoreFields}
            textStyle={{ color: colors?.SurfCrest }}
            // textColor={true}
            tintColor={colors?.SurfCrest}
          />

          <CommonButton
            onPress={() => onNext()}
            mainContainer={{
              width: "auto",
            }}
            btnName={"Next"}
          />
        </View>
      </ScrollView>
      {isLoading && <CommonLoader />}
      {toasterDetails?.showToast && (
        <CustomToast
          data={toasterDetails}
          setToasterDetails={setToasterDetails}
          code={toasterDetails?.code}
          message={toasterDetails?.message}
        />
      )}
    </View>
  );
};

export default LongTermGoals;
