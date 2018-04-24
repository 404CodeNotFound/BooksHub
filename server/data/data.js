const BooksData = require('./books.data');
const UsersData = require('./users.data');
const RequestsData = require('./requests.data');
const CommentsData = require('./comments.data');

const init = () => {
    return Promise.resolve({
        books: new BooksData(),
        users: new UsersData(),    
        requests: new RequestsData(),
        comments: new CommentsData()
    });
};

module.exports = {
    init,
};