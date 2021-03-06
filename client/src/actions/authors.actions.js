import requester from '../requesters/requester';
import api from '../requesters/api';
import * as errorActions from './error.actions';
import * as modalsActions from './modals.actions';
import * as loadersActions from './loaders.actions';
import * as successActions from './success.actions';

export function getAuthorBiographySuccess(author) {
    return { type: 'GET_AUTHOR_SUCCESS', author };
}

export function getAllAuthorsSuccess(authors, authorsCount) {
    return { type: 'GET_ALL_AUTHORS_SUCCESS', authors: authors, authorsCount: authorsCount };
}

export function addAuthorSuccess(author) {
    return { type: 'ADD_AUTHOR_SUCCESS', author: author };
}

export function updateAuthorSuccess(author) {
    return { type: 'UPDATE_AUTHOR_SUCCESS', author: author };
}

export function deleteAuthorSuccess(id) {
    return { type: 'DELETE_AUTHOR_SUCCESS', authorId: id };
}

export function getAuthorBiography(id) {
    return function (dispatch) {
        return requester.get(`${api.AUTHORS}/${id}`)
            .done(response => {
                dispatch(getAuthorBiographySuccess(response.author));
                dispatch(loadersActions.hideLoader());
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

export function addAuthor(author) {
    return function (dispatch) {
        const token = localStorage.getItem('token');

        return requester.postAuthorized(token, `${api.AUTHORS}`, author)
            .done(response => {
                dispatch(addAuthorSuccess(response.author));
                dispatch(modalsActions.closeAddAuthorModal());
                dispatch(successActions.actionSucceeded('The author was published!'));
            })
            .fail(error => {
                if (error.responseJSON.hasOwnProperty('message')) {
                    dispatch(errorActions.actionFailed(error.responseJSON.message));
                } else {
                    dispatch(errorActions.validationFailed(error.responseJSON));
                }
            });
    };
}

export function updateAuthor(author) {
    return function (dispatch) {
        const token = localStorage.getItem('token');

        return requester.putAuthorized(token, `${api.AUTHORS}/${author.id}`, author)
            .done(response => {
                dispatch(updateAuthorSuccess(response.author));
                dispatch(modalsActions.closeEditAuthorModal());
                dispatch(successActions.actionSucceeded('The author was updated!'));
            })
            .fail(error => {
                if (error.responseJSON.hasOwnProperty('message')) {
                    dispatch(errorActions.actionFailed(error.responseJSON.message));
                } else {
                    dispatch(errorActions.validationFailed(error.responseJSON));
                }
            });
    };
}

export function deleteAuthor(id) {
    return function (dispatch) {
        const token = localStorage.getItem('token');

        return requester.deleteAuthorized(token, `${api.AUTHORS}/${id}`)
            .done(response => {
                dispatch(deleteAuthorSuccess(id));
                dispatch(successActions.actionSucceeded('Selected author was removed!'));                
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}