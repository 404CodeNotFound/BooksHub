module.exports = (data) => {
    return {
        getPendingUserRequests: (req, res) => {
            const username = req.params.username;
            if (!username) {
                res.status(400)
                    .json({ message: "You should provide username." });
            }

            let userId;
            data.users.getUserProfile(username)
                .then(user => {
                    if (!user) {
                        res.status(404)
                            .json({ message: "User was not found." })
                        return res;
                    } else {
                        userId = user._id;
                    }
                });

            data.requests.getPendingRequests(userId)
                .then(requests => {
                    res.status(200)
                        .json({ requests: requests });

                    return res;
                });
        }
    }
}