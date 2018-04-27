import requester from '../requesters/requester';
import api from '../requesters/api';
import * as errorActions from './error.actions';

export function getUserEventsSuccess(result) {
    return { type: 'GET_USER_EVENTS_SUCCESS', events: result.events, eventsCount: result.eventsCount };
}

export function getJoinedEvents(id, page) {
    return function (dispatch) {
        debugger;
        return requester.get(`${api.USERS}/${id}/joinedevents?page=${page}`)
            .done(response => {
                debugger;
                dispatch(getUserEventsSuccess(response));
            })
            .fail(error => {
                debugger;
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    }
}

export function getUserEvents(id, page) {
    return function (dispatch) {
        return requester.get(`${api.USERS}/${id}/events?page=${page}`)
            .done(response => {
                dispatch(getUserEventsSuccess(response));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    }
}