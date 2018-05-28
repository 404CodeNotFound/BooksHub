export function actionSucceeded(message) {
    return { type: 'ACTION_SUCCEEDED', message };
}

export function removeMessage() {
    return { type: 'REMOVE_MESSAGE' };
}