import axios from 'axios';
import { FETCH_ADDRESSES } from '../actions/types';

export const fetchAddresses = () => async dispatch => {
    const res = await axios.get('/api/address');
    dispatch({ type: FETCH_ADDRESSES, payload: res.data});
};