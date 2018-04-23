module.exports = function init(mongoose) {
    const Schema = mongoose.Schema;

    const RequestSchema = new Schema({
        sender: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        receiver: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        sent_date: Date,
    });

    const Request = mongoose.model('Request', RequestSchema);
    return Request;
}