import types from "../types/dashboardTypes";
const DashboardReducer = (
  state = {
    isLoading: false,
    availableSlotes: [],
    temporarySlots: [],
    bookedSlots: [],
    currentSuggestionsScheduleTime: [],
    isFCMTokenAvailable: false,
  },
  action: any
) => {
  switch (action.type) {
    //for qoutes
    case types.GET_GETUSERMOBILEDASHBOARDQUOTESBYDATE_REQUEST: {
      return {
        ...state,
        isLoading: true,
        data: action.payload,
      };
    }
    case types.GET_GETUSERMOBILEDASHBOARDQUOTESBYDATE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    }
    case types.GET_GETUSERMOBILEDASHBOARDQUOTESBYDATE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    }
    case types.GETUSERACTIVITYAVAILABILITY_REQUEST: {
      return {
        ...state,
        isLoading: true,
        datavailableSlotesa: action.payload,
      };
    }
    case types.GETUSERACTIVITYAVAILABILITY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        availableSlotes: action.payload,
      };
    }
    case types.GETUSERACTIVITYAVAILABILITY_FAILURE: {
      return {
        ...state,
        isLoading: false,
        availableSlotes: action.payload,
      };
    }
    case types.GETUSERSCHEDULEDACTIVITIESLIST_REQUEST: {
      return {
        ...state,
        isLoading: true,
        bookedSlots: [],
      };
    }
    case types.GETUSERSCHEDULEDACTIVITIESLIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        bookedSlots: action.payload,
      };
    }
    case types.GETUSERSCHEDULEDACTIVITIESLIST_FAILURE: {
      return {
        ...state,
        isLoading: false,
        bookedSlots: [],
      };
    }

    case types.SAVETEMPORARYSLOTDATA: {
      return {
        ...state,
        isLoading: false,
        TemporarySlots: action.payload,
      };
    }
    case types.SAVECURRENTSUGGESTIONSSCHEDULETIMEDATA: {
      return {
        ...state,
        isLoading: false,
        currentSuggestionsScheduleTime: action.payload,
      };
    }
    case "NO_FCM_TOKEN": {
      return {
        ...state,
        isFCMTokenAvailable: false,
      };
    }
    default: {
      return state;
    }
  }
};
export default DashboardReducer;
