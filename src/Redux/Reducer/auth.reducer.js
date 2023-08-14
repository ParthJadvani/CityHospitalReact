import * as ActionType from '../ActionTypes';

const iniState = {
    user: null,
    loading: false,
    error: null
}

export const authReducer = (state = iniState, action) => {

    switch (action.type) {
        case ActionType.SIGNUP_REQUEST:
        case ActionType.LOGIN_REQUEST:
        case ActionType.FORGET_REQUEST:
        case ActionType.LOGOUT_REQUEST:
            return {
                user: null,
                loading: true,
                error: null
            }
        case ActionType.EMAIL_VERIFICATION:
            return {
                user: null,
                loading: false,
                error: null
            }
        case ActionType.AUTH_ERRORE:
            return {
                user: null,
                loading: false,
                error: action.payload
            }
        case ActionType.LOGGED_IN:
            return {
                user: action.payload,
                loading: false,
                error: null
            }
        case ActionType.LOGGED_OUT:
            return {
                user: null,
                loading: false,
                error: null
            }
        default:
            return state;
    }
}