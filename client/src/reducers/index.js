import { combineReducers } from 'redux';
import users from './users.reducer';
import invitations from './invitations.reducer';
import errors from './error.reducer';

const reducer = combineReducers({
    users,
    invitations,
    errors
});

export default reducer;