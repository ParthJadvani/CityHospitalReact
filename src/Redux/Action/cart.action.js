import * as ActionType from '../ActionTypes';


export const addToCart = (data) => (dispatch) => {
    // console.log(id);
    dispatch({type: ActionType.ADD_TO_CART, payload: data});
}

export const incCart = (id) => (dispatch) => {
    dispatch({type: ActionType.INC_QTY, payload: id});
}

export const decCart = (id) => (dispatch) => {
    dispatch({type: ActionType.DEC_QTY, payload: id});
}

export const removeCart = (id) => (dispatch) => {
    dispatch({type: ActionType.REMOVE_ITEM, payload: id});
}