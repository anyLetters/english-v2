export const CHANGE_PAGE = 'CHANGE_PAGE';
export const CHANGE_ROWS = 'CHANGE_ROWS';

export function changePage(page) {
    return {
        type: CHANGE_PAGE,
        page
    };
}

export function changeRows(rows) {
    return {
        type: CHANGE_ROWS,
        rows
    };
}