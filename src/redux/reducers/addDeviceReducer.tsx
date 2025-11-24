import { SeekerName } from "../../screens";
import types from "../types/addDeviceType";
const addDeviceReducer = (
  state = {
    isLoading: false,
    SourceId: null,
    Token: null,
    DeviceToken: null,
    userLoginDetails: null,
    userType: null,
    SeekerName: null,
    vitalActivityStatus: null,
  },
  action: any
) => {
  switch (action.type) {
    case types.GET_VITALS_ACTIVITY_STATUS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        vitalActivityStatus: action.payload,
      };
    }
    case types.GET_VITALS_ACTIVITY_STATUS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        vitalActivityStatus: action.payload,
      };
    }
    case types.GET_VITALS_ACTIVITY_STATUS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        vitalActivityStatus: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
export default addDeviceReducer;
