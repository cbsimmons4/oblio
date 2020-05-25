import {createStore, combineReducers , applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import aiGuesserReducer from './reducers/aiGuesserReducer';
import modeReducer from './reducers/modeReducer';
import playerGuesserReducer from './reducers/playerGuesserReducer';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
    ai: aiGuesserReducer,
    mode: modeReducer,
    playerGuesser: playerGuesserReducer
});

const store = createStore (
    reducers,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;