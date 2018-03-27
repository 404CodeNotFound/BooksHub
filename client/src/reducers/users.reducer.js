export default function users(state = { error: {}, token: "" }, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                token: action.token
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                error: action.error
            };
        case 'REMOVE_ERROR':
            return {
                ...state,
                error: {}
            };
        default:
            return state;
    }
}