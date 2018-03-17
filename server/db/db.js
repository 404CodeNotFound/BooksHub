const mongoose = require('mongoose');

const init = (connectionString) => {
    return mongoose.connect(connectionString);
};

module.exports = { init };