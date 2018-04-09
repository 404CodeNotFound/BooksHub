const { Request } = require('../models/request');

module.exports = class RequestData {
    getPendingRequests(userId) {
        return new Promise((resolve, reject) => {
            Request.find({ 'receiver': userId },
                (err, requests) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(requests);
                    }
                });
        });
    }
}