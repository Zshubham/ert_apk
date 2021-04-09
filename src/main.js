import React, { Component } from 'react';
import App from '../App';
import { LogBox } from 'react-native';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import Reducer from './Reducer';

LogBox.ignoreAllLogs();

export default class main extends Component {
    render() {
        return <Provider store={createStore(Reducer, {}, applyMiddleware(thunk))}>
            <App />
        </Provider>
    }
}