import requester from '../requesters/requester';
import api from '../requesters/api';

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
            });
    };
}

export function sendInvitation(senderId, receiverId) {
    const token = localStorage.getItem('token');
    return function (dispatch) {
        return requester.postAuthorized(token, `${api.USERS}/${receiverId}/requests`, { id: senderId })
            .done(response => {
                dispatch(sendInvitationSuccess());
            });
    };
}

export function acceptInvitation(id) {
    const token = localStorage.getItem('token');
    return function (dispatch) {
        return requester.putAuthorized(token, `${api.REQUESTS}/${id}`)
            .done(response => {
                dispatch(hideInvitationSuccess(id));
            });
    };
}

export function declineInvitation(id) {
    const token = localStorage.getItem('token');
    return function (dispatch) {
        return requester.deleteAuthorized(token, `${api.REQUESTS}/${id}`, {})
            .done(response => {
                dispatch(hideInvitationSuccess(id));
            });
    };
}