import moment from "moment";
import { fieldType } from "../../../constant/AllGlobalNameConstant";
import { strings } from "../../../constant/strings";
import { singleSelectedByIndex } from "../../OnBoarding/AIGeneration/CommonScreen/Helper/Helper";

export const updateAnswerRequest = (data: any): any => {
  console.log("check_data_after_all_response_submited_create_payload", data);
  // Helper function to get selected options
  const getSelectedOptionIds = (step: any): any =>
    step?.stepOptions
      ?.filter((option: any) => option?.isSelected)
      ?.map((option: any) => option?.id) || [];

  // Helper function to check if "Add Specifications" is selected
  const isAddSpecificationsSelected = (step: any): any =>
    step.stepOptions?.some(
      (option: any) =>
        option?.optionValue === strings?.addSpecifications && option?.isSelected
    );

  // Main logic
  const result: any = {
    renderRequest: data
      .filter(
        (item: any, index: any) =>
          !item.isAIGenerated || item?.isAIGenerated === undefined
      )
      .map((step: any, index: any): any => {
        console.log("check_data_after_all_response_submited_ste_and_index", {
          step,
          index,
        });
        const addSpecificationsSelected: any =
          isAddSpecificationsSelected(step);
        if (
          [
            fieldType?.multiSelect,
            fieldType?.multiSelectLine,
            fieldType?.starMultiSelect,
            fieldType?.circleMultiSelect,
            fieldType?.multiSelectBox,
            fieldType?.stretchMultiSelect,
            fieldType?.dropdown,
          ].includes(step?.fieldType)
        ) {
          // Handle multi-select types
          return {
            activitiesFeedbackStepId: step?.id,
            activitiesFeedbackStepOptionId: getSelectedOptionIds(step),
            answer: addSpecificationsSelected
              ? data[index]?.otherAnswer || ""
              : "",
            isStepSkip: false,
          };
        } else if (
          [
            fieldType?.singleSelect,
            fieldType?.numberSelect,
            fieldType?.circleSelect,
            fieldType?.bubbleSelect,
            fieldType?.singleCheck,
            fieldType?.levelSelect,
            fieldType?.desAscending,
            fieldType?.frequencySelect,
            fieldType?.singleDropdown,
            fieldType?.waveSelect,
          ].includes(step?.fieldType)
        ) {
          return {
            activitiesFeedbackStepId: step?.id,
            activitiesFeedbackStepOptionId: [
              getSelectedOptionIds(step)[0] || null,
            ],
            answer: addSpecificationsSelected
              ? data[index]?.otherAnswer || ""
              : "",
            isStepSkip: false,
          };
        } else if (
          [
            fieldType?.textArea,
            fieldType?.datePicker,
            fieldType?.feelingSelect,
            fieldType?.simleSlider,
            fieldType?.moodSelect,
            fieldType?.slider,
            fieldType?.scale5,
          ].includes(step?.fieldType)
        ) {
          // Handle textArea, datePicker, feelingSelect
          return {
            activitiesFeedbackStepId: step?.id,
            activitiesFeedbackStepOptionId: null,
            answer: step?.otherAnswer || "",
            isStepSkip: false,
          };
        }
        return null;
      })
      .filter((step: any): any => {
        // Safely check the conditions to avoid runtime errors
        const hasOptionId =
          Array.isArray(step?.activitiesFeedbackStepOptionId) &&
          step?.activitiesFeedbackStepOptionId.length > 0;
        const hasAnswer =
          typeof step?.answer === "string" && step?.answer.trim() !== "";
        return step && (hasOptionId || hasAnswer);
      }),
    aiGenerateQuestionsResponse: data.filter(
      (item: any, index: any) => item.isAIGenerated
    ),
  };
  console.log("requestbody___requestBody_____result", result);
  const { aiGenerateQuestionsResponse, renderRequest } = result;
  if (aiGenerateQuestionsResponse?.length === 0) {
    return { renderRequest };
  } else {
    return result;
  }
};

export const renderUpdatedStepOptionsSingle = (
  questionIdx: any,
  itemIndex: any,
  allData: any
) => {
  let data = [...allData];
  let updated = singleSelectedByIndex(data[questionIdx].stepOptions, itemIndex);
  let workingData: any = [...data];
  workingData[questionIdx].stepOptions = updated;
  return workingData;
};

export const getTimeFallValue = (item: any) => {
  if (item.isBefore(moment("06:00 AM", "hh:mm A"))) {
    return "night";
  } else if (item.isBefore(moment("12:00 PM", "hh:mm A"))) {
    return "morning";
  } else if (item.isBefore(moment("05:00 PM", "hh:mm A"))) {
    return "afternoon";
  } else if (item.isBefore(moment("09:00 PM", "hh:mm A"))) {
    return "evening";
  } else {
    return "night";
  }
};
