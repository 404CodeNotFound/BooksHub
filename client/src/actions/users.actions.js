import requester from '../requesters/requester';
import api from '../requesters/api';
import * as errorActions from './error.actions';
import * as modalsActions from './modals.actions';
import * as successActions from './success.actions';

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

export function updateUserSuccess(user) {
    return { type: 'UPDATE_USER_SUCCESS', user: user };
}

export function getAllUsersSuccess(users, usersCount) {
    return { type: 'GET_ALL_USERS_SUCCESS', users: users, usersCount: usersCount };
}

export function changeRoleSuccess(user) {
    return { type: 'CHANGE_ROLE_SUCCESS', user };
}

export function deleteUserSuccess(id) {
    return { type: 'DELETE_USER_SUCCESS', userId: id };
}

export function searchUsersSuccess(users, usersCount) {
    return { type: 'SEARCH_USERS_SUCCESS', users: users, usersCount: usersCount };
}

export function recommendBookSuccess() {
    return { type: 'RECOMMEND_BOOK_SUCCESS' };
}

export function logout() {
    return function (dispatch) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('id');
        localStorage.removeItem('role');        
        
        dispatch(logoutSuccess());
        dispatch(successActions.actionSucceeded('You have been logged out!'));
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
                dispatch(successActions.actionSucceeded('You have been logged in!'));
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
                dispatch(successActions.actionSucceeded('You have been registered!'));                
            })
            .fail(error => {
                if (error.responseJSON.hasOwnProperty('message')) {
                    dispatch(errorActions.actionFailed(error.responseJSON.message));
                } else {
                    dispatch(errorActions.validationFailed(error.responseJSON));
                }
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

export function getAllUserFriends(id) {
    return function (dispatch) {
        return requester.get(`${api.USERS}/${id}/friends`)
            .done(response => {
                dispatch(getFriendsSuccess(response));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function updateProfile(user, isAdminPage) {
    const token = localStorage.getItem('token');
    
    return function (dispatch) {
        return requester.putAuthorized(token, `${api.USERS}/${user.username}`, user)
            .done(response => {
                if (!isAdminPage) {
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
                } else {
                    dispatch(updateUserSuccess(response.user));
                }
                
                dispatch(modalsActions.closeEditUserModal());
                dispatch(successActions.actionSucceeded('Your profile was updated!'));                                                        
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

export function changeRole(user) {
    return function (dispatch) {
        const token = localStorage.getItem('token');
    
        return requester.putAuthorized(token, `${api.USERS}/${user._id}/role`, user)
            .done(response => {
                dispatch(changeRoleSuccess(response.user));
                dispatch(successActions.actionSucceeded('The role of selected user was changed!'));                                    
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function deleteUser(id) {
    return function (dispatch) {
        const token = localStorage.getItem('token');

        return requester.deleteAuthorized(token, `${api.USERS}/${id}`)
            .done(response => {
                dispatch(deleteUserSuccess(id));
                dispatch(successActions.actionSucceeded('Selected user was removed!'));                                    
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function searchUser(searchValue) {
    return function (dispatch) {
        return requester.get(`${api.USERS_SEARCH}?phrase=${searchValue}`)
            .done(response => {
                dispatch(searchUsersSuccess(response.users, response.usersCount));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function recommendBook(userId, bookId) {
    return function (dispatch) {
        const token = localStorage.getItem('token');
        
        return requester.putAuthorized(token, `${api.USERS}/${userId}/recommend/${bookId}`)
            .done(response => {
                dispatch(recommendBookSuccess());
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}