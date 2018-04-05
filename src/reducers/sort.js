import { CHANGE_SORTKEY, TOGGLE_ALPHABETICAL_ORDER } from '../actions';

const initialState = {
    sortKey: 'asc',
    sortByABC: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_SORTKEY:
            return { ...state, sortKey: action.sortKey };

        case TOGGLE_ALPHABETICAL_ORDER:
            return { ...state, sortByABC: !state.sortByABC };

        default:
            return state;
    }
}