import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../../constant/colors";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import allActions from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import CommonHeader from "../../../components/Header/commonHeader";
import CommonLoader from "../../../components/Loader";
import Global from "../../../global";
import CommonButton from "../../../components/Buttons/commonButton";
import { strings } from "../../../constant/strings";
import { fieldType } from "../../../constant/AllGlobalNameConstant";
import TextInputStretch from "../../../components/OnBoardiingComponents/TextInputStretch";
import { getTimeFallValue, updateAnswerRequest } from "../Helper/HelperFun";
import { LotusIcon, MoonIcon, MorningIcon, SunIcon } from "../../../assets";
import { styles } from "../ActivityFeedback/styles";
import { imagePath } from "../../../assets/png/imagePath";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import NewActivityDone from "../NewActivityDone";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import { convertToMinutes } from "../../../components/Hooks/getMinFromHr";
import navigationString from "../../../navigation/navigationString";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import { capitalizeFirstLetter } from "../../../validations/capitalizeFirstLetter";
import { renderUpdatedStepOptions } from "../../../helper/FormHelpers";
import SliderView from "../ActivityFeedback/SliderView";
import {
  checkAvailability,
  compareExtractedWithActivity,
  extractAnswers,
  ExtractedData,
  Field,
  transformDataForEditReplace,
  updateScheduleTimeOptions,
  validateActivityChanges,
  validateTimeSlotGaps,
} from "./editReplaceHelperFunctions";
import DatePicker from "react-native-date-picker";
import moment, { duration } from "moment";
import TimePickerMinutes from "../../../components/OnBoardiingComponents/TimePickerMinutes";
import DatePickerInput from "../../../components/DatePicker/DatePickerInput";
import { MM_DD_YYY, YYYY_MM_DD } from "../../../constant/dateFormatConstants";
import LogoutModal from "../../../components/CommonAlert/logoutModal";

import { GetUserScheduledActivitiesList } from "../../../helper/commonApi";
import BookedSlotsModal from "../../../components/CommonAlert/BookedSlotsModal";
import { getUserBookedSlots } from "../../../redux/selector";
import { aiProvider } from "../../../constant/appConstant";
import { Enum_editingFor } from "../../../constant/ENUM";
import logger from "../../../constant/logger";

interface Props {
  navigation?: any;
  route?: any;
}
const EditReplaceActivies: React.FC<Props> = ({ navigation, route }) => {
  const { ActivityDetails, from, purpuse, editingFor } = route?.params;
  console.log("route?.params", route?.params);
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [index, setIndex] = useState<any>(0);
  const [isDone, setIsDone] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean[]>([false]);
  const [isDatePicker, setIsDatePicker] = useState(false);
  const [replaceQuestions, setReplaceQuestions] = useState<any>([]);
  const [discardChanges, setDiscardChanges] = useState(false);
  const [deleteAccountAlert, setDeleteAccountAlert] = useState(false);
  const [showBookedSlots, setShowBookedSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any>([]);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  const bookedSlotsData = useSelector(getUserBookedSlots());
  console.log("updateSlotsForUser", bookedSlotsData);
  const handleDatePickerVisibility = (index: number, visible: boolean) => {
    const newVisibility = [...showDatePicker];
    newVisibility[index] = visible;
    setShowDatePicker(newVisibility);
  };
  useEffect(() => {
    if (ActivityDetails) {
      if (route?.params?.purpuse == "Edit") {
        Call_GetEditableActivityQuestionsByIdAPI(ActivityDetails);
        GetUserScheduledActivitiesList(dispatch);
      }
      if (route?.params?.purpuse == "Replace") {
        call_ReplaceactivitiesApi(ActivityDetails);
      }
    }
  }, []);

  const fetchData = async (apiFunction: any, requestbody: any, params: any) => {
    setLoading(true);
    try {
      const response = await apiFunction(
        dispatch,
        requestbody,
        apiFunction.name,
        params
      );
      setLoading(false);
      if (response.statusCode == 200) {
        return response?.data;
      } else {
        setToasterDetails({
          showToast: true,
          code: 0,
          message: response?.message,
        });
        return null;
      }
    } catch (error) {
      setToasterDetails({
        showToast: true,
        code: 0,
        message: error,
      });
      setLoading(false);
      return null;
    }
  };

  const Call_GetEditableActivityQuestionsByIdAPI = async (
    ActivityDetails: any
  ) => {
    console.log("ActivityDetails====>>>>>", ActivityDetails);
    const requestbody = {};
    const params = {
      category: route?.params?.ActivityQuestionsType
        ? route?.params?.ActivityQuestionsType
        : 2,
      id: ActivityDetails?.id,
    };
    const data_ =
      editingFor !== Enum_editingFor?.GOALS
        ? await fetchData(
            allActions.dashboardAction.GetEditableActivityQuestionsByIdAPI,
            requestbody,
            params
          )
        : await fetchData(
            allActions.dashboardAction.GetEditableGoalQuestionsByIdAPI,
            requestbody,
            params
          );

    if (data_) {
      const updatedata = transformDataForEditReplace(data_, ActivityDetails);
      console.log("transformDataForEditReplace updatedata", updatedata);
      setData(updatedata);
      setLoading(false);
    }
  };

  const call_ReplaceactivitiesApi = async (ActivityDetails: any) => {
    console.log("ActivityDetails====>>>>>", ActivityDetails); ///capitalizeFirstLetter.ts with code

    let requestbody = {};
    let params = {
      ActivityQuestionsType: route?.params?.ActivityQuestionsType
        ? route?.params?.ActivityQuestionsType
        : 2,
    };

    const data_ = await fetchData(
      allActions.dashboardAction.GetReplaceCategoryQuestionsByNameAPi,
      requestbody,
      params
    );
    if (data_) {
      setReplaceQuestions(data_);
    }
  };
  //new api calling function

  const backFunction = () => {
    if (purpuse === "Replace") {
      if (isFollowUpQuestionSelected) {
        // Alert.alert("fghjk");
        setIsFollowUpQuestionSelected(false);
        setFollowUpQuestions([]);
        setReplaceQuestions(resetFollowUpSelections(replaceQuestions));
      } else {
        discardChanges ? setDeleteAccountAlert(true) : navigation.goBack();
      }
    }

    if (purpuse === "Edit") {
      if (index > 0) {
        setIndex((prevIndex: any) => {
          const newIndex = prevIndex - 1;
          Global.GlobalIndex = newIndex;
          console.log("Navigating to index:", newIndex);
          return newIndex;
        });
      } else {
        discardChanges ? setDeleteAccountAlert(true) : navigation.goBack();
        console.log("Navigating back to previous screen");
      }
    }
  };
  const generatePayloadForApi = (data: any[], ActivityDetails: any) => {
    console.log(
      "ActivityDetailsActivityDetails",
      ActivityDetails,
      "datadata",
      data
    );
    const payload: any = {
      id: ActivityDetails?.id, // Default ID, modify as needed
      userId:
        editingFor === Enum_editingFor?.GOALS ? route?.params?.userId : null, // editingFor,
    };

    data.forEach((item) => {
      console.log("item____CONVERTING__DATA", item);
      switch (item.fieldType) {
        case "SingleSelect":
          // Find the selected option
          const selectedOption = item.options.find(
            (option: any) => option.isSelected
          );
          payload[item.fieldName] = selectedOption
            ? selectedOption.optionValue
            : "";
          break;

        case "TimePicker":
          // Collect all optionValues into an array
          // payload[item.fieldName] = selectedSlot.map((itm: string[]) => itm[0]);
          payload[item.fieldName] = item.options.map(
            (option: any) => option.optionValue
          );

          break;

        case "TextArea":
          if (item?.fieldName === "Duration") {
            console.log("durationvaliItem", item);
            payload[item.fieldName] = item.otherAnswer
              ? `${JSON.parse(item.otherAnswer) * 5} min`
              : "";
            break;
          } else {
            // Assign otherAnswer directly
            payload[item.fieldName] = item.otherAnswer || "";
            break;
          }
        case "DatePicker":
          // Assign otherAnswer directly
          const input = item.otherAnswer;
          let out = "";

          if (moment(input, "MM-DD-YYYY", true).isValid()) {
            out = moment(input, "MM-DD-YYYY").format("YYYY-MM-DD");
          } else if (moment(input, moment.ISO_8601, true).isValid()) {
            out = moment(input).format("YYYY-MM-DD");
          } else {
            out = "";
          }

          payload[item.fieldName] = out;
          break;

        default:
          // Keep the key but with an empty value if type is unknown
          payload[item.fieldName] = "";
      }
    });
    console.log("item____CONVERTING__DATA_payload__", payload);
    return payload;
  };

  const validateInputData = (data: any, TimeDuration_: number) => {
    if (editingFor === Enum_editingFor?.GOALS) {
      return { valid: true };
    }
    if (!Array.isArray(data)) {
      return {
        valid: false,
        message: "Invalid input: expected an array of options.",
      };
    }

    // 1. Check for duplicate time values
    const values = data.map((item: any) => item.optionValue);
    const uniqueValues = new Set(values);
    if (values.length !== uniqueValues.size) {
      return { valid: false, message: "Duplicate option values found." };
    }

    // 2. Convert time strings to minutes for comparison
    const toMinutes = (timeStr: string) => {
      const [time, modifier] = timeStr.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (modifier === "PM" && hours !== 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;
      return hours * 60 + minutes;
    };

    const timeInMinutes = values.map(toMinutes).sort((a, b) => a - b);

    // 3. Check time gaps
    for (let i = 0; i < timeInMinutes.length - 1; i++) {
      const diff = timeInMinutes[i + 1] - timeInMinutes[i];
      if (diff < TimeDuration_) {
        return {
          valid: false,
          message: `Time gap between activities must be at least ${TimeDuration_} minutes.`,
        };
      }
    }

    return { valid: true };
  };

  // Example usage
  const [TimeDuration, setTimeDuration] = useState("");
  const nextFunction = async () => {
    if (purpuse === "Replace") {
      if (route.params?.purpuse === "Replace") {
        let extractFollowUpQuestions: any[] = extractFollowUpQuestion(
          replaceQuestions[index].options
        );
        console.log(
          "extractFollowUpQuestions",
          extractFollowUpQuestions,
          "replagfhfgj",
          replaceQuestions,
          followUpQuestions
        );
        const MainOptionSelected = replaceQuestions[index].options?.filter(
          (item: any) => item?.isSelected
        );
        console.log("selectedMainQuestion_", {
          MainOptionSelected,
          replaceQuestions,
          optionList: replaceQuestions[index].options,
        });

        if (MainOptionSelected?.length === 0) {
          setToasterDetails({
            showToast: true,
            code: 0,
            message: `Please select at least one option`,
          });
          return;
        } else {
          setDiscardChanges(true);
          setIsFollowUpQuestionSelected(true);
          setFollowUpQuestions(extractFollowUpQuestions);
        }
      }
      if (isFollowUpQuestionSelected) {
        console.log(
          "isFollowUpQuestionSelected____",
          followUpQuestions,
          followUpQuestions[index]?.options?.filter(
            (item: any) => item?.isSelected
          ),
          "replaceQuestions",
          replaceQuestions,
          replaceQuestions[index]?.answer
            ? replaceQuestions[index]?.answer
            : "text box is empty.",
          "isField!!!!",
          !!replaceQuestions[index]?.answer,
          replaceQuestions[index]?.answer
          // followUpQuestions
        );
        if (followUpQuestions?.length > 0) {
          if (
            followUpQuestions[index]?.options?.filter(
              (item: any) => item?.isSelected
            ).length === 0
          ) {
            setToasterDetails({
              showToast: true,
              code: 0,
              message: `Please select atleast one option.`,
            });
            return;
          } else {
            const payload__ = extractFeedbackData(
              replaceQuestions,
              followUpQuestions
            );
            console.log("payload__payload__payload__", payload__);
            call_ReplaceActivityDetailsByIdAPI(payload__);
          }
        } else if (!replaceQuestions[index]?.answer) {
          setToasterDetails({
            showToast: true,
            code: 0,
            message: `Please enter something. Fields can't be empty.`,
          });
          return;
        } else {
          const payload__ = extractFeedbackData(
            replaceQuestions,
            followUpQuestions
          );
          console.log("payload__payload__payload__", payload__);
          call_ReplaceActivityDetailsByIdAPI(payload__);
        }
      }
    } else {
      let TimeDuration_ =
        index >= 2 && data[2].otherAnswer
          ? String(data[2].otherAnswer * 5)
          : "";
      setTimeDuration(
        index == 2 && data[2].otherAnswer ? String(data[2].otherAnswer * 5) : ""
      );
      console.log("TimeDuration_-=-=>", TimeDuration_);

      const isValid = validateInput(index);
      if (!isValid) return;
      const currentQuestion = data[index];
      if (
        currentQuestion.stepName ===
        "Did you encounter any issues or difficulties while completing the activity?"
      ) {
        const selectedOption = currentQuestion.stepOptions.find(
          (option: any) => option.isSelected
        );

        if (selectedOption) {
          if (selectedOption.optionValue === "Yes") {
            setIndex(index + 1);
            Global.GlobalIndex = index + 1;
            console.log("is no==>yes");
            return;
          }
          let create_request = await updateAnswerRequest(data);
          console.log("is no==>");

          setIndex(index + 2);
          Global.GlobalIndex = index + 2;
          return;
        }
      }

      if (index === data.length - 1) {
        if (
          route?.params?.purpuse == "Edit" ||
          route?.params?.purpuse == "Replace"
        ) {
          let create_request = generatePayloadForApi(data, ActivityDetails);
          logger("create_request______", create_request, data);

          let isValid = validateInputData(
            data[index].options,
            Number(TimeDuration_)
          );
          if (isValid.valid) {
            const filtered = Object.fromEntries(
              Object.entries(create_request).filter(
                ([_, v]) =>
                  v !== "" &&
                  v !== null &&
                  v !== undefined &&
                  v !== 0 &&
                  v !== "Invalid date"
              )
            );
            if (
              editingFor === Enum_editingFor?.GOALS &&
              Object.keys(filtered)?.length === 2
            ) {
              setToasterDetails({
                showToast: true,
                code: 0,
                message: `Selected something to edit.`,
              });
              return;
            }
            editingFor === Enum_editingFor?.GOALS
              ? call_EditGoalDetailsByIdAPI(filtered)
              : call_EditActivityDetailsByIdApi(filtered);
          } else {
            setToasterDetails({
              showToast: true,
              code: 0,
              message: `Selected time slots are not valid, kindly choose another one.`,
            });
          }
        }
      } else {
        setDiscardChanges(true);
        setIndex(index + 1);
        Global.GlobalIndex = index + 1;
      }
    }
  };

  //call APi for edit activity
  const call_ReplaceActivityDetailsByIdAPI = async (req: any) => {
    setLoading(true);
    try {
      let requestbody = {
        ...req,
      };

      const response =
        editingFor === Enum_editingFor?.GOALS
          ? await allActions.dashboardAction.ReplaceGoalDetailsByIdAPI(
              dispatch,
              requestbody,
              "ReplaceGoalDetailsByIdAPI"
            )
          : await allActions.dashboardAction.ReplaceActivityDetailsByIdAPI(
              dispatch,
              requestbody,
              "ReplaceActivityDetailsByIdAPI"
            );

      setLoading(false);
      if (response.statusCode == 200) {
        setToasterDetails({
          showToast: true,
          code: 1,
          message: response?.message,
        });
        navigation?.navigate(
          editingFor === Enum_editingFor?.GOALS
            ? navigationString?.GeneratedGoalAI
            : navigationString?.GeneratedActivitiesAI,
          {
            activitesData: response?.data,
            goalsData: response.data,
            reqData: requestbody,
            from: from ?? "Dashboard",
            purpuse: purpuse,
            ExistingID: ActivityDetails?.id,
            replcaeApiPayload: requestbody,
            editingFor: editingFor, //=== "Goals" ? "Goals" : "Activities"
            oldActivityData: ActivityDetails,
          }
        );
      } else {
        setToasterDetails({
          showToast: true,
          code: 0,
          message: "Something wents wrong.",
        });
      }
    } catch (error) {
      setToasterDetails({
        showToast: true,
        code: 0,
        message: "Something went wrong.",
      });
      setLoading(false);
    }
  };
  const checkTimeDurationChanges = (
    extracted: ExtractedData,
    Duration: any,
    frequency: string,
    hasDuplicates: any,
    result_validateTimeSlotGaps: any
  ) => {
    // Alert.alert("6");

    const checkAvailability_reslt_a = checkAvailability(
      bookedSlotsData,
      validateActivityChanges(extracted, ActivityDetails)?.data?.map(
        (item: any) => item?.start
      ),
      JSON.stringify(Duration * 5)
    );
    console.log("checkAvailability_reslt_a", {
      checkAvailability_reslt_a,
      valChangesWithouData: validateActivityChanges(extracted, ActivityDetails),
      valChangesWithData: validateActivityChanges(extracted, ActivityDetails)
        .data,
    });

    // Alert.alert("duration check kr raha");
    // return false;
    if (frequency === "Daily" && hasDuplicates) {
      setToasterDetails({
        showToast: true,
        code: 0,
        message: `Schedule time can't be same.`,
      });
      return false;
    } else if (frequency === "Daily" && result_validateTimeSlotGaps) {
      setToasterDetails({
        showToast: true,
        code: 0,
        message: `Make sure that each schedule time follow the gap of duration of ${
          Duration * 5
        } minutes`,
      });
      return false;
    } else if (
      checkAvailability_reslt_a?.filter(
        (item: any) => item?.available === false
      ).length > 0
    ) {
      // Alert.alert("Got time changes not enter here");
      setToasterDetails({
        showToast: true,
        code: 0,
        message: `Your selected slots are colliding with other activities. Click booked slot button to see booked slots.${checkAvailability_reslt_a
          .filter((item: any) => item.available === false)
          .map((itm: any) => itm.start)} These are the slots`,
      });
      return false;
    } else {
      return true;
    }
  };
  const validateInput = (currentIndex: number) => {
    const currentQuestion = data[currentIndex];
    const PrevQuestion = data[currentIndex - 1];
    if (editingFor === Enum_editingFor?.GOALS) {
      //handling for only start date and end date question This will work on Next button press, That's why we are adding check here.....
      logger("checkcurrentquestionis_____", data[currentIndex], editingFor);

      interface ItemProps {
        otherAnswer?: string;
        fieldName?: string;
        question?: string;
        [key: string]: any;
      }
      const extractStartDateSelected: ItemProps[] = [...data]?.filter(
        (item: ItemProps) => item?.fieldName === "StartDate"
      );
      const extractEndDateSelected: ItemProps[] = [...data]?.filter(
        (item: ItemProps) => item?.fieldName === "EndDate"
      );

      const extractDateFromQuestion: string =
        extractStartDateSelected[0]?.question?.match(
          /date is\s+([\d-]+)/
        )?.[1] || "";
      const extractEndDateFromQuestion: string =
        extractEndDateSelected[0]?.question?.match(/date is\s+([\d-]+)/)?.[1] ||
        "";

      const isEndDateQuestion = data[currentIndex]?.fieldName === "EndDate";
      // --- Determine picked or fallback values ---
      const startDateSelected: string | undefined =
        extractStartDateSelected?.find((item: ItemProps) => item?.otherAnswer)
          ?.otherAnswer || extractDateFromQuestion;

      const endDateSelected: string | undefined =
        extractEndDateSelected?.find((item: ItemProps) => item?.otherAnswer)
          ?.otherAnswer || extractEndDateFromQuestion;

      logger("allDates_____", {
        extractStartDateSelected,
        extractEndDateSelected,
        extractDateFromQuestion,
        extractEndDateFromQuestion,
        isEndDateQuestion,
        startDateSelected,
        endDateSelected,
      });
      if (moment(extractDateFromQuestion).isAfter(moment())) {
        // Question start date is in the future → user can't pick a past date before current date
        if (moment(startDateSelected).isBefore(moment())) {
          setToasterDetails({
            showToast: true,
            code: 0,
            message:
              "Start date cannot be earlier than the current date. Please adjust the Start date.",
          });
          return false;
        }
      }
      // Question start date is in the past → user can't pick a date before question's start date
      else if (
        moment(startDateSelected).isBefore(moment(extractDateFromQuestion))
      ) {
        setToasterDetails({
          showToast: true,
          code: 0,
          message:
            "Start date cannot be earlier than the question's start date. Please adjust the Start date.",
        });
        return false;
      } else if (isEndDateQuestion && startDateSelected) {
        if (
          startDateSelected &&
          endDateSelected &&
          moment(startDateSelected).isAfter(moment(endDateSelected))
        ) {
          setToasterDetails({
            showToast: true,
            code: 0,
            message:
              "Start date cannot be later than End date. Please adjust End date.",
          });
          return false;
        } else {
          return true;
        }
      }
    }

    if (!ActivityDetails.isFeatured) {
      console.log("ValidateThings__", {
        currentQuestion,
        PrevQuestion,
      });

      if (currentIndex === data.length - 1) {
        const frequency = data
          ?.find((item: any) => item?.fieldName === "Frequency")
          ?.options.find((item: any) => {
            return item.isSelected;
          })?.optionValue;

        const Duration = data?.find(
          (item: any) => item?.fieldName === "Duration"
        )?.otherAnswer;
        const values = currentQuestion.options.map(
          (opt: any) => opt.optionValue
        );
        const hasDuplicates = new Set(values).size < values.length;
        const result_validateTimeSlotGaps = validateTimeSlotGaps(
          values,
          JSON.stringify(Duration * 5)
        );
        const checkAvailability_reslt = checkAvailability(
          bookedSlotsData,
          values,
          JSON.stringify(Duration * 5)
        );
        console.log("validateInput", data, purpuse, editingFor);
        if (editingFor === Enum_editingFor?.GOALS) return true;
        const rawFields: Field[] = data;
        const extracted = extractAnswers(rawFields) as ExtractedData;
        const comparison = compareExtractedWithActivity(
          extracted,
          ActivityDetails
        );
        console.log("comparison___", {
          comparison,
          extracted,

          rj: Object.values(comparison),
          ActivityDetails,
          validtaeansnk: validateActivityChanges(extracted, ActivityDetails),
        });

        if (
          Object.values(comparison).filter((value) => value === false).length >
          0
        ) {
          if (
            validateActivityChanges(extracted, ActivityDetails).changeType ===
            "None"
          ) {
            return true;
          }
          if (
            validateActivityChanges(extracted, ActivityDetails).changeType ===
              "Duration" &&
            validateActivityChanges(extracted, ActivityDetails).isValid ===
              false
          ) {
            return true;
          } else if (
            validateActivityChanges(extracted, ActivityDetails).changeType ===
              "Duration" &&
            validateActivityChanges(extracted, ActivityDetails).isValid === true
          ) {
            checkTimeDurationChanges(
              extracted,
              Duration,
              frequency,
              hasDuplicates,
              result_validateTimeSlotGaps
            );
          } else if (
            validateActivityChanges(extracted, ActivityDetails).changeType ===
              "Time" &&
            validateActivityChanges(extracted, ActivityDetails).isValid === true
          ) {
            return true;
          } else if (
            validateActivityChanges(extracted, ActivityDetails).changeType ===
              "Time" &&
            validateActivityChanges(extracted, ActivityDetails).isValid ===
              false
          ) {
            checkTimeDurationChanges(
              extracted,
              Duration,
              frequency,
              hasDuplicates,
              result_validateTimeSlotGaps
            );
          }
        } else {
          return true;
        }
      }

      if (
        currentQuestion?.fieldType === "TimePicker" &&
        currentQuestion?.fieldName === "ScheduleTime"
      ) {
        const frequencyCount = 3;
        const frequency = data
          ?.find((item: any) => item?.fieldName === "Frequency")
          ?.options.find((item: any) => {
            return item.isSelected;
          })?.optionValue;

        const missingCount = frequencyCount - selectedSlot.length;
        console.log("missingCount__", {
          missingCount,
          frequencyCount,
          slotLeng: selectedSlot.length,
          // prevQues: data[currentIndex - 1],
        });
        const Duration = data?.find(
          (item: any) => item?.fieldName === "Duration"
        )?.otherAnswer;
        const values = currentQuestion.options.map(
          (opt: any) => opt.optionValue
        );
        const hasDuplicates = new Set(values).size < values.length;
        const result = validateTimeSlotGaps(
          values,
          JSON.stringify(Duration * 5)
        );
        const checkAvailability_reslt = checkAvailability(
          bookedSlotsData,
          values,
          JSON.stringify(Duration * 5)
        );

        console.log("ValidateThings__hasDuplicates", {
          hasDuplicates,
          PrevQuestion,
          frequency,
          values,
          data,
          Duration,
          result,

          checkAvailability_reslt: checkAvailability_reslt?.filter(
            (item: any) => item?.available === false
          ),
          checkAvailability_reslt__: checkAvailability_reslt,
          checkAvailability_reslt_length: checkAvailability_reslt?.filter(
            (item: any) => item?.available === false
          ).length,
        });
        //handle slot validation here

        if (frequency === "Daily" && hasDuplicates) {
          setToasterDetails({
            showToast: true,
            code: 0,
            message: `Schedule time can't be same.`,
          });
          return false;
        } else if (frequency === "Daily" && result) {
          setToasterDetails({
            showToast: true,
            code: 0,
            message: `Make sure that each schedule time follow the gap of duration of ${
              Duration * 5
            } minutes`,
          });
          return false;
        } else if (
          checkAvailability_reslt?.filter(
            (item: any) => item?.available === false
          ).length > 0
        ) {
          setToasterDetails({
            showToast: true,
            code: 0,
            message: `Your selected slots are colliding with other activities. Click booked slot button to see booked slots.`,
          });
          return false;
        } else {
          return true;
        }
      } else if (
        currentQuestion?.fieldType === "TextArea" &&
        currentQuestion?.fieldName === "Duration"
      ) {
        if (parseInt(currentQuestion?.otherAnswer.match(/\d+/)[0]) < 1) {
          setToasterDetails({
            showToast: true,
            code: 0,
            message: `Duration should be greater than 0 minute`,
          });
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  const handleInputChange = (val: string, idx: number, forReplace: boolean) => {
    const updateAnswer = forReplace ? [...replaceQuestions] : [...data];
    console.log("updateAnswerupdateAnswer", updateAnswer);
    if (forReplace) {
      //answer
      updateAnswer[idx].answer = val;
    } else {
      updateAnswer[idx].otherAnswer = val;
    }

    console.log("updateAnswerupdateAnswer23456", updateAnswer);
    forReplace ? setReplaceQuestions(updateAnswer) : setData(updateAnswer);
  };
  const onActivityComplete = () => {
    if (from === "DailyRoutine") {
      navigation.pop(2);
      navigation.navigate(navigationString.DailyRoutine);
      setIsDone(false);
    } else if (from === "Dashboard") {
      navigation.pop(3);
      navigation.navigate(navigationString.PlannerDashboard);
      setIsDone(false);
    } else if (from === "IndependentGoals") {
      navigation.pop(1);
      navigation.navigate(navigationString.IndependentGoalsScreen);
      setIsDone(false);
    } else if (from === "WellnessOverview") {
      navigation.pop(3);
      setIsDone(false);
    } else {
      navigation.goBack();
      setIsDone(false);
    }
  };
  //function handling for selectable items
  const singleSelectedByIndex = (data: any, index: any) => {
    console.log("workingData singleSelectedByIndex data", data, index);
    const listData = [...data];
    let allFalse = listData.map((item: any) => {
      item.isSelected = false;
      return item;
    });

    if (allFalse[index] == undefined) return listData;
    allFalse[index].isSelected = true;
    return listData;
  };

  const renderUpdatedStepOptionsSingle = (
    questionIdx: any,
    itemIndex: any,
    allData: any
  ) => {
    let data = [...allData];
    console.log("data[questionIdx]", data[questionIdx]);
    let updated = singleSelectedByIndex(data[questionIdx].options, itemIndex);
    let workingData: any = [...data];
    workingData[questionIdx].options = updated;
    console.log("ActivityDetailsActivityDetails", ActivityDetails);
    const updatedWorkingData = updateScheduleTimeOptions(
      workingData,
      ActivityDetails,
      selectedSlot
    );

    let dataBasedOnPurpuse =
      route?.params?.purpuse === "Replace" ? workingData : updatedWorkingData;
    return dataBasedOnPurpuse;
  };
  //function handling for selectable items

  const renderComponentUI = (idx: any) => {
    let type = data[idx]?.fieldType;
    let gotPurpuse = route?.params?.purpuse;
    logger("renderComponentUI_______", data[idx]);
    interface ItemProps {
      otherAnswer?: string;
      fieldName?: string;
      question?: string;
      [key: string]: any;
    }

    const extractStartDateSelected: ItemProps[] = [...data]?.filter(
      (item: ItemProps) => item?.fieldName === "StartDate"
    );
    const extractEndDateSelected: ItemProps[] = [...data]?.filter(
      (item: ItemProps) => item?.fieldName === "EndDate"
    );

    const extractDateFromQuestion: string =
      extractStartDateSelected[0]?.question?.match(/date is\s+([\d-]+)/)?.[1] ||
      "";
    const extractEndDateFromQuestion: string =
      extractEndDateSelected[0]?.question?.match(/date is\s+([\d-]+)/)?.[1] ||
      "";

    const isEndDateQuestion = data[idx]?.fieldName === "EndDate";
    // --- Determine picked or fallback values ---
    const startDateSelected: string | undefined =
      extractStartDateSelected?.find((item: ItemProps) => item?.otherAnswer)
        ?.otherAnswer || extractDateFromQuestion;

    const endDateSelected: string | undefined =
      extractEndDateSelected?.find((item: ItemProps) => item?.otherAnswer)
        ?.otherAnswer || extractEndDateFromQuestion;

    const calculateMaxDate = () => {
      const today = moment().startOf("day");
      // --- Case 1: For End Date Field ---
      if (isEndDateQuestion) {
        if (startDateSelected) {
          const start = moment(startDateSelected, "YYYY-MM-DD").startOf("day");
          const minDate = moment.max(start.clone().add(2, "days"), today);
          const maxDate = start.clone().add(12, "months");

          if (endDateSelected && moment(endDateSelected).isBefore(start)) {
            // setToasterDetails({
            //   showToast: true,
            //   code: 0,
            //   message: "End date must be greater than Start date.",
            // });
            return null;
          }
          return {
            minDate,
            maxDate,
          };
          // return {
          //   minDate: minDate.format("YYYY-MM-DD"),
          //   maxDate: maxDate.format("YYYY-MM-DD"),
          // };
        }
        const minDate = today.clone().add(1, "day");
        const maxDate = today.clone().add(12, "months");
        // return {
        //   minDate: minDate.format("YYYY-MM-DD"),
        //   maxDate: maxDate.format("YYYY-MM-DD"),
        // };
        return {
          minDate,
          maxDate,
        };
      }

      // --- Case 2: For Start Date Field ---
      const minDate = today.clone();
      const maxDate = today.clone().add(3, "months");

      if (endDateSelected && moment(endDateSelected).isBefore(today)) {
        // setToasterDetails({
        //   showToast: true,
        //   code: 0,
        //   message: "End date cannot be before today.",
        // });

        return null;
      }

      // return {
      //   minDate: minDate.format("YYYY-MM-DD"),
      //   maxDate: maxDate.format("YYYY-MM-DD"),
      // };
      return {
        minDate,
        maxDate,
      };
    };

    const selectedDateForPicker = (() => {
      const raw = data[idx]?.otherAnswer;
      if (!raw) return new Date();
      // strict parse - expects YYYY-MM-DD
      const m = moment(raw, "YYYY-MM-DD", true);
      if (m.isValid()) return m.toDate();
      // if not valid, try a fallback parse with known formats, then toDate
      const fallback = moment(raw);
      return fallback.isValid() ? fallback.toDate() : new Date();
    })();
    switch (type) {
      case fieldType?.timePicker:
        return (
          <FlatList
            keyExtractor={(item, index) => "key" + index}
            data={data[idx]?.options}
            contentContainerStyle={styles.flatListContent}
            renderItem={({ item, index }) => {
              return (
                <View>
                  <TouchableOpacity
                    onPress={() => handleDatePickerVisibility(index, true)}
                    style={{
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
                    }}
                  >
                    <Text
                      style={{
                        color: colors.SurfCrest,
                        fontSize: moderateScale(14),
                      }}
                    >
                      {`Schedule time ${item?.optionValue}`}
                    </Text>
                    <Image
                      source={imagePath?.dropdown}
                      tintColor={true ? colors.SurfCrest : colors.royalOrange}
                    />
                  </TouchableOpacity>
                  <DatePicker
                    modal
                    open={showDatePicker[index]}
                    date={
                      item?.optionValue
                        ? moment(item?.optionValue, "HH:mm").toDate()
                        : new Date()
                    }
                    mode="time"
                    onConfirm={(date) => {
                      let shallowCopy = [...data];
                      shallowCopy[idx].options[index].optionValue =
                        moment(date).format("hh:mm A");
                      console.log("shallowCopy__", shallowCopy);
                      setData(shallowCopy);
                      handleDatePickerVisibility(index, false);
                    }}
                    title={`Schedule time ${item?.optionValue}`}
                    onCancel={() => {
                      handleDatePickerVisibility(index, false);
                    }}
                  />
                </View>
              );
            }}
          />
        );

      case fieldType?.datePicker:
        return (
          <DatePickerInput
            showDatePicker={isDatePicker}
            IconTintColor
            setShowDatePicker={setIsDatePicker}
            ShowDate={
              data[idx]?.otherAnswer
                ? moment(data[idx]?.otherAnswer, "YYYY-MM-DD", true).isValid()
                  ? moment(data[idx]?.otherAnswer, "YYYY-MM-DD").format(
                      "YYYY-MM-DD"
                    )
                  : data[idx]?.otherAnswer
                : "Select date"
            }
            minimumDate={
              editingFor === Enum_editingFor?.GOALS &&
              calculateMaxDate()?.minDate
            }
            MaxDate={
              editingFor === Enum_editingFor?.GOALS &&
              calculateMaxDate()?.maxDate
            }
            selectedDate={selectedDateForPicker}
            setSelectedDate={(date: any) => {
              let dateFormat = moment(date).format(YYYY_MM_DD);
              setIsDatePicker(false);
              handleInputChange(dateFormat, idx, false);
            }}
            isMaxDate={editingFor === Enum_editingFor?.GOALS}
          />
        );
      case fieldType?.singleSelect:
        return (
          <FlatList
            keyExtractor={(item, index) => "key" + index}
            data={gotPurpuse ? data[idx]?.options : data[idx]?.stepOptions}
            contentContainerStyle={styles.flatListContent}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  console.log("item____", item, data);
                  setData(renderUpdatedStepOptionsSingle(idx, index, data));
                }}
              >
                <View
                  style={[
                    styles.optionBox,
                    item?.isSelected && styles.optionBoxSelected,
                  ]}
                >
                  <Text style={styles.optionValue}>
                    {capitalizeFirstLetter(item?.optionValue)}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        );
      case fieldType?.slider:
        return (
          <View style={styles.sliderView}>
            <SliderView
              minShow
              onValueChange={(val: any) => {
                let normalValue = Number.parseFloat(val).toFixed(0);
                handleInputChange(normalValue.toString(), idx, false);
              }}
              isMaxVal
              maxVal={convertToMinutes(ActivityDetails?.duration)}
            />
          </View>
        );
      case fieldType?.scale5:
        return (
          <View style={styles.sliderView}>
            <SliderView
              minShow
              onValueChange={(val: any) => {
                let normalValue = Number.parseFloat(val).toFixed(0);
                handleInputChange(normalValue.toString(), idx, false);
              }}
              isMaxVal
              maxVal={5}
              usedInActivityFeedback={true}
            />
          </View>
        );
      case fieldType?.textArea:
        if (data[idx]?.fieldName === "Duration") {
          return (
            <>
              <TimePickerMinutes
                value={
                  data[idx]?.otherAnswer ??
                  parseInt(ActivityDetails?.duration?.match(/\d+/)[0]) / 5
                } //IN MINUTES we are handling the DURATION ui 1=5mins so whatever the value is we need to devide it by 5 for ui rendering
                onChangesTime={(val: any) => {
                  let value = val?.toString();
                  handleInputChange(value, idx, false);
                }}
                showMin
              />
            </>
          );
        } else {
          return (
            <TextInputStretch
              newSpecInputView={styles.textInputStretch}
              value={data[idx]?.otherAnswer}
              onChangeText={(val: any) => handleInputChange(val, idx, false)}
              newSpecInput={styles.newSpecInput}
            />
          );
        }
      case fieldType?.multiSelect:
        return (
          <FlatList
            keyExtractor={(item, index) => "key" + index}
            data={data[idx]?.stepOptions}
            renderItem={({ item, index }: any) => {
              console.log("item", item);
              return (
                <>
                  {item?.optionValue !== "Other" && (
                    <TouchableOpacity
                      style={{ margin: moderateScale(10) }}
                      onPress={() => {
                        setData(
                          renderUpdatedStepOptions(
                            idx,
                            index,
                            data,
                            item?.optionValue
                          )
                        );
                      }}
                    >
                      <View
                        style={[
                          styles.optionBox,
                          item?.isSelected && styles.optionBoxSelected,
                        ]}
                      >
                        <Text style={styles.optionValue}>
                          {capitalizeFirstLetter(item?.optionValue)}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </>
              );
            }}
          />
        );

      default:
        return (
          <View>
            <Text>UI Not Found</Text>
          </View>
        );
    }
  };
  //for replace activities handling
  const [followUpQuestions, setFollowUpQuestions] = useState<any>({});
  const [isFollowUpQuestionSelected, setIsFollowUpQuestionSelected] =
    useState<boolean>(false);
  const extractFollowUpQuestion = (options: any) => {
    return options
      .filter((option: any) => option.isSelected && option.followUp)
      .map((option: any) => option.followUp);
  };
  const extractFeedbackData = (
    feedbackQuestions: any[],
    followUpQuestions: any[]
  ) => {
    return {
      id: ActivityDetails.id,
      userId: route?.params?.userId,
      aiProvider: aiProvider?.Goals,
      linkRequired: false,
      isSkip: true,
      categoryName: feedbackQuestions[0]?.category || "",
      feedbackQuestions: feedbackQuestions
        .map((fq) => {
          return {
            feedbackQuestion: fq.question,
            options: fq.options
              .filter((opt: any) => opt.isSelected)
              .map((opt: any) => opt.option),
            followUpQuestions: fq.options
              .filter((opt: any) => opt.isSelected && opt.followUp)
              .map((opt: any) => {
                return {
                  question: opt.followUp.question,
                  options:
                    followUpQuestions
                      .find((fuq) => fuq.question === opt.followUp.question)
                      ?.options.filter((fopt: any) => fopt.isSelected)
                      .map((fopt: any) => fopt.option) || [],
                };
              }),
            answer: fq.answer ?? "",
          };
        })
        .filter((fq) => fq.options.length > 0), // Remove questions without selected options
    };
  };

  const call_EditActivityDetailsByIdApi = async (req: any) => {
    setLoading(true);
    try {
      let requestbody = {
        ...req,
      };
      console.log("requestbody_call_EditActivityDetailsByIdApi", requestbody);
      // return;

      await allActions.dashboardAction
        .EditActivityDetailsByIdApi(
          dispatch,
          requestbody,
          "call_EditActivityDetailsByIdApi"
        )
        .then((response: any) => {
          setLoading(false);
          if (response.statusCode == 200) {
            setToasterDetails({
              showToast: true,
              code: 1,
              message: response?.message,
            });
            setIsDone(true);
          } else {
            setToasterDetails({
              showToast: true,
              code: 0,
              message: response?.message,
            });
          }
        })
        .catch((err) => {
          setToasterDetails({
            showToast: true,
            code: 0,
            message: err?.message,
          });
        });
    } catch (error) {
      setToasterDetails({
        showToast: true,
        code: 0,
        message: error,
      });
      setLoading(false);
    }
  };
  const call_EditGoalDetailsByIdAPI = async (req: any) => {
    setLoading(true);
    try {
      let requestbody = {
        ...req,
      };
      await allActions.dashboardAction
        .EditGoalDetailsByIdAPI(
          dispatch,
          requestbody,
          "call_EditActivityDetailsByIdApi"
        )
        .then((response: any) => {
          setLoading(false);
          if (response.statusCode == 200) {
            setToasterDetails({
              showToast: true,
              code: 1,
              message: response?.message,
            });
            setIsDone(true);
          } else {
            setToasterDetails({
              showToast: true,
              code: 0,
              message: response?.message,
            });
          }
        })
        .catch((err) => {
          console.log("______dfghjklfghjk", err);
          setToasterDetails({
            showToast: true,
            code: 0,
            message: "Oops! something went wrong.",
          });
          setLoading(false);
        });
    } catch (error) {
      console.log("______jfjfhskjsbvkjsbvjksbvkjvbksjvb");
      setToasterDetails({
        showToast: true,
        code: 0,
        message: error,
      });
      setLoading(false);
    }
  };

  //for replace activities handling
  const renderComponentUIforReplace = (idx: any) => {
    console.log("followUpQuestions", followUpQuestions);
    return (
      <FlatList
        keyExtractor={(item, index) => "key" + index}
        data={
          isFollowUpQuestionSelected &&
          followUpQuestions[idx]?.options?.length !== 0
            ? followUpQuestions[idx]?.options
            : replaceQuestions[idx]?.options
        }
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              console.log("item____", item, data);
              if (isFollowUpQuestionSelected) {
                setFollowUpQuestions(
                  renderUpdatedStepOptionsSingle(idx, index, followUpQuestions)
                );
              } else {
                setReplaceQuestions(
                  renderUpdatedStepOptionsSingle(idx, index, replaceQuestions)
                );
              }
            }}
          >
            <View
              style={[
                styles.optionBox,
                item?.isSelected && styles.optionBoxSelected,
              ]}
            >
              <Text style={styles.optionValue}>
                {capitalizeFirstLetter(
                  !isFollowUpQuestionSelected ? item?.option : item.option
                )}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  };
  function resetFollowUpSelections(questions: any) {
    return questions.map((q: any) => ({
      ...q,
      options: q.options.map((option: any) => ({
        ...option,
        followUp: option.followUp
          ? {
              ...option.followUp,
              options: option.followUp.options
                ? option.followUp.options.map((followUpOption: any) => ({
                    ...followUpOption,
                    isSelected: false,
                  }))
                : [],
            }
          : option.followUp,
      })),
    }));
  }
  const isFieldNameDuration = data[index]?.fieldName === "Duration";
  return (
    <ScreenWrapper
      statusBarColor={isDone ? colors?.darkthemColor : colors?.pbRGB}
    >
      <ImageBackground
        source={
          isDone ? imagePath?.FeedbackDone : imagePath?.ActivityFeedbackBg
        }
        style={styles?.bgImage}
      >
        {!loading ? (
          <>
            {isDone ? (
              <NewActivityDone
                onPress={() => onActivityComplete()}
                from={from}
                purpuse={purpuse}
              />
            ) : (
              <>
                <CommonHeader
                  headerName={
                    editingFor === Enum_editingFor?.GOALS
                      ? "Edit or replace goal"
                      : "Edit or replace activity"
                  }
                  onBackPress={backFunction}
                  mainContainer={styles.headerContainer}
                  iconContainer={styles.iconContainer}
                />
                <KeyboardAwareScrollView
                  scrollEnabled={
                    data[index]?.fieldName === "Duration" ? false : true
                  }
                  showsVerticalScrollIndicator={false}
                  style={styles.scrollView}
                  contentContainerStyle={{
                    paddingBottom: moderateScale(40),
                  }}
                >
                  <View style={styles.container}>
                    {isFieldNameDuration ? (
                      <LotusIcon
                        width={moderateScale(75)}
                        height={moderateScale(75)}
                      />
                    ) : (
                      <LotusIcon />
                    )}
                  </View>
                  {purpuse == "Edit" && (
                    <Text
                      style={[
                        styles.questionText,
                        {
                          fontSize: isFieldNameDuration
                            ? textScale(23)
                            : textScale(25),
                          fontWeight: "500",
                        },
                      ]}
                    >
                      {purpuse == "Edit"
                        ? data[index]?.question
                        : data[index]?.stepDescription}
                    </Text>
                  )}
                  {purpuse == "Replace" && (
                    <Text style={styles.questionText}>
                      {!isFollowUpQuestionSelected
                        ? replaceQuestions[index]?.question
                        : followUpQuestions[index]?.question}
                    </Text>
                  )}
                  {purpuse === "Edit" && renderComponentUI(index)}
                  {purpuse === "Replace" && renderComponentUIforReplace(index)}
                  {purpuse === "Replace" &&
                    Object.keys(followUpQuestions).length == 0 &&
                    isFollowUpQuestionSelected && (
                      <TextInputStretch
                        newSpecInputView={styles.textInputStretch}
                        value={replaceQuestions[0]?.otherAnswer}
                        onChangeText={(val: any) =>
                          handleInputChange(val, 0, true)
                        }
                        newSpecInput={styles.newSpecInput}
                      />
                    )}
                  {editingFor !== Enum_editingFor?.GOALS &&
                    index === data.length - 1 && (
                      <CommonButton
                        btnName={"Check booked slots"}
                        mainContainer={{
                          width: "auto",
                          height: moderateScale(56),
                          marginTop: moderateScale(20),
                          marginBottom: moderateScale(10),
                          backgroundColor: colors.royalOrange,
                        }}
                        btnNameStyle={{
                          color: colors.prussianBlue,
                        }}
                        onPress={() => {
                          setShowBookedSlots(true);
                        }}
                      />
                    )}
                  <CommonButton
                    onPress={nextFunction}
                    btnName={
                      index === data.length - 1
                        ? strings?.submit
                        : strings?.NEXT
                    }
                    mainContainer={styles.commonButtonContainer}
                  />
                </KeyboardAwareScrollView>
              </>
            )}
          </>
        ) : (
          <CommonLoader />
        )}
      </ImageBackground>
      {/* <Toast /> */}
      {toasterDetails?.showToast && (
        <ToastApiResponse
          data={toasterDetails}
          setToasterDetails={setToasterDetails}
          code={toasterDetails?.code}
          message={toasterDetails?.message}
        />
      )}
      <LogoutModal
        isVisible={deleteAccountAlert}
        title={"Are you sure?"}
        description={"you want to discard these changes?"}
        onNo={() => {
          setDeleteAccountAlert(false);
        }}
        onYes={() => {
          navigation?.goBack();
        }}
        hideAlert={() => setDeleteAccountAlert(false)}
        textStyle={{ width: moderateScale(270) }}
        buttonTexts={["Cancel", "Yes"]}
      />
      <BookedSlotsModal
        isVisible={showBookedSlots}
        title={"Already booked slots."}
        description={"Viewable only"}
        onNo={() => {
          setShowBookedSlots(false);
        }}
        onYes={() => {
          setShowBookedSlots(false);
        }}
        hideAlert={() => setShowBookedSlots(false)}
        textStyle={{ width: moderateScale(270) }}
        buttonTexts={["Close"]}
        bookedSlotsData={bookedSlotsData}
      />
    </ScreenWrapper>
  );
};
export default EditReplaceActivies;
