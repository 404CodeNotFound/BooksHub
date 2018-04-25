export default function users(state = {
    error: {}, profile: null, isLoggedIn: false,
    currentlyReading: [], wantToRead: [], read: [],
    friends: [], invitations: [], comments: [], reviews: [],
    events:[], joinedEvents: []
}, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                shouldRedirect: true,
                isLoggedIn: action.result.isLoggedIn
            };
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                isLoggedIn: action.result.isLoggedIn
            };
        case 'GET_PROFILE_SUCCESS':
            return {
                ...state,
                profile: action.user
            };
        case 'GET_CURRENTLY_READING_BOOKS_SUCCESS':
            return {
                ...state,
                currentlyReading: action.currentlyReading
            };
        case 'GET_WANT_TO_READ_BOOKS_SUCCESS':
            return {
                ...state,
                wantToRead: action.wantToRead
            };
        case 'GET_READ_BOOKS_SUCCESS':
            return {
                ...state,
                read: action.read
            };
        case 'GET_FRIENDS_SUCCESS':
            return {
                ...state,
                friends: action.friends
            };
        case 'GET_INVITATIONS_SUCCESS':
            return {
                ...state,
                invitations: action.invitations
            };
        case 'GET_COMMENTS_SUCCESS':
            return {
                ...state,
                comments: action.comments
            };
        case 'GET_REVIEWS_SUCCESS':
            return {
                ...state,
                reviews: action.reviews
            };
        case 'GET_JOINED_EVENTS_SUCCESS':
            return {
                ...state,
                joinedEvents: action.events
            };
        case 'GET_USER_EVENTS_SUCCESS':
            return {
                ...state,
                events: action.events
            };
        default:
            return state;
    }
}