import requester from '../requesters/requester';
import api from '../requesters/api';
import * as errorActions from './error.actions';

export function sendInvitationSuccess() {
    return { type: 'SEND_INVITATION_SUCCESS', hideInviteButton: true };
}

export function getInvitationsSuccess(invitations) {
    return { type: 'GET_INVITATIONS_SUCCESS', invitations };
}

export function hideInvitationSuccess(id) {
    return { type: 'HIDE_INVITATION_SUCCESS', id };
}

export function getInvitations(id) {
    const token = localStorage.getItem('token');
    return function (dispatch) {
        return requester.getAuthorized(token, `${api.USERS}/${id}/requests`)
            .done(response => {
                dispatch(getInvitationsSuccess(response.requests));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));                
            });
    };
}

export function sendInvitation(senderId, receiverId) {
    const token = localStorage.getItem('token');
    return function (dispatch) {
        return requester.postAuthorized(token, `${api.USERS}/${receiverId}/requests`, { id: senderId })
            .done(() => {
                dispatch(sendInvitationSuccess());
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
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));                
            });
    };
}