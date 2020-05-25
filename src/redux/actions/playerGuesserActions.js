import {
    SET_LOADING,
    DONE_LOADING,
    SET_ERROR,
    PLAYER_WON,
    GUESS_MADE
} from '../types';

export const setError = (errorMessage) => (dispatch) => {
    dispatch({
        type: SET_ERROR,
        payload: errorMessage
    })
}

export const playerWin = () => (dispatch) => {
    dispatch({
        type: PLAYER_WON
    })
}

export const guessMade = (guess) => (dispatch) => {
    dispatch({
        type: SET_LOADING
    })
    dispatch({
        type: GUESS_MADE,
        payload: guess
    })
    dispatch({
        type: DONE_LOADING
    })

}
