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
  let props;

  beforeEach(() => {
    props = {
      reducers: {
          addresses:[], 
          filterString:'', 
          sortBy:'firstName', 
          sortOrder:'asc'
      }
    };
  });

  it('renders address list without crashing', (done) => {
    const initialState = props,
      myStore = createStore(combineReducers({ reducers }), initialState, applyMiddleware(reduxThunk));

    axios.get.mockResolvedValue({data: [{firstName: 'George', lastName: 'Costanza', email: 'gc@gc.com'},
                                              {firstName: 'Jill', lastName: 'Schwartz', email:'js@js.com'}]});

    const mountWithProvider = children => (store = myStore) => mount(<Provider store={store}>{children}</Provider>);
    const wrapper = mountWithProvider(<Router><AddressList {...props} /></Router>)();
    
    expect(wrapper.exists()).toBe(true);
    setImmediate(() => {
      /* this update is needed since the enzyme wrapper is immutable as of v.3
      updates the mounted wrapper to reflect data from the mock ajax request */
      wrapper.update();
      //header plus 2 rows of data
      expect(wrapper.find('tr').length).toBe(3);
      done();
    });  
  });
});