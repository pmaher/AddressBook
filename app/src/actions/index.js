import axios from 'axios';
import { FETCH_ADDRESSES, FETCH_ADDRESS, UPDATE_ADDRESS, CREATE_ADDRESS, DELETE_ADDRESS } from '../actions/types';

export const fetchAddresses = () => async dispatch => {
    const res = await axios.get('/api/address');
    dispatch({ type: FETCH_ADDRESSES, payload: res.data });
};

export const fetchAddress = (addressId) => async dispatch => {
    const res = await axios.get(`/api/address/${addressId}`);
    dispatch({ type: FETCH_ADDRESS, payload: res.data });
};

export const updateAddress = (address, history) => async dispatch => {
    const res = await axios.put(`/api/address/${address.id}`, address);
    //go back to the homepage after updating an address
    history.push('/');
    dispatch({ type: UPDATE_ADDRESS, payload: res.data });
};

export const createAddress = (address, history) => async dispatch => {
    const res = await axios.post('/api/address/', address);
    //go back to the homepage after creating the address
    history.push('/');
    dispatch({ type: CREATE_ADDRESS, payload: res.data });
};

export const deleteAddress = (addressId) => async dispatch => {
    await axios.delete(`/api/address/${addressId}`);
    dispatch({ type: DELETE_ADDRESS, payload: { addressId } });
}