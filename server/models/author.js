module.exports = function init(mongoose) {
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
        birth_date: {
            type: Date,
            default: new Date()
        },
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
        }],
        isDeleted: {
            type: Boolean,
            default: false
        },
    });

    AuthorSchema.index({ first_name: 1, last_name: 1 }, { unique: true });

    const Author = mongoose.model('Author', AuthorSchema);
    return Author;
}