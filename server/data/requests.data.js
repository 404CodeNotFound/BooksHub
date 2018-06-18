const { Request, User } = require('../models');
const getPageOfCollection = require('../utils/pagination');
const itemsPerPage = 1;

module.exports = class RequestsData {
    getPendingRequests(userId, page) {
        return new Promise((resolve, reject) => {
            Request.find({ 'receiver': userId })
                .populate('sender')
                .exec((err, requests) => {
                    if (err) {
                        return reject(err);
                    } else {
                        const requestsOnPage = getPageOfCollection(requests, page, itemsPerPage);

                        let result = {
                            requests: requestsOnPage,
                            requestsCount: requests.length
                        };

                        return resolve(result);
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

    getRequest(id) {
        return new Promise((resolve, reject) => {
            Request.findById(id, (err, request) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(request);
                }
            });
        });
    }

    deleteRequest(request) {
        return new Promise((resolve, reject) => {
            Request.remove({ '_id': request._id }, (err) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(request);
                }
            });
        });
    }
}