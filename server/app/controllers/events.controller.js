const errors = require('../../utils/error.constants');
const generateErrorResponse = require('../../utils/error.responses');

module.exports = (data) => {
    return {
        getAllEvents: (req, res) => {
            if (req.user.role !== 'Admin') {
                return res.status(403)
                    .json({ message: errors.PERMISSIONS_DENIED });
            }
    
            const page = req.query.page;
    
            data.events.getAllEvents(page)
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

        addEvent: (req, res) => {
            const event = req.body;

            req.checkBody('title', 'Title is required.').notEmpty();
            req.checkBody('start_date', 'Start date is required.').notEmpty();
            req.checkBody('end_date', 'End date is required.').notEmpty();
            req.checkBody('place', 'Place is required.').notEmpty();
            req.checkBody('city', 'City is required.').notEmpty();
            req.checkBody('photo', 'Photo is required.').notEmpty();
            req.checkBody('genres', 'You should select at least one genre.').notEmpty();

            const errors = req.validationErrors();

            if (errors) {
                res.status(400)
                    .json(errors);
            } else {
                data.events.createEvent(eventData)
                    .then(createdEvent => {
                        data.users.addEventToUserCollection(createdEvent._id, req.user.username);

                        return createdEvent;
                    })
                    .then(createdEvent => {
                        res.status(201)
                            .json({ event: createdEvent });
                    })
                    .catch(error => {
                        generateErrorResponse(res, error.message);
                    });
            }

            return res;
        }
    }
}