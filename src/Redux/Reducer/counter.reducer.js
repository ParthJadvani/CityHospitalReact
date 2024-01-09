import * as ActionType from '../ActionTypes'

const initState = {
    count: 0
}

export const counterReducer = (state=initState, action) => {

    switch(action.type) {
        case ActionType.INCREMENT_COUNT :
            return {
                count: state.count + 1
            }
        case ActionType.DECREMENT_COUNT:
            return{
                count: state.count -1
            }
        default:
            return state

    }
}