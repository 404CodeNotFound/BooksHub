const { Book } = require('../models')

module.exports = class BooksData {
    getBookByTitle(title) {
        return new Promise((resolve, reject) => {
            return Book.findOne({ 'title': title })
                .populate({ path: 'genres', select: 'name' })
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
                        book.ratings.push(rating);
                        book.rating = calculateRating(book.ratings);
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
}

function calculateRating(ratings) {
    let sum = 0;
    for (let i = 0; i < ratings.length; i++) {
        sum += ratings[i].stars;
    }
    const ratingsCount = ratings.length;

    return sum / ratingsCount;
}

function calculateNewRating(ratings, newRating) {
    let sum = 0;
    for (let i = 0; i < ratings.length; i++) {
        sum += ratings[i].stars;
    }

    sum += newRating.stars;
    const ratingsCount = ratings.length + 1;

    return sum / ratingsCount;
}