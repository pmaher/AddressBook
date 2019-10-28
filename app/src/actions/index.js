import axios from 'axios';
import { FETCH_ADDRESSES, FETCH_ADDRESS } from '../actions/types';

export const fetchAddresses = () => async dispatch => {
    const res = await axios.get('/api/address');
    dispatch({ type: FETCH_ADDRESSES, payload: res.data });
};

export const fetchAddress = (addressId) => async dispatch => {
    const res = await axios.get(`/api/address/${addressId}`);
    dispatch({ type: FETCH_ADDRESS, payload: res.data });
};