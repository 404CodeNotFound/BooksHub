const config = require('./config');
const open = require('open');

require('./db').init(config.connectionString)
    .then((db) => {
        return require('./data').init();
    })
    .then((data) => {
        return require('./app').init(data);
    })
    .then((app) => {
            app.listen(config.port, () => {
            console.log(`Server listening at: ${config.port}`);
            open(`http://localhost:${config.port}`);
        });
});