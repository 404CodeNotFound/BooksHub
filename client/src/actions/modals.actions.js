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

export function openAddEventModalSuccess() {
    return { type: 'OPEN_ADD_EVENT_MODAL' };
}

export function closeAddEventModalSuccess() {
    return { type: 'CLOSE_ADD_EVENT_MODAL' };
}

export function openEditEventModalSuccess(mappedEvent) {
    return { type: 'OPEN_EDIT_EVENT_MODAL', event: mappedEvent };
}

export function closeEditEventModal() {
    return { type: 'CLOSE_EDIT_EVENT_MODAL' };
}

export function openAllParticipantsModal() {
    return { type: 'OPEN_ALL_PARTICIPANTS_MODAL' };
}

export function closeAllParticipantsModal() {
    return { type: 'CLOSE_ALL_PARTICIPANTS_MODAL' };
}

export function openRecommendBookModal(friends) {
    return { type: 'OPEN_RECOMMEND_BOOK_MODAL' };
}

export function closeRecommendBookModal() {
    return { type: 'CLOSE_RECOMMEND_BOOK_MODAL' };
}

export function openAddAuthorModal() {
    return function (dispatch) {
        dispatch(errorsActions.removeAllValidationErrors());        
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
        dispatch(errorsActions.removeAllValidationErrors());        
        dispatch(openEditAuthorModalSuccess(author));
    }
}

export function openAddGenreModal() {
    return function (dispatch) {
        dispatch(errorsActions.removeAllValidationErrors());
        dispatch(openAddGenreModalSuccess());
    };
}

export function closeAddGenreModal() {
    return function (dispatch) {
        dispatch(closeAddGenreModalSuccess());
    };
}

export function openAddEventModal() {
    return function (dispatch) {
        dispatch(errorsActions.removeAllValidationErrors());
        dispatch(openAddEventModalSuccess());
    };
}

export function closeAddEventModal() {
    return function (dispatch) {
        dispatch(closeAddEventModalSuccess());
    };
}

export function openEditEventModal(event) {
    return function (dispatch) {
        const genresAsSelectList = event.genres.map(genre => {
            return { value: genre.name, label: genre.name, id: genre._id };
        });
        const mappedEvent = {
            ...event,
            genres: genresAsSelectList
        };
        
        dispatch(errorsActions.removeAllValidationErrors());
        dispatch(openEditEventModalSuccess(mappedEvent));
    };
}