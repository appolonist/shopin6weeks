import { productConstants } from '../_constants';

export function productCreation(state = {}, action) {
    switch (action.type) {
        case productConstants.CREATE_REQUEST:
            return { creating: true };
        case productConstants.CREATE_SUCCESS:
            return {};
        case productConstants.CREATE_FAILURE:
            return {};
        default:
            return state
    }
}