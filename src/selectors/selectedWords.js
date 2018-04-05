import { createSelector } from 'reselect';
import _ from 'lodash';

const wordsSelector = state => state.words;
const selectedKeywordSelector = state => state.filter.keyword;
const selectedCharactersSelector = state => state.filter.characters;
const selectedHardSelector = state => state.filter.hard;

const getWordsFilteredByKeyword = (words, selectedKeyword) => {
    if (selectedKeyword !== '') {
        return _.filter(words, word => {
            switch (selectedKeyword[selectedKeyword.length - 1]) {
                case '!': // exact match
                    return word.eng === selectedKeyword.substring(0, selectedKeyword.length - 1);

                case '@': // date match
                    return word.created_at.includes(selectedKeyword.substring(0, selectedKeyword.length - 1));

                default:
                    return word.eng.includes(selectedKeyword);
            }
        });
    } else {
        return words;
    }
};

const getWordsFilteredByCharacters = (words, selectedCharacters) => {
    if (selectedCharacters[0]) {
        return _.filter(words, word => {
                for (let i = 0; i <= selectedCharacters.length; i++) {
                    if (word.eng[0] === selectedCharacters[i]) return true;
                }
            }
        );
    } else {
        return words;
    }
};

const getWordsFilteredByHard = (words, selectedHard) => {
    return selectedHard ? _.filter(words, 'hard') : words;
};

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