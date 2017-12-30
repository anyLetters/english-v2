import { combineReducers } from 'redux';
import fetching from './fetching';
import words from './words';
import filter from './filter';
import mode from './mode';
// import words from './list';

const reducer = combineReducers({
    words,
    filter,
    mode,
    fetching
});

export default reducer;