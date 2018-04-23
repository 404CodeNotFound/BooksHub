const mongoose = require('mongoose');
const initReview = require('./review');
const initUser = require('./user');
const initStatus = require('./status');
const initRequest = require('./request');

const initRating = require('./rating');
const initGenre = require('./genre');
const initEvent = require('./event');
const initComment = require('./comment');
const initBook = require('./book');
const initAuthor = require('./author');

module.exports = {
    User: initUser(mongoose),
    Status: initStatus(mongoose),
    Review: initReview(mongoose),
    Request: initRequest(mongoose),
    Rating: initRating(mongoose),
    Genre: initGenre(mongoose),
    Event: initEvent(mongoose),
    Comment: initComment(mongoose),
    Book: initBook(mongoose),
    Author: initAuthor(mongoose)
};