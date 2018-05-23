const errors = require('../../utils/error.constants');
const generateErrorResponse = require('../../utils/error.responses');

module.exports = (data) => {
    return {
        getPendingUserRequests: (req, res) => {
            const userId = req.params.id;
            const page = req.query.page;

            if (!userId) {
                res.status(400)
                    .json({ message: errors.MISSING_USER_ID });
            } else if (userId != req.user._id) {
                res.status(403)
                    .json({ message: errors.PERMISSIONS_DENIED });
            } else {
                data.users.getUserById(userId)
                    .then(user => {
                        if (!user) {
                            throw Error(erros.USER_NOT_FOUND);
                        }
                    })
                    .then(() => data.requests.getPendingRequests(userId, page))
                    .then(requests => {
                        res.status(200)
                            .json(requests);
                    })
                    .catch(error => {
                        generateErrorResponse(res, error.message);
                    });
            }

            return res;
        },
        sendRequest: (req, res) => {
            const receiverId = req.params.id;
            const senderId = req.user._id;

            if (!receiverId) {
                res.status(400)
                    .json({ message: errors.MISSING_USER_ID });
            } else {
                data.users.getUserById(receiverId)
                    .then(user => {
                        if (!user) {
                            throw Error(errors.USER_NOT_FOUND);
                        }
                    })
                    .then(() => data.requests.postRequest(receiverId, senderId))
                    .then(request => {
                        return data.users.addRequest(receiverId, request._id);
                    })
                    .then(user => {
                        res.status(201)
                            .json("Created");
                    })
                    .catch(error => {
                        generateErrorResponse(res, error.message);
                    });
            }

            return res;
        },
        acceptRequest: (req, res) => {
            const requestId = req.params.id;
            if (!requestId) {
                res.status(400)
                    .json({ message: errors.MISSING_REQUEST_ID });
            } else {
                data.requests.getRequest(requestId)
                    .then(request => {
                        if (!request) {
                            throw Error(errors.REQUEST_NOT_FOUND);
                        }

                        if (!req.user._id.equals(request.receiver)) {
                            throw Error(errors.PERMISSIONS_DENIED);
                        }

                        return request;
                    })
                    .then(request => data.requests.deleteRequest(request))
                    .then((request) => data.users.connectUsers(request.receiver, request.sender))
                    .then(() => res.status(201).json("Accepted"))
                    .catch(error => {
                        generateErrorResponse(res, error.message);
                    });
            }

            return res;
        },
        declineRequest: (req, res) => {
            const requestId = req.params.id;
            if (!requestId) {
                res.status(400)
                    .json({ message: errors.MISSING_REQUEST_ID });
            } else {
                data.requests.getRequest(requestId)
                    .then(request => {
                        if (!request) {
                            throw Error(errors.REQUEST_NOT_FOUND);
                        }

                        if (!req.user._id.equals(request.receiver)) {
                            throw Error(errors.PERMISSIONS_DENIED);
                        }

                        return request;
                    })
                    .then(request => data.requests.deleteRequest(request))
                    .then(request => data.users.deleteRequest(request.receiver, requestId))
                    .then(() => {
                        res.status(200)
                            .json("Removed");
                    })
                    .catch(error => {
                        generateErrorResponse(res, error.message);
                    });
            }

            return res;
        }
    }
}