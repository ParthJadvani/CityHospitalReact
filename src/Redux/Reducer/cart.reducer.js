import * as ActionType from '../ActionTypes';

const iniState = {
    items: [],
    loading: false,
    error: null
}

export const cartReducer = (state = iniState, action) => {
    console.log(action);

    switch (action.type) {
        case ActionType.ADD_TO_CART:
            let item = state.items.some((v) => v.pid === action.payload.pid);
            console.log(item);

            if (item) {
                let index = state.items.findIndex((v) => v.pid === action.payload.pid);
                state.items[index].qty++;
            } else {
                state.items.push(action.payload);
            }
            console.log(state);
            // console.log(item);

            return {
                items: state.items,
                loading: false,
                error: null
            }
        default:
            return state;
    }
}