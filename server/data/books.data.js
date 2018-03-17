const { Book } = require('../models/book')
module.exports = class BooksData {
    getBookByTitle(title) {
        return Book.findOne({ 'title': title }, (err, res) => {
            return res;
        });
    }
}