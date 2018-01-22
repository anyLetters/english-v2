import { GET_WORDS, ADD_WORD, EDIT_WORD, TOGGLE_HARD, DELETE_WORD } from '../actions';

function wordReducer(state = {}, action) {
    switch (action.type) {
        case EDIT_WORD:
            if (state.id !== action.word.id) {
                return state;
            }

            return action.word;

        case TOGGLE_HARD:
            if (state.id !== action.word.id) {
                return state;
            }

            return action.word;

        default:
            return state;
    }
}

export default function reducer(state = [], action) {
    switch(action.type) {
        case GET_WORDS:
            return action.data;

        case ADD_WORD:
            return [...state, action.word];

        case EDIT_WORD:
            return state.map(word => wordReducer(word, action));

        case TOGGLE_HARD:
            return state.map(word => wordReducer(word, action));

        case DELETE_WORD:
            const index = state.findIndex(word => word.id === action.id);
            console.log(action)
            return [
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ];

        default:
            return state;
    }
}
