import { FETCH_ADDRESSES, FETCH_ADDRESS } from '../actions/types';

export default function( state = {}, action) {
    switch(action.type) {
        case FETCH_ADDRESSES:
            //return action.payload;
            return Object.assign({}, state, {
                addresses: action.payload
            });
        case FETCH_ADDRESS:
            //return action.payload;
            return Object.assign({}, state, {
                address: action.payload
            });
        default:
            return state;
    }
}