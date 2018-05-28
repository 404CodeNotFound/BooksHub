import requester from '../requesters/requester';
import api from '../requesters/api';
import * as errorActions from './error.actions';
import * as successActions from './success.actions';

export function sendInvitationSuccess() {
    return { type: 'SEND_INVITATION_SUCCESS', hideInviteButton: true };
}

export function getInvitationsSuccess(result) {
    return { type: 'GET_INVITATIONS_SUCCESS', invitations: result.requests, invitationsCount: result.requestsCount};
}

export function hideInvitationSuccess(id) {
    return { type: 'HIDE_INVITATION_SUCCESS', id };
}

export function getInvitations(id, page) {
    const token = localStorage.getItem('token');
    return function (dispatch) {
        return requester.getAuthorized(token, `${api.USERS}/${id}/requests?page=${page}`)
            .done(response => {
                dispatch(getInvitationsSuccess(response));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));                
            });
    };
}

export function sendInvitation(receiverId) {
    const token = localStorage.getItem('token');
    return function (dispatch) {
        return requester.postAuthorized(token, `${api.USERS}/${receiverId}/requests`)
            .done(() => {
                dispatch(sendInvitationSuccess());
                dispatch(successActions.actionSucceeded('The invitation was sent!'));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));                
            });
    };
}

export function acceptInvitation(id) {
    const token = localStorage.getItem('token');
    return function (dispatch) {
        return requester.putAuthorized(token, `${api.REQUESTS}/${id}`)
            .done(response => {
                dispatch(hideInvitationSuccess(id));
                dispatch(successActions.actionSucceeded('The request was accepted!'));                
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));                
            });
    };
}

export function declineInvitation(id) {
    const token = localStorage.getItem('token');
    return function (dispatch) {
        return requester.deleteAuthorized(token, `${api.REQUESTS}/${id}`, {})
            .done(() => {
                dispatch(hideInvitationSuccess(id));
                dispatch(successActions.actionSucceeded('The request was declined!'));                                
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));                
            });
    };
}