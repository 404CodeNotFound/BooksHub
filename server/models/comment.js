module.exports = function init(mongoose) {
    const Schema = mongoose.Schema;

    const CommentSchema = new Schema({
        event: {
            type: Schema.ObjectId,
            ref: 'Event'
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

    const Comment = mongoose.model('Comment', CommentSchema);
    return Comment;
}