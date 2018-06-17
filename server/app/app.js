/* globals __dirname */
const express = require('express');
const passport = require('passport');
var cors = require('cors');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const auth = require('../config/auth.config');
const path = require('path');

const init = (data) => {
    const app = express();
    const server = require('http').Server(app);

    // Controllers
    const usersController = require('./controllers/users.controller')(data);
    const requestsController = require('./controllers/requests.controller')(data);
    const booksController = require('./controllers/books.controller')(data);
    const eventsController = require('./controllers/events.controller')(data);
    const genresController = require('./controllers/genres.controller')(data);
    const authorsController = require('./controllers/authors.controller')(data);
    const informationController = require('./controllers/information.controller')(data);

    app.use('/libs', express.static('node_modules'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());
    app.use(validator());

    auth.init(app, data, passport);

    app.use((req, res, next) => {
        res.locals.user = req.user;
        next();
    });

    app.use(express.static(path.join(__dirname, '../../client/public')));

    app.post('/api/login', usersController.login);
    app.post('/api/register', usersController.register);
    app.get('/api/info', informationController.getInfo);

    // Users
    app.get('/api/users', auth.authenticate(passport), usersController.getAllUsers);
    app.get('/api/users/search', usersController.searchUsers);
    app.put('/api/users/:id/role', auth.authenticate(passport), usersController.changeRole);
    app.delete('/users/:id', auth.authenticate(passport), usersController.deleteUser);

    // User Profile Sections
    app.get('/api/users/:username', usersController.getUserProfile);
    app.put('/api/users/:username', auth.authenticate(passport), usersController.updateUserProfile);

    // Book collections of User
    app.get('/api/users/:id/reading', usersController.getReadingBooks);
    app.get('/api/users/:id/wishlist', usersController.getWishlist);
    app.get('/api/users/:id/read', usersController.getReadBooks);
    app.get('/api/users/:id/recommended', usersController.getRecommendedBooks);

    app.put('/api/users/:userId/recommend/:bookId', auth.authenticate(passport), usersController.recommendBook);

    // Friends of User
    app.get('/api/users/:id/friends', usersController.getUserFriends);

    // Comments of User
    app.get('/api/users/:id/comments', usersController.getUserComments);
    app.delete('/api/users/:userId/comments/:commentId', auth.authenticate(passport), usersController.deleteComment);

    // Reviews of User
    app.get('/api/users/:id/reviews', usersController.getUserReviews);
    app.delete('/api/users/:userId/reviews/:reviewId', auth.authenticate(passport), usersController.deleteReview);

    // Events of User
    app.get('/api/users/:id/events', usersController.getUserEvents);
    app.get('/api/users/:id/joinedevents', usersController.getJoinedEvents);

    // Requests of User
    app.get('/api/users/:id/requests', auth.authenticate(passport), requestsController.getPendingUserRequests);
    app.post('/api/users/:id/requests', auth.authenticate(passport), requestsController.sendRequest);
    app.put('/api/requests/:id', auth.authenticate(passport), requestsController.acceptRequest);
    app.delete('/api/requests/:id', auth.authenticate(passport), requestsController.declineRequest);

    // Books
    app.get('/api/books', auth.authenticate(passport), booksController.getAllBooks);
    app.post('/api/books', auth.authenticate(passport), booksController.addBook);
    app.get('/api/books/search', booksController.searchBooks);
    app.get('/api/books/:id', booksController.getBook);
    app.put('/api/books/:id', auth.authenticate(passport), booksController.editBook);
    app.delete('/api/books/:id', auth.authenticate(passport), booksController.deleteBook);
    app.post('/api/books/:id/reviews', auth.authenticate(passport), booksController.addReview);
    app.put('/api/books/:id/rating', auth.authenticate(passport), booksController.rateBook);
    app.put('/api/books/:id/statuses', auth.authenticate(passport), booksController.markBook);
    app.get('/api/recommendedbooks', auth.authenticate(passport), booksController.getRecommendedBooks);
    app.get('/api/latestbooks', booksController.getLatestBooks);

    // Events
    app.get('/api/events', auth.authenticate(passport), eventsController.getAllEvents);
    app.post('/api/events', auth.authenticate(passport), eventsController.addEvent);
    app.get('/api/events/search', eventsController.searchEvents);
    app.get('/api/events/:id', eventsController.getEvent);
    app.put('/api/events/:id', auth.authenticate(passport), eventsController.editEvent);
    app.delete('/api/events/:id', auth.authenticate(passport), eventsController.deleteEvent);
    app.put('/api/events/:id/join', auth.authenticate(passport), eventsController.addParticipant);
    app.post('/api/events/:id/comments', auth.authenticate(passport), eventsController.addComment);

    app.get('/api/recommendedevents', auth.authenticate(passport), eventsController.getRecommendedEvents);
    app.get('/api/latestevents', eventsController.getLatestEvents);

    // Genres
    app.get('/api/genres', genresController.getAllGenres);
    app.post('/api/genres', auth.authenticate(passport), genresController.addGenre);
    app.delete('/api/genres/:id', auth.authenticate(passport), genresController.deleteGenre);

    // Authors
    app.get('/api/authors', auth.authenticate(passport), authorsController.getAllAuthors);
    app.post('/api/authors', auth.authenticate(passport), authorsController.addAuthor);
    app.get('/api/authors/:id', authorsController.getAuthor);
    app.put('/api/authors/:id', auth.authenticate(passport), authorsController.updateAuthor);
    app.delete('/api/authors/:id', auth.authenticate(passport), authorsController.deleteAuthor);

    app.get('*', function (req, res) {
        const filePath = path.resolve(__dirname, '../../client/public/index.html');
        res.sendFile(filePath);
    });

    return Promise.resolve(server);
};

module.exports = {
    init,
};