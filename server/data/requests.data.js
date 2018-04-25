const { Request, User } = require('../models');

module.exports = class RequestsData {
    getPendingRequests(userId) {
        return new Promise((resolve, reject) => {
            Request.find({ 'receiver': userId })
                .populate('sender')
                .exec((err, requests) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(requests);
                    }
                });
        });
    }

    postRequest(receiverId, senderId) {
        return new Promise((resolve, reject) => {
            const request = new Request();
            request.receiver = receiverId;
            request.sender = senderId;
            request.sent_date = new Date();

            request.save((err, savedRequest) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(savedRequest);
                }
            });
        });
    }

    getAndDeleteRequest(id) {
        return new Promise((resolve, reject) => {
            Request.findById(id, (err, request) => {
                if (err) {
                    return reject(err);
                } else {
                    this.deleteRequest(id)
                        .then(() => resolve(request))
                        .catch((err) => reject(err));
                }
            });
        });
    }

    deleteRequest(id) {
        return new Promise((resolve, reject) => {
            Request.remove({ '_id': id }, (err) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve();
                }
            });
        });
    }
}