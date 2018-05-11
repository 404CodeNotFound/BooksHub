import * as errorsActions from './error.actions';

export function openAddBookModalSuccess() {
    return { type: 'OPEN_ADD_BOOK_MODAL' };
}

export function closeAddBookModalSuccess() {
    return { type: 'CLOSE_ADD_BOOK_MODAL' };
}

export function openEditBookModalSuccess(mappedBook) {
    return { type: 'OPEN_EDIT_BOOK_MODAL', book: mappedBook };
}


export function closeEditBookModal() {
    return { type: 'CLOSE_EDIT_BOOK_MODAL' };
}

export function openEditUserModalSuccess(mappedUser) {
    return { type: 'OPEN_EDIT_USER_MODAL', user: mappedUser };
}

export function closeEditUserModal() {
    return { type: 'CLOSE_EDIT_USER_MODAL' };
}

export function openAddBookModal() {
    return function (dispatch) {
        dispatch(errorsActions.removeAllValidationErrors());
        dispatch(openAddBookModalSuccess());
    };
}

export function closeAddBookModal() {
    return function (dispatch) {
        dispatch(closeAddBookModalSuccess());
    };
}

export function openEditBookModal(book) {
    return function (dispatch) {
        const genresAsSelectList = book.genres.map(genre => {
            return { value: genre.name, label: genre.name, id: genre._id };
        });
        const mappedBook = {
            ...book,
            genres: genresAsSelectList
        };

        dispatch(errorsActions.removeAllValidationErrors());
        dispatch(openEditBookModalSuccess(mappedBook));
    }
}

export function openEditUserModal(user) {
    return function (dispatch) {
        const mappedUser = {
            ...user,
            languages: user.selectedLanguages
        };

        dispatch(openEditUserModalSuccess(mappedUser));
    }
}