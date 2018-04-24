import { combineReducers } from 'redux';
import users from './users.reducer';
import invitations from './invitations.reducer';

const reducer = combineReducers({
    users,
    invitations
});

export default reducer;