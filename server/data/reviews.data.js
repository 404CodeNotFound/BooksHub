const { Review } = require('../models');

module.exports = class ReviewsData {
    getReviews(id) {
        return new Promise((resolve, reject) => {
            Review.find({ 'user': id })
                .populate('book')
                .exec((err, reviews) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(reviews);
                    }
                });
        });
    }
}