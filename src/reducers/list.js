import { CHANGE_PAGE, CHANGE_ROWS } from '../actions';

export default function reducer(state = { page: 0, rows: 15 }, action) {
    switch (action.type) {
        case CHANGE_PAGE:
            return { ...state, page: action.page };

        case CHANGE_ROWS:
            return { ...state, rows: action.rows };

        default:
            return state;
    }
}