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
        case 'ADD_BOOK_SUCCESS':
            return {
                ...state,
                books: [
                    action.book,
                    ...state.books
                ],
                booksCount: state.booksCount + 1
            }
        default:
            return state;
    }
}