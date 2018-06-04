import requester from '../requesters/requester';
import api from '../requesters/api';
import * as errorActions from './error.actions';
import * as modalsActions from './modals.actions';
import * as loadersActions from './loaders.actions';
import * as successActions from './success.actions';

export function getUserBooksSuccess(result) {
    return { type: 'GET_USER_BOOKS_SUCCESS', books: result.books, booksCount: result.booksCount };
}

export function getFilteredBooksSuccess(books) {
    return { type: 'GET_FILTERED_BOOKS_SUCCESS', books };
}

export function getBookDetailsSuccess(book, canWriteReview, currentUserRating, bookStatus) {
    return { type: 'GET_BOOK_DETAILS_SUCCESS', result: { book, canWriteReview, currentUserRating, bookStatus } };
}

export function rateBookSuccess(result) {
    return { type: 'RATE_BOOK_SUCCESS', result };
}

export function markBookSuccess(result) {
    return { type: 'MARK_BOOK_SUCCESS', result };
}

export function getAllBooksSuccess(result) {
    return { type: 'GET_ALL_BOOKS_SUCCESS', books: result.books, booksCount: result.booksCount };
}

export function addBookSuccess(book) {
    return { type: 'ADD_BOOK_SUCCESS', book };
}

export function editBookSuccess(book) {
    return { type: 'EDIT_BOOK_SUCCESS', book };
}

export function deleteBookSuccess(bookId) {
    return { type: 'DELETE_BOOK_SUCCESS', bookId: bookId };
}

export function searchBooksSuccess(books, booksCount) {
    return { type: 'SEARCH_BOOKS_SUCCESS', books, booksCount };
}

export function updateSearchType(searchType) {
    return { type: 'UPDATE_SEARCH_TYPE', searchType };
}

export function getCurrentlyReadingBooks(id, page) {
    return function (dispatch) {
        return requester.get(`${api.USERS}/${id}/reading?page=${page}`)
            .done(response => {
                dispatch(getUserBooksSuccess(response));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function getWantToReadBooks(id, page) {
    return function (dispatch) {
        return requester.get(`${api.USERS}/${id}/wishlist?page=${page}`)
            .done(response => {
                dispatch(getUserBooksSuccess(response));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function getReadBooks(id, page) {
    return function (dispatch) {
        return requester.get(`${api.USERS}/${id}/read?page=${page}`)
            .done(response => {
                dispatch(getUserBooksSuccess(response));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function getBookDetails(bookId, userId) {
    return function (dispatch) {
        return requester.get(`${api.BOOKS}/${bookId}`)
            .done(response => {
                const userCanWriteReview = response.book.reviews.findIndex(review => review.user._id === userId) < 0;
                let currentUserRating = response.book.ratings.find(rating => rating.user === userId);
                if (!currentUserRating) {
                    currentUserRating = { stars: 0 };
                }

                let bookStatus = response.book.statuses.find(status => status.user === userId);
                if (!bookStatus) {
                    bookStatus = { name: 'WantToRead' };
                }

                dispatch(getBookDetailsSuccess(response.book, userCanWriteReview, currentUserRating.stars, bookStatus.name));
                dispatch(loadersActions.hideLoader());
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function rateBook(bookId, rating) {
    return function (dispatch) {
        const token = localStorage.getItem('token');
        const body = {
            stars: rating,
            rated_on: new Date()
        };

        return requester.putAuthorized(token, `${api.BOOKS}/${bookId}/rating`, body)
            .done(response => {
                dispatch(rateBookSuccess({ userRating: body.stars, bookRating: response.bookRating }));
                dispatch(successActions.actionSucceeded('Your vote was saved!'));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function markBook(bookId, userId, status) {
    return function (dispatch) {
        const token = localStorage.getItem('token');
        const body = {
            user: userId,
            book: bookId,
            name: status
        };

        return requester.putAuthorized(token, `${api.BOOKS}/${bookId}/statuses`, body)
            .done(response => {
                dispatch(markBookSuccess({ bookStatus: response.bookStatus }));
                dispatch(successActions.actionSucceeded('Your have marked this book!'));                
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function getRecommendedBooks() {
    return function (dispatch) {
        const token = localStorage.getItem('token');
        return requester.getAuthorized(token, `${api.RECOMMENDED_BOOKS}`)
            .done(response => {
                dispatch(getFilteredBooksSuccess(response.books));
                dispatch(loadersActions.hideLoader());                
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function getLatestBooks() {
    return function (dispatch) {
        return requester.get(`${api.LATEST_BOOKS}`)
            .done(response => {
                dispatch(getFilteredBooksSuccess(response.books));
                dispatch(loadersActions.hideLoader());                
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function getAllBooks(page) {
    return function (dispatch) {
        const token = localStorage.getItem('token');
        return requester.getAuthorized(token, `${api.BOOKS}?page=${page}`)
            .done(response => {        
                dispatch(getAllBooksSuccess(response));
                dispatch(loadersActions.hideLoader());
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function addBook(book) {
    return function (dispatch) {
        const token = localStorage.getItem('token');

        return requester.postAuthorized(token, `${api.BOOKS}`, book)
            .done(response => {
                dispatch(addBookSuccess(response.book));
                dispatch(modalsActions.closeAddBookModal());
                dispatch(successActions.actionSucceeded('The book was published!'));                                                
            })
            .fail(error => {
                if (error.responseJSON.hasOwnProperty('message')) {
                    dispatch(errorActions.actionFailed(error.responseJSON.message));
                } else {
                    dispatch(errorActions.validationFailed(error.responseJSON));
                }
            });
    };
}

export function editBook(book) {
    return function (dispatch) {
        const token = localStorage.getItem('token');
        return requester.putAuthorized(token, `${api.BOOKS}/${book.id}`, book)
            .done(response => {
                dispatch(editBookSuccess(response.book));
                dispatch(modalsActions.closeEditBookModal());
                dispatch(successActions.actionSucceeded('The information about book was updated!'));                                                                
            })
            .fail(error => {
                if (error.responseJSON.hasOwnProperty('message')) {
                    dispatch(errorActions.actionFailed(error.responseJSON.message));
                } else {
                    dispatch(errorActions.validationFailed(error.responseJSON));
                }
            });
    };
}

export function deleteBook(bookId) {
    return function (dispatch) {
        const token = localStorage.getItem('token');

        return requester.deleteAuthorized(token, `${api.BOOKS}/${bookId}`)
            .done(response => {
                dispatch(deleteBookSuccess(bookId));
                dispatch(successActions.actionSucceeded('Selected book was removed!'));                                                                
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function getRecommendedBooksByFriends(id, page) {
    return function (dispatch) {
        return requester.get(`${api.USERS}/${id}/recommended?page=${page}`)
            .done(response => {
                dispatch(getUserBooksSuccess(response));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}

export function searchBooks(searchValue, searchType, filters) {
    return function (dispatch) {
        return requester.get(`${api.BOOKS_SEARCH}?searchBy=${searchType}&phrase=${searchValue}`)
            .done(response => { 
                debugger;
                let booksResult = [];
                if (searchType === "author") {
                    const booksByAuthors = response.map(item => item.books);
                    booksByAuthors.forEach(books => {
                        books.forEach(book => {
                            booksResult.push(book);
                        });
                    });
                } else {
                    booksResult = response.books;
                }

                if (filters) {
                    booksResult = booksResult.filter(book => {
                        const genres = book.genres.map(genre => genre.name);
                        return containsFilters(genres, filters);
                    });
                }

                dispatch(searchBooksSuccess(booksResult, booksResult.length ? booksResult.length : response.booksCount));
            })
            .fail(error => {
                dispatch(errorActions.actionFailed(error.responseJSON.message));
            });
    };
}


function containsFilters(set, subset) {
    for (var element of subset) {
        if (set.indexOf(element) < 0) {
            return false;
        }
    }

    return true;
}