import * as actions from '../../actions';
import 'babel-polyfill';
import axios from 'axios';
import { FETCH_ADDRESSES, FETCH_ADDRESS, UPDATE_ADDRESS, CREATE_ADDRESS, 
    DELETE_ADDRESS, FILTER_ADDRESSES, SORT_ADDRESSES } from '../../actions/types';
jest.mock('axios');

describe('actions', () => {
    it('should dispatch a fetch action correctly', async () => {
        const resp = {data: 1};
        axios.get.mockResolvedValue(resp);

        const dispatch = jest.fn();
        await actions.fetchAddresses()(dispatch);
        expect(dispatch).toBeCalledTimes(1);
        expect(dispatch).toBeCalledWith({type: FETCH_ADDRESSES, payload: 1});
    })
})