export const SET_KEYWORD_FILTER = 'SET_KEYWORD_FILTER';
export const SET_CHARACTERS_FILTER = 'SET_CHARACTERS_FILTER';
export const TOGGLE_HARD_FILTER = 'TOGGLE_HARD_FILTER';
export const FILTER_TEXT = 'FILTER_TEXT';
export const FILTER_CHARACTERS = 'FILTER_CHARACTERS';
export const FILTER_HARD = 'FILTER_HARD';

export function setKeywordFilter(keyword) {
    return {
        type: SET_KEYWORD_FILTER,
        keyword
    };
}

export function setCharactersFilter(characters) {
    return {
        type: SET_CHARACTERS_FILTER,
        characters
    };
}

export function toggleHardFilter() {
    return {
        type: TOGGLE_HARD_FILTER
    };
}