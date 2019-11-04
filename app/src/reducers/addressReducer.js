import { FETCH_ADDRESSES, FETCH_ADDRESS, UPDATE_ADDRESS, DELETE_ADDRESS } from '../actions/types';

//TODO: break this up into different state functions
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
        case DELETE_ADDRESS:
            return Object.assign({}, state, {addresses: state.addresses.filter(address=> {
                if(address.id !== action.payload.addressId) { 
                    return address; 
                }
            })});
        default:
            return state;
    }
}