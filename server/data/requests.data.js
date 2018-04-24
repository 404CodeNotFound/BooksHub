const { Request } = require('../models');

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
}