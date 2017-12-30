import axios from 'axios';

export const REQUEST_WORDS = 'REQUEST_WORDS';
export const GET_WORDS = 'GET_WORDS';
export const ADD_WORD = 'ADD_WORD';
export const DELETE_WORD = 'DELETE_WORD';
export const TOGGLE_WORD = 'TOGGLE_WORD';
export const EDIT_WORD = 'EDIT_WORD';

export function getWords() {
    return dispatch => {
        dispatch({
            type: REQUEST_WORDS
        });

        return axios.get('/api/data')
            .then(response => response.data)
            .then(data => dispatch({
                type: GET_WORDS,
                data
            }));
    };
}