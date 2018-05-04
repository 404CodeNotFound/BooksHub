export default function modals(state = { show: false }, action) {
    switch (action.type) {
        case 'OPEN_MODAL':
            return {
                show: true
            };
        case 'CLOSE_MODAL':
            return {
                show: false
            };
        default:
            return state;
    }
}