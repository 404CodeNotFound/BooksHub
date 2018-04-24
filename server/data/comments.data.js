const { Comment } = require('../models');

module.exports = class CommentsData {
    getComments(id) {
        return new Promise((resolve, reject) => {
            Comment.find({ 'user': id })
                .populate('event')
                .exec((err, comments) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(comments);
                    }
                });
        });
    }
}