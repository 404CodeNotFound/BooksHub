import requester from '../requesters/requester';
import api from '../requesters/api';
import * as errorActions from './error.actions';

export function getAuthorBiographySuccess(author) {
    return { type: 'GET_AUTHOR_SUCCESS', author };
}

export function getAllAuthorsSuccess(authors, authorsCount) {
    return { type: 'GET_ALL_AUTHORS_SUCCESS', authors: authors, authorsCount: authorsCount };
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

export function getAllAuthors(page) {
    return function (dispatch) {
        const token = localStorage.getItem('token');
        
        return requester.getAuthorized(token, `${api.AUTHORS}?page=${page}`)
            .done(response => {
                dispatch(getAllAuthorsSuccess(response.authors, response.authorsCount));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}