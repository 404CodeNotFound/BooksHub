import requester from '../requesters/users.requester';

export function loginSuccess(token) {
    return { type: 'LOGIN_SUCCESS', token };
}

export function loginFailure(error) {
    return { type: 'LOGIN_FAILURE', error };
}

export function removeError() {
    return { type: 'REMOVE_ERROR' };
}

export function login(username, password) {
    return function (dispatch) {
        return requester.login(username, password)
            .done(response => {
                dispatch(loginSuccess(response.token));
            })
            .fail(function(error) {
                dispatch(loginFailure(error.responseJSON));
            });
        }
    }