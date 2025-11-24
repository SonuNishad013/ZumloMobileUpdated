import React, { FunctionComponent, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import {
  height,
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import CommonLoader from "../../../components/Loader";
import { dynamicDataType } from "../../../constant/appConstant";
import CommonInput from "../../../components/Inputs/commonInput";

import { imagePath } from "../../../assets/png/imagePath";
import Slider from "@react-native-community/slider";
import Renderoptions, { BottomButton, HeaderView } from "./commonComponent";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DatePickerInput from "../../../components/DatePicker/DatePickerInput";
import moment from "moment";
import {
  ddd_DD_MMM_MMM,
  MM_DD_YYYY,
} from "../../../constant/dateFormatConstants";
import { backgrounColor } from "../../../constant/ProfileConstant";
import { strings } from "../../../constant/strings";
import { DeleteIcon, NoDataIcon } from "../../../assets";
import {
  dateFields,
  inputFields,
  isJSONkey,
  isNotificationPreferencesQue,
  isNumberKey,
  multiSelectableFields,
  otherOptions,
  selectableFields,
  singleSelectableFields,
  singleSelectFields,
  sliderFields,
  TimeFields,
} from "./FieldTypes";
import logger from "../../../constant/logger";

interface QuestionsIndexProps {
  navigation?: any;
  route?: any;
}

const QuestionsIndex: FunctionComponent<QuestionsIndexProps> = ({
  navigation,
  route,
}: any) => {
  const { questionData, isUIAvailable, from, hasEtl } = route?.params;
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);

  const [saveInputvalue, setsaveInputvalue] = useState("");
  const [isOtherSelected, setisOtherSelected] = useState(false);
  const [SelectedAnswer, setSelectedAnswer] = useState<any[]>([]);
  const [hrsValue, setHrsValue] = useState<number>(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [saveSelectedDate, setsaveSelectedDate] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [CategoryData, setCategoryData] = useState(
    questionData[currentQuestionIndex]?.options || []
  );

  useEffect(() => {
    setCategoryData(questionData[currentQuestionIndex]?.options || []);
  }, [currentQuestionIndex]);
  useEffect(() => {
    setCategoryData(questionData[currentQuestionIndex]?.options || []);
  }, []);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const [answersList, setAnswersList] = useState<any[]>([]);
  useEffect(() => {
    if (
      !hasEtl ||
      !questionData?.[0]?.answer ||
      questionData?.[0]?.answer.length === 0
    )
      return;

    const controlType = questionData[currentQuestionIndex]?.controlType;

    const isMultiSelectable = multiSelectableFields.has(controlType);
    const isSingleSelectable = singleSelectableFields.has(controlType);
    const isSelectable = isMultiSelectable || isSingleSelectable;
    const isTextField = inputFields.includes(controlType);
    const isDatePicker = dateFields.includes(controlType);
    const isTimePicker = TimeFields.includes(controlType);
    const isSlider = sliderFields.includes(controlType);
    if (isSelectable) {
      const updatedData = CategoryData.map((item: any) => ({
        ...item,
        isSelected: questionData?.[0]?.answer.some(
          (ans: any) =>
            ans.answerValue === item.optionValue ||
            String(ans.id) === String(item.id)
        ),
      }));

      const selectedIds = getSelectedIds(updatedData);
      setSelectedAnswer(selectedIds);
      setCategoryData(updatedData);
    }

    if (isTextField) {
      setsaveInputvalue(questionData?.[0]?.answer[0]?.answerValue || "");
    }

    if (isDatePicker) {
      setsaveSelectedDate(questionData?.[0]?.answer[0]?.answerValue || "");
    }
    if (isTimePicker) {
      setsaveSelectedDate(questionData?.[0]?.answer[0]?.answerValue || "");
    }
    if (isSlider) {
      setHrsValue(questionData?.[0]?.answer[0]?.answerValue || 0);
    }
  }, [hasEtl, questionData?.[0]?.answer]);
  useEffect(() => {
    if (
      !answersList ||
      answersList.length === 0 ||
      !questionData[currentQuestionIndex]
    ) {
      console.log("Answers list or question data not ready yet");
      return;
    }

    console.log("Loading answer for index", currentQuestionIndex);

    const existingAnswer = answersList.find(
      (ans) =>
        ans.QuestionId === `${questionData[currentQuestionIndex]?.questionId}`
    );

    if (existingAnswer) {
      console.log("Found existing answer =>", existingAnswer);

      const controlType = existingAnswer.controlType;

      if (
        selectableFields.includes(controlType) ||
        singleSelectFields.includes(controlType)
      ) {
        setSelectedAnswer(existingAnswer.Answer || []);
        setCategoryData((prevData) =>
          prevData.map((item: any) => ({
            ...item,
            isSelected: existingAnswer.Answer.includes(item.id),
          }))
        );
      }

      if (inputFields.includes(controlType)) {
        setsaveInputvalue(existingAnswer.OtherAnswer || "");
      }

      if (
        dateFields.includes(controlType) ||
        TimeFields.includes(controlType)
      ) {
        setsaveSelectedDate(existingAnswer.OtherAnswer || "");
      }

      if (sliderFields.includes(controlType)) {
        setHrsValue(Number(existingAnswer.OtherAnswer) || 0);
      }

      if (isJSONkey.includes(controlType)) {
        try {
          const parsedData = JSON.parse(existingAnswer.OtherAnswer);
          setIsJSONData(parsedData || [{ name: "", relationship: "" }]);
        } catch (error) {
          console.warn("Failed to parse JSON saved data");
        }
      }
    } else {
      console.log("No saved answer for this question. Resetting fields.");
      // Reset fields
      setSelectedAnswer([]);
      setisOtherSelected(false);
      setsaveInputvalue("");
      setHrsValue(0);
      setIsJSONData([{ name: "", relationship: "" }]);
    }
  }, [currentQuestionIndex, answersList]);

  const handleOptionSelect = (item: any, selectType: string) => {
    console.log("Item Selected =>", item, selectType);

    const isOtherOption = otherOptions.includes(item.optionValue);
    const isNoNotification = isNotificationPreferencesQue.includes(
      item.optionValue
    );
    const isSingleSelect = singleSelectableFields.has(selectType);
    const isMultiSelect = multiSelectableFields.has(selectType);

    const updatedData = CategoryData.map((optionItem: any) => {
      if (isSingleSelect) {
        return { ...optionItem, isSelected: optionItem.id === item.id };
      }

      if (isMultiSelect) {
        if (isNoNotification || isOtherOption) {
          // Exclusive selections
          return { ...optionItem, isSelected: optionItem.id === item.id };
        }

        // Normal multi-select logic
        return {
          ...optionItem,
          isSelected:
            optionItem.id === item.id
              ? !optionItem.isSelected
              : optionItem.isSelected &&
                !otherOptions.includes(optionItem.optionValue) &&
                !isNotificationPreferencesQue.includes(optionItem.optionValue),
        };
      }

      return optionItem;
    });

    if (!isOtherOption && !isNoNotification) {
      setsaveInputvalue("");
    }

    const selectedIds = getSelectedIds(updatedData);
    setSelectedAnswer(selectedIds);
    setisOtherSelected(isOtherOption);
    setCategoryData(updatedData);
  };

  const getSelectedIds = (data: any[]) => {
    return data.filter((item) => item.isSelected).map((item) => item.id);
  };
  const onSaveValueChange = (text: any) => {
    setsaveInputvalue(text);
  };

  const SaveDynamicPromptingAnswers = (controlType: any) => {
    // setisLoading(true);

    const isSelectable =
      selectableFields.includes(controlType) ||
      singleSelectFields.includes(controlType);
    const isTextField = inputFields.includes(controlType);
    const isDatePicker = dateFields.includes(controlType);
    const isTimePicker = TimeFields.includes(controlType);
    const isSlider = sliderFields.includes(controlType);
    const isJSON = isJSONkey.includes(controlType);

    const formattedData = isJSON ? JSON.stringify(isJSONData) : "";

    const currentAnswer = {
      QuestionId: `${questionData[currentQuestionIndex]?.questionId}`,
      Answer: isSelectable
        ? SelectedAnswer
        : isOtherSelected
        ? JSON.stringify([SelectedAnswer])
        : null,
      OtherAnswer: isOtherSelected
        ? saveInputvalue
        : isSlider
        ? `${hrsValue}`
        : isTextField || isDatePicker || isTimePicker
        ? saveInputvalue || saveSelectedDate
        : isJSON
        ? formattedData
        : null,
      controlType: questionData[currentQuestionIndex]?.controlType,
      header: questionData[currentQuestionIndex]?.header,
    };

    console.log("Saving Answer =>", currentAnswer);

    setAnswersList((prevAnswers = []) => {
      // Find if the answer for this QuestionId already exists
      const existingIndex = prevAnswers.findIndex(
        (ans) => ans.QuestionId === currentAnswer.QuestionId
      );

      let updatedAnswers = [...prevAnswers];

      if (existingIndex !== -1) {
        updatedAnswers[existingIndex] = currentAnswer;
      } else {
        updatedAnswers.push(currentAnswer);
      }

      if (currentQuestionIndex < questionData.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setisOtherSelected(false);
        setsaveInputvalue("");
        setisLoading(false);
      } else {
        console.log("Final updatedAnswers =>", updatedAnswers);

        allActions.dashboardAction
          .SaveUserMissingProfileDataPointAnswers(
            dispatch,
            { answers: updatedAnswers },
            "saveDynamicPromptingAnswers"
          )
          .then((response: any) => {
            setisLoading(false);
            if (response.statusCode === 200) {
              navigation.pop(2);
            } else {
            }
          })
          .catch((err) => {
            setisLoading(false);
          });
      }

      return updatedAnswers;
    });
  };

  const [isJSONData, setIsJSONData] = useState([
    { name: "", relationship: "" },
  ]);

  const handleAddMore = () => {
    setIsJSONData((prev) => [...prev, { name: "", relationship: "" }]);
  };

  const handleDelete = (index: number) => {
    const updatedData = [...isJSONData];
    updatedData.splice(index, 1);
    setIsJSONData(updatedData);
  };

  const handleChangeText = (
    text: string,
    index: number,
    field: "name" | "relationship"
  ) => {
    const updatedData = [...isJSONData];
    updatedData[index][field] = text;
    setIsJSONData(updatedData);
  };

  const getJSONField = (selectedType: any, data: any) => {
    return (
      <ScrollView contentContainerStyle={{ padding: moderateScale(15) }}>
        {isJSONData.map((item, index) => (
          <View key={index} style={JSONstyles.card}>
            <View style={JSONstyles.deleteIcon}>
              <TouchableOpacity onPress={() => handleDelete(index)}>
                <DeleteIcon />
              </TouchableOpacity>
            </View>

            <CommonInput
              mainContainer={JSONstyles.inputContainer}
              inputText={JSONstyles.inputText}
              placeholder="Enter Name"
              placeholderTextColor={colors.lightprussianBlue}
              value={item.name}
              onChangeText={(text: any) =>
                handleChangeText(text, index, "name")
              }
            />

            <CommonInput
              mainContainer={JSONstyles.inputContainer}
              inputText={JSONstyles.inputText}
              placeholder="Enter Relationship"
              placeholderTextColor={colors.lightprussianBlue}
              value={item.relationship}
              onChangeText={(text: any) =>
                handleChangeText(text, index, "relationship")
              }
            />
          </View>
        ))}

        <TouchableOpacity
          style={JSONstyles.addMoreButton}
          onPress={handleAddMore}
        >
          <Text style={JSONstyles.addMoreText}>+ Add More</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };
  const renderOptions = (item: any, index: any, selectType: any) => {
    return (
      <>
        <Renderoptions
          item={item}
          index={index}
          selectType={selectType}
          onItemPress={handleOptionSelect}
        />
      </>
    );
  };

  const renderListHeaderComponent = (questionName: any) => {
    return (
      <View style={{}}>
        <Text
          style={{
            color: colors.SurfCrest,
            fontSize: textScale(14),
            flexWrap: "wrap",
            marginHorizontal: moderateScale(10),
          }}
        >
          {questionName}
        </Text>
      </View>
    );
  };

  const getInputFieldUI = (inputType: any) => {
    const isTextArea =
      inputType === dynamicDataType.TextArea || isOtherSelected === true;

    return (
      <CommonInput
        mainContainer={{
          backgroundColor: colors.SurfCrest,
          borderColor: colors.themeColor,
          marginTop: isOtherSelected ? moderateScale(-100) : moderateScale(25),
          marginBottom: isOtherSelected ? moderateScale(200) : moderateScale(5),
          height:
            inputType == dynamicDataType.TextArea
              ? moderateScale(500)
              : moderateScale(56),
          width: "auto",
        }}
        inputText={{
          color: colors.darkPrussianBlue,
          marginTop:
            inputType == dynamicDataType.TextArea
              ? moderateScale(20)
              : moderateScale(0.1),
          textAlignVertical: "top",
          width: isOtherSelected ? width / 1.3 : "auto",
        }}
        keyboardType={
          isNumberKey.includes(inputType) ? "numeric" : "ascii-capable"
        }
        value={saveInputvalue}
        onChangeText={onSaveValueChange}
        multiline={isTextArea ? isTextArea : false}
        placeholder={"Share your thoughts here"}
        placeholderTextColor={colors.lightprussianBlue}
      />
    );
  };

  const getSingleSelectedUI = (selectType: any) => {
    console.log("CategoryData-=-=-=>", CategoryData);

    return (
      <>
        <FlatList
          key={selectType} // This forces re-render when selectType changes
          data={CategoryData}
          renderItem={({ item, index }) =>
            renderOptions(item, index, selectType)
          }
          extraData={CategoryData}
          keyExtractor={(_, index) => index.toString()}
          numColumns={
            selectType === dynamicDataType.CircleSelect ||
            selectType === dynamicDataType.MultiSelect ||
            selectType === "Dropdown"
              ? 2
              : 1
          }
          columnWrapperStyle={
            selectType === dynamicDataType.MultiSelect ||
            selectType === dynamicDataType.CircleSelect ||
            selectType === "Dropdown"
              ? {
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }
              : undefined
          }
          contentContainerStyle={{
            paddingBottom: moderateScale(170),
          }}
        />
        {isOtherSelected && getInputFieldUI(selectType)}
      </>
    );
  };

  const getSliderView = () => {
    return (
      <View>
        <View
          style={{
            height: height / 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: textScale(50),
              color: colors.SurfCrest,
              fontWeight: "600",
            }}
          >
            {hrsValue}
          </Text>
        </View>
        <View
          style={{
            height: height / 2,
          }}
        >
          <Slider
            style={{
              height: moderateScale(40),
              transform: [{ scaleY: Platform.OS == "ios" ? 1 : 2 }], // Increase more to make the track fatter
            }}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor={colors.royalOrangeDark}
            maximumTrackTintColor={colors.lightSurfCrest34}
            value={hrsValue}
            onValueChange={(val: any) => {
              let hrs = Math.round(val);
              setHrsValue(hrs);
            }}
          />
        </View>
      </View>
    );
  };

  const getDatePickerUI = () => {
    return (
      <View
        style={{
          marginTop: moderateScale(20),
        }}
      >
        <DatePickerInput
          showDatePicker={showDatePicker}
          selectedDate={new Date()}
          ShowDate={
            moment(saveSelectedDate, "MM-DD-YYYY").format("MM-DD-YYYY") ==
            strings.invalidDate
              ? strings.selectDate
              : moment(saveSelectedDate, "MM-DD-YYYY").format("MM-DD-YYYY")
          }
          IconTintColor
          setShowDatePicker={setShowDatePicker}
          setSelectedDate={(date: any) => {
            let dateFormat = moment(date).format(MM_DD_YYYY);
            setsaveSelectedDate(dateFormat);
            setShowDatePicker(false);
          }}
        />
      </View>
    );
  };
  const getUINotFound = () => {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <NoDataIcon
          width={`${moderateScale(100)}`}
          height={`${moderateScale(100)}`}
        />
        <Text
          style={{
            fontSize: textScale(16),
            color: colors.SurfCrest,
            fontWeight: "600",
          }}
        >
          UI not found
        </Text>
      </View>
    );
  };
  const getTimePickerUI = () => {
    return (
      <View
        style={{
          marginTop: moderateScale(20),
        }}
      >
        <DatePickerInput
          isDatePicker={false}
          showDatePicker={showDatePicker}
          selectedDate={new Date()}
          ShowDate={
            moment(saveSelectedDate, "HH:mm").format("HH:mm") ==
            strings.invalidDate
              ? strings.selectTime
              : moment(saveSelectedDate, "HH:mm").format("hh:mm A")
          }
          IconTintColor
          setShowDatePicker={setShowDatePicker}
          setSelectedDate={(date: any) => {
            let dateFormat = moment(date).format("HH:mm");
            setsaveSelectedDate(dateFormat);
            setShowDatePicker(false);
          }}
        />
      </View>
    );
  };

  const getRenderUIForQuestionType = (inputType: any) => {
    switch (true) {
      case inputFields.includes(inputType):
        return getInputFieldUI(inputType);
      case selectableFields.includes(inputType):
      case singleSelectFields.includes(inputType):
        return getSingleSelectedUI(inputType);
      case sliderFields.includes(inputType):
        return getSliderView();
      case dateFields.includes(inputType):
        return getDatePickerUI();
      case TimeFields.includes(inputType):
        return getTimePickerUI();
      case isJSONkey.includes(inputType):
        return getJSONField(inputType, isJSONData);
      default:
        return getUINotFound();
    }
  };
  logger("questionData______", questionData);
  return (
    <ScreenWrapper
      statusBarColor={
        questionData?.inputType == dynamicDataType.Single_Select
          ? colors.SurfCrest
          : colors.themeColor
      }
    >
      <ImageBackground
        style={{ flex: 1 }}
        source={
          questionData?.inputType == dynamicDataType.Single_Select
            ? imagePath.DynamicPromptbga
            : imagePath.BgRight
        }
      >
        {isUIAvailable ? (
          <KeyboardAvoidingView
            behavior={"padding"}
            keyboardVerticalOffset={
              Platform.OS === "ios" ? moderateScale(20) : moderateScale(100)
            }
          >
            <View style={{ padding: moderateScale(15) }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <HeaderView
                  data={questionData[currentQuestionIndex]}
                  // onBack={() => navigation.goBack()}
                  onBack={() => {
                    console.log("check current index", currentQuestionIndex);
                    if (currentQuestionIndex === 0) {
                      navigation.goBack();
                    } else {
                      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
                    }
                  }}
                />
                <View
                  style={{
                    height: moderateScale(30),
                    borderColor: colors.royalOrange,
                    borderWidth: moderateScale(1),
                    borderRadius: moderateScale(15),
                    padding: moderateScale(5),
                  }}
                >
                  <Text style={{ color: colors.SurfCrest }}>
                    {currentQuestionIndex + 1 + " / " + questionData?.length}
                  </Text>
                </View>
              </View>
              <ScrollView>
                <View
                  style={{
                    padding: moderateScale(15),
                  }}
                >
                  {renderListHeaderComponent(
                    !hasEtl
                      ? questionData[currentQuestionIndex]?.questionDiscription
                      : questionData[currentQuestionIndex]?.question
                  )}
                  {getRenderUIForQuestionType(
                    questionData[currentQuestionIndex]?.controlType
                  )}
                </View>
              </ScrollView>
            </View>
            {/* </KeyboardAwareScrollView> */}
          </KeyboardAvoidingView>
        ) : (
          <>{getUINotFound()}</>
        )}
        {!keyboardVisible && (
          <BottomButton
            onSave={() =>
              isUIAvailable
                ? SaveDynamicPromptingAnswers(
                    questionData[currentQuestionIndex]?.controlType
                  )
                : navigation.pop(2)
            }
            btnName={isUIAvailable ? strings.save : "Will ask again."}
          />
        )}
        {isLoading && <CommonLoader />}
      </ImageBackground>
    </ScreenWrapper>
  );
};
const JSONstyles = StyleSheet.create({
  card: {
    marginBottom: moderateScale(20),
    // padding: moderateScale(10),
    // backgroundColor: "#F7F8FA",
    borderRadius: moderateScale(8),
    elevation: 2,
  },
  deleteIcon: {
    alignItems: "flex-end",
    marginBottom: moderateScale(5),
  },
  inputContainer: {
    backgroundColor: colors.SurfCrest,
    borderColor: colors.themeColor,
    marginTop: moderateScale(5),
    height: moderateScale(56),
    width: "100%",
  },
  inputText: {
    color: colors.darkPrussianBlue,
    marginTop: moderateScale(2),
    textAlignVertical: "top",
    width: "100%",
  },
  addMoreButton: {
    marginTop: moderateScale(10),
    backgroundColor: colors.themeColor,
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(5),
    alignItems: "center",
  },
  addMoreText: {
    color: colors.SurfCrest,
    fontWeight: "bold",
  },
  saveButton: {
    marginTop: moderateScale(20),
    backgroundColor: colors.SurfCrest,
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(5),
    alignItems: "center",
  },
  saveText: {
    color: colors.darkPrussianBlue,
    fontWeight: "bold",
  },
});

export default QuestionsIndex;
