const { User } = require('../models');

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
                .populate({
                    path: 'statuses',
                    populate: { path: 'book' }
                })
                .populate('friends')
                .populate({
                    path: 'requests',
                    populate: {
                        path: 'sender'
                    }
                })                
                .populate({
                    path: 'reviews',
                    populate: {
                        path: 'book'
                    }
                })
                .exec((err, user) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(user);
                    }
                });
        });
    }
}