require('../helpers/enzyme-setup');
import React from 'react';
import AddressList from '../../components/AddressList';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import 'babel-polyfill';
import axios from 'axios';
import { combineReducers } from 'redux';
import reducers from '../../reducers/addressReducer';
import { createStore, applyMiddleware } from 'redux';
jest.mock('axios');

describe('AddressList Component', () => {
  let wrapper;
  function firstNameAtIndex(index) {
    return wrapper.find('tr').at(index).find('[data-test="first-name"]').text();
  }
  function setup(state) {
    const initialState = {
      reducers: state
    };
    const addresses = [{id: 1, firstName: 'George', lastName: 'McFly', email: 'gm@gm.com'},
                  {id: 2, firstName: 'Biff', lastName: 'Tannen', email: 'bt@bt.com'},
                {id: 3, firstName: 'Lorraine', lastName: 'Bates', email: 'lb@lb.com'}];
    const myStore = createStore(combineReducers({ reducers }), initialState, applyMiddleware(reduxThunk));
    axios.get.mockResolvedValue({data: addresses});
    const mountWithProvider = children => (store = myStore) => mount(<Provider store={store}>{children}</Provider>);
    wrapper = mountWithProvider(<Router><AddressList {...initialState} /></Router>)();
  };

  it('renders the address list in asc order', (done) => {
    setup({ addresses:[], filterString:'', sortBy:'firstName', sortOrder:'asc' });
    expect(wrapper.exists()).toBe(true);
    setImmediate(() => {
      /* this update is needed since the enzyme wrapper is immutable as of v.3
      updates the mounted wrapper to reflect data from the mock ajax request */
      wrapper.update();
      //header plus 3 rows of data
      expect(wrapper.find('tr').length).toBe(4);
      expect(firstNameAtIndex(1)).toBe('Biff');
      expect(firstNameAtIndex(2)).toBe('George');
      expect(firstNameAtIndex(3)).toBe('Lorraine');
      done();
    });  
  });

  it('filters the address list when a search filter exists', (done) => {
    setup({ addresses:[], filterString:'bates', sortBy:'firstName', sortOrder:'asc' });
    expect(wrapper.exists()).toBe(true);
    setImmediate(() => {
      /* this update is needed since the enzyme wrapper is immutable as of v.3
      updates the mounted wrapper to reflect data from the mock ajax request */
      wrapper.update();
      //header plus 1 row of data
      expect(wrapper.find('tr').length).toBe(2);
      expect(firstNameAtIndex(1)).toBe('Lorraine');
      done();
    });  
  });
  
  it('sorts the address list in desc order', (done) => {
    setup({ addresses:[], filterString:'', sortBy:'email', sortOrder:'desc' });
    expect(wrapper.exists()).toBe(true);
    setImmediate(() => {
      /* this update is needed since the enzyme wrapper is immutable as of v.3
      updates the mounted wrapper to reflect data from the mock ajax request */
      wrapper.update();
      //header plus 1 row of data
      expect(wrapper.find('tr').length).toBe(4);
      expect(firstNameAtIndex(1)).toBe('Lorraine');
      expect(firstNameAtIndex(2)).toBe('George');
      expect(firstNameAtIndex(3)).toBe('Biff');
      done();
    });  
  });
});