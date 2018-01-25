import { SET_KEYWORD_FILTER, SET_CHARACTERS_FILTER, TOGGLE_HARD_FILTER } from '../actions';

const initialState = {
    keyword: '',
    characters: [''],
    hard: false
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case SET_KEYWORD_FILTER:
            return Object.assign({}, state, action.keyword);

        case SET_CHARACTERS_FILTER:
            return Object.assign({}, state, {characters: action.characters});

        case TOGGLE_HARD_FILTER:
            return Object.assign({}, state, {hard: !state.hard});

        default:
            return state;
    }
}