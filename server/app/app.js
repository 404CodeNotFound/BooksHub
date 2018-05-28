/* globals __dirname */
const express = require('express');
const passport = require('passport');
var cors = require('cors');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const path = require('path');
const auth = require('../config/auth.config');
const errors = require('../utils/error.constants');

const init = (data) => {
    const app = express();
    const server = require('http').Server(app);
    const validator = require('express-validator');

    // Controllers
    const usersController = require('./controllers/users.controller')(data);
    const requestsController = require('./controllers/requests.controller')(data);
    const booksController = require('./controllers/books.controller')(data); 
    const eventsController = require('./controllers/events.controller')(data); 
    const genresController = require('./controllers/genres.controller')(data);
    const authorsController = require('./controllers/authors.controller')(data);   
    
    app.use('/libs', express.static('node_modules'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(expressValidator());
    app.use(cors());
    app.use(validator());
    
    auth.init(app, data, passport);

    app.use((req, res, next) => {
        res.locals.user = req.user;
        next();
    });

    app.use(require('connect-flash')());
    app.use((req, res, next) => {
        res.locals.messages = require('express-messages')(req, res);
        next();
    });

    app.post('/login', usersController.login);
    app.post('/register', usersController.register);

    // Users
    app.get('/users', auth.authenticate(passport), usersController.getAllUsers);
    app.put('/users/:id/role', auth.authenticate(passport), usersController.changeRole);
    app.delete('/users/:id', auth.authenticate(passport), usersController.deleteUser);
    
    // User Profile Sections
    app.get('/users/:username', usersController.getUserProfile);
    app.put('/users/:username', auth.authenticate(passport), usersController.updateUserProfile);

    // Book collections of User
    app.get('/users/:id/reading', usersController.getReadingBooks);
    app.get('/users/:id/wishlist', usersController.getWishlist);
    app.get('/users/:id/read', usersController.getReadBooks);
    app.get('/users/:id/recommended', usersController.getRecommendedBooks);        

    // Friends of User
    app.get('/users/:id/friends', usersController.getUserFriends);

    // Comments of User
    app.get('/users/:id/comments', usersController.getUserComments); 
    app.delete('/users/:userId/comments/:commentId', auth.authenticate(passport), usersController.deleteComment);  
    
    // Reviews of User
    app.get('/users/:id/reviews', usersController.getUserReviews);
    app.delete('/users/:userId/reviews/:reviewId', auth.authenticate(passport), usersController.deleteReview);

    // Events of User
    app.get('/users/:id/events', usersController.getUserEvents);                                                  
    app.get('/users/:id/joinedevents', usersController.getJoinedEvents);                  
    
    // Requests of User
    app.get('/users/:id/requests', auth.authenticate(passport), requestsController.getPendingUserRequests);
    app.post('/users/:id/requests', auth.authenticate(passport), requestsController.sendRequest);
    app.put('/requests/:id', auth.authenticate(passport), requestsController.acceptRequest);            
    app.delete('/requests/:id', auth.authenticate(passport), requestsController.declineRequest);            
                
    // Books
    app.get('/books', auth.authenticate(passport), booksController.getAllBooks);
    app.post('/books', auth.authenticate(passport), booksController.addBook);            
    app.get('/books/:id', booksController.getBook);
    app.put('/books/:id', auth.authenticate(passport), booksController.editBook);
    app.delete('/books/:id', auth.authenticate(passport), booksController.deleteBook);            
    app.post('/books/:id/reviews', auth.authenticate(passport), booksController.addReview);
    app.put('/books/:id/rating', auth.authenticate(passport), booksController.rateBook);
    app.put('/books/:id/statuses', auth.authenticate(passport), booksController.markBook);
    
    app.get('/recommendedbooks', auth.authenticate(passport), booksController.getRecommendedBooks);
    app.get('/latestbooks', booksController.getLatestBooks);      
    
    // Events
    app.get('/events', auth.authenticate(passport), eventsController.getAllEvents);
    app.post('/events', auth.authenticate(passport), eventsController.addEvent);            
    app.put('/events/:id', auth.authenticate(passport), eventsController.editEvent);
    app.delete('/events/:id', auth.authenticate(passport), eventsController.deleteEvent);
    app.post('/events/:id/comments', auth.authenticate(passport), eventsController.addComment);            
    
    app.get('/recommendedevents', auth.authenticate(passport), eventsController.getRecommendedEvents);
    app.get('/latestevents', eventsController.getLatestEvents);

    app.get('/events/:id', eventsController.getEvent);
    app.put('/events/:id/join', auth.authenticate(passport), eventsController.addParticipant);
    
    // Genres
    app.get('/genres', auth.authenticate(passport), genresController.getAllGenres);
    app.post('/genres', auth.authenticate(passport), genresController.addGenre);   
    app.delete('/genres/:id', auth.authenticate(passport), genresController.deleteGenre);
       
    // Authors
    app.get('/authors', auth.authenticate(passport), authorsController.getAllAuthors);
    app.post('/authors', auth.authenticate(passport), authorsController.addAuthor);
    app.get('/authors/:id', authorsController.getAuthor);
    app.put('/authors/:id', auth.authenticate(passport), authorsController.updateAuthor);
    app.delete('/authors/:id', auth.authenticate(passport), authorsController.deleteAuthor);            

    return Promise.resolve(server);
};

module.exports = {
    init,
};