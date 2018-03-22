const BooksData = require('./books.data');
const UsersData = require('./users.data')

const init = () => {
    return Promise.resolve({
        books: new BooksData(),
        users: new UsersData()
    });
};

module.exports = {
    init,
};