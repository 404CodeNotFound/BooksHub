import requester from '../requesters/requester';
import api from '../requesters/api';

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
            });
    }
}

export function getUserEvents(id) {
    return function (dispatch) {
        return requester.get(`${api.USERS}/${id}/events`)
            .done(response => {
                dispatch(getUserEventsSuccess(response.events));
            });
    }
}