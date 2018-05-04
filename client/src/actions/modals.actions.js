export function openModalSuccess() {
    return { type: 'OPEN_MODAL' };
}

export function closeModalSuccess() {
    return { type: 'CLOSE_MODAL' };
}

export function openModal() {
    return function (dispatch) {
        dispatch(openModalSuccess());
    };
}

export function closeModal() {
    return function (dispatch) {
        dispatch(closeModalSuccess());
    };
}