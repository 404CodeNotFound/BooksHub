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
            const passHash = crypto.SHA1(password).toString();

            data.users.getUserByUsernameAndPassword(username, passHash)
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
        register: (req, res) => {
            // TODO - redirect to profile if user is already signed in

            const user = req.body;
            
            if(!user.username || !user.password || !user.email) {
                res.status(400)
                    .json({ message: "Username, email and password are required."});
            }
            
            user.passHash = crypto.SHA1(user.password).toString();
            user.password = "";

            data.users.getUserByUsername(user.username)
                .then((existingUser) => {
                    if(existingUser) {
                        res.status(404)
                            .json({ message: "User with that username already exists." });
                    } else {
                        user.photo = "http://www.verspers.nl/workspace/assets/images/empty_profile.png";
                        user.birth_date = new Date(2018, 01, 01);
                        user.gender = "Male";
                        
                        data.users.createUser(user)
                            .then(createdUser => {
                                res.status(201)
                                    .json({ user: createdUser });
                            });
                    }
                })
                .catch((error) => {
                    res.status(500)
                        .json({ message: "Something went wrong!" });
                });
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
            const page = req.query.page;

            if (!id) {
                res.status(400)
                    .json({ message: "You should provide user id." });
            } else {
                data.users.getReadingBooks(id, page)
                    .then(books => {
                        res.status(200)
                            .json(books);
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
            const page = req.query.page;

            if (!id) {
                res.status(400)
                    .json({ message: "You should provide user id." });
            } else {
                data.users.getWishlist(id, page)
                    .then(books => {
                        res.status(200)
                            .json(books);
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
            const page = req.query.page;

            if (!id) {
                res.status(400)
                    .json({ message: "You should provide user id." });
            } else {
                data.users.getReadBooks(id, page)
                    .then(books => {
                        res.status(200)
                            .json(books);
                    })
                    .catch(error => {
                        res.status(500)
                            .json({ message: 'Something went wrong!' });
                    });
            }

            return res;
        },
        getRecommendedBooks(req, res) {
            const id = req.params.id;
            const page = req.query.page;

            if (!id) {
                res.status(400)
                    .json({ message: "You should provide user id." });
            } else {
                data.users.getRecommendedBooks(id, page)
                    .then(books => {
                        res.status(200)
                            .json(books);
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
            const page = req.query.page;

            if (!id) {
                res.status(400)
                    .json({ message: "You should provide user id." });
            } else {
                data.users.getUserFriends(id, page)
                    .then(friends => {
                        res.status(200)
                            .json(friends);
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
            const page = req.query.page;

            if (!id) {
                res.status(400)
                    .json({ message: "You should provide user id." });
            } else {
                data.comments.getComments(id, page)
                    .then(comments => {
                        res.status(200)
                            .json(comments);
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
            const page = req.query.page;

            if (!id) {
                res.status(400)
                    .json({ message: "You should provide user id." });
            } else {
                data.reviews.getReviews(id, page)
                    .then(reviews => {
                        res.status(200)
                            .json(reviews);
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
            const page = req.query.page;

            if (!id) {
                res.status(400)
                    .json({ message: "You should provide user id." });
            } else {
                data.events.getUserEvents(id, page)
                    .then(events => {
                        res.status(200)
                            .json(events);
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
            const page = req.query.page;

            if (!id) {
                res.status(400)
                    .json({ message: "You should provide user id." });
            } else {
                data.users.getJoinedEvents(id, page)
                    .then(events => {
                        res.status(200)
                            .json(events);
                    })
                    .catch(error => {
                        res.status(500)
                            .json({ message: 'Something went wrong!' });
                    });
            }

            return res;
        },
        deleteReview(req, res) {
            const userId = req.params.userId;
            const reviewId = req.params.reviewId;

            if (!userId) {
                res.status(400)
                    .json({ message: "You should provide id of user." });
            } else if (!reviewId) {
                res.status(400)
                    .json({ message: "You should provide id of review." });
            } else {
                data.users.deleteReview(userId, reviewId)
                    .then(() => data.reviews.deleteReview(reviewId))
                    .then(() => {
                        res.status(200)
                            .json("Removed");
                    })
                    .catch(error => {
                        res.status(500)
                            .json({ message: 'Something went wrong!' });
                    });
            }

            return res;
        },
        deleteComment(req, res) {
            const userId = req.params.userId;
            const commentId = req.params.commentId;
            
            if (!userId) {
                res.status(400)
                    .json({ message: "You should provide id of user." });
            } else if (!commentId) {
                res.status(400)
                    .json({ message: "You should provide id of comment." });
            } else {
                data.users.deleteComment(userId, commentId)
                    .then(() => data.comments.deleteComment(commentId))
                    .then(() => {
                        res.status(200)
                            .json("Removed");
                    })
                    .catch(error => {
                        res.status(500)
                            .json({ message: 'Something went wrong!' });
                    });
            }

            return res;
        },
        updateUserProfile: (req, res) => {
            if(req.user.username !== req.params.username) {
                res.status(403)
                    .json({ message: "Users can only edit their profiles." });
            }

            const userData = req.body;
            userData.username = req.user.username;

            data.users.updateUser(userData)
                .then((updatedUser) => {
                    res.status(201)
                        .json({ user: updatedUser });
                })
                .catch(error => {
                    res.status(500)
                        .json({ message: error.toString() });
                });      
        }
    }
}