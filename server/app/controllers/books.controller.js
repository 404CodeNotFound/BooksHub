module.exports = (data) => {
    return {
        getBook: (req, res) => {
            const title = req.params.title;

            if (!title) {
                res.status(400)
                    .json({ message: "You should provide title of book." });
            } else {
                data.books.getBookByTitle(title)
                    .then(book => {
                        if (!book) {
                            res.status(404)
                                .json({ message: "Book was not found." })
                        } else {
                            res.status(200)
                                .json({ book });
                        }
                    })
                    .catch(error => {
                        res.status(500)
                            .json({ message: 'Something went wrong!' })
                    });
            }

            return res;
        },
        addReview: (req, res) => {
            const review = req.body;
            if (!review.user) {
                res.status(400)
                    .json({ message: "You should provide id of user." });
            } else if (!review.book) {
                res.status(400)
                    .json({ message: "You should provide id of book." });
            } else if (!review.content) {
                res.status(400)
                    .json({ message: "You should provide content of review." });
            } else {
                data.reviews.createReview(review)
                    .then(createdReview => data.books.addReviewToBook(createdReview.book, createdReview))
                    .then(createdReview => data.users.addReviewToUser(review.user, createdReview))
                    .then(createdReview => {
                        res.status(201)
                            .json({ review: createdReview });
                    })
                    .catch(error => {
                        res.status(500)
                            .json({ message: 'Something went wrong!' })
                    });
            }

            return res;
        },
        rateBook: (req, res) => {
            const receivedRating = req.body;
            if (!receivedRating.user) {
                res.status(400)
                    .json({ message: "You should provide id of user." });
            } else if (!receivedRating.book) {
                res.status(400)
                    .json({ message: "You should provide id of book." });
            } else if (!receivedRating.stars) {
                res.status(400)
                    .json({ message: "You should provide rating." });
            } else {
                data.ratings.postOrUpdateRating(receivedRating)
                    .then(result => {
                        if (!result.isUpdated) {
                            return data.users.rateBook(result.rating)
                                .then(rating => data.books.addRatingToBook(rating))
                        } else {
                            return data.books.updateTotalRatingOfBook(receivedRating.book);
                        }
                    })
                    .then(result => {
                        res.status(201)
                            .json(result);
                    })
                    .catch(error => {
                        res.status(500)
                            .json({ message: 'Something went wrong!' })
                    })
            }

            return res;
        },
        markBook: (req, res) => {
            const status = req.body;
            if (!status.user) {
                res.status(400)
                    .json({ message: "You should provide id of user." });
            } else if (!status.book) {
                res.status(400)
                    .json({ message: "You should provide id of book." });
            } else if (!status.name) {
                res.status(400)
                    .json({ message: "You should type of status." });
            } else {
                data.statuses.postOrUpdateStatus(status)
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
                        res.status(500)
                            .json({ message: 'Something went wrong!' })
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
                    res.status(500)
                        .json({ message: 'Something went wrong!' })
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
                    res.status(500)
                        .json({ message: 'Something went wrong!' })
                });

            return res;
        },
        getAllBooks: (req, res) => {
            const page = req.query.page;

            data.books.getAllBooks(page)
                .then(result => {
                    res.status(200)
                        .json(result);
                })
                .catch(error => {
                    res.status(500)
                        .json({ message: 'Something went wrong!' })
                });

            return res;
        },
        addBook: (req, res) => {
            if (req.user.role !== 'Admin') {
                res.status(403)
                    .json({ message: "Only Administrator can add new book." });
            } else {
                const book = req.body;

                req.checkBody('title', 'Title is required.').notEmpty();
                req.checkBody(['authorFirstName', 'authorLastName'], 'Author name is required.').notEmpty();
                req.checkBody('photo', 'Photo is required.').notEmpty();

                const errors = req.validationErrors();

                if (errors) {
                    res.status(400)
                        .json(errors);
                } else {
                    data.authors.getOrAddAuthorByName(book.authorFirstName, book.authorLastName)
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
                            res.status(500)
                                .json({ message: 'Something went wrong!' })
                        });
                }
            }

            return res;
        },
        editBook: (req, res) => {
            if (req.user.role !== 'Admin') {
                res.status(403)
                    .json({ message: "Only Administrator can edit book." });
            } else {
                const book = req.body;
                req.checkBody('title', 'Title is required.').notEmpty();
                req.checkBody(['authorFirstName', 'authorLastName'], 'Author name is required.').notEmpty();
                req.checkBody('photo', 'Photo is required.').notEmpty();

                const errors = req.validationErrors();

                if (errors) {
                    res.status(400)
                        .json(errors);
                } else {
                    const genres = book.genres.split(', ');
                    data.books.updateBook(book.id, book.title, book.isbn, book.publisher,
                        book.photo, book.language, book.summary, genres)
                        .then(updatedBook => {
                            res.status(201)
                                .json({ book: updatedBook });
                        })
                        .catch(error => {
                            res.status(500)
                                .json({ message: 'Something went wrong!' })
                        });
                }
            }

            return res;
        },
        deleteBook(req, res) {
            if (req.user.role !== 'Admin') {
                res.status(403)
                    .json({ message: "Only Administrator can delete book." });
            } else {
                const bookId = req.params.id;
                data.books.deleteBook(bookId)
                    .then(() => {
                        res.status(200)
                            .json("Removed");
                    })
                    .catch(error => {
                        res.status(500)
                            .json({ message: 'Something went wrong!' })
                    });
            }

            return res;
        }
    }
}