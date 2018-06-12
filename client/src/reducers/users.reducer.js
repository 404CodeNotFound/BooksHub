export default function users(state = {
    profile: null, isLoggedIn: false, isRegisterSuccessful: false,
    books: [], friends: [], invitations: [], comments: [], reviews: [], events: []
}, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state
            };
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                isRegisterSuccessful: true
            };
        case 'LOGOUT_SUCCESS':
            return {
                ...state
            };
        case 'GET_PROFILE_SUCCESS':
            return {
                ...state,
                profile: {
                    ...action.user,
                    selectedLanguages: action.userLanguages,
                    selectedGenres: action.userGenres
                }
            };
        case 'GET_USER_BOOKS_SUCCESS':
            return {
                ...state,
                books: action.books,
                booksCount: action.booksCount
            };
        case 'GET_FRIENDS_SUCCESS':
            return {
                ...state,
                friends: action.friends,
                friendsCount: action.friendsCount
            };
        case 'GET_INVITATIONS_SUCCESS':
            return {
                ...state,
                invitations: action.invitations,
                invitationsCount: action.invitationsCount
            };
        case 'GET_COMMENTS_SUCCESS':
            return {
                ...state,
                comments: action.comments,
                commentsCount: action.commentsCount
            };
        case 'GET_REVIEWS_SUCCESS':
            return {
                ...state,
                reviews: action.reviews,
                reviewsCount: action.reviewsCount
            };
        case 'GET_USER_EVENTS_SUCCESS':
            return {
                ...state,
                events: action.events,
                eventsCount: action.eventsCount
            };
        case 'HIDE_INVITATION_SUCCESS':
            return {
                ...state,
                invitations: removeFromCollection(state.invitations, action.id)
            };
        case 'DELETE_REVIEW_SUCCESS':
            return {
                ...state,
                reviews: removeFromCollection(state.reviews, action.id)
            };
        case 'DELETE_COMMENT_SUCCESS':
            return {
                ...state,
                comments: removeFromCollection(state.comments, action.id)
            };
        case 'UPDATE_PROFILE_SUCCESS':
            return {
                ...state,
                profile: {
                    ...action.user,
                    selectedLanguages: action.userLanguages,
                    selectedGenres: action.userGenres
                }
            };
        case 'ADD_EVENT_SUCCESS':
            return {
                ...state,
                events: [
                    action.event,
                    ...state.events
                ],
                eventsCount: state.eventsCount + 1
            };
        case 'EDIT_EVENT_SUCCESS':
            return {
                ...state,
                events: updateItemInCollection(state.events, action.event),
                eventsCount: state.eventsCount + 1
            };
        case 'DELETE_EVENT_SUCCESS':
            return {
                ...state,
                events: removeFromCollection(state.events, action.eventId),
                eventsCount: state.eventsCount - 1
            };
        case 'RECOMMEND_BOOK_SUCCESS':
            return {
                ...state
            };
        default:
            return state;
    }
}

function removeFromCollection(collection, id) {
    const length = collection.length;
    const index = collection.findIndex(item => item._id === id);
    const newCollection = [
        ...collection.slice(0, index),
        ...collection.slice(index + 1, length)
    ];

    return newCollection;
}

function updateItemInCollection(collection, updatedItem) {
    const length = collection.length;
    const index = collection.findIndex(item => item._id === updatedItem._id);
    const newCollection = [
        ...collection.slice(0, index),
        updatedItem,
        ...collection.slice(index + 1, length)
    ];

    return newCollection;
}