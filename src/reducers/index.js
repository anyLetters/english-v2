import { combineReducers } from 'redux';
import fetching from './fetching';
import words from './words';
import filter from './filter';
import mode from './mode';
import list from './list';
import sort from './sort';

const reducer = combineReducers({
    words,
    filter,
    mode,
    fetching,
    list,
    sort
});

export default reducer;