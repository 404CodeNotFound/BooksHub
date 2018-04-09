const BooksData = require('./books.data');
const UsersData = require('./users.data')
const RequestsData = require('./requests.data');

const init = () => {
    return Promise.resolve({
        books: new BooksData(),
        users: new UsersData(),
        requests: new RequestsData()
    });
};

module.exports = {
    init,
};