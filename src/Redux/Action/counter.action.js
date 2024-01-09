import * as ActionType from '../ActionTypes'

export const increment = () => (dispach) => {
    dispach({type: ActionType.INCREMENT_COUNT})
}

export const decrement = () => (dispach) => {
    dispach({type: ActionType.DECREMENT_COUNT})
}