import {
    SET_ERROR,
    SET_LOADING,
    DONE_LOADING,
    PLAYER_WON,
    GUESS_MADE,
    RESTART
} from '../types';

const pickNewNumber = () => {
    let possibleChoices = [];
    for (var forthDigit=0; forthDigit <= 9; forthDigit++) {
        for (var thirdDigit= 0; thirdDigit <= 9; thirdDigit++) {
            if(thirdDigit === forthDigit) continue;
            for (var secondDigit= 0; secondDigit <= 9; secondDigit++) {
                if (secondDigit === thirdDigit || secondDigit === forthDigit) continue
                for (var firstDigit= 0; firstDigit <= 9; firstDigit++) {
                    if (firstDigit === secondDigit || firstDigit === thirdDigit || firstDigit === forthDigit) continue
                    possibleChoices = [...possibleChoices,[forthDigit,thirdDigit,secondDigit,firstDigit]];
                }
            }
        }
    }
    return possibleChoices[Math.floor(Math.random()*possibleChoices.length)]
}

const getScore = (guess, current) => {
    let hardMatch = 0;
    let softMatch = 0;
    for (let i = 0; i < guess.length; i++){
        if (guess[i] === current[i]) hardMatch++;
        for (let j = 0; j <current.length; j++){
            if (i !== j && guess[i] === current[j]) softMatch++;
        }
    }
    return [hardMatch, softMatch];
}

const initialState = {
    currentNumberChoice: pickNewNumber(), 
    uiStateP: 'playerGuessing',
    loadingP: false,
    guessCountP: 0,
    history: [],
    errorMessage: ''
}

export default function (state = initialState, action) {
    switch(action.type){
        case SET_LOADING:
            return {
                ...state,
                loadingP: true
            }
        case DONE_LOADING:
            return {
                ...state,
                loadingP: false
            }
        case SET_ERROR: 
            return {
                ...state,
                errorMessage: action.payload
            }
        case PLAYER_WON: {
            return {
                ...state,
                uiStateP: 'playerWon',
                guessCountP: state.guessCountP + 1
            }
        }
        case GUESS_MADE: {
            return {
                ...state,
                guessCountP: state.guessCountP + 1,
                history: [
                    {guess: action.payload, 
                    score: getScore(action.payload,state.currentNumberChoice)},
                    ...state.history
                ]
            }
        }
        case RESTART:
            return {
                ...initialState,
                currentNumberChoice: pickNewNumber()
            }
        default:
             return state;
    }
}
