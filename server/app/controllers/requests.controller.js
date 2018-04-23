module.exports = (data) => {
    return {
        getPendingUserRequests: (req, res) => {
            const userId = req.params.id;
            if (!userId) {
                res.status(400)
                    .json({ message: "You should provide user id." });

                return res;
            }

            data.users.getUserById(userId)
                .then(user => {
                    if (!user) {
                        res.status(404)
                            .json({ message: "User was not found." })

                        return res;
                    }
                });

            data.requests.getPendingRequests(userId)
                .then(requests => {
                    res.status(200)
                        .json({ requests: requests });

                    return res;
                });
        },
        sendRequests: (req, res) => {
            const receiverId = req.params.id;
            const senderId = req.body.id;

            if (!receiverId) {
                res.status(400)
                    .json({ message: "You should provide id of receiver." });
            }

            if (!senderId) {
                res.status(400)
                    .json({ message: "You should provide id of sender." });
            }

            data.users.getUserById(receiverId)
                .then(user => {
                    if (!user) {
                        res.status(404)
                            .json({ message: "Receiver was not found." });
                        return res;
                    }
                });

            data.users.getUserById(senderId)
                .then(user => {
                    if (!user) {
                        res.status(404)
                            .json({ message: "Sender was not found." });

                        return res;
                    }
                });

            data.requests.postRequest(receiverId, senderId)
                .then(request => {
                    res.status(201)
                        .json({ request: request });

                    return res;
                })
        }
    }
}