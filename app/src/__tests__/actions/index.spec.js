import * as actions from '../../actions';
import 'babel-polyfill';
import axios from 'axios';
import { FETCH_ADDRESSES, FETCH_ADDRESS, UPDATE_ADDRESS, CREATE_ADDRESS, 
    DELETE_ADDRESS, FILTER_ADDRESSES, SORT_ADDRESSES } from '../../actions/types';
jest.mock('axios');

describe('actions', () => {
    it('should dispatch a fetch all addresses action', async () => {
        const resp = {data: 1};
        axios.get.mockResolvedValue(resp);
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
        const resp = { data: 2};
        axios.get.mockResolvedValue(resp);
        const dispatch = jest.fn();
        await actions.fetchAddress(11)(dispatch);
        expect(axios.get).toBeCalledWith('/api/address/11');
        expect(dispatch).toBeCalledTimes(1);
        expect(dispatch).toBeCalledWith({ type: FETCH_ADDRESS, payload: 2});

    })
})