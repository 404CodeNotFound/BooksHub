export default function books(state = {
    books: [], events: [], users: [], authors: [], genres: []
}, action) {
    switch (action.type) {
        case 'GET_ALL_BOOKS_SUCCESS':
            return {
                ...state,
                books: action.books,
                booksCount: action.booksCount
            };
        case 'ADD_BOOK_SUCCESS':
            return {
                ...state,
                books: [
                    action.book,
                    ...state.books
                ],
                booksCount: state.booksCount + 1
            };
        case 'EDIT_BOOK_SUCCESS':
            return {
                ...state,
                books: updateItemInCollection(state.books, action.book)
            };
        case 'DELETE_BOOK_SUCCESS':
            return {
                ...state,
                books: removeFromCollection(state.books, action.bookId)
            };
        case 'GET_ALL_AUTHORS_SUCCESS':
            return {
                ...state,
                authors: action.authors,
                authorsCount: action.authorsCount
            };
        case 'ADD_AUTHOR_SUCCESS':
            return {
                ...state,
                authors: [
                    action.author,
                    ...state.authors
                ],
                authorsCount: state.authorsCount + 1
            };
        case 'UPDATE_AUTHOR_SUCCESS':
            return {
                ...state,
                authors: updateItemInCollection(state.authors, action.author)
            };
        case 'DELETE_AUTHOR_SUCCESS':
            return {
                ...state,
                authors: removeFromCollection(state.authors, action.authorId)
            };
        default:
            return state;
    }
}

function updateItemInCollection(collection, updatedItem) {
    const length = collection.length;
    const index = collection.findIndex(item => item._id === updatedItem._id);
    updatedItem.author = collection[index].author;
    const newCollection = [
        ...collection.slice(0, index),
        updatedItem,
        ...collection.slice(index + 1, length)
    ];

    return newCollection;
}

function removeFromCollection(collection, id) {
    const length = collection.length;
    const index = collection.findIndex(item => item._id === id);
    const newCollection = [
        ...collection.slice(0, index),
        ...collection.slice(index + 1, length)
    ];

    return newCollection;
}