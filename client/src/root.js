import React from 'react';
import { Provider } from 'react-redux';
import App from './components/App';
import configureStore from './store/store.config';
import './style/responsee.css';
import './style/font-poppins.css';
import './style/icons.css';
import './style/template-style.css';
import './style/pagination.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';

const initialState = {};
const store = configureStore(initialState);

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

export default Root;