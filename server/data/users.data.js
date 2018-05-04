const { User, Status } = require('../models');
const getPageOfCollection = require('../utils/pagination');
const itemsPerPage = 18;

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

    createUser(newUser) {
        return new Promise((resolve, reject) => {
            const user = new User(newUser);
            user.save((err, createdUser) => {
                if(err) {
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
                    // birth_date: new Date(user.birthdate),
                    // languages: languages,
                    favourite_quote: user.quote
                }
            }, 
            { new: true }, 
            (error, updatedUser) => {
                if(error) {
                    return reject(error);
                }

                return resolve(updatedUser);
            });
        });
    }
}