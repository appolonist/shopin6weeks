import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { CreateProductPage } from '../CreateProductPage';
import { hot } from 'react-hot-loader';

import style from "./style.css";

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
        <div className="container">
        {alert.message &&
            <div className={`alert ${alert.type}`}>{alert.message}</div>
        }
        <Router history={history}>
            <Switch>
                <PrivateRoute exact path="/" component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/products/create" component={CreateProductPage} />
                <Redirect from="*" to="/" />
            </Switch>
        </Router>
        </div>
        
    );
};

export default hot(module)(App);