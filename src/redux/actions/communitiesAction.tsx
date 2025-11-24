import types from "../types/communitiesType";
import apiConstant from "../../constant/apiConstant";
import {
  ajaxDelete,
  ajaxGet,
  ajaxMultipartPostWithToken,
  ajaxMultipartPutWithToken,
  ajaxPostWithToken,
  ajaxPut,
} from "../../config/apiService";
import { communityCode } from "../../constant/CommunityConstant";
import logger from "../../constant/logger";
import { event } from "../../navigation/emitter";

const dispatchData = (type: any, payload: any, dispatch: any) => {
  dispatch({
    type: type,
    payload: payload,
  });
};

const globalJsonByCategoryName = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.GET_GLOBALJSONBY_CATEGORYNAME_REQUEST, {}, dispatch);
  const url =
    apiConstant().GlobalJsonByCategoryName + `/${requestbody?.categoryName}`;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_GLOBALJSONBY_CATEGORYNAME_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_GLOBALJSONBY_CATEGORYNAME_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const getCommunityProfile = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.POST_CREATECOMMUNITY_PROFILE_REQUEST, {}, dispatch);
  const url = apiConstant().GetCommunityProfile;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.POST_CREATECOMMUNITY_PROFILE_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_CREATECOMMUNITY_PROFILE_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const suggestedGroups = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.GET_SUGGESTED_GROUPS_REQUEST, {}, dispatch);
  const url = apiConstant().SuggestedGroups;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_SUGGESTED_GROUPS_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_SUGGESTED_GROUPS_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

interface Pagination {
  pageSize?: number;
  pageIndex?: number;
}
const getTrendingFeeds = (
  dispatch: any,
  requestbody: Pagination,
  functionName: any
) => {
  dispatchData(types.GET_TRENDINGFEEDS_REQUEST, {}, dispatch);
  const url =
    apiConstant().GetTrendingFeeds +
    `?pageSize=${requestbody?.pageSize}&pageIndex=${requestbody?.pageIndex}`;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_TRENDINGFEEDS_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_TRENDINGFEEDS_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
const SavedFeedsList = (dispatch: any, requestbody: any, functionName: any) => {
  dispatchData(types.GET_SAVEDFEEDSLIST_REQUEST, {}, dispatch);
  const url = apiConstant().SavedFeedsList;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_SAVEDFEEDSLIST_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_SAVEDFEEDSLIST_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const getFeedById = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  queryParams: any
) => {
  dispatchData(types.GET_FEEDBY_ID_REQUEST, {}, dispatch);
  const url = apiConstant().GetFeedById + queryParams;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_FEEDBY_ID_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_FEEDBY_ID_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
// ;

const addGroupMembers = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.POST_ADD_GROUP_MEMBERS_REQUEST, {}, dispatch);
  const url = apiConstant().AddGroupMembers;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.POST_ADD_GROUP_MEMBERS_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_ADD_GROUP_MEMBERS_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const shareFeed = (dispatch: any, requestbody: any, functionName: any) => {
  dispatchData(types.POST_SHAREFEED_REQUEST, {}, dispatch);
  const url = apiConstant().ShareFeed;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.POST_SHAREFEED_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_SHAREFEED_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

// ;
const removeGroupMembers = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.DELETE_REMOVE_GROUP_MEMBERS_REQUEST, {}, dispatch);
  const url = apiConstant().RemoveGroupMembers;
  return ajaxDelete(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.DELETE_REMOVE_GROUP_MEMBERS_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.DELETE_REMOVE_GROUP_MEMBERS_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

// ;

const communityUserList = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.GET_COMMUNITYUSERLIST_REQUEST, {}, dispatch);
  const url = apiConstant().CommunityUserList;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_COMMUNITYUSERLIST_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_COMMUNITYUSERLIST_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const connectedUserList = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.POST_CONNECTEDUSERLIST_REQUEST, {}, dispatch);
  const url = apiConstant().ConnectedUserList;
  return ajaxPostWithToken(url, requestbody, functionName)
    .then((resp) => {
      if (resp?.message === communityCode?.User_not_found) {
        logger("userProfileById____", resp?.message, {
          msgCondition: resp?.message === communityCode?.User_not_found,
        });
        dispatchData(types?.USER_NOT_FOUND, true, dispatch);
        event.emit("userDeleteBySuperAdmin");
      } else {
        dispatch({
          type: types?.USER_NOT_FOUND,
          payload: false,
        });
      }
      dispatchData(types.POST_CONNECTEDUSERLIST_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_CONNECTEDUSERLIST_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const feedReport = (dispatch: any, requestbody: any, functionName: any) => {
  dispatchData(types.POST_FEED_REPORT_REQUEST, {}, dispatch);
  const url = apiConstant().FeedReport;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.POST_FEED_REPORT_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_FEED_REPORT_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

// ;

const createConnection = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.POST_CREATECONNECTION_REQUEST, {}, dispatch);
  const url = apiConstant().CreateConnection;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.POST_CREATECONNECTION_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_CREATECONNECTION_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

// ;

const membersByGroupId = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  queryParams: any
) => {
  dispatchData(types.GET_MEMBERSBYGROUPID_REQUEST, {}, dispatch);
  const url = apiConstant().MembersByGroupId + queryParams;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_MEMBERSBYGROUPID_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_MEMBERSBYGROUPID_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

// ;

const createCommunityProfile = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  queryParams: any
) => {
  dispatchData(types.POST_CREATECOMMUNITY_PROFILE_REQUEST, {}, dispatch);
  const url = apiConstant().CreateCommunityProfile + queryParams;
  return ajaxMultipartPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.POST_CREATECOMMUNITY_PROFILE_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_CREATECOMMUNITY_PROFILE_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const createFeed = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  queryParams: any
) => {
  dispatchData(types.POST_CREATE_FEED_REQUEST, {}, dispatch);
  const url = apiConstant().CreateFeed + queryParams;
  return ajaxMultipartPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.POST_CREATE_FEED_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_CREATE_FEED_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

// updateFeed;

const updateFeed = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  queryParams: any
) => {
  dispatchData(types.PUT_UPDATE_FEED_REQUEST, {}, dispatch);
  const url = apiConstant().UpdateFeed + queryParams;
  return ajaxMultipartPutWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.PUT_UPDATE_FEED_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.PUT_UPDATE_FEED_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const likeFeed = (dispatch: any, requestbody: any, functionName: any) => {
  dispatchData(types.POST_LIKE_FEED_REQUEST, {}, dispatch);
  const url = apiConstant().LikeFeed;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.POST_LIKE_FEED_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_LIKE_FEED_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
//SaveOrUnSaveFeed
const SaveOrUnSaveFeedAPI = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.SAVEORUNSAVEFEED_REQUEST, {}, dispatch);
  const url = apiConstant().SaveOrUnSaveFeed;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.SAVEORUNSAVEFEED_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.SAVEORUNSAVEFEED_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const commentFeed = (dispatch: any, requestbody: any, functionName: any) => {
  dispatchData(types.POST_COMMENT_FEED_REQUEST, {}, dispatch);
  const url = apiConstant().CommentFeed;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.POST_COMMENT_FEED_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_COMMENT_FEED_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
const commentReply = (dispatch: any, requestbody: any, functionName: any) => {
  dispatchData(types.POST_COMMENT_REPLY_REQUEST, {}, dispatch);
  const url = apiConstant().CommentReply;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.POST_COMMENT_REPLY_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_COMMENT_REPLY_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
const DeleteCommentsOrReply = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  QueryParams: string
) => {
  dispatchData(types.DELETE_COMMENTS_OR_REPLY_REQUEST, {}, dispatch);
  const url = apiConstant().DeleteCommentsOrReply + `?${QueryParams}`; //
  // QueryParams===replyId=223||commentId=22
  console.log("DeleteCommentsOrReply", { url, QueryParams });
  return ajaxDelete(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.DELETE_COMMENTS_OR_REPLY_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.DELETE_COMMENTS_OR_REPLY_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const commentAndRepliesByFeedId = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  queryParams: any
) => {
  dispatchData(types.GET_COMMENT_AND_REPLIES_BYFEED_ID_REQUEST, {}, dispatch);
  const url = apiConstant().CommentAndRepliesByFeedId + queryParams;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        types.GET_COMMENT_AND_REPLIES_BYFEED_ID_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        types.GET_COMMENT_AND_REPLIES_BYFEED_ID_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
};

// CommentAndRepliesByFeedId;

const createGroup = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  queryParams: any
) => {
  dispatchData(types.POST_CREATE_GROUP_REQUEST, {}, dispatch);
  const url = apiConstant().CreateGroup + queryParams;
  return ajaxMultipartPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.POST_CREATE_GROUP_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_CREATE_GROUP_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const updateGroup = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  queryParams: any
) => {
  dispatchData(types.PUT_UPDATE_GROUP_REQUEST, {}, dispatch);
  const url = apiConstant().UpdateGroup + queryParams;
  return ajaxMultipartPutWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.PUT_UPDATE_GROUP_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.PUT_UPDATE_GROUP_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const createdOrJoinedGroupList = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.POST_CREATE_OR_JOINED_GROUP_REQUEST, {}, dispatch);
  const url = apiConstant().CreatedOrJoinedGroupList;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      if (resp?.message === communityCode?.User_not_found) {
        logger("userProfileById____", resp?.message, {
          msgCondition: resp?.message === communityCode?.User_not_found,
        });
        dispatchData(types?.USER_NOT_FOUND, true, dispatch);
        event.emit("userDeleteBySuperAdmin");
      } else {
        dispatch({
          type: types?.USER_NOT_FOUND,
          payload: false,
        });
      }
      dispatchData(types.POST_CREATE_OR_JOINED_GROUP_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_CREATE_OR_JOINED_GROUP_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const privateAndPublicGroupList = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.POST_PRIVATEANDPUBLICGROUPLIST_REQUEST, {}, dispatch);
  const url = apiConstant().PrivateAndPublicGroupList;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      if (resp?.message === communityCode?.User_not_found) {
        logger("userProfileById____", resp?.message, {
          msgCondition: resp?.message === communityCode?.User_not_found,
        });
        dispatchData(types?.USER_NOT_FOUND, true, dispatch);
        event.emit("userDeleteBySuperAdmin");
      } else {
        dispatch({
          type: types?.USER_NOT_FOUND,
          payload: false,
        });
      }
      dispatchData(
        types.POST_PRIVATEANDPUBLICGROUPLIST_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_PRIVATEANDPUBLICGROUPLIST_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const joinGroup = (dispatch: any, requestbody: any, functionName: any) => {
  dispatchData(types.POST_JOIN_GROUP_REQUEST, {}, dispatch);
  const url = apiConstant().JoinGroup;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.POST_JOIN_GROUP_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_JOIN_GROUP_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
//https://dev-api.zumlo.co/config-service/api/v1/Config/InsertGlobalCode
const InsertGlobalCodeAPI = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.INSERTGLOBALCODE_REQUEST, {}, dispatch);
  const url = apiConstant().InsertGlobalCode;
  return ajaxPostWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.INSERTGLOBALCODE_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.INSERTGLOBALCODE_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const leaveGroup = (dispatch: any, requestbody: any, functionName: any) => {
  dispatchData(types.DELETE_LEAVE_GROUP_REQUEST, {}, dispatch);
  const url = apiConstant().LeaveGroup;
  return ajaxDelete(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.DELETE_LEAVE_GROUP_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.DELETE_LEAVE_GROUP_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const removeJoinRequest = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.DELETE_REMOVEJOINREQUEST_REQUEST, {}, dispatch);
  const url = apiConstant().RemoveJoinRequest;
  return ajaxDelete(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.DELETE_REMOVEJOINREQUEST_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.DELETE_REMOVEJOINREQUEST_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

// ;
// ;
const groupDetailsById = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  queryParams: any
) => {
  dispatchData(types.GET_GROUP_DETAILS_BY_ID_REQUEST, {}, dispatch);
  const url = apiConstant().GroupDetailsById + queryParams;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_GROUP_DETAILS_BY_ID_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_GROUP_DETAILS_BY_ID_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const getChat = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  queryParams: any
) => {
  dispatchData(types.GET_CHAT_REQUEST, {}, dispatch);
  const url = apiConstant().GetChat + queryParams;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      if (resp?.message === communityCode?.User_not_found) {
        logger("userProfileById____", resp?.message, {
          msgCondition: resp?.message === communityCode?.User_not_found,
        });
        dispatchData(types?.USER_NOT_FOUND, true, dispatch);
        event.emit("userDeleteBySuperAdmin");
      } else {
        dispatch({
          type: types?.USER_NOT_FOUND,
          payload: false,
        });
      }
      dispatchData(types.GET_CHAT_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_CHAT_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

// ;
const deleteGroup = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  queryParams: any
) => {
  dispatchData(types.DELETE_GROUP_REQUEST, {}, dispatch);
  const url = apiConstant().DeleteGroup + queryParams;
  return ajaxDelete(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.DELETE_GROUP_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.DELETE_GROUP_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

// deleteGroup;

const feedsByGroupId = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  queryParams: any
) => {
  dispatchData(types.GET_FEEDS_BY_GROUP_ID_REQUEST, {}, dispatch);
  const url = apiConstant().FeedsByGroupId + queryParams;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.GET_FEEDS_BY_GROUP_ID_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.GET_FEEDS_BY_GROUP_ID_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const updateCommunityProfile = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  queryParams: any
) => {
  dispatchData(types.PUT_UPDATECOMMUNITYPROFILE_REQUEST, {}, dispatch);
  const url = apiConstant().updateCommunityProfile + queryParams;
  console.log("url-=-=->url", JSON.stringify({ url, requestbody }));

  return ajaxMultipartPutWithToken(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.PUT_UPDATECOMMUNITYPROFILE_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.PUT_UPDATECOMMUNITYPROFILE_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const userProfileById = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  queryParams: any
) => {
  dispatchData(types.POST_CREATECOMMUNITY_PROFILE_REQUEST, {}, dispatch);
  const url = apiConstant().UserProfileById + `${queryParams}`;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      if (
        String(queryParams).trim().length < 1 &&
        resp?.message === communityCode?.User_not_found
      ) {
        logger("userProfileById____", resp?.message, {
          msgCondition: resp?.message === communityCode?.User_not_found,
          textLengthCond: String(queryParams).trim().length < 1,
        });
        dispatchData(types?.USER_NOT_FOUND, true, dispatch);
        event.emit("userDeleteBySuperAdmin");
      } else {
        dispatch({
          type: types?.USER_NOT_FOUND,
          payload: false,
        });
      }
      dispatchData(types.POST_CREATECOMMUNITY_PROFILE_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.POST_CREATECOMMUNITY_PROFILE_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};
const SearchAny = (
  dispatch: any,
  requestbody: any,
  functionName: any,
  queryParams: any
) => {
  //https://dev-api.zumlo.co/community-service/api/v1/Community/SearchAny?searchEntity=bucklers
  dispatchData(types.SEARCH_ANY_REQUEST, {}, dispatch);
  const url = apiConstant().SearchAny + `?searchEntity=${queryParams}`;
  return ajaxGet(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.SEARCH_ANY_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.SEARCH_ANY_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const DeleteFeedOrFeedShare = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.DELETE_FEED_REQUEST, {}, dispatch);
  const url = apiConstant().DeleteFeedOrFeedShare;
  return ajaxDelete(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.DELETE_FEED_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.DELETE_FEED_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const acceptOrRejectInvite = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(types.PUT_ACCEPTORREJECT_INVITE_REQUEST, {}, dispatch);
  const url = apiConstant().AcceptOrRejectInvite;
  return ajaxPut(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(types.PUT_ACCEPTORREJECT_INVITE_SUCCESS, resp, dispatch);
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(types.PUT_ACCEPTORREJECT_INVITE_FAILURE, err, dispatch);
      return Promise.reject(err);
    });
};

const acceptOrRejectConnectionRequest = (
  dispatch: any,
  requestbody: any,
  functionName: any
) => {
  dispatchData(
    types.PUT_ACCEPTORREJECT_CONNECTIONREQUEST_REQUEST,
    {},
    dispatch
  );
  const url = apiConstant().AcceptOrRejectConnectionRequest;
  return ajaxPut(url, requestbody, functionName, dispatch)
    .then((resp) => {
      dispatchData(
        types.PUT_ACCEPTORREJECT_CONNECTIONREQUEST_SUCCESS,
        resp,
        dispatch
      );
      return Promise.resolve(resp);
    })
    .catch((err) => {
      dispatchData(
        types.PUT_ACCEPTORREJECT_CONNECTIONREQUEST_FAILURE,
        err,
        dispatch
      );
      return Promise.reject(err);
    });
};

// ;

// ;
const groupSelectedMembers = (dispatch: any, val: any) => {
  dispatchData(types.SELECTEDGROUPMEMBERS_REQUEST, val, dispatch);
};

const profileDetailsCommunity = (dispatch: any, val: any) => {
  dispatchData(types.PROFILEDETAILSCOMMUNITY_REQUEST, val, dispatch);
};

export default {
  globalJsonByCategoryName,
  getCommunityProfile,
  createCommunityProfile,
  communityUserList,
  createGroup,
  createdOrJoinedGroupList,
  groupSelectedMembers,
  privateAndPublicGroupList,
  updateCommunityProfile,
  profileDetailsCommunity,
  groupDetailsById,
  joinGroup,
  leaveGroup,
  userProfileById,
  createFeed,
  likeFeed,
  feedsByGroupId,
  commentAndRepliesByFeedId,
  commentFeed,
  removeJoinRequest,
  suggestedGroups,
  commentReply,
  DeleteFeedOrFeedShare,
  addGroupMembers,
  removeGroupMembers,
  membersByGroupId,
  acceptOrRejectInvite,
  deleteGroup,
  getTrendingFeeds,
  updateGroup,
  createConnection,
  acceptOrRejectConnectionRequest,
  connectedUserList,
  updateFeed,
  feedReport,
  shareFeed,
  getFeedById,
  getChat,
  InsertGlobalCodeAPI,
  SaveOrUnSaveFeedAPI,
  SearchAny,
  DeleteCommentsOrReply,
  SavedFeedsList,
};
