export const CHANGE_SORTKEY = 'CHANGE_SORTKEY';
export const TOGGLE_ALPHABETICAL_ORDER = 'TOGGLE_ALPHABETICAL_ORDER';

export function changeSortKey(sortKey) {
    return {
        type: CHANGE_SORTKEY,
        sortKey
    };
}

export function toggleAlphabeticalOrder() {
    return {
        type: TOGGLE_ALPHABETICAL_ORDER
    };
}