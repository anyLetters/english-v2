import { TOGGLE_MODE } from '../actions';

export default function reducer(state = 'RANDOM', action) {
    switch(action.type) {
        case TOGGLE_MODE:
            return action.mode;

        default:
            return state;
    }
}