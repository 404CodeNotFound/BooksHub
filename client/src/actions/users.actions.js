import requester from '../requesters/requester';
import api from '../requesters/api';
import * as errorActions from './error.actions';
import * as modalsActions from './modals.actions';

export function loginSuccess() {
    return { type: 'LOGIN_SUCCESS' };
}

export function registerSuccess() {
    return { type: 'REGISTER_SUCCESS' };
}

export function logoutSuccess() {
    return { type: 'LOGOUT_SUCCESS' };
}

export function getProfileSuccess(user, userLanguages, userGenres) {
    return { type: 'GET_PROFILE_SUCCESS', user, userLanguages, userGenres };
}

export function getFriendsSuccess(result) {
    return { type: 'GET_FRIENDS_SUCCESS', friends: result.friends, friendsCount: result.friendsCount };
}

export function updateProfileSuccess(user, userLanguages, userGenres) {
    return { type: 'UPDATE_PROFILE_SUCCESS', user, userLanguages, userGenres };
}

export function getAllUsersSuccess(users, usersCount) {
    return { type: 'GET_ALL_USERS_SUCCESS', users: users, usersCount: usersCount };
}

export function logout() {
    return function (dispatch) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('id');
        localStorage.removeItem('role');        
        
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
                localStorage.setItem('role', response.user.role);

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
                const languagesSelectList = response.user.languages.map(l => {
                    return { label: l, value: l };
                });

                const genresList = response.user.favourite_genres.map(genre => {
                    return { label: genre.name, value: genre.name };
                });

                dispatch(getProfileSuccess(response.user, languagesSelectList, genresList));
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
                const userLanguages = response.user.languages.map(language => { 
                    return { 
                        label: language, value: language 
                    };
                });

                const userGenres = response.user.favourite_genres.map(genre => {
                    return {
                        label: genre.name, value: genre.name
                    };
                });

                dispatch(updateProfileSuccess(response.user, userLanguages, userGenres));
                dispatch(modalsActions.closeEditUserModal());
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    }
}

export function getAllUsers(page) {
    return function (dispatch) {
        const token = localStorage.getItem('token');
        
        return requester.getAuthorized(token, `${api.USERS}?page=${page}`)
            .done(response => {
                dispatch(getAllUsersSuccess(response.users, response.usersCount));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}