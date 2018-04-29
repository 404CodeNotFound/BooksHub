export default function books(state = {
    book: null
}, action) {
    switch (action.type) {
        case 'GET_BOOK_DETAILS_SUCCESS':
            return {
                ...state,
                book: action.result.book,
                canWriteReview: action.result.canWriteReview,
                currentUserRating: action.result.currentUserRating
            };
        case 'WRITE_REVIEW_SUCCES':
            return {
                ...state,
                book: {
                    ...state.book,
                    reviews: addReview(state.book.reviews, action.result.review)
                },
                canWriteReview: action.result.canWriteReview
            };
        case 'RATE_BOOK_SUCCESS': 
            return {
                ...state,
                book: {
                    ...state.book,
                    rating: action.result.bookRating
                },
                currentUserRating: action.result.userRating
            }
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