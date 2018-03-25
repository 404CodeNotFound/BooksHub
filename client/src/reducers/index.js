import { combineReducers } from 'redux';
import authentication from './auth.reducer';

const reducer = combineReducers({
    authentication
});

export default reducer;