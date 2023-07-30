import * as ActionType from '../ActionTypes';

export const addToFav = (id) => (dispatch) => {
    dispatch({type: ActionType.ADD_TO_FAV, payload: {fid: id}});
}