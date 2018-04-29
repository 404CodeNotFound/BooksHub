const { Book } = require('../models')

module.exports = class BooksData {
    getBookByTitle(title) {
        return new Promise((resolve, reject) => {
            return Book.findOne({ 'title': title })
                .populate({ path: 'genres', select: 'name' })
                .populate({ path: 'author', select: 'first_name last_name' })
                .populate({ path: 'reviews', populate: { path: 'user' , select: 'username photo'}})
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
}