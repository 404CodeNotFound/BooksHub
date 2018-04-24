const { User, Status } = require('../models');

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
                        console.log(statuses);
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

    getUserFriends(id) {
        return new Promise((resolve, reject) => {
            User.findById(id)
                .populate('friends')
                .exec((err, user) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(user.friends);
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
}