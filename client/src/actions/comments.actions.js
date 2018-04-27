import requester from '../requesters/requester';
import api from '../requesters/api';
import * as errorActions from './error.actions';

export function getUserCommentsSuccess(result) {
    return { type: 'GET_COMMENTS_SUCCESS', comments: result.comments, commentsCount: result.commentsCount };
}

export function getUserComments(id, page) {
    return function (dispatch) {
        return requester.get(`${api.USERS}/${id}/comments?page=${page}`)
            .done(response => {
                dispatch(getUserCommentsSuccess(response));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));                
            });
    }
}