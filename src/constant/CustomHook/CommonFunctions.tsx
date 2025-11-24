import { fieldType } from "../AllGlobalNameConstant";
import { strings } from "../strings";

export const multiSelectedByIndex = (data: any, index: any) => {
  const listData = [...data];
  const keyAble = listData[index].hasOwnProperty("isSelected");
  if (!keyAble) {
    listData[index].isSelected = true;
    return listData;
  } else {
    listData[index].isSelected = !listData[index].isSelected;
    return listData;
  }
};

export const multiSelectedByUserId = (data: any, value: any) => {
  const listData = [...data];
  const index = listData?.findIndex((item: any) => item?.userId == value);
  const keyAble = listData[index].hasOwnProperty("isSelected");
  if (!keyAble) {
    listData[index].isSelected = true;
    return listData;
  } else {
    listData[index].isSelected = !listData[index].isSelected;
    return listData;
  }
};

export const singleSelectedByIndex = (
  data: any,
  index: any,
  fieldTypeUI?: any
) => {
  console.log("singleSelectedByIndex->data", data);
  const listData = [...data];
  console.log("singleSelectedByIndex->listData", listData);
  console.log("singleSelectedByIndex->fieldTypeUI", fieldTypeUI);

  let preIndex = null;
  let allFalse = listData?.map((item: any, idx) => {
    if (item?.optionValue == strings?.addSpecifications) {
      return item;
    } else {
      if (item.isSelected == true) {
        console.log("item.isSelected == true", (preIndex = idx));
        preIndex = idx;
        item.isSelected = false;
        return item;
      } else {
        console.log("item.isSelected == false");
        item.isSelected = false;
        return item;
      }
    }
  });

  console.log("allFalse->allFalse-after listData->>", allFalse);

  if (allFalse[index] == undefined) {
    console.log("allFalse[index] == undefined99>>", listData);
    return listData;
  }
  if (preIndex == index) {
    if (
      [
        fieldType?.levelSelect,
        fieldType?.circleCurveSelect,
        fieldType?.circleCurveSelectSix,
        fieldType?.frequencyCurve,
        fieldType?.scaleSliderSelect,
        fieldType?.desAscending,
      ]?.includes(fieldTypeUI)
    ) {
      allFalse[index].isSelected = true;
    } else {
      allFalse[index].isSelected = false;
    }
  } else {
    allFalse[index].isSelected = true;
  }

  console.log("allFalse->allFalse->", allFalse);
  return allFalse;
};

export const singleSelectedByIndexAtleastOne = (data: any, index: any) => {
  return data?.map((item: any, idx: number) => {
    if (!Object.hasOwn(item, strings?.isSelected)) {
      item = { ...item, isSelected: false };
    }
    return index === idx
      ? { ...item, isSelected: true }
      : { ...item, isSelected: false };
  });
};

export const capitalizeFirstLetter = (name: any) => {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1);
};
