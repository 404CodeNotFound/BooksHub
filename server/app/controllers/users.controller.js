const crypto = require('crypto-js');
const jwt = require('jwt-simple');
const { secret } = require('../../config/config');

module.exports = (data) => {
    return {
        login: (req, res) => {
            const username = req.body.username;
            const password = req.body.password;

            if (!username || !password) {
                res.status(400)
                    .json({ message: "You should provide username and password." });
            }
            //const passHash = crypto.SHA1(username + password).toString();

            data.users.getUserByUsernameAndPassword(username, password)
                .then(user => {
                    if (!user) {
                        res.status(401)
                            .json({ message: "Incorrect username or password!" });
                    } else {
                        const payload = { id: user._id };
                        const token = jwt.encode(payload, secret);
                        res.status(200)
                            .json({
                                user: {
                                    username: user.username,
                                    id: user._id
                                },
                                token: token
                            });
                    }
                })
                .catch(error => {
                    res.status(500)
                        .json({ message: 'Something went wrong!' })
                });

                return res;
        },
        getUserProfile(req, res) {
            const username = req.params.username;
            if (!username) {
                res.status(400)
                    .json({ message: "You should provide username." });
            } else {
                data.users.getUserProfile(username)
                    .then(user => {
                        if (!user) {
                            res.status(404)
                                .json({ message: "User was not found." });
                        } else {
                            res.status(200)
                                .json({ user: user });
                        }
                    })
                    .catch(error => {
                        res.status(500)
                            .json({ message: 'Something went wrong!' });
                    });
            }
            return res;
        },
        getReadingBooks(req, res) {
            const id = req.params.id;
            if (!id) {
                res.status(400)
                    .json({ message: "You should provide user id." });
            } else {
                data.users.getReadingBooks(id)
                    .then(books => {
                        res.status(200)
                            .json({ books: books });
                    })
                    .catch(error => {
                        res.status(500)
                            .json({ message: 'Something went wrong!' });
                    });
            }

            return res;
        },
        getWishlist(req, res) {
            const id = req.params.id;
            if (!id) {
                res.status(400)
                    .json({ message: "You should provide user id." });
            } else {
                data.users.getWishlist(id)
                    .then(books => {
                        res.status(200)
                            .json({ books: books });
                    })
                    .catch(error => {
                        res.status(500)
                            .json({ message: 'Something went wrong!' });
                    });
            }

            return res;
        },
        getReadBooks(req, res) {
            const id = req.params.id;
            if (!id) {
                res.status(400)
                    .json({ message: "You should provide user id." });
            } else {
                data.users.getReadBooks(id)
                    .then(books => {
                        res.status(200)
                            .json({ books: books });
                    })
                    .catch(error => {
                        res.status(500)
                            .json({ message: 'Something went wrong!' });
                    });
            }

            return res;
        },
        getUserFriends(req, res) {
            const id = req.params.id;
            if (!id) {
                res.status(400)
                    .json({ message: "You should provide user id." });
            } else {
                data.users.getUserFriends(id)
                    .then(friends => {
                        res.status(200)
                            .json({ friends: friends });
                    })
                    .catch(error => {
                        res.status(500)
                            .json({ message: 'Something went wrong!' });
                    });
            }

            return res;
        },
        getUserComments(req, res) {
            const id = req.params.id;
            if (!id) {
                res.status(400)
                    .json({ message: "You should provide user id." });
            } else {
                data.comments.getComments(id)
                    .then(comments => {
                        res.status(200)
                            .json({ comments: comments });
                    })
                    .catch(error => {
                        res.status(500)
                            .json({ message: 'Something went wrong!' });
                    });
            }

            return res;
        },
        getUserReviews(req, res) {
            const id = req.params.id;
            if (!id) {
                res.status(400)
                    .json({ message: "You should provide user id." });
            } else {
                data.reviews.getReviews(id)
                    .then(reviews => {
                        res.status(200)
                            .json({ reviews: reviews });
                    })
                    .catch(error => {
                        res.status(500)
                            .json({ message: 'Something went wrong!' });
                    });
            }

            return res;
        },
        getUserEvents(req, res) {
            const id = req.params.id;
            if (!id) {
                res.status(400)
                    .json({ message: "You should provide user id." });
            } else {
                data.events.getUserEvents(id)
                    .then(events => {
                        res.status(200)
                            .json({ events: events });
                    })
                    .catch(error => {
                        res.status(500)
                            .json({ message: 'Something went wrong!' });
                    });
            }

            return res;
        },
        getJoinedEvents(req, res) {
            const id = req.params.id;
            if (!id) {
                res.status(400)
                    .json({ message: "You should provide user id." });
            } else {
                data.users.getJoinedEvents(id)
                    .then(events => {
                        res.status(200)
                            .json({ events: events });
                    })
                    .catch(error => {
                        res.status(500)
                            .json({ message: 'Something went wrong!' });
                    });
            }

            return res;
        },
    }
}