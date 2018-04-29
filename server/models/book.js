module.exports = function init(mongoose) {
    const Schema = mongoose.Schema;

    const BookSchema = new Schema({
        title: {
            type: String,
            required: [true, "Book title must be provided."],
            min: [2, "Book title must be at least 2 characters long."],
            max: [60, "Book title cannot be more than 60 characters long."],
            unique: true
        },
        date_published: {
            type: Date,
            required: [true, "Book publish date must be provided."]
        },
        isbn: {
            type: String,
            required: [true, "Book ISBN must be provided."],
            max: [13, "Book ISBN cannot be more than 13 characters long."],
            unique: true
        },
        author: {
            type: Schema.ObjectId,
            ref: 'Author',
            required: [true, "Book Author is required."]
        },
        summary: String,
        rating: {
            type: Number,
            max: 5
        },
        photo: {
            type: String,
            default: "https://thecliparts.com/wp-content/uploads/2016/12/dark-blue-book-cover-clipart.png"
        },
        language: String,
        publisher: String,
        genres: [{
            type: Schema.ObjectId,
            ref: 'Genre'
        }],
        reviews: [{
            type: Schema.ObjectId,
            ref: 'Review'
        }],
        ratings: [{
            type: Schema.ObjectId,
            ref: 'Rating'
        }]
    });

    const Book = mongoose.model('Book', BookSchema);
    return Book;
}