import { combineReducers } from 'redux';
import fetching from './fetching';
import words from './words';
import filter from './filter';
import mode from './mode';

const reducer = combineReducers({
    words,
    filter,
    mode,
    fetching
});

export default reducer;