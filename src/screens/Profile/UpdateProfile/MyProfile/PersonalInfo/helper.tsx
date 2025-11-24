import axios from "axios";
import * as AsyncStore from "../../../../../utils/Storage/AsyncStorage";
import ToastMsg from "../../../../../components/Hooks/useToast";
import apiConstant from "../../../../../constant/apiConstant";
import logger from "../../../../../constant/logger";

var globalCodeListData: any = [];

export const getDrodownData = (key: string) => {
  let data = globalCodeListData?.find((elem: any) => key == elem.categoryName);
  let newData = [];
  if (data == undefined) return [];
  for (let elem of data?.globalCodes) {
    newData.push({
      ...elem,
      title: elem.codeName,
    });
  }

  return newData;
};

export const getUserName = (userData: any) => {
  if (userData?.firstName) return `${userData?.firstName}`;
  else return "";
};

export const setBodyWithGlobalCodes = (object: any) => {
  let body = {};
  for (const property in object) {
    if (object[property].key)
      body = {
        ...body,
        [object[property].key]: getObjectValue(object, property),
      };
  }
  return body;
};

const getObjectValue = (object: any, property: any) => {
  let value = undefined;
  if (object[property].globalCodeId) {
    value = object[property].globalCodeId;
  } else {
    if (
      object[property].value == "" &&
      object[property].dropdownData != undefined
    )
      value = 0; //send value 0 in case of blank string value.
    else value = object[property].value;
  }

  if (object[property].key == "ethnicity") {
    let data = [];
    for (let elem of object[property]?.dropdownData) {
      if (elem.isSelected) {
        data.push({
          ethnicityType: elem.id,
          ethnicityOther:
            elem.title == "Other" ? object[property]?.ethnicityOther : "",
        });
      }
    }

    value = data;
  }

  return value;
};

export const getAllGlobalCodesWithCategoryProfile = async (): Promise<
  any[] | null
> => {
  try {
    const bearerToken = await AsyncStore.getItem(AsyncStore.ACCESS_TOKEN);
    const url = apiConstant().GetAllGlobalCodesWithCategory1; //accurate URL for fetching global codes

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${bearerToken}` },
    });

    const data = response?.data?.data;
    globalCodeListData = data || [];
    return data || [];
  } catch (error: any) {
    ToastMsg("Error", "error", error?.message || "Something went wrong");
    return null;
  }
};

// Get the array for DropDown for particlur categary based on the key (categary name)
export const getGlobalValue = (key: string) => {
  return globalCodeListData?.find((elem: any) => elem?.categoryName == key).id;
};

// Get the value (String) from globalCodeListData based on the key (getCategoryId)
export const getGlobalStringValue = (key: any, value: any) => {
  logger("globalCodeListData___", globalCodeListData);
  let object = globalCodeListData?.find(
    (elem: any) => elem.categoryName?.toLowerCase() == key?.toLowerCase()
  );

  let stringValue = object?.globalCodes?.find((elem: any) => elem?.id == value);

  return stringValue?.codeName ? stringValue?.codeName : "";
};

export const getKeyByValue = (object: any, elem: any) => {
  let string: any = "";

  for (const property in object) {
    let key = elem.key?.toLowerCase();

    if (property.toLowerCase() == key?.toLowerCase()) {
      if (elem.isGlobalCode) {
        string = getGlobalStringValue(elem.globalCodeKey, object[property]);
      } else {
        if (Array.isArray(object[property])) {
          string = object[property].map((elem: any) => elem.ethnicityTypeText);
        } else string = object[property];
      }
    }
  }
  return string;
};
interface CodeType {
  categoryId: number;
  codeName: string;
  description: string;
  id: number;
  isActive: boolean;
}
interface GlobalCategory {
  categoryName: string;
  globalCodes: CodeType[];
}
export const getItemByCategoryAndCode = async (
  categoryName: string,
  codeName: string
): Promise<CodeType | null> => {
  const globalCodeListData: GlobalCategory[] | null =
    await getAllGlobalCodesWithCategoryProfile();

  if (!globalCodeListData) return null;

  for (const category of globalCodeListData) {
    if (category.categoryName === categoryName) {
      return (
        category.globalCodes.find(
          (code: CodeType) => code.codeName === codeName
        ) || null
      );
    }
  }

  return null;
};
