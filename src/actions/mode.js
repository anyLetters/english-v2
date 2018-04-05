export const TOGGLE_MODE = 'TOGGLE_MODE';

export function toggleMode(mode) {
    return {
        type: TOGGLE_MODE,
        mode
    };
}