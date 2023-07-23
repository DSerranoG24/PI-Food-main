import { createStore, applyMiddleware, compose} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddlewaare from "redux-thunk";
import root_Reducer from '../reducer/reducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    root_Reducer,
    composeWithDevTools(applyMiddleware(thunkMiddlewaare))
    );

export default store;