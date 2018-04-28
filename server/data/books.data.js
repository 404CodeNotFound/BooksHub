const { Book } = require('../models')

module.exports = class BooksData {
    getBookByTitle(title) {
        return new Promise((resolve, reject) => {
            return Book.findOne({ 'title': title })
                .populate('genres')
                .populate('author')
                .populate('reviews')
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