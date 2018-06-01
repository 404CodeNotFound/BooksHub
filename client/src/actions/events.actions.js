import requester from '../requesters/requester';
import api from '../requesters/api';
import * as modalsActions from './modals.actions';
import * as errorActions from './error.actions';
import * as loadersActions from './loaders.actions';
import * as constants from '../utils/constants';

export function getEventDetailsSuccess(event, canJoinEvent) {
    return { type: 'GET_EVENT_DETAILS_SUCCESS', event, canJoinEvent };
}

export function getUserEventsSuccess(result) {
    return { type: 'GET_USER_EVENTS_SUCCESS', events: result.events, eventsCount: result.eventsCount };
}

export function getAllEventsSuccess(events, eventsCount) {
    return { type: 'GET_ALL_EVENTS_SUCCESS', events: events, eventsCount: eventsCount };
}

export function getFilteredEventsSuccess(events) {
    return { type: 'GET_FILTERED_EVENTS_SUCCESS', events };
}

export function addEventSuccess(event) {
    return { type: 'ADD_EVENT_SUCCESS', event };
}

export function addEventAdminSuccess(event) {
    return { type: 'ADD_EVENT_ADMIN_SUCCESS', event };
}

export function editEventAdminSuccess(event) {
    return { type: 'EDIT_EVENT_ADMIN_SUCCESS', event };
}

export function editEventSuccess(event) {
    return { type: 'EDIT_EVENT_SUCCESS', event };
}

export function deleteEventSuccess(id) {
    return { type: 'DELETE_EVENT_SUCCESS', eventId: id };
}

export function deleteEventAdminSuccess(id) {
    return { type: 'DELETE_EVENT_ADMIN_SUCCESS', eventId: id };
}

export function joinEventSuccess(event) {
    return { type: 'JOIN_EVENT_SUCCESS', event };
}

export function searchEventSuccess(events, eventsCount) {
    return { type: 'SEARCH_EVENTS_SUCCESS', events: events, eventsCount: eventsCount };        
}

export function getEventDetails(id, userId) {
    return function (dispatch) {
        return requester.get(`${api.EVENTS}/${id}`)
            .done(response => {
                const canJoinEvent = response.event.participants.findIndex(participant => participant._id === userId) < 0;
                
                if (userId) {
                    const joinedFriends = response.event.participants.filter(participant => participant.friends.findIndex(friend => friend._id === userId) >= 0);
                    response.event.participants = joinedFriends;
                }
                
                dispatch(getEventDetailsSuccess(response.event, canJoinEvent));
                dispatch(loadersActions.hideLoader());
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function getJoinedEvents(id, page) {
    return function (dispatch) {
        return requester.get(`${api.USERS}/${id}/joinedevents?page=${page}`)
            .done(response => {
                dispatch(getUserEventsSuccess(response));
            })
            .fail(error => {
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
                dispatch(loadersActions.hideLoader());
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function getRecommendedEvents() {
    return function (dispatch) {
        const token = localStorage.getItem('token');

        return requester.getAuthorized(token, `${api.RECOMMENDED_EVENTS}`)
            .done(response => {
                dispatch(getFilteredEventsSuccess(response.events));
                dispatch(loadersActions.hideLoader());                
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function getLatestEvents() {
    return function (dispatch) {
        return requester.get(`${api.LATEST_EVENTS}`)
            .done(response => {
                dispatch(getFilteredEventsSuccess(response.events));
                dispatch(loadersActions.hideLoader());                
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function addEvent(event, page) {
    return function (dispatch) {
        const token = localStorage.getItem('token');

        return requester.postAuthorized(token, `${api.EVENTS}`, event)
            .done(response => {
                if (page === constants.ADMINISTRATION_PAGE) {
                    dispatch(addEventAdminSuccess(response.event));
                } else if (page === constants.USER_PROFILE_PAGE) {
                    dispatch(addEventSuccess(response.event));
                }

                dispatch(modalsActions.closeAddEventModal());                                
            })
            .fail(error => {
                debugger;
                if (error.responseJSON.hasOwnProperty('message')) {
                    dispatch(errorActions.actionFailed(error.responseJSON.message));
                } else {
                    dispatch(errorActions.validationFailed(error.responseJSON));
                }
            });
    };
}

export function editEvent(event, isAdminPage) {
    return function (dispatch) {
        const token = localStorage.getItem('token');

        return requester.putAuthorized(token, `${api.EVENTS}/${event.id}`, event)
            .done(response => {
                if (isAdminPage) {
                    dispatch(editEventAdminSuccess(response.event));
                } else {
                    dispatch(editEventSuccess(response.event));
                }

                dispatch(modalsActions.closeEditEventModal());
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

export function deleteEvent(id, isAdminPage) {
    return function (dispatch) {
        const token = localStorage.getItem('token');

        return requester.deleteAuthorized(token, `${api.EVENTS}/${id}`)
            .done(response => {
                if (isAdminPage) {
                    dispatch(deleteEventAdminSuccess(id));
                } else {
                    dispatch(deleteEventSuccess(id));
                }
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

export function joinEvent(eventId, user) {
    return function (dispatch) {
        const token = localStorage.getItem('token');

        return requester.putAuthorized(token, `${api.EVENTS}/${eventId}/join`, user)
            .done(response => {
                dispatch(joinEventSuccess(response.event));
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

export function searchEvent(searchValue, filters) {
    return function (dispatch) {
        return requester.get(`${api.EVENTS_SEARCH}?phrase=${searchValue}`)
            .done(response => {
                let eventsResult = response.events;
                if (filters) {
                    console.log(response.events);
                    
                    eventsResult = response.events.filter(event => {
                        const genres = event.genres.map(genre => genre.name);
                        return containsFilters(genres, filters);
                    });
                }

                dispatch(searchEventSuccess(eventsResult, response.eventsCount));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

function containsFilters(set, subset) {
    for (var element of subset) {
        if (set.indexOf(element) < 0) {
            return false;
        }
    }

    return true;
}
