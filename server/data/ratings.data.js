const { Rating } = require('../models');

module.exports = class RatingsData {
    postOrUpdateRating(userId, bookId, receivedRating) {
        return this.findRatingByBookAndUser(bookId, userId)
            .then(foundRating => {
                if (foundRating) {
                    return this.updateRating(foundRating, receivedRating.stars);
                } else {
                    return this.createRating(userId, bookId, receivedRating);
                }
            })
            .catch(err => reject(err));
    }

    createRating(userId, bookId, receivedRating) {
        return new Promise((resolve, reject) => {
            const rating = new Rating(receivedRating);
            rating.user = userId;
            rating.book = bookId;
            
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