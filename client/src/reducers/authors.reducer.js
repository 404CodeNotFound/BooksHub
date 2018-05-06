export default function authors(state = { author: { books: []} }, action) {
    switch (action.type) {
        case 'GET_AUTHOR_SUCCESS':
            return {
                ...state,
                author: action.author
            };
        default:
            return state;
    }
}