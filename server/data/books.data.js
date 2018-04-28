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
}