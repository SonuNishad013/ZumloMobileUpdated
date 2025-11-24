import logger from "../constant/logger";
import allActions from "../redux/actions";
import * as AsyncStorageUtils from "../utils/Storage/AsyncStorage";
import { filterCategoryData } from "./getGlobalCodes";

export const UpdateUserSkippedCategory = (
  categoryId: any,
  dispatch: any,
  allActions: any
) => {
  console.log("categoryId", categoryId);
  try {
    let requestbody = {
      categoryId: categoryId,
    };
    allActions.seekerDetails
      .UpdateUserSkippedCategory(
        dispatch,
        requestbody,
        "UpdateUserSkippedCategory"
      )
      .then((response: any) => {
        console.log(
          "response onSavePlanner_Explorer",
          response,
          "request for this api",
          requestbody
        );
        if (response.statusCode == 200) {
          console.log("response in api=> UpdateUserSkippedCategory", response);
        } else {
          // renderToast.showToast("error", "Error", response?.message);
        }
      })
      .catch((err: any) => {
        // renderToast.showToast("error", "Error", err?.message);
      });
  } catch (error) {}
};

export const myData = async (skipCategory: any) => {
  const data = async () => {
    const getGlobalCodeData = await AsyncStorageUtils.getItem(
      AsyncStorageUtils.GLOBALCODEWITHCATEGORY
    );
    let getWellnessGlobalData = await filterCategoryData(
      JSON.parse(getGlobalCodeData),
      "AIGenerationCategory"
    );
    console.log(
      "getWellnessGlobalData-===>",
      getWellnessGlobalData,
      getGlobalCodeData
    );
    return getWellnessGlobalData?.[0]?.globalCodeOptions;
  };
  const AiCategoryData: any[] = await data();
  console.log("AiCategoryData=====>>>>", AiCategoryData);
  if (AiCategoryData) {
    const getAiGeneratedcategoriesCode = () => {
      switch (skipCategory) {
        case "recommendations":
          return AiCategoryData?.[2]?.globalCodeId;
        case "goals":
          return AiCategoryData?.[4]?.globalCodeId;
        case "activities":
          return AiCategoryData?.[3]?.globalCodeId;
        case "Wellness Plan":
          return AiCategoryData?.[0]?.globalCodeId;
        default:
          break;
      }
    };
    console.log("getAiGeneratedcategoriesCode", getAiGeneratedcategoriesCode());
  }
};

interface LoginProps {
  deviceToken: string;
  deviceType: number; // 1 for iOS, 2 for Android
  deviceModel: string;
  operatingSystem: string;
  osVersion: string;
  appVersion: string;
  timeZone: string;
}
export const CreateUserDevice_API = async (payload: any, dispatch: any) => {
  console.log("payload for CreateUserDevice_API", payload);
  try {
    let requestbody = {
      ...payload,
    };

    await allActions.seekerDetails
      .CreateUserDeviceInfo(dispatch, requestbody, "CreateUserDeviceInfo")
      .then((response: any) => {
        if (response.statusCode == 200) {
          console.log("response in  CreateUserDeviceInfoapi =>", response);
          return Promise.resolve(response);
        } else {
          console.log(
            "response in  CreateUserDeviceInfoapi sc500 =>",
            response
          );
          // renderToast.showToast("error", "Error", response?.message);
          return Promise.resolve(response);
        }
      })
      .catch((err: any) => {
        console.log("error in create device API", err);
        // renderToast.showToast("error", "Error", err?.message);
        return Promise.resolve(err);
      });
  } catch (error) {}
};
export const GetUserActivityAvailabilityAPI = async (dispatch: any) => {
  try {
    let requestbody = {};

    await allActions.dashboardAction
      .GetUserActivityAvailabilityAPI(
        dispatch,
        requestbody,
        "GetActivitiesQuestionsByCategoryIdApi"
      )
      .then((response: any) => {
        if (response.statusCode == 200) {
          return Promise.resolve(response);
        } else {
          return response;
        }
      })
      .catch((err) => {
        logger("GetUserActivityAvailabilityAPI_response===>>", err);
        return err;
      });
  } catch (error) {
    logger("GetUserActivityAvailabilityAPI_response===>>", error);
    return error;
  }
};

//get user activity slots booked
export const GetUserScheduledActivitiesList = async (dispatch: any) => {
  try {
    let requestbody = {};

    await allActions.dashboardAction
      .GetUserScheduledActivitiesList(
        dispatch,
        requestbody,
        "GetActivitiesQuestionsByCategoryIdApi"
      )
      .then((response: any) => {
        console.log(
          "GetUserScheduledActivitiesListAPI_response===>>",
          response
        );
        if (response.statusCode == 200) {
          return Promise.resolve(response);
        } else {
          console.log(
            "GetUserScheduledActivitiesListAPI_response===>>",
            response
          );
          return response;
        }
      })
      .catch((err) => {
        console.log("GetUserScheduledActivitiesListAPI_response===>>", err);
        return err;
      });
  } catch (error) {
    console.log("GetUserScheduledActivitiesListAPI_response===>>", error);
    return error;
  }
};

//new api calling function
export const LikeOrDislikeRecommendationAPI = async (
  payload: any,
  dispatch: any
) => {
  console.log("categoryId", payload);
  try {
    let requestbody = {
      ...payload,
    };

    const response = await allActions.OnBoarding.LikeOrDislikeRecommendationAPI(
      dispatch,
      requestbody,
      "LikeOrDislikeRecommendationAPI"
    );

    console.log(
      "response onSavePlanner_Explorer",
      response,
      "request for this api",
      requestbody
    );

    if (response.statusCode === 200) {
      console.log("response in api=> UpdateUserSkippedCategory", response);
      return response;
    } else {
      throw new Error(response?.message || "Unknown error occurred");
    }
  } catch (error: any) {
    console.error("API Error:", error);
    return { error: error.message || "Something went wrong" };
  }
};
