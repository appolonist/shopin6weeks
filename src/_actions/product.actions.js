import { productConstants } from '../_constants';
import { productService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const productActions = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


function create(product) {
    return dispatch => {
        dispatch(request(product));

        productService.create(product)
            .then(
                product => { 
                    dispatch(success());
                    history.push('/products/create/true');
                    dispatch(alertActions.success('Product is added.'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(product) { return { type: productConstants.CREATE_REQUEST, product } }
    function success(product) { return { type: productConstants.CREATE_SUCCESS, product } }
    function failure(error) { return { type: productConstants.CREATE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        productService.getAll()
            .then(
                products => dispatch(success(products)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: productConstants.GETALL_REQUEST } }
    function success(products) { return { type: productConstants.GETALL_SUCCESS, products } }
    function failure(error) { return { type: productConstants.GETALL_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request(id));

        productService.getById(id)
            .then(
                product => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: productConstants.GET_REQUEST, id } }
    function success(id) { return { type: productConstants.GET_SUCCESS, id } }
    function failure(id, error) { return { type: productConstants.GET_FAILURE, id, error } }
}
function update(id) {
    return dispatch => {
        dispatch(request(id));

        productService.update(id)
            .then(
                product => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: productConstants.UPDATE_REQUEST, id } }
    function success(id) { return { type: productConstants.UPDATE_SUCCESS, id } }
    function failure(id, error) { return { type: productConstants.UPDATE_FAILURE, id, error } }
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        productService.delete(id)
            .then(
                product => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: productConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: productConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: productConstants.DELETE_FAILURE, id, error } }
}