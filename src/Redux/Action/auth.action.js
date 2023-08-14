import * as ActionType from '../ActionTypes';

export const signupRequest = (data) => (dispatch) => {
    dispatch({ type: ActionType.SIGNUP_REQUEST, payload: data });
}

export const emailVerification = () => (dispatch) => {
    dispatch({ type: ActionType.EMAIL_VERIFICATION });
}

export const loginRequest = (data) => (dispatch) => {
    dispatch({ type: ActionType.LOGIN_REQUEST, payload: data });
}

export const forgetRequest = (data) => (dispatch) => {
    dispatch({type: ActionType.FORGET_REQUEST, payload: data});
}

export const authError = (data) => (dispatch) => {
    dispatch({type: ActionType.AUTH_ERRORE, payload: data});
}

export const loggedIn = (data) => (dispatch) => {
    dispatch({type: ActionType.LOGGED_IN, payload: data});
}

export const logoutRequest = () => (dispatch) => {
    dispatch({type: ActionType.LOGOUT_REQUEST});
}

export const loggedOut = () => (dispatch) => {
    dispatch({type: ActionType.LOGGED_OUT});
}