module.exports = (data) => {
    return {
        getPendingUserRequests: (req, res) => {
            const userId = req.params.id;
            const page = req.query.page;

            if (!userId) {
                res.status(400)
                    .json({ message: "You should provide user id." });
            } else {
                data.users.getUserById(userId)
                    .then(user => {
                        if (!user) {
                            res.status(404)
                                .json({ message: "User was not found." })

                            return res;
                        }
                    })
                    .catch(error => {
                        res.status(500)
                            .json({ message: 'Something went wrong!' })
                        return res;
                    });

                data.requests.getPendingRequests(userId, page)
                    .then(requests => {
                        res.status(200)
                            .json(requests);
                    })
                    .catch(error => {
                        res.status(500)
                            .json({ message: 'Something went wrong!' })
                    });
            }

            return res;
        },
        sendRequests: (req, res) => {
            const receiverId = req.params.id;
            const senderId = req.body.id;

            if (!receiverId) {
                res.status(400)
                    .json({ message: "You should provide id of receiver." });
            } else if (!senderId) {
                res.status(400)
                    .json({ message: "You should provide id of sender." });
            } else {
                data.users.getUserById(receiverId)
                    .then(user => {
                        if (!user) {
                            res.status(404)
                                .json({ message: "Receiver was not found." });

                            return res;
                        }
                    })
                    .catch(error => {
                        res.status(500)
                            .json({ message: 'Something went wrong!' });

                        return res;
                    });

                data.users.getUserById(senderId)
                    .then(user => {
                        if (!user) {
                            res.status(404)
                                .json({ message: "Sender was not found." });

                            return res;
                        }
                    })
                    .catch(error => {
                        res.status(500)
                            .json({ message: 'Something went wrong!' });

                        return res;
                    });

                data.requests.postRequest(receiverId, senderId)
                    .then(request => {
                        return data.users.addRequest(receiverId, request._id);
                    })
                    .then(user => {
                        res.status(201).json("Created");
                    })
                    .catch(error => {
                        res.status(500)
                            .json({ message: 'Something went wrong!' });
                    });
            }

            return res;
        },
        acceptRequest: (req, res) => {
            const requestId = req.params.id;
            if (!requestId) {
                res.status(400)
                    .json({ message: "You should provide id of request." });
            } else {
                data.requests.getAndDeleteRequest(requestId)
                    .then(request => {
                        const receiverId = request.receiver;
                        const senderId = request.sender;

                        return data.users.connectUsers(receiverId, senderId);
                    })
                    .then(() => res.status(201).json("Accepted"))
                    .catch(error => {
                        res.status(500)
                            .json({ message: 'Something went wrong!' });
                    });
            }

            return res;
        },
        declineRequest: (req, res) => {
            const requestId = req.params.id;
            if (!requestId) {
                res.status(400)
                    .json({ message: "You should provide id of request." });
            } else {
                data.requests.getAndDeleteRequest(requestId)
                    .then(request => {
                        const userId = request.receiver;
                        return data.users.deleteRequest(userId, requestId);
                    })
                    .then(() => {
                        res.status(200).json("Removed");
                    })
                    .catch(error => {
                        res.status(500)
                            .json({ message: 'Something went wrong!' });
                    });
            }

            return res;
        }
    }
}