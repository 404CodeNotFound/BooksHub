import * as constants from '../utils/constants';

export default function search(state = {
    searchBooks: constants.SEARCH_BOOK_BY_TITLE,
    books: [],
    events: [],
    users: [],
}, action) {
    switch (action.type) {
        case 'SEARCH_EVENTS_SUCCESS':
            return {
                ...state,
                events: action.events,
                eventsCount: action.eventsCount
            };
        case 'SEARCH_USERS_SUCCESS':
            return {
                ...state,
                users: action.users,
                usersCount: action.usersCount
            };
        case 'SEARCH_BOOKS_SUCCESS':
            console.log(action.books);
            return {
                ...state,
                books: action.books,
                booksCount: action.booksCount
            };
        case 'UPDATE_SEARCH_TYPE':
            return {
                ...state,
                searchBooks: action.searchType
            };
        default:
            return state;
    }
}