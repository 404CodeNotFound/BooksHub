export default function modals(state = { 
    showAddBookModal: false, showEditBookModal: false, bookToEdit: {} ,
    showEditUserModal: false, userToEdit: {},
    showAddAuthorModal: false, showEditAuthorModal: false, authorToEdit: {},
    showAddGenreModal: false,
    showAddEventModal: false, showEditEventModal: false, eventToEdit: {},
    showAllParticipantsModal: false }, action) {
    switch (action.type) {
        case 'OPEN_ADD_BOOK_MODAL':
            return {
                showAddBookModal: true
            };
        case 'CLOSE_ADD_BOOK_MODAL':
            return {
                showAddBookModal: false
            };
        case 'OPEN_EDIT_BOOK_MODAL':
            return {
                showEditBookModal: true,
                bookToEdit: action.book
            };
        case 'CLOSE_EDIT_BOOK_MODAL':
            return {
                showEditBookModal: false,
                bookToEdit: {}
            };
        case 'OPEN_EDIT_USER_MODAL':
            return {
                showEditUserModal: true,
                userToEdit: action.user
            };
        case 'CLOSE_EDIT_USER_MODAL':
            return {
                showEditUserModal: false,
                userToEdit: {}
            };
        case 'OPEN_ADD_AUTHOR_MODAL':
            return {
                showAddAuthorModal: true
            };
        case 'CLOSE_ADD_AUTHOR_MODAL':
            return {
                showAddAuthorModal: false
            };
        case 'OPEN_EDIT_AUTHOR_MODAL':
            return {
                showEditAuthorModal: true,
                authorToEdit: action.author
            };
        case 'CLOSE_EDIT_AUTHOR_MODAL':
            return {
                showEditAuthorModal: false,
                authorToEdit: {}
            };
        case 'OPEN_ADD_GENRE_MODAL':
            return {
                showAddGenreModal: true
            };
        case 'CLOSE_ADD_GENRE_MODAL':
            return {
                showAddGenreModal: false
            };
        case 'OPEN_ADD_EVENT_MODAL':
            return {
                showAddEventModal: true
            };
        case 'CLOSE_ADD_EVENT_MODAL':
            return {
                showAddEventModal: false
            };
        case 'OPEN_EDIT_EVENT_MODAL':
            return {
                showEditEventModal: true,
                eventToEdit: action.event
            };
        case 'CLOSE_EDIT_EVENT_MODAL':
            return {
                showEditEventModal: false,
                eventToEdit: {}
            };
        case 'OPEN_ALL_PARTICIPANTS_MODAL':
            return {
                showAllParticipantsModal: true
            };
        case 'CLOSE_ALL_PARTICIPANTS_MODAL':
            return {
                showAllParticipantsModal: false
            };
        default:
            return state;
    }
}