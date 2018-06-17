export default function home(state = { info: {} }, action) {
    switch (action.type) {
        case 'GET_INFO_SUCCESS':
            return {
                ...state,
                info: action.info
            };
        default:
            return state;
    }
}