const { Review } = require('../models');
const getPageOfCollection = require('../utils/pagination');
const itemsPerPage = 1;

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
}