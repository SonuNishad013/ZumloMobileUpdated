import { fieldType } from "../../../../constant/AllGlobalNameConstant";
import { multiSelectedByIndex } from "../../../../constant/CustomHook/CommonFunctions";
import { strings } from "../../../../constant/strings";
import { singleSelectedByIndex } from "../../../OnBoarding/AIGeneration/CommonScreen/Helper/Helper";

export const renderUpdatedStepOptions = (
  questionIdx: any,
  itemIndex: any,
  allData: any
) => {
  let data = [...allData];
  let updated = multiSelectedByIndex(data[questionIdx].stepOptions, itemIndex);
  let workingData: any = [...data];
  workingData[questionIdx].stepOptions = updated;
  return workingData;
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
  // comment
  let data = [...allData];
  let updated = singleSelectedByIndex(data[questionIdx].stepOptions, itemIndex);
  let workingData: any = [...data];
  workingData[questionIdx].stepOptions = updated;
  return workingData;
};
export const showOtherInput = (idx: any, OtherShowData: any) => {
  let updatedOtherField: any = [...OtherShowData];
  updatedOtherField[idx].otherFieldCondition =
    !updatedOtherField[idx]?.otherFieldCondition;
  return updatedOtherField;
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
    };
  });
};
export const updateAnswerRequest = (data: any) => {
  const result = {
    renderRequest: data
      .map((step: any, index: any) => {
        if (step?.fieldType === fieldType?.multiSelect) {
          const addSpecificationsSelected = step.stepOptions?.some(
            (option: any) =>
              option?.optionValue === strings?.addSpecifications &&
              option?.isSelected
          );
          return {
            preferenceStepId: step?.stepID,
            preferenceOptionId: step?.stepOptions
              .filter((option: any) => option?.isSelected)
              .map((option: any) => option?.id),
            answer: addSpecificationsSelected
              ? data[index]?.otherAnswer || ""
              : "",
            isStepSkip: false,
          };
        } else if (step?.fieldType === fieldType?.singleSelect) {
          const addSpecificationsSelected = step.stepOptions?.some(
            (option: any) =>
              option?.optionValue === strings?.addSpecifications &&
              option?.isSelected
          );
          const selectedOptionId =
            step?.stepOptions
              ?.filter((option: any) => option?.isSelected)
              ?.map((option: any) => option?.id)[0] || null;
          return {
            preferenceStepId: step?.stepID,
            preferenceOptionId: [selectedOptionId],
            answer: addSpecificationsSelected
              ? data[index]?.otherAnswer || ""
              : "",
            isStepSkip: false,
          };
        } else if (step?.fieldType === fieldType?.dropdown) {
          const addSpecificationsSelected = step.stepOptions?.some(
            (option: any) =>
              option?.optionValue === strings?.addSpecifications &&
              option?.isSelected
          );
          const selectedOptionId =
            step?.stepOptions
              ?.filter((option: any) => option?.isSelected)
              ?.map((option: any) => option?.id)[0] || null;
          return {
            preferenceStepId: step?.stepID,
            preferenceOptionId: [selectedOptionId],
            answer: addSpecificationsSelected
              ? data[index]?.otherAnswer || ""
              : "",
            isStepSkip: false,
          };
        } else if (step?.fieldType === fieldType?.textArea) {
          return {
            preferenceStepId: step?.stepID,
            preferenceOptionId: null,
            answer: step?.otherAnswer,
            isStepSkip: false,
          };
        }
        return null;
      })
      .filter(
        (step: any) => step
        // &&
        //   (step?.preferenceOptionId?.length >= 0 || step?.answer?.trim() !== "")
      ),
  };

  return result;
};
export const updateOptionsWithSelection = (
  firstArray: any[],
  secondArray: any[]
) => {
  return secondArray.map((step: any) => {
    const matchingFirstArrayStep = firstArray.find(
      (item: any) =>
        item?.stepId === step?.stepID || item?.stepId === step?.stepId
    );
    if (matchingFirstArrayStep) {
      const updatedStepOptions = step?.stepOptions?.map((option: any) => {
        const isSelected = matchingFirstArrayStep?.stepOption?.some(
          (answer: any) => answer?.optionId === option?.id
        );
        return { ...option, isSelected };
      });
      const otherValue = matchingFirstArrayStep.stepOption.find(
        (answer: any) => answer?.optionValue === strings?.addSpecifications
      )?.answer;
      const isOther = matchingFirstArrayStep.stepOption.some(
        (answer: any) => answer?.optionValue === strings?.addSpecifications
      )
        ? true
        : false;
      const isTextArea =
        matchingFirstArrayStep.fieldType == fieldType?.textArea;
      // const isTextArea =[fieldType?.textArea].includes( matchingFirstArrayStep.fieldType);

      const textData = matchingFirstArrayStep.stepOption[0]?.answer;
      // console.log(first)
      return {
        ...step,
        otherAnswer: isTextArea ? textData : otherValue,
        otherFieldCondition: isOther,
        stepOptions: updatedStepOptions,
        isOther: isOther,
      };
    }
    return step;
  });
};

// Future use

// export const updateAnswer_apiStepOptions = (data: any, otherValue: any) => {
//   const result = {
//     renderRequest: data
//       .map((step: any, index: any) => {
//         if (step?.fieldType === fieldType?.multiSelect) {
//           const addSpecificationsSelected = step.stepOptions?.some(
//             (option: any) =>
//               option?.optionValue === strings?.addSpecifications &&
//               option?.isSelected
//           );
//           return {
//             preferenceStepId: step?.stepID,
//             preferenceOptionId: step?.stepOptions
//               .filter((option: any) => option?.isSelected)
//               .map((option: any) => option?.id),
//             answer: addSpecificationsSelected
//               ? otherValue[index]?.otherAnswer || ""
//               : "",
//             isStepSkip: false,
//           };
//         } else if (step?.fieldType === fieldType?.singleSelect) {
//           const addSpecificationsSelected = step.stepOptions?.some(
//             (option: any) =>
//               option?.optionValue === strings?.addSpecifications &&
//               option?.isSelected
//           );
//           const selectedOptionId =
//             step?.stepOptions
//               ?.filter((option: any) => option?.isSelected)
//               ?.map((option: any) => option?.id)[0] || null;
//           return {
//             preferenceStepId: step?.stepID,
//             preferenceOptionId: [selectedOptionId],
//             answer: addSpecificationsSelected
//               ? otherValue[index]?.otherAnswer || ""
//               : "",
//             isStepSkip: false,
//           };
//         } else if (step?.fieldType === fieldType?.dropdown) {
//           const addSpecificationsSelected = step.stepOptions?.some(
//             (option: any) =>
//               option?.optionValue === strings?.addSpecifications &&
//               option?.isSelected
//           );
//           const selectedOptionId =
//             step?.stepOptions
//               ?.filter((option: any) => option?.isSelected)
//               ?.map((option: any) => option?.id)[0] || null;
//           return {
//             preferenceStepId: step?.stepID,
//             preferenceOptionId: [selectedOptionId],
//             answer: addSpecificationsSelected
//               ? otherValue[index]?.otherAnswer || ""
//               : "",
//             isStepSkip: false,
//           };
//         } else if (step?.fieldType === fieldType?.textArea) {
//           return {
//             preferenceStepId: step?.stepID,
//             preferenceOptionId: null,
//             answer: otherValue[index]?.otherAnswer || "",
//             isStepSkip: false,
//           };
//         }
//         return null;
//       })
//       .filter(
//         (step: any) =>
//           step &&
//           (step?.preferenceOptionId?.length > 0 || step?.answer?.trim() !== "")
//       ),
//   };

//   return result;
// };
