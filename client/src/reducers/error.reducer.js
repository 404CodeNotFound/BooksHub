export default function errors(state = { validationErrors: [], error: null }, action) {
    switch (action.type) {
        case 'REMOVE_ERROR':
            return {
                ...state,
                error: null
            };
        case 'REMOVE_VALIDATION_ERRORS':
            return {
                ...state,
                validationErrors: []
            };
        case 'ACTION_FAILED':
            return {
                ...state,
                error: action.error
            };
        case 'VALIDATION_FAILED':
            return {
                ...state,
                validationErrors: action.validationErrors
            };
        default:
            return state;
    }
}