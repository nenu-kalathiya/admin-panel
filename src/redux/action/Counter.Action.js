import * as ActionType from '../ActionType'

export const Increment = () => (dispatch) => {
    dispatch({type: ActionType.INCREMENT_COUNTER})
}

export const Decrement = () => (dispatch) => {
    dispatch({type: ActionType.DECREMENT_COUNTER})
}