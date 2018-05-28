export default function loaders(state = { showLoader: false }, action) {
    switch (action.type) {
        case 'SHOW_LOADER':
        debugger;
            return {
                showLoader: true
            };
        case 'HIDE_LOADER':
            return {
                showLoader: false
            };
        default:
            return state;
    }
}