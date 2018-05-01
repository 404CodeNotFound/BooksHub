import { combineReducers } from 'redux';
import users from './users.reducer';
import invitations from './invitations.reducer';
import errors from './error.reducer';
import books from './books.reducer';
import administration from './administration.reducer';

const reducer = combineReducers({
    users,
    invitations,
    books,
    errors,
    administration
});

export default reducer;