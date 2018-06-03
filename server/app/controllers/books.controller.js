const errors = require('../../utils/error.constants');
const generateErrorResponse = require('../../utils/error.responses');
const { ObjectId } = require('mongodb');

module.exports = (data) => {
    return {
        getBook: (req, res) => {
            const id = req.params.id;

            if (!id) {
                res.status(400)
                    .json({ message: errors.MISSING_BOOK_ID });
            } else {
                if (!ObjectId.isValid(id)) {
                    return res.status(404)
                        .json({ message: errors.BOOK_NOT_FOUND });
                } else {
                    data.books.getBookDetails(id)
                        .then(book => {
                            if (!book) {
                                throw Error(errors.BOOK_NOT_FOUND);
                            } else {
                                res.status(200)
                                    .json({ book });
                            }
                        })
                        .catch(error => {
                            generateErrorResponse(res, error.message);
                        });
                }
            }

            return res;
        },
        addReview: (req, res) => {
            const review = req.body;
            const userId = req.user._id;
            const bookId = req.params.id;

            if (!bookId) {
                res.status(400)
                    .json({ message: errors.MISSING_BOOK_ID });
            } else if (!review.content) {
                res.status(400)
                    .json({ message: errors.MISSING_REVIEW_CONTENT });
            } else {
                data.books.getBookById(bookId)
                    .then(book => {
                        if (!book) {
                            throw Error(errors.BOOK_NOT_FOUND);
                        }
                    })
                    .then(() => data.reviews.createReview(review, userId, bookId))
                    .then(createdReview => data.books.addReviewToBook(bookId, createdReview))
                    .then(createdReview => data.users.addReviewToUser(userId, createdReview))
                    .then(createdReview => {
                        res.status(201)
                            .json({ review: createdReview });
                    })
                    .catch(error => {
                        generateErrorResponse(res, error.message);
                    });
            }

            return res;
        },
        rateBook: (req, res) => {
            const receivedRating = req.body;
            const userId = req.user._id;
            const bookId = req.params.id;

            if (!bookId) {
                res.status(400)
                    .json({ message: errors.MISSING_BOOK_ID });
            } else if (!receivedRating.stars) {
                res.status(400)
                    .json({ message: errors.MISSING_RATING });
            } else {
                data.books.getBookById(bookId)
                    .then(book => {
                        if (!book) {
                            throw Error(errors.BOOK_NOT_FOUND);
                        }
                    })
                    .then(() => data.ratings.postOrUpdateRating(userId, bookId, receivedRating))
                    .then(result => {
                        if (!result.isUpdated) {
                            return data.users.rateBook(result.rating)
                                .then(rating => data.books.addRatingToBook(rating))
                        } else {
                            return data.books.updateTotalRatingOfBook(bookId);
                        }
                    })
                    .then(result => {
                        res.status(201)
                            .json(result);
                    })
                    .catch(error => {
                        generateErrorResponse(res, error.message);
                    });
            }

            return res;
        },
        markBook: (req, res) => {
            const status = req.body;
            const userId = req.user._id;
            const bookId = req.params.id;

            if (!bookId) {
                res.status(400)
                    .json({ message: errors.MISSING_BOOK_ID });
            } else if (!status.name) {
                res.status(400)
                    .json({ message: errors.MISSING_STATUS_TYPE });
            } else {
                data.books.getBookById(bookId)
                    .then(book => {
                        if (!book) {
                            throw Error(errors.BOOK_NOT_FOUND);
                        }
                    })
                    .then(() => data.statuses.postOrUpdateStatus(bookId, userId, status))
                    .then(result => {
                        if (!result.isUpdated) {
                            return data.users.markBook(result.status)
                                .then(createdStatus => data.books.markBook(createdStatus))
                        } else {
                            return { bookStatus: result.status.name };
                        }
                    })
                    .then(result => {
                        res.status(201)
                            .json(result);
                    })
                    .catch(error => {
                        generateErrorResponse(res, error.message);
                    })
            }

            return res;
        },
        getRecommendedBooks: (req, res) => {
            const userId = req.user._id;

            data.users.getFavouriteGenres(userId)
                .then(genres => {
                    if (genres.length > 0) {
                        return data.genres.getBooksByGenres(genres);
                    }

                    return data.books.getLatestBooks();
                })
                .then(books => {
                    res.status(200)
                        .json({ books: books });
                })
                .catch(error => {
                    generateErrorResponse(res, error.message);
                });

            return res;
        },
        getLatestBooks: (req, res) => {
            data.books.getLatestBooks()
                .then(books => {
                    res.status(200)
                        .json({ books: books });
                })
                .catch(error => {
                    generateErrorResponse(res, error.message);
                });

            return res;
        },
        getAllBooks: (req, res) => {
            const page = req.query.page;

            if (req.user.role !== 'Admin') {
                res.status(403)
                    .json({ message: errors.PERMISSIONS_DENIED });
            } else {
                data.books.getAllBooks(page)
                    .then(result => {
                        res.status(200)
                            .json(result);
                    })
                    .catch(error => {
                        generateErrorResponse(res, error.message);
                    });
            }

            return res;
        },
        addBook: (req, res) => {
            if (req.user.role !== 'Admin') {
                res.status(403)
                    .json({ message: errors.PERMISSIONS_DENIED });
            } else {
                const book = req.body;

                req.checkBody('title', 'Title is required.').notEmpty();
                req.checkBody('authorFirstName', 'Author first name is required.').notEmpty();
                req.checkBody('authorLastName', 'Author last name is required.').notEmpty();
                req.checkBody('photo', 'Photo is required.').notEmpty();
                req.checkBody('genres', 'You should select at least one genre.').notEmpty();

                const errors = req.validationErrors();

                if (errors) {
                    res.status(400)
                        .json(errors);
                } else {
                    data.authors.getAuthorByName(book.authorFirstName, book.authorLastName)
                        .then(author => {
                            if (!author) {
                                return data.authors.createAuthorByName(book.authorFirstName, book.authorLastName);
                            }

                            return author;
                        })
                        .then(author => {
                            const genres = book.genres.split(', ');
                            return data.books.createBook(book.title, author._id, book.isbn, book.publisher,
                                book.photo, book.language, book.summary, genres);
                        })
                        .then(createdBook => {
                            data.authors.addBookToAuthorCollection(createdBook._id, createdBook.author);
                            return createdBook;
                        })
                        .then(createdBook => {
                            res.status(201)
                                .json({ book: createdBook });
                        })
                        .catch(error => {
                            generateErrorResponse(res, error.message);
                        });
                }
            }

            return res;
        },
        editBook: (req, res) => {
            const bookId = req.params.id;
            if (req.user.role !== 'Admin') {
                res.status(403)
                    .json({ message: errors.PERMISSIONS_DENIED });
            } else if (!bookId) {
                res.status(400)
                    .json({ message: errors.MISSING_BOOK_ID });
            } else {
                const book = req.body;
                req.checkBody('title', 'Title is required.').notEmpty();
                req.checkBody('photo', 'Photo is required.').notEmpty();

                const errors = req.validationErrors();

                if (errors) {
                    res.status(400)
                        .json(errors);
                } else {
                    data.books.getBookById(bookId)
                        .then((foundBook) => {
                            if (!foundBook) {
                                throw Error(errors.BOOK_NOT_FOUND);
                            }

                            const genres = book.genres.split(', ');
                            return data.books.updateBook(bookId, book.title, book.isbn, book.publisher,
                                book.photo, book.language, book.summary, genres);
                        })
                        .then(updatedBook => {
                            res.status(201)
                                .json({ book: updatedBook });
                        })
                        .catch(error => {
                            generateErrorResponse(res, error.message);
                        });
                }
            }

            return res;
        },
        deleteBook(req, res) {
            if (req.user.role !== 'Admin') {
                res.status(403)
                    .json({ message: errors.PERMISSIONS_DENIED });
            } else {
                const bookId = req.params.id;
                data.books.getBookById(bookId)
                    .then((book) => {
                        if (!book) {
                            throw Error(errors.BOOK_NOT_FOUND);
                        }

                        return data.books.deleteBook(bookId);
                    })
                    .then(() => {
                        res.status(200)
                            .json("Removed");
                    })
                    .catch(error => {
                        generateErrorResponse(res, error.message);
                    });
            }

            return res;
        },
        searchBooks: (req, res) => {
            // const page = req.query.page;
            const searchValue = req.query.phrase;
            const searchType = req.query.searchBy;

            if (searchType === "title") {
                data.books.searchBooksByTitle(searchValue)
                    .then(result => {
                        res.status(200)
                            .json(result);
                    })
                    .catch(error => {
                        generateErrorResponse(res, error.message);
                    });
            } else if (searchType === "author") {
                data.authors.searchBooksByAuthor(searchValue)
                    .then(result => {
                        res.status(200)
                            .json(result);
                    })
                    .catch(error => {
                        generateErrorResponse(res, error.message);
                    });
            } else if (searchType === "summary") {
                const keywords = searchValue.split(" ");
                console.log(keywords);
                
                data.books.searchBooksBySummary(keywords)
                    .then(result => {
                        res.status(200)
                            .json(result);
                    })
                    .catch(error => {
                        generateErrorResponse(res, error.message);
                    });
            }
            
            return res;
        }
    }
}