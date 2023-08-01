import * as ActionType from '../ActionTypes';

const initState = {
    department: [],
    loading: false,
    error: null
}

export const departmentReducer = (state=initState, action) => {
    console.log(action);

    switch(action.type) {
        case ActionType.GET_DEPARTMENT:
            return {
                ...state,
                department: action.payload
            }
        case ActionType.ADD_DEPARTMENT:
            return{
                ...state,
                department: state.department.concat(action.payload)
            }
        case ActionType.DELETE_DEPARTMENT:
            return{
                ...state,
                department: state.department.filter((v) => v.id !== action.payload)
            }
        case ActionType.UPDATE_DEPARTMENT:
            return{
                ...state,
                department: state.department.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return v;
                    }
                })
            }
        default :
        return state;
    }
}