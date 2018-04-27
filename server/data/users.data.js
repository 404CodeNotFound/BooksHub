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

    getReadingBooks(id) {
        return new Promise((resolve, reject) => {
            Status.find({ 'user': id, 'name': 'CurentlyReading' })
                .populate('book')
                .exec((err, statuses) => {
                    if (err) {
                        return reject(err);
                    } else {
                        const books = statuses.map(status => status.book);
                        return resolve(books);
                    }
                });
        });
    }

    getWishlist(id) {
        return new Promise((resolve, reject) => {
            Status.find({ 'user': id, 'name': 'WantToRead' })
                .populate('book')
                .exec((err, statuses) => {
                    if (err) {
                        return reject(err);
                    } else {
                        const books = statuses.map(status => status.book);
                        return resolve(books);
                    }
                });
        });
    }

    getReadBooks(id) {
        return new Promise((resolve, reject) => {
            Status.find({ 'user': id, 'name': 'Read' })
                .populate('book')
                .exec((err, statuses) => {
                    if (err) {
                        return reject(err);
                    } else {
                        const books = statuses.map(status => status.book);
                        return resolve(books);
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

    getJoinedEvents(id) {
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
                        const events = user.joined_events;
                        return resolve(events);
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
}