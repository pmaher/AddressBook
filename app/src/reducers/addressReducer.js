import { FETCH_ADDRESSES, FETCH_ADDRESS, UPDATE_ADDRESS } from '../actions/types';

export default function( state = {}, action) {
    switch(action.type) {
        case FETCH_ADDRESSES:
            return Object.assign({}, state, {
                addresses: action.payload
            });
        case FETCH_ADDRESS:
        case UPDATE_ADDRESS:    
            return Object.assign({}, state, {
                address: action.payload
            });
        default:
            return state;
    }
}