const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/config');

module.exports = (data) => {
    return {
        login: (req, res) => {
            const username = req.body.username;
            const password = req.body.password;
            //const passHash = crypto.SHA1(username + password).toString();

            const user = data.users.getUserByUsernameAndPassword(username, password);
            if(!user) {
              res.status(401)
                .json({ message:"User was not found!" });
            }

            const payload = { id: user._id };
            const token = jwt.sign(payload, secret);
            res.status(200)
                .json( {message: "ok", token: token });
             
            return res;
        },
        logout: (req, res) => {

        }
    }
}