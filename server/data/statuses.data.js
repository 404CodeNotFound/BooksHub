const { Status } = require('../models')

module.exports = class BooksData {
    postOrUpdateStatus(bookId, userId, receivedStatus) {
        return this.findStatusByBookAndUser(bookId, userId)
            .then(foundStatus => {
                if (foundStatus) {
                    return this.updateStatus(foundStatus, receivedStatus.name);
                } else {
                    return this.createStatus(bookId, userId, receivedStatus);
                }
            });
    }

    createStatus(bookId, userId, receivedStatus) {
        return new Promise((resolve, reject) => {
            let status = new Status(receivedStatus);
            status.user = userId;
            status.book = bookId;
            status.save((err, savedStatus) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve({ status: savedStatus, isUpdated: false });
                }
            });
        });
    }

    updateStatus(status, newStatusName) {
        return new Promise((resolve, reject) => {
            status.name = newStatusName;
            status.save((err, savedStatus) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve({ status: savedStatus, isUpdated: true });
                }
            });
        });
    }

    findStatusByBookAndUser(bookId, userId) {
        return new Promise((resolve, reject) => {
            Status.findOne({ 'book': bookId, 'user': userId },
                (err, status) => {
                    if (err) {
                        return reject(err);
                    } else if (status) {
                        return resolve(status);
                    } else {
                        return resolve(null);
                    }
                });
        });
    }
}
