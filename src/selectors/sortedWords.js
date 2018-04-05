import { createSelector } from 'reselect';
import _ from 'lodash';
import wordsSelector from './selectedWords.js';

const sortSelector = state => state.sort;

function sortBySortKey(words, sort) {
    return _.orderBy(words, ['id'], [sort.sortKey]);
}

function sortByABC(words, sort) {
    return sort.sortByABC ? _.orderBy(words, ['eng'], [sort.sortKey]) : words;
}

export default createSelector(
    wordsSelector,
    sortSelector,
    (words, sort) => {
        // return words if no sort is needed
        if (sort.sortKey === 'asc' && !sort.sortByABC) return words;
        if (sort.sortKey === 'randomized' && !sort.sortByABC) return _.shuffle(words);

        return sortByABC(sortBySortKey(words, sort), sort);
    }
);