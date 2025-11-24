import { SeekerName } from "../../screens";
import types from "../types/loginTypes";
const loginReducer = (
    state = {
        isLoading: false,
        SourceId: null,
        Token: null,
        DeviceToken: null,
        userLoginDetails: null,
        userType: null,
        SeekerName:null
    },
    action: any
) => {

    switch (action.type) {
        case types.POST_SELF_SIGNUP_REQUEST: {
            return {
                ...state,
                isLoading: true,
                loginDetail: action.payload
            };
        }
        case types.POST_SELF_SIGNUP_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                loginDetail: action.payload
            };
        }
        case types.POST_SELF_SIGNUP_FAILURE: {
            return {
                ...state, isLoading: false,
                loginDetail: action.payload
            };
        }
        case types.POST_LOGIN_EMAIL_REQUEST: {
            return {
                ...state,
                isLoading: true,
                loginDetail: action.payload
            };
        }
        case types.POST_LOGIN_EMAIL_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                loginDetail: action.payload
            };
        }
        case types.POST_LOGIN_EMAIL_FAILURE: {
            return {
                ...state, isLoading: false,
                loginDetail: action.payload
            };
        }
        case types.POST_USERTYPE_REQUEST: {
            return {
                ...state, isLoading: false,
                userType: action.payload
            };
        }
        case types.POST_USERTYPE_SUCCESS: {
            return {
                ...state, isLoading: false,
                userType: action.payload
            };
        }
        case types.POST_USERTYPE_FAILURE: {
            return {
                ...state, isLoading: false,
                userType: action.payload
            };
        }


    
        case types.SEEKER_NAME_REQUEST: {
            return {
                ...state, isLoading: false,
                SeekerName: action.payload
            };
        }
        // case types.SEEKER_NAME_SUCCESS: {
        //     return {
        //         ...state, isLoading: false,
        //         SeekerName: action.payload
        //     };
        // }
        // case types.SEEKER_NAME_FAILURE: {
        //     return {
        //         ...state, isLoading: false,
        //         SeekerName: action.payload
        //     };
        // }




        default: {
            return state;
        }
    }
}
export default loginReducer;