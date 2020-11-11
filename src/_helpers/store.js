import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import {default as rootReducer} from '../_reducers';

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
    if (module.hot) {
        module.hot.accept('../_reducers', () => {
            store.replaceReducer(rootReducer);
        });
    };
    return store;
};

export default store();