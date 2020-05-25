import {
    SET_LOADING,
    DONE_LOADING,
    TOGGLE_MODE,
    RESTART
} from '../types';

export const toggleMode = () => (dispatch) => {
    dispatch({
        type: SET_LOADING
    })
    setTimeout( () => {
        dispatch({
            type: RESTART
        })
        dispatch({
            type: TOGGLE_MODE
        })
        dispatch({
            type: DONE_LOADING
        })
    }, 500);
}

