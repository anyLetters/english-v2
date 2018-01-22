import { createSelector } from 'reselect';
import _ from 'lodash';

const wordsSelector = state => state.words;
const selectedKeywordSelector = state => state.filter.keyword;
const selectedCharactersSelector = state => state.filter.characters;
const selectedHardSelector = state => state.filter.hard;

const getWordsFilteredByKeyword = (words, selectedKeyword) => {
    if (selectedKeyword !== '') {
        return _.filter(words, word => {
            switch(selectedKeyword[selectedKeyword.length - 1]) {
                case '!': // exact match
                    return word.eng === selectedKeyword.substring(0, selectedKeyword.length - 1);

                case '@': // date match
                    return word.created_at.includes(selectedKeyword.substring(0, selectedKeyword.length - 1));

                default:
                    return word.eng.includes(selectedKeyword);
            }
        })
    } else {
        return words;
    }
}

const getWordsFilteredByCharacters = (words, selectedCharacters) => {
    if (typeof selectedCharacters[0] !== 'undefined' && selectedCharacters[0] !== '') {
        return _.filter(
            words,
            word => {
                for (let i = 0; i <= selectedCharacters.length; i++) {
                    if(word.eng[0] === selectedCharacters[i]) return true;
                }
            }
        );
    } else {
        return words;
    }
}

const getWordsFilteredByHard = (words, selectedHard) => {
    if (selectedHard === true) {
        return _.filter(words, word => {
            return word.hard === selectedHard;
        })
    } else {
        return words;
    }
}

const getVisibleWordsFilteredByCharacters = createSelector(
    wordsSelector,
    selectedCharactersSelector,
    getWordsFilteredByCharacters
);

const getVisibleWordsFilteredByKeywordAndCharacters = createSelector(
    getVisibleWordsFilteredByCharacters,
    selectedKeywordSelector,
    getWordsFilteredByKeyword
);

export default createSelector( // о божечки, это великолепно!
    getVisibleWordsFilteredByKeywordAndCharacters,
    selectedHardSelector,
    getWordsFilteredByHard
);