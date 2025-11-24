import { allStepName, fieldType } from "../constant/AllGlobalNameConstant";
import colors from "../constant/colors";
import {
  multiSelectedByIndex,
  singleSelectedByIndex,
} from "../constant/CustomHook/CommonFunctions";
import { moderateScale, textScale } from "../constant/responsiveStyle";
import { strings } from "../constant/strings";

export const renderUpdatedStepOptions = (
  questionIdx: any,
  itemIndex: any,
  allData: any,
  value: any
) => {
  let isNone = allData[questionIdx]?.stepOptions?.some(
    (item: any) => item?.optionValue.toLowerCase() == "none" && item?.isSelected
  );
  if (isNone) {
    console.log("check");
    let data = [...allData];
    let updated = singleSelectedByIndex(
      data[questionIdx].stepOptions,
      itemIndex
    );
    let workingData: any = [...data];
    workingData[questionIdx].stepOptions = updated;
    return workingData;
  } else if (value?.toLowerCase() == "none") {
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

// export const addOtherFieldConditionAndAnswer = (stepsArray: any) => {
//   console.log("stepsArray-->>", stepsArray);
//   return stepsArray?.steps?.map((step: any) => {
//     const addSpecificationsSelected = step.stepOptions?.some(
//       (option: any) => option?.optionValue === strings?.addSpecifications
//     );
//     const hasAnswer = step?.answer?.trim() !== "";
//     return {
//       ...step,
//       otherAnswer: step?.answer || "",
//       otherFieldCondition: addSpecificationsSelected && hasAnswer,
//       addOther: addSpecificationsSelected,
//       isOther: addSpecificationsSelected && hasAnswer,
//     };
//   });
// };
// export const addOtherFieldConditionAndAnswer = (stepsArray: any) => {
//   console.log("stepsArray-->>", stepsArray);
//   return stepsArray?.steps?.map((step: any) => {
//     const addSpecificationsSelected = step?.stepOptions?.some(
//       (option: any) => option?.optionValue === strings?.addSpecifications
//     );
//     const hasAnswer = step?.answer?.trim() !== "";
//     return {
//       ...step,
//       otherAnswer: step?.answer || "",
//       otherFieldCondition: addSpecificationsSelected && hasAnswer,
//       addOther: addSpecificationsSelected,
//       isOther: addSpecificationsSelected && hasAnswer,
//       stepOptions: step?.stepOptions?.map(
//         (item: any) => (
//           console.log("item----isSelected->", item),
//           {
//             ...item,
//             isSelected:
//               item?.optionValue === strings?.addSpecifications &&
//               addSpecificationsSelected &&
//               hasAnswer
//                 ? true
//                 : item?.isSelected,
//           }
//         )
//       ),
//     };
//   });
// };

export const addOtherFieldConditionAndAnswer = (stepsArray: any) => {
  console.log("stepsArray-->>", stepsArray);
  return stepsArray?.steps?.map((step: any) => {
    const addSpecificationsSelected = step?.stepOptions?.some(
      (option: any) => option?.optionValue === strings?.addSpecifications
    );
    const hasAnswer = step?.answer?.trim() !== "";
    const verticalScaleTrue = (type: any) => {
      if (type === fieldType?.scaleSliderSelect) {
        const hasSelectedOption = step?.stepOptions?.some(
          (item: any) => item?.isSelected
        );
        return step?.stepOptions?.map((item: any, index: any) => {
          return {
            ...item,
            isSelected: hasSelectedOption
              ? item?.isSelected
              : index == 0
              ? true
              : false,
          };
        });
      } else {
        return step?.stepOptions?.map((item: any) => {
          return {
            ...item,
            isSelected:
              item?.optionValue === strings?.addSpecifications &&
              addSpecificationsSelected &&
              hasAnswer
                ? true
                : item?.isSelected,
          };
        });
      }
    };

    return {
      ...step,
      otherAnswer: step?.answer || "",
      otherFieldCondition: addSpecificationsSelected && hasAnswer,
      addOther: addSpecificationsSelected,
      isOther: addSpecificationsSelected && hasAnswer,
      stepOptions: verticalScaleTrue(step?.fieldType),
    };
  });
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
  let data: any = [...allData];
  console.log("-----allData-data>", data);
  console.log("-----allData-questionIdx>", questionIdx);
  console.log("-----allData-itemIndex>", itemIndex);
  console.log("-----allData-allData>", allData);
  let updated = singleSelectedByIndex(
    data[questionIdx]?.stepOptions,
    itemIndex,
    data[questionIdx]?.fieldType
  );
  console.log("updated--->>>>>>", updated);
  let workingData: any = [...data];
  console.log("workingData==-=>", workingData);

  workingData[questionIdx].stepOptions = updated;

  console.log("workingData==11111-=>", workingData);

  return workingData;
};
export const showOtherInput = (idx: any, OtherShowData: any) => {
  let updatedOtherField: any = [...OtherShowData];
  updatedOtherField[idx].otherFieldCondition =
    !updatedOtherField[idx]?.otherFieldCondition;
  return updatedOtherField;
};
export const getCircleSize = (index: number) => {
  const sizes = [
    { size: moderateScale(110), fontSize: textScale(10), label: "Small" },
    { size: moderateScale(140), fontSize: textScale(14), label: "Medium" },
    { size: moderateScale(170), fontSize: textScale(24), label: "Large" },
  ];
  return sizes[index % sizes?.length];
};

export const checkSelectedIf = (data: any) => {
  // Check if any of the items have isSelected set to true
  const anySelected = data?.some((item: any) => item?.isSelected);

  // If none of the items are selected, set the first item's isSelected to true
  if (!anySelected && data?.length > 0) {
    data[0].isSelected = true;
  }

  return data;
};

export const bubbleBoxSelectUI = (stepName: any) => {
  switch (stepName) {
    case allStepName?.impact_of_Challenges:
      return {
        startTitle: "NO IMPACT",
        endTitle: "HIGH IMPACT",
        boxBackgroundColor: colors?.SurfCrest,
        imageTint: colors?.polishedPine,
        textColor: colors?.prussianBlue,
        valueColor: colors?.SurfCrest,
      };
    case allStepName?.level_of_Motivation:
      return {
        startTitle: "NOT MOTIVATED",
        endTitle: "EXTREMELY MOTIVATED",
        boxBackgroundColor: colors?.SurfCrest,
        imageTint: colors?.polishedPine,
        textColor: colors?.prussianBlue,
        valueColor: colors?.SurfCrest,
      };
    case allStepName?.sensitivity_to_Criticism:
      return {
        startTitle: "VERY LOW",
        endTitle: "VERY HIGH",
        boxBackgroundColor: colors?.SurfCrest,
        imageTint: colors?.polishedPine,
        textColor: colors?.prussianBlue,
        valueColor: colors?.SurfCrest,
      };
    case allStepName?.quality_of_Relationships:
      return {
        startTitle: "POOR",
        endTitle: "EXCELLENT",
        boxBackgroundColor: colors?.SurfCrest,
        imageTint: colors?.polishedPine,
        textColor: colors?.prussianBlue,
        valueColor: colors?.SurfCrest,
      };
    default:
      return {
        startTitle: "VERY LOW",
        endTitle: "VERY HIGH",
        boxBackgroundColor: colors?.prussianBlue,
        imageTint: colors?.SurfCrest,
        textColor: colors?.SurfCrest,
        valueColor: colors?.prussianBlue,
      };
  }
};

export const parseJSONString = (jsonString: any) => {
  let parsedData;
  try {
    const formattedString = jsonString?.replace(/(?<!\\)'/g, '"');
    parsedData = JSON.parse(formattedString);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    parsedData = [];
  }
  return parsedData;
};

export const convertToJSONString = (dataObject: any) => {
  let jsonString;

  try {
    jsonString = JSON.stringify(dataObject);
  } catch (error) {
    console.error("Error converting to JSON string:", error);
    jsonString = null;
  }
  return jsonString;
};
export const updateAnswerRequest = (data: any): any => {
  console.log("first----data--->", data);

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
            fieldType?.multiCardSelect,
            fieldType?.minBoxMultiSelect,
            fieldType?.arrowSelect,
            fieldType?.miniBoxMultiSelect,
          ].includes(step?.fieldType)
        ) {
          return {
            stepId: step?.stepId,
            optionIds: getSelectedOptionIds(step),
            answers: addSpecificationsSelected
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
            fieldType?.singleSelectBox,
            fieldType?.singleSelectLine,
            fieldType?.starSingleSelect,
            fieldType?.scaleSliderSelect,
            fieldType?.mealSelect,
            fieldType?.starLevelSelect,
            fieldType?.bubbleBoxSelect,
            fieldType?.circleCurveSelect,
            fieldType?.circleCurveSelectSix,
            fieldType?.singleShadowSelect,
            fieldType?.stretchSingleSelect,
            fieldType?.miniBoxSingleSelect,
            fieldType?.minBoxSingleSelect,
          ].includes(step?.fieldType)
        ) {
          return {
            stepId: step?.stepId,
            optionIds: getSelectedOptionIds(step),
            // optionIds: !getSelectedOptionIds(step)[0]
            // ? null
            // : [getSelectedOptionIds(step)[0]],
            answers: addSpecificationsSelected
              ? data[index]?.otherAnswer || ""
              : "",
            isStepSkip: false,
          };
        } else if ([fieldType?.jsonText].includes(step?.fieldType)) {
          function removeEmptyObjects(data: any) {
            if (!Array.isArray(data)) {
              console.error("Invalid data format. Expected an array.");
              return [];
            }
            return data.filter((item) => {
              return Object.values(item).some(
                (value) => value !== null && value !== undefined && value !== ""
              );
            });
          }
          return {
            stepId: step?.stepId,
            other: JSON.stringify(
              step?.isJsonStructure
                ? removeEmptyObjects(JSON.parse(step?.other || "[]"))
                : []
            ),
          };
        } else if (
          [
            fieldType?.textArea,
            fieldType?.datePicker,
            fieldType?.feelingSelect,
            fieldType?.simleSlider,
            fieldType?.moodSelect,
            fieldType?.timePicker,
            fieldType?.textAreaBox,
            fieldType?.toggleSelect,
            fieldType?.checkBoxSelect,
          ].includes(step?.fieldType)
        ) {
          return {
            stepId: step?.stepId,
            optionIds: null,
            answers: step?.otherAnswer || "",
            isStepSkip: false,
          };
        }
        return null;
      })
      .filter((step: any): any => {
        const hasOptionId =
          // Array.isArray(step?.optionIds) && step?.optionIds.length > 0;
          Array.isArray(step?.optionIds) && step?.optionIds.length >= 0;
        const hasAnswer =
          typeof step?.answers === "string" && step?.answers?.trim() !== "";
        const hasOther =
          typeof step?.other === "string" && step?.other.trim() !== "";

        return step;
        // return step && (hasOptionId || hasAnswer || hasOther);
      }),
  };

  return result;
};
