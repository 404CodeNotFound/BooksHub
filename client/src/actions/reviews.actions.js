import requester from '../requesters/requester';
import api from '../requesters/api';
import * as errorActions from './error.actions';

export function getUserReviewsSuccess(result) {
    return { type: 'GET_REVIEWS_SUCCESS', reviews: result.reviews, reviewsCount: result.reviewsCount };
}

export function deleteReviewSuccess(reviewId) {
    return { type: 'DELETE_REVIEW_SUCCESS', id: reviewId };
}

export function writeReviewSuccess(result) {
    return { type: 'WRITE_REVIEW_SUCCES', result };
}

export function getUserReviews(id, page) {
    return function (dispatch) {
        return requester.get(`${api.USERS}/${id}/reviews?page=${page}`)
            .done(response => {
                debugger;
                dispatch(getUserReviewsSuccess(response));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    }
}

export function deleteReview(userId, reviewId) {
    const token = localStorage.getItem('token');
    return function (dispatch) {
        return requester.deleteAuthorized(token, `${api.USERS}/${userId}/reviews/${reviewId}`, {})
            .done(() => {
                dispatch(deleteReviewSuccess(reviewId));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function sendReview(content, userId, bookId) {
    const token = localStorage.getItem('token');
    return function (dispatch) {
        const review = {
            content: content,
            user: userId,
            book: bookId,
            posted_on: new Date()
        };
        return requester.postAuthorized(token, `${api.BOOKS}/${bookId}/reviews`, review)
            .done((response) => {
                dispatch(writeReviewSuccess({review: response.review, canWriteReview: false}));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}