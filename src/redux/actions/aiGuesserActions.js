import {
    SET_LOADING,
    DONE_LOADING,
    START_NEW_GAME,
    NUMBER_THOUGHT_OF,
    YES_PRESSED,
    NO_PRESSED,
    ADD_HISTORY,
    GATHER_INTEL,
    MAKE_GUESS,
    RESTART
} from '../types';

export const startGame = () => (dispatch) => {
    dispatch({
        type: START_NEW_GAME
    })
}

export const startGuessing = () => (dispatch) => {
    dispatch({
        type: NUMBER_THOUGHT_OF
    })
}

export const aiWin = () => (dispatch) => {
    dispatch({
        type: YES_PRESSED
    })
}

export const restart = () => (dispatch) => {
    dispatch({
        type: SET_LOADING
    })
    setTimeout( () => {
        dispatch({
            type: RESTART
        })
        dispatch({
            type: DONE_LOADING
        })
    }, 500);
}

export const goToEnterScore = () => (dispatch) => {
    dispatch({
        type: NO_PRESSED
    })
}

export const updateGuess = (hardMatch,softMatch) => (dispatch) => {
    dispatch({
        type: SET_LOADING
    })
    dispatch({
        type: ADD_HISTORY,
        payload: [hardMatch, softMatch]
    })
    dispatch({
        type: GATHER_INTEL,
        payload: [hardMatch, softMatch]
    })
    dispatch({
        type: MAKE_GUESS
    })
    dispatch({
        type: DONE_LOADING
    })
}