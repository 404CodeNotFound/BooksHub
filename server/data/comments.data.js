const { Comment } = require('../models');
const getPageOfCollection = require('../utils/pagination');
const itemsPerPage = 1;

module.exports = class CommentsData {
    getComments(id, page) {
        return new Promise((resolve, reject) => {
            Comment.find({ 'user': id })
                .populate('event')
                .exec((err, comments) => {
                    if (err) {
                        return reject(err);
                    } else {
                        const commentsOnPage = getPageOfCollection(comments, page, itemsPerPage);

                        let result = {
                            comments: commentsOnPage,
                            commentsCount: comments.length
                        };
                        
                        return resolve(result);
                    }
                });
        });
    }

    createComment(comment, userId, eventId) {
        return new Promise((resolve, reject) => {
            const newComment = new Comment();
            newComment.content = comment.content;
            newComment.posted_on = comment.posted_on;
            newComment.user = userId;
            newComment.event = eventId;

            newComment.save((err, createdComment) => {
                if (err) {
                    return reject(err);
                } else {
                    console.log(this.createdComment);
                    return resolve(createdComment);
                }
            });
        });
    }

    deleteComment(id) {
        return new Promise((resolve, reject) => {
            Comment.remove({ '_id': id }, (err) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve();
                }
            });
        });
    }
}