import * as ActionType from '../ActionTypes';

const initState = {
    medicine: [],
    loading: false,
    error: null
}

export const medicineReducer = (state = initState, action) => {
    console.log(action);

    switch (action.type) {
        case ActionType.GET_MEDICINE:
            return {
                ...state,
                medicine: action.payload
            }
        case ActionType.ADD_MEDICINE:
            return {
                ...state,
                medicine: state.medicine.concat(action.payload)
            }
        case ActionType.DELETE_MEDICINE:
            return {
                ...state,
                medicine: state.medicine.filter((v) => v.id !== action.payload)
            }
        case ActionType.UPDATE_MEDICINE:
            return {
                ...state,
                medicine: state.medicine.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return v;
                    }
                })
            }
        default:
            return state;
    }
}