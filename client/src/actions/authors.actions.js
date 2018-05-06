import requester from '../requesters/requester';
import api from '../requesters/api';
import * as errorActions from './error.actions';

export function getAuthorBiographySuccess(author) {
    return { type: 'GET_AUTHOR_SUCCESS', author };
}

export function getAuthorBiography(id) {
    return function (dispatch) {
        return requester.get(`${api.AUTHORS}/${id}`)
            .done(response => {
                dispatch(getAuthorBiographySuccess(response.author));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}