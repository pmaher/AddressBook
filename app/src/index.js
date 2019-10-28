import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import App from './components/App';
//by default uses index.js if a folder is imported
import reducers from './reducers/addressReducer';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

const store = createStore(combineReducers({ reducers, form }), {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('root'));
