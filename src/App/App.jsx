import React, { Suspense, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage as HomePage1 } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { CreateProductPage } from '../CreateProductPage';
const HomePage = React.lazy(() => import('../HomePage/HomePage'))
import style from "./style.css";


export default function App() {
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
            <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <PrivateRoute exact path="/" component={HomePage1} />
                <Route path="/login" component={LoginPage} />
                <Route name="lazy" path="/lazy" component={HomePage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/products/create" component={CreateProductPage} />
                <Redirect from="*" to="/" />
            </Switch>
            </Suspense>
        </Router>
        </div>
        
    );
};
