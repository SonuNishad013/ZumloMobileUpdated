import types from "../types/SubscriptionType";
const SubscriptionReducer = (
  state = {
    list: [],
  },
  action: any
) => {
  switch (action.type) {
    case types.POST_FETCH_PLAN_REQUEST: {
      return {
        ...state,
        list: action.payload,
      };
    }
    case types.POST_FETCH_PLAN_SUCCESS: {
      return {
        ...state,
        list: action.payload,
      };
    }
    case types.POST_FETCH_PLAN_FAILURE: {
      return {
        ...state,
        list: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
export default SubscriptionReducer;
