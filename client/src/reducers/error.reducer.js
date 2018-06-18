export default function errors(state = { validationErrors: [], error: null }, action) {
    switch (action.type) {
        case 'REMOVE_ERROR':
            return {
                ...state,
                error: null
            };
        case 'REMOVE_VALIDATION_ERROR':
            return {
                validationErrors: removeFromCollection(state.validationErrors, action.param)
            };
        case 'REMOVE_ALL_VALIDATION_ERRORS':
            return {
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

function removeFromCollection(collection, param) {
    const length = collection.length;
    const index = collection.findIndex(item => item.param === param);
    const newCollection = [
        ...collection.slice(0, index),
        ...collection.slice(index + 1, length)
    ];

    return newCollection;
}