import requester from '../requesters/requester';
import api from '../requesters/api';
import * as errorActions from './error.actions';
import * as successActions from './success.actions';

export function getUserCommentsSuccess(result) {
    return { type: 'GET_COMMENTS_SUCCESS', comments: result.comments, commentsCount: result.commentsCount };
}

export function deleteCommentSuccess(commentId) {
    return { type: 'DELETE_COMMENT_SUCCESS', id: commentId };
}

export function writeCommentSuccess(comment) {
    return { type: 'WRITE_COMMENT_SUCCESS', comment };
}

export function writeComment(content, eventId) {
    const token = localStorage.getItem('token');

    return function (dispatch) {
        const comment = {
            content: content,
            posted_on: new Date()
        };
        
        return requester.postAuthorized(token, `${api.EVENTS}/${eventId}/comments`, comment)
            .done((response) => {
                const comment = response.comment;
                comment.user = {
                    _id: response.comment.user,
                    username: response.user.username,
                    photo: response.user.photo
                }
                dispatch(writeCommentSuccess(comment));
                dispatch(successActions.actionSucceeded('Comment was added!'));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
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

export function deleteComment(userId, commentId) {
    const token = localStorage.getItem('token');
    return function (dispatch) {
        return requester.deleteAuthorized(token, `${api.USERS}/${userId}/comments/${commentId}`, {})
            .done(() => {
                dispatch(deleteCommentSuccess(commentId));
                dispatch(successActions.actionSucceeded('Selected comment was removed!'))
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));                
            });
    };
}