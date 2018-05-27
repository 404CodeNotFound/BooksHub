import requester from '../requesters/requester';
import api from '../requesters/api';
import * as modalsActions from './modals.actions';
import * as errorActions from './error.actions';

export function getUserEventsSuccess(result) {
    return { type: 'GET_USER_EVENTS_SUCCESS', events: result.events, eventsCount: result.eventsCount };
}

export function getAllEventsSuccess(events, eventsCount) {
    return { type: 'GET_ALL_EVENTS_SUCCESS', events: events, eventsCount: eventsCount };
}

export function addEventSuccess(event) {
    return { type: 'ADD_EVENT_SUCCESS', event };
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

export function getAllEvents(page) {
    return function (dispatch) {
        const token = localStorage.getItem('token');
        
        return requester.getAuthorized(token, `${api.EVENTS}?page=${page}`)
            .done(response => {
                dispatch(getAllEventsSuccess(response.events, response.eventsCount));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function addEvent(event) {
    return function (dispatch) {
        const token = localStorage.getItem('token');

        return requester.postAuthorized(token, `${api.EVENTS}`, event)
            .done(response => {
                dispatch(addEventSuccess(response.event));
                dispatch(modalsActions.closeAddEventModal());                                
            })
            .fail(error => {
                if (error.responseJSON.hasOwnProperty('message')) {
                    dispatch(errorActions.actionFailed(error.responseJSON.message));
                } else {
                    dispatch(errorActions.validationFailed(error.responseJSON));
                }
            });
    };
}