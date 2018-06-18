const crypto = require('crypto-js');
const jwt = require('jwt-simple');
const { secret } = require('../../config/config');
const errors = require('../../utils/error.constants');
const generateErrorResponse = require('../../utils/error.responses');

module.exports = (data) => {
    return {
        login: (req, res) => {
            const username = req.body.username;
            const password = req.body.password;

            if (!username || !password) {
                return res.status(400)
                    .json({ message: errors.MISSING_LOGIN_DATA });
            }

            const passHash = crypto.SHA1(password).toString();

            data.users.getUserByUsernameAndPassword(username, passHash)
                .then(user => {
                    if (!user) {
                        throw Error(errors.INCORRECT_LOGIN_DATA);
                    } else {
                        const payload = { id: user._id };
                        const token = jwt.encode(payload, secret);
                        return res.status(200)
                            .json({
                                user: {
                                    username: user.username,
                                    id: user._id,
                                    role: user.role
                                },
                                token: token
                            });
                    }
                })
                .catch(error => {
                    generateErrorResponse(res, error.message);
                });
        },
        register: (req, res) => {
            const user = req.body;

            req.checkBody('username', 'Username is required.').notEmpty();
            req.checkBody('password', 'Password is required.').notEmpty();
            req.checkBody('email', 'Email is required.').notEmpty();
            req.checkBody('first_name', 'First name is required.').notEmpty();
            req.checkBody('last_name', 'Last name is required.').notEmpty();

            const errors = req.validationErrors();

            if (errors) {
                res.status(400)
                    .json(errors);
            } else {
                user.passHash = crypto.SHA1(user.password).toString();
                user.password = "";

                data.users.getUserByUsername(user.username)
                    .then((existingUser) => {
                        if (existingUser) {
                            res.status(409)
                                .json({ message: errors.USERNAME_CONFLICT });
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
                            .json({ message: errors.SERVER_ERROR });
                    });
            }
        },
        getUserProfile(req, res, next) {
            const username = req.params.username;
            if (!username) {
                return res.status(400)
                    .json({ message: errors.MISSING_USERNAME });
            }

            data.users.getUserProfile(username)
                .then(user => {
                    if (!user) {
                        throw Error(errors.USER_NOT_FOUND);
                    } else {
                        return res.status(200)
                            .json({ user: user });
                    }
                })
                .catch(error => {
                    generateErrorResponse(res, error.message);
                });
        },
        getReadingBooks(req, res) {
            const id = req.params.id;
            const page = req.query.page;

            if (!id.trim()) {
                return res.status(400)
                    .json({ message: errors.MISSING_USER_ID });
            }

            data.users.getUserById(id)
                .then(user => {
                    if (!user) {
                        throw Error(errors.USER_NOT_FOUND);
                    }
                })
                .then(() => data.users.getReadingBooks(id, page))
                .then(books => {
                    return res.status(200)
                        .json(books);
                })
                .catch(error => {
                    generateErrorResponse(res, error.message);
                });
        },
        getWishlist(req, res) {
            const id = req.params.id;
            const page = req.query.page;

            if (!id.trim()) {
                return res.status(400)
                    .json({ message: errors.MISSING_USER_ID });
            }

            data.users.getUserById(id)
                .then(user => {
                    if (!user) {
                        throw Error(errors.USER_NOT_FOUND);
                    }
                })
                .then(() => data.users.getWishlist(id, page))
                .then(books => {
                    return res.status(200)
                        .json(books);
                })
                .catch(error => {
                    generateErrorResponse(res, error.message);
                });
        },
        getReadBooks(req, res) {
            const id = req.params.id;
            const page = req.query.page;

            if (!id.trim()) {
                return res.status(400)
                    .json({ message: errors.MISSING_USER_ID });
            }

            data.users.getUserById(id)
                .then(user => {
                    if (!user) {
                        throw Error(errors.USER_NOT_FOUND);
                    }
                })
                .then(() => data.users.getReadBooks(id, page))
                .then(books => {
                    return res.status(200)
                        .json(books);
                })
                .catch(error => {
                    generateErrorResponse(res, error.message);
                });
        },
        getRecommendedBooks(req, res) {
            const id = req.params.id;
            const page = req.query.page;

            if (!id.trim()) {
                return res.status(400)
                    .json({ message: errors.MISSING_USER_ID });
            }

            data.users.getUserById(id)
                .then(user => {
                    if (!user) {
                        throw Error(errors.USER_NOT_FOUND);
                    }
                })
                .then(() => data.users.getRecommendedBooks(id, page))
                .then(books => {
                    return res.status(200)
                        .json(books);
                })
                .catch(error => {
                    generateErrorResponse(res, error.message);
                });
        },
        getUserFriends(req, res) {
            const id = req.params.id;
            const page = req.query.page;

            if (!id.trim()) {
                return res.status(400)
                    .json({ message: errors.MISSING_USER_ID });
            }

            data.users.getUserById(id)
                .then(user => {
                    if (!user) {
                        throw Error(errors.USER_NOT_FOUND);
                    }
                })
                .then(() => {
                    if (page) {
                        return data.users.getUserFriends(id, page);
                    } else {
                        return data.users.getAllUserFriends(id);
                    }
                })
                .then(result => {
                    return res.status(200)
                        .json(result);
                })
                .catch(error => {
                    generateErrorResponse(res, error.message);
                });
        },
        getUserComments(req, res) {
            const id = req.params.id;
            const page = req.query.page;

            if (!id.trim()) {
                return res.status(400)
                    .json({ message: errors.MISSING_USER_ID });
            }

            data.users.getUserById(id)
                .then(user => {
                    if (!user) {
                        throw Error(errors.USER_NOT_FOUND);
                    }
                })
                .then(() => data.comments.getComments(id, page))
                .then(comments => {
                    return res.status(200)
                        .json(comments);
                })
                .catch(error => {
                    generateErrorResponse(res, error.message);
                });
        },
        getUserReviews(req, res) {
            const id = req.params.id;
            const page = req.query.page;

            if (!id.trim()) {
                return res.status(400)
                    .json({ message: errors.MISSING_USER_ID });
            }

            data.users.getUserById(id)
                .then(user => {
                    if (!user) {
                        throw Error(errors.USER_NOT_FOUND);
                    }
                })
                .then(() => data.reviews.getReviews(id, page))
                .then(reviews => {
                    return res.status(200)
                        .json(reviews);
                })
                .catch(error => {
                    generateErrorResponse(res, error.message);
                });
        },
        getUserEvents(req, res) {
            const id = req.params.id;
            const page = req.query.page;

            if (!id.trim()) {
                return res.status(400)
                    .json({ message: errors.MISSING_USER_ID });
            }

            data.users.getUserById(id)
                .then(user => {
                    if (!user) {
                        throw Error(errors.USER_NOT_FOUND);
                    }
                })
                .then(() => data.events.getUserEvents(id, page))
                .then(events => {
                    return res.status(200)
                        .json(events);
                })
                .catch(error => {
                    generateErrorResponse(res, error.message);
                });
        },
        getJoinedEvents(req, res) {
            const id = req.params.id;
            const page = req.query.page;

            if (!id.trim()) {
                return res.status(400)
                    .json({ message: errors.MISSING_USER_ID });
            }

            data.users.getUserById(id)
                .then(user => {
                    if (!user) {
                        throw Error(errors.USER_NOT_FOUND);
                    }
                })
                .then(() => data.users.getJoinedEvents(id, page))
                .then(events => {
                    return res.status(200)
                        .json(events);
                })
                .catch(error => {
                    generateErrorResponse(res, error.message);
                });
        },
        deleteReview(req, res) {
            const userId = req.params.userId;
            const reviewId = req.params.reviewId;

            if (!userId.trim()) {
                return res.status(400)
                    .json({ message: errors.MISSING_USER_ID });
            }

            if (!reviewId.trim()) {
                return res.status(400)
                    .json({ message: errors.MISSING_REVIEW_ID });
            }

            data.reviews.getReviewById(reviewId)
                .then(review => {
                    if (!review) {
                        throw Error(errors.REVIEW_NOT_FOUND);
                    } else if (!review.user.equals(req.user._id)) {
                        throw Error(errors.PERMISSIONS_DENIED);
                    }
                })
                .then(() => data.users.deleteReview(userId, reviewId))
                .then(() => data.reviews.deleteReview(reviewId))
                .then(() => {
                    return res.status(200)
                        .json("Removed");
                })
                .catch(error => {
                    generateErrorResponse(res, error.message);
                });
        },
        deleteComment(req, res) {
            const userId = req.params.userId;
            const commentId = req.params.commentId;

            if (!userId.trim()) {
                return res.status(400)
                    .json({ message: errors.MISSING_USER_ID });
            }

            if (!commentId.trim()) {
                return res.status(400)
                    .json({ message: errors.MISSING_COMMENT_ID });
            }

            data.comments.getComment(commentId)
                .then(comment => {
                    if (!comment) {
                        throw Error(errors.COMMENT_NOT_FOUND);
                    }
                })
                .then(() => data.users.getUserById(userId))
                .then(user => {
                    if (!user) {
                        throw Error(errors.USER_NOT_FOUND);
                    } else if (!user._id.equals(req.user._id)) {
                        throw Error(errors.PERMISSIONS_DENIED);
                    }
                })
                .then(() => data.users.deleteComment(userId, commentId))
                .then(() => data.comments.deleteComment(commentId))
                .then(() => {
                    return res.status(200)
                        .json("Removed");
                })
                .catch(error => {
                    generateErrorResponse(res, error.message);
                });
        },
        updateUserProfile: (req, res) => {
            if (req.user.role !== 'Admin' && req.user.username !== req.params.username) {
                return res.status(403)
                    .json({ message: "Users can only edit their profiles." });
            }

            req.checkBody('email', 'Email is required.').notEmpty();
            req.checkBody('first_name', 'First name is required.').notEmpty();
            req.checkBody('last_name', 'Last name is required.').notEmpty();
            req.checkBody('genres', 'At least one genre must be selected.').notEmpty();
            
            const errors = req.validationErrors();

            console.log(req.body);

            if (errors) {
                res.status(400)
                    .json(errors);
            } else {
                const userData = req.body;
                userData.username = req.body.username;

                data.users.updateUser(userData)
                    .then((updatedUser) => {
                        return res.status(201)
                            .json({ user: updatedUser });
                    })
                    .catch(error => {
                        console.log(error);
                        return res.status(500)
                            .json({ message: 'Something went wrong.' });
                    });
            }
        },
        getAllUsers: (req, res) => {
            if (req.user.role !== 'Admin') {
                return res.status(403)
                    .json({ message: errors.PERMISSIONS_DENIED });
            }

            const page = req.query.page;

            data.users.getAllUsers(page)
                .then(result => {
                    res.status(200)
                        .json(result);
                })
                .catch(error => {
                    res.status(500)
                        .json({ message: errors.SERVER_ERROR });
                });

            return res;
        },
        changeRole: (req, res) => {
            if (req.user.role !== 'Admin') {
                return res.status(403)
                    .json({ message: "Only Administrators can change user roles." });
            }

            const userId = req.params.id;
            const role = req.body.role;

            data.users.getUserById(userId)
                .then(existingUser => {
                    if (!existingUser) {
                        return res.status(404)
                            .json({ message: errors.USER_NOT_FOUND });
                    }

                    return data.users.changeRole(userId, role);
                })
                .then((updatedUser) => {
                    return res.status(201)
                        .json({ user: updatedUser });
                })
                .catch(error => {
                    return res.status(500)
                        .json({ message: errors.SERVER_ERROR });
                });
        },

        deleteUser: (req, res) => {
            if (req.user.role !== 'Admin') {
                return res.status(403)
                    .json({ message: "Only Administrators can delete users." });
            }

            const userId = req.params.id;

            data.users.getUserById(userId)
                .then(foundUser => {
                    if (!foundUser) {
                        return res.status(404)
                            .json({ message: errors.USER_NOT_FOUND });
                    }

                    data.users.deleteUser(userId)
                        .then(() => {
                            return res.status(204)
                                .json("Removed");
                        });
                })
                .catch(error => {
                    return res.status(500)
                        .json({ message: errors.SERVER_ERROR });
                });
        },

        searchUsers: (req, res) => {
            const searchValue = req.query.phrase;

            data.users.searchUsers(searchValue)
                .then(result => {
                    res.status(200)
                        .json(result);
                })
                .catch(error => {
                    res.status(500)
                        .json({ message: errors.SERVER_ERROR });
                });

            return res;
        },
        recommendBook: (req, res) => {
            const userId = req.params.userId;
            const bookId = req.params.bookId;

            data.users.getUserById(userId)
                .then(user => {
                    if (!user) {
                        throw Error(errors.USER_NOT_FOUND);
                    }
                })
                .then(() => data.books.getBookById(bookId))
                .then(book => {
                    if (!book) {
                        throw Error(errors.BOOK_NOT_FOUND);
                    }
                })
                .then(() => data.users.addRecommendedBook(userId, bookId))
                .then(updatedUser => {
                    return res.status(201)
                        .json(updatedUser);
                })
                .catch(error => {
                    generateErrorResponse(res, error.message);
                });
        }
    }
}