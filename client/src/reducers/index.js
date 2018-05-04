import { combineReducers } from 'redux';
import users from './users.reducer';
import invitations from './invitations.reducer';
import errors from './error.reducer';
import modals from './modals.reducer';

const reducer = combineReducers({
    users,
    invitations,
    errors,
    modals
});

export default reducer;