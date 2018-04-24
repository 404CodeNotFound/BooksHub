const { Event } = require('../models');

module.exports = class EventsData {
    getUserEvents(id) {
        return new Promise((resolve, reject) => {
            Event.find({ 'creator': id })
                .populate('creator')
                .exec((err, events) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(events);
                    }
                });
        });
    }
}