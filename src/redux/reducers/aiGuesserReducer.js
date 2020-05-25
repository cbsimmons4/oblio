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

const getInitialPossibleGuesses = () => {
    let possibleGuesses = [];
    for (var forthDigit=0; forthDigit <= 9; forthDigit++) {
        for (var thirdDigit= 0; thirdDigit <= 9; thirdDigit++) {
            if(thirdDigit === forthDigit) continue;
            for (var secondDigit= 0; secondDigit <= 9; secondDigit++) {
                if (secondDigit === thirdDigit || secondDigit === forthDigit) continue
                for (var firstDigit= 0; firstDigit <= 9; firstDigit++) {
                    if (firstDigit === secondDigit || firstDigit === thirdDigit || firstDigit === forthDigit) continue
                    possibleGuesses = [...possibleGuesses,[forthDigit,thirdDigit,secondDigit,firstDigit]];
                }
            }
        }
    }
    return possibleGuesses;
}

const updatePossibleGuesses =  (possibleGuesses,guess, payload) => {
    let newpg = possibleGuesses.filter(current =>  {
        return isMatchingScore( getScore(guess,current), payload )
    });
    return (newpg)
}

const isMatchingScore = (guessScore, payload) => {
    return (guessScore[0] === payload[0] && guessScore[1] === payload[1])
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
    possibleGuesses: getInitialPossibleGuesses(), 
    uiState: 'pregame',
    currentGuess: null,
    loading: false,
    guessCount: 0,
    history: []
}

export default function (state = initialState, action){
    switch(action.type){
        case START_NEW_GAME: {
            return {
                ...state,
                uiState: 'playerThinking'
            }
        }
        case NUMBER_THOUGHT_OF: {
            return {
                ...state,
                uiState: 'guessing',
                currentGuess: state.possibleGuesses[Math.floor(Math.random()*state.possibleGuesses.length)],
                guessCount: state.guessCount + 1 
            }
        }
        case YES_PRESSED: 
            return {
                ...state,
                uiState: 'aiWin'
            }
        case NO_PRESSED:
            return {
                ...state,
                uiState: 'score'
            }
        case ADD_HISTORY:
            return {
                ...state,
                history: [...state.history, {guess: state.currentGuess , score: [action.payload[0],action.payload[1]]} ]
            }
        case GATHER_INTEL: 
            return {
                ...state,
                possibleGuesses: updatePossibleGuesses(state.possibleGuesses,state.currentGuess,action.payload)
            }
        case MAKE_GUESS:
            return {
                ...state,
                currentGuess: state.possibleGuesses[Math.floor(Math.random()*state.possibleGuesses.length)],
                uiState: state.possibleGuesses.length > 0 ? 'guessing' : 'userMistake',
                guessCount: state.possibleGuesses.length > 0 ? state.guessCount + 1 :  state.guessCount
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case DONE_LOADING:
            return {
                ...state,
                loading: false
            }
        case RESTART:
            return initialState 
        default:
             return state;
    }
}
