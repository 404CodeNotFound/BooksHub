export default function books(state = {
    book: { author: {}, genres: [], reviews: [] }, books: []
}, action) {
    switch (action.type) {
        case 'GET_BOOK_DETAILS_SUCCESS':
            return {
                ...state,
                book: action.result.book,
                canWriteReview: action.result.canWriteReview,
                currentUserRating: action.result.currentUserRating,
                bookStatus: action.result.bookStatus
            };
        case 'WRITE_REVIEW_SUCCES':
            return {
                ...state,
                book: {
                    ...state.book,
                    reviews: [
                        action.result.review,
                        ...state.book.reviews
                    ]
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
            };
        case 'MARK_BOOK_SUCCESS':
            return {
                ...state,
                bookStatus: action.result.bookStatus
            };
        case 'GET_FILTERED_BOOKS_SUCCESS':
            return {
                ...state,
                books: action.books
            };
        default:
            return state;
    }
}