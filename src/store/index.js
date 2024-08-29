import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { thunk } from 'redux-thunk';  // Correct way to import `redux-thunk`


import calendarReducer from '../reducers/calendarReducer';
import serviceChangeReducer from '../reducers/serviceChangeReducer'
 
const reducer = combineReducers({
    calendarState: calendarReducer,
    eventState: serviceChangeReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
));

export default store;