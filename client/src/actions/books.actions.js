import requester from '../requesters/requester';
import api from '../requesters/api';
import * as errorActions from './error.actions';

export function getUserBooksSuccess(result) {
    return { type: 'GET_USER_BOOKS_SUCCESS', books: result.books, booksCount: result.booksCount };
}

export function getBookDetailsSuccess(book, canWriteReview, currentUserRating) {
    return { type: 'GET_BOOK_DETAILS_SUCCESS', result: { book, canWriteReview, currentUserRating } };
}

export function rateBookSuccess(result) {
    return { type: 'RATE_BOOK_SUCCESS', result };
}

export function getCurrentlyReadingBooks(id, page) {
    return function (dispatch) {
        return requester.get(`${api.USERS}/${id}/reading?page=${page}`)
            .done(response => {
                dispatch(getUserBooksSuccess(response));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function getWantToReadBooks(id, page) {
    return function (dispatch) {
        return requester.get(`${api.USERS}/${id}/wishlist?page=${page}`)
            .done(response => {
                dispatch(getUserBooksSuccess(response));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function getReadBooks(id, page) {
    return function (dispatch) {
        return requester.get(`${api.USERS}/${id}/read?page=${page}`)
            .done(response => {
                dispatch(getUserBooksSuccess(response));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function getBookDetails(title, userId) {
    return function (dispatch) {
        return requester.get(`${api.BOOKS}/${title}`)
            .done(response => {
                const userCanWriteReview = response.book.reviews.findIndex(review => review.user._id === userId) < 0;
                const currentUserRating = response.book.ratings.find(rating => rating.user === userId);

                dispatch(getBookDetailsSuccess(response.book, userCanWriteReview, currentUserRating.stars));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function rateBook(userId, bookId, rating) {
    return function (dispatch) {
        const token = localStorage.getItem('token');
        const body = {
            user: userId,
            book: bookId,
            stars: rating,
            rated_on: new Date()
        };

        return requester.putAuthorized(token, `${api.BOOKS}/${bookId}/rating`, body)
            .done(response => {
                dispatch(rateBookSuccess({ userRating: body.stars, bookRating: response.bookRating }));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}