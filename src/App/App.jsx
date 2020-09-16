import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';

import { Header } from '../Header';


function App() {

    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        
        <div>
        {alert.message &&
            <div className={`alert ${alert.type}`}>{alert.message}</div>
        }
        <Header />
        </div>
    )
};

export {App}