import requester from '../requesters/requester';
import api from '../requesters/api';
import * as errorActions from './error.actions';
import * as modalsActions from './modals.actions';
import * as successActions from './success.actions';

export function getAllGenresAsSelectValuesSuccess(genresSelectValues) {
    return { type: 'GET_GENRES_AS_SELECT_VALUES', genresSelectValues };
}

export function getAllGenresSuccess(genres, genresCount) {
    return { type: 'GET_ALL_GENRES_SUCCESS', genres: genres, genresCount: genresCount };
}

export function addGenreSuccess(genre) {
    return { type: 'ADD_GENRE_SUCCESS', genre: genre };
}

export function deleteGenreSuccess(id) {
    return { type: 'DELETE_GENRE_SUCCESS', genreId: id };
}

export function getAllGenresAsSelectValues() {
    return function (dispatch) {
        const token = localStorage.getItem('token');
        return requester.getAuthorized(token, `${api.GENRES}`)
            .done(response => {
                const selectValues = response.genres.map(genre => {
                    return { label: genre.name, value: genre.name, id: genre._id };
                });
                dispatch(getAllGenresAsSelectValuesSuccess(selectValues));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function getAllGenres() {
    return function (dispatch) {
        const token = localStorage.getItem('token');

        return requester.getAuthorized(token, `${api.GENRES}`)
            .done(response => {
                debugger;
                dispatch(getAllGenresSuccess(response.genres, response.genresCount));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function addGenre(genre) {
    return function (dispatch) {
        const token = localStorage.getItem('token');

        return requester.postAuthorized(token, `${api.GENRES}`, genre)
            .done(response => {
                dispatch(addGenreSuccess(response.genre));
                dispatch(modalsActions.closeAddGenreModal());
                dispatch(successActions.actionSucceeded('The genre was published!'));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function deleteGenre(id) {
    return function (dispatch) {
        const token = localStorage.getItem('token');

        return requester.deleteAuthorized(token, `${api.GENRES}/${id}`)
            .done(response => {
                dispatch(deleteGenreSuccess(id));
                dispatch(successActions.actionSucceeded('Selected genre was removed!'));                
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}