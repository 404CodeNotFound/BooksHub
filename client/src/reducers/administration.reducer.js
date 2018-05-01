export default function books(state = {
    books: [], events: [], users: [], authors: [], genres: []
}, action) {
    switch (action.type) {
        case 'GET_ALL_BOOKS_SUCCESS':
            return {
                ...state,
                books: action.books,
                booksCount: action.booksCount
            };
        default:
            return state;
    }
}