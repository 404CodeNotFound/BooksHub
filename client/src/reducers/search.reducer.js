export default function search(state = {
    books: [],
    events: [],
    users: [],
}, action) {
    switch (action.type) {
        case 'SEARCH_EVENTS_SUCCESS':
            return {
                ...state,
                events: action.events,
                eventsCount: action.eventsCount
            };
        default:
            return state;
    }
}