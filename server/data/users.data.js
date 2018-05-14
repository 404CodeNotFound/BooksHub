const { User, Status } = require('../models');
const getPageOfCollection = require('../utils/pagination');
const itemsPerPage = 10;

module.exports = class UserData {
    getUserByUsernameAndPassword(username, passHash) {
        return new Promise((resolve, reject) => {
            User.findOne({ 'username': username, 'passHash': passHash },
                (err, user) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(user);
                    }
                });
        });
    }

    getUserById(id) {
        return new Promise((resolve, reject) => {
            User.findById(id, (err, user) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(user);
                }
            });
        });
    }

    getUserByUsername(username) {
        return new Promise((resolve, reject) => {
            User.findOne({ 'username': username })
                .exec((err, user) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(user);
                    }
                });
        });
    }

    getUserProfile(username) {
        return new Promise((resolve, reject) => {
            User.findOne({ 'username': username })
                .populate('requests')
                .populate('favourite_genres')
                .exec((err, user) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(user);
                    }
                });
        });
    }

    getReadingBooks(id, page) {
        return new Promise((resolve, reject) => {
            Status.find({ 'user': id, 'name': 'CurentlyReading' })
                .populate('book')
                .exec((err, statuses) => {
                    if (err) {
                        return reject(err);
                    } else {
                        const books = statuses.map(status => status.book);
                        const booksOnPage = getPageOfCollection(books, page, itemsPerPage);

                        let result = {
                            books: booksOnPage,
                            booksCount: books.length
                        };

                        return resolve(result);
                    }
                });
        });
    }

    getWishlist(id, page) {
        return new Promise((resolve, reject) => {
            Status.find({ 'user': id, 'name': 'WantToRead' })
                .populate('book')
                .exec((err, statuses) => {
                    if (err) {
                        return reject(err);
                    } else {
                        const books = statuses.map(status => status.book);
                        const booksOnPage = getPageOfCollection(books, page, itemsPerPage);

                        let result = {
                            books: booksOnPage,
                            booksCount: books.length
                        };

                        return resolve(result);
                    }
                });
        });
    }

    getReadBooks(id, page) {
        return new Promise((resolve, reject) => {
            Status.find({ 'user': id, 'name': 'Read' })
                .populate('book')
                .exec((err, statuses) => {
                    if (err) {
                        return reject(err);
                    } else {
                        const books = statuses.map(status => status.book);
                        const booksOnPage = getPageOfCollection(books, page, itemsPerPage);

                        let result = {
                            books: booksOnPage,
                            booksCount: books.length
                        };

                        return resolve(result);
                    }
                });
        });
    }

    getRecommendedBooks(id, page) {
        return new Promise((resolve, reject) => {
            User.findById(id)
                .populate({ path: 'recommended_books', select: 'title photo summary', populate: { path: 'author', select: 'first_name last_name' } })
                .exec((err, user) => {
                    if (err) {
                        return reject(err);
                    } else {
                        const books = user.recommended_books;
                        const booksOnPage = getPageOfCollection(books, page, itemsPerPage);

                        let result = {
                            books: booksOnPage,
                            booksCount: books.length
                        };

                        return resolve(result);
                    }
                });
        });
    }

    getUserFriends(id, page) {
        return new Promise((resolve, reject) => {
            User.findById(id)
                .populate('friends')
                .exec((err, user) => {
                    if (err) {
                        return reject(err);
                    } else {
                        const friendsOnPage = getPageOfCollection(user.friends, page, itemsPerPage);

                        let result = {
                            friends: friendsOnPage,
                            friendsCount: user.friends.length
                        };

                        return resolve(result);
                    }
                });
        });
    }

    getJoinedEvents(id, page) {
        return new Promise((resolve, reject) => {
            User.findById(id)
                .populate({
                    path: 'joined_events',
                    populate: { path: 'creator' }
                })
                .exec((err, user) => {
                    if (err) {
                        return reject(err);
                    } else {
                        const eventsOnPage = getPageOfCollection(user.joined_events, page, itemsPerPage);

                        let result = {
                            events: eventsOnPage,
                            eventsCount: user.joined_events.length
                        };

                        return resolve(result);
                    }
                });
        });
    }

    addRequest(receiverId, requestId) {
        return new Promise((resolve, reject) => {
            User.findById(receiverId, (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    user.requests.push(requestId);
                    user.save();
                    resolve(user);
                }
            })
        });
    }

    deleteRequest(userId, requestId) {
        return new Promise((resolve, reject) => {
            User.findById(userId, (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    const index = user.requests.indexOf(requestId);
                    user.requests.splice(index, 1);
                    user.save();
                    resolve();
                }
            })
        });
    }

    connectUsers(receiverId, senderId) {
        return new Promise((resolve, reject) => {
            return this.addFriend(receiverId, senderId)
                .then(() => this.addFriend(senderId, receiverId))
                .then(() => resolve())
                .catch(err => reject(err));
        });
    }

    addFriend(userId, newFriendId) {
        return new Promise((resolve, reject) => {
            User.findById(userId, (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    user.friends.push(newFriendId);
                    user.save();
                    resolve();
                }
            })
        });
    }

    deleteReview(userId, reviewId) {
        return new Promise((resolve, reject) => {
            User.findById(userId, (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    const index = user.reviews.indexOf(reviewId);
                    user.reviews.splice(index, 1);
                    user.save();
                    resolve();
                }
            })
        });
    }

    deleteComment(userId, commentId) {
        return new Promise((resolve, reject) => {
            User.findById(userId, (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    const index = user.comments.indexOf(commentId);
                    user.comments.splice(index, 1);
                    user.save();
                    resolve();
                }
            })
        });
    }

    addReviewToUser(userId, review) {
        return new Promise((resolve, reject) => {
            User.findById(userId, (err, user) => {
                if (err) {
                    return reject(err);
                } else {
                    user.reviews.push(review._id);
                    user.save();
                    return resolve(review);
                }
            })
        });
    }

    rateBook(rating) {
        return new Promise((resolve, reject) => {
            User.findById(rating.user, (err, user) => {
                if (err) {
                    return reject(err);
                } else {
                    user.ratings.push(rating._id);
                    user.save((error, savedUser) => {
                        if (error) {
                            return reject(error);
                        } else {
                            return resolve(rating);
                        }
                    });
                }
            })
        });
    }

    markBook(status) {
        return new Promise((resolve, reject) => {
            User.findById(status.user, (err, user) => {
                if (err) {
                    return reject(err);
                } else {
                    user.statuses.push(status._id);
                    user.save((error, savedUser) => {
                        if (error) {
                            return reject(error);
                        } else {
                            return resolve(status);
                        }
                    });
                }
            })
        });
    }

    getFavouriteGenres(userId) {
        return new Promise((resolve, reject) => {
            User.findById(userId,
                (err, user) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(user.favourite_genres);
                    }
                });
        });
    }

    createUser(newUser) {
        return new Promise((resolve, reject) => {
            const user = new User(newUser);
            user.save((err, createdUser) => {
                if (err) {
                    return reject(err);
                } else {
                    return this.getUserById(createdUser._id)
                        .then(foundUser => resolve(foundUser))
                        .catch(err => reject(err));
                }
            });
        });
    }

    updateUser(user) {
        return new Promise((resolve, reject) => {
            User.findOneAndUpdate({ username: user.username }, {
                $set: {
                    first_name: user.firstname,
                    last_name: user.lastname,
                    email: user.email,
                    nationality: user.nationality,
                    age: user.age,
                    gender: user.gender,
                    birth_date: user.birthdate,
                    languages: user.languages.split(', '),
                    favourite_quote: user.favouriteQuote,
                    favourite_genres: user.genres.split(', '),
                }
            }, { new: true })
            .populate('favourite_genres')
            .exec(function(error, updatedUser) {
                if (error) {
                    return reject(error);
                }

                return resolve(updatedUser);
            });
        });
    }

    changeRole(userId, currentRole) {
        const newRole = currentRole === "Admin" ? "User" : "Admin";

        return new Promise((resolve, reject) => {
            User.findOneAndUpdate({ _id: userId }, {
                $set: {
                    role: newRole,
                }
            }, { new: true })
            .exec(function(error, updatedUser) {
                if (error) {
                    return reject(error);
                }

                return resolve(updatedUser);
            });
        });
    }

    getAllUsers(page) {
        return new Promise((resolve, reject) => {
            User.find({ 'isDeleted': false })
                .exec((err, users) => {
                    if (err) {
                        return reject(err);
                    }

                    const pageUsers = getPageOfCollection(users, page, itemsPerPage);

                    const data = {
                        users: pageUsers,
                        usersCount: users.length
                    };

                    return resolve(data);
                });
        });
    }
}