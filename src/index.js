import React from 'react';
import  ReactDOM  from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './_helpers';
import { App } from './App';



ReactDOM.unstable_createBlockingRoot(document.getElementById('app'))
        .render(
                    <Provider store={store}>
                        <App />
                    </Provider>
        );