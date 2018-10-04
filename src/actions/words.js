import axios from 'axios';

export const REQUEST_WORDS = 'REQUEST_WORDS';
export const GET_WORDS = 'GET_WORDS';
export const ADD_WORD = 'ADD_WORD';
export const EDIT_WORD = 'EDIT_WORD';
export const TOGGLE_HARD = 'TOGGLE_HARD';
export const DELETE_WORD = 'DELETE_WORD';

export function getWords() {
    return dispatch => {
        dispatch({
            type: REQUEST_WORDS
        });

        return axios.get('/api/words')
            .then(response => response.data)
            .then(data => dispatch({
                type: GET_WORDS,
                data
            }));
    };
}

export function addWord(word) {
    return axios.post('/api/words', {word})
        .then(response => response.data)
        .then(word => ({
            type: ADD_WORD,
            word
        }));
}

export function editWord(word) {
    return axios.put(`/api/words/${word.id}`, {word})
        .then(response => response.data)
        .then(word => ({
            type: EDIT_WORD,
            word
        }));
}

export function toggleHard(id) {
    return axios.patch(`/api/words/${id}`)
        .then(response => response.data)
        .then(word => ({
            type: TOGGLE_HARD,
            word
        }));
}

export function deleteWord(id) {
    return axios.delete(`/api/words/${id}`)
        .then(() => ({
            type: DELETE_WORD,
            id
        }));
}