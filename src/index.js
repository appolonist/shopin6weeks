import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './_helpers';




ReactDOM.unstable_createBlockingRoot(document.getElementById('app'))
        .render(
                    <Provider store={store}>
                        <App />
                    </Provider>
        );