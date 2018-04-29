const BooksData = require('./books.data');
const UsersData = require('./users.data');
const RequestsData = require('./requests.data');
const CommentsData = require('./comments.data');    
const ReviewsData = require('./reviews.data');
const EventsData = require('./events.data');
const RatingsData = require('./ratings.data');
const StatusesData = require('./statuses.data');

const init = () => {
    return Promise.resolve({
        books: new BooksData(),
        users: new UsersData(),    
        requests: new RequestsData(),
        comments: new CommentsData(),
        reviews: new ReviewsData(),
        events: new EventsData(),
        ratings: new RatingsData(),
        statuses: new StatusesData()
    });
};

module.exports = {
    init,
};