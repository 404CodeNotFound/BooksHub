const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    book: {
        type: Schema.ObjectId,
        ref: 'Book'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    stars: {
        type: Number,
        min: [1, "Rating must be at least 1 stars."],
        max: [5, "Rating cannot be more than 5 stars."],
        required: true
    },
    rated_on: Date
  });
  
const Rating = mongoose.model('Rating', RatingSchema);

module.exports = {
    Rating
};