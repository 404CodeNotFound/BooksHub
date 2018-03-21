const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    first_name: {
        type: String,
        max: [50, "Author first name cannot be more than 50 characters long."],
        required: true
    },
    last_name: {
        type: String,
        max: [50, "Author last name cannot be more than 50 characters long."],
        required: true
    },
    nationality: String,
    birth_date: Date,
    age: Number,
    biography: String,
    website: String,
    photo: {
        type: String,
        default: "https://www.haikudeck.com/static/img/hd-avatar.png"
    },
    books: [{ 
        type: Schema.ObjectId,
        ref: 'Book'
    }]
  });

AuthorSchema.index({ first_name: 1, last_name: 1 }, { unique: true });

const Author = mongoose.model('Author', AuthorSchema);

module.exports = {
    Author
};