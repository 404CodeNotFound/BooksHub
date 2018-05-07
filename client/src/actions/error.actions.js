export function actionFailed(error) {
    return { type: 'ACTION_FAILED', error };
}

export function removeError() {
    return { type: 'REMOVE_ERROR' };
}

export function validationFailed(validationErrors) {
    return { type: 'VALIDATION_FAILED', validationErrors };
}

export function removeValidationError(param) {
    return { type: 'REMOVE_VALIDATION_ERROR', param: param };
}

export function removeAllValidationErrors() {
    return { type: 'REMOVE_ALL_VALIDATION_ERRORS' };
}