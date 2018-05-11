module.exports = function init(mongoose) {
    const Schema = mongoose.Schema;

    const GenreSchema = new Schema({
        name: {
            type: String,
            min: [3, "Genre name must be at least 3 characters long."],
            max: [30, "Genre name must be less than 30 characters long."],
            required: [true, "Genre name must be provided."],
            unique: true
        },
        books: [{
            type: Schema.ObjectId,
            ref: 'Book'
        }]
    });

    const Genre = mongoose.model('Genre', GenreSchema);
    return Genre;
}