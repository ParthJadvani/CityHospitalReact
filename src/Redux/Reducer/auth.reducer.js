import * as ActionType from '../ActionTypes';

const iniState = {
    user: null,
    loading: false,
    error: null
}

export const authReducer = (state = iniState, action) => {
    console.log(action);

    switch (action.type) {
        case ActionType.SIGNUP_REQUEST:
            return {
                ...state
            }
        default:
            return state;
    }
}