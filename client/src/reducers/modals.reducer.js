export default function modals(state = { showAddBookModal: false, showEditBookModal: false }, action) {
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
                showEditBookModal: true
            };
        case 'CLOSE_EDIT_BOOK_MODAL':
            return {
                showEditBookModal: false
            };
        default:
            return state;
    }
}