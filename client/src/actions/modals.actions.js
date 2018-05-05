export function openAddBookModalSuccess() {
    return { type: 'OPEN_ADD_BOOK_MODAL' };
}

export function closeAddBookModalSuccess() {
    return { type: 'CLOSE_ADD_BOOK_MODAL' };
}

export function openAddBookModal() {
    return function (dispatch) {
        dispatch(openAddBookModalSuccess());
    };
}

export function closeAddBookModal() {
    return function (dispatch) {
        dispatch(closeAddBookModalSuccess());
    };
}

export function openEditBookModal(book) {
    const genresAsSelectList = book.genres.map(genre => {
        return { value: genre.name, label: genre.name, id: genre._id };
    });
    const mappedBook = {
        ...book,
        genres: genresAsSelectList
    };

    return { type: 'OPEN_EDIT_BOOK_MODAL', book: mappedBook };
}

export function closeEditBookModal() {
    return { type: 'CLOSE_EDIT_BOOK_MODAL' };
}