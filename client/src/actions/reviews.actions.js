import requester from '../requesters/requester';
import api from '../requesters/api';
import * as errorActions from './error.actions';

export function getUserReviewsSuccess(reviews) {
    return { type: 'GET_REVIEWS_SUCCESS', reviews };
}

export function getUserReviews(id) {
    return function (dispatch) {
        return requester.get(`${api.USERS}/${id}/reviews`)
            .done(response => {
                dispatch(getUserReviewsSuccess(response.reviews));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));                
            });
    }
}