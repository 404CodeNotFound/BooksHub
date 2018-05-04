import { combineReducers } from 'redux';
import users from './users.reducer';
import invitations from './invitations.reducer';
import errors from './error.reducer';
import books from './books.reducer';
import administration from './administration.reducer';
import modals from './modals.reducer';

const reducer = combineReducers({
    users,
    invitations,
    books,
    errors,
    modals,
    administration
});

export default reducer;