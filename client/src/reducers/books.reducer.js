export default function books(state = {
    book: null
}, action) {
    switch (action.type) {
        case 'GET_BOOK_DETAILS_SUCCESS':
            return {
                ...state,
                book: action.book
            };
        default:
            return state;
    }
}