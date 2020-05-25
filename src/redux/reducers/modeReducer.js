import {
    TOGGLE_MODE
} from '../types';

const initialState = {
    aiMode: true   
}

export default function (state = initialState, action){
    switch(action.type){
        case TOGGLE_MODE:
            return {aiMode: !state.aiMode} 
        default:
             return state;
    }
}

