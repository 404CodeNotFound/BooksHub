const BooksData = require('./books.data');

const init = () => {
    return Promise.resolve({
        books: new BooksData()
    });
};

module.exports = {
    init,
};