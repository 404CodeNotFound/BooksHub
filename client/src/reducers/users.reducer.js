export default function users(state = { error: {}, token: "", currentUser: null }, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                token: action.result.token,
                currentUser: action.result.user,
                shouldRedirect: true
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
                token: null,
                currentUser: null
            };
        default:
            return state;
    }
}