import React from 'react';
import { Provider } from 'react-redux';
import App from './components/App';
import configureStore from './store/store.config';

const initialState = {};
const store = configureStore(initialState);

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

export default Root;