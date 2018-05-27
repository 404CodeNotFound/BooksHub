export default function events(state = {
    event: { creator: {}, genres: [], comments: [] }, events: []
}, action) {
    switch (action.type) {
        case 'GET_FILTERED_EVENTS_SUCCESS':
            return {
                ...state,
                events: action.events
            };
        default:
            return state;
    }
}