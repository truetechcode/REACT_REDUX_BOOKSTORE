import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from "./reducers/index";

let initialState = {
  books:[],
  filter: '',
  remove:''
}

const store = createStore(
  rootReducer, 
  // initialState,
  applyMiddleware(thunkMiddleware)
  );

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
  );



