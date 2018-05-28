export default function errors(state = { message: null, isSuccessful: false }, action) {
    switch (action.type) {
        case 'REMOVE_MESSAGE':
            return {
                isSuccessful: false,
                message: null
            };
        case 'ACTION_SUCCEEDED':
            return {
                isSuccessful: true,
                message: action.message
            };
        default:
            return state;
    }
}