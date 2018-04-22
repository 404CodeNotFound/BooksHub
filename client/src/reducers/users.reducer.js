export default function users(state = { error: {}, profile: null, isLoggedIn: false }, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                shouldRedirect: true,
                isLoggedIn: action.result.isLoggedIn
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                error: action.error,
                shouldRedirect: false
            };
        case 'REMOVE_ERROR':
            return {
                ...state,
                error: {}
            };
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                isLoggedIn: action.result.isLoggedIn
            };
        case 'GET_PROFILE_SUCCESS':
            return {
                ...state,
                profile: action.user
            };
        default:
            return state;
    }
}