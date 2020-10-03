import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';

const loggerMiddleware = createLogger();

 function store() { 
    const store = createStore(
        rootReducer,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )      
    );
    if (module.hot) {
        module.hot.accept('../_reducers', () => {
            store.replaceReducer(rootReducer);
        });
    };
    return store;
};

export default store();