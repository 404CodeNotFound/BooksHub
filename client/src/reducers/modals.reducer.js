export default function modals(state = { 
    showAddBookModal: false, showEditBookModal: false, bookToEdit: {} ,
    showEditUserModal: false, userToEdit: {},
    showAddAuthorModal: false, showEditAuthorModal: false, authorToEdit: {} }, action) {
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
        default:
            return state;
    }
}