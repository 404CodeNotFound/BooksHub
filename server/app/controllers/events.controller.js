const errors = require('../../utils/error.constants');
const generateErrorResponse = require('../../utils/error.responses');

module.exports = (data) => {
    return {
        getEvent: (req, res) => {
            const eventId = req.params.id;

            if (!eventId) {
                res.status(400)
                    .json({ message: errors.MISSING_EVENT_ID });
            } else {
                data.events.getFullEventById(eventId)
                    .then(event => {
                        if (!event) {
                            throw Error(errors.EVENT_NOT_FOUND);
                        } else {
                            res.status(200)
                                .json({ event });
                        }
                    })
                    .catch(error => {
                        generateErrorResponse(res, error.message);
                    });
            }

            return res;
        },
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
        getRecommendedEvents: (req, res) => {
            const userId = req.user._id;

            data.users.getFavouriteGenres(userId)
                .then(genres => {
                    if (genres.length > 0) {
                        // return data.events.getEventsByGenres(genres);
                    }

                    return data.events.getLatestEvents();
                })
                .then(events => {
                    res.status(200)
                        .json({ events: events });
                })
                .catch(error => {
                    generateErrorResponse(res, error.message);
                });

            return res;
        },
        getLatestEvents: (req, res) => {
            data.events.getLatestEvents()
                .then(events => {
                    res.status(200)
                        .json({ events: events });
                })
                .catch(error => {
                    generateErrorResponse(res, error.message);
                });

            return res;
        },
        addEvent: (req, res) => {
            const event = req.body;
            
            req.checkBody('title', 'Title is required.').notEmpty();
            req.checkBody('start_date', 'Start date is required.').notEmpty();
            req.checkBody('place', 'Place is required.').notEmpty();
            req.checkBody('city', 'City is required.').notEmpty();
            req.checkBody('photo', 'Photo is required.').notEmpty();
            req.checkBody('genres', 'You should select at least one genre.').notEmpty();

            const errors = req.validationErrors();

            if (errors) {
                res.status(400)
                    .json(errors);
            } else {
                event.creatorId = req.user._id;

                data.events.createEvent(event)
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
        },
        editEvent: (req, res) => {
            const event = req.body;
            const eventId = req.params.id;
            if (req.user.username !== event.creator) {
                res.status(403)
                    .json({ message: errors.PERMISSIONS_DENIED });
            } else if (!eventId) {
                res.status(400)
                    .json({ message: errors.MISSING_EVENT_ID });
            } else {
                req.checkBody('title', 'Title is required.').notEmpty();
                req.checkBody('start_date', 'Start date is required.').notEmpty();
                req.checkBody('place', 'Place is required.').notEmpty();
                req.checkBody('city', 'City is required.').notEmpty();
                req.checkBody('photo', 'Photo is required.').notEmpty();
                req.checkBody('genres', 'You should select at least one genre.').notEmpty();

                const errors = req.validationErrors();

                if (errors) {
                    res.status(400)
                        .json(errors);
                } else {
                    data.events.getEventById(eventId)
                        .then((foundEvent) => {
                            if (!foundEvent) {
                                throw Error(errors.EVENT_NOT_FOUND);
                            }

                            event.genres = event.genres.split(', ');

                            return data.events.updateEvent(eventId, event);
                        })
                        .then(updatedEvent => {
                            res.status(201)
                                .json({ event: updatedEvent });
                        })
                        .catch(error => {
                            generateErrorResponse(res, error.message);
                        });
                }
            }

            return res;
        },
        deleteEvent: (req, res) => {
            if (req.user.role !== 'Admin') {
                return res.status(403)
                    .json({ message: errors.PERMISSIONS_DENIED });
            }

            const eventId = req.params.id;

            data.events.getEventById(eventId)
                .then(foundEvent => {
                    if (!foundEvent) {
                        return res.status(404)
                            .json({ message: errors.EVENT_NOT_FOUND });
                    }

                    data.events.deleteEvent(eventId)
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
        addParticipant: (req, res) => {
            const user = req.body;
            const eventId = req.params.id;

            data.events.getEventById(eventId)
                .then(foundEvent => {
                    if (!foundEvent) {
                        return res.status(404)
                            .json({ message: errors.EVENT_NOT_FOUND });
                    }

                    data.users.addEventToUserJoinedEvents(eventId, user.username)
                        .then(() => data.events.addParticipant(eventId, user.id))
                        .then(updatedEvent => {
                            return res.status(201)
                                .json({ event: updatedEvent });
                        });
                })
                .catch(error => {
                    console.log(error);
                    generateErrorResponse(res, error.message);
                });
        }
    }
}