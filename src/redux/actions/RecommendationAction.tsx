import { ajaxGet, ajaxPostWithToken } from "../../config/apiService";
import apiConstant from "../../constant/apiConstant";

const getRecommendation = (requestbody: any, functionName: any) => {
  const url = apiConstant().LinkRecommendationItems;
  return ajaxPostWithToken(url, requestbody, functionName)
    .then((resp) => {
      return Promise.resolve(resp);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const RecommendationItemsInExistingRecord = (
  requestbody: any,
  functionName: any
) => {
  const url = apiConstant().RecommendationItemsInExistingRecord;
  return ajaxPostWithToken(url, requestbody, functionName)
    .then((resp) => {
      return Promise.resolve(resp);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
const recommendationVideosAndBooks = (request: any, FunctionName: any) => {
  const url = apiConstant().RecommendationVideosAndBooks;
  return ajaxPostWithToken(url, request, FunctionName)
    .then((resp) => {
      return Promise.resolve(resp);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
const recommendationCategories = (FunctionName: any) => {
  const url = apiConstant().RecommendationCategories;
  return ajaxGet(url, null, FunctionName, null)
    .then((resp) => {
      return Promise.resolve(resp);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const getUserSelectedRecommendationCategories = (
  requestbody: any,
  functionName: any
) => {
  const url = apiConstant().UserSelectedRecommendationCategories;
  return ajaxPostWithToken(url, requestbody, functionName)
    .then((resp) => {
      return Promise.resolve(resp);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const saveBookRecommendations = (requestbody: any, functionName: any) => {
  const url = apiConstant().BookRecommendations;
  return ajaxPostWithToken(url, requestbody, functionName)
    .then((resp) => {
      return Promise.resolve(resp);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export default {
  getRecommendation,
  RecommendationItemsInExistingRecord,
  recommendationVideosAndBooks,
  recommendationCategories,
  getUserSelectedRecommendationCategories,
  saveBookRecommendations,
};
