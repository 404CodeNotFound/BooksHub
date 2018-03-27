import api from './api';
import $ from 'jquery';

const usersRequester = {
    login: (username, password) => {
        return $.post(api.LOGIN, { username: username, password: password });
    }
};

export default usersRequester;