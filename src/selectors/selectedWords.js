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

// const getVisibleWordsByKeywordAndCharacters = createSelector(
//     [getVisibleWordsFilteredByCharacters, selectedKeywordSelector], 
//     (visibleWords, keyword) => {
//         console.log('char and keyword');
//         if (keyword !== '') {
//             return _.filter(visibleWords, word => {
//                     switch(keyword[keyword.length - 1]) {
//                         case '!':
//                             return word.eng === keyword.substring(0, keyword.length - 1);
//                             break;
        
//                         case '@':
//                             return word.created_at.includes(keyword.substring(0, keyword.length - 1));
//                             break;
        
//                         default:
//                             return word.eng.includes(keyword);
//                     }
//                 })
//         } else {
//             return visibleWords;
//         }
//     }
// )

// const getVisibleWordsFilteredByHard = createSelector(
//     getVisibleWordsFilteredByKeyword,
//     selectedHardSelector,
//     getWordsFilteredByHard
// );

// export default createSelector(
//     [getVisibleWordsByKeywordAndCharacters, selectedHardSelector], 
//     (getVisibleWordsByKeywordAndCharacters, hard) => {
//         console.log('hard');
//         if (hard === true) {
//             return _.filter(getVisibleWordsByKeywordAndCharacters, word => {
//                 return word.hard === hard;
//             })
//         } else {
//             return getVisibleWordsByKeywordAndCharacters;
//         }
//     }
// )