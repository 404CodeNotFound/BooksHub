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

export function openAddAuthorModalSuccess() {
    return { type: 'OPEN_ADD_AUTHOR_MODAL' };
}

export function closeAddAuthorModalSuccess() {
    return { type: 'CLOSE_ADD_AUTHOR_MODAL' };
}

export function openEditAuthorModalSuccess(author) {
    return { type: 'OPEN_EDIT_AUTHOR_MODAL', author: author };
}

export function closeEditAuthorModal() {
    return { type: 'CLOSE_EDIT_AUTHOR_MODAL' };
}

export function openAddGenreModalSuccess() {
    return { type: 'OPEN_ADD_GENRE_MODAL' };
}

export function closeAddGenreModalSuccess() {
    return { type: 'CLOSE_ADD_GENRE_MODAL' };
}

export function openAddAuthorModal() {
    return function (dispatch) {
        dispatch(openAddAuthorModalSuccess());
    };
}

export function closeAddAuthorModal() {
    return function (dispatch) {
        dispatch(closeAddAuthorModalSuccess());
    };
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
        const genresSelectList = user.favourite_genres.map(genre => {
            return { label: genre.name, value: genre.name, id: genre._id };
        });

        const languagesList = user.languages.map(language => {
            return { label: language, value: language };
        });

        const mappedUser = {
            ...user,
            languages: languagesList,
            genres: genresSelectList
        };

        dispatch(openEditUserModalSuccess(mappedUser));
    }
}

export function openEditAuthorModal(author) {
    return function (dispatch) {
        dispatch(openEditAuthorModalSuccess(author));
    }
}

export function openAddGenreModal() {
    return function (dispatch) {
        dispatch(openAddGenreModalSuccess());
    };
}

export function closeAddGenreModal() {
    return function (dispatch) {
        dispatch(closeAddGenreModalSuccess());
    };
}