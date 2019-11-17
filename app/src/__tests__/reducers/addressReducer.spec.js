import reducer from '../../reducers/addressReducer';
import { FETCH_ADDRESSES, FETCH_ADDRESS, UPDATE_ADDRESS, CREATE_ADDRESS, 
  DELETE_ADDRESS, FILTER_ADDRESSES, SORT_ADDRESSES } from '../../actions/types';

describe('address reducer', () => {
  it('should return an empty object when the state is undefined and the action type is not recognized', () => {
    expect(reducer(undefined, 'UNKNOWN')).toEqual({});
  });

  it('should add addresses to the existing state when fetching addresses', () => {
    //given an empty state, and addresses in the action payload
    const state = { existingAttr: true }, action = { type: FETCH_ADDRESSES, payload: [{firstName: "John"}, {firstName: "Jill"}] };

    //when caling the reducer for a particular action
    const newState = reducer(state, action);
    //then the returned state should have the addresses assigned to it
    expect(newState.addresses).toEqual(action.payload);
    //and previous attributes on the state are preserved
    expect(newState.existingAttr).toEqual(state.existingAttr);
  });

  it('should assign the appropriate filter string to the state when filtering', () => {
    //given an existing state and a filter action
    const state = { addresses: [1,2,3] }, action = { type: FILTER_ADDRESSES, payload: 'mySearchString'}; 
    //when calling the reducer for a filter action
    const newState = reducer(state, action);
    //then the filterString should be associated with the state
    expect(newState.filterString).toEqual(action.payload);
    //and previous attributes on the state are preserved
    expect(newState.addresses).toEqual(state.addresses);
  });

  it('should assign sort order and sort by attributes to the state when sorting', () => {
    //given an existing state and a sort action
    const state = { aField: 'bla' }, action = { type: SORT_ADDRESSES, payload: {sortBy: 'lastName', sortOrder: 'desc'}};
    //when calling the reducer for said action
    const newState = reducer(state, action);
    //then the sort order and sort by should be stored in the new state
    expect(newState.sortOrder).toEqual(action.payload.sortOrder);
    expect(newState.sortBy).toEqual(action.payload.sortBy);
    //and previous attr's on the state are preserved
    expect(newState.aField).toEqual(state.aField);
  });


  it('should assign an address to the state when fetching, updating or creating an address', () => {
    //given an existing state and a few existing actions
    const state = {}, 
      fetchAction = { type: FETCH_ADDRESS, payload: {firstName: 'Paul'}},
      updateAction = { type: UPDATE_ADDRESS, payload: {firstName: 'Ringo'}},
      createAction = { type: CREATE_ADDRESS, payload: {firstName: 'George'}};

    //when calling the reducer for the fetch, the address should now be associated with the state
    expect(reducer(state, fetchAction).address).toEqual(fetchAction.payload);
    //when calling the reducer for the fetch, the address should now be associated with the state
    expect(reducer(state, updateAction).address).toEqual(updateAction.payload);
    //when calling the reducer for the fetch, the address should now be associated with the state
    expect(reducer(state, createAction).address).toEqual(createAction.payload);
  });

  it('should remove an address from the state when a delete action is recieved', () => {
    const state = { addresses: [{id:1}, {id:2}, {id:3}]},
      action = { type: DELETE_ADDRESS, payload: { addressId: 2}};

    //when calling the reducer for the delete action  
    const newState = reducer(state, action);
    //then address 2 has been removed
    expect(newState.addresses).toEqual([{id:1}, {id:3}]);
  });
});