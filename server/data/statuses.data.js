const { Status } = require('../models')

module.exports = class BooksData {
    postOrUpdateStatus(receivedStatus) {
        return this.findStatusByBookAndUser(receivedStatus.book, receivedStatus.user)
            .then(foundStatus => {
                if (foundStatus) {
                    return this.updateStatus(foundStatus, receivedStatus.name);
                } else {
                    return this.createStatus(receivedStatus);
                }
            });
    }

    createStatus(receivedStatus) {
        return new Promise((resolve, reject) => {
            const status = new Status(receivedStatus);
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
