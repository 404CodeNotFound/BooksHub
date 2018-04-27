export default function users(state = {
    profile: null, isLoggedIn: false,
    books: [], friends: [], invitations: [], comments: [], reviews: [], events: []
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
                invitations: removeInvitation(state.invitations, action.id)
            };
        default:
            return state;
    }
}

function removeInvitation(invitations, id) {
    const length = invitations.length;
    const index = invitations.findIndex(invitation => invitation._id === id);
    const newInvitationsList = [
        ...invitations.slice(0, index),
        ...invitations.slice(index + 1, length)
    ];

    return newInvitationsList;
}