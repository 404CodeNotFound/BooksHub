export default function search(state = {
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
            return {
                ...state,
                books: action.books,
                booksCount: action.booksCount
            };
        default:
            return state;
    }
}