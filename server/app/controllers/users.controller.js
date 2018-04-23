const crypto = require('crypto-js');
const jwt = require('jwt-simple');
const { secret } = require('../../config/config');

module.exports = (data) => {
    return {
        login: (req, res) => {
            const username = req.body.username;
            const password = req.body.password;
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
                            .json({ message: "ok", user: { username: user.username, id: user._id }, token: token });
                    }

                    return res;
                });
        },
        getUserProfile(req, res) {
            const username = req.params.username;
            console.log(username);
            if (!username) {
                res.status(400)
                    .json({ message: "You should provide username." });
            }

            data.users.getUserProfile(username)
                .then(user => {

                    if (!user) {
                        res.status(404)
                            .json({ message: "User was not found." });
                    } else {
                        res.status(200)
                            .json({ user: user });
                    }
                    console.log(user);

                    return res;
                });
        },
        getReadingBooks(req, res) {
            const id = req.params.id;
            if (!id) {
                res.status(400)
                    .json({ message: "You should provide user id." });
                return res;
            }

            data.users.getReadingBooks(id)
                .then(books => {
                    res.status(200)
                        .json({ books: books });
                    return res;
                });
        },
        getWishlist(req, res) {
            const id = req.params.id;
            if (!id) {
                res.status(400)
                    .json({ message: "You should provide user id." });
            }

            data.users.getWishlist(id)
                .then(books => {    
                    res.status(200)
                        .json({ books: books });
                });

            return res;
        },
        getReadBooks(req, res) {
            const id = req.params.id;
            if (!id) {
                res.status(400)
                    .json({ message: "You should provide user id." });
            }

            data.users.getReadBooks(id)
                .then(books => {
                    res.status(200)
                        .json({ books: books });
                });

            return res;
        }
    }
}