const { Event } = require('../models');
const getPageOfCollection = require('../utils/pagination');
const itemsPerPage = 18;

module.exports = class EventsData {
    getUserEvents(id, page) {
        return new Promise((resolve, reject) => {
            Event.find({ 'creator': id })
                .populate('creator')
                .exec((err, events) => {
                    if (err) {
                        return reject(err);
                    } else {
                        const eventsOnPage = getPageOfCollection(events, page, itemsPerPage);

                        let result = {
                            events: eventsOnPage,
                            eventsCount: events.length
                        };

                        return resolve(result);
                    }
                });
        });
    }
}