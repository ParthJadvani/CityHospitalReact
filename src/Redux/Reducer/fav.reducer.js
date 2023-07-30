import * as ActionType from '../ActionTypes';

const iniState = {
    items: [],
    loading: false,
    error: null
}

export const favReducer = (state = iniState, action) => {
    console.log(action);

    switch(action.type) {
        case ActionType.ADD_TO_FAV:
            let item = state.items.some((v) => v.fid === action.payload.fid);
            console.log(item);
            // state.items.push(action.payload);
            if (item) {
                
            } else {
                state.items.push(action.payload);
            }

            console.log(item, state);
            return {
                items: state.items,
                loading: false,
                error: null
            };
        default:
            return state;
    }
}