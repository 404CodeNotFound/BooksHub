import requester from '../requesters/requester';
import api from '../requesters/api';
import * as errorActions from './error.actions';

export function loginSuccess() {
    return { type: 'LOGIN_SUCCESS' };
}

export function registerSuccess() {
    return { type: 'REGISTER_SUCCESS' };
}

export function logoutSuccess() {
    return { type: 'LOGOUT_SUCCESS' };
}

export function getProfileSuccess(user) {
    return { type: 'GET_PROFILE_SUCCESS', user };
}

export function getFriendsSuccess(result) {
    return { type: 'GET_FRIENDS_SUCCESS', friends: result.friends, friendsCount: result.friendsCount };
}

export function updateProfileSuccess(user) {
    return { type: 'UPDATE_PROFILE_SUCCESS', user };
}

export function logout() {
    return function (dispatch) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('id');
        
        dispatch(logoutSuccess());
    }
}

export function login(username, password) {
    return function (dispatch) {
        return requester.post(api.LOGIN, { username: username, password: password })
            .done(response => {
                localStorage.setItem('token', response.token);
                localStorage.setItem('username', response.user.username);
                localStorage.setItem('id', response.user.id);

                dispatch(loginSuccess());
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    }
}

export function register(username, password, email, firstname, lastname) {
    return function (dispatch) {
        return requester.post(api.REGISTER, { username: username, password: password, email: email, first_name: firstname, last_name: lastname })
            .done(response => {
                dispatch(registerSuccess());
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

export function getFriends(id, page) {
    return function (dispatch) {
        return requester.get(`${api.USERS}/${id}/friends?page=${page}`)
            .done(response => {
                dispatch(getFriendsSuccess(response));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));                
            });
    };
}

export function updateProfile(user) {
    const token = localStorage.getItem('token');
    
    return function (dispatch) {
        return requester.putAuthorized(token, `${api.USERS}/${user.username}`, user)
            .done(response => {
                console.log(response);
                dispatch(updateProfileSuccess(response.user));
            })
            .fail(error => {
                console.log(error);
                dispatch(errorActions.actionFailed(error.responseJSON.message));                
            });
    }
}