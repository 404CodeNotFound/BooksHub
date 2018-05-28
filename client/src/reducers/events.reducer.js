export default function events(state = {
    event: { creator: {}, genres: [], comments: [], participants: []}, canJoinEvent: true, events: []
}, action) {
    switch (action.type) {
        case 'GET_EVENT_DETAILS_SUCCESS':
            return {
                ...state,
                event: action.event,
                canJoinEvent: action.canJoinEvent
            };
        case 'GET_FILTERED_EVENTS_SUCCESS':
            return {
                ...state,
                events: action.events
            };
        case 'JOIN_EVENT_SUCCESS':
            return {
                ...state,
                // event: {
                //     ...state.event,
                //     participants: [
                //         action.event.participants,
                //         ...state.event.participants
                //     ]
                // },
                canJoinEvent: false
            };
        default:
            return state;
    }
}