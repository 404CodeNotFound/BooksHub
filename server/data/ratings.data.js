const { Rating } = require('../models');

module.exports = class RatingsData {
    postOrUpdateRating(receivedRating) {
        return this.findRatingByBookAndUser(receivedRating.book, receivedRating.user)
            .then(foundRating => {
                if (foundRating) {
                    console.log('found');
                    return this.updateRating(foundRating, receivedRating.stars);
                } else {
                    return this.createRating(receivedRating);
                }
            })
            .catch(err => reject(err));
    }

    createRating(receivedRating) {
        return new Promise((resolve, reject) => {
            const rating = new Rating(receivedRating);
            rating.save((err, savedRating) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve({ rating: savedRating, isUpdated: false });
                }
            });
        });
    }

    updateRating(rating, newRatingStars) {
        return new Promise((resolve, reject) => {
            rating.stars = newRatingStars;
            rating.save((err, savedRating) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve({ rating: savedRating, isUpdated: true });
                }
            });
        });
    }

    findRatingByBookAndUser(bookId, userId) {
        return new Promise((resolve, reject) => {
            Rating.findOne({ 'book': bookId, 'user': userId },
                (err, rating) => {
                    if (err) {
                        return reject(err);
                    } else if (rating) {
                        return resolve(rating);
                    } else {
                        return resolve(null);
                    }
                });
        });
    }
}