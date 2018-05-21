const errors = require('../../utils/error.constants');

module.exports = (data) => {
    return {
        getPendingUserRequests: (req, res) => {
            const userId = req.params.id;
            const page = req.query.page;

            if (!userId) {
                res.status(400)
                    .json({ message: errors.MISSING_USER_ID });

                return res;
            } else if(userId != req.user._id) {
                res.status(403)
                    .json({message: errors.PERMISSIONS_DENIED});

                return res;
            } else {
                data.users.getUserById(userId)
                    .then(user => {
                        if (!user) {
                            res.status(404)
                                .json({ message: errors.USER_NOT_FOUND });

                            return res;
                        }
                    })
                    .catch(error => {
                        res.status(500)
                            .json({ message: errors.SERVER_ERROR });

                        return res;
                    });

                data.requests.getPendingRequests(userId, page)
                    .then(requests => {
                        res.status(200)
                            .json(requests);
                        return res;
                    })
                    .catch(error => {
                        res.status(500)
                            .json({ message: errors.SERVER_ERROR });
                        return res;
                    });
            }
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
                            res.status(404)
                                .json({ message: errors.RECEIVER_NOT_FOUND });

                            return res;
                        }
                    })
                    .catch(error => {
                        res.status(500)
                            .json({ message: errors.SERVER_ERROR });

                        return res;
                    });

                data.requests.postRequest(receiverId, senderId)
                    .then(request => {
                        return data.users.addRequest(receiverId, request._id);
                    })
                    .then(user => {
                        res.status(201)
                            .json("Created");
                    })
                    .catch(error => {
                        res.status(500)
                            .json({ message: errors.SERVER_ERROR });
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
                        if (error.message === errors.REQUEST_NOT_FOUND) {
                            res.status(404)
                                .json({ message: errors.REQUEST_NOT_FOUND });
                        } else if (error.message === errors.PERMISSIONS_DENIED) {
                            res.status(403)
                                .json({ message: errors.PERMISSIONS_DENIED });
                        } else {
                            res.status(500)
                                .json({ message: errors.SERVER_ERROR });
                        }
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

                        const userId = request.receiver;
                        return data.users.deleteRequest(userId, requestId);
                    })
                    .then(() => {
                        res.status(200)
                            .json("Removed");
                    })
                    .catch(error => {
                        if (error.message === errors.REQUEST_NOT_FOUND) {
                            res.status(404)
                                .json({ message: errors.REQUEST_NOT_FOUND });
                        } else if (error.message === errors.PERMISSIONS_DENIED) {
                            res.status(403)
                                .json({ message: errors.PERMISSIONS_DENIED });
                        } else {
                            res.status(500)
                                .json({ message: errors.SERVER_ERROR });
                        }
                    });
            }

            return res;
        }
    }
}