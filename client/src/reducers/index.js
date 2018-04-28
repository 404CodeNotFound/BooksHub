import { combineReducers } from 'redux';
import users from './users.reducer';
import invitations from './invitations.reducer';
import errors from './error.reducer';
import books from './books.reducer';

const reducer = combineReducers({
    users,
    invitations,
    books,
    errors
});

export default reducer;