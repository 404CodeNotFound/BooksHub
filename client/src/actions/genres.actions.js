import requester from '../requesters/requester';
import api from '../requesters/api';
import * as errorActions from './error.actions';

export function getAllGenresAsSelectValuesSuccess(genresSelectValues) {
    return { type: 'GET_GENRES_AS_SELECT_VALUES', genresSelectValues };
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