import { SET_KEYWORD_FILTER, SET_CHARACTERS_FILTER, TOGGLE_HARD_FILTER } from '../actions';

const initialState = {
    keyword: '',
    characters: [''],
    hard: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_KEYWORD_FILTER:
            return { ...state, ...action.keyword };

        case SET_CHARACTERS_FILTER:
            return { ...state, characters: action.characters };

        case TOGGLE_HARD_FILTER:
            return { ...state, hard: !state.hard };

        default:
            return state;
    }
}