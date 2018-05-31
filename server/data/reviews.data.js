const { Review } = require('../models');
const getPageOfCollection = require('../utils/pagination');
const itemsPerPage = 8;

module.exports = class ReviewsData {
    getReviews(id, page) {
        return new Promise((resolve, reject) => {
            Review.find({ 'user': id })
                .populate('book')
                .exec((err, reviews) => {
                    if (err) {
                        return reject(err);
                    } else {
                        const reviewsOnPage = getPageOfCollection(reviews, page, itemsPerPage);

                        let result = {
                            reviews: reviewsOnPage,
                            reviewsCount: reviews.length
                        };

                        return resolve(result);
                    }
                });
        });
    }

    getAllReviewsOfUser(userId) {
        return new Promise((resolve, reject) => {
            Review.find({ 'user': userId })
                .exec((err, reviews) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(reviews);
                    }
                });
        });
    }

    deleteReview(id) {
        return new Promise((resolve, reject) => {
            Review.remove({ '_id': id }, (err) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve();
                }
            });
        });
    }

    createReview(receivedReview, userId, bookId) {
        return new Promise((resolve, reject) => {
            const review = new Review(receivedReview);
            review.user = userId;
            review.book = bookId;

            review.save((err, createdReview) => {
                if (err) {
                    return reject(err);
                } else {
                    return this.getReviewById(createdReview._id)
                        .then((populatedReview) => resolve(populatedReview))
                        .catch(err => reject(err));
                }
            });
        });
    }

    getReviewById(id) {
        return new Promise((resolve, reject) => {
            Review.findById(id)
                .populate({ path: 'user', select: 'username photo' })
                .populate({ path: 'book', select: 'title' })
                .exec((err, review) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(review);
                    }
                });
        });
    }
}