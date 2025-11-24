import {
  codeName,
  fieldType,
} from "../../../../constant/AllGlobalNameConstant";
import {
  multiSelectedByIndex,
  singleSelectedByIndex,
} from "../../../../constant/CustomHook/CommonFunctions";
import { strings } from "../../../../constant/strings";

export const headerData = async (item: any) => {
  switch (item?.codeName) {
    case codeName?.Physical_Health:
      return codeName?.PhysicalHealthHeaders;
    case codeName?.Mental_Health_History:
      return codeName?.MentalHealthHistoryHeaders;
    case codeName?.Medication_and_Treatment:
      return codeName?.MedicationandTreatmentHeaders;
    case codeName?.Emotional_and_Psychological_Profile:
      return codeName?.EmotionalAndPsychologicalProfileHeaders;
    case codeName?.Symptom_Tracking:
      return codeName?.SymptomTrackingHeaders;
    default:
      return codeName?.SymptomTrackingHeaders;
  }
};

export const renderUpdatedStepOptions = (
  questionIdx: any,
  itemIndex: any,
  allData: any,
  value: any
) => {
  let isNone = allData[questionIdx]?.stepOptions?.some(
    (item: any) =>
      item?.optionValue.toLowerCase() == strings?.none && item?.isSelected
  );
  if (isNone) {
    let data = [...allData];
    let updated = singleSelectedByIndex(
      data[questionIdx].stepOptions,
      itemIndex
    );
    let workingData: any = [...data];
    workingData[questionIdx].stepOptions = updated;
    return workingData;
  } else if (value?.toLowerCase() == strings?.none) {
    let data = [...allData];
    let updated = singleSelectedByIndex(
      data[questionIdx].stepOptions,
      itemIndex
    );
    let workingData: any = [...data];
    workingData[questionIdx].stepOptions = updated;
    return workingData;
  } else {
    let data = [...allData];
    let updated = multiSelectedByIndex(
      data[questionIdx].stepOptions,
      itemIndex
    );
    let workingData: any = [...data];
    workingData[questionIdx].stepOptions = updated;
    return workingData;
  }
};
export const UpdatedStepOtherShow = (
  questionIdx: any,
  itemIndex: any,
  allData: any
) => {
  let data = [...allData];
  data[questionIdx].otherFieldCondition =
    !data[questionIdx]?.otherFieldCondition;
  data[questionIdx].isOther = !data[questionIdx]?.isOther;
  let updated = multiSelectedByIndex(data[questionIdx].stepOptions, itemIndex);
  data[questionIdx].stepOptions = updated;
  return data;
};
export const renderUpdatedStepOptionsSingle = (
  questionIdx: any,
  itemIndex: any,
  allData: any
) => {
  let data = [...allData];
  let updated = singleSelectedByIndex(
    data[questionIdx]?.stepOptions,
    itemIndex,
    data[questionIdx]?.fieldType
  );
  let workingData: any = [...data];
  workingData[questionIdx].stepOptions = updated;
  return workingData;
};
export const updateAnswerRequest = (data: any): any => {
  const getSelectedOptionIds = (step: any): any =>
    step?.stepOptions
      ?.filter((option: any) => option?.isSelected)
      ?.map((option: any) => option?.id) || [];
  const isAddSpecificationsSelected = (step: any): any =>
    step.stepOptions?.some(
      (option: any) =>
        option?.optionValue === strings?.addSpecifications && option?.isSelected
    );

  const result: any = {
    renderRequest: data
      .map((step: any, index: any): any => {
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
          return {
            medicalHistoryStepId: step?.stepId,
            medicalHistoryStepAnswersId: !step?.previousAnswerId
              ? 0
              : step?.previousAnswerId,
            medicalHistoryOptionId: getSelectedOptionIds(step),
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
            fieldType?.frequencyCurve,
            fieldType?.singleSelectLine,
          ].includes(step?.fieldType)
        ) {
          return {
            medicalHistoryStepId: step?.stepId,
            medicalHistoryStepAnswersId: !step?.previousAnswerId
              ? 0
              : step?.previousAnswerId,

            medicalHistoryOptionId: getSelectedOptionIds(step),
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
          ].includes(step?.fieldType)
        ) {
          return {
            medicalHistoryStepId: step?.stepId,
            medicalHistoryStepAnswersId: !step?.previousAnswerId
              ? 0
              : step?.previousAnswerId,
            medicalHistoryOptionId: null,
            answer: step?.otherAnswer || " ",
            isStepSkip: false,
          };
        }
        return null;
      })
      .filter((step: any): any => {
        const hasOptionId =
          Array.isArray(step?.medicalHistoryOptionId) &&
          step?.medicalHistoryOptionId.length >= 0;
        const hasAnswer =
          typeof step?.answer === strings?.string && step?.answer;
        return step && (hasOptionId || hasAnswer);
      }),
  };

  return result;
};

export const addOtherFieldConditionAndAnswer = (stepsArray: any) => {
  return stepsArray.map((step: any) => {
    const addSpecificationsSelected = step.stepOptions?.some(
      (option: any) => option?.optionValue === strings?.addSpecifications
    );
    return {
      ...step,
      otherAnswer: "",
      otherFieldCondition: false,
      addOther: addSpecificationsSelected ? true : false,
      isOther: false,
      previousId: null,
    };
  });
};

export const updateOptionsWithSelection = (
  firstArray: any[],
  secondArray: any[]
) => {
  return secondArray?.map((step: any) => {
    const matchingFirstArrayStep = firstArray?.find(
      (item: any) => item?.stepId === step?.stepId
    );
    if (matchingFirstArrayStep) {
      const updatedStepOptions = step?.stepOptions?.map((option: any) => {
        const isSelected = matchingFirstArrayStep?.stepOption?.some(
          (answer: any) => answer?.optionId === option?.id
        );
        return { ...option, isSelected };
      });
      const otherValue = matchingFirstArrayStep?.stepOption.find(
        (answer: any) => answer?.optionValue === strings?.addSpecifications
      )?.answer;
      const isOther = matchingFirstArrayStep?.stepOption.some(
        (answer: any) => answer?.optionValue === strings?.addSpecifications
      )
        ? true
        : false;
      const isTextArea = [
        fieldType?.textArea,
        fieldType?.datePicker,
        fieldType?.feelingSelect,
        fieldType?.simleSlider,
        fieldType?.moodSelect,
      ].includes(matchingFirstArrayStep?.fieldType);

      const textData = matchingFirstArrayStep?.stepOption[0]?.answer;
      const stepAnswerId = matchingFirstArrayStep?.stepOption[0]?.stepAnswerId;

      return {
        ...step,
        otherAnswer: isTextArea ? textData : otherValue,
        otherFieldCondition: isOther,
        stepOptions: updatedStepOptions,
        isOther: isOther,
        previousAnswerId: stepAnswerId,
      };
    }
    return step;
  });
};
