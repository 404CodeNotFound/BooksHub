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