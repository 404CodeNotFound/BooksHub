const { Book } = require('../models')
const getPageOfCollection = require('../utils/pagination');
const {calculateNewRating} = require('../utils/rating');
const {calculateRating} = require('../utils/rating');
const itemsPerPage = 10;

module.exports = class BooksData {
    getBookDetails(id) {
        return new Promise((resolve, reject) => {
            return Book.findOne({ '_id': id, 'isDeleted': false })
                .populate({ path: 'genres', match: { isDeleted: false }, select: 'name' })
                .populate({ path: 'author', select: 'first_name last_name' })
                .populate({ path: 'reviews', populate: { path: 'user', select: 'username photo' } })
                .populate({ path: 'ratings', select: 'user stars' })
                .populate({ path: 'statuses', select: 'user name' })
                .exec((err, book) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(book);
                    }
                });
        });
    }

    getBookById(id) {
        return new Promise((resolve, reject) => {
            return Book.findOne({ '_id': id, 'isDeleted': false })
                .populate({path: 'author', select: 'first_name last_name'})
                .exec((err, book) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(book);
                    }
                });
        });
    }

    addReviewToBook(bookId, review) {
        return new Promise((resolve, reject) => {
            Book.findById(bookId, (err, book) => {
                if (err) {
                    return reject(err);
                } else {
                    book.reviews.push(review._id);
                    book.save();
                    return resolve(review);
                }
            })
        });
    }

    addRatingToBook(rating) {
        return new Promise((resolve, reject) => {
            Book.findById(rating.book)
                .populate({ path: 'ratings', select: 'stars' })
                .exec((err, book) => {
                    if (err) {
                        return reject(err);
                    } else {
                        book.rating = calculateNewRating(book.ratings, rating);
                        book.ratings.push(rating._id);                        
                        book.save();
                        return resolve({ bookRating: book.rating });
                    }
                })
        });
    }

    markBook(status) {
        return new Promise((resolve, reject) => {
            Book.findById(status.book)
                .exec((err, book) => {
                    if (err) {
                        return reject(err);
                    } else {
                        book.statuses.push(status);
                        book.save((saveError, savedBook) => {
                            if (saveError) {
                                return reject(saveError);
                            } else {
                                return resolve({ bookStatus: status.name });
                            }
                        });
                    }
                })
        });
    }

    updateTotalRatingOfBook(bookId) {
        return new Promise((resolve, reject) => {
            Book.findById(bookId)
                .populate('ratings')
                .exec((err, book) => {
                    if (err) {
                        return reject(err);
                    } else {
                        let bookRating = 0;
                        if (book.ratings.length > 0) {
                            bookRating = calculateRating(book.ratings);
                        }

                        book.rating = bookRating;
                        book.save();
                        return resolve({ bookRating: bookRating });
                    }
                })
        });
    }

    getLatestBooks() {
        return new Promise((resolve, reject) => {
            Book.find({ 'isDeleted': false })
                .populate({ path: 'author', select: 'first_name last_name' })
                .sort({ 'date_published': '-1' })
                .limit(4)
                .exec((err, books) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(books);
                    }
                })
        });
    }

    getAllBooks(page) {
        return new Promise((resolve, reject) => {
            Book.find({ 'isDeleted': false })
                .populate({ path: 'author', select: 'first_name last_name' })
                .populate({ path: 'genres', select: 'name' })
                .sort({ 'date_published': '-1' })
                .exec((err, books) => {
                    if (err) {
                        return reject(err);
                    } else {
                        const booksOnPage = getPageOfCollection(books, page, itemsPerPage);

                        let result = {
                            books: booksOnPage,
                            booksCount: books.length
                        };

                        return resolve(result);
                    }
                })
        });
    }

    createBook(title, authorId, isbn, publisher, photo, language, summary, genres) {
        return new Promise((resolve, reject) => {
            let book = new Book();
            book.title = title;
            book.author = authorId;
            book.date_published = new Date();
            book.isbn = isbn;
            book.publisher = publisher;
            book.photo = photo;
            book.language = language;
            book.summary = summary;
            book.genres = genres;
            book.save((err, createdBook) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(this.getBookById(createdBook._id));
                }
            })
        });
    }

    updateBook(bookId, title, isbn, publisher, photo, language, summary, genres) {
        return new Promise((resolve, reject) => {
            Book.findOneAndUpdate({ _id: bookId }, {
                $set: {
                    title: title,
                    isbn: isbn,
                    publisher: publisher,
                    photo: photo,
                    language: language,
                    summary: summary,
                    genres: genres
                }
            },
                { new: true })
                .populate({ path: 'genres', select: 'name' })
                .exec((err, savedBook) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(savedBook);
                    }
                });
        });
    }

    deleteBook(bookId) {
        return new Promise((resolve, reject) => {
            Book.findOneAndUpdate({ '_id': bookId }, {
                $set: {
                    isDeleted: true
                }
            },
                { new: true }, (err, book) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve();
                    }
                });
        });
    }

    getBooksByGenres(genres) {
        return new Promise((resolve, reject) => {
            Book.find({ 'isDeleted': false, genres: { $in: genres }})
                .sort({ 'start_date': '1' })
                .limit(4)
                .populate({ path: 'genres', select: 'name' })
                .populate({ path: 'author', select: 'frist_name last_name' })
                .exec((err, books) => {
                    if (err) {
                        return reject(err);
                    } else {
                        const recommendedBooks = getRandomRecommendedBooks(books);
                        return resolve(recommendedBooks);
                    }
                })
        });
    }

    searchBooksByTitle(searchValue) {
        return new Promise((resolve, reject) => {
            Book.find({ "title": { "$regex": searchValue, "$options": "i" }, 'isDeleted': false })
                .select('title photo genres author date_published')
                .populate({ path: 'author', select: 'first_name last_name' })
                .populate({ path: 'genres', select: 'name' })
                .exec((err, books) => {
                    if (err) {
                        return reject(err);
                    }

                    // const pageEvents = getPageOfCollection(events, page, itemsPerPageAdmin);
                    const data = {
                        books: books,
                        booksCount: books.length
                    };

                    return resolve(data);
                });
        });
    }

    searchBooksBySummary(keywords) {
        return new Promise((resolve, reject) => {
            Book.find({'isDeleted': false })
                .select('title photo genres author date_published summary')
                .populate({ path: 'author', select: 'first_name last_name' })
                .populate({ path: 'genres', select: 'name' })
                .exec((err, books) => {
                    if (err) {
                        return reject(err);
                    }

                    // const pageEvents = getPageOfCollection(events, page, itemsPerPageAdmin);
                    
                    const filteredBooks = books.filter(book => {
                        return containsKeywords(book.summary, keywords);
                    });

                    console.log(filteredBooks);

                    const data = {
                        books: filteredBooks,
                        booksCount: books.length
                    };

                    return resolve(data);
                });
        });
    }
}

function containsKeywords(text, keywords) {
    for (let i=0; i < keywords.length; i++) {
        if (!text.toLowerCase().includes(keywords[i].toLowerCase())) {
            return false;
        }
    }

    return true;
}

function getRandomRecommendedBooks(books) {
    const count = 4;
    const shuffled = books.sort(() => .5 - Math.random());
    let selected = shuffled.slice(0, count);

    return selected;
}