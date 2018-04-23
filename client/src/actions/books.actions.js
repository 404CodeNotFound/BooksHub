import requester from '../requesters/requester';
import api from '../requesters/api';

export function getCurrentlyReadingBooksSuccess(books) {
    return { type: 'GET_CURRENTLY_READING_BOOKS_SUCCESS', currentlyReading: books };
}

export function getWantToReadBooksSuccess(books) {
    return { type: 'GET_WANT_TO_READ_BOOKS_SUCCESS', wantToRead: books };
}

export function getReadBooksSuccess(books) {
    return { type: 'GET_READ_BOOKS_SUCCESS', read: books };
}

export function getCurrentlyReadingBooks(id) {
    return function (dispatch) {
        return requester.get(`${api.USERS}/${id}/reading`)
            .done(response => {
                dispatch(getCurrentlyReadingBooksSuccess(response.books));
            });
    };
}

export function getWantToReadBooks(id) {
    return function (dispatch) {
        return requester.get(`${api.USERS}/${id}/wishlist`)
            .done(response => {
                dispatch(getWantToReadBooksSuccess(response.books));
            });
    };
}

export function getReadBooks(id) {
    return function (dispatch) {
        return requester.get(`${api.USERS}/${id}/read`)
            .done(response => {
                dispatch(getReadBooksSuccess(response.books));
            });
    };
}