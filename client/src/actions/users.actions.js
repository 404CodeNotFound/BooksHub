import requester from '../requesters/users.requester';

export function loginSuccess(result) {
    return { type: 'LOGIN_SUCCESS', result };
}

export function loginFailure(error) {
    return { type: 'LOGIN_FAILURE', error };
}


export function logout() {
    return { type: 'LOGOUT_SUCCESS' };
}

export function removeError() {
    return { type: 'REMOVE_ERROR' };
}

export function login(username, password) {
    return function (dispatch) {
        return requester.login(username, password)
            .done(response => {
                const result = {
                    token: response.token,
                    user: response.user
                };

                dispatch(loginSuccess(result));
            })
            .fail(function (error) {
                dispatch(loginFailure(error.responseJSON));
            });
    }
}