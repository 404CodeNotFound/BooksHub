import requester from '../requesters/requester';
import api from '../requesters/api';
import * as errorActions from './error.actions';

export function getUserReviewsSuccess(result) {
    return { type: 'GET_REVIEWS_SUCCESS', reviews: result.reviews, reviewsCount: result.reviewsCount };
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