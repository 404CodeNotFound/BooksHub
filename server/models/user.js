const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        max: [40, "Username cannot be more than 40 characters long."],
        unique: true
    },
    first_name: {
        type: String,
        max: [40, "User first name cannot be more than 40 characters long."],
        required: true
    },
    last_name: {
        type: String,
        max: [40, "User last name cannot be more than 40 characters long."],
        required: true
    },
    nationality: String,
    age: Number,
    favourite_quote: String,
    photo: {
        type: String,
        default: "https://www.haikudeck.com/static/img/hd-avatar.png"
    },
    friends: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    requests: [{
        type: Schema.ObjectId,
        ref: 'Request'
    }],
    reviews: [{
        type: Schema.ObjectId,
        ref: 'Review'
    }],
    comments: [{
        type: Schema.ObjectId,
        ref: 'Comment'
    }],
    statuses: [{
        type: Schema.ObjectId,
        ref: 'Status'
    }],
    joined_events: [{
        type: Schema.ObjectId,
        ref: 'Event'
    }]
  });
  
const User = mongoose.model('User', UserSchema);

module.exports = {
    User
};