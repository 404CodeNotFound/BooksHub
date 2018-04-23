import requester from '../requesters/requester';
import api from '../requesters/api';

export function loginSuccess(result) {
    return { type: 'LOGIN_SUCCESS', result };
}

export function logoutSuccess(result) {
    return { type: 'LOGOUT_SUCCESS', result };
}
export function loginFailure(error) {
    return { type: 'LOGIN_FAILURE', error };
}

export function getProfileSuccess(user) {
    return { type: 'GET_PROFILE_SUCCESS', user };
}

export function logout() {
    return function (dispatch) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('id');
        const result = {
            isLoggedIn: false
        };
        dispatch(logoutSuccess(result));
    }
}

export function removeError() {
    return { type: 'REMOVE_ERROR' };
}

export function login(username, password) {
    return function (dispatch) {
        return requester.post(api.LOGIN, { username: username, password: password })
            .done(response => {
                const result = {
                    isLoggedIn: true
                };
                localStorage.setItem('token', response.token);
                localStorage.setItem('username', response.user.username);
                localStorage.setItem('id', response.user._id);

                dispatch(loginSuccess(result));
            })
            .fail(function (error) {
                dispatch(loginFailure(error.responseJSON));
            });
    }
}

export function getProfile(username) {
    return function (dispatch) {
        return requester.get(`${api.USERS}/${username}`)
            .done(response => {
                dispatch(getProfileSuccess(response.user));
            });
    };
}