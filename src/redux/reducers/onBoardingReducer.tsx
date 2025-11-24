import logger from "../../constant/logger";
import types from "../types/loginTypes";
import onBoardingTypes from "../types/onBoardingTypes";
const onBoardingReducer = (
  state = {
    isLoading: false,
    shortTermGoalData: null,
    longTermGoalData: null,
    medicalCondition: null,
    fitnessActivity: null,
    stressors: null,
    onboardingStepsQuestions: null,
    recommendationQuestion: [],
  },
  action: any
) => {
  switch (action.type) {
    case types.POST_USERTYPE_REQUEST: {
      return {
        ...state,
        isLoading: false,
        userType: action.payload,
      };
    }
    case types.POST_USERTYPE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        userType: action.payload,
      };
    }
    case types.POST_USERTYPE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        userType: action.payload,
      };
    }
    //new code for getting onboarding question on dashboard to user in overview tab
    case onBoardingTypes.GET_ON_BOARDING_STEPS_REQUEST: {
      return {
        ...state,
        isLoading: false,
        onboardingStepsQuestions: action.payload,
      };
    }
    case onBoardingTypes.GET_ON_BOARDING_STEPS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        onboardingStepsQuestions: action.payload,
      };
    }
    case onBoardingTypes.GET_ON_BOARDING_STEPS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        onboardingStepsQuestions: action.payload,
      };
    }
    case onBoardingTypes.SAVE_SHORT_TERM_GOAL_DATA: {
      return {
        ...state,
        isLoading: false,
        shortTermGoalData: action.payload,
      };
    }
    case onBoardingTypes.SAVE_LONG_TERM_GOAL_DATA: {
      return {
        ...state,
        isLoading: false,
        longTermGoalData: action.payload,
      };
    }
    case onBoardingTypes.SAVE_MEDICAL_CONDITIONS: {
      return {
        ...state,
        isLoading: false,
        medicalCondition: action.payload,
      };
    }
    case onBoardingTypes.FITNESS_ACTIVITY: {
      return {
        ...state,
        isLoading: false,
        fitnessActivity: action.payload,
      };
    }
    case onBoardingTypes.SAVE_STRESSORS_TRIGGERS: {
      return {
        ...state,
        isLoading: false,
        stressors: action.payload,
      };
    }
    case onBoardingTypes?.GET_RECOMMENDATION_QUESTION_REQUEST ||
      onBoardingTypes?.GET_RECOMMENDATION_QUESTION_FAILURE: {
      return {
        ...state,
        isloading: false,
        recommendationQuestion: [],
      };
    }
    case onBoardingTypes?.GET_RECOMMENDATION_QUESTION_SUCCESS: {
      logger("action__in_recommendation", action);
      return {
        ...state,
        recommendationQuestion: action?.payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default onBoardingReducer;
