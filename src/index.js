import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import {  Router } from "react-router-dom";
import App from '../src/App';
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import rootReducer from '../src/reducers/RootReducer';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './login.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
const store=createStore(rootReducer,applyMiddleware(thunk));
ReactDOM.render(
   
    <Router>
    <Provider store={store}>
        <App />
    </Provider>
    </Router>,

  document.getElementById('root')); 
