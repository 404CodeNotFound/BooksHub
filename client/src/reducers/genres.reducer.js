export default function genres(state = {}, action) {
    switch (action.type) {
        case 'GET_GENRES_AS_SELECT_VALUES':
            return {
                ...state,
                genresSelectValues: action.genresSelectValues
            };
        default:
            return state;
    }
}