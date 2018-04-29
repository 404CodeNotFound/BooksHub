export default function books(state = {
    book: null
}, action) {
    switch (action.type) {
        case 'GET_BOOK_DETAILS_SUCCESS':
            return {
                ...state,
                book: action.result.book,
                canWriteReview: action.result.canWriteReview
            };
        case 'WRITE_REVIEW_SUCCES':
            return {
                book: {
                    ...state.book,
                    reviews: addReview(state.book.reviews, action.result.review)
                },
                canWriteReview: action.result.canWriteReview
            };
        default:
            return state;
    }
}

function addReview(reviews, review) {
    return [
        review,
        ...reviews,
    ];
}