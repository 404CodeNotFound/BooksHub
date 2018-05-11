module.exports = function init(mongoose) {
    const Schema = mongoose.Schema;

    const ReviewSchema = new Schema({
        book: {
            type: Schema.ObjectId,
            ref: 'Book'
        },
        user: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        content: {
            type: String,
            required: true
        },
        posted_on: Date
    });

    const Review = mongoose.model('Review', ReviewSchema);
    return Review;
}