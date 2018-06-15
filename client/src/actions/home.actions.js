import requester from '../requesters/requester';
import api from '../requesters/api';
import * as errorActions from './error.actions';

export function getInfoSuccess(info) {
    return { type: 'GET_INFO_SUCCESS', info };
}

export function getInfo() {
    return function (dispatch) {
        return requester.get(`${api.INFO}`)
            .done(response => {
                dispatch(getInfoSuccess(response));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}