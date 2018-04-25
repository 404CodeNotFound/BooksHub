import requester from '../requesters/requester';
import api from '../requesters/api';
import * as errorActions from './error.actions';

export function getJoinedEventsSuccess(events) {
    return { type: 'GET_JOINED_EVENTS_SUCCESS', events };
}

export function getUserEventsSuccess(events) {
    return { type: 'GET_USER_EVENTS_SUCCESS', events };
}

export function getJoinedEvents(id) {
    return function (dispatch) {
        return requester.get(`${api.USERS}/${id}/joinedevents`)
            .done(response => {
                dispatch(getJoinedEventsSuccess(response.events));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    }
}

export function getUserEvents(id) {
    return function (dispatch) {
        return requester.get(`${api.USERS}/${id}/events`)
            .done(response => {
                dispatch(getUserEventsSuccess(response.events));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    }
}