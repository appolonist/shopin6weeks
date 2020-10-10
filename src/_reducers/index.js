import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { productCreation } from './productCreation.reducer';
import { users } from './users.reducer';
import { products } from './products.reducer'
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    productCreation,
    products,
    users,
    alert
});

export default rootReducer;