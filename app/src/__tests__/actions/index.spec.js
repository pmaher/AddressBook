import * as actions from '../../actions';
import 'babel-polyfill';
import axios from 'axios';
import { FETCH_ADDRESSES, FETCH_ADDRESS, UPDATE_ADDRESS, CREATE_ADDRESS, 
    DELETE_ADDRESS, FILTER_ADDRESSES, SORT_ADDRESSES } from '../../actions/types';
jest.mock('axios');

describe('actions', () => {
    it('should dispatch a fetch all addresses action', async () => {
        axios.get.mockResolvedValue({data: 1});
        const dispatch = jest.fn();
        await actions.fetchAddresses()(dispatch);
        expect(axios.get).toBeCalledWith('/api/address');
        expect(dispatch).toBeCalledTimes(1);
        expect(dispatch).toBeCalledWith({type: FETCH_ADDRESSES, payload: 1});
    })

    it('should dispatch the filter action', () => {
        const dispatch = jest.fn();
        actions.filterAddresses('afilterstring')(dispatch);
        expect(dispatch).toBeCalledTimes(1);
        expect(dispatch).toBeCalledWith({ type: FILTER_ADDRESSES, payload: 'afilterstring' });
    })

    it('should dispatch the sort action', () => {
        const dispatch = jest.fn();
        actions.sortAddresses('mySortBy', 'mySortOrder')(dispatch);
        expect(dispatch).toBeCalledTimes(1);
        expect(dispatch).toBeCalledWith({ type: SORT_ADDRESSES, payload: { sortBy: 'mySortBy', sortOrder: 'mySortOrder'}})
    })

    it('should dispatch the fetch single address action', async () => {
        axios.get.mockResolvedValue({ data: 2});
        const dispatch = jest.fn();
        await actions.fetchAddress(11)(dispatch);
        expect(axios.get).toBeCalledWith('/api/address/11');
        expect(dispatch).toBeCalledTimes(1);
        expect(dispatch).toBeCalledWith({ type: FETCH_ADDRESS, payload: 2});
    })

    it('should dispatch the update address action', async () => {
        const address = { id: 11, firstName: 'Jill' },
            dispatch = jest.fn(),
            mockHistory = [];
        axios.put.mockResolvedValue({ data: address });
        await actions.updateAddress(address, mockHistory)(dispatch);
        expect(axios.put).toBeCalledWith('/api/address/11', address);
        expect(dispatch).toBeCalledTimes(1);
        expect(dispatch).toBeCalledWith({ type: UPDATE_ADDRESS, payload: address});
        //signifies going back to the homepage
        expect(mockHistory).toContain('/');
    })

    it('should dispatch the create address action', async () => {
        const address = { id: 22, firstName: 'John' },
            dispatch = jest.fn(),
            mockHistory = [];
        axios.post.mockResolvedValue({ data: address });
        await actions.createAddress(address, mockHistory)(dispatch);
        expect(axios.post).toBeCalledWith('/api/address/', address);
        expect(dispatch).toBeCalledTimes(1);
        expect(dispatch).toBeCalledWith({ type: CREATE_ADDRESS, payload: address});
        //signifies going back to the homepage
        expect(mockHistory).toContain('/');
    })

    it('should dispatch the delete address action', async () => {
        const dispatch = jest.fn();
        await actions.deleteAddress(11)(dispatch);
        expect(axios.delete).toBeCalledWith('/api/address/11');
        expect(dispatch).toBeCalledTimes(1);
        expect(dispatch).toBeCalledWith({ type: DELETE_ADDRESS, payload: { addressId: 11 }});
    })
})