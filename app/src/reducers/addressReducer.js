import { FETCH_ADDRESSES, FETCH_ADDRESS, UPDATE_ADDRESS, CREATE_ADDRESS, 
        DELETE_ADDRESS, FILTER_ADDRESSES, SORT_ADDRESSES } from '../actions/types';

//TODO: break this up into different state functions
export default function( state = {}, action) {

    switch(action.type) {
        case FETCH_ADDRESSES:
            return Object.assign({}, state, {
                addresses: action.payload
            });
        case FILTER_ADDRESSES:
            return Object.assign({}, state, {
                filterString: action.payload
            });
        case SORT_ADDRESSES:
            const {sortBy, sortOrder} = action.payload;
            return Object.assign({}, state, { sortBy, sortOrder });
        case FETCH_ADDRESS:
        case UPDATE_ADDRESS:
        case CREATE_ADDRESS:       
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