const { User } = require('../models/user')
module.exports = class UserData {
    getUserByUsernameAndPassword(username, passHash) {
        return User.findOne({username: username, passHash}, 
            (res, err) => res);
    }
    
    getUserById(id) {
        return User.findById(id, (res, err) => res);
    }
}