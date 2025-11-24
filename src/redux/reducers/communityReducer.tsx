import types from "../types/communitiesType";
const communityReducer = (
  state = {
    isLoading: false,
    selectedGroupMembers: null,
    profileDetailsCommunity: null,
    postStatus: 0,
    isGoBack: false,
    list: [],
    callGetUserCommunityProfile: false,
    groupList: [],
  },
  action: any
) => {
  switch (action.type) {
    case types?.SELECTEDGROUPMEMBERS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        selectedGroupMembers: action.payload,
      };
    }
    case types?.PROFILEDETAILSCOMMUNITY_REQUEST: {
      return {
        ...state,
        isLoading: true,
        profileDetailsCommunity: action.payload,
      };
    }
    case "postStatus": {
      return {
        ...state,
        isLoading: true,
        postStatus: action.payload,
      };
    }
    case "PostDeleteOrUnsavedFromFeedDetails": {
      return {
        ...state,
        isLoading: true,
        isGoBack: action.payload,
      };
    }
    case types.GET_TRENDINGFEEDS_SUCCESS: {
      return {
        ...state,
        list: action.payload,
      };
    }
    case types?.USER_NOT_FOUND: {
      return {
        ...state,
        callGetUserCommunityProfile: action.payload,
      };
    }
    case types.POST_PRIVATEANDPUBLICGROUPLIST_SUCCESS: {
      return {
        ...state,
        groupList: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default communityReducer;
