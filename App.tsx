import React, { Component } from 'react';
import { Provider } from 'react-redux';
import MainApp from './src/MainApp';
import store from "./src/store/store";


export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <MainApp />
            </Provider>
        );
    }
}