import { HIDE_TOAST, SHOW_TOAST } from "../actions/toastActions";
const initialState = {
    isVisible: false,
    toastType: '',
    message: '',
};

const toastReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_TOAST:
            return {
                ...state,
                isVisible: true,
                toastType: action.payload.toastType,
                message: action.payload.message,
            };
        case HIDE_TOAST:
            return {
                ...state,
                isVisible: false,
                toastType: '',
                message: '',
            };
        default:
            return state;
    }
};

export default toastReducer;
