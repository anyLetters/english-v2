import { GET_WORDS } from '../actions';

export default function reducer(state = [], action) {
    switch(action.type) {
        case GET_WORDS:
            return action.data;

        default:
            return state;
    }
}
