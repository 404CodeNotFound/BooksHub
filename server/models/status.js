const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StatusSchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: ['CurrentlyReading', 'Read', 'WantToRead' ],
        default: 'WantToRead'
    },
    book: { 
        type: Schema.ObjectId,
        ref: 'Book'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
  });
  
const Genre = mongoose.model('Genre', GenreSchema);

module.exports = {
    Genre
};