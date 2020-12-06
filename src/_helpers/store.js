import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';

const loggerMiddleware = createLogger();

 function store() { 
    const store = createStore(
        rootReducer,
        composeWithDevTools(
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        ))      
    );
  
    return store;
};

export default store;

export const middlewares = [thunkMiddleware];