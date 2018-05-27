import { combineReducers } from 'redux';
import users from './users.reducer';
import invitations from './invitations.reducer';
import errors from './error.reducer';
import books from './books.reducer';
import events from './events.reducer';
import genres from './genres.reducer';
import administration from './administration.reducer';
import modals from './modals.reducer';
import authors from './authors.reducer';
import loaders from './loaders.reducer';

const reducer = combineReducers({
    users,
    invitations,
    books,
    events,
    genres,
    errors,
    modals,
    loaders,
    authors,
    administration
});

export default reducer;