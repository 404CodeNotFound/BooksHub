import requester from '../requesters/requester';
import api from '../requesters/api';
import * as errorActions from './error.actions';

export function loginSuccess(result) {
    return { type: 'LOGIN_SUCCESS', result };
}

export function logoutSuccess(result) {
    return { type: 'LOGOUT_SUCCESS', result };
}

export function getProfileSuccess(user) {
    return { type: 'GET_PROFILE_SUCCESS', user };
}

export function getFriendsSuccess(friends) {
    return { type: 'GET_FRIENDS_SUCCESS', friends };
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

export function login(username, password) {
    return function (dispatch) {
        return requester.post(api.LOGIN, { username: username, password: password })
            .done(response => {
                const result = {
                    isLoggedIn: true
                };
                localStorage.setItem('token', response.token);
                localStorage.setItem('username', response.user.username);
                localStorage.setItem('id', response.user.id);

                dispatch(loginSuccess(result));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    }
}

export function getProfile(username) {
    return function (dispatch) {
        return requester.get(`${api.USERS}/${username}`)
            .done(response => {
                dispatch(getProfileSuccess(response.user));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));                
            });
    };
}

export function getFriends(id) {
    return function (dispatch) {
        return requester.get(`${api.USERS}/${id}/friends`)
            .done(response => {
                dispatch(getFriendsSuccess(response.friends));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));                
            });
    };
}