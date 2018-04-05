import { REQUEST_WORDS, GET_WORDS } from '../actions';

export default function reducer(state = true, action) {
    switch (action.type) {
        case REQUEST_WORDS:
            return true;

        case GET_WORDS:
            return false;

        default:
            return state;
    }
}