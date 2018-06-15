const errors = require('../../utils/error.constants');
const generateErrorResponse = require('../../utils/error.responses');

module.exports = (data) => {
    return {
        getInfo: (req, res) => {
            let info = {};
            data.books.getTotalCount()
                .then((booksCount) => {
                    info.booksCount = booksCount;
                    return data.events.getTotalCount();
                })
                .then((eventsCount) => {
                    info.eventsCount = eventsCount;
                    return data.users.getTotalCount();
                })
                .then((usersCount) => {
                    info.usersCount = usersCount;
                    res.status(200)
                        .json(info);
                })
                .catch(error => {
                    generateErrorResponse(res, error.message);
                });

            return res;
        }
    }
}