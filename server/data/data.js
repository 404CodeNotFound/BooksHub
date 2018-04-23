const BooksData = require('./books.data');
const StatusesData = require('./statuses.data');
const UsersData = require('./users.data');
const RequestsData = require('./requests.data');

const init = () => {
    return Promise.resolve({
        books: new BooksData(),
        users: new UsersData(),
        statuses: new StatusesData(),        
        requests: new RequestsData()
    });
};

module.exports = {
    init,
};