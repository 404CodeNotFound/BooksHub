import api from './api';
import $ from 'jquery';

const usersRequester = {
    login: (username, password) => {
        return $.post(api.LOGIN, { username: username, password: password });
    },
    getProfile: (username, token) => {
        return $.ajax({
            url: `${api.USERS}/${username}`,
            type: "GET",
            headers: {"authorization": `Bearer ${token}`}
         });
    }
};

export default usersRequester;