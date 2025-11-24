import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import onBoardingReducer from "./onBoardingReducer";
import addDeviceReducer from "./addDeviceReducer";
import seekerDetailsReducer from "./seekerDetails";
import communityReducer from "./communityReducer";
import toastReducer from "./toastReducer";
import dashbaordReducer from "./dashboardReducer";
import SubscriptionReducer from "./SubscriptionReducer";
import recommendationReducer from "./RecommendationReducer";
import types from "../types/loginTypes";

const appReducer = combineReducers({
  loginReducer,
  onBoardingReducer,
  addDeviceReducer,
  seekerDetailsReducer,
  communityReducer,
  toast: toastReducer,
  dashbaordReducer,
  SubscriptionReducer,
  recommendationReducer,
});

export const rootReducer = (state: any, action: any) => {
  if (
    action.type === types.POST_LOGOUT_SUCCESS ||
    action.type === types.POST_LOGOUT_FAILURE
  ) {
    state = undefined;
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;
