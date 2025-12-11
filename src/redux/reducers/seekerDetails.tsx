import { SeekerName } from "../../screens";
import types from "../types/seekerDeatls";
const seekerDetailsReducer = (
  state = {
    isLoading: false,
    SourceId: null,
    Token: null,
    DeviceToken: null,
    userLoginDetails: null,
    userType: null,
    SeekerName: null,
    seekerDetails: null,
    buySubscriptionDetail: {},
  },
  action: any
) => {
  switch (action.type) {
    // case types.GET_SEEKER_PERSONAL_INFO_REQUEST: {
    //   return {
    //     ...state,
    //     isLoading: true,
    //     seekerDetails: action.payload,
    //   };
    // }
    case types.GET_SEEKER_PERSONAL_INFO_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        seekerDetails: action.payload,
      };
    }
    case types.GET_SEEKER_PERSONAL_INFO_FAILURE: {
      return {
        ...state,
        isLoading: false,
        seekerDetails: action.payload,
      };
    }
    case types.GET_SEEKER_PERSONAL_INFO_SUCCESS: {
      return {
        ...state,
        buySubscriptionDetail: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
export default seekerDetailsReducer;
